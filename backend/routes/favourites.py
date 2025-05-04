from fastapi import APIRouter, Depends, HTTPException
from beanie import PydanticObjectId
from auth import verify_token
from models import User, Product
from schemas import ProductCreate, ProductResponse
from typing import List

router = APIRouter()

@router.post("/favourites", response_model=ProductResponse)
async def add_to_favourites(product: ProductCreate, token_data=Depends(verify_token)):
    uid = token_data["uid"]
    user = await User.find_one(User.uid == uid)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Use product_name + brand as a unique combo
    existing = await Product.find_one(
        Product.product_name == product.product_name,
        Product.brand == product.brand
    )

    if not existing:
        existing = Product(**product.dict())
        await existing.insert()

    if existing not in user.favourites:
        user.favourites.append(existing)
        await user.save()

    return ProductResponse(**existing.dict())


@router.get("/favourites", response_model=List[ProductResponse])
async def get_favourites(token_data=Depends(verify_token)):
    uid = token_data["uid"]
    user = await User.find_one(User.uid == uid)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    await user.fetch_link(User.favourites)

    return [
        ProductResponse(**product.dict())
        for product in user.favourites
    ]
