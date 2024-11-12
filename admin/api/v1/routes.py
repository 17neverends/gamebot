from fastapi import APIRouter
from .endpoints import (
    user,
    spotting,
    sudoku,
    match,
    king
)


router = APIRouter(
    prefix="/api/v1",
)

router.include_router(user.router)
router.include_router(spotting.router)
router.include_router(sudoku.router)
router.include_router(match.router)
router.include_router(king.router)
