import asyncio
import json
import os
from datetime import date

from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import (
    WebAppInfo,
    ReplyKeyboardMarkup,
    KeyboardButton
)
from dotenv import load_dotenv


# ---------- CONFIG ----------
load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")
WEBAPP_URL = "https://aivora1.github.io/AI_AVATAR/" 

USERS_FILE = "users.json"

# ---------- INIT ----------
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


# ---------- HELPERS ----------
def load_users():
    if not os.path.exists(USERS_FILE):
        return {}
    with open(USERS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_users(users):
    with open(USERS_FILE, "w", encoding="utf-8") as f:
        json.dump(users, f, ensure_ascii=False, indent=2)


# ---------- COMMANDS ----------
@dp.message(Command("start"))
async def start(message: types.Message):
    keyboard = ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(
                    text="🔮 Посмотреть мой день",
                    web_app=WebAppInfo(url=WEBAPP_URL)
                )
            ]
        ],
        resize_keyboard=True
    )

    await message.answer(
        "✨ Твой персональный гороскоп готов\n\n"
        "Нажми кнопку ниже, чтобы открыть свой день 👇",
        reply_markup=keyboard
    )


# ---------- WEB APP DATA ----------
@dp.message(lambda m: m.web_app_data is not None)
async def webapp_handler(message: types.Message):
    data = json.loads(message.web_app_data.data)

    users = load_users()
    user_id = str(message.from_user.id)

    users[user_id] = {
        "telegram_id": user_id,
        "name": data.get("name"),
        "birth_date": data.get("birth_date"),
        "zodiac": data.get("zodiac"),
        "created_at": str(date.today()),
        "last_open": str(date.today()),
        "streak": 1
    }

    save_users(users)

    await message.answer(
        "🔮 Готово!\n\n"
        "Твой аватар создан, а прогноз уже ждёт тебя ✨\n"
        "Возвращайся завтра за новым днём."
    )


# ---------- MAIN ----------
async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
