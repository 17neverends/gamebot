from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram import types
from settings import settings
from aiogram.types.web_app_info import WebAppInfo
from bot.utils.localize import open_game_text, back_event
from bot.routers.games.factory import BackCallbackFactory



async def game_handler(game: str, language: str):
    builder = InlineKeyboardBuilder()
    callback_data = BackCallbackFactory(action="back", language=language)
    builder.button(text=f"{back_event.get(language)} 🔙",
                   callback_data=callback_data)
    builder.add(types.InlineKeyboardButton(
                            text=open_game_text.get(language),
                            web_app=WebAppInfo(url=f"{settings.domain}/{game}?lang={language}",
                            isExpanded=True)
    ))
    
    return builder.as_markup()
