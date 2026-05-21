from pydantic import BaseModel, ConfigDict
from typing import Optional

class TurnoBase(BaseModel):
    nombre: str
    hora_inicio: str
    hora_fin: str

class TurnoCreate(TurnoBase):
    pass

class TurnoUpdate(BaseModel):
    nombre:      Optional[str] = None
    hora_inicio: Optional[str] = None
    hora_fin:    Optional[str] = None

class TurnoResponse(TurnoBase):
    turno_id: int
    model_config = ConfigDict(from_attributes=True)