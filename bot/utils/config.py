from aiogram import Bot
from aiogram.types import BotCommand
from bot.utils.localize import command_text

commands_list = ["lang", "games"]


async def set_bot_description(bot: Bot):
    description = (
        "Игры без скачивания прямо в клиенте Telegram"
    )
    await bot.set_my_description(description=description)


async def set_commands(bot: Bot, language: str) -> None:
    commands = []
    for command in commands_list:
        commands.append(BotCommand(command=command,
                                   description=f"{command_text.get(command).get(language)}"))

    await bot.set_my_commands(commands=commands)
