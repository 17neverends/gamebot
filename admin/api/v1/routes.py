from fastapi import APIRouter
from .endpoints import (
    user,
    spotting,
    sudoku
)


router = APIRouter(
    prefix="/admin/api/v1",
)

router.include_router(user.router)
router.include_router(spotting.router)
router.include_router(sudoku.router)
