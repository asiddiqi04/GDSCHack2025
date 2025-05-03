
from fastapi import APIRouter, Depends
from auth import verify_token
from models import Product
from schemas import ProductCreate, ProductResponse


router = APIRouter()

@router.post("/products", response_model=ProductResponse)
async def create_product(
    product: ProductCreate,
    token_data=Depends(verify_token)
):
    new_product = Product(**product.dict())
    await new_product.insert()

    return ProductResponse(
        id=str(new_product.id),
        name=new_product.name,
        company=new_product.company,
        desc=new_product.desc,
        score=new_product.score
    )