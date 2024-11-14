from datetime import datetime
from tasks_shared.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey 
from utils.mixins.timestamps_mixin import TimestampMixin


class King(Base, TimestampMixin):
    __tablename__ = "king"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    entry_date: Mapped[datetime]
    total_time: Mapped[float | None] = mapped_column(nullable=True)
    device: Mapped[str] = mapped_column(nullable=True)
    language: Mapped[str] = mapped_column(nullable=True)

    class Config:
        orm_mode = True
        from_attributes = True
