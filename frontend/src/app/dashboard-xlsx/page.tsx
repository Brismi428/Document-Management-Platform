"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export default function SpreadsheetCreatorPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("blank");
  const [creating, setCreating] = useState(false);

  // Blank template state
  const [title, setTitle] = useState("");
  const [headers, setHeaders] = useState<string[]>(["Column 1", "Column 2", "Column 3"]);

  // Budget template state
  const [budgetYear, setBudgetYear] = useState(new Date().getFullYear().toString());
  const [budgetCategories, setBudgetCategories] = useState<string[]>([
    "Salaries",
    "Marketing",
    "Operations",
    "Technology"
  ]);

  // Financial model state
  const [companyName, setCompanyName] = useState("");
  const [modelYears, setModelYears] = useState<string[]>(["2025", "2026", "2027", "2028", "2029"]);

  // Data table state
  const [tableTitle, setTableTitle] = useState("");
  const [tableData, setTableData] = useState<string>('[\n  {"Name": "John", "Age": 30, "City": "New York"},\n  {"Name": "Jane", "Age": 25, "City": "Boston"}\n]');

  const templates: Template[] = [
    {
      id: "blank",
      name: "Blank Spreadsheet",
      description: "Create a blank spreadsheet with custom headers",
      icon: "📄"
    },
    {
      id: "budget",
      name: "Budget Template",
      description: "Quarterly budget tracker with automatic totals",
      icon: "💰"
    },
    {
      id: "financial-model",
      name: "Financial Model",
      description: "Basic financial projection model with formulas",
      icon: "📈"
    },
    {
      id: "data-table",
      name: "Data Table",
      description: "Convert structured data into formatted table",
      icon: "📊"
    }
  ];

  const handleCreate = async () => {
    setCreating(true);

    try {
      let endpoint = "";
      let requestBody: any = {};

      if (selectedTemplate === "blank") {
        endpoint = "http://localhost:8000/api/xlsx/create/blank";
        requestBody = { title, headers };
      } else if (selectedTemplate === "budget") {
        endpoint = "http://localhost:8000/api/xlsx/create/budget";
        requestBody = { year: budgetYear, categories: budgetCategories };
      } else if (selectedTemplate === "financial-model") {
        endpoint = "http://localhost:8000/api/xlsx/create/financial-model";
        requestBody = { company_name: companyName, years: modelYears };
      } else if (selectedTemplate === "data-table") {
        endpoint = "http://localhost:8000/api/xlsx/create/data-table";
        try {
          const parsedData = JSON.parse(tableData);
          requestBody = { title: tableTitle, data: parsedData };
        } catch (e) {
          alert("Invalid JSON data. Please check your input.");
          setCreating(false);
          return;
        }
      }

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
        a.download = `spreadsheet_${selectedTemplate}_${Date.now()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail || "Failed to create spreadsheet"}`);
      }
    } catch (error) {
      console.error("Error creating spreadsheet:", error);
      alert("Error creating spreadsheet");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>
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
            📊 Spreadsheet Creator
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem" }}>
            Build spreadsheets with formulas, formatting, and financial models
          </p>
        </div>

        {/* Template Selector */}
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
            Select Template
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem"
          }}>
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                style={{
                  padding: "1.5rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  border: selectedTemplate === template.id
                    ? "3px solid #10b981"
                    : "2px solid #e5e7eb",
                  background: selectedTemplate === template.id
                    ? "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)"
                    : "white",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  {template.icon}
                </div>
                <div style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "0.25rem"
                }}>
                  {template.name}
                </div>
                <div style={{
                  fontSize: "0.85rem",
                  color: "#6b7280"
                }}>
                  {template.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Form */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}>
          {selectedTemplate === "blank" && (
            <>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
                Blank Spreadsheet Settings
              </h3>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My Spreadsheet"
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
                  Column Headers (comma-separated)
                </label>
                <input
                  type="text"
                  value={headers.join(", ")}
                  onChange={(e) => setHeaders(e.target.value.split(",").map(h => h.trim()))}
                  placeholder="Name, Email, Phone"
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

          {selectedTemplate === "budget" && (
            <>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
                Budget Template Settings
              </h3>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                  Budget Year
                </label>
                <input
                  type="text"
                  value={budgetYear}
                  onChange={(e) => setBudgetYear(e.target.value)}
                  placeholder="2025"
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
                  Budget Categories (comma-separated)
                </label>
                <input
                  type="text"
                  value={budgetCategories.join(", ")}
                  onChange={(e) => setBudgetCategories(e.target.value.split(",").map(c => c.trim()))}
                  placeholder="Salaries, Marketing, Operations"
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

          {selectedTemplate === "financial-model" && (
            <>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
                Financial Model Settings
              </h3>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Corp"
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
                  Projection Years (comma-separated)
                </label>
                <input
                  type="text"
                  value={modelYears.join(", ")}
                  onChange={(e) => setModelYears(e.target.value.split(",").map(y => y.trim()))}
                  placeholder="2025, 2026, 2027, 2028, 2029"
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

          {selectedTemplate === "data-table" && (
            <>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
                Data Table Settings
              </h3>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
                  Table Title
                </label>
                <input
                  type="text"
                  value={tableTitle}
                  onChange={(e) => setTableTitle(e.target.value)}
                  placeholder="Employee Data"
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
                  Data (JSON format)
                </label>
                <textarea
                  value={tableData}
                  onChange={(e) => setTableData(e.target.value)}
                  rows={10}
                  placeholder='[{"Name": "John", "Age": 30}]'
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    fontFamily: "monospace"
                  }}
                />
                <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "0.5rem" }}>
                  Enter an array of objects. Keys will become column headers.
                </p>
              </div>
            </>
          )}

          {/* Create Button */}
          <button
            onClick={handleCreate}
            disabled={creating}
            style={{
              marginTop: "2rem",
              width: "100%",
              padding: "1rem",
              background: creating ? "#9ca3af" : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: creating ? "not-allowed" : "pointer",
              boxShadow: creating ? "none" : "0 4px 12px rgba(16,185,129,0.3)"
            }}
          >
            {creating ? "Creating Spreadsheet..." : "Create Spreadsheet"}
          </button>
        </div>
      </div>
    </div>
  );
}
