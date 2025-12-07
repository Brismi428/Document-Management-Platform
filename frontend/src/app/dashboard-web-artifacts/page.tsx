"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ArtifactType {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
}

export default function WebArtifactsPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>("dashboard");
  const [projectName, setProjectName] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");
  const [techStack, setTechStack] = useState<string[]>(["react", "tailwind"]);
  const [isGenerating, setIsGenerating] = useState(false);

  const artifactTypes: ArtifactType[] = [
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Admin dashboards with charts, tables, and metrics",
      icon: "📊",
      features: ["Charts", "Data tables", "Filters", "Real-time updates"]
    },
    {
      id: "landing-page",
      name: "Landing Page",
      description: "Marketing pages with hero, features, and CTAs",
      icon: "🚀",
      features: ["Hero section", "Feature blocks", "Testimonials", "CTA forms"]
    },
    {
      id: "docs-site",
      name: "Documentation Site",
      description: "Technical documentation with navigation and search",
      icon: "📚",
      features: ["Sidebar nav", "Search", "Code blocks", "Table of contents"]
    },
    {
      id: "tool",
      name: "Web Tool",
      description: "Interactive utilities and calculators",
      icon: "🔧",
      features: ["Input forms", "Real-time calc", "Export results", "Local storage"]
    },
    {
      id: "game",
      name: "Browser Game",
      description: "Simple interactive games and puzzles",
      icon: "🎮",
      features: ["Game loop", "Score tracking", "Controls", "Animations"]
    }
  ];

  const techOptions = [
    { id: "react", name: "React" },
    { id: "tailwind", name: "Tailwind CSS" },
    { id: "typescript", name: "TypeScript" },
    { id: "shadcn", name: "shadcn/ui" },
    { id: "recharts", name: "Recharts" },
    { id: "router", name: "React Router" }
  ];

  const toggleTech = (tech: string) => {
    setTechStack(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:8000/api/web-artifacts/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artifact_type: selectedType,
          project_name: projectName,
          requirements,
          tech_stack: techStack
        })
      });
      const data = await response.json();
      console.log("Generated artifact:", data);
      // TODO: Display generated code or download link
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentType = artifactTypes.find(t => t.id === selectedType);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>

      {/* Header */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "2rem 1rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              background: "transparent",
              border: "none",
              color: "#667eea",
              fontSize: "0.95rem",
              cursor: "pointer",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            ← Back to Dashboard
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "64px",
              height: "64px",
              background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px"
            }}>
              🚀
            </div>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#1f2937" }}>
                Web Artifacts Builder
              </h1>
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0" }}>
                Build multi-component web apps: dashboards, landing pages, tools, games
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1rem" }}>

        {/* Artifact Type Selection */}
        <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
            Select Artifact Type
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {artifactTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                style={{
                  background: selectedType === type.id ? "#f3f4f6" : "white",
                  border: selectedType === type.id ? "2px solid #667eea" : "2px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{type.icon}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                  {type.name}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: "1.4", marginBottom: "1rem" }}>
                  {type.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {type.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "0.75rem",
                        background: "#f3f4f6",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        color: "#6b7280"
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>

          {/* Project Configuration */}
          <div>
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Project Details
              </h2>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="my-awesome-app"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.95rem"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Requirements & Features
                </label>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Describe what your app should do, key features, data needs..."
                  rows={8}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    fontFamily: "inherit",
                    resize: "vertical"
                  }}
                />
              </div>

              {currentType && (
                <div style={{
                  marginTop: "1.5rem",
                  padding: "1rem",
                  background: "#f0f9ff",
                  borderRadius: "8px"
                }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#0369a1", marginBottom: "0.5rem" }}>
                    Includes:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.85rem", color: "#0369a1" }}>
                    {currentType.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Tech Stack
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {techOptions.map((tech) => (
                  <div
                    key={tech.id}
                    onClick={() => toggleTech(tech.id)}
                    style={{
                      background: techStack.includes(tech.id) ? "#667eea" : "#f3f4f6",
                      color: techStack.includes(tech.id) ? "white" : "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                      padding: "1rem",
                      cursor: "pointer",
                      textAlign: "center",
                      fontWeight: "600",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {techStack.includes(tech.id) ? "✓ " : ""}{tech.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !projectName}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
                color: "white",
                border: "none",
                padding: "1rem",
                borderRadius: "12px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: (isGenerating || !projectName) ? "not-allowed" : "pointer",
                opacity: (isGenerating || !projectName) ? 0.6 : 1,
                boxShadow: "0 4px 12px rgba(20,184,166,0.3)"
              }}
            >
              {isGenerating ? "Building..." : "Build Web App"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
