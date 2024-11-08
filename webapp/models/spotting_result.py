from datetime import datetime
from pydantic import BaseModel


class SpottingResult(BaseModel):
    result_time: float
    moves_count: int
    entry_date: datetime
