from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Import routers
from routers import (
    document_polisher, docx, pdf, xlsx, pptx, theme_factory, ai_router,
    algorithmic_art, canvas_design, internal_comms, brand_guidelines,
    frontend_design, slack_gif_creator, web_artifacts_builder,
    webapp_testing, mcp_builder, skill_creator, document_platform
)

app = FastAPI(
    title="Ultimate Productivity Platform API",
    description="All-in-one creative & productivity suite with 17 integrated skills",
    version="2.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3010"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all 17 skill routers
# Documents & Office
app.include_router(docx.router)
app.include_router(xlsx.router)
app.include_router(pptx.router)
app.include_router(pdf.router)
app.include_router(document_polisher.router)
app.include_router(theme_factory.router)

# Creative & Design
app.include_router(algorithmic_art.router)
app.include_router(canvas_design.router)
app.include_router(slack_gif_creator.router)

# Web & Development
app.include_router(frontend_design.router)
app.include_router(web_artifacts_builder.router)
app.include_router(webapp_testing.router)

# Business & Communication
app.include_router(internal_comms.router)
app.include_router(brand_guidelines.router)

# Platform & Meta
app.include_router(mcp_builder.router)
app.include_router(skill_creator.router)
app.include_router(document_platform.router)

# AI Assistant
app.include_router(ai_router.router)

@app.get("/")
async def root():
    return {
        "message": "Ultimate Productivity Platform API",
        "description": "All-in-one creative & productivity suite powered by Claude AI",
        "status": "running",
        "version": "2.0.0",
        "totalSkills": 17,
        "skills": {
            "documents": ["docx", "xlsx", "pptx", "pdf", "document-polisher", "theme-factory"],
            "creative": ["algorithmic-art", "canvas-design", "slack-gif"],
            "web": ["frontend-design", "web-artifacts", "webapp-testing"],
            "business": ["internal-comms", "brand-guidelines"],
            "platform": ["mcp-builder", "skill-creator", "document-platform"]
        },
        "endpoints": {
            "docx": "/api/docx",
            "xlsx": "/api/xlsx",
            "pptx": "/api/pptx",
            "pdf": "/api/pdf",
            "document_polisher": "/api/document-polisher",
            "themes": "/api/themes",
            "algorithmic_art": "/api/algorithmic-art",
            "canvas_design": "/api/canvas-design",
            "slack_gif": "/api/slack-gif",
            "frontend_design": "/api/frontend-design",
            "web_artifacts": "/api/web-artifacts",
            "webapp_testing": "/api/webapp-testing",
            "internal_comms": "/api/internal-comms",
            "brand_guidelines": "/api/brand-guidelines",
            "mcp_builder": "/api/mcp-builder",
            "skill_creator": "/api/skill-creator",
            "document_platform": "/api/document-platform",
            "ai": "/api/ai"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
