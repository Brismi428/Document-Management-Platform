"""
AI Router - Natural Language API Endpoint
Handles conversational document creation and processing using Claude AI
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import os

# Try to use Claude service if API key is available, otherwise fall back to regex
try:
    from services.claude_service import claude_service
    ai_service = claude_service
    USE_CLAUDE = True
except (ValueError, Exception) as e:
    print(f"Claude API not available ({e}), falling back to regex-based service")
    from services.ai_service import ai_service
    USE_CLAUDE = False

router = APIRouter(prefix="/api/ai", tags=["AI Assistant"])


class AIRequest(BaseModel):
    """Natural language request from user"""
    message: str
    context: Optional[str] = None  # Current tool/page context


class AIResponse(BaseModel):
    """AI assistant response"""
    intent: str
    parameters: Dict[str, Any]
    confidence: float
    suggestion: str
    action: Optional[Dict[str, Any]] = None  # Structured action to execute


class ContextRequest(BaseModel):
    """Request for contextual suggestions"""
    context: str  # Current tool (docx, xlsx, pptx, pdf, themes, polish)


class SuggestionsResponse(BaseModel):
    """Contextual suggestions"""
    suggestions: List[Dict[str, str]]


class QuickActionsResponse(BaseModel):
    """Quick action shortcuts"""
    actions: List[Dict[str, Any]]


@router.post("/parse", response_model=AIResponse)
async def parse_request(request: AIRequest):
    """
    Parse natural language request and return structured intent

    This endpoint analyzes user input and returns:
    - Classified intent (what they want to do)
    - Extracted parameters (document details)
    - Confidence score
    - Human-readable suggestion
    - Optional executable action

    Example requests:
    - "Create a quarterly budget for 2025"
    - "Make a pitch deck titled 'Series A Fundraising'"
    - "Apply McKinsey styling to my document"
    """
    try:
        # Parse the request using AI service (Claude or regex fallback)
        parsed = ai_service.parse_request(request.message, request.context or "home")

        # Claude service already builds the action, regex service doesn't
        action = parsed.get("action")
        if not action and not USE_CLAUDE:
            # Build action for regex-based service
            action = _build_action_fallback(
                intent=parsed["intent"],
                parameters=parsed["parameters"]
            )

        return AIResponse(
            intent=parsed["intent"],
            parameters=parsed["parameters"],
            confidence=parsed["confidence"],
            suggestion=parsed["suggestion"],
            action=action
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/suggestions", response_model=SuggestionsResponse)
async def get_suggestions(request: ContextRequest):
    """
    Get contextual suggestions based on current tool/page

    Returns helpful tips and next actions specific to the tool
    the user is currently using.

    Contexts: docx, xlsx, pptx, pdf, themes, polish
    """
    try:
        suggestions = ai_service.get_tool_suggestions(request.context)
        return SuggestionsResponse(suggestions=suggestions)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/quick-actions", response_model=QuickActionsResponse)
async def get_quick_actions():
    """
    Get quick action shortcuts for common operations

    Returns pre-configured actions that users can trigger with one click:
    - Quick Report
    - Budget Template
    - Pitch Deck
    - Quick Memo
    """
    try:
        actions = ai_service.get_quick_actions()
        return QuickActionsResponse(actions=actions)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def _build_action_fallback(intent: str, parameters: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Build executable action from intent and parameters (fallback for regex-based service)

    Returns a structured action that the frontend can execute:
    {
        "type": "navigate" | "api_call" | "multi_step",
        "target": "/dashboard-docx" | endpoint,
        "payload": { ... },
        "steps": [ ... ]  # For multi-step operations
    }
    """
    if intent == "create_document":
        return {
            "type": "navigate",
            "target": "/dashboard-docx",
            "pre_fill": {
                "template": parameters.get("template_type", "blank"),
                "title": parameters.get("title", ""),
            }
        }

    elif intent == "create_spreadsheet":
        return {
            "type": "navigate",
            "target": "/dashboard-xlsx",
            "pre_fill": {
                "template": parameters.get("template_type", "blank"),
                "year": parameters.get("year", ""),
                "categories": parameters.get("categories", []),
            }
        }

    elif intent == "create_presentation":
        return {
            "type": "navigate",
            "target": "/dashboard-pptx",
            "pre_fill": {
                "template": parameters.get("template_type", "blank"),
                "title": parameters.get("title", ""),
            }
        }

    elif intent == "apply_theme":
        return {
            "type": "navigate",
            "target": "/dashboard-themes",
            "pre_fill": {
                "theme": parameters.get("brand", "ocean"),
            }
        }

    elif intent == "polish_document":
        return {
            "type": "navigate",
            "target": "/dashboard-polish",
            "pre_fill": {
                "brand": parameters.get("brand", "mckinsey"),
            }
        }

    elif intent == "chain_operations":
        # Multi-step operation
        return {
            "type": "multi_step",
            "steps": [
                {
                    "action": "create",
                    "tool": "docx",
                    "parameters": parameters
                },
                {
                    "action": "theme",
                    "tool": "themes",
                    "parameters": {"brand": parameters.get("brand")}
                }
            ]
        }

    elif intent == "get_help":
        return {
            "type": "show_help",
            "message": "Here's what I can help you with..."
        }

    return None


@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "AI Router"}
