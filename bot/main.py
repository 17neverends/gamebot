import asyncio
import logging
from aiogram import Bot, Dispatcher
from routers.language.commands import router as lang_commands_router
from routers.language.callbacks import router as lang_callbacks_router
from settings import settings


async def main():
    logging.basicConfig(level=logging.INFO)
    bot = Bot(token=settings.bot_token)
    dp = Dispatcher()
    dp.include_router(lang_commands_router)
    dp.include_router(lang_callbacks_router)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
