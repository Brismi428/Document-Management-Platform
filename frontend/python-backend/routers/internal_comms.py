"""
Internal Communications Router - Business communication templates
Handles status reports, leadership updates, newsletters, FAQs, incident reports
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

router = APIRouter(prefix="/api/internal-comms", tags=["internal-comms"])

class CommsRequest(BaseModel):
    comm_type: str  # status-report, leadership-update, newsletter, faq, incident-report
    title: str
    data: Dict[str, Any]

@router.get("/templates")
async def list_comm_templates():
    """List all internal communication templates"""
    return {"templates": [
        {
            "id": "status-report",
            "name": "Status Report",
            "description": "Weekly/monthly project status updates",
            "fields": ["project_name", "period", "highlights", "challenges", "next_steps"]
        },
        {
            "id": "leadership-update",
            "name": "Leadership Update",
            "description": "Executive briefings and decision memos",
            "fields": ["topic", "background", "key_points", "decision_requested", "timeline"]
        },
        {
            "id": "newsletter",
            "name": "Company Newsletter",
            "description": "Internal newsletters and announcements",
            "fields": ["edition", "highlights", "stories", "upcoming_events"]
        },
        {
            "id": "faq",
            "name": "FAQ Document",
            "description": "Frequently asked questions",
            "fields": ["topic", "questions_answers"]
        },
        {
            "id": "incident-report",
            "name": "Incident Report",
            "description": "Post-mortem and incident documentation",
            "fields": ["incident_title", "timeline", "impact", "root_cause", "action_items"]
        }
    ]}

@router.post("/generate")
async def generate_comm(request: CommsRequest):
    """Generate internal communication document"""
    try:
        content = _generate_comm_content(request.comm_type, request.title, request.data)
        return {"success": True, "commType": request.comm_type, "title": request.title, "content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def _generate_comm_content(comm_type: str, title: str, data: Dict[str, Any]) -> str:
    if comm_type == "status-report":
        return f"""# {title}

**Project:** {data.get('project_name', 'N/A')}
**Period:** {data.get('period', 'N/A')}

## Highlights
{data.get('highlights', 'No highlights')}

## Challenges
{data.get('challenges', 'No challenges')}

## Next Steps
{data.get('next_steps', 'No next steps')}
"""
    elif comm_type == "leadership-update":
        return f"""# {title}

**Topic:** {data.get('topic', 'N/A')}

## Background
{data.get('background', '')}

## Key Points
{data.get('key_points', '')}

## Decision Requested
{data.get('decision_requested', 'None')}

## Timeline
{data.get('timeline', 'TBD')}
"""
    else:
        return f"# {title}\n\n{data.get('content', 'Content goes here')}"

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Internal Comms"}
