from bot.utils.localize import start_keyboard_text
from aiogram.utils.keyboard import InlineKeyboardBuilder
from bot.routers.language.factory import LanguageCallbackFactory


async def lang_handler():
    builder = InlineKeyboardBuilder()
    for callback_value, button_text in start_keyboard_text.get("button_text").items():
        callback_data = LanguageCallbackFactory(action="change", value=callback_value) 
        builder.button(text=button_text,
                       callback_data=callback_data
        )
    
    return builder.as_markup()
