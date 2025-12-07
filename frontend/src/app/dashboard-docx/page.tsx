"use client";

import { useState } from "react";

interface Template {
  id: string;
  name: string;
  description: string;
}

interface Section {
  heading: string;
  body: string;
}

export default function DocxCreatorPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("blank");
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState<Section[]>([
    { heading: "", body: "" }
  ]);
  const [creating, setCreating] = useState(false);

  // Template-specific fields
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  // Memo fields
  const [memoTo, setMemoTo] = useState("");
  const [memoFrom, setMemoFrom] = useState("");
  const [memoSubject, setMemoSubject] = useState("");
  const [memoBody, setMemoBody] = useState("");
  // Letter fields
  const [senderAddress, setSenderAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [letterBody, setLetterBody] = useState("");
  const [salutation, setSalutation] = useState("Dear Sir/Madam,");
  const [closing, setClosing] = useState("Sincerely,");
  const [signature, setSignature] = useState("");
  // Report fields
  const [executiveSummary, setExecutiveSummary] = useState("");

  const templates: Template[] = [
    { id: "blank", name: "Blank Document", description: "Start from scratch" },
    { id: "report", name: "Professional Report", description: "Structured report with sections" },
    { id: "memo", name: "Business Memo", description: "Internal memo format" },
    { id: "letter", name: "Business Letter", description: "Formal letter format" }
  ];

  const addSection = () => {
    setSections([...sections, { heading: "", body: "" }]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, field: "heading" | "body", value: string) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const handleCreate = async () => {
    setCreating(true);

    try {
      let requestBody: any = {};

      if (selectedTemplate === "blank") {
        requestBody = {
          title,
          sections
        };
      } else if (selectedTemplate === "memo") {
        requestBody = {
          template_type: "memo",
          to: memoTo,
          from_: memoFrom,
          subject: memoSubject,
          date,
          body: memoBody
        };
      } else if (selectedTemplate === "letter") {
        requestBody = {
          template_type: "letter",
          sender_address: senderAddress,
          recipient_address: recipientAddress,
          salutation,
          date,
          body: letterBody,
          closing,
          signature
        };
      } else if (selectedTemplate === "report") {
        requestBody = {
          template_type: "report",
          title,
          author,
          date,
          executive_summary: executiveSummary,
          sections
        };
      }

      const endpoint = selectedTemplate === "blank"
        ? "/api/docx/create"
        : "/api/docx/create-from-template";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedTemplate}_document.docx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error creating document:", error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @media (max-width: 1024px) {
          .two-col-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .template-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        {/* Header */}
        <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "1.5rem 1rem" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{
              width: "64px",
              height: "64px",
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              color: "white",
              fontWeight: "bold",
              flexShrink: 0
            }}>
              📝
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: 0, color: "#1f2937" }}>
                DOCX Creator
              </h1>
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0", fontSize: "0.95rem" }}>
                Create professional documents with templates
              </p>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem 1rem" }}>
          <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: "1.5rem" }}>

            {/* Left Column - Template Selection */}
            <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <div style={{ background: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)", padding: "1.25rem", color: "white" }}>
                <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}>🎨 Choose Template</h2>
              </div>
              <div style={{ padding: "1.5rem", maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
                <div className="template-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
                  {templates.map((template) => {
                    const isSelected = selectedTemplate === template.id;
                    return (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        style={{
                          padding: "1.25rem",
                          borderRadius: "12px",
                          border: isSelected ? "3px solid #3b82f6" : "2px solid #e5e7eb",
                          background: isSelected ? "#f3f4f6" : "white",
                          cursor: "pointer",
                          textAlign: "left",
                          boxShadow: isSelected ? "0 4px 12px rgba(59,130,246,0.2)" : "0 1px 3px rgba(0,0,0,0.1)",
                          transition: "all 0.2s"
                        }}
                      >
                        {isSelected && (
                          <div style={{
                            float: "right",
                            width: "24px",
                            height: "24px",
                            background: "#3b82f6",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "0.9rem",
                            fontWeight: "bold"
                          }}>
                            ✓
                          </div>
                        )}
                        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: "700", color: "#1f2937" }}>
                          {template.name}
                        </h3>
                        <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem", color: "#6b7280" }}>
                          {template.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Create Button */}
                <button
                  onClick={handleCreate}
                  disabled={creating}
                  style={{
                    width: "100%",
                    marginTop: "1.5rem",
                    padding: "1.25rem",
                    background: creating ? "#9ca3af" : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    cursor: creating ? "not-allowed" : "pointer",
                    boxShadow: creating ? "none" : "0 4px 12px rgba(59,130,246,0.4)"
                  }}
                >
                  {creating ? "⏳ Creating..." : "📄 Create Document"}
                </button>
              </div>
            </div>

            {/* Right Column - Content Editor */}
            <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <div style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", padding: "1.25rem", color: "white" }}>
                <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}>✏️ Document Content</h2>
              </div>
              <div style={{ padding: "1.5rem", maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>

                {/* Blank Document Template */}
                {selectedTemplate === "blank" && (
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                      Document Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter document title"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "2px solid #e5e7eb",
                        fontSize: "0.95rem",
                        marginBottom: "1.5rem"
                      }}
                    />

                    {sections.map((section, index) => (
                      <div key={index} style={{ marginBottom: "1.5rem", padding: "1rem", background: "#f9fafb", borderRadius: "8px", position: "relative" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                          <label style={{ fontWeight: "600", color: "#374151" }}>Section {index + 1}</label>
                          {sections.length > 1 && (
                            <button
                              onClick={() => removeSection(index)}
                              style={{
                                padding: "0.25rem 0.75rem",
                                background: "#ef4444",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "0.85rem"
                              }}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={section.heading}
                          onChange={(e) => updateSection(index, "heading", e.target.value)}
                          placeholder="Section heading"
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "6px",
                            border: "1px solid #d1d5db",
                            fontSize: "0.9rem",
                            marginBottom: "0.5rem"
                          }}
                        />
                        <textarea
                          value={section.body}
                          onChange={(e) => updateSection(index, "body", e.target.value)}
                          placeholder="Section content"
                          rows={4}
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "6px",
                            border: "1px solid #d1d5db",
                            fontSize: "0.9rem",
                            resize: "vertical"
                          }}
                        />
                      </div>
                    ))}

                    <button
                      onClick={addSection}
                      style={{
                        padding: "0.75rem 1.5rem",
                        background: "#10b981",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "0.95rem",
                        fontWeight: "500"
                      }}
                    >
                      + Add Section
                    </button>
                  </div>
                )}

                {/* Report Template */}
                {selectedTemplate === "report" && (
                  <div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Report Title"
                      style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1rem" }}
                    />
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Author Name"
                      style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1rem" }}
                    />
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Date"
                      style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1rem" }}
                    />
                    <textarea
                      value={executiveSummary}
                      onChange={(e) => setExecutiveSummary(e.target.value)}
                      placeholder="Executive Summary"
                      rows={4}
                      style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1.5rem", resize: "vertical" }}
                    />

                    <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1rem" }}>Report Sections</h3>
                    {sections.map((section, index) => (
                      <div key={index} style={{ marginBottom: "1rem", padding: "1rem", background: "#f9fafb", borderRadius: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                          <label style={{ fontWeight: "600" }}>Section {index + 1}</label>
                          {sections.length > 1 && (
                            <button onClick={() => removeSection(index)} style={{ padding: "0.25rem 0.75rem", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}>
                              Remove
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={section.heading}
                          onChange={(e) => updateSection(index, "heading", e.target.value)}
                          placeholder="Section heading"
                          style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.9rem", marginBottom: "0.5rem" }}
                        />
                        <textarea
                          value={section.body}
                          onChange={(e) => updateSection(index, "body", e.target.value)}
                          placeholder="Section content"
                          rows={3}
                          style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.9rem", resize: "vertical" }}
                        />
                      </div>
                    ))}
                    <button onClick={addSection} style={{ padding: "0.75rem 1.5rem", background: "#10b981", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                      + Add Section
                    </button>
                  </div>
                )}

                {/* Memo Template */}
                {selectedTemplate === "memo" && (
                  <div>
                    <input type="text" value={memoTo} onChange={(e) => setMemoTo(e.target.value)} placeholder="To" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1rem" }} />
                    <input type="text" value={memoFrom} onChange={(e) => setMemoFrom(e.target.value)} placeholder="From" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1rem" }} />
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1rem" }} />
                    <input type="text" value={memoSubject} onChange={(e) => setMemoSubject(e.target.value)} placeholder="Subject" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1rem" }} />
                    <textarea value={memoBody} onChange={(e) => setMemoBody(e.target.value)} placeholder="Memo content" rows={8} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", resize: "vertical" }} />
                  </div>
                )}

                {/* Letter Template */}
                {selectedTemplate === "letter" && (
                  <div>
                    <textarea value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} placeholder="Your Address" rows={3} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1rem", resize: "vertical" }} />
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1rem" }} />
                    <textarea value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} placeholder="Recipient Address" rows={3} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1rem", resize: "vertical" }} />
                    <input type="text" value={salutation} onChange={(e) => setSalutation(e.target.value)} placeholder="Salutation" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1rem" }} />
                    <textarea value={letterBody} onChange={(e) => setLetterBody(e.target.value)} placeholder="Letter content" rows={6} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1rem", resize: "vertical" }} />
                    <input type="text" value={closing} onChange={(e) => setClosing(e.target.value)} placeholder="Closing" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem", marginBottom: "1rem" }} />
                    <input type="text" value={signature} onChange={(e) => setSignature(e.target.value)} placeholder="Your Name" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "2px solid #e5e7eb", fontSize: "0.95rem" }} />
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
