import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart, CommandObject, Command
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram.types import WebAppInfo
from tasks_shared.models.user.repository import UserRepository
from tasks_shared.database_utils import get_session
from tasks_shared.models.user.schemas import UserCreate
from tasks_shared.database_utils import cook_models
from tasks_shared.database import init_db

from settings import settings
logging.basicConfig(level=logging.INFO)

bot = Bot(token=settings.bot_token)
dp = Dispatcher()

@dp.message(CommandStart())
async def start_handler(message: types.Message, command: CommandObject) -> None:
    tg_id = message.from_user.id
    async with get_session() as session:
        repository = UserRepository(session)

        user_exists = await repository.already_exists(tg_id=tg_id)
        comings_from = command.args if command.args else None

        if not user_exists:
            await repository.add_user(UserCreate(tg_id=tg_id,
                                                 comings_from=comings_from,
                                                 username=message.from_user.username))

        if command.args:
            splitted_args = command.args.split("_")
            if len(splitted_args) != 2:
                await message.answer("Некорректная ссылка")
                return

            if not user_exists and splitted_args[0] == "user":
                await repository.update_field_by_tg_id(
                    tg_id=int(splitted_args[1]),
                    field_name="referal_count"
                )

    await message.answer(f"Привет, {message.from_user.full_name}!")
    builder = InlineKeyboardBuilder()
    builder.add(types.InlineKeyboardButton(
                            text='15',
                            web_app=WebAppInfo(url=f"{settings.domain}/spotting",
                            isExpanded=True)
    ))
    builder.add(types.InlineKeyboardButton(
                            text='Судоки',
                            web_app=WebAppInfo(url=f"{settings.domain}/sudoku",
                            isExpanded=True)
    ))
    builder.add(types.InlineKeyboardButton(
                            text='3 в ряд', web_app=WebAppInfo(url="https://17neverends.github.io/test/", isExpanded=True)
                        ))
    builder.add(types.InlineKeyboardButton(
                            text='Кинг Конг', web_app=WebAppInfo(url="https://17neverends.github.io/test2/", isExpanded=True)
                        ))
    await message.answer(
        "Открыть игру",
        reply_markup=builder.as_markup()
    )


@dp.message(Command("referal"))
async def referal_handler(message: types.Message):
    await message.answer(f'https://t.me/{settings.bot_name}?start={message.from_user.id}')


async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(cook_models())
    asyncio.run(init_db())
    asyncio.run(main())
