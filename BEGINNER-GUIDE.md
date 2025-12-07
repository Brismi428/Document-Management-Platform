# 🚀 Beginner's Guide to Claude Code Skills Collection

**Welcome!** This guide explains everything this project can do and how to use it - perfect for beginners!

> 💡 **What is this?** A collection of specialized "skills" that extend Claude Code's abilities to create, edit, and style professional documents, presentations, spreadsheets, PDFs, and more!

---

## Table of Contents

- [Quick Start: What Can This Do?](#quick-start-what-can-this-do)
- [🌟 Flagship Feature: Document Polisher](#-flagship-feature-document-polisher)
- [📄 Document Skills](#-document-skills)
- [🎨 Design & Styling Skills](#-design--styling-skills)
- [🌐 Web & Frontend Skills](#-web--frontend-skills)
- [🛠️ Developer Skills](#-developer-skills)
- [Skill Selection Guide](#skill-selection-guide)
- [Getting Started Checklist](#getting-started-checklist)

---

## Quick Start: What Can This Do?

This collection gives you **16 specialized skills** that fall into four categories:

| Category | What You Can Do | Example |
|----------|-----------------|---------|
| **📄 Documents** | Create, edit, and professionally style documents | "Polish my report with McKinsey branding" |
| **🎨 Design** | Apply themes, create art, design visuals | "Create algorithmic art with particle systems" |
| **🌐 Web** | Build interfaces, test apps, create React components | "Build a landing page with distinctive design" |
| **🛠️ Developer** | Build MCP servers, create new skills, internal comms | "Write an MCP server for my API" |

---

## 🌟 Flagship Feature: Document Polisher

**The easiest and most popular feature - start here!**

### What Does It Do?

Takes any boring Word document and makes it look like it came from a top consulting firm, tech company, or editorial publication. Just pick a brand style and watch your document transform!

### Available Brand Styles (10 Options)

#### 📰 Editorial
- **The Economist** - Red accents, serif typography, perfect for reports and thought leadership

#### 💼 Consulting
- **McKinsey** - Sharp blue accents, bold headings, ideal for strategy decks
- **Deloitte** - Teal-blue, rounded elements, great for audits and assessments
- **KPMG** - Two-tone blue, perfect for financial reports

#### 💻 Tech
- **Stripe** - Dark blue + purple, perfect for API docs and developer guides
- **Apple** - Minimalist, generous whitespace, ideal for product guides
- **IBM** - Enterprise blue, best for technical documentation
- **Linear** - Modern purple, great for product specs and changelogs

#### ✅ Productivity
- **Notion** - Clean blue, subtle accents, perfect for wikis and documentation

#### 🎨 Design
- **Figma** - Vibrant multi-color, ideal for creative briefs and brand guidelines

### How to Use (5 Easy Steps)

1. **Create or have a document ready** (any .docx file)
   ```
   Must have standard Word styles: Heading 1, Heading 2, Normal text, etc.
   ```

2. **Ask Claude Code to polish your document**
   ```
   "Polish my report.docx with McKinsey style"
   ```

3. **Claude shows you the brand menu** - Pick your favorite brand!

4. **Claude runs the magic script**
   ```bash
   python .claude/skills/document-polisher/scripts/apply_brand.py report.docx mckinsey polished_report.docx
   ```

5. **Open your polished document** in LibreOffice Writer, Word, or Google Docs

### Example Transformations

**Before:** Plain document with Times New Roman, black text, no styling
**After (McKinsey):** Georgia headings at 52pt, Calibri body text, sharp blue accents (#2251FF), professional spacing

**Before:** Generic guide with basic formatting
**After (Apple):** Minimalist Arial at 32pt, generous whitespace, clean gray text (#1D1D1F)

### When to Use Each Brand

| Your Document Type | Recommended Brand |
|-------------------|-------------------|
| Quarterly business report | McKinsey or Deloitte |
| Research paper or analysis | The Economist |
| API documentation | Stripe |
| User manual or product guide | Apple |
| Financial statement | KPMG |
| Internal wiki or knowledge base | Notion |
| Design system documentation | Figma |
| Technical whitepaper | IBM |
| Product roadmap or changelog | Linear |

---

## 📄 Document Skills

### 1. DOCX - Complete Word Document Control

**What It Does:** Create brand new Word documents or edit existing ones with full control over formatting, tracked changes, and comments.

**When to Use:**
- ✅ Creating complex documents from scratch
- ✅ Making surgical edits to existing documents
- ✅ Working with tracked changes (redlining)
- ✅ Extracting text to Markdown

**How to Use:**

**Creating a New Document:**
```
"Create a Word document with a title, three sections with headings, and bullet lists"
```
Claude will use docx-js library to build it from scratch.

**Editing an Existing Document:**
```
"Change the word 'monthly' to 'quarterly' in sections 2 and 3, then add a new paragraph after section 1"
```
Claude will use the OOXML library to make precise changes.

**Key Features:**
- Preserves all formatting when editing
- Supports tracked changes (redlining workflow)
- Can extract text with `pandoc`
- Full access to document XML for complex edits

---

### 2. PDF - Extract, Create, Merge, Split

**What It Does:** Everything you need for working with PDFs - extract text and tables, create new PDFs, merge multiple files, split pages, fill forms.

**When to Use:**
- ✅ Extracting data from PDF reports
- ✅ Combining multiple PDFs into one
- ✅ Creating PDF reports from data
- ✅ Filling out PDF forms programmatically
- ✅ OCR scanning scanned documents

**How to Use:**

**Extract Tables to Excel:**
```
"Extract all tables from report.pdf into an Excel spreadsheet"
```
Claude uses pdfplumber to find tables and converts them to .xlsx

**Merge Multiple PDFs:**
```
"Combine intro.pdf, main.pdf, and conclusion.pdf into one file"
```
Claude uses pypdf to merge them in order

**Fill a Form:**
```
"Fill out the application.pdf form with this data: Name=John, Date=2024-12-06"
```
Claude uses pypdf to programmatically fill fields

**Key Libraries:**
- `pdfplumber` - Extract text and tables
- `pypdf` - Merge, split, manipulate
- `reportlab` - Create PDFs from scratch
- `pytesseract` - OCR scanned documents

---

### 3. XLSX - Spreadsheets with Formulas

**What It Does:** Create, edit, and analyze Excel spreadsheets with formulas (not hardcoded values!), formatting, and data analysis capabilities.

**When to Use:**
- ✅ Building financial models
- ✅ Creating dashboards with calculations
- ✅ Analyzing data with pandas
- ✅ Generating reports with formulas

**How to Use:**

**Create a Budget Spreadsheet:**
```
"Create a monthly budget spreadsheet with categories, amounts, and a SUM formula for total"
```
Claude creates formulas like `=SUM(B2:B10)` instead of hardcoding totals

**Analyze Sales Data:**
```
"Load sales.xlsx and calculate average sales by region"
```
Claude uses pandas for data analysis

**Critical Rules:**
- ✅ **Always use formulas**: `sheet['B10'] = '=SUM(B2:B9)'`
- ❌ **Never hardcode calculated values**: `sheet['B10'] = 300`
- ✅ **Recalculate after creation**: Catches formula errors
- ✅ **Zero formula errors required**: No #REF!, #DIV/0!, #VALUE!

**Color Conventions for Financial Models:**
- 🔵 **Blue text** = Hardcoded inputs (user-changeable)
- ⚫ **Black text** = Formulas and calculations
- 🟢 **Green text** = Links from other worksheets
- 🔴 **Red text** = External links
- 🟡 **Yellow background** = Key assumptions

---

### 4. PPTX - Presentations Made Easy

**What It Does:** Create, edit, and analyze PowerPoint presentations with layouts, design elements, and text replacement capabilities.

**When to Use:**
- ✅ Creating slide decks from scratch
- ✅ Updating existing presentations
- ✅ Batch-replacing text across slides
- ✅ Analyzing presentation design

**How to Use:**

**Create New Presentation (HTML Method):**
```
"Create a 5-slide pitch deck about our product"
```
Claude creates HTML files for each slide, then converts to PowerPoint using html2pptx

**Update Existing Presentation:**
```
"Replace 'Q3 2024' with 'Q4 2024' throughout the entire deck"
```
Claude extracts all text, generates replacements, applies them systematically

**Using a Template:**
```
"Use template.pptx and replace the content with this new data"
```
Claude analyzes the template, creates text inventory, generates replacements

**Key Features:**
- Convert HTML to slides (html2pptx)
- Batch text replacement across entire deck
- Create thumbnail grids for visual analysis
- Extract text to Markdown
- Work with templates and layouts

---

## 🎨 Design & Styling Skills

### 5. Theme Factory - 10 Professional Themes

**What It Does:** Applies one of 10 professionally-designed color and font themes to any artifact (slides, documents, web pages).

**Available Themes:**

| Theme | Colors | Best For |
|-------|--------|----------|
| **Ocean Depths** | Blues, teals, deep aqua | Maritime, professional, calming |
| **Sunset Boulevard** | Oranges, pinks, purples | Warm, vibrant, energetic |
| **Forest Canopy** | Greens, browns, earth tones | Natural, grounded, organic |
| **Modern Minimalist** | Grays, whites, blacks | Clean, contemporary, sophisticated |
| **Golden Hour** | Golds, amber, warm browns | Rich, autumnal, elegant |
| **Arctic Frost** | Ice blues, whites, silvers | Cool, crisp, winter-inspired |
| **Desert Rose** | Dusty pinks, tans, terracotta | Soft, sophisticated, earthy |
| **Tech Innovation** | Electric blues, neon accents | Bold, modern, futuristic |
| **Botanical Garden** | Fresh greens, florals | Organic, fresh, natural |
| **Midnight Galaxy** | Deep purples, cosmic blues | Dramatic, luxurious, cosmic |

**How to Use:**
```
"Apply the Ocean Depths theme to my landing page"
```
Claude shows you the theme showcase, you pick one, and Claude applies the colors and fonts.

---

### 6. Brand Guidelines - Anthropic Branding

**What It Does:** Applies Anthropic's official brand colors, fonts, and visual identity to documents, slides, or web artifacts.

**Anthropic Brand Colors:**
- **Dark**: #141413 (primary text, dark backgrounds)
- **Light**: #faf9f5 (light backgrounds)
- **Accent Orange**: #d97757 (primary accent)
- **Accent Blue**: #6a9bcc (secondary accent)
- **Accent Green**: #788c5d (tertiary accent)

**Typography:**
- **Headings** (24pt+): Poppins
- **Body Text**: Lora
- **Fallbacks**: Arial (headings), Georgia (body)

**How to Use:**
```
"Style my presentation with Anthropic brand guidelines"
```
Claude applies the official colors and fonts with proper fallbacks.

---

### 7. Algorithmic Art - Generative p5.js Art

**What It Does:** Creates living, breathing algorithmic art using p5.js with interactive parameters and seeded randomness.

**What You Get:**
- Self-contained HTML file with embedded p5.js sketch
- Interactive controls to explore different "seeds"
- Parameter sliders to tune the algorithm
- Infinite variations of computational beauty

**How to Use:**

**Step 1:** Describe your vision
```
"Create algorithmic art using particles flowing through noise fields"
```

**Step 2:** Claude creates an artistic philosophy (computational aesthetic manifesto)

**Step 3:** Claude implements the p5.js code with:
- Seeded randomness for reproducibility
- Interactive parameter controls
- Prev/Next/Random/Jump seed navigation
- Real-time parameter adjustments

**Example Concepts:**
- Organic Turbulence - Particles swirling through layered noise
- Quantum Harmonics - Discrete particles with wave interference
- Recursive Whispers - Self-similar branching structures
- Field Dynamics - Invisible forces visualized through motion

**The Result:** An infinite gallery of computational art you can explore and tune!

---

### 8. Canvas Design - Static Visual Art

**What It Does:** Creates museum-quality static visual designs as PDF or PNG using design philosophy and expert craftsmanship.

**What You Get:**
- Professionally-designed static artwork
- Minimal text (visual-first approach)
- Expert-level composition and color theory
- PDF or PNG output suitable for printing

**How to Use:**

**Step 1:** Describe the purpose
```
"Create a poster for our design conference with bold geometric shapes"
```

**Step 2:** Claude creates a design philosophy (aesthetic movement manifesto)

**Step 3:** Claude creates the visual piece with:
- Sophisticated composition
- Expert color relationships
- Text used sparingly as visual accent
- Professional margins and spacing

**Design Styles:**
- Concrete Poetry - Monumental geometric forms
- Chromatic Language - Color as information system
- Analog Meditation - Texture and negative space
- Geometric Silence - Grid-based precision

**The Result:** A meticulously crafted visual piece that looks like it took hours to create!

---

## 🌐 Web & Frontend Skills

### 9. Frontend Design - Distinctive Web Interfaces

**What It Does:** Creates production-grade frontend interfaces with bold, memorable design that avoids generic "AI aesthetic."

**Design Approach:**
1. **Understand context** - Problem, audience, purpose
2. **Choose bold aesthetic** - Minimalist, maximalist, retro, organic, etc.
3. **Commit to direction** - Intentional design choices
4. **Execute with precision** - Every detail refined

**Key Principles:**
- ✅ Distinctive, characterful typography (avoid Arial, Inter)
- ✅ Cohesive color palettes with sharp accents
- ✅ CSS animations for impact
- ✅ Unexpected layouts and spatial composition
- ✅ Atmospheric backgrounds (gradients, textures, patterns)
- ❌ Avoid cliches (centered layouts, purple gradients, uniform rounded corners)

**How to Use:**
```
"Build a landing page for a design studio with bold, artistic aesthetics"
```
Claude creates HTML/CSS/JavaScript with distinctive visual identity.

---

### 10. Web Artifacts Builder - React + shadcn/ui

**What It Does:** Builds complex multi-component React applications with Tailwind CSS and shadcn/ui components, bundled into a single HTML file.

**Tech Stack:**
- React 18 + TypeScript
- Vite (development)
- Tailwind CSS 3.4.1
- shadcn/ui (40+ pre-installed components)
- Parcel (bundles to single HTML)

**When to Use:**
- ✅ Complex UIs with state management
- ✅ Multi-page applications with routing
- ✅ Using pre-built shadcn/ui components
- ✅ TypeScript-based React projects

**How to Use:**
```
"Build a task management app with shadcn/ui components"
```
Claude initializes the project, builds React components, and bundles to single HTML.

**The Result:** A self-contained HTML file you can share as a Claude artifact!

---

### 11. Web App Testing - Playwright Automation

**What It Does:** Test and interact with local web applications using Playwright for browser automation, screenshots, and DOM inspection.

**When to Use:**
- ✅ Testing frontend functionality
- ✅ Debugging UI behavior
- ✅ Capturing screenshots
- ✅ Automating user interactions

**How to Use:**

**Test a Web App:**
```
"Test that the login button works on localhost:3000"
```
Claude uses Playwright to navigate, find elements, click buttons, verify behavior.

**Capture Screenshots:**
```
"Take screenshots of all pages in my app at localhost:5173"
```
Claude navigates and captures visual snapshots.

**Key Pattern - Reconnaissance Then Action:**
1. Navigate and wait for page load
2. Take screenshot or inspect DOM
3. Identify CSS selectors from rendered state
4. Execute actions with discovered selectors

---

## 🛠️ Developer Skills

### 12. MCP Builder - Model Context Protocol Servers

**What It Does:** Guides you through building high-quality MCP servers that let Claude interact with external services and APIs.

**4-Phase Process:**
1. **Deep Research** - Understand MCP design patterns
2. **Implementation** - Build infrastructure and tools
3. **Review & Test** - Code quality and functionality
4. **Create Evaluations** - 10 realistic test questions

**When to Use:**
- Building integrations with external APIs
- Creating custom tools for Claude
- Extending Claude's capabilities with new services

**Example MCP Servers:**
- Database access (Supabase, PostgreSQL)
- File system operations
- API integrations (Stripe, GitHub, etc.)
- Custom business logic

---

### 13. Skill Creator - Build New Skills

**What It Does:** Guides you through creating effective Claude Code skills that extend capabilities with specialized knowledge and workflows.

**6-Step Creation Process:**
1. Understand the skill with examples
2. Plan reusable contents (scripts, references, assets)
3. Initialize skill structure
4. Implement resources and instructions
5. Package the skill
6. Iterate based on usage

**When to Use:**
- Creating domain-specific expertise for Claude
- Packaging reusable workflows
- Building tool integrations

---

### 14. Slack GIF Creator - Animated GIFs for Slack

**What It Does:** Creates animated GIFs optimized for Slack with proper sizing, frame rates, and file size constraints.

**Slack Requirements:**
- **Emoji GIFs**: 128×128, under 3 seconds
- **Message GIFs**: 480×480
- **FPS**: 10-30 (lower = smaller file)
- **Colors**: 48-128 (fewer = smaller file)

**Available Animations:**
- Shake/Vibrate
- Pulse/Heartbeat
- Bounce
- Spin/Rotate
- Fade In/Out
- Slide
- Zoom
- Particle Burst

**How to Use:**
```
"Create a bouncing emoji GIF for Slack"
```
Claude uses the GIF builder with proper Slack constraints.

---

### 15. Internal Comms - Company Communications

**What It Does:** Helps write internal communications using company-preferred formats like 3P updates, newsletters, FAQs, status reports.

**Supported Types:**
- 3P updates (Progress, Plans, Problems)
- Company newsletters
- FAQ responses
- Status reports
- Leadership updates
- Project updates
- Incident reports

**How to Use:**
```
"Write a 3P update for my project"
```
Claude loads the appropriate format guidelines and structures your communication.

---

## Skill Selection Guide

**Quick decision tree - what skill should you use?**

| I Want To... | Use This Skill | Example |
|-------------|----------------|---------|
| Make my document look professional | 🌟 **Document Polisher** | "Polish report.docx with McKinsey style" |
| Create a Word document from scratch | **DOCX** | "Create a contract with sections and tables" |
| Edit an existing Word document | **DOCX** | "Change Q3 to Q4 throughout document.docx" |
| Extract data from a PDF | **PDF** | "Extract all tables from report.pdf to Excel" |
| Combine multiple PDFs | **PDF** | "Merge intro.pdf and main.pdf" |
| Build a spreadsheet with calculations | **XLSX** | "Create budget with SUM formulas" |
| Create PowerPoint slides | **PPTX** | "Build a 10-slide pitch deck" |
| Update an existing presentation | **PPTX** | "Replace company name in slides.pptx" |
| Apply a pre-designed theme | **Theme Factory** | "Use Ocean Depths theme on my landing page" |
| Make it look like Anthropic | **Brand Guidelines** | "Apply Anthropic branding to my doc" |
| Create living algorithmic art | **Algorithmic Art** | "Generate particle flow field art" |
| Design a poster or visual | **Canvas Design** | "Create a geometric poster design" |
| Build a unique web interface | **Frontend Design** | "Build landing page with bold aesthetics" |
| Build a React app with components | **Web Artifacts Builder** | "Create task manager with shadcn/ui" |
| Test my local web app | **Web App Testing** | "Test login flow on localhost:3000" |
| Build an MCP server | **MCP Builder** | "Create MCP server for GitHub API" |
| Create a new Claude skill | **Skill Creator** | "Build skill for medical terminology" |
| Make a Slack emoji GIF | **Slack GIF Creator** | "Create bouncing emoji animation" |
| Write company communications | **Internal Comms** | "Write 3P update for Q4 project" |

---

## Getting Started Checklist

### ✅ First-Time Setup (Do Once)

1. **Install Python 3.8+**
   ```bash
   python --version  # Check if installed
   ```

2. **Clone this repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/claude-code-polished-documents-skills
   cd claude-code-polished-documents-skills
   ```

3. **Install python-docx** (required for Document Polisher)
   ```bash
   pip install python-docx
   ```

4. **Install LibreOffice Writer** (free document viewer)
   - Download: https://www.libreoffice.org/
   - Best free option for viewing styled documents

5. **Copy skills to Claude Code** (optional - makes skills available globally)
   ```bash
   # Global installation (available in all projects)
   mkdir -p ~/.claude/skills
   cp -r .claude/skills/* ~/.claude/skills/
   ```

### ✅ Every Time You Use Document Polisher

1. **Have your document ready** (must use Word styles like Heading 1, Heading 2, Normal)

2. **Ask Claude Code to polish it**
   ```
   "Polish my report.docx with McKinsey style"
   ```

3. **Open the result in LibreOffice Writer** to see the styling

### ✅ Optional: MCP Server for Brand Extraction

If you want to extract branding from websites (advanced feature):

1. **Get FireCrawl API key** from https://firecrawl.dev

2. **Install MCP server**
   ```bash
   claude mcp add firecrawl \
     --command "npx" \
     --args "-y" "@anthropic/firecrawl-mcp" \
     --env "FIRECRAWL_API_KEY=your_key_here"
   ```

3. **Use it to extract branding**
   ```
   "Extract branding from stripe.com and add as a new theme"
   ```

---

## Common Beginner Questions

### Q: Do I need Microsoft Word?

**A: No!** You can use free alternatives:
- 🏆 **LibreOffice Writer** (recommended) - https://www.libreoffice.org/
- **Google Docs** (upload and view online)
- **Microsoft Word Online** (free web version)

### Q: Which skill should I start with?

**A: Document Polisher!** It's the easiest and most impressive. Just pick a brand style and watch your document transform.

### Q: Do I need to know how to code?

**A: No!** Just tell Claude Code what you want in plain English:
- ❌ Don't say: "Run apply_brand.py with mckinsey parameter"
- ✅ Do say: "Polish my report with McKinsey style"

Claude handles all the technical details!

### Q: Where are my styled documents?

**A: In the same folder as your original document.** The script creates a new file (never overwrites your original).

Example:
- Input: `report.docx`
- Output: `polished_report.docx` (new file with styling)

### Q: Can I customize the brands?

**A: Yes!** You can:
1. **Use FireCrawl MCP** to extract branding from any website
2. **Manually edit** `brand-mapping.json` to add custom brands
3. **Create reference files** in the `brands/` folder

### Q: What if fonts look wrong?

**A: Make sure you're viewing in a proper app:**
- ✅ LibreOffice Writer
- ✅ Microsoft Word
- ✅ Google Docs
- ❌ Not WordPad or Preview (limited support)

### Q: Can I use this for commercial projects?

**A: Yes!** MIT License - use freely. But note:
- Brand names/logos are trademarks of their respective companies
- This creates "styled documents" not official branded materials
- Always respect trademark guidelines

---

## Need Help?

- **Documentation**: See [README.md](README.md) for detailed info
- **Setup Guide**: See [docs/SETUP.md](docs/SETUP.md)
- **Troubleshooting**: See [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
- **Technical Details**: See [CLAUDE.md](CLAUDE.md)

---

## What to Try First

1. **🌟 Start Here: Document Polisher**
   ```
   "Create a simple test document with headings and paragraphs, then polish it with Apple style"
   ```

2. **Theme Factory**
   ```
   "Show me all 10 themes from Theme Factory"
   ```

3. **Algorithmic Art**
   ```
   "Create algorithmic art with flowing particles"
   ```

4. **Build Something**
   ```
   "Create a budget spreadsheet with SUM formulas for monthly expenses"
   ```

**Welcome to the Claude Code Skills Collection - let's build something amazing! 🚀**
