"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SkillCreatorPage() {
  const router = useRouter();
  const [skillName, setSkillName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("utility");
  const [scripts, setScripts] = useState<string>("");
  const [templates, setTemplates] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = [
    { id: "utility", name: "Utility", icon: "🔧", description: "Helper tools and utilities" },
    { id: "document", name: "Document", icon: "📄", description: "Document processing" },
    { id: "creative", name: "Creative", icon: "🎨", description: "Creative tools and design" },
    { id: "development", name: "Development", icon: "💻", description: "Development and coding" },
    { id: "data", name: "Data", icon: "📊", description: "Data analysis and processing" }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:8000/api/skill-creator/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skill_name: skillName,
          description,
          category,
          scripts: scripts.split("\n").filter(s => s.trim()),
          templates: templates.split("\n").filter(t => t.trim())
        })
      });
      const data = await response.json();
      console.log("Generated skill:", data);
      // TODO: Display generated skill structure or download link
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

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
              background: "linear-gradient(135deg, #71717a 0%, #52525b 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px"
            }}>
              ⚙️
            </div>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#1f2937" }}>
                Claude Code Skill Creator
              </h1>
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0" }}>
                Generate Claude Code skill structure: SKILL.md, scripts, templates, docs
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1rem" }}>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>

          {/* Left Column: Configuration */}
          <div>
            {/* Basic Info */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Skill Configuration
              </h2>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Skill Name
                </label>
                <input
                  type="text"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="my-custom-skill"
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
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What does this skill do? When should Claude use it?"
                  rows={4}
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
            </div>

            {/* Scripts */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Scripts
              </h2>

              <div>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Script Files (one per line)
                </label>
                <textarea
                  value={scripts}
                  onChange={(e) => setScripts(e.target.value)}
                  placeholder={"process.py\nvalidate.js\nconvert.sh"}
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    fontFamily: "monospace",
                    resize: "vertical"
                  }}
                />
                <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "0.5rem" }}>
                  Python, JavaScript, or shell scripts to include
                </p>
              </div>
            </div>

            {/* Templates */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Templates & Config
              </h2>

              <div>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Template Files (one per line)
                </label>
                <textarea
                  value={templates}
                  onChange={(e) => setTemplates(e.target.value)}
                  placeholder={"config.json\ntemplate.md\nsettings.yaml"}
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    fontFamily: "monospace",
                    resize: "vertical"
                  }}
                />
                <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "0.5rem" }}>
                  Configuration files and templates
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Category & Generate */}
          <div>
            {/* Category Selection */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Category
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    style={{
                      background: category === cat.id ? "#f3f4f6" : "white",
                      border: category === cat.id ? "2px solid #667eea" : "2px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "1rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{cat.icon}</div>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                      {cat.name}
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                      {cat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Info */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Generated Files
              </h2>

              <div style={{ fontSize: "0.85rem", color: "#6b7280", lineHeight: "1.6" }}>
                <div style={{ marginBottom: "0.5rem" }}>📄 SKILL.md - Main instructions</div>
                <div style={{ marginBottom: "0.5rem" }}>📁 scripts/ - Python/JS scripts</div>
                <div style={{ marginBottom: "0.5rem" }}>📁 templates/ - Config files</div>
                <div style={{ marginBottom: "0.5rem" }}>📚 docs/ - Documentation</div>
                <div>⚙️ .claudeignore - Git ignore rules</div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !skillName || !description}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #71717a 0%, #52525b 100%)",
                color: "white",
                border: "none",
                padding: "1rem",
                borderRadius: "12px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: (isGenerating || !skillName || !description) ? "not-allowed" : "pointer",
                opacity: (isGenerating || !skillName || !description) ? 0.6 : 1,
                boxShadow: "0 4px 12px rgba(113,113,122,0.3)"
              }}
            >
              {isGenerating ? "Generating..." : "Generate Skill"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
