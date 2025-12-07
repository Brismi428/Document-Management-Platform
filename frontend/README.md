# Document Polisher Web App

A full-stack web application for transforming documents with premium brand styling.

## 🚀 What We Built

A production-ready web application with:
- **Next.js 16** frontend with TypeScript
- **FastAPI** Python backend
- **10 premium brand styles** (McKinsey, Apple, Stripe, etc.)
- **File upload** and processing
- **Real-time document polishing**

## 🏗️ Architecture

```
document-polisher-app/
├── src/                          # Next.js frontend
│   ├── app/
│   │   ├── page.tsx             # Landing page with brand showcase
│   │   ├── (dashboard)/
│   │   │   └── polish/
│   │   │       └── page.tsx     # Document polisher interface
│   │   └── api/
│   │       └── polish/
│   │           └── route.ts     # API proxy to Python backend
│   ├── components/
│   ├── lib/
│   └── styles/
│       └── globals.css
│
└── python-backend/               # FastAPI backend
    ├── main.py                  # FastAPI server
    └── requirements.txt
```

## 🔧 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.13
- **Core**: python-docx (from parent project)
- **Deployment**: Railway/Render-ready

## 📦 Setup

### Prerequisites
- Node.js 18+
- Python 3.8+
- Access to parent `claude-code-polished-documents-skills` repo

### Installation

1. **Install Node dependencies**
   ```bash
   npm install
   ```

2. **Install Python dependencies**
   ```bash
   cd python-backend
   pip install -r requirements.txt
   ```

## 🚀 Running the App

### Development Mode

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Frontend runs on: http://localhost:3001

**Terminal 2 - Backend:**
```bash
cd python-backend
python main.py
```
Backend runs on: http://localhost:8000

### Access the App

- **Landing Page**: http://localhost:3001
- **Document Polisher**: http://localhost:3001/dashboard/polish
- **API Docs**: http://localhost:8000/docs (FastAPI auto-generated)

## 💡 How to Use

1. **Open** http://localhost:3001/dashboard/polish
2. **Upload** a .docx file
3. **Select** a brand style (McKinsey, Apple, Stripe, etc.)
4. **Click** "Polish Document"
5. **Download** your professionally-styled document!

## 🎨 Available Brand Styles

| Brand | Category | Best For |
|-------|----------|----------|
| **The Economist** | Editorial | Reports, analysis |
| **McKinsey** | Consulting | Strategy decks |
| **Deloitte** | Consulting | Audits, formal reports |
| **KPMG** | Consulting | Financial reports |
| **Stripe** | Tech | API docs, dev guides |
| **Apple** | Tech | Product guides |
| **IBM** | Tech | Enterprise docs |
| **Linear** | Tech | Product specs |
| **Notion** | Productivity | Wikis, docs |
| **Figma** | Design | Creative briefs |

## 🔗 Integration with Skills Repository

This app uses the Python scripts from the parent `claude-code-polished-documents-skills` repository:

```python
# In python-backend/main.py
skills_path = Path(__file__).parent.parent.parent / "claude-code-polished-documents-skills" / ".claude" / "skills" / "document-polisher" / "scripts"
sys.path.append(str(skills_path))
from apply_brand import apply_brand_to_docx
```

## 📁 Key Files

### Frontend
- `src/app/page.tsx` - Landing page with brand showcase
- `src/app/(dashboard)/polish/page.tsx` - Main polisher interface
- `src/app/api/polish/route.ts` - API route (proxies to FastAPI)

### Backend
- `python-backend/main.py` - FastAPI server
- `/polish` endpoint - Processes documents

## 🚢 Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### Backend (Railway/Render)
```bash
# Push to GitHub, connect to Railway/Render
# Set environment variables if needed
```

## 🛠️ Next Steps

### Phase 1 Improvements
- [ ] Add user authentication (NextAuth.js)
- [ ] Save processing history
- [ ] Add drag-and-drop file upload
- [ ] Show processing progress bar
- [ ] Add before/after preview

### Phase 2 Features
- [ ] Theme Factory interface
- [ ] PDF extraction tool
- [ ] XLSX creator
- [ ] User dashboard
- [ ] Billing integration (Stripe)

### Phase 3 Advanced
- [ ] All 16 skills operational
- [ ] API for developers
- [ ] Mobile responsive design
- [ ] Advanced analytics
- [ ] Custom brand creation

## 🐛 Troubleshooting

### "Module not found" in Python backend
- Ensure parent `claude-code-polished-documents-skills` exists
- Check the path in `main.py` is correct

### CORS errors
- Verify FastAPI is running on port 8000
- Check CORS settings in `python-backend/main.py`

### Next.js errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📚 Related Documentation

- **Parent Project**: [../claude-code-polished-documents-skills/README.md](../claude-code-polished-documents-skills/README.md)
- **Beginner Guide**: [../claude-code-polished-documents-skills/BEGINNER-GUIDE.md](../claude-code-polished-documents-skills/BEGINNER-GUIDE.md)
- **Architecture**: [../claude-code-polished-documents-skills/FRONTEND-ARCHITECTURE.md](../claude-code-polished-documents-skills/FRONTEND-ARCHITECTURE.md)

## 📝 License

MIT License - Same as parent project

---

**Built with Claude Code** 🤖
