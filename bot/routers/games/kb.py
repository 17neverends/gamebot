from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram import types
from settings import settings
from aiogram.types.web_app_info import WebAppInfo
from bot.utils.localize import open_game_text


async def game_handler(game: str, language: str):
    builder = InlineKeyboardBuilder()
    builder.add(types.InlineKeyboardButton(
                            text=open_game_text.get(language),
                            web_app=WebAppInfo(url=f"{settings.domain}/{game}",
                            isExpanded=True)
    ))
    
    return builder.as_markup()
