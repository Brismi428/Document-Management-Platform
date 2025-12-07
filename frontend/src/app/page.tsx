"use client";

import { useRouter } from "next/navigation";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  route: string;
  status: "active" | "coming-soon";
  category: "documents" | "creative" | "web" | "business" | "platform";
}

export default function DashboardPage() {
  const router = useRouter();

  const tools: Tool[] = [
    // DOCUMENTS & OFFICE (6 skills)
    {
      id: "document-polisher",
      name: "Document Polisher",
      description: "Apply premium brand styling to DOCX documents with 10 professional themes",
      icon: "✨",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      route: "/dashboard-polish",
      status: "active",
      category: "documents"
    },
    {
      id: "docx-creator",
      name: "DOCX Creator",
      description: "Create professional documents from templates: reports, memos, letters",
      icon: "📝",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      route: "/dashboard-docx",
      status: "active",
      category: "documents"
    },
    {
      id: "pdf-processor",
      name: "PDF Processor",
      description: "Merge, split, extract text, rotate, and manipulate PDF documents",
      icon: "📄",
      gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      route: "/dashboard-pdf",
      status: "active",
      category: "documents"
    },
    {
      id: "xlsx-creator",
      name: "Spreadsheet Creator",
      description: "Build spreadsheets with formulas, formatting, and financial models",
      icon: "📊",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      route: "/dashboard-xlsx",
      status: "active",
      category: "documents"
    },
    {
      id: "pptx-builder",
      name: "Presentation Builder",
      description: "Create presentations with templates and design systems",
      icon: "📽️",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      route: "/dashboard-pptx",
      status: "active",
      category: "documents"
    },
    {
      id: "theme-factory",
      name: "Theme Factory",
      description: "Apply beautiful color and font themes to any document or artifact",
      icon: "🎨",
      gradient: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
      route: "/dashboard-themes",
      status: "active",
      category: "documents"
    },

    // CREATIVE & DESIGN (3 skills)
    {
      id: "algorithmic-art",
      name: "Algorithmic Art",
      description: "Generate P5.js generative art: flow fields, particle systems, fractals",
      icon: "🌊",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
      route: "/dashboard-algorithmic-art",
      status: "active",
      category: "creative"
    },
    {
      id: "canvas-design",
      name: "Canvas Design",
      description: "Create posters, cards, social media graphics, and infographics",
      icon: "🖼️",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
      route: "/dashboard-canvas-design",
      status: "active",
      category: "creative"
    },
    {
      id: "slack-gif",
      name: "Slack GIF Creator",
      description: "Create animated GIFs optimized for Slack (≤500px, ≤20fps)",
      icon: "🎬",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      route: "/dashboard-slack-gif",
      status: "active",
      category: "creative"
    },

    // WEB & DEVELOPMENT (3 skills)
    {
      id: "frontend-design",
      name: "Frontend Design",
      description: "Generate React components: buttons, cards, forms, navbars with Tailwind CSS",
      icon: "⚛️",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      route: "/dashboard-frontend-design",
      status: "active",
      category: "web"
    },
    {
      id: "web-artifacts",
      name: "Web Artifacts Builder",
      description: "Build multi-component web apps: dashboards, landing pages, tools, games",
      icon: "🚀",
      gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
      route: "/dashboard-web-artifacts",
      status: "active",
      category: "web"
    },
    {
      id: "webapp-testing",
      name: "Webapp Testing",
      description: "Playwright testing: screenshots, click tests, form fills, performance",
      icon: "🧪",
      gradient: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
      route: "/dashboard-webapp-testing",
      status: "active",
      category: "web"
    },

    // BUSINESS & COMMUNICATION (2 skills)
    {
      id: "internal-comms",
      name: "Internal Communications",
      description: "Generate status reports, leadership updates, newsletters, FAQs, incident reports",
      icon: "📢",
      gradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
      route: "/dashboard-internal-comms",
      status: "active",
      category: "business"
    },
    {
      id: "brand-guidelines",
      name: "Brand Guidelines",
      description: "Access Anthropic's official brand colors, typography, and styles",
      icon: "🎯",
      gradient: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
      route: "/dashboard-brand-guidelines",
      status: "active",
      category: "business"
    },

    // PLATFORM & META (3 skills)
    {
      id: "mcp-builder",
      name: "MCP Builder",
      description: "Generate MCP server boilerplate for Python (FastMCP) or Node.js (MCP SDK)",
      icon: "🔧",
      gradient: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
      route: "/dashboard-mcp-builder",
      status: "active",
      category: "platform"
    },
    {
      id: "skill-creator",
      name: "Skill Creator",
      description: "Generate Claude Code skill structure: SKILL.md, scripts, templates, docs",
      icon: "⚙️",
      gradient: "linear-gradient(135deg, #71717a 0%, #52525b 100%)",
      route: "/dashboard-skill-creator",
      status: "active",
      category: "platform"
    },
    {
      id: "document-platform",
      name: "Document Platform",
      description: "Execute multi-skill workflows: report-to-presentation, data-to-infographic",
      icon: "🔄",
      gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)",
      route: "/dashboard-document-platform",
      status: "active",
      category: "platform"
    }
  ];

  const activeTools = tools.filter(t => t.status === "active");
  const comingSoonTools = tools.filter(t => t.status === "coming-soon");

  const categories = [
    { id: "documents", name: "Documents & Office", icon: "📄", color: "#3b82f6" },
    { id: "creative", name: "Creative & Design", icon: "🎨", color: "#f59e0b" },
    { id: "web", name: "Web & Development", icon: "💻", color: "#10b981" },
    { id: "business", name: "Business & Communication", icon: "💼", color: "#ef4444" },
    { id: "platform", name: "Platform & Meta", icon: "🔧", color: "#6b7280" }
  ];

  return (
    <>
      <style jsx>{`
        @media (max-width: 1024px) {
          .tools-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .tools-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-title {
            font-size: 2rem !important;
          }
        }
        .tool-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15) !important;
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>

        {/* Hero Section */}
        <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "3rem 1rem" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
            <div style={{
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              color: "white",
              fontWeight: "bold",
              margin: "0 auto 1.5rem auto",
              boxShadow: "0 8px 16px rgba(102,126,234,0.3)"
            }}>
              🚀
            </div>
            <h1 className="hero-title" style={{
              fontSize: "3rem",
              fontWeight: "bold",
              margin: 0,
              color: "#1f2937",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Ultimate Productivity Platform
            </h1>
            <p style={{
              color: "#6b7280",
              margin: "1rem 0 0 0",
              fontSize: "1.15rem",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto"
            }}>
              All-in-one creative & productivity suite with 17 integrated skills powered by Claude AI
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1rem" }}>

          {/* Category Sections */}
          {categories.map((category) => {
            const categoryTools = tools.filter(t => t.category === category.id);
            if (categoryTools.length === 0) return null;

            return (
              <div key={category.id} style={{ marginBottom: "4rem" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.5rem"
                }}>
                  <div style={{
                    fontSize: "2rem"
                  }}>
                    {category.icon}
                  </div>
                  <h2 style={{
                    fontSize: "1.75rem",
                    fontWeight: "700",
                    color: "white",
                    margin: 0
                  }}>
                    {category.name}
                  </h2>
                  <div style={{
                    marginLeft: "auto",
                    background: "rgba(255,255,255,0.2)",
                    padding: "0.5rem 1rem",
                    borderRadius: "999px",
                    color: "white",
                    fontSize: "0.9rem",
                    fontWeight: "600"
                  }}>
                    {categoryTools.length} {categoryTools.length === 1 ? 'skill' : 'skills'}
                  </div>
                </div>

                <div className="tools-grid" style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1.5rem"
                }}>
                  {categoryTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="tool-card"
                      onClick={() => tool.status === "active" && router.push(tool.route)}
                      style={{
                        background: "white",
                        borderRadius: "16px",
                        padding: "2rem",
                        cursor: tool.status === "active" ? "pointer" : "default",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                        opacity: tool.status === "coming-soon" ? 0.7 : 1
                      }}
                    >
                      {/* Gradient accent bar */}
                      <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "6px",
                        background: tool.gradient
                      }} />

                      {/* Status Badge */}
                      {tool.status === "coming-soon" && (
                        <div style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          background: "#f59e0b",
                          color: "white",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "999px",
                          fontSize: "0.75rem",
                          fontWeight: "600"
                        }}>
                          Coming Soon
                        </div>
                      )}

                      <div style={{
                        width: "64px",
                        height: "64px",
                        background: tool.gradient,
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "32px",
                        marginBottom: "1rem",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                      }}>
                        {tool.icon}
                      </div>

                      <h3 style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "#1f2937",
                        marginBottom: "0.5rem"
                      }}>
                        {tool.name}
                      </h3>

                      <p style={{
                        fontSize: "0.95rem",
                        color: "#6b7280",
                        lineHeight: "1.5",
                        marginBottom: tool.status === "active" ? "1.5rem" : "0"
                      }}>
                        {tool.description}
                      </p>

                      {tool.status === "active" && (
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "#667eea",
                          fontWeight: "600",
                          fontSize: "0.95rem"
                        }}>
                          Launch Tool
                          <span style={{ fontSize: "1.2rem" }}>→</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Footer Stats */}
          <div style={{
            marginTop: "4rem",
            padding: "2rem",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2rem",
              textAlign: "center"
            }}>
              <div>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white" }}>
                  17
                </div>
                <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)", marginTop: "0.5rem" }}>
                  Total Skills
                </div>
              </div>
              <div>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white" }}>
                  {activeTools.length}
                </div>
                <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)", marginTop: "0.5rem" }}>
                  Active Now
                </div>
              </div>
              <div>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white" }}>
                  5
                </div>
                <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)", marginTop: "0.5rem" }}>
                  Categories
                </div>
              </div>
              <div>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white" }}>
                  100%
                </div>
                <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)", marginTop: "0.5rem" }}>
                  Claude AI Powered
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
