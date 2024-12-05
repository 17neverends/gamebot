from aiogram import Router, types
from bot.routers.games.factory import BackCallbackFactory
from bot.routers.games.message import send_games


router = Router()


@router.callback_query(BackCallbackFactory.filter())
async def callbacks_back_event(callback: types.CallbackQuery, 
                               callback_data: BackCallbackFactory):
    if callback_data.action == "back":
        await send_games(message=callback.message, language=callback_data.language)

    await callback.message.delete()
