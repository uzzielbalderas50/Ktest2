from sqlalchemy import Column, Integer, String
from app.config import Base

class Turno(Base):
    __tablename__ = "turnos"

    turno_id = Column(Integer, primary_key=True, autoincrement=True)
    nombre   = Column(String, unique=True, nullable=False)
    hora_inicio = Column(String, nullable=False)
    hora_fin    = Column(String, nullable=False)