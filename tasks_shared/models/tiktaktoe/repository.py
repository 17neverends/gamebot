from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from tasks_shared.models.tiktaktoe.model import Tiktaktoe
from tasks_shared.models.user.model import User
from tasks_shared.models.tiktaktoe.schemas import (
    TiktaktoeCreate,
    TiktaktoeInDB
)
from sqlalchemy.future import select
from datetime import datetime


class TiktaktoeRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_leaderboard(self) -> List[dict]:
        result = await self.session.execute(
            select(Tiktaktoe.result_time, User.tg_id, User.username)
            .where(Tiktaktoe.result_time != None, Tiktaktoe.status == "win")
            .join(User, User.id == Tiktaktoe.user_id)
            .order_by(Tiktaktoe.result_time.asc())
            .limit(3)
        )
        records = result.fetchall()
        return [{"name": record[2],
                 "result_time": record[0],
                 "tg_id": record[1]} for record in records]

    async def get_all(self,
                      start_date: Optional[datetime] = None,
                      end_date: Optional[datetime] = None) -> Optional[List[TiktaktoeInDB]]:
        if start_date and end_date:
            conditions = [Tiktaktoe.created_at >= start_date, Tiktaktoe.created_at <= end_date]
        else:
            conditions = []
        sessions = await self.session.execute(
                select(Tiktaktoe).where(*conditions)
            )

        results = sessions.scalars().all()
        if results:
            return [TiktaktoeInDB.model_validate(result).model_dump() for result in results]
        return []
    

    async def insert_data(self, create_model: TiktaktoeCreate) -> TiktaktoeInDB:
        try:
            stmt = await self.session.execute(
                select(Tiktaktoe).where(Tiktaktoe.result_time == None,
                                        Tiktaktoe.status == None,
                                        Tiktaktoe.entry_date == create_model.get("entry_date"),
                                        Tiktaktoe.user_id == create_model.get("user_id"))
            )
            result = stmt.scalars().first()
            if result:
                result.result_time = create_model.get("result_time")
                result.status = create_model.get("status")
                await self.session.commit()
                await self.session.refresh(result)
                return TiktaktoeInDB.model_validate(result).model_dump()
            else:
                new_record = Tiktaktoe(**create_model)
                self.session.add(new_record)

                await self.session.commit()
                await self.session.refresh(new_record)

                return TiktaktoeInDB.model_validate(new_record).model_dump()
        except Exception as e:
            print(e)