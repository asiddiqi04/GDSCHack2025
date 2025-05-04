import re


def return_prompt(data: dict):
    return f'''You are a global expert in food sustainability and ethical sourcing. Your task is to evaluate food products using ONLY the provided structured input fields and publicly verifiable sources such as:

            - NOVA classification system
            - EcoScore grading definitions
            - Known brand reputation databases
            - Ingredient and packaging sustainability research

            You MUST NOT guess, speculate, or fabricate any data about the product, brand, packaging, or ingredients.

            Use only:
            - The exact provided fields
            - Public, documented, widely accepted knowledge you've been trained on

            If any required field is missing or unclear, explicitly say so. If a score cannot be reasonably calculated, return “insufficient data” for that score, with a brief reason.
            ---
            INPUT FIELDS (always provided):

            - product_name: string  
            - brands: string  
            - ingredients_text: string  
            - allergens: string  
            - ecoscore_grade: string (A - E)  
            - packaging_materials_tags: list  
            - packaging_recycling_tags: list  
            - nova_groups_tags: list (e.g., "en:4-ultra-processed-food-and-drink-products")

            {data}
            ---
            OUTPUT FORMAT (return only this):

            Product Name: <product_name>  
            Brand: <brands>  

            Pros:
            - <Fact-based positive point, e.g., "No flagged allergens">
            [...]

            Cons:
            - <Fact-based concern, e.g., "EcoScore grade is D (high environmental impact)">
            [...]

            Scores (out of 100):
            - Sustainability Score: <int or "insufficient data">
            - Ethical Score: <int or "insufficient data">
            - Combined Score: <int or "insufficient data">

            Notes:
            - <Explain why the score was given for this product, e.g., "Low sustainability due to NOVA group 4 and missing packaging info.">
            [...] (MAX 4)
            
            Similar Products:
            - <Product Name> (Brand) 
            [...] (MAX 3)

            If no similar products exist, state: “Not enough verified similar products available.”
            ---
            INTERNAL LOGIC (hidden from user, used for scoring):

            Sustainability Score (out of 100):
            - Start at 50 (average product baseline)
            - EcoScore adjustment: A = +20, B = +10, C = 0, D = -10, E = -20, missing = -10
            - Packaging material: fully recyclable (glass, PET) = +10, partially recyclable = 0, non-recyclable or missing = -10
            - Recycling tag: clear = +5, unclear/missing = 0
            - NOVA Group: 1 = +10, 2 = +5, 3 = 0, 4 = -10

            Ethical Score (out of 100):
            - Start at 50 (average product baseline)
            - Brand reputation: known ethical = +15, unknown = 0, known unethical = -15
            - Ingredient transparency: clear + additive-free = +10, vague = 0, misleading/missing = -10
            - NOVA Group: 1 = +10, 2 = +5, 3 = 0, 4 = -10
            - Allergen/additive safety: safe = +10, minor concern = 0, unclear/high-risk = -10

            Combined Score = round(Sustainability * 0.6 + Ethical * 0.4)

            Notes:
            - Provide 2 - 4 concise notes that explain why this product received its sustainability and ethical scores.
            - Mention any strong contributors or penalties (e.g., NOVA group 4, lack of recyclable packaging, additives).
            - If data was missing, mention how it impacted the scores.
            - Keep notes user-friendly and specific to the product being evaluated.

            Similar Products:
            - Recommend up to 3 verified products or general product types that serve the **same purpose and food category** as the input item (e.g., cookies → more cookies).
            - Recommendations should have **equal or better sustainability or ethical standards**, including cleaner ingredients, better packaging, or improved processing classification (NOVA 1 - 2 preferred).
            - Do NOT recommend completely unrelated food categories (e.g., sliced fruit for cookies).
            - All suggestions must be grounded in **publicly documented food types**, **ingredient profiles**, or **recognized packaging sustainability practices**.
            - If no similar products exist, return: “Not enough verified similar products available.”
            '''

def parse_ai_output(text: str) -> dict:
    parsed = {
        "product_name": None,
        "brand": None,
        "pros": [],
        "cons": [],
        "scores": {
            "sustainability": None,
            "ethical": None,
            "combined": None
        },
        "notes": [],
        "similar_products": []
    }

    # Match product name and brand
    product_match = re.search(r"Product Name:\s*(.+)", text)
    brand_match = re.search(r"Brand:\s*(.+)", text)
    if product_match:
        parsed["product_name"] = product_match.group(1).strip()
    if brand_match:
        parsed["brand"] = brand_match.group(1).strip()

    # Extract sections
    sections = {
        "pros": r"Pros:\s*(.*?)(?:\n\s*Cons:|\Z)",
        "cons": r"Cons:\s*(.*?)(?:\n\s*Scores|\Z)",
        "scores": r"Scores.*?:\s*(.*?)(?:\n\s*Notes|\Z)",
        "notes": r"Notes:\s*(.*?)(?:\n\s*Similar Products:|\Z)",
        "similar_products": r"Similar Products:\s*(.*?)(?:\Z)"
    }

    for key, pattern in sections.items():
        match = re.search(pattern, text, re.DOTALL)
        if match:
            block = match.group(1).strip()
            if key in ["pros", "cons", "similar_products"]:
                parsed[key] = [line.strip("- ").strip() for line in block.splitlines() if line.strip()]
            elif key == "scores":
                for line in block.splitlines():
                    if "Sustainability" in line:
                        parsed["scores"]["sustainability"] = parse_score(line)
                    elif "Ethical" in line:
                        parsed["scores"]["ethical"] = parse_score(line)
                    elif "Combined" in line:
                        parsed["scores"]["combined"] = parse_score(line)
            elif key == "notes":
                parsed["notes"] = [line.strip("- ").strip() for line in block.splitlines() if line.strip()]

    return parsed

def parse_score(line: str):
    match = re.search(r"(\d+|insufficient data)", line.lower())
    return int(match.group(1)) if match and match.group(1).isdigit() else "insufficient data"