from typing import List, Optional

from beanie import Document, Link
from models import Product, Scores
from pydantic import BaseModel, EmailStr


class ProductCreate(BaseModel):
    product_name: str
    brand: str
    pros: List[str]
    cons: List[str]
    scores: Scores
    notes: List[str]
    similar_products: List[str]

class ProductResponse(ProductCreate):
    product_name: str
    brand: str
    pros: List[str]
    cons: List[str]
    scores: Scores
    notes: List[str]
    similar_products: List[str]

class UserCreate(BaseModel):
    uid: str
    email: EmailStr

class UserResponse(BaseModel):
    id: str
    uid: str
    email: EmailStr
    favourites: List[ProductResponse] = []

  
class ImageRequest(BaseModel):
    image_base64: str

class ChatBotRequest(BaseModel):
  message: str
  
class ChatBotResponse(BaseModel):
  message: str
    
class SearchRequest(BaseModel):
    product_name: Optional[str] = None
    brand: Optional[str] = None
    country: Optional[str] = None
    descriptors: Optional[str] = None
    page: Optional[int] = 1
    page_size: Optional[int] = 10

class EvaluationRequest(BaseModel):
    product_name: str
    brands: str
    ingredients_text: Optional[str]
    allergens: Optional[str]
    ecoscore_grade: Optional[str]
    packaging_materials_tags: Optional[List[str]] = []
    packaging_recycling_tags: Optional[List[str]] = []
    nova_groups_tags: Optional[List[str]] = []