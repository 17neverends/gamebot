from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from webapp.routes.view import router as view_router
from webapp.routes.spotting import router as spotting_router
from webapp.routes.sudoku import router as sudoku_router

app = FastAPI()


app.include_router(view_router)
app.include_router(spotting_router)
app.include_router(sudoku_router)

app.mount("/games", StaticFiles(directory="webapp/games"), name="games")
app.mount("/static", StaticFiles(directory="webapp/games/static"), name="static")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
