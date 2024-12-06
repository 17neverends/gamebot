from aiogram.filters.callback_data import CallbackData


class LanguageCallbackFactory(CallbackData, prefix="lang"):
    action: str
    value: str
