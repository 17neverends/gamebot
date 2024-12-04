from aiogram import types
from bot.utils.localize import welcome_text
from aiogram.enums.parse_mode import ParseMode


async def send_greeting(message: types.Message, language: str) -> None:
    await message.answer(text=welcome_text.get(language), parse_mode=ParseMode.HTML)
