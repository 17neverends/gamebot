from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class SpottingResult(BaseModel):
    result_time: Optional[float] = None
    moves_count: Optional[int] = None
    entry_date: datetime
