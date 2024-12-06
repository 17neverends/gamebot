import asyncio
import logging
from aiogram import Bot, Dispatcher
from bot.routers.language.commands import router as lang_commands_router
from bot.routers.language.callbacks import router as lang_callbacks_router
from bot.routers.games.commands import router as games_commands_router
from bot.routers.games.callbacks import router as games_callbacks_router
from settings import settings
from bot.utils.config import set_bot_description

new_bot = Bot(token=settings.bot_token)


async def main():    
    logging.basicConfig(level=logging.INFO)
    await set_bot_description(bot=new_bot)
    dp = Dispatcher()
    dp.include_router(lang_commands_router)
    dp.include_router(lang_callbacks_router)
    dp.include_router(games_commands_router)
    dp.include_router(games_callbacks_router)

    await dp.start_polling(new_bot)


if __name__ == "__main__":
    asyncio.run(main())
