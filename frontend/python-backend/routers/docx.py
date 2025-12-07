from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from pathlib import Path
import sys

# Add services to path
sys.path.append(str(Path(__file__).parent.parent))
from services.docx_service import DocxService

router = APIRouter(prefix="/api/docx", tags=["docx"])

class DocumentSection(BaseModel):
    heading: Optional[str] = None
    body: Optional[str] = None

class CreateDocumentRequest(BaseModel):
    title: Optional[str] = None
    sections: List[DocumentSection] = []

class CreateFromTemplateRequest(BaseModel):
    template_type: str  # report, memo, letter
    title: Optional[str] = None
    author: Optional[str] = None
    date: Optional[str] = None
    sections: Optional[List[DocumentSection]] = None
    # Memo-specific fields
    to: Optional[str] = None
    from_: Optional[str] = None  # 'from' is reserved keyword
    subject: Optional[str] = None
    # Letter-specific fields
    sender_address: Optional[str] = None
    recipient_address: Optional[str] = None
    salutation: Optional[str] = None
    closing: Optional[str] = None
    signature: Optional[str] = None
    # Report-specific fields
    executive_summary: Optional[str] = None
    body: Optional[str] = None

@router.get("/templates")
async def list_templates():
    """List all available document templates"""
    templates = [
        {
            "id": "blank",
            "name": "Blank Document",
            "description": "Start from scratch with a blank document"
        },
        {
            "id": "report",
            "name": "Professional Report",
            "description": "Structured report with title page and sections"
        },
        {
            "id": "memo",
            "name": "Business Memo",
            "description": "Internal business memorandum format"
        },
        {
            "id": "letter",
            "name": "Business Letter",
            "description": "Formal business letter with proper formatting"
        }
    ]
    return {"templates": templates}

@router.post("/create")
async def create_document(request: CreateDocumentRequest):
    """Create a new DOCX document from scratch"""
    try:
        content = {
            "title": request.title,
            "sections": [{"heading": s.heading, "body": s.body} for s in request.sections]
        }

        output_path = DocxService.create_document(content)

        return FileResponse(
            output_path,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename="document.docx"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/create-from-template")
async def create_from_template(request: CreateFromTemplateRequest):
    """Create a document from a predefined template"""
    try:
        # Build content dictionary based on template type
        content = {
            "title": request.title,
            "author": request.author,
            "date": request.date,
        }

        if request.template_type == "memo":
            content.update({
                "to": request.to,
                "from": request.from_,
                "subject": request.subject,
                "body": request.body
            })
        elif request.template_type == "letter":
            content.update({
                "sender_address": request.sender_address,
                "recipient_address": request.recipient_address,
                "salutation": request.salutation,
                "body": request.body,
                "closing": request.closing,
                "signature": request.signature
            })
        elif request.template_type == "report":
            content.update({
                "executive_summary": request.executive_summary,
                "sections": [{"heading": s.heading, "body": s.body} for s in request.sections] if request.sections else []
            })
        else:
            # Blank document
            content["sections"] = [{"heading": s.heading, "body": s.body} for s in request.sections] if request.sections else []

        output_path = DocxService.create_from_template(request.template_type, content)

        return FileResponse(
            output_path,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename=f"{request.template_type}.docx"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
