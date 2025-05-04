from fastapi import FastAPI, HTTPException
from models import Product
from schemas import ProductResponse
from db import init_db
from contextlib import asynccontextmanager
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from routes.user import router as user_router
from routes.favourites import router as favourites_router
from routes.products import router as products_router
from routes.search import router as search_router
from routes.chatbot import router as chat_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# login route
app.include_router(user_router, prefix="/auth", tags=["Auth"])
# create route
app.include_router(favourites_router, prefix="/users", tags=["Favourites"])

app.include_router(products_router, prefix="")

app.include_router(search_router, prefix="/search")

app.include_router(chat_router, prefix="/chat")


if __name__ == "__main__":
    print("hello")
    uvicorn.run("main:app", host="127.0.0.1", port=8002, reload=True)
