from schemas import ImageRequest, SearchRequest, EvaluationRequest
from fastapi import HTTPException, Depends
from models import Product, Scores
from fastapi.responses import JSONResponse
from crud import (
    build_search_query,
    decode_barcode_from_base64,
    query_product_by_barcode,
    format_product,
)
from prompt import return_prompt, parse_ai_output
from fastapi import APIRouter
from openfoodfacts import API
from client import gemini_model
from auth import verify_token
from client import gemini_model

api = API(user_agent="GreenScoreApp/1.0")
router = APIRouter()


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

@router.post("/scan_barcode")
def scan_barcode(req: ImageRequest, token_data=Depends(verify_token)):
    barcode = decode_barcode_from_base64(req.image_base64)
    product = query_product_by_barcode(barcode)
    return {"query": barcode, "results": [format_product(product)]}

@router.post("/search_products")
def search_products(req: SearchRequest, token_data=Depends(verify_token)):
    query = build_search_query(req)
    if not query:
        raise HTTPException(status_code=400, detail="At least one search field is required.")

    try:
        result = api.product.text_search(query=query, page=req.page, page_size=req.page_size)
    except Exception:
        raise HTTPException(status_code=500, detail="OpenFoodFacts search failed.")

    products = result.get("products", [])
    if not products:
        raise HTTPException(status_code=404, detail="No matching products found.")

    return {"query": query, "results": [format_product(p) for p in products]}


@router.post("/evaluate_product")
async def evaluate_product(data: EvaluationRequest, token_data=Depends(verify_token)):
    # Step 1: Check if product exists in DB
    existing = await Product.find_one(
        Product.product_name == data.product_name,
        Product.brand == data.brands
    )

    if existing:
        existing_dict = existing.dict()
        existing_dict["id"] = str(existing.id)
        return JSONResponse(content={"evaluation": existing_dict})

    # Step 2: Generate prompt for Gemini
    structured_data = {
        "product_name": data.product_name,
        "brands": data.brands,
        "ingredients_text": data.ingredients_text,
        "allergens": data.allergens,
        "ecoscore_grade": data.ecoscore_grade,
        "packaging_materials_tags": data.packaging_materials_tags,
        "packaging_recycling_tags": data.packaging_recycling_tags,
        "nova_groups_tags": data.nova_groups_tags,
    }
    prompt = return_prompt(structured_data)

    try:
        # Step 3: Evaluate with Gemini
        response_text = gemini_model.generate_content(prompt).text
        parsed_output = parse_ai_output(response_text)

        # Step 4: Save evaluated product to DB
        new_product = Product(
            product_name=data.product_name,
            brand=data.brands,
            pros=parsed_output["pros"],
            cons=parsed_output["cons"],
            scores=Scores(**parsed_output["scores"]),
            notes=parsed_output["notes"],
            similar_products=parsed_output["similar_products"]
        )
        await new_product.insert()

        product_dict = new_product.dict()
        product_dict["id"] = str(new_product.id)

        return JSONResponse(content={"evaluation": product_dict})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")

