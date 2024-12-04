from aiogram import Router, types
from bot.routers.games.factory import GamesCallbackFactory
from bot.routers.games.message import send_choose_game
from tasks_shared.models.user.repository import UserRepository
from tasks_shared.database_utils import get_session
from bot.routers.language.kb import lang_handler
from bot.utils.games import games_dict


router = Router()


@router.callback_query(GamesCallbackFactory.filter())
async def callbacks_choose_game(callback: types.CallbackQuery, 
                                callback_data: GamesCallbackFactory):
    user_id = callback.from_user.id
    async with get_session() as session:
        repository = UserRepository(session)
        user = await repository.get_user_by_tg_id(tg_id=user_id)
        if not user.lang:
            await callback.message.answer("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ", reply_markup=await lang_handler())
            return
        
    for k, v in games_dict.items():
        if callback_data.game == k:
            await send_choose_game(message=callback.message,
                                   language=user.lang,
                                   game=v)