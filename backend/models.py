from beanie import Document, Link
from pydantic import EmailStr
from typing import List, Optional
from datetime import datetime

  
class Product(Document):
  name: str
  company: str
  desc: str
  score: int
  
class User(Document):
  uid: str
  email: EmailStr
  favourites: List[Link[Product]] = []
  
  