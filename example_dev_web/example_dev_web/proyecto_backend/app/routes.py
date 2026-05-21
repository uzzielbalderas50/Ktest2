from fastapi import APIRouter

from app.controllers.catalogos.cargo_controller import router as cargo_router
from app.controllers.catalogos.turno_controller import router as turno_router
from app.controllers.catalogos.area_controller import router as area_router 

router = APIRouter()

router.include_router(cargo_router, prefix="/api/cargos", tags=["Cargos"])
router.include_router(turno_router, prefix="/api/turnos", tags=["Turnos"])
router.include_router(area_router, prefix="/api/areas", tags=["Áreas"]) 