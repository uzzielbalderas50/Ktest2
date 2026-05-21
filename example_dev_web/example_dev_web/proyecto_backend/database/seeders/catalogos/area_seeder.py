from app.config import SessionLocal
from app.models.catalogos.area import Area

def run():
    session = SessionLocal()
    try:
        session.add_all([
            Area(nombre="Producción"),
            Area(nombre="MES"),
            Area(nombre="Logistica"),
        ])
        session.commit()
    finally:
        session.close()