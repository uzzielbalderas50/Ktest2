from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import SessionLocal
from app.models.catalogos.turno import Turno
from app.schemas.catalogos.turno_schema import TurnoCreate, TurnoUpdate, TurnoResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[TurnoResponse])
def get_turnos(db: Session = Depends(get_db)):
    return db.query(Turno).order_by(Turno.turno_id.desc()).all()

@router.get("/buscar/{termino}", response_model=list[TurnoResponse])
def buscar_turnos(termino: str, db: Session = Depends(get_db)):
    return db.query(Turno).filter(Turno.nombre.ilike(f"%{termino}%")).order_by(Turno.turno_id.desc()).all()

@router.post("/", response_model=TurnoResponse)
def create_turno(turno: TurnoCreate, db: Session = Depends(get_db)):
    db_turno = Turno(**turno.model_dump())
    db.add(db_turno)
    db.commit()
    db.refresh(db_turno)
    return db_turno

@router.put("/{turno_id}", response_model=TurnoResponse)
def update_turno(turno_id: int, turno_data: TurnoUpdate, db: Session = Depends(get_db)):
    db_turno = db.query(Turno).filter(Turno.turno_id == turno_id).first()
    if not db_turno:
        raise HTTPException(status_code=404, detail="Turno no encontrado")
    for key, value in turno_data.model_dump(exclude_unset=True).items():
        setattr(db_turno, key, value)
    db.commit()
    db.refresh(db_turno)
    return db_turno

@router.delete("/{turno_id}")
def delete_turno(turno_id: int, db: Session = Depends(get_db)):
    db_turno = db.query(Turno).filter(Turno.turno_id == turno_id).first()
    if not db_turno:
        raise HTTPException(status_code=404, detail="Turno no encontrado")
    db.delete(db_turno)
    db.commit()
    return {"message": "Turno eliminado correctamente"}