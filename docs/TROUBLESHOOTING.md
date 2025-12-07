# Troubleshooting Guide

Common issues and solutions for the Claude Code Skills Collection.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Viewing Documents](#viewing-documents)
- [Document Polisher Issues](#document-polisher-issues)
- [Font Problems](#font-problems)
- [MCP Server Issues](#mcp-server-issues)
- [Permission Errors](#permission-errors)
- [Python Environment Issues](#python-environment-issues)

---

## Viewing Documents

### How to Open Styled DOCX Files

**Recommended Options** (in order of preference):

1. **LibreOffice Writer** (Free & Best Compatibility)
   - Download: https://www.libreoffice.org/
   - Cross-platform (Windows, Mac, Linux)
   - Excellent DOCX format support
   - Preserves all styling and formatting
   - Open files: Right-click → Open With → LibreOffice Writer

2. **Microsoft Word** (Paid)
   - Desktop application (Office 365 or standalone)
   - Perfect format compatibility
   - All features supported

3. **Google Docs** (Free, Web-based)
   - Upload to https://docs.google.com/
   - Good formatting preservation
   - Can edit and download back as DOCX

4. **Microsoft Word Online** (Free, Web-based)
   - Go to https://office.com
   - Upload and view DOCX files
   - Limited features but free

**Avoid These Viewers**:
- ❌ **WordPad** - Limited formatting support, styles won't display correctly
- ❌ **macOS Preview** - Basic viewer, doesn't show proper styling
- ❌ **Basic text editors** - Will show raw XML instead of formatted document

---

## Installation Issues

### "Skills not found" in Claude Code

**Symptom**: Claude Code doesn't recognize skills like `document-polisher`

**Solutions**:

1. **Check skill location**:
   ```bash
   # For project skills
   ls .claude/skills/

   # For global skills
   ls ~/.claude/skills/
   ```

2. **Verify SKILL.md exists**:
   ```bash
   ls .claude/skills/document-polisher/SKILL.md
   ```

3. **Restart Claude Code** after installing skills

4. **Check file permissions**:
   ```bash
   chmod -R 755 .claude/skills/
   ```

### Clone/Download Errors

**Symptom**: `git clone` fails or download is incomplete

**Solutions**:

1. **Check internet connection**

2. **Try HTTPS instead of SSH**:
   ```bash
   git clone https://github.com/USERNAME/repo.git
   ```

3. **Download as ZIP** from GitHub and extract manually

---

## Document Polisher Issues

### "Brand not found" Error

**Symptom**: `Brand 'xyz' not found. Available: ...`

**Solutions**:

1. **Check brand name** - use lowercase:
   ```bash
   # Correct
   python apply_brand.py doc.docx mckinsey output.docx

   # Incorrect
   python apply_brand.py doc.docx McKinsey output.docx
   ```

2. **List available brands**:
   ```bash
   python .claude/skills/document-polisher/scripts/apply_brand.py --list
   ```

3. **Check brand-mapping.json** for typos

### Document Output is Corrupted

**Symptom**: Output .docx file won't open or shows errors

**Solutions**:

1. **Check input file** is a valid .docx (not .doc)

2. **Try with a simple test document** to isolate the issue

3. **Check for special characters** in file paths:
   ```bash
   # Use quotes for paths with spaces
   python apply_brand.py "My Document.docx" mckinsey "output.docx"
   ```

4. **Verify python-docx version**:
   ```bash
   pip show python-docx
   # Should be 1.2.0 or higher
   ```

### Styling Not Applied

**Symptom**: Output document looks the same as input

**Solutions**:

1. **Check input uses Word styles**:
   - Headings should use "Heading 1", "Heading 2", etc.
   - Not just manually formatted bold text

2. **Verify brand config** has correct values in `brand-mapping.json`

3. **Check console output** for error messages

---

## Font Problems

### Fonts Display as Different Font

**Symptom**: Document shows Calibri when it should show Arial/Georgia

**Cause**: Font substitution by Word/LibreOffice when specified font isn't installed

**Solutions**:

1. **Use cross-platform fonts** (already configured in default brands):
   - Arial (available everywhere)
   - Calibri (Windows/Office)
   - Georgia (available everywhere)
   - Times New Roman (available everywhere)
   - Segoe UI (Windows)

2. **Check font availability**:
   - Open Font Book (macOS) or Fonts folder (Windows)
   - In LibreOffice: Tools → Options → Fonts
   - Search for the specified font

3. **Install missing fonts**:
   - Download from Google Fonts or official sources
   - Install system-wide

4. **Check Compatibility Mode**:
   - **Microsoft Word**: File → Info → Check for "Compatibility Mode", convert to latest format if needed
   - **LibreOffice**: No compatibility mode issues - native DOCX support

### Fonts Look Different on Mac vs Windows

**Explanation**: Font rendering differs between operating systems

**Solutions**:

1. **Stick to universal fonts**: Arial, Times New Roman, Georgia
2. **Test on target platform** before final delivery
3. **Export to PDF** for consistent appearance

---

## MCP Server Issues

### MCP Server Not Connecting

**Symptom**: Tools like `mcp__firecrawl__*` not available

**Solutions**:

1. **Check Node.js version**:
   ```bash
   node --version
   # Needs 18+
   ```

2. **Verify configuration**:
   ```bash
   cat ~/.claude/mcp_servers.json
   ```

3. **Check for JSON syntax errors**:
   ```bash
   python -m json.tool ~/.claude/mcp_servers.json
   ```

4. **Restart Claude Code** after config changes

5. **Check API key** is set correctly:
   ```bash
   # In config, should look like:
   "FIRECRAWL_API_KEY": "fc-actual-key-here"
   ```

### FireCrawl Rate Limit Errors

**Symptom**: "Rate limit exceeded" or 429 errors

**Solutions**:

1. **Wait and retry** - free tier has limits
2. **Upgrade FireCrawl plan** for higher limits
3. **Cache results** - don't re-extract same URLs
4. **Add delays** between requests

### FireCrawl Timeout Errors

**Symptom**: Requests timeout on large sites

**Solutions**:

1. **Target specific pages** instead of homepage
2. **Use `only_main_content: true`** to reduce processing
3. **Try during off-peak hours**

---

## Permission Errors

### "Permission denied" When Running Scripts

**Symptom**: Can't execute Python scripts

**Solutions**:

1. **Check Claude Code permissions** in `settings.local.json`:
   ```json
   {
     "permissions": {
       "allow": [
         "Bash(python:*)",
         "Bash(python3:*)"
       ]
     }
   }
   ```

2. **Make scripts executable**:
   ```bash
   chmod +x .claude/skills/document-polisher/scripts/apply_brand.py
   ```

### "Skill not allowed" Error

**Symptom**: Claude Code won't run a skill

**Solutions**:

1. **Add to allowed permissions**:
   ```json
   {
     "permissions": {
       "allow": [
         "Skill(document-polisher)"
       ]
     }
   }
   ```

2. **Check for typos** in skill name

---

## Python Environment Issues

### "ModuleNotFoundError: No module named 'docx'"

**Symptom**: Python can't find python-docx

**Solutions**:

1. **Activate virtual environment first**:
   ```bash
   source venv/bin/activate
   pip install python-docx
   ```

2. **Install in correct environment**:
   ```bash
   # Check which Python
   which python

   # Should show venv path like:
   # /path/to/project/venv/bin/python
   ```

3. **Use full path to pip**:
   ```bash
   ./venv/bin/pip install python-docx
   ```

### "externally-managed-environment" Error

**Symptom**: pip refuses to install packages

**Cause**: System Python is protected on modern macOS/Linux

**Solutions**:

1. **Use virtual environment** (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install python-docx
   ```

2. **Use pipx** for standalone tools:
   ```bash
   brew install pipx
   pipx install python-docx
   ```

### Wrong Python Version

**Symptom**: Script fails with syntax errors or missing features

**Solutions**:

1. **Check version**:
   ```bash
   python3 --version
   # Needs 3.8+
   ```

2. **Use explicit version**:
   ```bash
   python3.11 -m venv venv
   ```

3. **Install newer Python**:
   ```bash
   # macOS
   brew install python@3.11

   # Ubuntu
   sudo apt install python3.11
   ```

---

## Still Having Issues?

### Gather Debug Information

```bash
# System info
uname -a
python3 --version
node --version

# Package versions
pip list | grep docx

# Claude Code version
claude --version

# Skill files
ls -la .claude/skills/document-polisher/
```

### Get Help

1. **GitHub Issues**: Open an issue with debug info
2. **Claude Code Help**: Run `/help` in Claude Code
3. **Discussions**: Ask in GitHub Discussions

### Common Debug Steps

1. **Try with minimal example** - simplest possible document
2. **Check logs** - look for error messages in terminal
3. **Verify file paths** - use absolute paths to rule out path issues
4. **Test components separately** - Python script, then skill, then MCP

---

## Quick Fixes Reference

| Issue | Quick Fix |
|-------|-----------|
| Skills not found | `ls ~/.claude/skills/` to verify location |
| python-docx not found | `pip install python-docx` in venv |
| Permission denied | Add to `settings.local.json` allow list |
| MCP not working | Restart Claude Code after config |
| Wrong font | Use Arial, Calibri, or Georgia |
| Rate limit | Wait and retry, or upgrade plan |
