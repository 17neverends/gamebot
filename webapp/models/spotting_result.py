from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class SpottingResult(BaseModel):
    result_time: Optional[float]
    moves_count: Optional[int]
    entry_date: datetime
