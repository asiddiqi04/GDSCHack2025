from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from models import Product, User

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["greenscore"]

async def init_db():
    await init_beanie(database=db, document_models=[Product, User])
