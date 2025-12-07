"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CommType {
  id: string;
  name: string;
  description: string;
  icon: string;
  fields: string[];
}

export default function InternalCommsPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>("status-report");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [audience, setAudience] = useState<string>("team");
  const [isGenerating, setIsGenerating] = useState(false);

  const commTypes: CommType[] = [
    {
      id: "status-report",
      name: "Status Report",
      description: "Weekly/monthly project status updates",
      icon: "📊",
      fields: ["Project name", "Progress", "Blockers", "Next steps"]
    },
    {
      id: "leadership-update",
      name: "Leadership Update",
      description: "Executive summaries and strategic updates",
      icon: "📈",
      fields: ["Key achievements", "Metrics", "Strategic decisions", "Asks"]
    },
    {
      id: "newsletter",
      name: "Company Newsletter",
      description: "Team newsletters and announcements",
      icon: "📰",
      fields: ["Highlights", "Team wins", "Upcoming events", "Shoutouts"]
    },
    {
      id: "faq",
      name: "FAQ Document",
      description: "Frequently asked questions and answers",
      icon: "❓",
      fields: ["Topic", "Common questions", "Detailed answers", "Resources"]
    },
    {
      id: "incident-report",
      name: "Incident Report",
      description: "Post-mortem and incident documentation",
      icon: "🚨",
      fields: ["Timeline", "Impact", "Root cause", "Action items"]
    }
  ];

  const audiences = [
    { id: "team", name: "Team", icon: "👥" },
    { id: "leadership", name: "Leadership", icon: "👔" },
    { id: "company", name: "Company-wide", icon: "🏢" },
    { id: "external", name: "External Partners", icon: "🤝" }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:8000/api/internal-comms/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comm_type: selectedType,
          title,
          content,
          audience
        })
      });
      const data = await response.json();
      console.log("Generated communication:", data);
      // TODO: Display generated document or download link
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentType = commTypes.find(t => t.id === selectedType);

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
              background: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px"
            }}>
              📢
            </div>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#1f2937" }}>
                Internal Communications
              </h1>
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0" }}>
                Generate status reports, leadership updates, newsletters, FAQs, incident reports
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1rem" }}>

        {/* Communication Type Selection */}
        <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
            Select Communication Type
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {commTypes.map((type) => (
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
                <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: "1.4" }}>
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>

          {/* Left Column: Content */}
          <div>
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Communication Details
              </h2>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter communication title..."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.95rem"
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Content & Key Points
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter key information to include..."
                  rows={12}
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
                  padding: "1rem",
                  background: "#f0f9ff",
                  borderRadius: "8px"
                }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#0369a1", marginBottom: "0.5rem" }}>
                    Suggested fields to include:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {currentType.fields.map((field, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: "0.8rem",
                          background: "white",
                          color: "#0369a1",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "999px",
                          border: "1px solid #bae6fd"
                        }}
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Audience & Generate */}
          <div>
            {/* Audience Selection */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Audience
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {audiences.map((aud) => (
                  <div
                    key={aud.id}
                    onClick={() => setAudience(aud.id)}
                    style={{
                      background: audience === aud.id ? "#667eea" : "#f3f4f6",
                      color: audience === aud.id ? "white" : "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                      padding: "1rem",
                      cursor: "pointer",
                      textAlign: "center",
                      fontWeight: "600",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {aud.icon} {aud.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !title || !content}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
                color: "white",
                border: "none",
                padding: "1rem",
                borderRadius: "12px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: (isGenerating || !title || !content) ? "not-allowed" : "pointer",
                opacity: (isGenerating || !title || !content) ? 0.6 : 1,
                boxShadow: "0 4px 12px rgba(244,63,94,0.3)"
              }}
            >
              {isGenerating ? "Generating..." : "Generate Communication"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
