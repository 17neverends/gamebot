from tasks_shared.database import Base
from sqlalchemy.types import BigInteger
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from utils.mixins.timestamps_mixin import TimestampMixin


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    tg_id: Mapped[int] = mapped_column(BigInteger, unique=True)
    username: Mapped[str]
    comings_from: Mapped[str] = mapped_column(nullable=True)
    visits_count: Mapped[int] = mapped_column(default=0)
    referal_count: Mapped[int] = mapped_column(default=0)
    blocked: Mapped[bool] = mapped_column(default=False)
    lang : Mapped[str] = mapped_column(nullable=True)

    class Config:
        orm_mode = True
        from_attributes = True
