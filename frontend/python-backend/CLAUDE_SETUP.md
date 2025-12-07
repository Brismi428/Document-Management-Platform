# Claude AI Integration Setup

This backend supports two modes of operation:

## Mode 1: Claude AI (Recommended)

Uses Anthropic's Claude API for intelligent natural language understanding.

**Setup:**
1. Get an API key from https://console.anthropic.com/
2. Copy .env.example to .env: `cp .env.example .env`
3. Edit .env and add your API key
4. Restart the backend: `python main.py`

## Mode 2: Regex Fallback

If no API key is provided, the system automatically falls back to regex-based pattern matching.

**Status:** Check which mode is active at http://localhost:8000/api/ai/health
