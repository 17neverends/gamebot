from datetime import datetime
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func, update
from tasks_shared.models.user.model import User
from tasks_shared.models.king.model import King
from tasks_shared.models.match.model import Match
from tasks_shared.models.user.schemas import UserCreate, UserUpdate, User as UserSchema


class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def add_user(self, create_model: UserCreate) -> UserSchema:
        existing_user = await self.session.execute(select(User).filter_by(tg_id=create_model.tg_id))
        existing_user = existing_user.scalars().one_or_none()

        if existing_user:
            return UserSchema.model_validate(existing_user)

        new_user = User(**create_model.model_dump())
        self.session.add(new_user)

        await self.session.commit()
        await self.session.refresh(new_user)

        return UserSchema.model_validate(new_user)
    
    async def get_user_by_tg_id(self, tg_id: int) -> Optional[UserSchema]:
        existing_user = await self.session.execute(select(User).where(User.tg_id == tg_id))
        existing_user = existing_user.scalars().one_or_none()

        if existing_user:
            return UserSchema.model_validate(existing_user)

    async def update_user_by_tg_id(self,
                                   tg_id: int,
                                   user_update: UserUpdate) -> Optional[UserSchema]:
        print(user_update)
        await self.session.execute(
            update(User).where(User.tg_id == tg_id)
            .values(**user_update.model_dump(exclude_unset=True, exclude_none=True))
        )

        await self.session.commit()
        return await self.get_user_by_tg_id(tg_id=tg_id)

    async def already_exists(self, tg_id: int) -> bool:
        existing_user = await self.session.execute(select(User).filter_by(tg_id=tg_id))
        existing_user = existing_user.scalars().one_or_none()
        return bool(existing_user)

    async def update_field_by_tg_id(self,
                                    tg_id: int,
                                    field_name: str,
                                    increment_by: int | float = 1) -> Optional[UserSchema]:
        await self.session.execute(
            update(User)
            .where(User.tg_id == tg_id)
            .values({field_name: getattr(User, field_name) + increment_by})
        )

        await self.session.commit()
        return await self.get_user_by_tg_id(tg_id=tg_id)

    async def get_unique_users_by_period(self,
                                         start_date: str,
                                         end_date: str) -> Optional[UserSchema]:
        unique_user = await self.session.execute(
            select(User)
            .where(User.created_at >= start_date)
            .where(User.created_at <= end_date)
        )

        results = unique_user.scalars().all()
        if results:
            return [UserSchema.model_validate(result).model_dump() for result in results]

    async def get_all(self,
                      start_date: Optional[datetime] = None,
                      end_date: Optional[datetime] = None) -> Optional[List[User]]:
        if start_date and end_date:
            conditions = [User.created_at >= start_date, User.created_at <= end_date]
        else:
            conditions = []
        sessions = await self.session.execute(
                select(User).where(*conditions)
            )

        results = sessions.scalars().all()
        if results:
            user_data = []
            for result in results:
                total_time = await self.get_total_time_in_bot(tg_id=result.tg_id)
                exit_counts = await self.get_exit_counts_in_bot(tg_id=result.tg_id)
                
                user_dict = UserSchema.model_validate(result).model_dump()
                user_dict['total_time'] = total_time
                user_dict['exit_counts'] = exit_counts
                user_data.append(user_dict)
            
            return user_data

        return []
    
    async def get_total_time_in_bot(self, tg_id: int) -> int:
        user = await self.get_user_by_tg_id(tg_id=tg_id)

        king_result = await self.session.execute(
                select(func.sum(King.total_time))
                .where(King.user_id == user.id)
            )
        
        match_result = await self.session.execute(
                select(func.sum(Match.total_time))
                .where(Match.user_id == user.id)
            )

        total_time = (king_result.scalar() or 0) + (match_result.scalar() or 0)

        return total_time
    

    async def get_exit_counts_in_bot(self, tg_id: int) -> int:
        user = await self.get_user_by_tg_id(tg_id=tg_id)

        king_result = await self.session.execute(
            select(func.count())
            .where(King.user_id == user.id, King.total_time < 25)
        )
        
        match_result = await self.session.execute(
            select(func.count())
            .where(Match.user_id == user.id, Match.total_time < 25)
        )

        exit_counts = (king_result.scalar() or 0) + (match_result.scalar() or 0)

        return exit_counts