from fastapi import APIRouter
from .endpoints import (
    user,
    spotting,
    sudoku,
    match,
    king,
    tetris,
    minisweeper,
    tiktaktoe,
    wordle
)


router = APIRouter(
    prefix="/api/v1",
)

router.include_router(user.router)
router.include_router(spotting.router)
router.include_router(sudoku.router)
router.include_router(match.router)
router.include_router(king.router)
router.include_router(tetris.router)
router.include_router(minisweeper.router)
router.include_router(tiktaktoe.router)
router.include_router(wordle.router)
