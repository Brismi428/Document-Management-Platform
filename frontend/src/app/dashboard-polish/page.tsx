"use client";

import { useState } from "react";

export default function PolishPage() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handlePolish = async () => {
    if (!file || !selectedBrand) return;

    setProcessing(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("brand", selectedBrand);

    try {
      const response = await fetch("/api/polish", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `polished_${file.name}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error polishing document:", error);
    } finally {
      setProcessing(false);
    }
  };

  const selectedBrandData = brands.find(b => b.id === selectedBrand);

  return (
    <>
      <style jsx>{`
        @media (max-width: 1280px) {
          .three-col-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .brand-grid {
            grid-template-columns: 1fr !important;
          }
          .header-title {
            font-size: 1.75rem !important;
          }
          .icon-box {
            width: 48px !important;
            height: 48px !important;
            font-size: 24px !important;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        {/* Header */}
        <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "1.5rem 1rem" }}>
          <div style={{ maxWidth: "1600px", margin: "0 auto", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div className="icon-box" style={{
              width: "64px",
              height: "64px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              color: "white",
              fontWeight: "bold",
              flexShrink: 0
            }}>
              ✨
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 className="header-title" style={{ fontSize: "2.5rem", fontWeight: "bold", margin: 0, color: "#1f2937" }}>
                Document Polisher
              </h1>
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0", fontSize: "0.95rem" }}>
                Transform your documents with premium brand styling
              </p>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "2rem 1rem" }}>
          <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "350px 1fr 400px", gap: "1.5rem" }}>

            {/* Left Column - Controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Upload Card */}
              <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <div style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", padding: "1.25rem", color: "white" }}>
                  <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}>📁 Step 1: Upload</h2>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <input
                    type="file"
                    accept=".docx"
                    onChange={handleFileChange}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "2px dashed #cbd5e1",
                      borderRadius: "12px",
                      cursor: "pointer",
                      background: "#f8fafc",
                      fontSize: "0.875rem"
                    }}
                  />
                  {file && (
                    <div style={{
                      marginTop: "1rem",
                      padding: "1rem",
                      background: "#d1fae5",
                      borderRadius: "12px",
                      border: "1px solid #10b981"
                    }}>
                      <div style={{ fontWeight: "600", color: "#065f46", fontSize: "0.9rem", wordBreak: "break-word" }}>
                        ✓ {file.name}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#047857", marginTop: "0.25rem" }}>Ready to polish</div>
                    </div>
                  )}
                  {!file && (
                    <div style={{
                      marginTop: "1rem",
                      padding: "1rem",
                      background: "#f8fafc",
                      borderRadius: "12px",
                      border: "2px dashed #cbd5e1",
                      textAlign: "center"
                    }}>
                      <p style={{ margin: 0, fontSize: "0.875rem", color: "#64748b" }}>
                        Choose a .docx file
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Polish Button Card */}
              <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <div style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)", padding: "1.25rem", color: "white" }}>
                  <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}>✨ Step 3: Polish</h2>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <button
                    onClick={handlePolish}
                    disabled={!file || !selectedBrand || processing}
                    style={{
                      width: "100%",
                      padding: "1.25rem",
                      background: (!file || !selectedBrand || processing) ? "#9ca3af" : "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      cursor: (!file || !selectedBrand || processing) ? "not-allowed" : "pointer",
                      boxShadow: (!file || !selectedBrand || processing) ? "none" : "0 4px 12px rgba(139,92,246,0.4)",
                      transition: "all 0.2s"
                    }}
                  >
                    {processing ? "⏳ Processing..." : "✨ Polish Document"}
                  </button>

                  {selectedBrandData && file && (
                    <div style={{
                      marginTop: "1.25rem",
                      padding: "1rem",
                      background: "#ede9fe",
                      borderRadius: "12px",
                      border: "1px solid #8b5cf6"
                    }}>
                      <div style={{ fontSize: "0.8rem", fontWeight: "600", color: "#5b21b6", marginBottom: "0.5rem" }}>
                        Selected Style:
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <div style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "6px",
                            background: selectedBrandData.colors.primary,
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            flexShrink: 0
                          }} />
                          <div style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "6px",
                            background: selectedBrandData.colors.accent,
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            flexShrink: 0
                          }} />
                        </div>
                        <span style={{ fontWeight: "600", color: "#6d28d9", fontSize: "0.9rem" }}>
                          {selectedBrandData.name}
                        </span>
                      </div>
                    </div>
                  )}

                  {!file && (
                    <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#6b7280", textAlign: "center", margin: "1rem 0 0 0" }}>
                      Upload a document to continue
                    </p>
                  )}
                  {file && !selectedBrand && (
                    <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#6b7280", textAlign: "center", margin: "1rem 0 0 0" }}>
                      Select a brand style to continue
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Middle Column - Brand Selection */}
            <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <div style={{ background: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)", padding: "1.25rem", color: "white" }}>
                <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}>🎨 Step 2: Choose Brand</h2>
              </div>
              <div style={{ padding: "1.5rem", maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
                <div className="brand-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                  {brands.map((brand) => {
                    const isSelected = selectedBrand === brand.id;
                    return (
                      <button
                        key={brand.id}
                        onClick={() => setSelectedBrand(brand.id)}
                        style={{
                          padding: "1.25rem",
                          borderRadius: "12px",
                          border: isSelected ? "3px solid #8b5cf6" : "2px solid #e5e7eb",
                          background: isSelected ? "#f3f4f6" : "white",
                          cursor: "pointer",
                          textAlign: "left",
                          position: "relative",
                          boxShadow: isSelected ? "0 4px 12px rgba(139,92,246,0.2)" : "0 1px 3px rgba(0,0,0,0.1)",
                          transition: "all 0.2s"
                        }}
                      >
                        {isSelected && (
                          <div style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            width: "28px",
                            height: "28px",
                            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.95rem",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                          }}>
                            ✓
                          </div>
                        )}

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem", gap: "0.5rem" }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: "700", color: "#1f2937", wordBreak: "break-word" }}>
                              {brand.name}
                            </h3>
                            <span style={{
                              display: "inline-block",
                              fontSize: "0.7rem",
                              padding: "0.25rem 0.65rem",
                              borderRadius: "999px",
                              background: isSelected ? "#ddd6fe" : "#f3f4f6",
                              color: isSelected ? "#5b21b6" : "#6b7280",
                              marginTop: "0.5rem",
                              fontWeight: "500"
                            }}>
                              {brand.category}
                            </span>
                          </div>
                          <div style={{ display: "flex", gap: "0.375rem", flexShrink: 0 }}>
                            <div style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "4px",
                              background: brand.colors.primary,
                              boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                            }} />
                            <div style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "4px",
                              background: brand.colors.accent,
                              boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                            }} />
                          </div>
                        </div>

                        <p style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280", lineHeight: 1.4 }}>
                          {brand.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Live Preview */}
            <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <div style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", padding: "1.25rem", color: "white" }}>
                <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}>👁️ Live Preview</h2>
              </div>
              <div style={{ padding: "1.5rem", maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
                {selectedBrandData ? (
                  <div style={{ background: "white", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "1.5rem" }}>
                    {/* Document Preview */}
                    <div style={{
                      background: "white",
                      padding: "2rem",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      fontFamily: selectedBrandData.typography?.bodyFont || "Arial, sans-serif"
                    }}>
                      {/* Heading 1 Preview */}
                      <h1 style={{
                        color: selectedBrandData.styles.h1.color,
                        fontSize: `${selectedBrandData.styles.h1.size}px`,
                        fontWeight: selectedBrandData.styles.h1.bold ? "bold" : "normal",
                        fontFamily: selectedBrandData.typography?.headingFont || "Arial, sans-serif",
                        marginBottom: "1rem",
                        lineHeight: 1.2
                      }}>
                        Document Title
                      </h1>

                      {/* Heading 2 Preview */}
                      <h2 style={{
                        color: selectedBrandData.styles.h2.color,
                        fontSize: `${selectedBrandData.styles.h2.size}px`,
                        fontWeight: selectedBrandData.styles.h2.bold ? "bold" : "normal",
                        fontFamily: selectedBrandData.typography?.headingFont || "Arial, sans-serif",
                        marginBottom: "0.75rem",
                        marginTop: "1.5rem",
                        lineHeight: 1.3
                      }}>
                        Section Heading
                      </h2>

                      {/* Body Text Preview */}
                      <p style={{
                        color: selectedBrandData.styles.body.color,
                        fontSize: `${selectedBrandData.styles.body.size}px`,
                        lineHeight: 1.6,
                        marginBottom: "1rem"
                      }}>
                        This is how your body text will appear in the polished document. The font, size, and color are all applied based on the {selectedBrandData.name} brand guidelines.
                      </p>

                      {/* Heading 3 Preview */}
                      <h3 style={{
                        color: selectedBrandData.styles.h3.color,
                        fontSize: `${selectedBrandData.styles.h3.size}px`,
                        fontWeight: selectedBrandData.styles.h3.bold ? "bold" : "normal",
                        fontFamily: selectedBrandData.typography?.headingFont || "Arial, sans-serif",
                        marginBottom: "0.5rem",
                        marginTop: "1.25rem",
                        lineHeight: 1.4
                      }}>
                        Subsection Title
                      </h3>

                      <p style={{
                        color: selectedBrandData.styles.body.color,
                        fontSize: `${selectedBrandData.styles.body.size}px`,
                        lineHeight: 1.6,
                        marginBottom: "0.75rem"
                      }}>
                        Additional paragraph text to show consistency in styling.
                      </p>

                      {/* Color Palette */}
                      <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#f9fafb", borderRadius: "6px" }}>
                        <div style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6b7280", marginBottom: "0.75rem" }}>
                          BRAND COLORS
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                          <div style={{ textAlign: "center" }}>
                            <div style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "8px",
                              background: selectedBrandData.colors.primary,
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              marginBottom: "0.25rem"
                            }} />
                            <div style={{ fontSize: "0.65rem", color: "#6b7280" }}>Primary</div>
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <div style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "8px",
                              background: selectedBrandData.colors.accent,
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              marginBottom: "0.25rem"
                            }} />
                            <div style={{ fontSize: "0.65rem", color: "#6b7280" }}>Accent</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    padding: "3rem 1.5rem",
                    textAlign: "center",
                    color: "#9ca3af",
                    background: "#f9fafb",
                    borderRadius: "12px",
                    border: "2px dashed #e5e7eb"
                  }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👈</div>
                    <p style={{ fontSize: "0.95rem", margin: 0 }}>
                      Select a brand to see a live preview of how your document will be styled
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const brands = [
  {
    id: "economist",
    name: "The Economist",
    category: "Editorial",
    description: "Reports, analysis, thought leadership",
    colors: { primary: "#E3120B", accent: "#1F2E7A" },
    typography: { headingFont: "Georgia", bodyFont: "Georgia" },
    styles: {
      h1: { size: 32, color: "#E3120B", bold: true },
      h2: { size: 24, color: "#1F2E7A", bold: true },
      h3: { size: 16, color: "#1F2E7A", bold: true },
      body: { size: 11, color: "#000000" }
    }
  },
  {
    id: "mckinsey",
    name: "McKinsey",
    category: "Consulting",
    description: "Strategy decks, executive summaries",
    colors: { primary: "#2251FF", accent: "#051C2C" },
    typography: { headingFont: "Arial", bodyFont: "Arial" },
    styles: {
      h1: { size: 28, color: "#051C2C", bold: true },
      h2: { size: 20, color: "#2251FF", bold: true },
      h3: { size: 14, color: "#051C2C", bold: true },
      body: { size: 11, color: "#000000" }
    }
  },
  {
    id: "deloitte",
    name: "Deloitte",
    category: "Consulting",
    description: "Audits, assessments, formal reports",
    colors: { primary: "#007CB0", accent: "#0076A8" },
    typography: { headingFont: "Arial", bodyFont: "Arial" },
    styles: {
      h1: { size: 26, color: "#007CB0", bold: true },
      h2: { size: 18, color: "#0076A8", bold: true },
      h3: { size: 14, color: "#007CB0", bold: true },
      body: { size: 11, color: "#000000" }
    }
  },
  {
    id: "kpmg",
    name: "KPMG",
    category: "Consulting",
    description: "Financial reports, compliance docs",
    colors: { primary: "#005EB8", accent: "#00338D" },
    typography: { headingFont: "Arial", bodyFont: "Arial" },
    styles: {
      h1: { size: 28, color: "#005EB8", bold: true },
      h2: { size: 20, color: "#00338D", bold: true },
      h3: { size: 14, color: "#005EB8", bold: true },
      body: { size: 11, color: "#000000" }
    }
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Tech",
    description: "API docs, developer guides",
    colors: { primary: "#0A2540", accent: "#635BFF" },
    typography: { headingFont: "Arial", bodyFont: "Arial" },
    styles: {
      h1: { size: 32, color: "#0A2540", bold: true },
      h2: { size: 24, color: "#635BFF", bold: true },
      h3: { size: 16, color: "#0A2540", bold: true },
      body: { size: 12, color: "#425466" }
    }
  },
  {
    id: "apple",
    name: "Apple",
    category: "Tech",
    description: "Product docs, user guides",
    colors: { primary: "#0071E3", accent: "#0066CC" },
    typography: { headingFont: "Arial", bodyFont: "Arial" },
    styles: {
      h1: { size: 32, color: "#1D1D1F", bold: true },
      h2: { size: 24, color: "#0071E3", bold: true },
      h3: { size: 16, color: "#1D1D1F", bold: true },
      body: { size: 12, color: "#1D1D1F" }
    }
  },
  {
    id: "ibm",
    name: "IBM",
    category: "Tech",
    description: "Technical docs, enterprise reports",
    colors: { primary: "#0F62FE", accent: "#161616" },
    typography: { headingFont: "Arial", bodyFont: "Arial" },
    styles: {
      h1: { size: 28, color: "#161616", bold: true },
      h2: { size: 20, color: "#0F62FE", bold: true },
      h3: { size: 14, color: "#161616", bold: true },
      body: { size: 11, color: "#161616" }
    }
  },
  {
    id: "linear",
    name: "Linear",
    category: "Tech",
    description: "Product specs, changelogs",
    colors: { primary: "#5E6AD2", accent: "#A1A7C1" },
    typography: { headingFont: "Arial", bodyFont: "Arial" },
    styles: {
      h1: { size: 30, color: "#2E3048", bold: true },
      h2: { size: 22, color: "#5E6AD2", bold: true },
      h3: { size: 16, color: "#2E3048", bold: true },
      body: { size: 12, color: "#2E3048" }
    }
  },
  {
    id: "notion",
    name: "Notion",
    category: "Productivity",
    description: "Wikis, documentation",
    colors: { primary: "#2383E2", accent: "#0075DE" },
    typography: { headingFont: "Arial", bodyFont: "Arial" },
    styles: {
      h1: { size: 32, color: "#000000", bold: true },
      h2: { size: 24, color: "#2383E2", bold: true },
      h3: { size: 16, color: "#000000", bold: true },
      body: { size: 12, color: "#37352F" }
    }
  },
  {
    id: "figma",
    name: "Figma",
    category: "Design",
    description: "Creative briefs, brand guidelines",
    colors: { primary: "#A259FF", accent: "#FF7262" },
    typography: { headingFont: "Arial", bodyFont: "Arial" },
    styles: {
      h1: { size: 32, color: "#1E1E1E", bold: true },
      h2: { size: 24, color: "#A259FF", bold: true },
      h3: { size: 16, color: "#1E1E1E", bold: true },
      body: { size: 12, color: "#1E1E1E" }
    }
  },
];
