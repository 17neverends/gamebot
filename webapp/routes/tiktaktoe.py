from typing import Optional
from fastapi import APIRouter, Header, Request
from fastapi.responses import JSONResponse
from tasks_shared.database_utils import get_session
from tasks_shared.models.tiktaktoe.repository import TiktaktoeRepository
from webapp.models.tiktaktoe_result import TiktaktoeResult
from tasks_shared.models.tiktaktoe.schemas import TiktaktoeCreate
from tasks_shared.models.user.repository import UserRepository
from utils.parse_init import get_user_id_from_authorization


router = APIRouter(
    prefix="/tiktaktoe",
    tags=["tiktaktoe"],
)


@router.get("/leaderboard", response_class=JSONResponse)
async def get_user(authorization: Optional[str] = Header(default=None)):
    tg_data = await get_user_id_from_authorization(authorization=authorization)

    if not tg_data:
        return JSONResponse(content={"detail": "Unauthorized"}, status_code=401)
    
    async with get_session() as session:
        repository = TiktaktoeRepository(session=session)
        leaderboard = await repository.get_leaderboard()
    response = {
        "leaderboard": leaderboard,
        "tg_id": tg_data.get("id"),
        "name": tg_data.get("username")
    }

    return JSONResponse(content=response)


@router.post("/save_result", response_class=JSONResponse)
async def save_result(data: TiktaktoeResult,
                      request: Request,
                      authorization: Optional[str] = Header(default=None)):
    tg_data = await get_user_id_from_authorization(authorization=authorization)

    if not tg_data:
        return JSONResponse(content={"detail": "Unauthorized"}, status_code=401)
    
    async with get_session() as session:
        user_repository = UserRepository(session=session)
        user = await user_repository.get_user_by_tg_id(tg_id=tg_data.get("id"))
        tiktaktoe_repository = TiktaktoeRepository(session=session)
        entry_date = data.entry_date.replace(tzinfo=None)
        new_result = TiktaktoeCreate(
            user_id=user.id,
            status=data.status,
            result_time=data.result_time,
            entry_date=entry_date,
            device=request.headers.get("user-agent"),
            language=tg_data.get("language_code"),
        )
        print("\n\n\n\n", new_result, "\n\n\n\n")
        new_result = await tiktaktoe_repository.insert_data(create_model=new_result.model_dump())
    print("\n\n\n\n", new_result, "\n\n\n\n")
    return JSONResponse(content={"detail": "OK"})