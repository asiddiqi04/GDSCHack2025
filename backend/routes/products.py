from fastapi import APIRouter, Depends
from models import Product
from schemas import ProductCreate, ProductResponse
from typing import List
from auth import verify_token

router = APIRouter()

@router.post("/products", response_model=ProductResponse)
async def create_product(
    product: ProductCreate,
    token_data=Depends(verify_token)
):
    new_product = Product(**product.dict())
    await new_product.insert()

    # Return it manually to convert ObjectId to str if needed
    return ProductResponse(**new_product.dict())


@router.get("/products", response_model=List[ProductResponse])
async def get_latest_products():
    products = await Product.find_all().sort("-_id").limit(10).to_list()
    return [ProductResponse(**p.dict()) for p in products]