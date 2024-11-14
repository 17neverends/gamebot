from typing import Optional
from fastapi import APIRouter, Header, Request
from fastapi.responses import JSONResponse
from tasks_shared.database_utils import get_session
from tasks_shared.models.king.repository import KingRepository
from webapp.models.king_info import KingInfo
from webapp.models.update_time import UpdateTime
from tasks_shared.models.king.schemas import KingCreate, KingUpdate
from tasks_shared.models.user.repository import UserRepository
from utils.parse_init import get_user_id_from_authorization


router = APIRouter(
    prefix="/king",
    tags=["king"],
)


@router.post("/save_result", response_class=JSONResponse)
async def save_result(data: KingInfo,
                      request: Request,
                      authorization: Optional[str] = Header(default=None)):
    tg_data = await get_user_id_from_authorization(authorization=authorization)

    if not tg_data:
        return JSONResponse(content={"detail": "Unauthorized"}, status_code=401)
    
    async with get_session() as session:
        user_repository = UserRepository(session=session)
        user = await user_repository.get_user_by_tg_id(tg_id=tg_data.get("id"))
        repo = KingRepository(session=session)
        entry_date = data.entry_date.replace(tzinfo=None)
        new_result = KingCreate(
            user_id=user.id,
            entry_date=entry_date,
            device=request.headers.get("user-agent"),
            language=tg_data.get("language_code"),
        )
        print("\n\n\n\n", new_result, "\n\n\n\n")
        new_result = await repo.insert_data(create_model=new_result.model_dump())
    print("\n\n\n\n", new_result, "\n\n\n\n")
    return JSONResponse(content={"detail": "OK"})


@router.post("/update_time", response_class=JSONResponse)
async def update(data: UpdateTime, authorization: Optional[str] = Header(default=None)):
    tg_data = await get_user_id_from_authorization(authorization=authorization)

    if not tg_data:
        return JSONResponse(content={"detail": "Unauthorized"}, status_code=401)
    
    async with get_session() as session:
        user_repository = UserRepository(session=session)
        user = await user_repository.get_user_by_tg_id(tg_id=tg_data.get("id"))
        repo = KingRepository(session=session)
        update_model = KingUpdate(user_id=user.id,
                                  total_time=data.duration,
                                  entry_date=data.entry_date)
        update_model = await repo.update_time_on_session(update_model=data)
        print("\n\n\n\n", update_model, "\n\n\n\n")

    return JSONResponse(content={"detail": "OK"})