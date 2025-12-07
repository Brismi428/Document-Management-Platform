from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from pathlib import Path
from typing import List
import sys
import shutil
import tempfile

# Add services to path
sys.path.append(str(Path(__file__).parent.parent))
from services.pdf_service import PdfService

router = APIRouter(prefix="/api/pdf", tags=["pdf"])

# Create temp directory
TEMP_DIR = Path(tempfile.gettempdir()) / "pdf-processor"
TEMP_DIR.mkdir(exist_ok=True)

@router.get("/features")
async def list_features():
    """List all available PDF processing features"""
    features = [
        {
            "id": "merge",
            "name": "Merge PDFs",
            "description": "Combine multiple PDF files into one document"
        },
        {
            "id": "split",
            "name": "Split PDF",
            "description": "Extract specific pages from a PDF"
        },
        {
            "id": "extract-text",
            "name": "Extract Text",
            "description": "Extract all text content from a PDF"
        },
        {
            "id": "rotate",
            "name": "Rotate Pages",
            "description": "Rotate all pages in a PDF"
        },
        {
            "id": "delete",
            "name": "Delete Pages",
            "description": "Remove specific pages from a PDF"
        },
        {
            "id": "info",
            "name": "PDF Info",
            "description": "Get metadata and page count"
        }
    ]
    return {"features": features}

@router.post("/merge")
async def merge_pdfs(files: List[UploadFile] = File(...)):
    """Merge multiple PDF files into one"""
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="At least 2 PDF files are required for merging")

    temp_files = []
    try:
        # Save uploaded files
        for file in files:
            temp_path = TEMP_DIR / f"input_{file.filename}"
            with temp_path.open("wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            temp_files.append(temp_path)

        # Merge PDFs
        output_path = PdfService.merge_pdfs(temp_files)

        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="merged.pdf"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Cleanup input files
        for temp_file in temp_files:
            if temp_file.exists():
                temp_file.unlink()

@router.post("/split")
async def split_pdf(
    file: UploadFile = File(...),
    start_page: int = Form(...),
    end_page: int = Form(...)
):
    """Split a PDF by extracting specific pages"""
    input_path = None
    try:
        # Save uploaded file
        input_path = TEMP_DIR / f"input_{file.filename}"
        with input_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Split PDF
        output_path = PdfService.split_pdf(input_path, start_page, end_page)

        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename=f"pages_{start_page}-{end_page}.pdf"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Cleanup
        if input_path and input_path.exists():
            input_path.unlink()

@router.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    """Extract all text from a PDF"""
    input_path = None
    try:
        # Save uploaded file
        input_path = TEMP_DIR / f"input_{file.filename}"
        with input_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract text
        text = PdfService.extract_text(input_path)

        return JSONResponse(content={"text": text, "filename": file.filename})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Cleanup
        if input_path and input_path.exists():
            input_path.unlink()

@router.post("/info")
async def get_pdf_info(file: UploadFile = File(...)):
    """Get PDF metadata and information"""
    input_path = None
    try:
        # Save uploaded file
        input_path = TEMP_DIR / f"input_{file.filename}"
        with input_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Get info
        info = PdfService.get_pdf_info(input_path)
        info["filename"] = file.filename

        return JSONResponse(content=info)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Cleanup
        if input_path and input_path.exists():
            input_path.unlink()

@router.post("/rotate")
async def rotate_pdf(
    file: UploadFile = File(...),
    rotation: int = Form(...)
):
    """Rotate all pages in a PDF"""
    if rotation not in [90, 180, 270]:
        raise HTTPException(status_code=400, detail="Rotation must be 90, 180, or 270 degrees")

    input_path = None
    try:
        # Save uploaded file
        input_path = TEMP_DIR / f"input_{file.filename}"
        with input_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Rotate PDF
        output_path = PdfService.rotate_pages(input_path, rotation)

        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename=f"rotated_{rotation}_{file.filename}"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Cleanup
        if input_path and input_path.exists():
            input_path.unlink()

@router.post("/delete-pages")
async def delete_pages(
    file: UploadFile = File(...),
    pages: str = Form(...)  # Comma-separated page numbers
):
    """Delete specific pages from a PDF"""
    input_path = None
    try:
        # Parse page numbers
        page_numbers = [int(p.strip()) for p in pages.split(",")]

        # Save uploaded file
        input_path = TEMP_DIR / f"input_{file.filename}"
        with input_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Delete pages
        output_path = PdfService.delete_pages(input_path, page_numbers)

        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename=f"edited_{file.filename}"
        )

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid page numbers format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Cleanup
        if input_path and input_path.exists():
            input_path.unlink()
