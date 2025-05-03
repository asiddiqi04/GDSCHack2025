from pydantic import BaseModel, EmailStr
from typing import List

class ProductCreate(BaseModel):
    name: str
    company: str
    desc: str
    score: int

class ProductResponse(ProductCreate):
    id: str

class UserCreate(BaseModel):
    uid: str
    email: EmailStr

class UserResponse(BaseModel):
    id: str
    uid: str
    email: EmailStr
    favourites: List[ProductResponse] = []
