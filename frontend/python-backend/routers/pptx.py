"""
PPTX Router - PowerPoint Presentation API Endpoints
"""

from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
import io
import tempfile
import os

from services.pptx_service import PPTXService

router = APIRouter(
    prefix="/api/pptx",
    tags=["pptx"],
    responses={404: {"description": "Not found"}}
)


# Request/Response Models
class CreatePresentationRequest(BaseModel):
    template_type: str = "blank"
    title: str = ""
    subtitle: str = ""


class AddSlideRequest(BaseModel):
    slide_type: str  # title, content, image, table
    title: str
    content: Optional[List[str]] = None
    table_data: Optional[List[List[str]]] = None


class ApplyThemeRequest(BaseModel):
    theme_name: str  # corporate, vibrant, minimal


# Endpoints
@router.get("/templates")
async def get_templates():
    """Get available presentation templates"""
    try:
        templates = PPTXService.get_template_types()
        return {"templates": templates}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/create")
async def create_presentation(request: CreatePresentationRequest):
    """
    Create a new PowerPoint presentation

    Returns presentation as downloadable file
    """
    try:
        # Create presentation from template
        if request.template_type == "blank":
            prs = PPTXService.create_blank_presentation()
            if request.title:
                prs = PPTXService.add_title_slide(prs, request.title, request.subtitle)
        else:
            prs = PPTXService.create_presentation_from_template(request.template_type)

        # Save to bytes
        presentation_bytes = PPTXService.save_presentation_to_bytes(prs)

        # Return as downloadable file
        return StreamingResponse(
            io.BytesIO(presentation_bytes),
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={
                "Content-Disposition": f"attachment; filename=presentation_{request.template_type}.pptx"
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/create-custom")
async def create_custom_presentation(
    title: str,
    subtitle: str = "",
    slides: List[AddSlideRequest] = []
):
    """
    Create a custom presentation with multiple slides

    Request body should include:
    - title: Presentation title
    - subtitle: Presentation subtitle
    - slides: Array of slide objects
    """
    try:
        # Create blank presentation
        prs = PPTXService.create_blank_presentation()

        # Add title slide
        prs = PPTXService.add_title_slide(prs, title, subtitle)

        # Add content slides
        for slide_data in slides:
            if slide_data.slide_type == "content":
                prs = PPTXService.add_content_slide(
                    prs,
                    slide_data.title,
                    slide_data.content or []
                )
            elif slide_data.slide_type == "table":
                prs = PPTXService.add_table_slide(
                    prs,
                    slide_data.title,
                    slide_data.table_data or []
                )

        # Save to bytes
        presentation_bytes = PPTXService.save_presentation_to_bytes(prs)

        # Return as downloadable file
        return StreamingResponse(
            io.BytesIO(presentation_bytes),
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={
                "Content-Disposition": f"attachment; filename={title.replace(' ', '_')}.pptx"
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/apply-theme")
async def apply_theme(
    file: UploadFile = File(...),
    theme_name: str = "corporate"
):
    """
    Apply a color theme to an existing presentation

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
        from pptx import Presentation
        prs = Presentation(tmp_path)

        # Apply theme
        prs = PPTXService.apply_theme(prs, theme_name)

        # Save to bytes
        presentation_bytes = PPTXService.save_presentation_to_bytes(prs)

        # Clean up
        os.unlink(tmp_path)

        # Return themed presentation
        return StreamingResponse(
            io.BytesIO(presentation_bytes),
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={
                "Content-Disposition": f"attachment; filename=themed_{file.filename}"
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/info")
async def get_pptx_info():
    """Get information about PPTX capabilities"""
    return {
        "features": [
            "Create presentations from templates",
            "Add title, content, and table slides",
            "Apply color themes",
            "Export to PPTX format"
        ],
        "templates": ["blank", "business", "pitch", "report", "educational"],
        "themes": ["corporate", "vibrant", "minimal"],
        "supported_formats": [".pptx"]
    }
