from datetime import datetime
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from tasks_shared.models.match.model import Match
from tasks_shared.models.match.schemas import (
    MatchCreate,
    MatchInDB
)
from sqlalchemy.future import select



class MatchRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def insert_data(self, create_model: MatchCreate) -> MatchInDB:
        try:
            new_record = Match(**create_model)
            self.session.add(new_record)

            await self.session.commit()
            await self.session.refresh(new_record)

            return MatchInDB.model_validate(new_record).model_dump()
        except Exception as e:
            pass

    async def get_all(self,
                      start_date: Optional[datetime] = None,
                      end_date: Optional[datetime] = None) -> Optional[List[MatchInDB]]:
        if start_date and end_date:
            conditions = [Match.created_at >= start_date, Match.created_at <= end_date]
        else:
            conditions = []
        sessions = await self.session.execute(
                select(Match).where(*conditions)
            )

        results = sessions.scalars().all()
        if results:
            return [MatchInDB.model_validate(result).model_dump() for result in results]

        return []