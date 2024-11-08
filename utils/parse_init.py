from aiogram.utils.web_app import safe_parse_webapp_init_data
from urllib.parse import parse_qs
import json
import os
from settings import settings

async def get_user_id_from_authorization(authorization: str) -> dict:
    try:
        safe_parse_webapp_init_data(token=settings.bot_token, init_data=authorization)
    except ValueError:
        return None
    parsed_qs = parse_qs(authorization)
    user_json = parsed_qs.get("user", [None])[0]
    if not user_json:
        return None
    try:
        user = json.loads(user_json)
        return user
    except json.JSONDecodeError:
        return None
