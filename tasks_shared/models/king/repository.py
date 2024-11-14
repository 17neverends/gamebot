from datetime import datetime
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from tasks_shared.models.king.model import King
from tasks_shared.models.king.schemas import (
    KingCreate,
    KingInDB,
    KingUpdate
)
from sqlalchemy.future import select



class KingRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def insert_data(self, create_model: KingCreate) -> KingInDB:
        try:
            new_record = King(**create_model)
            self.session.add(new_record)

            await self.session.commit()
            await self.session.refresh(new_record)

            return KingInDB.model_validate(new_record).model_dump()
        except Exception as e:
            pass

    async def get_all(self,
                      start_date: Optional[datetime] = None,
                      end_date: Optional[datetime] = None) -> Optional[List[KingInDB]]:
        if start_date and end_date:
            conditions = [King.created_at >= start_date, King.created_at <= end_date]
        else:
            conditions = []
        sessions = await self.session.execute(
                select(King).where(*conditions)
            )

        results = sessions.scalars().all()
        if results:
            return [KingInDB.model_validate(result).model_dump() for result in results]

        return []
    
    async def update_time_on_session(self, update_model: KingUpdate) -> KingInDB:
        try:
            king = await self.session.get(King, update_model.user_id)
            king.total_time = king.total_time + update_model.total_time
            await self.session.commit()
            await self.session.refresh(king)
            return KingInDB.model_validate(king).model_dump()
        except Exception as e:
            pass