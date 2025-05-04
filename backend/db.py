from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from models import Product, User
from dotenv import load_dotenv
import os
load_dotenv()
MONGOURI = os.getenv("MONGOURI")
client = AsyncIOMotorClient(MONGOURI)

db = client["greenscore"]


async def init_db():
    await init_beanie(database=db, document_models=[Product, User])

