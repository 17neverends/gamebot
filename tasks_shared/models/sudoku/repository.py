from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from tasks_shared.models.sudoku.model import Sudoku
from tasks_shared.models.user.model import User
from tasks_shared.models.sudoku.schemas import (
    SudokuCreate,
    SudokuInDB
)
from sqlalchemy.future import select
from datetime import datetime


class SudokuRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_leaderboard(self, level: str) -> List[dict]:
        result = await self.session.execute(
            select(Sudoku.result_time, User.tg_id, User.username)
            .where(Sudoku.result_time != None, Sudoku.level != None)
            .join(User, User.id == Sudoku.user_id)
            .filter(Sudoku.level == level)
            .order_by(Sudoku.result_time.asc())
            .limit(3)
        )
        records = result.fetchall()
        return [{"name": record[2],
                 "result_time": record[0],
                 "tg_id": record[1]} for record in records]

    async def get_all(self,
                      start_date: Optional[datetime] = None,
                      end_date: Optional[datetime] = None) -> Optional[List[SudokuInDB]]:
        if start_date and end_date:
            conditions = [Sudoku.created_at >= start_date, Sudoku.created_at <= end_date]
        else:
            conditions = []
        sessions = await self.session.execute(
                select(Sudoku).where(*conditions)
            )

        results = sessions.scalars().all()
        if results:
            return [SudokuInDB.model_validate(result).model_dump() for result in results]
        return []
    

    async def insert_data(self, create_model: SudokuCreate) -> SudokuInDB:
        try:
            stmt = await self.session.execute(
                select(Sudoku).where(Sudoku.result_time == None,
                                     Sudoku.entry_date == create_model.get("entry_date"),
                                     Sudoku.user_id == create_model.get("user_id"))
            )
            result = stmt.scalars().first()
            if result:
                result.result_time = create_model.get("result_time")
                result.level = create_model.get("level")
                await self.session.commit()
                await self.session.refresh(result)
                return SudokuInDB.model_validate(result).model_dump()
            else:
                new_record = Sudoku(**create_model)
                self.session.add(new_record)

                await self.session.commit()
                await self.session.refresh(new_record)

                return SudokuInDB.model_validate(new_record).model_dump()
        except Exception as e:
            print(e)