"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export default function PdfProcessorPage() {
  const router = useRouter();
  const [selectedFeature, setSelectedFeature] = useState<string>("merge");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Merge feature state
  const [mergeFiles, setMergeFiles] = useState<FileList | null>(null);

  // Split feature state
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(1);

  // Extract text feature state
  const [extractFile, setExtractFile] = useState<File | null>(null);

  // Info feature state
  const [infoFile, setInfoFile] = useState<File | null>(null);

  // Rotate feature state
  const [rotateFile, setRotateFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState<number>(90);

  // Delete pages feature state
  const [deleteFile, setDeleteFile] = useState<File | null>(null);
  const [pagesToDelete, setPagesToDelete] = useState<string>("");

  const features: Feature[] = [
    {
      id: "merge",
      name: "Merge PDFs",
      description: "Combine multiple PDF files into one document",
      icon: "🔗"
    },
    {
      id: "split",
      name: "Split PDF",
      description: "Extract specific pages from a PDF",
      icon: "✂️"
    },
    {
      id: "extract-text",
      name: "Extract Text",
      description: "Extract all text content from a PDF",
      icon: "📝"
    },
    {
      id: "info",
      name: "PDF Info",
      description: "Get metadata and page count",
      icon: "ℹ️"
    },
    {
      id: "rotate",
      name: "Rotate Pages",
      description: "Rotate all pages in a PDF",
      icon: "🔄"
    },
    {
      id: "delete",
      name: "Delete Pages",
      description: "Remove specific pages from a PDF",
      icon: "🗑️"
    }
  ];

  const handleMerge = async () => {
    if (!mergeFiles || mergeFiles.length < 2) {
      alert("Please select at least 2 PDF files to merge");
      return;
    }

    setProcessing(true);
    setResult(null);

    try {
      const formData = new FormData();
      for (let i = 0; i < mergeFiles.length; i++) {
        formData.append("files", mergeFiles[i]);
      }

      const response = await fetch("http://localhost:8000/api/pdf/merge", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "merged.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        setResult({ success: true, message: "PDFs merged successfully!" });
      } else {
        const error = await response.json();
        setResult({ success: false, message: error.detail || "Failed to merge PDFs" });
      }
    } catch (error) {
      console.error("Error merging PDFs:", error);
      setResult({ success: false, message: "Error merging PDFs" });
    } finally {
      setProcessing(false);
    }
  };

  const handleSplit = async () => {
    if (!splitFile) {
      alert("Please select a PDF file");
      return;
    }

    setProcessing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", splitFile);
      formData.append("start_page", startPage.toString());
      formData.append("end_page", endPage.toString());

      const response = await fetch("http://localhost:8000/api/pdf/split", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `pages_${startPage}-${endPage}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        setResult({ success: true, message: `Pages ${startPage}-${endPage} extracted successfully!` });
      } else {
        const error = await response.json();
        setResult({ success: false, message: error.detail || "Failed to split PDF" });
      }
    } catch (error) {
      console.error("Error splitting PDF:", error);
      setResult({ success: false, message: "Error splitting PDF" });
    } finally {
      setProcessing(false);
    }
  };

  const handleExtractText = async () => {
    if (!extractFile) {
      alert("Please select a PDF file");
      return;
    }

    setProcessing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", extractFile);

      const response = await fetch("http://localhost:8000/api/pdf/extract-text", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setResult({
          success: true,
          message: "Text extracted successfully!",
          text: data.text,
          filename: data.filename
        });
      } else {
        const error = await response.json();
        setResult({ success: false, message: error.detail || "Failed to extract text" });
      }
    } catch (error) {
      console.error("Error extracting text:", error);
      setResult({ success: false, message: "Error extracting text" });
    } finally {
      setProcessing(false);
    }
  };

  const handleGetInfo = async () => {
    if (!infoFile) {
      alert("Please select a PDF file");
      return;
    }

    setProcessing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", infoFile);

      const response = await fetch("http://localhost:8000/api/pdf/info", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setResult({
          success: true,
          message: "PDF info retrieved successfully!",
          info: data
        });
      } else {
        const error = await response.json();
        setResult({ success: false, message: error.detail || "Failed to get PDF info" });
      }
    } catch (error) {
      console.error("Error getting PDF info:", error);
      setResult({ success: false, message: "Error getting PDF info" });
    } finally {
      setProcessing(false);
    }
  };

  const handleRotate = async () => {
    if (!rotateFile) {
      alert("Please select a PDF file");
      return;
    }

    setProcessing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", rotateFile);
      formData.append("rotation", rotation.toString());

      const response = await fetch("http://localhost:8000/api/pdf/rotate", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `rotated_${rotation}_${rotateFile.name}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        setResult({ success: true, message: `PDF rotated ${rotation}° successfully!` });
      } else {
        const error = await response.json();
        setResult({ success: false, message: error.detail || "Failed to rotate PDF" });
      }
    } catch (error) {
      console.error("Error rotating PDF:", error);
      setResult({ success: false, message: "Error rotating PDF" });
    } finally {
      setProcessing(false);
    }
  };

  const handleDeletePages = async () => {
    if (!deleteFile) {
      alert("Please select a PDF file");
      return;
    }

    if (!pagesToDelete.trim()) {
      alert("Please enter page numbers to delete");
      return;
    }

    setProcessing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", deleteFile);
      formData.append("pages", pagesToDelete);

      const response = await fetch("http://localhost:8000/api/pdf/delete-pages", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `edited_${deleteFile.name}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        setResult({ success: true, message: "Pages deleted successfully!" });
      } else {
        const error = await response.json();
        setResult({ success: false, message: error.detail || "Failed to delete pages" });
      }
    } catch (error) {
      console.error("Error deleting pages:", error);
      setResult({ success: false, message: "Error deleting pages" });
    } finally {
      setProcessing(false);
    }
  };

  const handleProcess = () => {
    switch (selectedFeature) {
      case "merge":
        handleMerge();
        break;
      case "split":
        handleSplit();
        break;
      case "extract-text":
        handleExtractText();
        break;
      case "info":
        handleGetInfo();
        break;
      case "rotate":
        handleRotate();
        break;
      case "delete":
        handleDeletePages();
        break;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "1rem",
              fontSize: "0.95rem"
            }}
          >
            ← Back to Dashboard
          </button>

          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "white",
            marginBottom: "0.5rem"
          }}>
            📄 PDF Processor
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem" }}>
            Merge, split, extract text, rotate, and manipulate PDF documents
          </p>
        </div>

        {/* Feature Selector */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "2rem",
          marginBottom: "2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "1.5rem"
          }}>
            Select Feature
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem"
          }}>
            {features.map((feature) => (
              <div
                key={feature.id}
                onClick={() => {
                  setSelectedFeature(feature.id);
                  setResult(null);
                }}
                style={{
                  padding: "1.5rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  border: selectedFeature === feature.id
                    ? "3px solid #ef4444"
                    : "2px solid #e5e7eb",
                  background: selectedFeature === feature.id
                    ? "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)"
                    : "white",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  {feature.icon}
                </div>
                <div style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "0.25rem"
                }}>
                  {feature.name}
                </div>
                <div style={{
                  fontSize: "0.85rem",
                  color: "#6b7280"
                }}>
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Form Based on Selected Feature */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}>
          {selectedFeature === "merge" && (
            <>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
                Merge Multiple PDFs
              </h3>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                  Select PDF Files (minimum 2)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={(e) => setMergeFiles(e.target.files)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "0.95rem"
                  }}
                />
                {mergeFiles && (
                  <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#6b7280" }}>
                    {mergeFiles.length} file(s) selected
                  </p>
                )}
              </div>
            </>
          )}

          {selectedFeature === "split" && (
            <>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
                Split PDF by Page Range
              </h3>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                  Select PDF File
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSplitFile(e.target.files?.[0] || null)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "0.95rem"
                  }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                    Start Page
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={startPage}
                    onChange={(e) => setStartPage(parseInt(e.target.value) || 1)}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "0.95rem"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                    End Page
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={endPage}
                    onChange={(e) => setEndPage(parseInt(e.target.value) || 1)}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "0.95rem"
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {selectedFeature === "extract-text" && (
            <>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
                Extract Text from PDF
              </h3>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                  Select PDF File
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setExtractFile(e.target.files?.[0] || null)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "0.95rem"
                  }}
                />
              </div>
            </>
          )}

          {selectedFeature === "info" && (
            <>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
                Get PDF Information
              </h3>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                  Select PDF File
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setInfoFile(e.target.files?.[0] || null)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "0.95rem"
                  }}
                />
              </div>
            </>
          )}

          {selectedFeature === "rotate" && (
            <>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
                Rotate PDF Pages
              </h3>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                  Select PDF File
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setRotateFile(e.target.files?.[0] || null)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "0.95rem"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                  Rotation Angle
                </label>
                <select
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "0.95rem"
                  }}
                >
                  <option value={90}>90° Clockwise</option>
                  <option value={180}>180° (Upside Down)</option>
                  <option value={270}>270° Clockwise (90° Counter-clockwise)</option>
                </select>
              </div>
            </>
          )}

          {selectedFeature === "delete" && (
            <>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
                Delete Pages from PDF
              </h3>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                  Select PDF File
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setDeleteFile(e.target.files?.[0] || null)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "0.95rem"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                  Pages to Delete (comma-separated, e.g., "1,3,5")
                </label>
                <input
                  type="text"
                  placeholder="1,3,5"
                  value={pagesToDelete}
                  onChange={(e) => setPagesToDelete(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "0.95rem"
                  }}
                />
              </div>
            </>
          )}

          {/* Process Button */}
          <button
            onClick={handleProcess}
            disabled={processing}
            style={{
              marginTop: "2rem",
              width: "100%",
              padding: "1rem",
              background: processing ? "#9ca3af" : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: processing ? "not-allowed" : "pointer",
              boxShadow: processing ? "none" : "0 4px 12px rgba(239,68,68,0.3)"
            }}
          >
            {processing ? "Processing..." : "Process PDF"}
          </button>

          {/* Result Display */}
          {result && (
            <div style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: result.success ? "#d1fae5" : "#fee2e2",
              border: `2px solid ${result.success ? "#10b981" : "#ef4444"}`,
              borderRadius: "8px"
            }}>
              <div style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: result.success ? "#065f46" : "#991b1b",
                marginBottom: result.text || result.info ? "1rem" : "0"
              }}>
                {result.message}
              </div>

              {result.text && (
                <div style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  background: "white",
                  borderRadius: "8px",
                  maxHeight: "300px",
                  overflowY: "auto"
                }}>
                  <div style={{ fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>
                    Extracted Text:
                  </div>
                  <pre style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    fontSize: "0.9rem",
                    color: "#4b5563",
                    margin: 0
                  }}>
                    {result.text}
                  </pre>
                </div>
              )}

              {result.info && (
                <div style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  background: "white",
                  borderRadius: "8px"
                }}>
                  <div style={{ fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>
                    PDF Information:
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#4b5563" }}>
                    <p style={{ margin: "0.25rem 0" }}>
                      <strong>Filename:</strong> {result.info.filename}
                    </p>
                    <p style={{ margin: "0.25rem 0" }}>
                      <strong>Pages:</strong> {result.info.num_pages}
                    </p>
                    {result.info.metadata?.title && (
                      <p style={{ margin: "0.25rem 0" }}>
                        <strong>Title:</strong> {result.info.metadata.title}
                      </p>
                    )}
                    {result.info.metadata?.author && (
                      <p style={{ margin: "0.25rem 0" }}>
                        <strong>Author:</strong> {result.info.metadata.author}
                      </p>
                    )}
                    {result.info.metadata?.subject && (
                      <p style={{ margin: "0.25rem 0" }}>
                        <strong>Subject:</strong> {result.info.metadata.subject}
                      </p>
                    )}
                    {result.info.metadata?.creator && (
                      <p style={{ margin: "0.25rem 0" }}>
                        <strong>Creator:</strong> {result.info.metadata.creator}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
