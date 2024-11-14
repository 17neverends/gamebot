from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class KingCreate(BaseModel):
    user_id: int
    entry_date: datetime
    total_time: Optional[int] = 0
    device: Optional[str]
    language: Optional[str]

    class Config:
        from_attributes = True


class KingUpdate(BaseModel):
    user_id: int
    entry_date: datetime
    total_time: int


class KingInDB(KingCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
