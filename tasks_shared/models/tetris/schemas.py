from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TetrisCreate(BaseModel):
    user_id: int
    score: Optional[int]
    level: Optional[str]
    result_time: Optional[float]
    entry_date: datetime
    device: Optional[str]
    language: Optional[str]

    class Config:
        from_attributes = True


class TetrisInDB(TetrisCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
