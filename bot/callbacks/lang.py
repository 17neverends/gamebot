from aiogram.types import CallbackQuery
from bot.main import dp
from tasks_shared.models.user.repository import UserRepository
from tasks_shared.models.user.schemas import UserUpdate
from tasks_shared.database_utils import get_session



@dp.callback_query_handler(lambda call: call.data in {"ru", "gb", "in"})
async def callback_handler(callback_query: CallbackQuery):
    callback_data = callback_query.data
    if callback_data == "ru":
        await callback_query.message.answer("Вы нажали на кнопку 1")
    elif callback_data == "gb":
        await callback_query.message.answer("Вы нажали на кнопку 2")
    elif callback_data == "in":
        await callback_query.message.answer("Вы нажали на кнопку 2")
    await callback_query.answer()