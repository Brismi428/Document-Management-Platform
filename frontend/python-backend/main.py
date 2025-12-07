from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

# Import routers
from routers import document_polisher, docx, pdf, xlsx

app = FastAPI(
    title="Document Management API",
    description="Comprehensive document creation, editing, and styling platform",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3010"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(document_polisher.router)
app.include_router(docx.router)
app.include_router(pdf.router)
app.include_router(xlsx.router)

@app.get("/")
async def root():
    return {
        "message": "Document Management API",
        "status": "running",
        "version": "1.0.0",
        "endpoints": {
            "document_polisher": "/api/document-polisher",
            "docx": "/api/docx",
            "pdf": "/api/pdf",
            "xlsx": "/api/xlsx"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
