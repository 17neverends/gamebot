from datetime import datetime
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from tasks_shared.models.spotting.model import Spotting
from tasks_shared.models.user.model import User
from tasks_shared.models.spotting.schemas import (
    SpottingCreate,
    SpottingInDB
)
from sqlalchemy.future import select



class SpottingRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def insert_data(self, create_model: SpottingCreate) -> SpottingInDB:
        try:
            new_record = Spotting(**create_model)
            self.session.add(new_record)

            await self.session.commit()
            await self.session.refresh(new_record)

            return SpottingInDB.model_validate(new_record).model_dump()
        except Exception as e:
            pass

    async def get_leaderboard(self) -> List[dict]:
        result = await self.session.execute(
            select(Spotting.result_time, Spotting.moves_count, User.tg_id, User.username)
            .join(User, User.id == Spotting.user_id)
            .order_by(Spotting.result_time.desc(), Spotting.moves_count.desc())
            .limit(3)
        )
        records = result.fetchall()

        return [{"name": record[3],
                 "result_time": record[0],
                 "moves_count": record[1],
                 "tg_id": record[2]} for record in records]

    async def get_all(self,
                      start_date: Optional[datetime] = None,
                      end_date: Optional[datetime] = None) -> Optional[List[SpottingInDB]]:
        if start_date and end_date:
            conditions = [Spotting.created_at >= start_date, Spotting.created_at <= end_date]
        else:
            conditions = []
        sessions = await self.session.execute(
                select(Spotting).where(*conditions)
            )

        results = sessions.scalars().all()
        if results:
            return [SpottingInDB.model_validate(result).model_dump() for result in results]

        return []