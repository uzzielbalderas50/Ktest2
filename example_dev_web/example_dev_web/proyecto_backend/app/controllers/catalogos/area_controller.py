from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import SessionLocal
from app.models.catalogos.area import Area
from app.schemas.catalogos.area_schema import AreaCreate, AreaUpdate, AreaResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[AreaResponse])
def get_areas(db: Session = Depends(get_db)):
    return db.query(Area).order_by(Area.area_id.desc()).all()

@router.get("/buscar/{termino}", response_model=list[AreaResponse])
def buscar_areas(termino: str, db: Session = Depends(get_db)):
    return db.query(Area).filter(Area.nombre.ilike(f"%{termino}%")).order_by(Area.area_id.desc()).all()

@router.post("/", response_model=AreaResponse)
def create_area(area: AreaCreate, db: Session = Depends(get_db)):
    db_area = Area(**area.model_dump())
    db.add(db_area)
    db.commit()
    db.refresh(db_area)
    return db_area

@router.put("/{area_id}", response_model=AreaResponse)
def update_area(area_id: int, area_data: AreaUpdate, db: Session = Depends(get_db)):
    db_area = db.query(Area).filter(Area.area_id == area_id).first()
    if not db_area:
        raise HTTPException(status_code=404, detail="Área no encontrada")
    for key, value in area_data.model_dump(exclude_unset=True).items():
        setattr(db_area, key, value)
    db.commit()
    db.refresh(db_area)
    return db_area

@router.delete("/{area_id}")
def delete_area(area_id: int, db: Session = Depends(get_db)):
    db_area = db.query(Area).filter(Area.area_id == area_id).first()
    if not db_area:
        raise HTTPException(status_code=404, detail="Área no encontrada")
    db.delete(db_area)
    db.commit()
    return {"message": "Área eliminada correctamente"}