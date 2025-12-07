"""
AI Service - Natural Language Processing for Document Operations
Handles intent classification, parameter extraction, and tool orchestration
"""

from typing import Dict, List, Optional, Any
from enum import Enum
import re


class Intent(Enum):
    """Document operation intents"""
    CREATE_DOCUMENT = "create_document"
    CREATE_SPREADSHEET = "create_spreadsheet"
    CREATE_PRESENTATION = "create_presentation"
    PROCESS_PDF = "process_pdf"
    APPLY_THEME = "apply_theme"
    POLISH_DOCUMENT = "polish_document"
    CHAIN_OPERATIONS = "chain_operations"
    GET_HELP = "get_help"
    UNKNOWN = "unknown"


class AIService:
    """
    AI-powered natural language processing for document operations

    This service analyzes user requests and:
    1. Classifies intent (what document operation they want)
    2. Extracts parameters (title, template type, content, etc.)
    3. Routes to appropriate backend service
    4. Handles multi-step operations (chaining)
    """

    def __init__(self):
        # Intent patterns for classification
        self.intent_patterns = {
            Intent.CREATE_DOCUMENT: [
                r"create\s+(a\s+)?(professional\s+)?(document|docx|doc|report|memo|letter)",
                r"generate\s+(a\s+)?(document|docx|doc|report|memo|letter)",
                r"make\s+(a\s+)?(document|docx|doc|report|memo|letter)",
                r"write\s+(a\s+)?(document|docx|doc|report|memo|letter)",
                r"new\s+(document|docx|doc|report|memo|letter)",
                r"(professional|business)\s+report",
            ],
            Intent.CREATE_SPREADSHEET: [
                r"create\s+(a\s+)?(spreadsheet|xlsx|excel|budget|financial\s+model|quarterly\s+budget|annual\s+budget)",
                r"generate\s+(a\s+)?(spreadsheet|xlsx|budget)",
                r"make\s+(a\s+)?(spreadsheet|xlsx|budget)",
                r"build\s+(a\s+)?(spreadsheet|xlsx|budget)",
                r"new\s+(spreadsheet|xlsx|budget)",
                r"budget\s+for",
            ],
            Intent.CREATE_PRESENTATION: [
                r"create\s+(a\s+)?(presentation|pptx|powerpoint|slides|deck|pitch)",
                r"generate\s+(a\s+)?(presentation|pptx|slides|pitch\s+deck)",
                r"make\s+(a\s+)?(presentation|pptx|slides|pitch\s+deck|deck)",
                r"build\s+(a\s+)?(presentation|slides|pitch)",
                r"new\s+(presentation|pptx|slides)",
                r"pitch\s+deck",
            ],
            Intent.PROCESS_PDF: [
                r"(merge|split|extract|rotate|process)\s+pdf",
                r"pdf\s+(merge|split|extract|rotate|process)",
                r"combine\s+pdfs",
            ],
            Intent.APPLY_THEME: [
                r"apply\s+(a\s+)?(theme|style|color)",
                r"theme\s+(this|the|my)",
                r"style\s+(this|the|my)",
                r"add\s+(theme|styling)",
            ],
            Intent.POLISH_DOCUMENT: [
                r"polish\s+(this|the|my|document)",
                r"apply\s+(brand|styling)",
                r"(mckinsey|deloitte|stripe|apple|economist|kpmg|ibm|notion|linear|figma)\s+styl",
                r"professional\s+styling",
                r"style\s+with",
            ],
            Intent.CHAIN_OPERATIONS: [
                r"create.*then.*apply",
                r"create.*and.*theme",
                r"make.*then.*polish",
                r"generate.*and.*export",
            ],
            Intent.GET_HELP: [
                r"^(help|what|how|explain)",
                r"what\s+(can|should|do)",
                r"how\s+(do|to)",
                r"show\s+me",
            ],
        }

        # Template type patterns
        self.template_patterns = {
            "blank": [r"blank", r"empty", r"from\s+scratch"],
            "report": [r"report", r"quarterly", r"annual"],
            "memo": [r"memo", r"memorandum"],
            "letter": [r"letter", r"correspondence"],
            "budget": [r"budget"],
            "financial-model": [r"financial\s+model", r"projection"],
            "business": [r"business\s+presentation"],
            "pitch": [r"pitch\s+deck", r"investor\s+pitch"],
        }

        # Brand/theme patterns
        self.brand_patterns = {
            "economist": [r"economist"],
            "mckinsey": [r"mckinsey", r"consulting"],
            "deloitte": [r"deloitte"],
            "kpmg": [r"kpmg"],
            "stripe": [r"stripe"],
            "apple": [r"apple"],
            "ibm": [r"ibm"],
            "notion": [r"notion"],
            "linear": [r"linear"],
            "figma": [r"figma"],
        }

    def classify_intent(self, text: str) -> Intent:
        """
        Classify user intent from natural language text

        Args:
            text: User's natural language request

        Returns:
            Intent enum value
        """
        text_lower = text.lower()

        for intent, patterns in self.intent_patterns.items():
            for pattern in patterns:
                if re.search(pattern, text_lower):
                    return intent

        return Intent.UNKNOWN

    def extract_template_type(self, text: str) -> Optional[str]:
        """Extract template type from text"""
        text_lower = text.lower()

        for template_type, patterns in self.template_patterns.items():
            for pattern in patterns:
                if re.search(pattern, text_lower):
                    return template_type

        return None

    def extract_brand(self, text: str) -> Optional[str]:
        """Extract brand/theme from text"""
        text_lower = text.lower()

        for brand, patterns in self.brand_patterns.items():
            for pattern in patterns:
                if re.search(pattern, text_lower):
                    return brand

        return None

    def extract_title(self, text: str) -> Optional[str]:
        """
        Extract document title from text

        Looks for patterns like:
        - "titled 'X'"
        - "called 'X'"
        - "named 'X'"
        - "for X" (context-dependent)
        """
        # Look for quoted strings
        quoted = re.search(r"['\"]([^'\"]+)['\"]", text)
        if quoted:
            return quoted.group(1)

        # Look for "titled/called/named X"
        titled = re.search(r"(?:titled|called|named)\s+(.+?)(?:\s+(?:with|using|in|for|$))", text)
        if titled:
            return titled.group(1).strip()

        # Look for "for X" pattern
        for_pattern = re.search(r"for\s+(?:the\s+)?(.+?)(?:\s+(?:with|using|in|$))", text)
        if for_pattern:
            return for_pattern.group(1).strip()

        return None

    def extract_year(self, text: str) -> Optional[str]:
        """Extract year from text"""
        year_match = re.search(r"\b(20\d{2})\b", text)
        if year_match:
            return year_match.group(1)
        return None

    def extract_categories(self, text: str) -> Optional[List[str]]:
        """
        Extract list of categories from text

        Looks for comma-separated lists or "and" separated items
        """
        # Look for patterns like "categories: X, Y, Z" or "with X, Y, and Z"
        categories_match = re.search(
            r"(?:categories?|items?|sections?|topics?)(?:\s+(?:like|for|including))?\s*:?\s*(.+?)(?:\s+(?:with|using|in|for|$))",
            text,
            re.IGNORECASE
        )

        if categories_match:
            cat_text = categories_match.group(1)
            # Split by commas or "and"
            categories = re.split(r"[,\s]+and\s+|,\s*", cat_text)
            return [cat.strip() for cat in categories if cat.strip()]

        return None

    def parse_request(self, text: str, context: str = "home") -> Dict[str, Any]:
        """
        Parse natural language request into structured parameters

        Args:
            text: User's natural language request
            context: Current page context (ignored in regex mode, used in Claude mode)

        Returns:
            Dictionary with:
            - intent: Intent enum
            - parameters: Extracted parameters
            - confidence: Confidence score
            - suggestion: Human-readable interpretation
        """
        intent = self.classify_intent(text)

        # Extract common parameters
        params = {
            "title": self.extract_title(text),
            "template_type": self.extract_template_type(text),
            "brand": self.extract_brand(text),
            "year": self.extract_year(text),
            "categories": self.extract_categories(text),
        }

        # Remove None values
        params = {k: v for k, v in params.items() if v is not None}

        # Generate suggestion
        suggestion = self._generate_suggestion(intent, params)

        return {
            "intent": intent.value,
            "parameters": params,
            "confidence": self._calculate_confidence(intent, params),
            "suggestion": suggestion,
        }

    def _calculate_confidence(self, intent: Intent, params: Dict[str, Any]) -> float:
        """Calculate confidence score for the parsed request"""
        if intent == Intent.UNKNOWN:
            return 0.0

        # Base confidence for recognized intent
        confidence = 0.5

        # Boost confidence for each extracted parameter
        param_boost = 0.1 * len(params)

        return min(1.0, confidence + param_boost)

    def _generate_suggestion(self, intent: Intent, params: Dict[str, Any]) -> str:
        """Generate human-readable suggestion based on intent and parameters"""
        if intent == Intent.CREATE_DOCUMENT:
            template = params.get("template_type", "blank")
            title = params.get("title", "Untitled Document")
            return f"Create a {template} document titled '{title}'"

        elif intent == Intent.CREATE_SPREADSHEET:
            template = params.get("template_type", "blank")
            year = params.get("year", "current")
            return f"Create a {template} spreadsheet for {year}"

        elif intent == Intent.CREATE_PRESENTATION:
            template = params.get("template_type", "blank")
            title = params.get("title", "Untitled Presentation")
            return f"Create a {template} presentation titled '{title}'"

        elif intent == Intent.APPLY_THEME:
            theme = params.get("brand", "a theme")
            return f"Apply {theme} styling to your document"

        elif intent == Intent.POLISH_DOCUMENT:
            brand = params.get("brand", "professional")
            return f"Apply {brand} brand styling"

        elif intent == Intent.GET_HELP:
            return """I can help you with:

📄 **DOCX Documents** - Create professional reports, memos, and letters
📊 **Spreadsheets (XLSX)** - Build budgets and financial models with formulas
📽️ **Presentations (PPTX)** - Generate pitch decks and business presentations
📑 **PDF Processing** - Merge, split, extract, and manipulate PDFs
🎨 **Theme Factory** - Apply 10+ professional themes to documents
✨ **Document Polisher** - Brand styling (McKinsey, Stripe, Apple, etc.)

Just tell me what you need in plain English! For example:
• "Create a quarterly report for Q4 2024"
• "Make a budget for 2025 with categories: Marketing, Sales, Operations"
• "Generate a pitch deck presentation"
• "Apply McKinsey styling to my document\""""

        else:
            return "Process your request"

    def get_tool_suggestions(self, context: str) -> List[Dict[str, str]]:
        """
        Get contextual tool suggestions based on current context

        Args:
            context: Current tool or page context

        Returns:
            List of suggestions with action and description
        """
        suggestions_map = {
            "docx": [
                {"action": "Try a template", "description": "Use Report, Memo, or Letter templates for faster creation"},
                {"action": "Add branding", "description": "After creating, apply professional themes with Theme Factory"},
                {"action": "Convert to PDF", "description": "Export your document as PDF for sharing"},
            ],
            "xlsx": [
                {"action": "Use Budget template", "description": "Pre-built quarterly budget tracker with formulas"},
                {"action": "Financial Model", "description": "Multi-year projection template with automatic calculations"},
                {"action": "Import data", "description": "Paste JSON data to create formatted tables instantly"},
            ],
            "pptx": [
                {"action": "Pitch Deck template", "description": "Startup pitch structure with best practices"},
                {"action": "Business template", "description": "Professional presentation layout"},
                {"action": "Apply themes", "description": "Use Theme Factory to brand your slides"},
            ],
            "pdf": [
                {"action": "Merge PDFs", "description": "Combine multiple PDF files into one"},
                {"action": "Extract pages", "description": "Pull specific pages from a PDF"},
                {"action": "Rotate pages", "description": "Fix page orientation"},
            ],
            "themes": [
                {"action": "Preview themes", "description": "See all 10 professional theme options"},
                {"action": "Batch processing", "description": "Apply same theme to multiple documents"},
            ],
            "polish": [
                {"action": "McKinsey style", "description": "Consulting-grade professional documents"},
                {"action": "Stripe style", "description": "Modern tech company aesthetic"},
                {"action": "Economist style", "description": "Editorial excellence for reports"},
            ],
        }

        return suggestions_map.get(context, [])

    def get_quick_actions(self) -> List[Dict[str, Any]]:
        """Get quick action shortcuts for common operations"""
        return [
            {
                "id": "quick-report",
                "icon": "📄",
                "label": "Quick Report",
                "description": "Create a professional report in seconds",
                "prompt": "Create a professional report titled 'Q4 2024 Analysis'",
            },
            {
                "id": "quick-budget",
                "icon": "💰",
                "label": "Budget Template",
                "description": "2025 budget tracker with formulas",
                "prompt": "Create a budget for 2025 with categories: Salaries, Marketing, Operations",
            },
            {
                "id": "quick-pitch",
                "icon": "🚀",
                "label": "Pitch Deck",
                "description": "Investor presentation template",
                "prompt": "Create a pitch deck presentation for a SaaS startup",
            },
            {
                "id": "quick-memo",
                "icon": "📝",
                "label": "Quick Memo",
                "description": "Business memo format",
                "prompt": "Create a memo about the new remote work policy",
            },
        ]


# Singleton instance
ai_service = AIService()
