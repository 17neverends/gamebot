from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class SudokuResult(BaseModel):
    level: Optional[str]
    result_time: Optional[float]
    entry_date: datetime
