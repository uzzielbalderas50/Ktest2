# app/models/catalogos/cargo.py
from sqlalchemy import Column, Integer, String
from app.config import Base


class Cargo(Base):
    __tablename__ = "cargos"

    cargo_id = Column(Integer, primary_key=True, autoincrement=True)
    nombre_cargo = Column(String, nullable=False)
