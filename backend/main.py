from fastapi import FastAPI, HTTPException
from models import Product
from schemas import ProductResponse
from db import init_db
from contextlib import asynccontextmanager
import uvicorn
from routes.user import router as user_router
from routes.favourites import router as favourites_router
from routes.products import router as products_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(lifespan=lifespan)

# login route
app.include_router(user_router, prefix="/auth", tags=["Auth"])
# create route
app.include_router(favourites_router, prefix="/users", tags=["Favourites"])

app.include_router(products_router, prefix="")


if __name__ == "__main__":
    print("hello")
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
