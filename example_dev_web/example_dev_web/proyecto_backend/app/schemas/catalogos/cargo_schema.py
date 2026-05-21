from pydantic import BaseModel, ConfigDict
from typing import Optional

class CargoBase(BaseModel):
    nombre_cargo: str

class CargoCreate(CargoBase):
    pass

class CargoUpdate(BaseModel):
    nombre_cargo: Optional[str] = None

class CargoResponse(CargoBase):
    cargo_id: int

    model_config = ConfigDict(from_attributes=True)
