from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from tasks_shared.models.minisweeper.model import Minisweeper
from tasks_shared.models.user.model import User
from tasks_shared.models.minisweeper.schemas import (
    MinisweeperCreate,
    MinisweeperInDB
)
from sqlalchemy.future import select
from datetime import datetime


class MinisweeperRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_leaderboard(self, level: str) -> List[dict]:
        result = await self.session.execute(
            select(Minisweeper.result_time, User.tg_id, User.username)
            .where(Minisweeper.result_time != None, Minisweeper.status != None, Minisweeper.level == level)
            .join(User, User.id == Minisweeper.user_id)
            .order_by(Minisweeper.result_time.asc())
            .limit(3)
        )
        records = result.fetchall()
        return [{"name": record[2],
                 "result_time": record[0],
                 "tg_id": record[1]} for record in records]

    async def get_all(self,
                      start_date: Optional[datetime] = None,
                      end_date: Optional[datetime] = None) -> Optional[List[MinisweeperInDB]]:
        if start_date and end_date:
            conditions = [Minisweeper.created_at >= start_date, Minisweeper.created_at <= end_date]
        else:
            conditions = []
        sessions = await self.session.execute(
                select(Minisweeper).where(*conditions)
            )

        results = sessions.scalars().all()
        if results:
            return [MinisweeperInDB.model_validate(result).model_dump() for result in results]
        return []
    

    async def insert_data(self, create_model: MinisweeperCreate) -> MinisweeperInDB:
        try:
            stmt = await self.session.execute(
                select(Minisweeper).where(Minisweeper.result_time == None,
                                          Minisweeper.status == None,
                                          Minisweeper.level == None,
                                          Minisweeper.entry_date == create_model.get("entry_date"),
                                          Minisweeper.user_id == create_model.get("user_id"))
            )
            result = stmt.scalars().first()
            if result:
                result.result_time = create_model.get("result_time")
                result.level = create_model.get("level")
                await self.session.commit()
                await self.session.refresh(result)
                return MinisweeperInDB.model_validate(result).model_dump()
            else:
                new_record = Minisweeper(**create_model)
                self.session.add(new_record)

                await self.session.commit()
                await self.session.refresh(new_record)

                return MinisweeperInDB.model_validate(new_record).model_dump()
        except Exception as e:
            print(e)