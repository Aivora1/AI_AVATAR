import asyncio
import json
import os

from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import WebAppInfo, ReplyKeyboardMarkup, KeyboardButton
from dotenv import load_dotenv

from state import get_user, can_chat, MAX_ENERGY

load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


@dp.message(Command("start"))
async def start(message: types.Message):
    keyboard = ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(
                    text="🚀 Открыть AI Аватара",
                    web_app=WebAppInfo(url="https://YOUR_GITHUB_PAGES_URL")
                )
            ]
        ],
        resize_keyboard=True
    )
    await message.answer("Создай своего AI-аватара 👇", reply_markup=keyboard)


@dp.message()
async def handle_message(message: types.Message):
    user = get_user(message.from_user.id)

    # данные из Web App
    if message.web_app_data:
        data = json.loads(message.web_app_data.data)

        if data["action"] == "create_avatar":
            user["avatar"] = data
            await message.answer("🤖 Аватар создан. Напиши мне что-нибудь!")
            return

    # обычный чат
    if not can_chat(user):
        await message.answer(
            "⚡ Энергия закончилась\n\n"
            "⏳ Подожди или оформи подписку"
        )
        return

    user["messages"] += 1

    if not user["subscribed"]:
        user["energy"] -= 1
        if user["energy"] == 0:
            user["last_empty"] = __import__("time").time()

    # AI-заглушка (пока)
    reply = f"AI ({user['messages']}): я тебя слышу"

    if user["messages"] >= 6:
        reply += "\n\n👀 Кажется, мы начинаем понимать друг друга"

    await message.answer(reply)


async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
