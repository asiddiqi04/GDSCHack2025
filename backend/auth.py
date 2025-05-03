import requests
from fastapi import HTTPException, Request
import firebase_admin
from firebase_admin import auth as fb_auth, credentials
from dotenv import load_dotenv
import os
if not firebase_admin._apps:
    cred = credentials.Certificate("creds.json")
    firebase_admin.initialize_app(cred)

load_dotenv()


FIREBASE_API_KEY = os.getenv('APIKEY')

def firebase_login(email: str, password: str):
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_API_KEY}"
    payload = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }
    res = requests.post(url, json=payload)
    if res.status_code != 200:
        raise HTTPException(status_code=401, detail=res.json()["error"]["message"])
    return res.json()  # Contains idToken

def firebase_signup(email: str, password: str):
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={FIREBASE_API_KEY}"
    payload = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }
    res = requests.post(url, json=payload)
    if res.status_code != 200:
        raise HTTPException(status_code=400, detail=res.json()["error"]["message"])
    return res.json()

async def verify_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")

    id_token = auth_header.split("Bearer ")[-1]
    try:
        decoded = fb_auth.verify_id_token(id_token)
        return decoded
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

async def verify_id_token_direct(id_token: str):

    try:
        decoded = fb_auth.verify_id_token(id_token)
        return decoded
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
