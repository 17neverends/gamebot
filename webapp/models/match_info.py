from datetime import datetime
from pydantic import BaseModel


class MatchInfo(BaseModel):
    total_time: float | None
    entry_date: datetime
