from bot.routers.language.kb import lang_handler
from aiogram.filters import  Command
from aiogram import Router, types, F
from tasks_shared.models.user.repository import UserRepository
from tasks_shared.database_utils import get_session
from bot.routers.games.message import send_games
from bot.utils.games import games_dict, coincidence_dict
from bot.utils.localize import value_error_text
from bot.routers.games.message import send_choose_game


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


@router.message(F.text)
async def callbacks_choose_game(message: types.Message):
    user_id = message.from_user.id
    async with get_session() as session:
        repository = UserRepository(session)
        user = await repository.get_user_by_tg_id(tg_id=user_id)
        if not user.lang:
            await message.answer("ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ", reply_markup=await lang_handler())
            return
    try:
        int(message.text)
    except ValueError:
        message.answer(value_error_text.get(user.lang))
        return
        
    for k, v in games_dict.items():
        if message.text == k:
            await send_choose_game(message=message,
                                   language=user.lang,
                                   game=v)
            return
    for k, v in coincidence_dict.items():
        print(k, v)
        if message.text in v:
            await send_choose_game(message=message,
                                   language=user.lang,
                                   game=k)
            return
    
    await message.answer("Не удалось найти игру, попробуйте ещё раз")