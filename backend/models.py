from beanie import Document, Link
from pydantic import EmailStr
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel


class Scores(BaseModel):
    sustainability: int
    ethical: int
    combined: int

class Product(Document):
    product_name: str
    brand: str
    pros: List[str]
    cons: List[str]
    scores: Scores
    notes: List[str]
    similar_products: List[str]
    
  
class User(Document):
  uid: str
  email: EmailStr
  favourites: List[Link[Product]] = []
  
