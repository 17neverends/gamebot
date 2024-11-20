from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class MinisweeperCreate(BaseModel):
    user_id: int
    status: Optional[str]
    level: Optional[str]
    result_time: Optional[float]
    entry_date: datetime
    device: Optional[str]
    language: Optional[str]

    class Config:
        from_attributes = True


class MinisweeperInDB(MinisweeperCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
