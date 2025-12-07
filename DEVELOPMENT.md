# Development Guide

Complete guide for setting up and running the Document Management Platform locally.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Detailed Setup](#detailed-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the Application](#running-the-application)
6. [Development Workflow](#development-workflow)
7. [Project Structure](#project-structure)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js**: Version 18+ ([Download](https://nodejs.org/))
- **Python**: Version 3.8+ ([Download](https://www.python.org/downloads/))
- **npm**: Comes with Node.js
- **Git**: For cloning the repository

### API Keys (Optional but Recommended)

- **Anthropic API Key**: For AI-powered features ([Get Key](https://console.anthropic.com/))
- **FireCrawl API Key**: For brand extraction from websites ([Get Key](https://firecrawl.dev))
- **OpenAI API Key**: Optional, for additional AI features ([Get Key](https://platform.openai.com/))

---

## Quick Start

Get up and running in 5 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/claude-code-polished-documents-skills.git
cd claude-code-polished-documents-skills

# 2. Set up Python backend
cd frontend/python-backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt

# 3. Configure environment
cp .env.example .env
# Edit .env and add your API keys

# 4. Start backend
python main.py

# 5. In a new terminal, start frontend
cd ../../frontend
npm install
npm run dev
```

Visit **http://localhost:3010**

---

## Detailed Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/claude-code-polished-documents-skills.git
cd claude-code-polished-documents-skills
```

### 2. Backend Setup (Python + FastAPI)

Navigate to the Python backend directory:

```bash
cd frontend/python-backend
```

#### Create Virtual Environment

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows:**
```bash
python -m venv venv
.\venv\Scripts\activate
```

You should see `(venv)` in your terminal prompt.

#### Install Python Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `python-docx` - DOCX manipulation
- `pypdf`, `pdfplumber`, `reportlab` - PDF processing
- `openpyxl`, `pandas` - Excel/spreadsheet tools
- `python-pptx` - PowerPoint generation
- `python-multipart` - File upload support

#### Verify Installation

```bash
python -c "import fastapi; print('FastAPI installed successfully')"
```

### 3. Frontend Setup (Next.js + React)

Navigate to the frontend directory:

```bash
cd ../frontend  # or cd frontend from project root
```

#### Install Node Dependencies

```bash
npm install
```

This installs:
- `next@16.0.7` - React framework
- `react@19.2.1` - UI library
- `tailwindcss@4.1.17` - CSS framework
- TypeScript and development tools

#### Verify Installation

```bash
npm run build
```

---

## Environment Configuration

### Backend Environment Variables

Create `.env` file in `frontend/python-backend/`:

```bash
cd frontend/python-backend
cp .env.example .env
```

Edit `.env` with your actual values:

```bash
# =============================================================================
# Environment Variables
# =============================================================================

# -----------------------------------------------------------------------------
# AI API Keys
# -----------------------------------------------------------------------------
# Anthropic Claude API (for AI-powered features)
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here

# OpenAI API (optional, for additional AI features)
OPENAI_API_KEY=sk-your-actual-key-here

# -----------------------------------------------------------------------------
# Document Processing Services
# -----------------------------------------------------------------------------
# FireCrawl API for web scraping and brand extraction
FIRECRAWL_API_KEY=fc-your-actual-key-here

# -----------------------------------------------------------------------------
# Application Settings
# -----------------------------------------------------------------------------
# Backend server settings
PORT=8000
HOST=0.0.0.0

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3010
```

### Security Notes

- **NEVER commit `.env` to Git** - It's already in `.gitignore`
- Store sensitive keys in `.env` only (backend)
- Never expose API keys in frontend code
- Use the backend proxy pattern for AI API calls

### Frontend Port Configuration

The frontend is configured to run on port **3010** in `frontend/package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p 3010"
  }
}
```

### Backend CORS Configuration

The backend allows requests from port 3010 in `frontend/python-backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3010"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Running the Application

### Start Backend Server

**Terminal 1:**

```bash
cd frontend/python-backend
source venv/bin/activate  # Windows: .\venv\Scripts\activate
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**Backend API Endpoints:**
- Health check: http://localhost:8000/health
- API documentation: http://localhost:8000/docs
- Document Polisher: http://localhost:8000/api/document-polisher/brands
- DOCX API: http://localhost:8000/api/docx/templates
- PDF API: http://localhost:8000/api/pdf/info
- XLSX API: http://localhost:8000/api/xlsx/templates

### Start Frontend Server

**Terminal 2:**

```bash
cd frontend
npm run dev
```

You should see:
```
▲ Next.js 16.0.7 (Turbopack)
- Local:         http://localhost:3010
- Network:       http://192.168.x.x:3010

✓ Starting...
✓ Ready in 789ms
```

**Access the Application:**
- Frontend: **http://localhost:3010**
- Dashboard: http://localhost:3010/dashboard-polish

### Stopping the Servers

**macOS/Linux:**
- Press `Ctrl+C` in each terminal

**Windows:**
- Press `Ctrl+C` in each terminal
- Or kill processes: `taskkill /F /IM node.exe` and `taskkill /F /IM python.exe`

---

## Development Workflow

### Making Changes to Backend

1. Edit Python files in `frontend/python-backend/`
2. FastAPI auto-reloads on file changes (if running with `uvicorn` in dev mode)
3. Check logs in Terminal 1
4. Test endpoints at http://localhost:8000/docs

### Making Changes to Frontend

1. Edit files in `frontend/src/app/`
2. Next.js auto-reloads with Turbopack (instant updates)
3. Check browser console for errors
4. Changes appear immediately at http://localhost:3010

### Adding New API Endpoints

**Backend (`frontend/python-backend/routers/`):**

```python
# Create new router file
from fastapi import APIRouter

router = APIRouter(prefix="/api/new-feature", tags=["new-feature"])

@router.get("/")
async def get_data():
    return {"message": "Hello from new feature"}
```

**Register in `main.py`:**

```python
from routers import new_feature

app.include_router(new_feature.router)
```

**Frontend (`frontend/src/app/`):**

```typescript
// Call from Next.js
async function fetchData() {
  const response = await fetch('http://localhost:8000/api/new-feature');
  const data = await response.json();
  return data;
}
```

### Database Migrations (Future)

Currently using file-based storage. When adding a database:

1. Install SQLAlchemy or Prisma
2. Create models
3. Run migrations
4. Update `.env` with database URL

---

## Project Structure

```
claude-code-polished-documents-skills/
├── frontend/                          # Next.js 16 application
│   ├── src/
│   │   └── app/
│   │       ├── page.tsx              # Landing page
│   │       ├── dashboard-polish/     # Document Polisher UI
│   │       ├── dashboard-docx/       # DOCX editor UI
│   │       ├── dashboard-pdf/        # PDF tools UI
│   │       └── dashboard-xlsx/       # Excel tools UI
│   ├── public/                        # Static assets
│   ├── package.json                   # Node dependencies
│   └── tailwind.config.ts            # Tailwind CSS config
│
├── frontend/python-backend/           # FastAPI backend
│   ├── main.py                        # FastAPI app entry point
│   ├── routers/                       # API route handlers
│   │   ├── document_polisher.py
│   │   ├── docx.py
│   │   ├── pdf.py
│   │   └── xlsx.py
│   ├── services/                      # Business logic
│   │   ├── document_polisher_service.py
│   │   ├── docx_service.py
│   │   ├── pdf_service.py
│   │   └── xlsx_service.py
│   ├── requirements.txt               # Python dependencies
│   ├── .env                           # Environment variables (GITIGNORED)
│   └── .env.example                   # Example environment file
│
├── .claude/                           # Claude Code skills
│   └── skills/
│       ├── document-polisher/
│       ├── docx/
│       ├── pdf/
│       ├── xlsx/
│       └── pptx/
│
├── docs/                              # Documentation
│   ├── SETUP.md
│   ├── MCP-SERVERS.md
│   └── TROUBLESHOOTING.md
│
├── README.md                          # Project overview
├── DEVELOPMENT.md                     # This file
├── FRONTEND-ARCHITECTURE.md           # Architecture details
├── CLAUDE.md                          # Claude Code instructions
└── .gitignore                         # Git ignore rules
```

---

## Troubleshooting

### Backend Won't Start

**Error: `ModuleNotFoundError: No module named 'fastapi'`**

Solution:
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # Windows: .\venv\Scripts\activate

# Reinstall dependencies
pip install -r requirements.txt
```

**Error: `Address already in use` (Port 8000)**

Solution:
```bash
# Find process using port 8000
# macOS/Linux:
lsof -ti:8000 | xargs kill -9

# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Frontend Won't Start

**Error: `Port 3010 is already in use`**

Solution:
```bash
# Kill Node processes
# macOS/Linux:
killall node

# Windows:
taskkill /F /IM node.exe
```

**Error: `Module not found`**

Solution:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

**Error: `Access-Control-Allow-Origin` header**

Check:
1. Backend CORS settings in `main.py` allow `http://localhost:3010`
2. Frontend is calling `http://localhost:8000` (not HTTPS)
3. Both servers are running

### Environment Variables Not Loading

**Backend can't read `.env` file**

Solution:
```bash
# Verify file exists
ls frontend/python-backend/.env

# Check file format (no spaces around =)
ANTHROPIC_API_KEY=your-key-here  # Correct
ANTHROPIC_API_KEY = your-key-here  # Wrong

# Restart backend after editing .env
```

### Python Version Issues

**Error: `python: command not found`**

Solution:
```bash
# Try python3
python3 --version

# Or install Python from python.org
```

### Node Version Issues

**Error: `Unsupported engine`**

Solution:
```bash
# Check Node version
node --version  # Should be 18+

# Upgrade Node if needed
# Use nvm (recommended):
nvm install 18
nvm use 18
```

---

## Next Steps

### Add Authentication

1. Install NextAuth.js or Supabase Auth
2. Create login/signup pages
3. Protect dashboard routes
4. Add user sessions

### Deploy to Production

**Frontend (Vercel)**:
```bash
npm run build
vercel deploy
```

**Backend (Railway/Render)**:
```bash
# Create Procfile
web: uvicorn main:app --host 0.0.0.0 --port $PORT

# Deploy to Railway or Render
```

### Add Database

1. Choose database (PostgreSQL, MongoDB)
2. Install ORM (SQLAlchemy, Prisma)
3. Create models
4. Run migrations
5. Update `.env` with database URL

---

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/claude-code-polished-documents-skills/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/claude-code-polished-documents-skills/discussions)
- **Docs**: See [docs/](docs/) folder
- **Claude Code**: Run `/help` in Claude Code

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

---

Made with AI assistance
