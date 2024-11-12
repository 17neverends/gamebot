from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class KingCreate(BaseModel):
    user_id: int
    entry_date: datetime
    device: Optional[str]
    language: Optional[str]

    class Config:
        from_attributes = True


class KingInDB(KingCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
