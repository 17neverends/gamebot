from typing import Optional
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from tasks_shared.database_utils import get_session
from tasks_shared.models.spotting.repository import SpottingRepository
from admin.utils.time_converter import convert_string_to_datetime

router = APIRouter(
    prefix="/spotting",
    tags=["spotting"],
    responses={404: {"description": "Not found"}}
)


@router.get("/get_all", response_class=JSONResponse)
async def get_all_records(start_date: Optional[str] = None, end_date: Optional[str] = None):
    async with get_session() as session:
        repo = SpottingRepository(session)
        if start_date and end_date:
            start_date = await convert_string_to_datetime(dt=start_date)
            end_date = await convert_string_to_datetime(dt=end_date)
            result = await repo.get_all(start_date=start_date, end_date=end_date)
        else:
            result = await repo.get_all(start_date=start_date, end_date=end_date)
        return result
