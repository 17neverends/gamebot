from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    tg_id: int
    username: str
    comings_from: Optional[str] = None
    visits_count: Optional[int] = 0
    referal_count: Optional[int] = 0
    blocked: Optional[bool] = False


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    tg_id: Optional[int]
    comings_from: Optional[str]
    visits_count: Optional[int]
    referal_count: Optional[int]
    blocked: Optional[bool]


class UserInDBBase(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class User(UserInDBBase):
    pass


class UserInDB(UserInDBBase):
    pass
