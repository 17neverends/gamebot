from datetime import datetime
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update
from tasks_shared.models.user.model import User
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
        await self.session.execute(
            update(User).where(User.tg_id == tg_id)
            .values(**user_update)
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
            return [UserSchema.model_validate(result).model_dump() for result in results]

        return []