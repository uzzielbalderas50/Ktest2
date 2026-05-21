from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import SessionLocal
from app.models.catalogos.cargo import Cargo
from app.schemas.catalogos.cargo_schema import CargoCreate, CargoUpdate, CargoResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[CargoResponse])
def get_cargos(db: Session = Depends(get_db)):
    return db.query(Cargo).all()

@router.get("/buscar/{termino}", response_model=list[CargoResponse])
def buscar_cargos(termino: str, db: Session = Depends(get_db)):
    return db.query(Cargo).filter(Cargo.nombre_cargo.ilike(f"%{termino}%")).all()

@router.post("/", response_model=CargoResponse)
def create_cargo(cargo: CargoCreate, db: Session = Depends(get_db)):
    db_cargo = Cargo(**cargo.model_dump())
    db.add(db_cargo)
    db.commit()
    db.refresh(db_cargo)
    return db_cargo

@router.put("/{cargo_id}", response_model=CargoResponse)
def update_cargo(cargo_id: int, cargo_data: CargoUpdate, db: Session = Depends(get_db)):
    db_cargo = db.query(Cargo).filter(Cargo.cargo_id == cargo_id).first()
    if not db_cargo:
        raise HTTPException(status_code=404, detail="Cargo no encontrado")
    
    update_data = cargo_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_cargo, key, value)
    
    db.commit()
    db.refresh(db_cargo)
    return db_cargo

@router.delete("/{cargo_id}")
def delete_cargo(cargo_id: int, db: Session = Depends(get_db)):
    db_cargo = db.query(Cargo).filter(Cargo.cargo_id == cargo_id).first()
    if not db_cargo:
        raise HTTPException(status_code=404, detail="Cargo no encontrado")
    
    db.delete(db_cargo)
    db.commit()
    return {"message": "Cargo eliminado correctamente"}
