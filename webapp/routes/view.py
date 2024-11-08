from fastapi import APIRouter
from fastapi.responses import HTMLResponse


router = APIRouter()

@router.get("/sudoku", response_class=HTMLResponse)
def sudoku():
    return HTMLResponse(
        content=open(
            "webapp/games/sudoku/index.html", "r", encoding="utf-8"
        ).read()
    )


@router.get("/spotting", response_class=HTMLResponse)
def spotting():
    return HTMLResponse(
        content=open(
            "webapp/games/spotting/index.html", "r", encoding="utf-8"
        ).read()
    )
