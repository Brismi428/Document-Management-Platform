"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MCPBuilderPage() {
  const router = useRouter();
  const [serverName, setServerName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [runtime, setRuntime] = useState<string>("python");
  const [tools, setTools] = useState<string>("");
  const [resources, setResources] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const runtimes = [
    { id: "python", name: "Python (FastMCP)", icon: "🐍", description: "FastMCP framework for Python" },
    { id: "nodejs", name: "Node.js (MCP SDK)", icon: "🟢", description: "Official MCP SDK for TypeScript/JavaScript" }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:8000/api/mcp-builder/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          server_name: serverName,
          description,
          runtime,
          tools: tools.split("\n").filter(t => t.trim()),
          resources: resources.split("\n").filter(r => r.trim())
        })
      });
      const data = await response.json();
      console.log("Generated MCP server:", data);
      // TODO: Display generated code or download link
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
              background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px"
            }}>
              🔧
            </div>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#1f2937" }}>
                MCP Server Builder
              </h1>
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0" }}>
                Generate MCP server boilerplate for Python (FastMCP) or Node.js (MCP SDK)
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
                Server Configuration
              </h2>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Server Name
                </label>
                <input
                  type="text"
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  placeholder="my-custom-mcp-server"
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
                  placeholder="What does this MCP server do?"
                  rows={3}
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

            {/* Tools */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Tools (Functions)
              </h2>

              <div>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Tool Definitions (one per line)
                </label>
                <textarea
                  value={tools}
                  onChange={(e) => setTools(e.target.value)}
                  placeholder={"get_weather(location: str) -> dict\nsend_email(to: str, subject: str, body: str) -> bool\ncalculate_sum(numbers: list) -> float"}
                  rows={6}
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
                  Define tools as function signatures (one per line)
                </p>
              </div>
            </div>

            {/* Resources */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Resources (Optional)
              </h2>

              <div>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Resource URIs (one per line)
                </label>
                <textarea
                  value={resources}
                  onChange={(e) => setResources(e.target.value)}
                  placeholder={"file:///config.json\napi://service/data\ndb://users"}
                  rows={4}
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
                  Define resources your server will expose (optional)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Runtime & Generate */}
          <div>
            {/* Runtime Selection */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Runtime
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {runtimes.map((rt) => (
                  <div
                    key={rt.id}
                    onClick={() => setRuntime(rt.id)}
                    style={{
                      background: runtime === rt.id ? "#f3f4f6" : "white",
                      border: runtime === rt.id ? "2px solid #667eea" : "2px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{rt.icon}</div>
                    <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                      {rt.name}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                      {rt.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* MCP Info */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                What is MCP?
              </h2>

              <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: "1.6", marginBottom: "1rem" }}>
                Model Context Protocol (MCP) enables LLMs to interact with external services through standardized tools and resources.
              </p>

              <div style={{ fontSize: "0.85rem", color: "#6b7280", lineHeight: "1.6" }}>
                <div style={{ marginBottom: "0.5rem" }}>• Connect AI to databases</div>
                <div style={{ marginBottom: "0.5rem" }}>• Integrate with APIs</div>
                <div style={{ marginBottom: "0.5rem" }}>• Access file systems</div>
                <div>• Custom tools & actions</div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !serverName || !tools}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                color: "white",
                border: "none",
                padding: "1rem",
                borderRadius: "12px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: (isGenerating || !serverName || !tools) ? "not-allowed" : "pointer",
                opacity: (isGenerating || !serverName || !tools) ? 0.6 : 1,
                boxShadow: "0 4px 12px rgba(100,116,139,0.3)"
              }}
            >
              {isGenerating ? "Generating..." : "Generate MCP Server"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
