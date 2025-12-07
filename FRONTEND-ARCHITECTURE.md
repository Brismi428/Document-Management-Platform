# Frontend Architecture

## Overview

Full-stack web application built with Next.js 16 and FastAPI, providing a modern interface for document manipulation using Claude Code Skills.

## Current Implementation Status

✅ **Completed**:
- Next.js 16 frontend with App Router, React 19, TypeScript (port 3010)
- FastAPI backend with modular routers (port 8000)
- CORS-enabled frontend-backend communication
- Environment variable configuration (.env)
- Document Polisher integration (backend API + frontend UI)
- DOCX manipulation (backend API + frontend UI)
- PDF processing (backend API + frontend UI)
- XLSX spreadsheet tools (backend API + frontend UI)

🚧 **In Progress**:
- PPTX presentation tools (dependencies installed)

📋 **Planned**:
- Theme Factory UI
- Algorithmic Art generator
- Canvas Design studio
- Authentication system
- User dashboard with usage statistics

## Technology Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **UI**: React 19, TypeScript, Tailwind CSS 4
- **Port**: 3010

### Backend
- **Framework**: FastAPI (Python)
- **Libraries**: python-docx, pypdf, pdfplumber, reportlab, openpyxl, pandas, python-pptx
- **Port**: 8000

### Architecture
- Separate frontend/backend with REST APIs
- CORS configuration for local development
- Backend proxy pattern for API keys (secure)

---

## Directory Structure

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                       # Landing: Showcase all 16 skills
│   │   ├── features/
│   │   │   └── page.tsx                  # Feature comparison matrix
│   │   ├── pricing/
│   │   │   └── page.tsx                  # Free tier + Pro plans
│   │   ├── showcase/
│   │   │   └── page.tsx                  # Before/after examples
│   │   └── components/
│   │       ├── hero.tsx                  # "Transform Documents in Seconds"
│   │       ├── brand-showcase.tsx        # 10 brand style cards
│   │       ├── skills-grid.tsx           # All 16 skills overview
│   │       └── demo-upload.tsx           # Try it now widget
│   │
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── forgot-password/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx                     # Sidebar with skill categories
│   │   ├── dashboard/
│   │   │   └── page.tsx                  # Recent projects, usage stats
│   │   │
│   │   ├── polish/                        # 🌟 FLAGSHIP FEATURE
│   │   │   ├── page.tsx                  # Document Polisher interface
│   │   │   └── components/
│   │   │       ├── brand-selector.tsx    # Visual brand cards (10 brands)
│   │   │       ├── file-upload.tsx       # Drag & drop DOCX
│   │   │       ├── preview-pane.tsx      # Before/after comparison
│   │   │       └── history.tsx           # Recent polished docs
│   │   │
│   │   ├── themes/                        # Theme Factory
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── theme-gallery.tsx     # 10 theme cards
│   │   │       └── theme-preview.tsx     # Live preview
│   │   │
│   │   ├── documents/                     # DOCX skill
│   │   │   ├── create/
│   │   │   │   └── page.tsx              # Create new documents
│   │   │   ├── edit/
│   │   │   │   └── page.tsx              # Edit existing documents
│   │   │   └── components/
│   │   │       ├── document-editor.tsx
│   │   │       └── tracked-changes.tsx
│   │   │
│   │   ├── pdf/                           # PDF tools
│   │   │   ├── extract/
│   │   │   │   └── page.tsx              # Extract text/tables
│   │   │   ├── merge/
│   │   │   │   └── page.tsx              # Merge PDFs
│   │   │   └── split/
│   │   │       └── page.tsx              # Split PDFs
│   │   │
│   │   ├── spreadsheets/                  # XLSX skill
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   └── analyze/
│   │   │       └── page.tsx
│   │   │
│   │   ├── presentations/                 # PPTX skill
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   └── edit/
│   │   │       └── page.tsx
│   │   │
│   │   ├── art/                           # Algorithmic Art
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── art-generator.tsx     # p5.js interface
│   │   │       └── parameter-controls.tsx
│   │   │
│   │   ├── design/                        # Canvas Design
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       └── design-studio.tsx
│   │   │
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── billing/
│   │       └── page.tsx
│   │
│   └── api/
│       ├── polish/
│       │   └── route.ts                   # Calls apply_brand.py
│       ├── themes/
│       │   └── route.ts                   # Theme application
│       ├── pdf/
│       │   ├── extract/
│       │   │   └── route.ts
│       │   └── merge/
│       │       └── route.ts
│       ├── xlsx/
│       │   └── create/
│       │       └── route.ts
│       ├── pptx/
│       │   └── create/
│       │       └── route.ts
│       └── art/
│           └── generate/
│               └── route.ts
│
├── components/
│   ├── ui/                                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   ├── tabs.tsx
│   │   └── toast.tsx
│   │
│   ├── layout/
│   │   ├── site-header.tsx                 # Marketing header
│   │   ├── site-footer.tsx
│   │   ├── dashboard-sidebar.tsx           # Skill navigation
│   │   └── dashboard-topbar.tsx
│   │
│   ├── shared/
│   │   ├── file-upload.tsx                 # Reusable upload component
│   │   ├── loading-spinner.tsx
│   │   ├── brand-card.tsx                  # Brand style preview card
│   │   ├── theme-card.tsx                  # Theme preview card
│   │   └── skill-card.tsx                  # Skill overview card
│   │
│   └── forms/
│       ├── polish-form.tsx
│       └── settings-form.tsx
│
├── lib/
│   ├── utils.ts
│   ├── api-client.ts                       # Axios/Fetch wrapper
│   ├── python-executor.ts                  # Execute Python scripts
│   ├── file-handler.ts                     # Upload/download helpers
│   ├── brand-config.ts                     # Load brand-mapping.json
│   ├── theme-config.ts                     # Load theme configs
│   └── site-config.ts
│
├── config/
│   ├── navigation.ts                        # Dashboard navigation
│   ├── skills.ts                            # All 16 skills metadata
│   ├── brands.ts                            # 10 brand configurations
│   ├── themes.ts                            # 10 theme configurations
│   └── pricing.ts
│
├── types/
│   ├── skill.ts
│   ├── brand.ts
│   ├── theme.ts
│   ├── document.ts
│   └── user.ts
│
├── python-backend/                          # Keep existing Python skills
│   └── .claude/
│       └── skills/
│           ├── document-polisher/
│           ├── docx/
│           ├── pdf/
│           ├── xlsx/
│           ├── pptx/
│           ├── theme-factory/
│           └── ... (all 16 skills)
│
└── styles/
    ├── globals.css
    └── theme.css
```

---

## Integration Points

### 1. Python Backend Integration

**Option A: Direct Execution (Simpler)**
```typescript
// lib/python-executor.ts
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function polishDocument(
  inputPath: string,
  brand: string,
  outputPath: string
) {
  const result = await execAsync(
    `python python-backend/.claude/skills/document-polisher/scripts/apply_brand.py ${inputPath} ${brand} ${outputPath}`
  );
  return result;
}
```

**Option B: FastAPI Backend (More Scalable)**
```python
# python-backend/api/main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
import sys
sys.path.append('.claude/skills/document-polisher/scripts')
from apply_brand import apply_brand_to_docx

app = FastAPI()

@app.post("/api/polish")
async def polish_document(
    file: UploadFile = File(...),
    brand: str = "mckinsey"
):
    # Save uploaded file
    input_path = f"/tmp/{file.filename}"
    output_path = f"/tmp/polished_{file.filename}"

    # Apply branding
    apply_brand_to_docx(input_path, brand, output_path)

    # Return polished file
    return FileResponse(output_path)
```

Then call from Next.js:
```typescript
// app/api/polish/route.ts
export async function POST(req: Request) {
  const formData = await req.formData();

  // Proxy to FastAPI backend
  const response = await fetch('http://localhost:8000/api/polish', {
    method: 'POST',
    body: formData
  });

  return response;
}
```

### 2. Brand Configuration

```typescript
// config/brands.ts
import brandMapping from '../python-backend/.claude/skills/document-polisher/templates/brand-mapping.json';

export const brands = Object.entries(brandMapping.brands).map(([id, config]) => ({
  id,
  name: config.name,
  description: config.description,
  category: config.category,
  colors: config.colors,
  preview: `/brand-previews/${id}.png` // Generate preview images
}));

export const brandsByCategory = {
  editorial: brands.filter(b => b.category === 'editorial'),
  consulting: brands.filter(b => b.category === 'consulting'),
  tech: brands.filter(b => b.category === 'tech'),
  productivity: brands.filter(b => b.category === 'productivity'),
  design: brands.filter(b => b.category === 'design'),
};
```

### 3. Skills Configuration

```typescript
// config/skills.ts
export const skills = [
  {
    id: 'document-polisher',
    name: 'Document Polisher',
    description: 'Transform documents with 10 premium brand styles',
    icon: '🌟',
    category: 'documents',
    route: '/dashboard/polish',
    tier: 'free',
    featured: true
  },
  {
    id: 'theme-factory',
    name: 'Theme Factory',
    description: 'Apply 10 professional themes to any artifact',
    icon: '🎨',
    category: 'design',
    route: '/dashboard/themes',
    tier: 'free'
  },
  {
    id: 'docx',
    name: 'DOCX Editor',
    description: 'Create and edit Word documents',
    icon: '📄',
    category: 'documents',
    route: '/dashboard/documents',
    tier: 'pro'
  },
  // ... all 16 skills
];

export const skillsByCategory = {
  documents: skills.filter(s => s.category === 'documents'),
  design: skills.filter(s => s.category === 'design'),
  web: skills.filter(s => s.category === 'web'),
  developer: skills.filter(s => s.category === 'developer')
};
```

---

## Key Features to Build

### Marketing Site (/)

1. **Hero Section**
   - Headline: "Transform Documents in Seconds with AI-Powered Styling"
   - Subtext: "10 premium brand styles, 16 powerful skills, unlimited possibilities"
   - CTA: "Try Document Polisher Free" → Demo upload widget

2. **Brand Showcase**
   - Visual grid of 10 brand cards with color previews
   - Hover effects showing typography
   - Click to see examples

3. **Skills Overview**
   - 16 skill cards organized by category
   - Icons, names, one-line descriptions
   - Links to feature pages

4. **Interactive Demo**
   - Upload sample document
   - Select brand style
   - See instant preview
   - Download result (limited to 3 per day for non-users)

### Dashboard (/dashboard)

1. **Document Polisher Interface** (Flagship)
   - Drag & drop file upload
   - Brand selection with visual previews
   - Progress indicator
   - Download polished document
   - History of recent polishes

2. **Theme Gallery**
   - 10 theme cards with color swatches
   - Live preview on sample content
   - Apply to uploaded files

3. **Projects Dashboard**
   - Recent documents
   - Usage statistics
   - Quick actions for each skill

4. **Settings & Billing**
   - Account management
   - Subscription tier
   - API usage (for developers)

---

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **State**: React Context / Zustand
- **Forms**: React Hook Form + Zod
- **File Upload**: react-dropzone
- **API**: Fetch API / Axios

### Backend
- **API**: Next.js API Routes (proxy layer)
- **Python**: FastAPI (executes skills)
- **File Storage**: Local filesystem or S3
- **Database**: PostgreSQL (user data, projects)
- **Auth**: NextAuth.js or Supabase Auth

### Deployment
- **Frontend**: Vercel
- **Python Backend**: Railway / Render / AWS Lambda
- **Database**: Supabase / Vercel Postgres
- **File Storage**: S3 or Vercel Blob

---

## Pricing Tiers

### Free Tier
- Document Polisher: 10 documents/month
- Theme Factory: Unlimited
- Brand Guidelines: Unlimited
- 3 demo polishes without account

### Pro Tier ($9/month)
- Document Polisher: Unlimited
- All 16 skills unlocked
- API access
- Priority processing
- No watermarks

### Enterprise Tier (Custom)
- Custom brand creation
- API integration
- White-label option
- Dedicated support

---

## Phase 1 MVP (Week 1-2)

**Goal**: Get Document Polisher working in browser

1. ✅ Marketing landing page
2. ✅ Brand selection interface
3. ✅ File upload/download
4. ✅ Python backend integration
5. ✅ Basic auth (email/password)
6. ✅ Dashboard with polisher

**Features:**
- Upload DOCX
- Select from 10 brands
- Download polished document
- View history

## Phase 2 (Week 3-4)

**Goal**: Add more skills

1. Theme Factory interface
2. PDF extraction tool
3. XLSX creator
4. User dashboard improvements
5. Billing integration (Stripe)

## Phase 3 (Month 2+)

**Goal**: Full feature set

1. All 16 skills operational
2. API for developers
3. Mobile responsive
4. Advanced analytics
5. Custom brand creation

---

## Example Component: Brand Selector

```typescript
// components/shared/brand-card.tsx
import { Card } from '@/components/ui/card';
import { brands } from '@/config/brands';

interface BrandCardProps {
  brand: typeof brands[0];
  selected: boolean;
  onSelect: () => void;
}

export function BrandCard({ brand, selected, onSelect }: BrandCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        selected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      <div className="p-6">
        {/* Brand name */}
        <h3 className="text-lg font-semibold">{brand.name}</h3>

        {/* Category badge */}
        <span className="text-xs text-muted-foreground">{brand.category}</span>

        {/* Description */}
        <p className="text-sm mt-2">{brand.description}</p>

        {/* Color swatches */}
        <div className="flex gap-2 mt-4">
          <div
            className="w-8 h-8 rounded"
            style={{ backgroundColor: brand.colors.primary }}
          />
          <div
            className="w-8 h-8 rounded"
            style={{ backgroundColor: brand.colors.accent }}
          />
        </div>

        {/* Typography preview */}
        <div className="mt-4 p-3 bg-muted rounded">
          <p style={{ fontFamily: brand.typography.headingFont }}>
            Heading Sample
          </p>
          <p className="text-sm" style={{ fontFamily: brand.typography.bodyFont }}>
            Body text sample
          </p>
        </div>
      </div>
    </Card>
  );
}
```

---

## Summary

**Yes, absolutely!** Your existing codebase maps perfectly to this Next.js structure:

✅ **Keep Python skills** - No rewriting needed, just wrap in API
✅ **Use brand-mapping.json** - Direct import into TypeScript config
✅ **Reuse all scripts** - Execute via FastAPI or direct exec
✅ **Beautiful UI** - shadcn/ui for professional components
✅ **Scalable** - Add skills progressively

**Next Steps:**
1. Initialize Next.js 14 project
2. Set up shadcn/ui
3. Build Document Polisher interface first (MVP)
4. Integrate Python backend via FastAPI
5. Add auth and billing
6. Launch! 🚀
