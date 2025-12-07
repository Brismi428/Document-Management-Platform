"""
Claude AI Service - Real AI-powered natural language understanding
Uses Anthropic's Claude API with tool calling for document operations
"""

import os
from typing import Dict, List, Optional, Any
from anthropic import Anthropic
import json


class ClaudeService:
    """
    Claude-powered AI service for document platform

    Uses Claude's tool calling to understand user requests and route to
    appropriate document creation/manipulation endpoints
    """

    def __init__(self):
        # Initialize Anthropic client
        api_key = os.getenv('ANTHROPIC_API_KEY')
        if not api_key:
            raise ValueError(
                "ANTHROPIC_API_KEY environment variable not set. "
                "Get your API key from https://console.anthropic.com/"
            )

        self.client = Anthropic(api_key=api_key)
        self.model = "claude-sonnet-4-5-20250929"

        # Define tools for Claude to use
        self.tools = [
            {
                "name": "create_document",
                "description": "Create a DOCX document (report, memo, letter, or blank). Use when user wants to create a text document.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "template_type": {
                            "type": "string",
                            "enum": ["blank", "report", "memo", "letter"],
                            "description": "Type of document template to use"
                        },
                        "title": {
                            "type": "string",
                            "description": "Title of the document"
                        },
                        "content": {
                            "type": "string",
                            "description": "Optional content or description of what the document should contain"
                        }
                    },
                    "required": ["template_type"]
                }
            },
            {
                "name": "create_spreadsheet",
                "description": "Create an XLSX spreadsheet (budget, financial model, data table, or blank). Use for budgets, financial planning, or data organization.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "template_type": {
                            "type": "string",
                            "enum": ["blank", "budget", "financial-model", "data-table"],
                            "description": "Type of spreadsheet template"
                        },
                        "year": {
                            "type": "string",
                            "description": "Year for budget or financial model (e.g., '2025')"
                        },
                        "categories": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "Budget categories or data columns"
                        }
                    },
                    "required": ["template_type"]
                }
            },
            {
                "name": "create_presentation",
                "description": "Create a PPTX presentation (pitch deck, business, report, educational, or blank). Use for slideshows and presentations.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "template_type": {
                            "type": "string",
                            "enum": ["blank", "pitch", "business", "report", "educational"],
                            "description": "Type of presentation template"
                        },
                        "title": {
                            "type": "string",
                            "description": "Presentation title"
                        },
                        "subtitle": {
                            "type": "string",
                            "description": "Presentation subtitle"
                        }
                    },
                    "required": ["template_type"]
                }
            },
            {
                "name": "process_pdf",
                "description": "Merge, split, extract text from, or rotate PDF documents.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "operation": {
                            "type": "string",
                            "enum": ["merge", "split", "extract", "rotate"],
                            "description": "PDF operation to perform"
                        },
                        "details": {
                            "type": "string",
                            "description": "Additional details about the operation"
                        }
                    },
                    "required": ["operation"]
                }
            },
            {
                "name": "apply_theme",
                "description": "Apply color and font themes to documents or presentations. Use when user wants to style with colors/fonts.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "theme_id": {
                            "type": "string",
                            "enum": ["ocean", "sunset", "forest", "lavender", "coral", "slate", "midnight", "autumn", "mint", "berry"],
                            "description": "Theme to apply"
                        }
                    },
                    "required": ["theme_id"]
                }
            },
            {
                "name": "polish_document",
                "description": "Apply premium brand styling to documents (McKinsey, Deloitte, Stripe, Apple, IBM, etc). Use for professional corporate branding.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "brand": {
                            "type": "string",
                            "enum": ["mckinsey", "deloitte", "kpmg", "stripe", "apple", "ibm", "notion", "linear", "figma", "economist"],
                            "description": "Brand style to apply"
                        }
                    },
                    "required": ["brand"]
                }
            },
            {
                "name": "get_help",
                "description": "Provide help information about the platform's capabilities.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "topic": {
                            "type": "string",
                            "description": "Optional specific topic to get help about"
                        }
                    }
                }
            },
            {
                "name": "create_algorithmic_art",
                "description": "Generate P5.js algorithmic/generative art (flow-field, particle-system, fractal, noise-field, wave, grid).",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "style": {
                            "type": "string",
                            "enum": ["flow-field", "particle-system", "fractal", "noise-field", "wave", "grid"],
                            "description": "Art style to generate"
                        },
                        "parameters": {
                            "type": "object",
                            "description": "Style-specific parameters (particles, noise scale, etc.)"
                        }
                    },
                    "required": ["style"]
                }
            },
            {
                "name": "create_canvas_design",
                "description": "Create visual designs (poster, card, social-media, infographic, banner) with themes.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "template": {
                            "type": "string",
                            "enum": ["poster", "card", "social-media", "infographic", "banner"],
                            "description": "Design template type"
                        },
                        "theme": {
                            "type": "string",
                            "enum": ["modern", "minimal", "vibrant", "elegant", "tech"],
                            "description": "Visual theme"
                        },
                        "title": {
                            "type": "string",
                            "description": "Main title/heading"
                        }
                    },
                    "required": ["template"]
                }
            },
            {
                "name": "create_slack_gif",
                "description": "Create animated GIFs optimized for Slack (≤500px, ≤20fps).",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "animation_type": {
                            "type": "string",
                            "description": "Type of animation to create"
                        },
                        "duration": {
                            "type": "number",
                            "description": "Duration in seconds"
                        }
                    },
                    "required": ["animation_type"]
                }
            },
            {
                "name": "create_frontend_component",
                "description": "Generate React components (button, card, form, navbar, hero, footer) with Tailwind CSS.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "component_type": {
                            "type": "string",
                            "enum": ["button", "card", "form", "navbar", "hero", "footer"],
                            "description": "Component type"
                        },
                        "styling": {
                            "type": "string",
                            "enum": ["tailwind", "css-modules", "styled-components"],
                            "description": "Styling approach"
                        },
                        "props": {
                            "type": "object",
                            "description": "Component properties"
                        }
                    },
                    "required": ["component_type"]
                }
            },
            {
                "name": "create_web_artifact",
                "description": "Build complex multi-component web apps (dashboard, landing-page, docs-site, tool, game).",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "app_type": {
                            "type": "string",
                            "enum": ["dashboard", "landing-page", "docs-site", "tool", "game"],
                            "description": "Application type"
                        },
                        "components": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "Required components"
                        },
                        "features": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "Application features"
                        }
                    },
                    "required": ["app_type"]
                }
            },
            {
                "name": "test_webapp",
                "description": "Run Playwright tests (screenshot, click-test, form-fill, navigation, performance).",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "test_type": {
                            "type": "string",
                            "enum": ["screenshot", "click-test", "form-fill", "navigation", "performance"],
                            "description": "Type of test to run"
                        },
                        "url": {
                            "type": "string",
                            "description": "URL to test"
                        }
                    },
                    "required": ["test_type", "url"]
                }
            },
            {
                "name": "create_internal_comm",
                "description": "Generate business communications (status-report, leadership-update, newsletter, faq, incident-report).",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "comm_type": {
                            "type": "string",
                            "enum": ["status-report", "leadership-update", "newsletter", "faq", "incident-report"],
                            "description": "Communication type"
                        },
                        "topic": {
                            "type": "string",
                            "description": "Communication topic/subject"
                        }
                    },
                    "required": ["comm_type"]
                }
            },
            {
                "name": "get_brand_guidelines",
                "description": "Get Anthropic's official brand guidelines (colors, typography, styles).",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "component": {
                            "type": "string",
                            "enum": ["colors", "typography", "logos", "all"],
                            "description": "Brand component to retrieve"
                        }
                    }
                }
            },
            {
                "name": "create_mcp_server",
                "description": "Generate MCP server boilerplate for Python (FastMCP) or Node.js (MCP SDK).",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "language": {
                            "type": "string",
                            "enum": ["python", "nodejs"],
                            "description": "Server language"
                        },
                        "server_name": {
                            "type": "string",
                            "description": "MCP server name"
                        },
                        "tools": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "Tools to include"
                        }
                    },
                    "required": ["language", "server_name"]
                }
            },
            {
                "name": "create_skill",
                "description": "Generate Claude Code skill structure (SKILL.md, scripts, templates, docs).",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "skill_name": {
                            "type": "string",
                            "description": "Name of the skill"
                        },
                        "description": {
                            "type": "string",
                            "description": "Skill description"
                        },
                        "tools": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "Tools the skill needs"
                        }
                    },
                    "required": ["skill_name", "description"]
                }
            },
            {
                "name": "execute_workflow",
                "description": "Execute multi-skill workflows (report-to-presentation, data-to-infographic, branded-materials).",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "workflow_name": {
                            "type": "string",
                            "description": "Workflow to execute"
                        },
                        "steps": {
                            "type": "array",
                            "items": {"type": "object"},
                            "description": "Workflow steps"
                        }
                    },
                    "required": ["workflow_name"]
                }
            }
        ]

    def parse_request(self, message: str, context: str = "home") -> Dict[str, Any]:
        """
        Parse user request using Claude AI with tool calling

        Args:
            message: User's natural language request
            context: Current page/tool context

        Returns:
            Dict with intent, parameters, confidence, suggestion, and action
        """

        system_prompt = f"""You are an AI assistant for the Ultimate Productivity Platform.
This is an all-in-one creative & productivity suite with 17 integrated skills across 5 categories:

📄 DOCUMENTS & OFFICE (6 skills):
- DOCX documents (reports, memos, letters)
- XLSX spreadsheets (budgets, financial models, data tables)
- PPTX presentations (pitch decks, business presentations)
- PDF processing (merge, split, extract, rotate)
- Document Polisher (premium brand styling: McKinsey, Deloitte, Stripe, Apple, IBM, etc.)
- Theme Factory (decorative color/font themes)

🎨 CREATIVE & DESIGN (3 skills):
- Algorithmic Art (P5.js generative art: flow fields, particle systems, fractals)
- Canvas Design (posters, cards, social media graphics, infographics)
- Slack GIF Creator (animated GIFs optimized for Slack)

💻 WEB & DEVELOPMENT (3 skills):
- Frontend Design (React components: buttons, cards, forms, navbars)
- Web Artifacts Builder (multi-component web apps: dashboards, landing pages, tools, games)
- Webapp Testing (Playwright testing: screenshots, click tests, form fills, performance)

💼 BUSINESS & COMMUNICATION (2 skills):
- Internal Communications (status reports, leadership updates, newsletters, FAQs, incident reports)
- Brand Guidelines (Anthropic official brand colors, typography, styles)

🔧 PLATFORM & META (3 skills):
- MCP Builder (create MCP servers for Python/Node.js)
- Skill Creator (create new Claude Code skills)
- Document Platform (orchestrate multi-skill workflows)

Current context: {context}

When users request creative work, web development, business communications, or platform features,
route them to the appropriate specialized skill. Extract all relevant parameters.

Be intelligent about routing:
- Art/design requests → algorithmic-art or canvas-design
- Web/component requests → frontend-design or web-artifacts
- Testing requests → webapp-testing
- Business writing → internal-comms
- Branding → brand-guidelines or document-polisher
- Platform development → mcp-builder or skill-creator
- Complex workflows → document-platform

Always respond helpfully and use the most appropriate tool for the user's request."""

        try:
            # Call Claude with tools
            response = self.client.messages.create(
                model=self.model,
                max_tokens=1024,
                system=system_prompt,
                messages=[{
                    "role": "user",
                    "content": message
                }],
                tools=self.tools
            )

            # Check if Claude used a tool
            tool_use = None
            text_response = ""

            for content_block in response.content:
                if content_block.type == "tool_use":
                    tool_use = content_block
                elif content_block.type == "text":
                    text_response = content_block.text

            if tool_use:
                # Claude identified an action to take
                tool_name = tool_use.name
                tool_input = tool_use.input

                # Map tool to intent and build action
                intent, action = self._tool_to_action(tool_name, tool_input)

                return {
                    "intent": intent,
                    "parameters": tool_input,
                    "confidence": 0.95,  # Claude is highly confident
                    "suggestion": text_response or self._generate_suggestion(intent, tool_input),
                    "action": action
                }
            else:
                # Claude didn't use a tool - just conversational response
                return {
                    "intent": "conversation",
                    "parameters": {},
                    "confidence": 1.0,
                    "suggestion": text_response,
                    "action": None
                }

        except Exception as e:
            # Fallback on error
            return {
                "intent": "error",
                "parameters": {"error": str(e)},
                "confidence": 0.0,
                "suggestion": f"I encountered an error: {str(e)}. Please try rephrasing your request.",
                "action": None
            }

    def _tool_to_action(self, tool_name: str, tool_input: Dict[str, Any]) -> tuple[str, Optional[Dict[str, Any]]]:
        """Convert Claude tool use to intent and frontend action"""

        action_map = {
            "create_document": {
                "intent": "create_document",
                "target": "/dashboard-docx",
                "pre_fill": {
                    "template": tool_input.get("template_type", "blank"),
                    "title": tool_input.get("title", ""),
                }
            },
            "create_spreadsheet": {
                "intent": "create_spreadsheet",
                "target": "/dashboard-xlsx",
                "pre_fill": {
                    "template": tool_input.get("template_type", "blank"),
                    "year": tool_input.get("year", ""),
                    "categories": tool_input.get("categories", [])
                }
            },
            "create_presentation": {
                "intent": "create_presentation",
                "target": "/dashboard-pptx",
                "pre_fill": {
                    "template": tool_input.get("template_type", "blank"),
                    "title": tool_input.get("title", ""),
                }
            },
            "process_pdf": {
                "intent": "process_pdf",
                "target": "/dashboard-pdf",
                "pre_fill": {
                    "operation": tool_input.get("operation", "merge")
                }
            },
            "apply_theme": {
                "intent": "apply_theme",
                "target": "/dashboard-themes",
                "pre_fill": {
                    "theme": tool_input.get("theme_id", "ocean")
                }
            },
            "polish_document": {
                "intent": "polish_document",
                "target": "/dashboard-polish",
                "pre_fill": {
                    "brand": tool_input.get("brand", "mckinsey")
                }
            },
            "get_help": {
                "intent": "get_help",
                "target": None,
                "pre_fill": {}
            },
            "create_algorithmic_art": {
                "intent": "create_algorithmic_art",
                "target": "/dashboard-algorithmic-art",
                "pre_fill": {
                    "style": tool_input.get("style", "flow-field"),
                    "parameters": tool_input.get("parameters", {})
                }
            },
            "create_canvas_design": {
                "intent": "create_canvas_design",
                "target": "/dashboard-canvas-design",
                "pre_fill": {
                    "template": tool_input.get("template", "poster"),
                    "theme": tool_input.get("theme", "modern"),
                    "title": tool_input.get("title", "")
                }
            },
            "create_slack_gif": {
                "intent": "create_slack_gif",
                "target": "/dashboard-slack-gif",
                "pre_fill": {
                    "animation_type": tool_input.get("animation_type", ""),
                    "duration": tool_input.get("duration", 3)
                }
            },
            "create_frontend_component": {
                "intent": "create_frontend_component",
                "target": "/dashboard-frontend-design",
                "pre_fill": {
                    "component_type": tool_input.get("component_type", "button"),
                    "styling": tool_input.get("styling", "tailwind"),
                    "props": tool_input.get("props", {})
                }
            },
            "create_web_artifact": {
                "intent": "create_web_artifact",
                "target": "/dashboard-web-artifacts",
                "pre_fill": {
                    "app_type": tool_input.get("app_type", "dashboard"),
                    "components": tool_input.get("components", []),
                    "features": tool_input.get("features", [])
                }
            },
            "test_webapp": {
                "intent": "test_webapp",
                "target": "/dashboard-webapp-testing",
                "pre_fill": {
                    "test_type": tool_input.get("test_type", "screenshot"),
                    "url": tool_input.get("url", "")
                }
            },
            "create_internal_comm": {
                "intent": "create_internal_comm",
                "target": "/dashboard-internal-comms",
                "pre_fill": {
                    "comm_type": tool_input.get("comm_type", "status-report"),
                    "topic": tool_input.get("topic", "")
                }
            },
            "get_brand_guidelines": {
                "intent": "get_brand_guidelines",
                "target": "/dashboard-brand-guidelines",
                "pre_fill": {
                    "component": tool_input.get("component", "all")
                }
            },
            "create_mcp_server": {
                "intent": "create_mcp_server",
                "target": "/dashboard-mcp-builder",
                "pre_fill": {
                    "language": tool_input.get("language", "python"),
                    "server_name": tool_input.get("server_name", ""),
                    "tools": tool_input.get("tools", [])
                }
            },
            "create_skill": {
                "intent": "create_skill",
                "target": "/dashboard-skill-creator",
                "pre_fill": {
                    "skill_name": tool_input.get("skill_name", ""),
                    "description": tool_input.get("description", ""),
                    "tools": tool_input.get("tools", [])
                }
            },
            "execute_workflow": {
                "intent": "execute_workflow",
                "target": "/dashboard-document-platform",
                "pre_fill": {
                    "workflow_name": tool_input.get("workflow_name", ""),
                    "steps": tool_input.get("steps", [])
                }
            }
        }

        mapping = action_map.get(tool_name, {
            "intent": "unknown",
            "target": None,
            "pre_fill": {}
        })

        intent = mapping["intent"]

        if mapping["target"]:
            action = {
                "type": "navigate",
                "target": mapping["target"],
                "pre_fill": mapping["pre_fill"]
            }
        else:
            action = None

        return intent, action

    def _generate_suggestion(self, intent: str, parameters: Dict[str, Any]) -> str:
        """Generate human-readable suggestion"""

        suggestions = {
            "create_document": f"I'll help you create a {parameters.get('template_type', 'document')}",
            "create_spreadsheet": f"I'll create a {parameters.get('template_type', 'spreadsheet')} for you",
            "create_presentation": f"I'll set up a {parameters.get('template_type', 'presentation')}",
            "process_pdf": f"I'll help you {parameters.get('operation', 'process')} PDF files",
            "apply_theme": f"I'll apply the {parameters.get('theme_id', 'theme')}",
            "polish_document": f"I'll apply {parameters.get('brand', 'professional')} brand styling",
        }

        return suggestions.get(intent, "Let me help you with that")

    def get_quick_actions(self) -> List[Dict[str, Any]]:
        """Return quick action shortcuts"""
        return [
            {
                "id": "quick-report",
                "icon": "📄",
                "label": "Quick Report",
                "description": "Create a professional report in seconds",
                "prompt": "Create a professional report titled 'Q4 2024 Analysis'"
            },
            {
                "id": "quick-budget",
                "icon": "💰",
                "label": "Budget Template",
                "description": "2025 budget tracker with formulas",
                "prompt": "Create a budget for 2025 with categories: Salaries, Marketing, Operations"
            },
            {
                "id": "quick-pitch",
                "icon": "🚀",
                "label": "Pitch Deck",
                "description": "Investor presentation template",
                "prompt": "Create a pitch deck presentation for a SaaS startup"
            },
            {
                "id": "quick-memo",
                "icon": "📝",
                "label": "Quick Memo",
                "description": "Business memo format",
                "prompt": "Create a memo about the new remote work policy"
            }
        ]

    def get_tool_suggestions(self, context: str) -> List[Dict[str, str]]:
        """Get contextual suggestions based on current tool"""

        suggestions_map = {
            "docx": [
                {"text": "Create a quarterly report", "icon": "📊"},
                {"text": "Generate a business memo", "icon": "📝"},
                {"text": "Write a professional letter", "icon": "✉️"}
            ],
            "xlsx": [
                {"text": "Build a 2025 budget", "icon": "💰"},
                {"text": "Create a financial model", "icon": "📈"},
                {"text": "Make a data table", "icon": "📋"}
            ],
            "pptx": [
                {"text": "Create an investor pitch deck", "icon": "🚀"},
                {"text": "Build a business presentation", "icon": "💼"},
                {"text": "Generate a report presentation", "icon": "📊"}
            ],
            "pdf": [
                {"text": "Merge multiple PDFs", "icon": "📑"},
                {"text": "Split a PDF by pages", "icon": "✂️"},
                {"text": "Extract text from PDF", "icon": "📄"}
            ],
            "themes": [
                {"text": "Apply ocean theme", "icon": "🌊"},
                {"text": "Use sunset colors", "icon": "🌅"},
                {"text": "Try forest theme", "icon": "🌲"}
            ],
            "polish": [
                {"text": "Apply McKinsey styling", "icon": "💼"},
                {"text": "Use Stripe branding", "icon": "💳"},
                {"text": "Apply Apple aesthetic", "icon": "🍎"}
            ]
        }

        return suggestions_map.get(context, [
            {"text": "Create a document", "icon": "📄"},
            {"text": "Build a spreadsheet", "icon": "📊"},
            {"text": "Make a presentation", "icon": "🎯"}
        ])


# Singleton instance
claude_service = ClaudeService()
