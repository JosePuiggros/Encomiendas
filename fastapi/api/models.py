from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from .database import Base


class Package(Base):
    __tablename__ = "packages"

    id = Column(Integer, primary_key=True, index=True)
    depto = Column(Integer, index=True)
    added_at = Column(DateTime, nullable=False)
    withdrawn = Column(Boolean, default=False)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    mail = Column(String, index=True)
    depto = Column(Integer, ForeignKey("packages.depto"))
