from pydantic import BaseModel
from datetime import datetime


class UpdateTime(BaseModel):
    duration: float
    entry_date: datetime
