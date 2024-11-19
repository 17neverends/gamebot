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
                is_referal_user_exists = await repository.already_exists(tg_id=int(splitted_args[1]))
                if not is_referal_user_exists:
                    await message.answer("Пользователя, который Вас пригласал не существует в этом боте")
                else:
                    await repository.update_field_by_tg_id(
                        tg_id=int(splitted_args[1]),
                        field_name="referal_count"
                    )

    await message.answer(f"Привет, {message.from_user.full_name}!")
    builder = InlineKeyboardBuilder()
    builder.button(types.InlineKeyboardButton(
                            text='15',
                            web_app=WebAppInfo(url=f"{settings.domain}/spotting",
                            isExpanded=True)
    ))
    builder.button(types.InlineKeyboardButton(
                            text='Судоку',
                            web_app=WebAppInfo(url=f"{settings.domain}/sudoku",
                            isExpanded=True)
    ))
    builder.button(types.InlineKeyboardButton(
                            text='3 в ряд', web_app=WebAppInfo(url=f"{settings.domain}/match", isExpanded=True)
                        ))
    builder.button(types.InlineKeyboardButton(
                            text='Кинг Конг', web_app=WebAppInfo(url=f"{settings.domain}/king", isExpanded=True)
                        ))
    builder.button(types.InlineKeyboardButton(
                            text='Вордли',
                            web_app=WebAppInfo(url=f"{settings.domain}/wordle",
                            isExpanded=True)
    ))
    builder.button(types.InlineKeyboardButton(
                            text='Сапёр', web_app=WebAppInfo(url=f"{settings.domain}/minisweeper", isExpanded=True)
                        ))
    builder.button(types.InlineKeyboardButton(
                            text='Крестики-нолики', web_app=WebAppInfo(url=f"{settings.domain}/tiktaktoe", isExpanded=True)
                        ))
    builder.button(types.InlineKeyboardButton(
                            text='Тетрис', web_app=WebAppInfo(url=f"{settings.domain}/tetris", isExpanded=True)
                        ))
    builder.adjust(3, 3, 2)
    await message.answer(
        "Открыть игру",
        reply_markup=builder.as_markup()
    )


@dp.message(Command("referal"))
async def referal_handler(message: types.Message):
    await message.answer(f'https://t.me/{settings.bot_name}?start=user_{message.from_user.id}')


async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(cook_models())
    asyncio.run(init_db())
    asyncio.run(main())
