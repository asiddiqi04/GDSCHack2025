from auth import verify_token
from client import gemini_model
from fastapi import APIRouter, Depends, HTTPException
from models import Product, User
from schemas import ChatBotRequest, ChatBotResponse

router = APIRouter()

@router.post("/chat_recommend", response_model=ChatBotResponse)
async def chat_recommend(req: ChatBotRequest, token_data=Depends(verify_token)):
    # Step 1: Get user and fetch favorites
    uid = token_data["uid"]
    user = await User.find_one(User.uid == uid)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    await user.fetch_link(User.favourites)

    if not user.favourites:
        return ChatBotResponse(message="You don't have any favorite products yet. Try saving a few and then ask me again!")

    # Step 2: Summarize each product compactly
    def summarize_product(product: Product) -> str:
        return (
            f"Product: {product.product_name} by {product.brand}. "
            f"Pros: {', '.join(product.pros)}. "
            f"Cons: {', '.join(product.cons)}. "
            f"Scores - Sustainability: {product.scores.sustainability}, Ethical: {product.scores.ethical}, Combined: {product.scores.combined}. "
            f"Notes: {', '.join(product.notes)}. "
            f"Similar Products: {', '.join(product.similar_products)}."
        )

    favourites_text = " ".join(summarize_product(p) for p in user.favourites)

    # Step 3: Build prompt
    prompt = (
        "You are a helpful and friendly assistant that gives recommendations and insights about sustainable and ethical food choices. "
        "Be supportive, insightful, and guide the user based on their favorite products. "
        "ENSURE YOU ONLY RESPOND BACK WITH A RESPONSE TO THE USER'S MESSAGE DIRECTLY — NO NEED FOR AN INTRO.\n\n"
        f"User's favorite products: {favourites_text}\n\n"
        f"User: {req.message}\n"
        "Assistant:"
    )

    # Step 4: Call Gemini and return reply
    try:
        response = gemini_model.generate_content(prompt)
        return ChatBotResponse(message=response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")
