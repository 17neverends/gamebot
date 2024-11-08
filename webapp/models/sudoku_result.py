from datetime import datetime
from pydantic import BaseModel


class SudokuResult(BaseModel):
    level: str
    result_time: float
    entry_date: datetime
