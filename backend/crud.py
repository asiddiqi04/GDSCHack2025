import base64
import os
from io import BytesIO
from typing import Dict, List, Optional
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from openfoodfacts import API
from PIL import Image
from prompt import parse_ai_output, return_prompt
from pydantic import BaseModel
from schemas import SearchRequest
from pyzbar.pyzbar import decode

api = API(user_agent="GreenScoreApp/1.0")

IMPORTANT_KEYS = [
    "product_name",
    "brands",
    "ingredients_text",
    "allergens",
    "ecoscore_grade",
    "packaging_materials_tags",
    "packaging_recycling_tags",
    "nova_groups_tags",
]


def decode_barcode_from_base64(base64_string: str) -> str:
    try:
        image = Image.open(BytesIO(base64.b64decode(base64_string))).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid or corrupt image.")

    barcodes = decode(image)
    if not barcodes:
        raise HTTPException(status_code=404, detail="No barcode found in image.")
    return barcodes[0].data.decode("utf-8")


def format_product(product: Dict) -> Dict:
    return {"image": product.get("image_url") or product.get("image_thumb_url"), "product": {k: product.get(k) for k in IMPORTANT_KEYS}}


def query_product_by_barcode(barcode: str) -> Dict:
    try:
        result = api.product.get(code=barcode)
    except Exception:
        raise HTTPException(status_code=500, detail="OpenFoodFacts search failed.")

    if result and isinstance(result, dict) and "product_name" in result:
        return result
    else:
        raise HTTPException(status_code=404, detail="No product found for that barcode.")


def build_search_query(req: SearchRequest) -> str:
    parts: List[str] = []
    if req.product_name:
        parts.append(req.product_name.lower())
    if req.brand:
        parts.append(f"{req.brand.lower()}")
    if req.country:
        parts.append(f"{req.country.lower()}")
    if req.descriptors:
        parts.append(req.descriptors.lower())
    return " ".join(parts)
