from sqlalchemy import Column, Integer, String
from app.config import Base

class Area(Base):
    __tablename__ = "areas"

    area_id = Column(Integer, primary_key=True, autoincrement=True)
    nombre  = Column(String, unique=True, nullable=False)