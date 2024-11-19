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


@router.get("/match", response_class=HTMLResponse)
def match():
    return HTMLResponse(
        content=open(
            "webapp/games/match/index.html", "r", encoding="utf-8"
        ).read()
    )

@router.get("/king", response_class=HTMLResponse)
def king():
    return HTMLResponse(
        content=open(
            "webapp/games/king/index.html", "r", encoding="utf-8"
        ).read()
    )



@router.get("/minisweeper", response_class=HTMLResponse)
def minisweeper():
    return HTMLResponse(
        content=open(
            "webapp/games/minisweeper/index.html", "r", encoding="utf-8"
        ).read()
    )


@router.get("/wordle", response_class=HTMLResponse)
def wordle():
    return HTMLResponse(
        content=open(
            "webapp/games/wordle/index.html", "r", encoding="utf-8"
        ).read()
    )


@router.get("/tiktaktoe", response_class=HTMLResponse)
def tiktaktoe():
    return HTMLResponse(
        content=open(
            "webapp/games/tiktaktoe/index.html", "r", encoding="utf-8"
        ).read()
    )

@router.get("/tetris", response_class=HTMLResponse)
def tiktaktoe():
    return HTMLResponse(
        content=open(
            "webapp/games/tetris/index.html", "r", encoding="utf-8"
        ).read()
    )
