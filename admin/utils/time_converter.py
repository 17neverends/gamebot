from datetime import datetime


async def convert_datetime_to_string(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%d %H:%M:%S")

async def convert_string_to_datetime(dt: str) -> datetime:
    return datetime.strptime(dt, "%Y-%m-%d")
