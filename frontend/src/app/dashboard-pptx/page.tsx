'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPPTXPage() {
  const router = useRouter()
  const [template, setTemplate] = useState('blank')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [templates] = useState([
    { id: 'blank', name: 'Blank Presentation', description: 'Start with a blank canvas', icon: '📄' },
    { id: 'business', name: 'Business Presentation', description: 'Professional business presentation template', icon: '💼' },
    { id: 'pitch', name: 'Investor Pitch', description: 'Template for startup pitch decks', icon: '🚀' },
    { id: 'report', name: 'Report Presentation', description: 'Quarterly or annual report template', icon: '📊' },
    { id: 'educational', name: 'Educational', description: 'Teaching and training presentation template', icon: '🎓' }
  ])

  const handleCreatePresentation = async () => {
    if (!title.trim()) {
      setMessage('Please enter a presentation title')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('http://localhost:8000/api/pptx/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template_type: template,
          title: title,
          subtitle: subtitle
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create presentation')
      }

      // Download the file
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title.replace(/\s+/g, '_')}.pptx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setMessage('Presentation created successfully!')
      setTitle('')
      setSubtitle('')
    } catch (error) {
      setMessage('Error creating presentation: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" }}>
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
            📽️ Presentation Builder
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem" }}>
            Create presentations with templates and design systems
          </p>
        </div>

        {/* Template Selection */}
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
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem"
          }}>
            {templates.map((t) => (
              <div
                key={t.id}
                onClick={() => setTemplate(t.id)}
                style={{
                  padding: "1.5rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  border: template === t.id
                    ? "3px solid #f59e0b"
                    : "2px solid #e5e7eb",
                  background: template === t.id
                    ? "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
                    : "white",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  {t.icon}
                </div>
                <div style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "0.25rem"
                }}>
                  {t.name}
                </div>
                <div style={{
                  fontSize: "0.85rem",
                  color: "#6b7280"
                }}>
                  {t.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Presentation Details Form */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem" }}>
            Presentation Details
          </h3>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
              Presentation Title <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Q4 2024 Business Review"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "0.95rem"
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
              Subtitle (Optional)
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Company Performance Highlights"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "0.95rem"
              }}
            />
          </div>

          {/* Message */}
          {message && (
            <div style={{
              marginBottom: "1.5rem",
              padding: "1.5rem",
              background: message.includes('Error') || message.includes('Please') ? "#fee2e2" : "#d1fae5",
              border: `2px solid ${message.includes('Error') || message.includes('Please') ? "#ef4444" : "#10b981"}`,
              borderRadius: "8px"
            }}>
              <div style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: message.includes('Error') || message.includes('Please') ? "#991b1b" : "#065f46"
              }}>
                {message}
              </div>
            </div>
          )}

          {/* Create Button */}
          <button
            onClick={handleCreatePresentation}
            disabled={loading}
            style={{
              width: "100%",
              padding: "1rem",
              background: loading ? "#9ca3af" : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 4px 12px rgba(245,158,11,0.3)"
            }}
          >
            {loading ? 'Creating Presentation...' : 'Create Presentation'}
          </button>

          {/* Features List */}
          <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "2px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#374151", marginBottom: "1rem" }}>
              Features
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "start", gap: "0.5rem" }}>
                <span style={{ color: "#10b981", fontSize: "1.25rem" }}>✓</span>
                <span style={{ color: "#4b5563", fontSize: "0.95rem" }}>Multiple professional templates</span>
              </div>
              <div style={{ display: "flex", alignItems: "start", gap: "0.5rem" }}>
                <span style={{ color: "#10b981", fontSize: "1.25rem" }}>✓</span>
                <span style={{ color: "#4b5563", fontSize: "0.95rem" }}>Business, pitch, and report layouts</span>
              </div>
              <div style={{ display: "flex", alignItems: "start", gap: "0.5rem" }}>
                <span style={{ color: "#10b981", fontSize: "1.25rem" }}>✓</span>
                <span style={{ color: "#4b5563", fontSize: "0.95rem" }}>Instant PPTX download</span>
              </div>
              <div style={{ display: "flex", alignItems: "start", gap: "0.5rem" }}>
                <span style={{ color: "#10b981", fontSize: "1.25rem" }}>✓</span>
                <span style={{ color: "#4b5563", fontSize: "0.95rem" }}>Standard .pptx format - works with all major office suites</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
