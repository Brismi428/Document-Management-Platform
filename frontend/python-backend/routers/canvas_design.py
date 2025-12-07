"""
Canvas Design Router - Visual art and poster creation
Creates beautiful PNG/PDF designs with professional typography and layout
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

router = APIRouter(prefix="/api/canvas-design", tags=["canvas-design"])

class DesignRequest(BaseModel):
    design_type: str  # poster, card, social-media, infographic, banner
    title: Optional[str] = None
    subtitle: Optional[str] = None
    body_text: Optional[str] = None
    theme: str = "modern"  # modern, minimal, vibrant, elegant, professional
    color_scheme: Optional[List[str]] = None
    width: int = 1920
    height: int = 1080
    format: str = "png"  # png, pdf, svg

@router.get("/templates")
async def list_design_templates():
    """List all available canvas design templates"""
    templates = [
        {
            "id": "poster",
            "name": "Poster",
            "description": "Event posters, announcements, promotional materials",
            "sizes": ["A4", "A3", "24x36", "custom"],
            "themes": ["modern", "minimal", "vibrant", "retro"]
        },
        {
            "id": "card",
            "name": "Card/Flyer",
            "description": "Business cards, postcards, small format designs",
            "sizes": ["business-card", "postcard", "A6", "custom"],
            "themes": ["professional", "elegant", "creative"]
        },
        {
            "id": "social-media",
            "name": "Social Media Graphics",
            "description": "Instagram, Twitter, LinkedIn post graphics",
            "sizes": ["instagram-square", "instagram-story", "twitter", "linkedin"],
            "themes": ["vibrant", "minimal", "modern"]
        },
        {
            "id": "infographic",
            "name": "Infographic",
            "description": "Data visualization and information graphics",
            "sizes": ["vertical", "horizontal", "square", "custom"],
            "themes": ["professional", "colorful", "minimal"]
        },
        {
            "id": "banner",
            "name": "Web Banner",
            "description": "Website headers, hero images, banners",
            "sizes": ["full-width", "hero", "billboard", "custom"],
            "themes": ["modern", "bold", "subtle"]
        }
    ]
    return {"templates": templates}

@router.get("/themes")
async def list_design_themes():
    """List all available design themes"""
    themes = [
        {
            "id": "modern",
            "name": "Modern",
            "description": "Clean lines, bold typography, geometric shapes",
            "colors": ["#2563EB", "#7C3AED", "#DB2777", "#F59E0B"],
            "fonts": {"heading": "Inter", "body": "Inter"}
        },
        {
            "id": "minimal",
            "name": "Minimal",
            "description": "White space, subtle colors, elegant simplicity",
            "colors": ["#000000", "#FFFFFF", "#6B7280", "#D1D5DB"],
            "fonts": {"heading": "Helvetica", "body": "Arial"}
        },
        {
            "id": "vibrant",
            "name": "Vibrant",
            "description": "Bold colors, energetic composition, high contrast",
            "colors": ["#EF4444", "#F59E0B", "#10B981", "#3B82F6"],
            "fonts": {"heading": "Montserrat", "body": "Open Sans"}
        },
        {
            "id": "elegant",
            "name": "Elegant",
            "description": "Sophisticated serif fonts, muted tones, classic layout",
            "colors": ["#1F2937", "#92785D", "#E5E7EB", "#F3F4F6"],
            "fonts": {"heading": "Playfair Display", "body": "Lora"}
        },
        {
            "id": "professional",
            "name": "Professional",
            "description": "Corporate styling, trust-building colors, clear hierarchy",
            "colors": ["#1E3A8A", "#059669", "#6B7280", "#F9FAFB"],
            "fonts": {"heading": "Roboto", "body": "Roboto"}
        }
    ]
    return {"themes": themes}

@router.post("/generate")
async def generate_design(request: DesignRequest):
    """Generate a canvas design based on parameters"""
    try:
        # Generate HTML5 Canvas code that renders the design
        canvas_code = _generate_canvas_code(
            request.design_type,
            request.title,
            request.subtitle,
            request.body_text,
            request.theme,
            request.color_scheme,
            request.width,
            request.height
        )

        return {
            "success": True,
            "designType": request.design_type,
            "theme": request.theme,
            "code": canvas_code,
            "dimensions": {"width": request.width, "height": request.height},
            "format": request.format
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/color-schemes")
async def get_color_schemes():
    """Get curated color scheme palettes"""
    schemes = [
        {
            "name": "Ocean",
            "colors": ["#006D77", "#83C5BE", "#EDF6F9", "#FFDDD2", "#E29578"]
        },
        {
            "name": "Sunset",
            "colors": ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"]
        },
        {
            "name": "Forest",
            "colors": ["#2D6A4F", "#40916C", "#52B788", "#74C69D", "#95D5B2"]
        },
        {
            "name": "Monochrome",
            "colors": ["#000000", "#3D3D3D", "#7A7A7A", "#B7B7B7", "#F4F4F4"]
        },
        {
            "name": "Pastel",
            "colors": ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"]
        }
    ]
    return {"schemes": schemes}

def _generate_canvas_code(design_type: str, title: Optional[str], subtitle: Optional[str],
                          body_text: Optional[str], theme: str, color_scheme: Optional[List[str]],
                          width: int, height: int) -> str:
    """Generate HTML5 Canvas code for the design"""

    # Theme-based colors
    theme_colors = {
        "modern": ["#2563EB", "#FFFFFF", "#1E293B"],
        "minimal": ["#000000", "#FFFFFF", "#6B7280"],
        "vibrant": ["#EF4444", "#F59E0B", "#FFFFFF"],
        "elegant": ["#1F2937", "#92785D", "#F3F4F6"],
        "professional": ["#1E3A8A", "#059669", "#F9FAFB"]
    }

    colors = color_scheme if color_scheme else theme_colors.get(theme, theme_colors["modern"])
    primary = colors[0]
    secondary = colors[1] if len(colors) > 1 else "#FFFFFF"
    text_color = colors[2] if len(colors) > 2 else "#000000"

    title_text = title or "Your Title Here"
    subtitle_text = subtitle or ""
    body = body_text or ""

    if design_type == "poster":
        return f"""
const canvas = document.getElementById('designCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = {width};
canvas.height = {height};

// Background
ctx.fillStyle = '{secondary}';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Geometric accent
ctx.fillStyle = '{primary}';
ctx.fillRect(0, 0, canvas.width, canvas.height * 0.4);

// Title
ctx.fillStyle = '#FFFFFF';
ctx.font = 'bold 72px Inter, sans-serif';
ctx.textAlign = 'center';
ctx.fillText('{title_text}', canvas.width / 2, canvas.height * 0.25);

// Subtitle
ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
ctx.font = '32px Inter, sans-serif';
ctx.fillText('{subtitle_text}', canvas.width / 2, canvas.height * 0.33);

// Body text area
ctx.fillStyle = '{text_color}';
ctx.font = '24px Inter, sans-serif';
ctx.textAlign = 'left';
const lines = wrapText(ctx, '{body}', canvas.width * 0.1, canvas.width * 0.8);
let yPos = canvas.height * 0.5;
lines.forEach(line => {{
    ctx.fillText(line, canvas.width * 0.1, yPos);
    yPos += 35;
}});

function wrapText(context, text, maxWidth) {{
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {{
        const word = words[i];
        const width = context.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {{
            currentLine += ' ' + word;
        }} else {{
            lines.push(currentLine);
            currentLine = word;
        }}
    }}
    lines.push(currentLine);
    return lines;
}}
"""

    elif design_type == "card":
        return f"""
const canvas = document.getElementById('designCanvas');
const ctx = canvas.getContext('2d');

canvas.width = {width};
canvas.height = {height};

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, '{primary}');
gradient.addColorStop(1, '{secondary}');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Title
ctx.fillStyle = '#FFFFFF';
ctx.font = 'bold 48px Inter, sans-serif';
ctx.textAlign = 'center';
ctx.fillText('{title_text}', canvas.width / 2, canvas.height * 0.4);

// Subtitle
ctx.font = '24px Inter, sans-serif';
ctx.fillText('{subtitle_text}', canvas.width / 2, canvas.height * 0.55);
"""

    else:
        # Default simple design
        return f"""
const canvas = document.getElementById('designCanvas');
const ctx = canvas.getContext('2d');

canvas.width = {width};
canvas.height = {height};

ctx.fillStyle = '{secondary}';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = '{text_color}';
ctx.font = 'bold 64px Inter, sans-serif';
ctx.textAlign = 'center';
ctx.fillText('{title_text}', canvas.width / 2, canvas.height / 2);
"""

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Canvas Design"}
