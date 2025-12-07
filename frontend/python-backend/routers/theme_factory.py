"""
Theme Factory Router - Apply Themes to Documents API Endpoints
"""

from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
import io
import tempfile
import os

from docx import Document
from pptx import Presentation
from services.theme_service import ThemeService

router = APIRouter(
    prefix="/api/themes",
    tags=["themes"],
    responses={404: {"description": "Not found"}}
)


# Request Models
class ApplyThemeRequest(BaseModel):
    theme_id: str
    document_type: str  # docx or pptx


# Endpoints
@router.get("/")
async def get_all_themes():
    """Get all available themes"""
    try:
        themes = ThemeService.get_all_themes()
        return {"themes": themes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{theme_id}")
async def get_theme(theme_id: str):
    """Get a specific theme by ID"""
    try:
        theme = ThemeService.get_theme(theme_id)
        return theme
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/apply-docx")
async def apply_theme_to_docx(
    file: UploadFile = File(...),
    theme_id: str = "ocean"
):
    """
    Apply a theme to a DOCX document

    Upload a DOCX file and select a theme to apply
    """
    try:
        # Validate file type
        if not file.filename.endswith('.docx'):
            raise HTTPException(status_code=400, detail="File must be a .docx file")

        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.docx') as tmp_file:
            content = await file.read()
            tmp_file.write(content)
            tmp_path = tmp_file.name

        # Open document
        doc = Document(tmp_path)

        # Apply theme
        doc = ThemeService.apply_theme_to_docx(doc, theme_id)

        # Save to bytes
        doc_bytes = ThemeService.save_docx_to_bytes(doc)

        # Clean up
        os.unlink(tmp_path)

        # Get theme name for filename
        theme = ThemeService.get_theme(theme_id)
        theme_name = theme["name"].replace(" ", "_")

        # Return themed document
        return StreamingResponse(
            io.BytesIO(doc_bytes),
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={
                "Content-Disposition": f"attachment; filename=themed_{theme_name}_{file.filename}"
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/apply-pptx")
async def apply_theme_to_pptx(
    file: UploadFile = File(...),
    theme_id: str = "ocean"
):
    """
    Apply a theme to a PPTX presentation

    Upload a PPTX file and select a theme to apply
    """
    try:
        # Validate file type
        if not file.filename.endswith('.pptx'):
            raise HTTPException(status_code=400, detail="File must be a .pptx file")

        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pptx') as tmp_file:
            content = await file.read()
            tmp_file.write(content)
            tmp_path = tmp_file.name

        # Open presentation
        prs = Presentation(tmp_path)

        # Apply theme
        prs = ThemeService.apply_theme_to_pptx(prs, theme_id)

        # Save to bytes
        pptx_bytes = ThemeService.save_pptx_to_bytes(prs)

        # Clean up
        os.unlink(tmp_path)

        # Get theme name for filename
        theme = ThemeService.get_theme(theme_id)
        theme_name = theme["name"].replace(" ", "_")

        # Return themed presentation
        return StreamingResponse(
            io.BytesIO(pptx_bytes),
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={
                "Content-Disposition": f"attachment; filename=themed_{theme_name}_{file.filename}"
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/info")
async def get_theme_info():
    """Get information about theme capabilities"""
    return {
        "description": "Apply beautiful color and typography themes to documents",
        "supported_formats": [".docx", ".pptx"],
        "total_themes": len(ThemeService.THEMES),
        "categories": [
            "Professional",
            "Creative",
            "Natural",
            "Minimal",
            "Elegant",
            "Technology",
            "Fresh"
        ],
        "features": [
            "10 professionally designed themes",
            "Apply to Word documents (.docx)",
            "Apply to PowerPoint presentations (.pptx)",
            "Custom color palettes",
            "Typography pairing",
            "Instant download"
        ]
    }
