from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import FileResponse
from pathlib import Path
import sys
import shutil
import tempfile

# Add skills directory to path
skills_path = Path(__file__).parent.parent.parent.parent / ".claude" / "skills" / "document-polisher" / "scripts"
sys.path.append(str(skills_path))

try:
    from apply_brand import apply_brand_to_docx
except ImportError as e:
    print(f"Error importing apply_brand: {e}")

router = APIRouter(prefix="/api/document-polisher", tags=["document-polisher"])

# Create temp directory (cross-platform)
TEMP_DIR = Path(tempfile.gettempdir()) / "document-polisher"
TEMP_DIR.mkdir(exist_ok=True)

@router.get("/brands")
async def list_brands():
    """List all available brand styles"""
    brands = [
        "economist", "mckinsey", "deloitte", "kpmg",
        "stripe", "apple", "ibm", "linear", "notion", "figma"
    ]
    return {"brands": brands}

@router.post("/polish")
async def polish_document(
    file: UploadFile = File(...),
    brand: str = Form(...)
):
    """Polish a document with the selected brand style"""
    input_path = None
    output_path = None

    try:
        # Save uploaded file
        input_path = TEMP_DIR / f"input_{file.filename}"
        output_path = TEMP_DIR / f"polished_{file.filename}"

        with input_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Apply branding
        apply_brand_to_docx(str(input_path), brand, str(output_path))

        # Return polished file
        return FileResponse(
            output_path,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename=f"polished_{file.filename}"
        )

    except Exception as e:
        return {"error": str(e)}, 500

    finally:
        # Cleanup input file
        if input_path and input_path.exists():
            input_path.unlink()
