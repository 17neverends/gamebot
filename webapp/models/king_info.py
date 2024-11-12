from datetime import datetime
from pydantic import BaseModel


class KingInfo(BaseModel):
    entry_date: datetime
