from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class TetrisResult(BaseModel):
    level: Optional[str] = None
    score: Optional[int] = None
    result_time: Optional[float] = None
    entry_date: datetime
