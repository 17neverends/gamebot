from tasks_shared.database import Base
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from utils.mixins.timestamps_mixin import TimestampMixin


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    tg_id: Mapped[int] = mapped_column(unique=True)
    username: Mapped[str]
    comings_from: Mapped[str] = mapped_column(nullable=True)
    visits_count: Mapped[int] = mapped_column(default=0)
    exit_count: Mapped[int] = mapped_column(default=0)
    referal_count: Mapped[int] = mapped_column(default=0)
    total_time: Mapped[float] = mapped_column(default=0)
    blocked: Mapped[bool] = mapped_column(default=False)

    class Config:
        orm_mode = True
        from_attributes = True
