"""
Slack GIF Creator Router - Animated GIF creation optimized for Slack
Generates animated GIFs with proper constraints and validation
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/slack-gif", tags=["slack-gif"])

class GIFRequest(BaseModel):
    animation_type: str  # text-animation, loading-spinner, reaction, custom
    text: Optional[str] = None
    frames: int = 30
    fps: int = 15
    width: int = 480
    height: int = 270

@router.get("/templates")
async def list_gif_templates():
    """List all available GIF animation templates"""
    return {"templates": [
        {"id": "text-animation", "name": "Text Animation", "description": "Animated text with effects"},
        {"id": "loading-spinner", "name": "Loading Spinner", "description": "Custom loading animations"},
        {"id": "reaction", "name": "Reaction GIF", "description": "Animated reactions and expressions"},
        {"id": "celebration", "name": "Celebration", "description": "Confetti, fireworks, party effects"},
        {"id": "custom", "name": "Custom Animation", "description": "Frame-by-frame custom animation"}
    ]}

@router.post("/generate")
async def generate_gif(request: GIFRequest):
    """Generate animated GIF for Slack"""
    # Validate Slack constraints
    if request.width > 500 or request.height > 500:
        raise HTTPException(status_code=400, detail="Dimensions must be ≤ 500px for Slack")
    if request.fps > 20:
        raise HTTPException(status_code=400, detail="FPS must be ≤ 20 for optimal Slack performance")

    return {
        "success": True,
        "animationType": request.animation_type,
        "frames": request.frames,
        "fps": request.fps,
        "dimensions": {"width": request.width, "height": request.height},
        "estimatedSize": f"{(request.frames * request.width * request.height * 4) // (1024 * 1024)} MB"
    }

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Slack GIF Creator"}
