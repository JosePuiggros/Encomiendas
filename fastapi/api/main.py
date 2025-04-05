from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
import models
from database import engine, SessionLocal, Base
from routers import auth

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/add_package/")
def add_package(depto: int, db: Session = Depends(get_db)):
    new_package = models.Package(depto=depto, added_at=datetime.now())
    db.add(new_package)
    db.commit()
    db.refresh(new_package)
    return {"message": "Package added successfully", "package": {"id": new_package.id, "depto": new_package.depto}}

@app.delete("/delete_package/{package_id}/")
def delete_package(package_id: int, db: Session = Depends(get_db)):
    package = db.query(models.Package).filter(models.Package.id == package_id).first()
    if not package:
        return {"error": "Package not found"}
    db.delete(package)
    db.commit()
    return {"message": "Package deleted successfully"}

@app.get("/get_package/{package_id}/")
def get_package(package_id: int, db: Session = Depends(get_db)):
    package = db.query(models.Package).filter(models.Package.id == package_id).first()
    if not package:
        return {"error": "Package not found"}
    return {"id": package.id, "depto": package.depto}

@app.post("/add_user/")
def add_user(name: str, mail: str, depto: int, db: Session = Depends(get_db)):
    new_user = models.User(name=name, mail=mail, depto=depto)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Package added successfully", "package": {"id": new_user.id, "nombre": new_user.name,"mail": new_user.mail, "depto": new_user.depto}}

@app.delete("/delete_user/{user_id}/")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return {"error": "Package not found"}
    db.delete(user)
    db.commit()
    return {"message": "Package deleted successfully"}

@app.get("/get_user/{user_id}/")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return {"error": "User not found"}
    return {"id": user.id, "name": user.name, "mail": user.mail, "depto": user.depto}