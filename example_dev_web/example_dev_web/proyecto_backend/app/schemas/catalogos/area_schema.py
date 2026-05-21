from pydantic import BaseModel, ConfigDict
from typing import Optional

class AreaBase(BaseModel):
    nombre: str

class AreaCreate(AreaBase):
    pass

class AreaUpdate(BaseModel):
    nombre: Optional[str] = None

class AreaResponse(AreaBase):
    area_id: int
    model_config = ConfigDict(from_attributes=True)