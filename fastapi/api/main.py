from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from .database import engine, SessionLocal, Base
from .routers import auth
from api import models
from .deps import user_dependency, db_dependency
from apscheduler.schedulers.background import BackgroundScheduler
from random import randint

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
scheduler = BackgroundScheduler()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.include_router(auth.router)



@app.post("/add_package/")
async def add_package(request: Request, db: db_dependency, user: user_dependency):
    body = await request.json()
    depto = body.get("depto")
    urgente = body.get("urgente", False)

    # Crear el paquete
    codigo = randint(0, 9999) 
    new_package = models.Package(depto=depto, added_at=datetime.now(), withdrawn=False, urgente=urgente, codigo=codigo)
    db.add(new_package)
    db.commit()
    db.refresh(new_package)

    # Buscar el correo del usuario asociado al departamento
    user = db.query(models.User).filter(models.User.depto == depto).first()
    if not user:
        return {"message": "Package added, but no user found for the department"}

    # Configurar y enviar el correo
    receiver_email = user.email
    if urgente: 
        message = MIMEMultipart("alternative")
        if urgente:
            message["Subject"] = "¡Paquete urgente esperando por ti!"
        else:
            message["Subject"] = "Hola, hay un paquete esperando por ti!!!"
        message["From"] = sender_email
        message["To"] = receiver_email
        
        html = f"""\
        <html>
        <body>
            <p>Hola {user.username},<br>
            Te informamos que ha llegado un paquete{' <b>Urgente</b>' if urgente else ''} para el departamento {depto}.<br>
            <b>Código de retiro:</b> {new_package.codigo}
            </p>
        </body>
        </html>
        """
        part = MIMEText(html, "html")
        message.attach(part)

        server = smtplib.SMTP(smtp_server, port)
        server.set_debuglevel(1)
        server.esmtp_features['auth'] = 'LOGIN DIGEST-MD5 PLAIN'
        server.login(login, password)
        
        server.sendmail(
            sender_email, receiver_email, message.as_string()
        )
        server.quit()

        return {
            "message": "Package added successfully and email sent",
            "package": {
                "id": new_package.id,
                "depto": new_package.depto,
                "added_at": new_package.added_at,
                "withdrawn": new_package.withdrawn,
            },
        }
    



@app.delete("/delete_package/{package_id}/")
def delete_package(package_id: int, db: db_dependency, user: user_dependency):
    package = db.query(models.Package).filter(models.Package.id == package_id).first()
    if not package:
        return {"error": "Package not found"}
    db.delete(package)
    db.commit()
    return {"message": "Package deleted successfully"}

@app.get("/get_package/{package_id}/")
def get_package(package_id: int, db: db_dependency, user: user_dependency):
    package = db.query(models.Package).filter(models.Package.id == package_id).first()
    if not package:
        return {"error": "Package not found"}
    return {"id": package.id, "depto": package.depto}

@app.get("/get_packages/")
def get_packages(db: db_dependency, user: user_dependency):
    return db.query(models.Package).all()

@app.put("/update_package/{package_id}/")
async def update_package(package_id: int, request: Request, db: db_dependency, user: user_dependency):
    body = await request.json()
    package = db.query(models.Package).filter(models.Package.id == package_id).first()
    if not package:
        return {"error": "Package not found"}
    if "depto" in body:
        package.depto = body["depto"]
    if "withdrawn" in body:
        package.withdrawn = body["withdrawn"]
    if "urgente" in body:
        package.urgente = body["urgente"]
    db.commit()
    db.refresh(package)
    return {"message": "Package updated successfully", "package": {"id": package.id, "depto": package.depto, "added_at": package.added_at, "withdrawn": package.withdrawn, "urgente": package.urgente}}

@app.delete("/delete_user/{user_id}/")
def delete_user(user_id: int, db: db_dependency, user: user_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return {"error": "User not found"}
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

@app.get("/get_user/{user_id}/")
def get_user(user_id: int, db: db_dependency, user: user_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return {"error": "User not found"}
    return {"id": user.id, "username": user.username, "email": user.email, "depto": user.depto}


import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
  
  
port = 2525
smtp_server = "smtp.mailmug.net"
login = "1oop9bkzceiyupzn" 
password = "airw3ftsdda5wji4" 
  
sender_email = "encomiendas@jjj.com"
message = MIMEMultipart("alternative")
message["Subject"] = "Hola, hay un paquete esperando por ti!!!"
message["From"] = sender_email

  
@app.get("/send_mail/{user_mail}/")
def send_email(user_mail: str, db: db_dependency, user: user_dependency):
    
    receiver_email = user_mail
    message["To"] = receiver_email

    html = """\
        <html>
        <body>
            <p>Hola.....<br>
            te llego un paquete a las .....</p>
        </body>
        </html>
        """
    part = MIMEText(html, "html")
    message.attach(part)
  
    server = smtplib.SMTP(smtp_server, port)
    server.set_debuglevel(1)
    server.esmtp_features['auth'] = 'LOGIN DIGEST-MD5 PLAIN'
    server.login(login, password)

    server.sendmail(
        sender_email, receiver_email, message.as_string()
    )
  
  
    return {"msg":"send mail"}

def send_pending_notifications():
    db = SessionLocal()
    # Obtener paquetes pendientes
    pending_packages = db.query(models.Package).filter((models.Package.withdrawn == False) & (models.Package.urgente == True)).all()
    for package in pending_packages:
        depto = package.depto
        # Buscar el correo del usuario asociado al departamento
        user = db.query(models.User).filter(models.User.depto == depto).first()
        if not user:
            return {"message": "Package added, but no user found for the department"}
        # Configurar y enviar el correo
        receiver_email = user.email

        message = MIMEMultipart("alternative")
        message["Subject"] = "¡Paquete urgente esperando por ti!"
        message["From"] = sender_email
        message["To"] = receiver_email

        html = f"""\
            <html>
            <body>
                <p>Hola {user.username},<br>
                Te informamos que ha llegado un paquete <b>Urgente</b> para el departamento {depto}.<br>
                <b>Código de retiro:</b> {package.codigo}
                </p>
            </body>
            </html>
            """
        part = MIMEText(html, "html")
        message.attach(part)

        server = smtplib.SMTP(smtp_server, port)
        server.set_debuglevel(1)
        server.esmtp_features['auth'] = 'LOGIN DIGEST-MD5 PLAIN'
        server.login(login, password)
        
        server.sendmail(
            sender_email, receiver_email, message.as_string()
        )
        server.quit()
    db.close()


# Programar la tarea cada 5 minutos
scheduler.add_job(send_pending_notifications, 'interval', minutes=1)
scheduler.start()