"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Workflow {
  id: string;
  name: string;
  description: string;
  icon: string;
  steps: string[];
  skills: string[];
}

export default function DocumentPlatformPage() {
  const router = useRouter();
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>("report-to-presentation");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [isExecuting, setIsExecuting] = useState(false);

  const workflows: Workflow[] = [
    {
      id: "report-to-presentation",
      name: "Report to Presentation",
      description: "Convert DOCX report into a branded PPTX presentation",
      icon: "📊➡️📽️",
      steps: ["Create DOCX report", "Convert to PPTX", "Apply brand styling"],
      skills: ["docx", "pptx", "document-polisher"]
    },
    {
      id: "data-to-infographic",
      name: "Data to Infographic",
      description: "Transform spreadsheet data into visual infographic",
      icon: "📈➡️🎨",
      steps: ["Generate XLSX chart", "Create canvas design", "Export as PDF"],
      skills: ["xlsx", "canvas-design", "pdf"]
    },
    {
      id: "branded-materials",
      name: "Branded Materials Suite",
      description: "Create complete branded document package",
      icon: "📄➡️🎯",
      steps: ["Create docs", "Apply themes", "Polish with brand", "Generate PDFs"],
      skills: ["docx", "pptx", "theme-factory", "document-polisher", "pdf"]
    },
    {
      id: "web-to-docs",
      name: "Web to Documentation",
      description: "Convert web content into formatted documentation",
      icon: "🌐➡️📚",
      steps: ["Scrape web content", "Format as DOCX", "Generate PDF"],
      skills: ["web-artifacts", "docx", "pdf"]
    },
    {
      id: "custom-workflow",
      name: "Custom Workflow",
      description: "Build your own multi-skill workflow",
      icon: "🔧",
      steps: ["Select skills", "Define sequence", "Configure parameters", "Execute"],
      skills: ["all"]
    }
  ];

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      const currentWorkflow = workflows.find(w => w.id === selectedWorkflow);
      const response = await fetch("http://localhost:8000/api/document-platform/execute-workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workflow_name: selectedWorkflow,
          steps: currentWorkflow?.steps || [],
          inputs
        })
      });
      const data = await response.json();
      console.log("Workflow executed:", data);
      // TODO: Display execution results
    } catch (error) {
      console.error("Execution failed:", error);
    } finally {
      setIsExecuting(false);
    }
  };

  const currentWorkflow = workflows.find(w => w.id === selectedWorkflow);

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
              background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px"
            }}>
              🔄
            </div>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#1f2937" }}>
                Document Platform Orchestrator
              </h1>
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0" }}>
                Execute multi-skill workflows: report-to-presentation, data-to-infographic
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1rem" }}>

        {/* Workflow Selection */}
        <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
            Select Workflow
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                onClick={() => setSelectedWorkflow(workflow.id)}
                style={{
                  background: selectedWorkflow === workflow.id ? "#f3f4f6" : "white",
                  border: selectedWorkflow === workflow.id ? "2px solid #667eea" : "2px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{workflow.icon}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                  {workflow.name}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: "1.4" }}>
                  {workflow.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {currentWorkflow && (
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>

            {/* Left Column: Workflow Steps */}
            <div>
              <div style={{ background: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                  Workflow Steps
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {currentWorkflow.steps.map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "1.25rem",
                        background: "#f9fafb",
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb"
                      }}
                    >
                      <div style={{
                        width: "36px",
                        height: "36px",
                        background: "#667eea",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "700",
                        fontSize: "0.95rem",
                        flexShrink: 0
                      }}>
                        {idx + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937" }}>
                          {step}
                        </div>
                      </div>
                      {idx < currentWorkflow.steps.length - 1 && (
                        <div style={{ color: "#9ca3af", fontSize: "1.25rem" }}>→</div>
                      )}
                    </div>
                  ))}
                </div>

                {currentWorkflow.id !== "custom-workflow" && (
                  <div style={{
                    marginTop: "2rem",
                    padding: "1rem",
                    background: "#f0f9ff",
                    borderRadius: "8px"
                  }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#0369a1", marginBottom: "0.5rem" }}>
                      Required Inputs:
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#0369a1" }}>
                      Upload source file or provide initial data to begin workflow
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Skills & Execute */}
            <div>
              {/* Skills Used */}
              <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                  Skills Used
                </h2>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {currentWorkflow.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "0.85rem",
                        background: "#f3f4f6",
                        color: "#1f2937",
                        padding: "0.5rem 1rem",
                        borderRadius: "999px",
                        border: "1px solid #e5e7eb",
                        fontWeight: "500"
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platform Stats */}
              <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                  Platform Stats
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>Total Skills</span>
                    <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "#1f2937" }}>17</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>Pre-built Workflows</span>
                    <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "#1f2937" }}>4</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>Categories</span>
                    <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "#1f2937" }}>5</span>
                  </div>
                </div>
              </div>

              {/* Execute Button */}
              <button
                onClick={handleExecute}
                disabled={isExecuting}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                  color: "white",
                  border: "none",
                  padding: "1rem",
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  cursor: isExecuting ? "not-allowed" : "pointer",
                  opacity: isExecuting ? 0.6 : 1,
                  boxShadow: "0 4px 12px rgba(5,150,105,0.3)"
                }}
              >
                {isExecuting ? "Executing Workflow..." : "Execute Workflow"}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
