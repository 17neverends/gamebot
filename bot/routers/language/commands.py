from bot.routers.games.message import send_games
from bot.routers.language.kb import lang_handler
from aiogram.filters import CommandStart, CommandObject, Command
from aiogram import Router, types
from tasks_shared.models.user.repository import UserRepository
from tasks_shared.database_utils import get_session
from tasks_shared.models.user.schemas import UserCreate
from bot.routers.greeting.message import send_greeting

router = Router()


@router.message(CommandStart())
async def start_handler(message: types.Message, command: CommandObject) -> None:
    tg_id = message.from_user.id
    username = message.from_user.username
    comings_from = command.args if command.args else None

    async with get_session() as session:
        repository = UserRepository(session)

        user = await repository.get_user_by_tg_id(tg_id)
        if not user:
            await repository.add_user(UserCreate(tg_id=tg_id, comings_from=comings_from, username=username))
            await message.answer(text="ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ", reply_markup=await lang_handler())
        else:
            if not user.lang:
                await message.answer(text="ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ", reply_markup=await lang_handler())
                return
            await send_greeting(message=message, language=user.lang)
            await send_games(message=message, language=user.lang)


        if command.args:
            splitted_args = command.args.split("_")
            if len(splitted_args) != 2:
                await message.answer("Некорректная ссылка")
                return

            ref_type, ref_id = splitted_args
            if not user and ref_type == "user":
                referer_exists = await repository.already_exists(tg_id=int(ref_id))
                if not referer_exists:
                    await message.answer("Пользователя, который Вас пригласил, не существует в этом боте")
                else:
                    await repository.update_field_by_tg_id(
                        tg_id=int(ref_id),
                        field_name="referal_count"
                    )



@router.message(Command("lang"))
async def lang_command(message: types.Message) -> None:
    await message.answer(text="ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ", reply_markup=await lang_handler())
