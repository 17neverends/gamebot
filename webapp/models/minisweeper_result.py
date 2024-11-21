from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class MinisweeperResult(BaseModel):
    level: Optional[str] = None
    status: Optional[str] = None
    result_time: Optional[float] = None
    entry_date: datetime
