'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Theme {
  id: string
  name: string
  description: string
  category: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
}

export default function ThemeFactoryPage() {
  const router = useRouter()
  const [themes, setThemes] = useState<Theme[]>([])
  const [selectedTheme, setSelectedTheme] = useState<string>('ocean')
  const [documentType, setDocumentType] = useState<'docx' | 'pptx'>('docx')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Fetch themes from backend
    fetch('http://localhost:8000/api/themes/')
      .then(res => res.json())
      .then(data => setThemes(data.themes))
      .catch(err => console.error('Error fetching themes:', err))
  }, [])

  const handleApplyTheme = async () => {
    if (!file) {
      setMessage('Please select a file to apply the theme to')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('theme_id', selectedTheme)

      const endpoint = documentType === 'docx'
        ? 'http://localhost:8000/api/themes/apply-docx'
        : 'http://localhost:8000/api/themes/apply-pptx'

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to apply theme')
      }

      // Download the file
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const selectedThemeData = themes.find(t => t.id === selectedTheme)
      a.download = `themed_${selectedThemeData?.name.replace(/\s+/g, '_')}_${file.name}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setMessage('Theme applied successfully!')
      setFile(null)
    } catch (error) {
      setMessage('Error applying theme: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const selectedThemeData = themes.find(t => t.id === selectedTheme)

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)" }}>
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
            🎨 Theme Factory
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem" }}>
            Apply beautiful color and font themes to any document or presentation
          </p>
        </div>

        {/* Document Type Selector */}
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
            Select Document Type
          </h2>

          <div style={{ display: "flex", gap: "1rem" }}>
            <div
              onClick={() => setDocumentType('docx')}
              style={{
                flex: 1,
                padding: "1.5rem",
                borderRadius: "12px",
                cursor: "pointer",
                border: documentType === 'docx' ? "3px solid #ec4899" : "2px solid #e5e7eb",
                background: documentType === 'docx'
                  ? "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)"
                  : "white",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📝</div>
              <div style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                Document
              </div>
              <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                Apply theme to .docx files
              </div>
            </div>

            <div
              onClick={() => setDocumentType('pptx')}
              style={{
                flex: 1,
                padding: "1.5rem",
                borderRadius: "12px",
                cursor: "pointer",
                border: documentType === 'pptx' ? "3px solid #ec4899" : "2px solid #e5e7eb",
                background: documentType === 'pptx'
                  ? "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)"
                  : "white",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📽️</div>
              <div style={{ fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                Presentation
              </div>
              <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                Apply theme to .pptx files
              </div>
            </div>
          </div>
        </div>

        {/* Theme Selection */}
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
            Choose Your Theme
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem"
          }}>
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                style={{
                  padding: "1.25rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  border: selectedTheme === theme.id ? "3px solid #ec4899" : "2px solid #e5e7eb",
                  background: selectedTheme === theme.id
                    ? "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)"
                    : "white",
                  transition: "all 0.2s ease"
                }}
              >
                {/* Color Preview */}
                <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.75rem" }}>
                  <div style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "6px",
                    background: theme.colors.primary
                  }} />
                  <div style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "6px",
                    background: theme.colors.secondary
                  }} />
                  <div style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "6px",
                    background: theme.colors.accent
                  }} />
                </div>

                <div style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "0.25rem"
                }}>
                  {theme.name}
                </div>
                <div style={{
                  fontSize: "0.75rem",
                  color: "#6b7280",
                  marginBottom: "0.5rem"
                }}>
                  {theme.description}
                </div>
                <div style={{
                  fontSize: "0.7rem",
                  color: "white",
                  background: "#9ca3af",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  display: "inline-block"
                }}>
                  {theme.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Theme Preview */}
        {selectedThemeData && (
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>
              Selected Theme: {selectedThemeData.name}
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.75rem", color: "#374151" }}>
                  Colors
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {Object.entries(selectedThemeData.colors).map(([key, value]) => (
                    <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        background: value,
                        border: "2px solid #e5e7eb"
                      }} />
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#1f2937", textTransform: "capitalize" }}>
                          {key}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.75rem", color: "#374151" }}>
                  Typography
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                      Heading Font
                    </div>
                    <div style={{
                      fontSize: "1.5rem",
                      fontFamily: selectedThemeData.fonts.heading,
                      color: selectedThemeData.colors.primary
                    }}>
                      {selectedThemeData.fonts.heading}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.25rem" }}>
                      Body Font
                    </div>
                    <div style={{
                      fontSize: "1rem",
                      fontFamily: selectedThemeData.fonts.body,
                      color: selectedThemeData.colors.text
                    }}>
                      {selectedThemeData.fonts.body}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* File Upload and Apply */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem" }}>
            Upload File and Apply Theme
          </h3>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#374151" }}>
              Select {documentType === 'docx' ? 'Document' : 'Presentation'} (.{documentType})
            </label>
            <input
              type="file"
              accept={documentType === 'docx' ? '.docx' : '.pptx'}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "0.95rem"
              }}
            />
            {file && (
              <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#6b7280" }}>
                Selected: {file.name}
              </p>
            )}
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

          {/* Apply Button */}
          <button
            onClick={handleApplyTheme}
            disabled={loading || !file}
            style={{
              width: "100%",
              padding: "1rem",
              background: loading || !file ? "#9ca3af" : "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: loading || !file ? "not-allowed" : "pointer",
              boxShadow: loading || !file ? "none" : "0 4px 12px rgba(236,72,153,0.3)"
            }}
          >
            {loading ? 'Applying Theme...' : 'Apply Theme & Download'}
          </button>
        </div>
      </div>
    </div>
  )
}
