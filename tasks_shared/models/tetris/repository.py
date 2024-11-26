from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from tasks_shared.models.tetris.model import Tetris
from tasks_shared.models.user.model import User
from tasks_shared.models.tetris.schemas import (
    TetrisCreate,
    TetrisInDB
)
from sqlalchemy.future import select
from datetime import datetime


class TetrisRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_leaderboard(self, level: str) -> List[dict]:
        result = await self.session.execute(
            select(Tetris.score, User.tg_id, User.username)
            .where(Tetris.result_time != None, Tetris.score != None)
            .join(User, User.id == Tetris.user_id)
            .filter(Tetris.level == level)
            .order_by(Tetris.score.desc())
            .limit(3)
        )
        records = result.fetchall()
        print(records)
        return [{"name": record[2],
                 "score": record[0],
                 "tg_id": record[1]} for record in records]

    async def get_all(self,
                      start_date: Optional[datetime] = None,
                      end_date: Optional[datetime] = None) -> Optional[List[TetrisInDB]]:
        if start_date and end_date:
            conditions = [Tetris.created_at >= start_date, Tetris.created_at <= end_date]
        else:
            conditions = []
        sessions = await self.session.execute(
                select(Tetris).where(*conditions)
            )

        results = sessions.scalars().all()
        if results:
            return [TetrisInDB.model_validate(result).model_dump() for result in results]
        return []
    

    async def insert_data(self, create_model: TetrisCreate) -> TetrisInDB:
        try:
            stmt = await self.session.execute(
                select(Tetris).where(Tetris.result_time == None,
                                     Tetris.level == None,
                                     Tetris.score == None,
                                     Tetris.entry_date == create_model.get("entry_date"),
                                     Tetris.user_id == create_model.get("user_id"))
            )
            result = stmt.scalars().first()
            if result:
                result.result_time = create_model.get("result_time")
                result.level = create_model.get("level")
                result.score = create_model.get("score")
                await self.session.commit()
                await self.session.refresh(result)
                return TetrisInDB.model_validate(result).model_dump()
            else:
                new_record = Tetris(**create_model)
                self.session.add(new_record)

                await self.session.commit()
                await self.session.refresh(new_record)

                return TetrisInDB.model_validate(new_record).model_dump()
        except Exception as e:
            print(e)