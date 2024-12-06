from aiogram.filters.callback_data import CallbackData


class BackCallbackFactory(CallbackData, prefix="event"):
    action: str
    language: str
