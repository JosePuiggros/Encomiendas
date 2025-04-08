from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
from .database import engine, SessionLocal, Base
from .routers import auth
from api import models
from .deps import user_dependency, db_dependency

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

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
    new_package = models.Package(depto=depto, added_at=datetime.now(), withdrawn=False)
    db.add(new_package)
    db.commit()
    db.refresh(new_package)
    return {"message": "Package added successfully", "package": {"id": new_package.id, "depto": new_package.depto, "added_at": new_package.added_at, "withdrawn": new_package.withdrawn}}

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
    db.commit()
    db.refresh(package)
    return {"message": "Package updated successfully", "package": {"id": package.id, "depto": package.depto, "added_at": package.added_at, "withdrawn": package.withdrawn}}

# @app.post("/add_user/")
# def add_user(username: str, mail: str, depto: int, db: db_dependency, user: user_dependency):
#     new_user = models.User(username=username, mail=mail, depto=depto)
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return {"message": "Package added successfully", "package": {"id": new_user.id, "nombre": new_user.username,"mail": new_user.mail, "depto": new_user.depto}}

@app.post("/add_user/")
def add_user(username: str, depto: int, db: db_dependency, user: user_dependency):
    new_user = models.User(username=username, depto=depto)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Package added successfully", "package": {"id": new_user.id, "nombre": new_user.username,"depto": new_user.depto}}


@app.delete("/delete_user/{user_id}/")
def delete_user(user_id: int, db: db_dependency, user: user_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return {"error": "Package not found"}
    db.delete(user)
    db.commit()
    return {"message": "Package deleted successfully"}

@app.get("/get_user/{user_id}/")
def get_user(user_id: int, db: db_dependency, user: user_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return {"error": "User not found"}
    return {"id": user.id, "username": user.username, "email": user.email, "depto": user.depto}
