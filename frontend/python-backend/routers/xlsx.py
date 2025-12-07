from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path
from typing import List, Dict, Any
import sys

sys.path.append(str(Path(__file__).parent.parent))
from services.xlsx_service import XlsxService

router = APIRouter(prefix="/api/xlsx", tags=["xlsx"])

class BlankSpreadsheetRequest(BaseModel):
    title: str
    headers: List[str]

class BudgetTemplateRequest(BaseModel):
    year: str
    categories: List[str]

class FinancialModelRequest(BaseModel):
    company_name: str
    years: List[str]

class DataTableRequest(BaseModel):
    title: str
    data: List[Dict[str, Any]]

@router.get("/templates")
async def list_templates():
    """List all available spreadsheet templates"""
    templates = [
        {
            "id": "blank",
            "name": "Blank Spreadsheet",
            "description": "Create a blank spreadsheet with custom headers"
        },
        {
            "id": "budget",
            "name": "Budget Template",
            "description": "Quarterly budget tracker with automatic totals"
        },
        {
            "id": "financial-model",
            "name": "Financial Model",
            "description": "Basic financial projection model with formulas"
        },
        {
            "id": "data-table",
            "name": "Data Table",
            "description": "Convert structured data into formatted table"
        }
    ]
    return {"templates": templates}

@router.post("/create/blank")
async def create_blank_spreadsheet(request: BlankSpreadsheetRequest):
    """Create a blank spreadsheet with headers"""
    try:
        output_path = XlsxService.create_blank_spreadsheet(
            title=request.title,
            headers=request.headers
        )

        return FileResponse(
            output_path,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            filename=f"{request.title.replace(' ', '_')}.xlsx"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/create/budget")
async def create_budget_template(request: BudgetTemplateRequest):
    """Create a budget template"""
    try:
        output_path = XlsxService.create_budget_template(
            year=request.year,
            categories=request.categories
        )

        return FileResponse(
            output_path,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            filename=f"Budget_{request.year}.xlsx"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/create/financial-model")
async def create_financial_model(request: FinancialModelRequest):
    """Create a financial model"""
    try:
        output_path = XlsxService.create_financial_model(
            company_name=request.company_name,
            years=request.years
        )

        return FileResponse(
            output_path,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            filename=f"{request.company_name.replace(' ', '_')}_Financial_Model.xlsx"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/create/data-table")
async def create_data_table(request: DataTableRequest):
    """Create a data table from structured data"""
    try:
        output_path = XlsxService.create_data_table(
            title=request.title,
            data=request.data
        )

        return FileResponse(
            output_path,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            filename=f"{request.title.replace(' ', '_')}.xlsx"
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
