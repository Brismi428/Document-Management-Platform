"use client";

import { useRouter } from "next/navigation";

export default function BrandGuidelinesPage() {
  const router = useRouter();

  const brandColors = {
    primary: [
      { name: "Claude Purple", hex: "#7E3AF2", usage: "Primary brand color" },
      { name: "Anthropic Navy", hex: "#1A1F36", usage: "Text and headers" },
      { name: "Warm Orange", hex: "#F59E0B", usage: "Accents and CTAs" }
    ],
    secondary: [
      { name: "Light Purple", hex: "#C4B5FD", usage: "Backgrounds" },
      { name: "Slate Gray", hex: "#64748B", usage: "Secondary text" },
      { name: "Cream", hex: "#FEF3C7", usage: "Highlights" }
    ]
  };

  const typography = {
    heading: { font: "Inter", weight: "700", usage: "Headlines and titles" },
    body: { font: "Inter", weight: "400", usage: "Body text and paragraphs" },
    code: { font: "JetBrains Mono", weight: "400", usage: "Code snippets" }
  };

  const logoGuidelines = [
    { rule: "Minimum size", value: "32px height" },
    { rule: "Clear space", value: "Equal to logo height on all sides" },
    { rule: "Background colors", value: "White or Claude Purple only" },
    { rule: "Modifications", value: "Do not rotate, skew, or add effects" }
  ];

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
              background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px"
            }}>
              🎯
            </div>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#1f2937" }}>
                Brand Guidelines
              </h1>
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0" }}>
                Access Anthropic's official brand colors, typography, and styles
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1rem" }}>

        {/* Brand Colors */}
        <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
            Brand Colors
          </h2>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>
              Primary Colors
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {brandColors.primary.map((color, idx) => (
                <div key={idx} style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "100px",
                    background: color.hex
                  }} />
                  <div style={{ padding: "1rem" }}>
                    <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                      {color.name}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                      {color.hex}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                      {color.usage}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>
              Secondary Colors
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {brandColors.secondary.map((color, idx) => (
                <div key={idx} style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "100px",
                    background: color.hex
                  }} />
                  <div style={{ padding: "1rem" }}>
                    <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                      {color.name}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                      {color.hex}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                      {color.usage}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Typography */}
        <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
            Typography
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            <div style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "1.5rem"
            }}>
              <div style={{
                fontSize: "2rem",
                fontWeight: typography.heading.weight,
                fontFamily: typography.heading.font,
                color: "#1f2937",
                marginBottom: "1rem"
              }}>
                Aa
              </div>
              <div style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                Headings
              </div>
              <div style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                {typography.heading.font} · {typography.heading.weight}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                {typography.heading.usage}
              </div>
            </div>

            <div style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "1.5rem"
            }}>
              <div style={{
                fontSize: "2rem",
                fontWeight: typography.body.weight,
                fontFamily: typography.body.font,
                color: "#1f2937",
                marginBottom: "1rem"
              }}>
                Aa
              </div>
              <div style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                Body Text
              </div>
              <div style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                {typography.body.font} · {typography.body.weight}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                {typography.body.usage}
              </div>
            </div>

            <div style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "1.5rem"
            }}>
              <div style={{
                fontSize: "2rem",
                fontWeight: typography.code.weight,
                fontFamily: typography.code.font,
                color: "#1f2937",
                marginBottom: "1rem"
              }}>
                &lt;/&gt;
              </div>
              <div style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                Code
              </div>
              <div style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                {typography.code.font} · {typography.code.weight}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                {typography.code.usage}
              </div>
            </div>
          </div>
        </div>

        {/* Logo Guidelines */}
        <div style={{ background: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
            Logo Usage Guidelines
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {logoGuidelines.map((guideline, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                    {guideline.rule}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                    {guideline.value}
                  </div>
                </div>
                <div style={{
                  width: "40px",
                  height: "40px",
                  background: "#f3f4f6",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem"
                }}>
                  ✓
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#fef3c7",
            borderRadius: "8px",
            fontSize: "0.9rem",
            color: "#92400e"
          }}>
            ⚠️ These brand guidelines are for reference. Always check official Anthropic brand documentation for the most up-to-date guidelines.
          </div>
        </div>

      </div>
    </div>
  );
}
