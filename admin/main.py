from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from admin.api.v1.routes import router
from admin.api.v1.view import router as views

app = FastAPI()
app.mount("/assets", StaticFiles(directory="/app/dist/assets"), name="assets")
app.mount("/static", StaticFiles(directory="/app/dist"), name="static")
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(views)
