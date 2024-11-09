from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="/app/dist")


@router.get("/database")
async def database(req: Request):
    return templates.TemplateResponse('index.html', {'request': req})
