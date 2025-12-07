---
name: document-platform
description: Unified access to the Document Management Platform. Create, edit, and style DOCX, PDF, XLSX, and PPTX files with AI-powered natural language interface. Use when users want to generate documents, spreadsheets, or presentations through conversation.
license: Complete terms in LICENSE.txt
---

# Document Management Platform Skill

This skill provides conversational access to a comprehensive document management platform running at [http://localhost:3010](http://localhost:3010).

## When to Use This Skill

Use this skill when users want to:
- Create documents (DOCX): reports, memos, letters
- Build spreadsheets (XLSX): budgets, financial models, data tables
- Generate presentations (PPTX): pitch decks, business presentations
- Process PDFs: merge, split, extract, rotate
- Apply professional themes and branding
- Polish documents with premium brand styles

## Available Tools

The platform includes 6 active tools:

1. **Document Polisher** - Apply premium brand styling (McKinsey, Deloitte, Stripe, Apple, IBM, Notion, Linear, Figma, Economist, KPMG)
2. **DOCX Creator** - Create professional documents from templates (blank, report, memo, letter)
3. **PDF Processor** - Merge, split, extract text, rotate PDFs
4. **Spreadsheet Creator** - Build XLSX files with formulas (blank, budget, financial model, data table)
5. **Presentation Builder** - Create PPTX presentations (blank, business, pitch, report, educational)
6. **Theme Factory** - Apply color and font themes to documents and presentations

## How to Use This Skill

### Method 1: Natural Language (Recommended)

The platform has an AI router at `http://localhost:8000/api/ai/parse` that understands natural language requests.

**Example Workflow:**

```python
# User says: "Create a quarterly budget for 2025 with categories for Marketing, Engineering, and Operations"

# 1. Parse the request
import requests

response = requests.post('http://localhost:8000/api/ai/parse', json={
    "message": "Create a quarterly budget for 2025 with categories for Marketing, Engineering, and Operations",
    "context": "home"
})

result = response.json()
# Returns:
# {
#   "intent": "create_spreadsheet",
#   "parameters": {
#     "template_type": "budget",
#     "year": "2025",
#     "categories": ["Marketing", "Engineering", "Operations"]
#   },
#   "confidence": 0.9,
#   "suggestion": "Create a budget spreadsheet for 2025",
#   "action": {
#     "type": "api_call",
#     "endpoint": "/api/xlsx/create/budget",
#     "payload": {...}
#   }
# }

# 2. Execute the suggested action
create_response = requests.post('http://localhost:8000/api/xlsx/create/budget', json={
    "year": "2025",
    "categories": ["Marketing", "Engineering", "Operations"]
})

# 3. Download the file
with open('budget_2025.xlsx', 'wb') as f:
    f.write(create_response.content)
```

### Method 2: Direct API Calls

You can also call the backend APIs directly:

**Create DOCX Document:**
```bash
curl -X POST http://localhost:8000/api/docx/create \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Q4 2024 Report",
    "sections": [
      {"heading": "Executive Summary", "body": "..."},
      {"heading": "Financial Results", "body": "..."}
    ]
  }' \\
  --output report.docx
```

**Create XLSX Spreadsheet:**
```bash
curl -X POST http://localhost:8000/api/xlsx/create/budget \\
  -H "Content-Type: application/json" \\
  -d '{
    "year": "2025",
    "categories": ["Salaries", "Marketing", "Operations"]
  }' \\
  --output budget.xlsx
```

**Create PPTX Presentation:**
```bash
curl -X POST http://localhost:8000/api/pptx/create \\
  -H "Content-Type: application/json" \\
  -d '{
    "template_type": "pitch",
    "title": "Series A Fundraising",
    "subtitle": "Company Overview"
  }' \\
  --output pitch.pptx
```

**Apply Theme:**
```bash
# Upload a document and apply a theme
curl -X POST http://localhost:8000/api/themes/apply-docx \\
  -F "file=@document.docx" \\
  -F "theme_id=ocean" \\
  --output themed_document.docx
```

### Method 3: Web Interface

The platform has a web interface at [http://localhost:3010](http://localhost:3010) with:
- Visual tool selection
- Form-based input
- Real-time preview
- Instant download

## API Endpoints

### AI Router
- `POST /api/ai/parse` - Parse natural language requests
- `POST /api/ai/suggestions` - Get contextual suggestions
- `GET /api/ai/quick-actions` - Get quick action shortcuts

### DOCX
- `POST /api/docx/create` - Create blank document
- `POST /api/docx/create-from-template` - Create from template (memo, letter, report)

### XLSX
- `POST /api/xlsx/create/blank` - Create blank spreadsheet
- `POST /api/xlsx/create/budget` - Create budget template
- `POST /api/xlsx/create/financial-model` - Create financial projection
- `POST /api/xlsx/create/data-table` - Create formatted data table

### PPTX
- `POST /api/pptx/create` - Create presentation

### PDF
- `POST /api/pdf/merge` - Merge multiple PDFs
- `POST /api/pdf/split` - Split PDF by page ranges
- `POST /api/pdf/extract-text` - Extract text from PDF
- `POST /api/pdf/rotate` - Rotate PDF pages

### Themes
- `GET /api/themes/` - List all themes
- `POST /api/themes/apply-docx` - Apply theme to DOCX
- `POST /api/themes/apply-pptx` - Apply theme to PPTX

### Document Polisher
- `POST /api/document-polisher/polish` - Apply brand styling

## Common Patterns

### Pattern 1: Create and Style
```python
# 1. Create a document
doc_response = requests.post('http://localhost:8000/api/docx/create', json={
    "title": "Quarterly Report",
    "sections": [...]
})

# Save temporarily
with open('temp.docx', 'wb') as f:
    f.write(doc_response.content)

# 2. Apply theme
with open('temp.docx', 'rb') as f:
    themed_response = requests.post('http://localhost:8000/api/themes/apply-docx',
        files={'file': f},
        data={'theme_id': 'ocean'}
    )

# 3. Download final
with open('final_report.docx', 'wb') as f:
    f.write(themed_response.content)
```

### Pattern 2: Conversational Creation
```python
user_request = "Make a pitch deck for a SaaS startup with 10 slides"

# Parse
parsed = requests.post('http://localhost:8000/api/ai/parse', json={
    "message": user_request
}).json()

# Execute suggested action
# (The AI router returns the exact API call to make)
```

### Pattern 3: Batch Processing
```python
# Apply same theme to multiple documents
theme_id = "mckinsey"
documents = ["report1.docx", "report2.docx", "report3.docx"]

for doc_path in documents:
    with open(doc_path, 'rb') as f:
        response = requests.post('http://localhost:8000/api/themes/apply-docx',
            files={'file': f},
            data={'theme_id': theme_id}
        )
        output_name = f"themed_{os.path.basename(doc_path)}"
        with open(output_name, 'wb') as out:
            out.write(response.content)
```

## Available Templates

### DOCX Templates
- `blank` - Empty document
- `report` - Professional report with sections
- `memo` - Business memorandum
- `letter` - Business letter

### XLSX Templates
- `blank` - Empty spreadsheet with custom headers
- `budget` - Quarterly budget tracker with formulas
- `financial-model` - Multi-year financial projection
- `data-table` - Formatted table from JSON data

### PPTX Templates
- `blank` - Empty presentation
- `business` - Business presentation layout
- `pitch` - Investor pitch deck structure
- `report` - Report presentation
- `educational` - Teaching/training template

## Available Themes
- `ocean` - Cool blues and teals
- `sunset` - Warm oranges and reds
- `forest` - Natural greens
- `lavender` - Soft purples
- `coral` - Warm coral and pink
- `slate` - Professional grays
- `midnight` - Dark blues
- `autumn` - Fall colors
- `mint` - Fresh mint greens
- `berry` - Rich berry tones

## Available Brands (Document Polisher)
- `economist` - Editorial excellence
- `mckinsey` - Consulting-grade professional
- `deloitte` - Corporate sophistication
- `kpmg` - Professional services
- `stripe` - Modern tech aesthetic
- `apple` - Minimalist elegance
- `ibm` - Enterprise authority
- `notion` - Clean productivity
- `linear` - Sleek design tools
- `figma` - Design-forward

## File Format Compatibility

All generated files are standard Office Open XML format (.docx, .xlsx, .pptx) compatible with:
- ✅ LibreOffice (Writer, Calc, Impress)
- ✅ Google Workspace (Docs, Sheets, Slides)
- ✅ Microsoft Office
- ✅ Apache OpenOffice
- ✅ Other compatible office suites

## Tips for Best Results

1. **Be Specific**: "Create a Q4 budget for 2025" is better than "make a spreadsheet"
2. **Use Templates**: Templates provide structure - specify template type when you know it
3. **Chain Operations**: Create → Theme → Polish for maximum impact
4. **Check Formats**: Files work across office suites, but test complex formulas in target application
5. **Use Natural Language**: The AI router understands conversational requests

## Examples

**Example 1: Quick Report**
```
User: "Create a professional report titled 'Q4 2024 Analysis' with McKinsey styling"

Response:
1. Parse request → identifies: create document + apply brand
2. Creates report.docx
3. Applies McKinsey brand styling
4. Returns final document
```

**Example 2: Budget Spreadsheet**
```
User: "Build a 2025 budget with categories: Salaries, Marketing, Operations, Technology"

Response:
1. Creates budget template
2. Adds specified categories
3. Includes quarterly columns with SUM formulas
4. Returns budget_2025.xlsx
```

**Example 3: Pitch Deck**
```
User: "Make a pitch deck for a SaaS startup"

Response:
1. Uses 'pitch' template
2. Creates standard startup pitch structure
3. Returns presentation.pptx
```

## Troubleshooting

**Backend not responding:**
```bash
# Check if backend is running
curl http://localhost:8000/health

# Start backend if needed
cd frontend/python-backend
python main.py
```

**Frontend not loading:**
```bash
# Check if frontend is running
curl http://localhost:3010

# Start frontend if needed
cd frontend
npm run dev
```

**File format issues:**
- Ensure you're using the correct file extension (.docx, .xlsx, .pptx)
- Verify files open in LibreOffice or Google Workspace
- Check that all required parameters are provided

## Notes

- The platform runs locally on ports 3010 (frontend) and 8000 (backend)
- All file processing happens server-side
- Generated files are downloaded immediately
- No authentication required for local use
- Files are not stored on the server (stateless generation)
