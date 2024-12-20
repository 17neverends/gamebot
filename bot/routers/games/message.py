from aiogram import types
from bot.utils.localize import games_text, games_description
from bot.routers.games.kb import game_handler
from aiogram.types import FSInputFile
from settings import settings

async def send_games(message: types.Message, language: str) -> None:
    await message.answer(text=games_text.get(language))


async def send_choose_game(message: types.Message,
                           language: str,
                           game: str) -> None:
    try:
        game_image = FSInputFile(f"{settings.bot_static_path}{game}.jpeg")

        await message.answer_photo(caption=games_description.get(game).get(language),
                                   reply_markup=await game_handler(game=game, language=language),
                                   photo=game_image)
    except Exception as e:
        print(e)
        await message.answer(text=games_description.get(game).get(language),
                                  reply_markup=await game_handler(game=game, language=language))
