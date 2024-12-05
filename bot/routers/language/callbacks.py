from aiogram import Router, types
from bot.routers.language.factory import LanguageCallbackFactory
from bot.routers.greeting.message import send_greeting
from tasks_shared.models.user.repository import UserRepository
from tasks_shared.database_utils import get_session
from tasks_shared.models.user.schemas import UserUpdate
from bot.routers.games.commands import send_games
from bot.utils.config import set_commands
from bot.main import new_bot


router = Router()


@router.callback_query(LanguageCallbackFactory.filter())
async def callbacks_lang_change(callback: types.CallbackQuery, 
                                callback_data: LanguageCallbackFactory):
    if callback_data.action == "change":
        update_model = UserUpdate(lang=callback_data.value)
        async with get_session() as session:
            repository = UserRepository(session)
            updated_user = await repository.update_user_by_tg_id(tg_id=callback.from_user.id,
                                                                 user_update=update_model)
    if updated_user:
        await set_commands(bot=new_bot, language=updated_user.lang)
        await callback.message.delete()
        await send_greeting(callback.message, updated_user.lang)
        await send_games(callback.message, updated_user.lang)
