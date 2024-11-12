from datetime import datetime
from pydantic import BaseModel


class MatchInfo(BaseModel):
    entry_date: datetime
