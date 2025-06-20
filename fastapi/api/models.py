from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from .database import Base


class Package(Base):
    __tablename__ = "packages"

    id = Column(Integer, primary_key=True, index=True)
    depto = Column(Integer, index=True)
    added_at = Column(DateTime, nullable=False)
    withdrawn = Column(Boolean, default=False)
    urgente = Column(Boolean, default=False)
    codigo = Column(Integer, unique=True, index=True)


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    depto = Column(Integer, ForeignKey("packages.depto"))

    
# class User(Base): 
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)
#     mail = Column(String, index=True)
#     depto = Column(Integer, ForeignKey("packages.depto"))


