"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SlackGifPage() {
  const router = useRouter();
  const [subject, setSubject] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [style, setStyle] = useState<string>("animated-text");
  const [duration, setDuration] = useState<number>(3);
  const [fps, setFps] = useState<number>(15);
  const [width, setWidth] = useState<number>(400);
  const [isGenerating, setIsGenerating] = useState(false);

  const gifStyles = [
    { id: "animated-text", name: "Animated Text", description: "Kinetic typography with motion", icon: "📝" },
    { id: "celebration", name: "Celebration", description: "Confetti, fireworks, party effects", icon: "🎉" },
    { id: "loading", name: "Loading Spinner", description: "Custom loading animations", icon: "⏳" },
    { id: "emoji-sequence", name: "Emoji Sequence", description: "Animated emoji stories", icon: "😊" },
    { id: "reaction", name: "Reaction", description: "Expressive reactions and gestures", icon: "👍" },
    { id: "custom", name: "Custom Animation", description: "Freeform animation", icon: "🎨" }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:8000/api/slack-gif/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          action,
          style,
          constraints: {
            maxWidth: width,
            maxHeight: width, // Square for Slack
            maxFps: fps,
            duration
          }
        })
      });
      const data = await response.json();
      console.log("Generated GIF:", data);
      // TODO: Display generated GIF or download link
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
              background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px"
            }}>
              🎬
            </div>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#1f2937" }}>
                Slack GIF Creator
              </h1>
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0" }}>
                Create animated GIFs optimized for Slack (≤500px, ≤20fps)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1rem" }}>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>

          {/* Left Column: Configuration */}
          <div>
            {/* Animation Style */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Animation Style
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                {gifStyles.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    style={{
                      background: style === s.id ? "#f3f4f6" : "white",
                      border: style === s.id ? "2px solid #667eea" : "2px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{s.icon}</div>
                    <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                      {s.name}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Inputs */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Animation Content
              </h2>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is this GIF about? (e.g., 'Deployment success')"
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
                  Action/Motion
                </label>
                <input
                  type="text"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  placeholder="What should happen? (e.g., 'Text bounces in')"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.95rem"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Settings & Generate */}
          <div>
            {/* Slack Constraints */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Slack Optimization
              </h2>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Width (px) - Max 500
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Math.min(500, parseInt(e.target.value) || 400))}
                  min="200"
                  max="500"
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
                  Frame Rate (fps) - Max 20
                </label>
                <input
                  type="number"
                  value={fps}
                  onChange={(e) => setFps(Math.min(20, parseInt(e.target.value) || 15))}
                  min="10"
                  max="20"
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
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 3)}
                  min="1"
                  max="10"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.95rem"
                  }}
                />
              </div>

              <div style={{
                marginTop: "1.5rem",
                padding: "1rem",
                background: "#f0f9ff",
                borderRadius: "8px",
                fontSize: "0.85rem",
                color: "#0369a1"
              }}>
                💡 Slack displays GIFs best at ≤500px width and ≤20fps
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !subject}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                color: "white",
                border: "none",
                padding: "1rem",
                borderRadius: "12px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: (isGenerating || !subject) ? "not-allowed" : "pointer",
                opacity: (isGenerating || !subject) ? 0.6 : 1,
                boxShadow: "0 4px 12px rgba(6,182,212,0.3)"
              }}
            >
              {isGenerating ? "Creating GIF..." : "Create Slack GIF"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
