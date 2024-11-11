from fastapi import APIRouter
from fastapi.responses import JSONResponse
from tasks_shared.database_utils import get_session
from tasks_shared.models.user.repository import UserRepository
from utils.time_converter import convert_string_to_datetime



router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}}
)


@router.get("/get_all", response_class=JSONResponse)
async def get_all_records(start_date: str, end_date: str):
    async with get_session() as session:
        user_repo = UserRepository(session)
        start_date = await convert_string_to_datetime(dt=start_date)
        end_date = await convert_string_to_datetime(dt=end_date)
        result = await user_repo.get_all(start_date=start_date,
                                         end_date=end_date)
        return result
