from aiogram import types
from bot.utils.localize import welcome_text


async def send_greeting(message: types.Message, language: str) -> None:
    await message.answer(text=welcome_text.get(language))
