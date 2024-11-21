from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from tasks_shared.models.wordle.model import Wordle
from tasks_shared.models.user.model import User
from tasks_shared.models.wordle.schemas import (
    WordleCreate,
    WordleInDB
)
from sqlalchemy.future import select
from datetime import datetime


class WordleRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_leaderboard(self) -> List[dict]:
        result = await self.session.execute(
            select(Wordle.result_time, User.tg_id, User.username)
            .where(Wordle.result_time != None, Wordle.status == "win")
            .join(User, User.id == Wordle.user_id)
            .order_by(Wordle.result_time.asc())
            .limit(3)
        )
        records = result.fetchall()
        return [{"name": record[2],
                 "result_time": record[0],
                 "tg_id": record[1]} for record in records]

    async def get_all(self,
                      start_date: Optional[datetime] = None,
                      end_date: Optional[datetime] = None) -> Optional[List[WordleInDB]]:
        if start_date and end_date:
            conditions = [Wordle.created_at >= start_date, Wordle.created_at <= end_date]
        else:
            conditions = []
        sessions = await self.session.execute(
                select(Wordle).where(*conditions)
            )

        results = sessions.scalars().all()
        if results:
            return [WordleInDB.model_validate(result).model_dump() for result in results]
        return []
    

    async def insert_data(self, create_model: WordleCreate) -> WordleInDB:
        try:
            stmt = await self.session.execute(
                select(Wordle).where(Wordle.result_time == None,
                                     Wordle.status == None,
                                     Wordle.entry_date == create_model.get("entry_date"),
                                     Wordle.user_id == create_model.get("user_id"))
            )
            result = stmt.scalars().first()
            if result:
                result.result_time = create_model.get("result_time")
                result.status = create_model.get("status")
                await self.session.commit()
                await self.session.refresh(result)
                return WordleInDB.model_validate(result).model_dump()
            else:
                new_record = Wordle(**create_model)
                self.session.add(new_record)

                await self.session.commit()
                await self.session.refresh(new_record)

                return WordleInDB.model_validate(new_record).model_dump()
        except Exception as e:
            print(e)