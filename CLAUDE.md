# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains a collection of Claude Code skills for document manipulation and styling. The **Document Polisher** skill is the flagship feature, applying premium brand aesthetics (McKinsey, Deloitte, Stripe, Apple, etc.) to DOCX documents. Additional skills provide comprehensive document generation capabilities for DOCX, PDF, XLSX, and PPTX files.

## Architecture

### Skill System

Skills are located in `.claude/skills/` and follow a standard structure:
- `SKILL.md` - Instructions and workflow for Claude Code
- `scripts/` - Python/Node.js automation scripts
- `templates/` - Configuration files (JSON) and templates
- `brands/` or similar reference directories - Supporting documentation

### Document Polisher Core Architecture

The Document Polisher uses a **two-layer architecture**:

1. **Brand Configuration Layer** (`.claude/skills/document-polisher/templates/brand-mapping.json`)
   - Centralized JSON configuration defining all brand styles
   - Contains: colors (primary, accent, text), typography (fonts, weights), styles (h1/h2/h3/body sizes)
   - Categories: editorial, consulting, tech, productivity, design

2. **Processing Layer** (`scripts/apply_brand.py`)
   - Python script using python-docx library
   - Creates a NEW document (never modifies XML directly - prevents corruption)
   - Applies styles by:
     - Loading brand config from JSON
     - Creating fresh Document object
     - Applying document-level styles (Normal, Heading 1-3, Title, List)
     - Copying content paragraph-by-paragraph with formatting preservation
     - Setting page margins and spacing

**Critical Design Decisions:**
- NEVER directly edit OOXML/XML - use python-docx API only
- Always create new documents rather than modifying existing ones
- Preserve user content: headings, lists, bold/italic, tables
- Use cross-platform fonts only (Arial, Calibri, Georgia, Segoe UI, Times New Roman)

### Brand Extension System

Brands can be added via:
1. **Manual addition** - Edit `brand-mapping.json` + create reference file in `brands/`
2. **FireCrawl MCP integration** - Extract branding from websites automatically using `mcp__firecrawl__firecrawl_extract_branding` tool

### Web Application Architecture

This repository includes a **full-stack web application** built with:

**Frontend** (Port 3010):
- Next.js 16 with App Router
- React 19, TypeScript
- Tailwind CSS 4

**Backend** (Port 8000):
- FastAPI with modular routers
- Document manipulation services (DOCX, PDF, XLSX, PPTX)
- REST APIs for all Claude Code skills

**Communication**:
- CORS-enabled for localhost:3010
- Backend proxy pattern for API keys (secure - keys never exposed to frontend)

## Development Commands

### Web Application Development

**Start Backend (FastAPI - Port 8000)**:
```bash
cd frontend/python-backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your API keys

python main.py
```

**Start Frontend (Next.js - Port 3010)**:
```bash
cd frontend
npm install
npm run dev
```

Visit **http://localhost:3010** to access the web application.

**Environment Configuration** (`frontend/python-backend/.env`):
```bash
ANTHROPIC_API_KEY=sk-ant-your-key-here
FIRECRAWL_API_KEY=fc-your-key-here
PORT=8000
HOST=0.0.0.0
FRONTEND_URL=http://localhost:3010
```

**IMPORTANT**: The `.env` file is gitignored. Never commit API keys to version control.

## Development Commands

### Python Environment

```bash
# Create virtual environment (one-time setup)
python3 -m venv venv

# Activate virtual environment (required before running scripts)
source venv/bin/activate  # macOS/Linux
.\venv\Scripts\activate   # Windows

# Install dependencies
pip install python-docx

# Deactivate when done
deactivate
```

### Document Polisher Commands

```bash
# List all available brand styles
python .claude/skills/document-polisher/scripts/apply_brand.py --list

# Apply brand styling to a document
python .claude/skills/document-polisher/scripts/apply_brand.py <input.docx> <brand_name> <output.docx>

# Examples:
python .claude/skills/document-polisher/scripts/apply_brand.py report.docx mckinsey polished_report.docx
python .claude/skills/document-polisher/scripts/apply_brand.py guide.docx stripe tech_guide.docx
```

**Brand names**: `economist`, `mckinsey`, `deloitte`, `kpmg`, `stripe`, `apple`, `ibm`, `notion`, `linear`, `figma`

### Skill Installation

```bash
# Global installation (available in all projects)
mkdir -p ~/.claude/skills
cp -r .claude/skills/* ~/.claude/skills/

# Project-specific installation
cp -r .claude/skills /path/to/project/.claude/

# Selective installation (example: document-polisher only)
cp -r .claude/skills/document-polisher ~/.claude/skills/
```

### Testing

```bash
# Test skill availability in Claude Code
claude
/skill document-polisher

# Test Python script directly
source venv/bin/activate
python .claude/skills/document-polisher/scripts/apply_brand.py --list
```

## MCP Server Configuration

### FireCrawl MCP (Brand Extraction)

Required for extracting brand identity from websites to create custom themes.

**Setup:**
```bash
# Get API key from https://firecrawl.dev
# Then add MCP server:
claude mcp add firecrawl \
  --command "npx" \
  --args "-y" "@anthropic/firecrawl-mcp" \
  --env "FIRECRAWL_API_KEY=fc-your-api-key-here"
```

**Available tools:**
- `mcp__firecrawl__firecrawl_extract_branding` - Extract colors, fonts, styling from URLs
- `mcp__firecrawl__firecrawl_scrape_with_branding` - Scrape content + brand identity
- `mcp__firecrawl__firecrawl_compare_branding` - Compare two websites' branding

See [docs/MCP-SERVERS.md](docs/MCP-SERVERS.md) for detailed configuration.

## Key Files and Locations

| Path | Purpose |
|------|---------|
| `.claude/skills/document-polisher/SKILL.md` | Main skill instructions with brand menu and workflow |
| `.claude/skills/document-polisher/scripts/apply_brand.py` | Core Python script for applying brand styles |
| `.claude/skills/document-polisher/templates/brand-mapping.json` | Brand configuration database (colors, fonts, styles) |
| `.claude/skills/document-polisher/brands/*.md` | Brand reference files with visual guidelines |
| `.claude/settings.example.json` | Example permissions configuration |
| `docs/SETUP.md` | Detailed setup guide for users |
| `docs/MCP-SERVERS.md` | MCP server configuration guide |
| `docs/TROUBLESHOOTING.md` | Common issues and solutions |
| `quick-start/PROMPTS.md` | Copy-paste prompts for users |

## Workflow Patterns

### When User Requests Document Polishing

1. Display the brand selection menu from `SKILL.md`
2. Ask user to select brand or describe document purpose (recommend based on purpose)
3. Ensure virtual environment is activated
4. Run `apply_brand.py` script with selected brand
5. Confirm output file creation

### Adding a New Brand Theme

1. If using FireCrawl: Extract branding from target URL
2. Update `.claude/skills/document-polisher/templates/brand-mapping.json`:
   - Add new brand object with name, description, category, colors, typography, styles
3. Create reference file in `.claude/skills/document-polisher/brands/<brand_name>.md`
4. Test with sample document
5. Update README if adding to standard collection

### Custom Brand Configuration Structure

```json
{
  "brand_id": {
    "name": "Brand Name",
    "description": "When to use this brand",
    "category": "consulting|tech|editorial|productivity|design",
    "colors": {
      "primary": "#hex",
      "accent": "#hex",
      "background": "#FFFFFF",
      "textPrimary": "#hex",
      "textSecondary": "#hex"
    },
    "typography": {
      "headingFont": "Font Name",
      "bodyFont": "Font Name",
      "headingWeight": "bold|medium|normal",
      "bodyWeight": "normal"
    },
    "styles": {
      "h1": {"size": 32, "color": "#hex", "bold": true},
      "h2": {"size": 24, "color": "#hex", "bold": true},
      "h3": {"size": 16, "color": "#hex", "bold": true},
      "body": {"size": 11, "color": "#hex"},
      "caption": {"size": 9, "color": "#hex"}
    }
  }
}
```

## Permissions Configuration

The `.claude/settings.local.json` file (create from `settings.example.json`) controls what Claude Code can execute:

```json
{
  "permissions": {
    "allow": [
      "Bash(python:*)",
      "Bash(pip install:*)",
      "Skill(document-polisher)",
      "Bash(python \".claude/skills/document-polisher/scripts/apply_brand.py\":*)"
    ]
  }
}
```

**Note**: `settings.local.json` is gitignored and should not be committed (may contain API keys).

## Important Constraints

### Font Selection
- Only use cross-platform fonts that work on both Mac and Windows
- Approved fonts: Arial, Calibri, Georgia, Segoe UI, Times New Roman
- Avoid: SF Pro, Helvetica Neue (use Arial as fallback), custom fonts

### Document Safety
- Always create new documents, never modify originals
- Use python-docx API only - never manipulate OOXML directly
- Test brand styles on sample documents before production use

### API Keys and Secrets
- Never commit API keys or tokens to version control
- Use environment variables or `.env` files (gitignored)
- Store FireCrawl API key in MCP config, not in code
- `settings.local.json` is for local use only - provide `settings.example.json` as template

## Dependencies

**Python (Required for Document Polisher):**
- python-docx - DOCX file manipulation

**Node.js (Optional for MCP):**
- Required for FireCrawl MCP server
- Minimum version: Node.js 18+

## Additional Skills in Repository

While Document Polisher is the flagship skill, this repository includes additional Claude Code skills:

- **docx** - Create/edit DOCX documents (compatible with Word, LibreOffice, Google Docs) with formatting, tracked changes, comments
- **pdf** - Generate, merge, split PDFs; fill forms
- **xlsx** - Spreadsheet creation, formulas, data analysis
- **pptx** - PowerPoint creation and editing
- **brand-guidelines** - Anthropic brand styling
- **theme-factory** - Apply decorative themes to artifacts
- Others (see `.claude/skills/` directory)

Each skill has its own `SKILL.md` with specific instructions and workflows.
