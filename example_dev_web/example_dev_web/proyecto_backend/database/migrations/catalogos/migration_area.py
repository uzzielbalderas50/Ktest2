# database/migrations/catalogos/migration_cargo.py
from app.config import Base, engine
from app.models.catalogos.area import Area

def up():
    Base.metadata.create_all(bind=engine, tables=[Area.__table__])