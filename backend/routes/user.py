from fastapi import APIRouter, Body
from auth import firebase_login, verify_id_token_direct, firebase_signup
from models import User, Product
from fastapi.responses import JSONResponse
from schemas import UserResponse
from beanie import PydanticObjectId
from fastapi import Depends, Request, HTTPException

router = APIRouter()

@router.post("/login")
async def login_user(email: str = Body(...), password: str = Body(...)):
    login_result = firebase_login(email, password)
    id_token = login_result["idToken"]

    # Verify and decode the token
    token_data = await verify_id_token_direct(id_token)
    uid = token_data["uid"]
    email = token_data["email"]

    user = await User.find_one(User.uid == uid)
    if not user:
        user = User(uid=uid, email=email)
        await user.insert()

    return {
        "user": {
            "id": str(user.id),
            "uid": user.uid,
            "email": user.email,
            "favourites": []
        },
        "token": id_token  
    }

@router.post("/signup", response_model=UserResponse)
async def signup_user(email: str = Body(...), password: str = Body(...)):
    signup_result = firebase_signup(email, password)
    id_token = signup_result["idToken"]

    # Verify and extract Firebase UID
    token_data = await verify_id_token_direct(id_token)  
    uid = token_data["uid"]

    email = token_data["email"]

    # Check or insert into MongoDB
    user = await User.find_one(User.uid == uid)
    if not user:
        user = User(uid=uid, email=email)
        await user.insert()

    return UserResponse(id=str(user.id), uid=user.uid, email=user.email, favourites=[])
  
  
