# Quick Reference Card

**One-page cheat sheet for Claude Code Skills Collection**

---

## 🎯 Most Common Tasks

| What You Want | Just Say This |
|---------------|---------------|
| **Professional document** | "Polish my report.docx with McKinsey style" |
| **Create Word doc** | "Create a document with 3 sections and bullet lists" |
| **Extract PDF data** | "Extract all tables from report.pdf to Excel" |
| **Build spreadsheet** | "Create a budget with SUM formulas" |
| **Create slides** | "Build a 10-slide pitch deck about [topic]" |
| **Apply theme** | "Use Ocean Depths theme on my page" |
| **Generate art** | "Create algorithmic art with particle flows" |
| **Build web page** | "Create a landing page with bold design" |

---

## 🌟 Document Polisher Brands

**Just pick one - Claude handles the rest!**

| Brand | Use For | Colors |
|-------|---------|--------|
| **The Economist** | Reports, analysis | Red + Navy |
| **McKinsey** | Strategy decks | Sharp Blue |
| **Deloitte** | Audits, formal reports | Teal-Blue |
| **KPMG** | Financial reports | Two-tone Blue |
| **Stripe** | API docs, dev guides | Dark Blue + Purple |
| **Apple** | Product guides | Minimalist Gray |
| **IBM** | Technical docs | Enterprise Blue |
| **Linear** | Product specs | Modern Purple |
| **Notion** | Wikis, docs | Clean Blue |
| **Figma** | Creative briefs | Multi-color |

---

## 📂 File Types & Skills

| File Type | Skill | What You Can Do |
|-----------|-------|-----------------|
| **.docx** | Document Polisher OR DOCX | Style with brands OR Create/edit documents |
| **.pdf** | PDF | Extract tables, merge files, fill forms |
| **.xlsx** | XLSX | Create with formulas (not hardcoded values!) |
| **.pptx** | PPTX | Create slides, batch replace text |
| **.html** | Frontend Design OR Web Artifacts | Custom designs OR React apps |
| **.gif** | Slack GIF Creator | Animated GIFs for Slack |

---

## 🎨 Theme Factory - 10 Themes

| Theme | Vibe | Colors |
|-------|------|--------|
| **Ocean Depths** | Professional, calming | Blues, teals, aqua |
| **Sunset Boulevard** | Warm, energetic | Oranges, pinks, purples |
| **Forest Canopy** | Natural, grounded | Greens, browns, earth |
| **Modern Minimalist** | Clean, contemporary | Grays, whites, blacks |
| **Golden Hour** | Rich, elegant | Golds, amber, browns |
| **Arctic Frost** | Cool, crisp | Ice blues, whites |
| **Desert Rose** | Soft, sophisticated | Dusty pinks, tans |
| **Tech Innovation** | Bold, futuristic | Electric blues, neon |
| **Botanical Garden** | Fresh, organic | Fresh greens, florals |
| **Midnight Galaxy** | Dramatic, luxurious | Deep purples, blues |

---

## ⚡ Quick Commands

### Document Polisher
```bash
python .claude/skills/document-polisher/scripts/apply_brand.py input.docx brand_name output.docx
```

### List Available Brands
```bash
python .claude/skills/document-polisher/scripts/apply_brand.py --list
```

### Open in LibreOffice
```bash
"C:\Program Files\LibreOffice\program\swriter.exe" document.docx
```

---

## ✅ Setup Checklist (First Time)

- [ ] Install Python 3.8+
- [ ] Install python-docx: `pip install python-docx`
- [ ] Install LibreOffice Writer (free viewer)
- [ ] Optional: Copy skills globally: `cp -r .claude/skills/* ~/.claude/skills/`

---

## 🔧 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| "python-docx not found" | `pip install python-docx` |
| Fonts look wrong | Open in LibreOffice/Word, not Preview/WordPad |
| Script can't find file | Use full path: `/path/to/document.docx` |
| Styling didn't apply | Check document uses Word styles (Heading 1, etc.) |

---

## 💡 Pro Tips

1. **Start with Document Polisher** - easiest and most impressive
2. **Always use formulas in Excel** - never hardcode calculated values
3. **Read the .md files first** - for complex skills (DOCX, PDF, PPTX)
4. **Use LibreOffice** - best free viewer for styled documents
5. **Ask in plain English** - Claude handles technical details

---

## 📚 Full Documentation

- **Beginner Guide**: [BEGINNER-GUIDE.md](BEGINNER-GUIDE.md)
- **Setup**: [docs/SETUP.md](docs/SETUP.md)
- **Troubleshooting**: [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
- **Technical**: [CLAUDE.md](CLAUDE.md)
- **README**: [README.md](README.md)

---

## 🚀 Try These First

```
1. "Create a test document and polish it with Apple style"
2. "Show me all 10 themes from Theme Factory"
3. "Create a budget spreadsheet with SUM formulas"
4. "Extract tables from this PDF to Excel"
5. "Create algorithmic art with particles"
```

**Print this page and keep it handy! 📄**
