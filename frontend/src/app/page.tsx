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
}

export default function DashboardPage() {
  const router = useRouter();

  const tools: Tool[] = [
    {
      id: "document-polisher",
      name: "Document Polisher",
      description: "Apply premium brand styling to DOCX documents with 10 professional themes",
      icon: "✨",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      route: "/dashboard-polish",
      status: "active"
    },
    {
      id: "docx-creator",
      name: "DOCX Creator",
      description: "Create professional Word documents from templates: reports, memos, letters",
      icon: "📝",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      route: "/dashboard-docx",
      status: "active"
    },
    {
      id: "pdf-processor",
      name: "PDF Processor",
      description: "Merge, split, extract text, rotate, and manipulate PDF documents",
      icon: "📄",
      gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      route: "/dashboard-pdf",
      status: "active"
    },
    {
      id: "xlsx-creator",
      name: "Spreadsheet Creator",
      description: "Build Excel spreadsheets with formulas, formatting, and financial models",
      icon: "📊",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      route: "/dashboard-xlsx",
      status: "active"
    },
    {
      id: "pptx-builder",
      name: "Presentation Builder",
      description: "Create PowerPoint presentations with templates and design systems",
      icon: "📽️",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      route: "/dashboard-pptx",
      status: "coming-soon"
    },
    {
      id: "theme-factory",
      name: "Theme Factory",
      description: "Apply beautiful color and font themes to any document or artifact",
      icon: "🎨",
      gradient: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
      route: "/dashboard-themes",
      status: "coming-soon"
    }
  ];

  const activeTools = tools.filter(t => t.status === "active");
  const comingSoonTools = tools.filter(t => t.status === "coming-soon");

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
              Document Management Platform
            </h1>
            <p style={{
              color: "#6b7280",
              margin: "1rem 0 0 0",
              fontSize: "1.15rem",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto"
            }}>
              Comprehensive document creation, editing, and styling tools powered by Claude Code skills
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1rem" }}>

          {/* Active Tools */}
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              color: "white",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <span>🔥</span> Active Tools
            </h2>
            <div className="tools-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem"
            }}>
              {activeTools.map((tool) => (
                <div
                  key={tool.id}
                  className="tool-card"
                  onClick={() => router.push(tool.route)}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "2rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden"
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
                    marginBottom: "1.5rem"
                  }}>
                    {tool.description}
                  </p>

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
                </div>
              ))}
            </div>
          </div>

          {/* Coming Soon Tools */}
          {comingSoonTools.length > 0 && (
            <div>
              <h2 style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "white",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <span>⏳</span> Coming Soon
              </h2>
              <div className="tools-grid" style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem"
              }}>
                {comingSoonTools.map((tool) => (
                  <div
                    key={tool.id}
                    style={{
                      background: "white",
                      borderRadius: "16px",
                      padding: "2rem",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      position: "relative",
                      overflow: "hidden",
                      opacity: 0.7
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

                    {/* Coming Soon Badge */}
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
                      lineHeight: "1.5"
                    }}>
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

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
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              textAlign: "center"
            }}>
              <div>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white" }}>
                  {activeTools.length}
                </div>
                <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)", marginTop: "0.5rem" }}>
                  Active Tools
                </div>
              </div>
              <div>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white" }}>
                  {tools.length}
                </div>
                <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)", marginTop: "0.5rem" }}>
                  Total Capabilities
                </div>
              </div>
              <div>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white" }}>
                  16
                </div>
                <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)", marginTop: "0.5rem" }}>
                  Claude Code Skills
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
