from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from webapp.routes.view import router as view_router
from webapp.routes.spotting import router as spotting_router
from webapp.routes.sudoku import router as sudoku_router
from webapp.routes.match import router as match_router
from webapp.routes.king import router as king_router
from webapp.routes.minisweeper import router as minisweeper_router
from webapp.routes.tetris import router as tetris_router
from webapp.routes.wordle import router as wordle_router
from webapp.routes.tiktaktoe import router as tiktaktoe_router

app = FastAPI()


app.include_router(view_router)
app.include_router(spotting_router)
app.include_router(sudoku_router)
app.include_router(match_router)
app.include_router(king_router)
app.include_router(minisweeper_router)
app.include_router(tetris_router)
app.include_router(wordle_router)
app.include_router(tiktaktoe_router)

app.mount("/games", StaticFiles(directory="webapp/games"), name="games")
app.mount("/static", StaticFiles(directory="webapp/games/static"), name="static")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
