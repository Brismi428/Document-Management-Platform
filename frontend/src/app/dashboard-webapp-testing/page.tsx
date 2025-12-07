"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface TestType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export default function WebappTestingPage() {
  const router = useRouter();
  const [url, setUrl] = useState<string>("");
  const [testType, setTestType] = useState<string>("screenshot");
  const [selectors, setSelectors] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  const testTypes: TestType[] = [
    {
      id: "screenshot",
      name: "Screenshot",
      description: "Capture page screenshots at various viewports",
      icon: "📸"
    },
    {
      id: "click-test",
      name: "Click Test",
      description: "Test button/link interactions and navigation",
      icon: "👆"
    },
    {
      id: "form-fill",
      name: "Form Fill",
      description: "Test form inputs, validation, and submission",
      icon: "📝"
    },
    {
      id: "navigation",
      name: "Navigation Test",
      description: "Test routing and page transitions",
      icon: "🧭"
    },
    {
      id: "performance",
      name: "Performance",
      description: "Measure load times, metrics, and Core Web Vitals",
      icon: "⚡"
    }
  ];

  const handleRunTest = async () => {
    setIsRunning(true);
    try {
      const response = await fetch("http://localhost:8000/api/webapp-testing/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          test_type: testType,
          selectors: selectors ? selectors.split(",").map(s => s.trim()) : undefined
        })
      });
      const data = await response.json();
      console.log("Test results:", data);
      // TODO: Display test results
    } catch (error) {
      console.error("Test failed:", error);
    } finally {
      setIsRunning(false);
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
              background: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px"
            }}>
              🧪
            </div>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#1f2937" }}>
                Webapp Testing Suite
              </h1>
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0" }}>
                Playwright testing: screenshots, click tests, form fills, performance
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1rem" }}>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>

          {/* Left Column: Test Configuration */}
          <div>
            {/* Test Type Selection */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Select Test Type
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                {testTypes.map((test) => (
                  <div
                    key={test.id}
                    onClick={() => setTestType(test.id)}
                    style={{
                      background: testType === test.id ? "#f3f4f6" : "white",
                      border: testType === test.id ? "2px solid #667eea" : "2px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{test.icon}</div>
                    <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                      {test.name}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                      {test.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Configuration */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Test Configuration
              </h2>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                  Target URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.95rem"
                  }}
                />
              </div>

              {(testType === "click-test" || testType === "form-fill") && (
                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                    Selectors (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={selectors}
                    onChange={(e) => setSelectors(e.target.value)}
                    placeholder="button.submit, input#email, .nav-link"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "0.95rem"
                    }}
                  />
                  <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "0.5rem" }}>
                    Enter CSS selectors for elements to test
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Info & Run */}
          <div>
            {/* Test Info */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Test Details
              </h2>

              {testType === "screenshot" && (
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                    What it does:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.9rem", color: "#6b7280", lineHeight: "1.6" }}>
                    <li>Captures full-page screenshot</li>
                    <li>Tests at multiple viewports</li>
                    <li>Desktop, tablet, mobile views</li>
                    <li>Saves images for comparison</li>
                  </ul>
                </div>
              )}

              {testType === "click-test" && (
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                    What it does:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.9rem", color: "#6b7280", lineHeight: "1.6" }}>
                    <li>Clicks buttons and links</li>
                    <li>Verifies navigation works</li>
                    <li>Checks hover states</li>
                    <li>Reports broken interactions</li>
                  </ul>
                </div>
              )}

              {testType === "form-fill" && (
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                    What it does:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.9rem", color: "#6b7280", lineHeight: "1.6" }}>
                    <li>Fills form inputs</li>
                    <li>Tests validation rules</li>
                    <li>Checks error messages</li>
                    <li>Verifies submission</li>
                  </ul>
                </div>
              )}

              {testType === "navigation" && (
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                    What it does:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.9rem", color: "#6b7280", lineHeight: "1.6" }}>
                    <li>Tests page routing</li>
                    <li>Checks navigation menu</li>
                    <li>Verifies links work</li>
                    <li>Tests browser back/forward</li>
                  </ul>
                </div>
              )}

              {testType === "performance" && (
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                    What it does:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.9rem", color: "#6b7280", lineHeight: "1.6" }}>
                    <li>Measures load time</li>
                    <li>Core Web Vitals (LCP, FID, CLS)</li>
                    <li>Network waterfall</li>
                    <li>Performance score</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Run Test Button */}
            <button
              onClick={handleRunTest}
              disabled={isRunning || !url}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
                color: "white",
                border: "none",
                padding: "1rem",
                borderRadius: "12px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: (isRunning || !url) ? "not-allowed" : "pointer",
                opacity: (isRunning || !url) ? 0.6 : 1,
                boxShadow: "0 4px 12px rgba(168,85,247,0.3)"
              }}
            >
              {isRunning ? "Running Test..." : "Run Test"}
            </button>

            <div style={{
              marginTop: "1.5rem",
              padding: "1rem",
              background: "#f0f9ff",
              borderRadius: "8px",
              fontSize: "0.85rem",
              color: "#0369a1"
            }}>
              💡 Tests run in a real Chromium browser via Playwright
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
