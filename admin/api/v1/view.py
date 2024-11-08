from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="build")


@router.get("/auth")
async def auth(req: Request):
    return templates.TemplateResponse('index.html', {'request': req})


@router.get("/database")
async def database(req: Request):
    return templates.TemplateResponse('index.html', {'request': req})
