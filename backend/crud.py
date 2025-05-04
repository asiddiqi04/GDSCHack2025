import base64
from io import BytesIO
from typing import Dict, List
import cv2
import numpy as np

from fastapi import HTTPException
from openfoodfacts import API
from PIL import Image
from pyzbar.pyzbar import decode
from schemas import SearchRequest

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


def decode_with_opencv(pil_image: Image.Image):
    try:
        image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

        # Preprocessing
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        filtered = cv2.bilateralFilter(gray, d=9, sigmaColor=75, sigmaSpace=75)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced = clahe.apply(filtered)
        _, thresholded = cv2.threshold(enhanced, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # Convert back to PIL for pyzbar
        processed_pil = Image.fromarray(thresholded)
        return decode(processed_pil)

    except Exception as e:
        return []

def decode_barcode_from_base64(base64_string: str) -> str:
    try:
        image = Image.open(BytesIO(base64.b64decode(base64_string))).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid or corrupt image.")

    barcodes = decode(image)
    
    # if not barcodes:
    #     barcodes = decode_with_opencv(image)

    if not barcodes:
        try:
            fallback_image = Image.open("barcode.png").convert("RGB")
            barcodes = decode(fallback_image)
        except Exception:
            raise HTTPException(status_code=400, detail="No barcode found and fallback image unreadable.")

    if not barcodes:
        raise HTTPException(status_code=404, detail="No barcode found in both images.")

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
