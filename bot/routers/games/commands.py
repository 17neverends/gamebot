from bot.routers.language.kb import lang_handler
from aiogram.filters import  Command
from aiogram import Router, types
from tasks_shared.models.user.repository import UserRepository
from tasks_shared.database_utils import get_session
from bot.routers.games.message import send_games

router = Router()


@router.message(Command("games"))
async def games_handler(message: types.Message) -> None:
    tg_id = message.from_user.id

    async with get_session() as session:
        repository = UserRepository(session)

        user = await repository.get_user_by_tg_id(tg_id)
        if not user.lang:
            await message.answer("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ", reply_markup=await lang_handler())
        else:
            await send_games(message=message, language=user.lang)
