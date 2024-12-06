from pydantic import SecretStr, Field
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    bot_token: str = Field(..., env="BOT_TOKEN")
    bot_name: str = Field(..., env="BOT_NAME")

    domain: str = Field(..., env="DOMAIN")
    bot_static_path: str = Field(default="bot/static/", env="BOT_STATIC_PATH")
    db_host: str = Field(..., env="DB_HOST")
    db_port: int = Field(..., env="DB_PORT")
    db_user: str = Field(..., env="DB_USER")
    db_password: SecretStr = Field(..., env="DB_PASSWORD")
    db_name: str = Field(..., env="DB_NAME")
    db_type: str = Field(..., env="DB_TYPE")
    db_driver: str = Field(..., env="DB_DRIVER")
    
    @property
    def db_url(self):
        return f"{self.db_type}+{self.db_driver}://{self.db_user}:{self.db_password.get_secret_value()}@{self.db_host}:{self.db_port}/{self.db_name}"

    class Config:
        env_file = "env"
        env_file_encoding = "utf-8"


settings = Settings()
