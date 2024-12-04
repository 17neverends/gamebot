from aiogram.filters.callback_data import CallbackData


class GamesCallbackFactory(CallbackData, prefix="lang"):
    game: str
