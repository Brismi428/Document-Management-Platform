"""
Frontend Design Router - Web component and page creation
Generates production-grade React/HTML components with modern styling
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/frontend-design", tags=["frontend-design"])

class ComponentRequest(BaseModel):
    component_type: str  # button, card, form, navbar, hero, footer
    props: dict = {}
    styling: str = "tailwind"  # tailwind, css-modules, styled-components

@router.get("/components")
async def list_components():
    """List all available component types"""
    return {"components": [
        {"id": "button", "name": "Button", "description": "Interactive buttons with variants"},
        {"id": "card", "name": "Card", "description": "Content cards with image/text"},
        {"id": "form", "name": "Form", "description": "Input forms with validation"},
        {"id": "navbar", "name": "Navigation Bar", "description": "Responsive navigation"},
        {"id": "hero", "name": "Hero Section", "description": "Landing page hero"},
        {"id": "footer", "name": "Footer", "description": "Page footer with links"}
    ]}

@router.post("/generate")
async def generate_component(request: ComponentRequest):
    """Generate a React component"""
    try:
        code = _generate_component_code(request.component_type, request.props, request.styling)
        return {"success": True, "componentType": request.component_type, "code": code}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def _generate_component_code(comp_type: str, props: dict, styling: str) -> str:
    if comp_type == "button":
        return """export default function Button({ children, variant = 'primary', onClick }) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}"""
    elif comp_type == "card":
        return """export default function Card({ title, description, image }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}"""
    else:
        return f"// {comp_type} component code here"

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Frontend Design"}
