from typing import Optional
from fastapi import APIRouter, Header, Request
from fastapi.responses import JSONResponse
from tasks_shared.database_utils import get_session
from tasks_shared.models.sudoku.repository import SudokuRepository
from tasks_shared.models.sudoku.schemas import SudokuCreate
from tasks_shared.models.user.repository import UserRepository
from utils.parse_init import get_user_id_from_authorization
from webapp.models.sudoku_result import SudokuResult


router = APIRouter(
    prefix="/sudoku",
    tags=["sudoku"],
)


@router.get("/leaderboard/{level}", response_class=JSONResponse)
async def get_user(level: str, authorization: Optional[str] = Header(default=None)):
    tg_data = await get_user_id_from_authorization(authorization=authorization)

    if not tg_data:
        return JSONResponse(content={"detail": "Unauthorized"}, status_code=401)
    
    async with get_session() as session:
        repository = SudokuRepository(session=session)
        leaderboard = await repository.get_leaderboard(level=level)
    response = {
        "leaderboard": leaderboard,
        "tg_id": tg_data.get("id"),
        "name": tg_data.get("username")
    }

    return JSONResponse(content=response)


@router.post("/save_result", response_class=JSONResponse)
async def save_result(data: SudokuResult,
                      request: Request,
                      authorization: Optional[str] = Header(default=None)):
    tg_data = await get_user_id_from_authorization(authorization=authorization)

    if not tg_data:
        return JSONResponse(content={"detail": "Unauthorized"}, status_code=401)
    
    async with get_session() as session:
        user_repository = UserRepository(session=session)
        user = await user_repository.get_user_by_tg_id(tg_id=tg_data.get("id"))
        sudoku_repository = SudokuRepository(session=session)
        entry_date = data.entry_date.replace(tzinfo=None)
        new_result = SudokuCreate(
            user_id=user.id,
            level=data.level,
            result_time=data.result_time,
            entry_date=entry_date,
            device=request.headers.get("user-agent"),
            language=tg_data.get("language"),
        )
        print("\n\n\n\n", new_result, "\n\n\n\n")
        new_result = await sudoku_repository.insert_data(create_model=new_result.model_dump())
        user = await user_repository.update_field_by_tg_id(tg_id=user.tg_id, field_name="visits_count")
        user = await user_repository.update_field_by_tg_id(tg_id=user.tg_id,
                                                           field_name="visits_count",
                                                           increment_by=data.result_time)


    print("\n\n\n\n", new_result, "\n\n\n\n")
    return JSONResponse(content={"detail": "OK"})