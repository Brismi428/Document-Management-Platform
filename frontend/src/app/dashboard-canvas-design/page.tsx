"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Template {
  id: string;
  name: string;
  sizes: string[];
  icon: string;
}

interface Theme {
  id: string;
  name: string;
  colors: string[];
}

export default function CanvasDesignPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("poster");
  const [selectedSize, setSelectedSize] = useState<string>("A4");
  const [selectedTheme, setSelectedTheme] = useState<string>("vibrant");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const templates: Template[] = [
    { id: "poster", name: "Poster", sizes: ["A4", "A3", "24x36", "custom"], icon: "📋" },
    { id: "card", name: "Card/Flyer", sizes: ["business-card", "postcard", "A6"], icon: "🎴" },
    { id: "social-media", name: "Social Media", sizes: ["instagram-square", "instagram-story", "twitter-post", "linkedin-banner"], icon: "📱" },
    { id: "infographic", name: "Infographic", sizes: ["vertical", "horizontal", "square"], icon: "📊" },
    { id: "banner", name: "Banner", sizes: ["web-banner", "email-header", "billboard"], icon: "🎯" }
  ];

  const themes: Theme[] = [
    { id: "vibrant", name: "Vibrant", colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"] },
    { id: "minimal", name: "Minimal", colors: ["#000000", "#FFFFFF", "#F5F5F5", "#E0E0E0"] },
    { id: "nature", name: "Nature", colors: ["#2D5016", "#8BC34A", "#CDDC39", "#FFF59D"] },
    { id: "sunset", name: "Sunset", colors: ["#FF6F61", "#FFB74D", "#FF8A65", "#FFCCBC"] },
    { id: "ocean", name: "Ocean", colors: ["#006994", "#0288D1", "#4FC3F7", "#B3E5FC"] }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:8000/api/canvas-design/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: selectedTemplate,
          size: selectedSize,
          theme: selectedTheme,
          title,
          content
        })
      });
      const data = await response.json();
      console.log("Generated design:", data);
      // TODO: Display generated design or download link
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  const currentTheme = themes.find(t => t.id === selectedTheme);

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
              background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px"
            }}>
              🖼️
            </div>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#1f2937" }}>
                Canvas Design Studio
              </h1>
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0" }}>
                Create posters, cards, social media graphics, and infographics
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1rem" }}>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>

          {/* Left Column: Configuration */}
          <div>
            {/* Template Selection */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Select Template
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setSelectedSize(template.sizes[0]);
                    }}
                    style={{
                      background: selectedTemplate === template.id ? "#f3f4f6" : "white",
                      border: selectedTemplate === template.id ? "2px solid #667eea" : "2px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{template.icon}</div>
                    <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>
                      {template.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            {currentTemplate && (
              <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                  Select Size
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                  {currentTemplate.sizes.map((size) => (
                    <div
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        background: selectedSize === size ? "#667eea" : "#f3f4f6",
                        color: selectedSize === size ? "white" : "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        padding: "1rem",
                        cursor: "pointer",
                        textAlign: "center",
                        fontWeight: "600",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Inputs */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Content
              </h2>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter design title..."
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
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter main content..."
                  rows={6}
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
          </div>

          {/* Right Column: Theme & Preview */}
          <div>
            {/* Theme Selection */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Color Theme
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    style={{
                      background: selectedTheme === theme.id ? "#f3f4f6" : "white",
                      border: selectedTheme === theme.id ? "2px solid #667eea" : "2px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "1rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                      {theme.name}
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {theme.colors.map((color, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: "40px",
                            height: "40px",
                            background: color,
                            borderRadius: "6px",
                            border: "1px solid #e5e7eb"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !title}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                color: "white",
                border: "none",
                padding: "1rem",
                borderRadius: "12px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: (isGenerating || !title) ? "not-allowed" : "pointer",
                opacity: (isGenerating || !title) ? 0.6 : 1,
                boxShadow: "0 4px 12px rgba(245,158,11,0.3)"
              }}
            >
              {isGenerating ? "Creating Design..." : "Create Design"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
