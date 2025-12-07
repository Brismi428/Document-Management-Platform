"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Component {
  id: string;
  name: string;
  description: string;
  icon: string;
  variants: string[];
}

export default function FrontendDesignPage() {
  const router = useRouter();
  const [selectedComponent, setSelectedComponent] = useState<string>("button");
  const [selectedVariant, setSelectedVariant] = useState<string>("primary");
  const [framework, setFramework] = useState<string>("react");
  const [styling, setStyling] = useState<string>("tailwind");
  const [isGenerating, setIsGenerating] = useState(false);

  const components: Component[] = [
    {
      id: "button",
      name: "Button",
      description: "Interactive buttons with states and variants",
      icon: "🔘",
      variants: ["primary", "secondary", "outline", "ghost", "danger"]
    },
    {
      id: "card",
      name: "Card",
      description: "Content cards with flexible layouts",
      icon: "🎴",
      variants: ["default", "hover", "clickable", "bordered", "elevated"]
    },
    {
      id: "form",
      name: "Form",
      description: "Input fields, labels, and validation",
      icon: "📝",
      variants: ["text", "email", "password", "select", "textarea"]
    },
    {
      id: "navbar",
      name: "Navbar",
      description: "Navigation bars and menus",
      icon: "📊",
      variants: ["fixed", "sticky", "transparent", "dark", "light"]
    },
    {
      id: "hero",
      name: "Hero Section",
      description: "Landing page hero sections",
      icon: "🎯",
      variants: ["centered", "split", "video-bg", "gradient", "image-bg"]
    },
    {
      id: "footer",
      name: "Footer",
      description: "Page footers with links and info",
      icon: "⬇️",
      variants: ["simple", "multi-column", "newsletter", "social", "minimal"]
    }
  ];

  const frameworks = [
    { id: "react", name: "React", icon: "⚛️" },
    { id: "vue", name: "Vue", icon: "🟢" },
    { id: "svelte", name: "Svelte", icon: "🔶" }
  ];

  const stylingOptions = [
    { id: "tailwind", name: "Tailwind CSS", icon: "🎨" },
    { id: "css-modules", name: "CSS Modules", icon: "📄" },
    { id: "styled-components", name: "Styled Components", icon: "💅" }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:8000/api/frontend-design/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          component: selectedComponent,
          variant: selectedVariant,
          framework,
          styling
        })
      });
      const data = await response.json();
      console.log("Generated component:", data);
      // TODO: Display generated code
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentComponent = components.find(c => c.id === selectedComponent);

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
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px"
            }}>
              ⚛️
            </div>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#1f2937" }}>
                Frontend Component Generator
              </h1>
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0" }}>
                Generate React components: buttons, cards, forms, navbars with Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1rem" }}>

        {/* Component Selection */}
        <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
            Select Component
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {components.map((component) => (
              <div
                key={component.id}
                onClick={() => {
                  setSelectedComponent(component.id);
                  setSelectedVariant(component.variants[0]);
                }}
                style={{
                  background: selectedComponent === component.id ? "#f3f4f6" : "white",
                  border: selectedComponent === component.id ? "2px solid #667eea" : "2px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{component.icon}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                  {component.name}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: "1.4" }}>
                  {component.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>

          {/* Variant Selection */}
          {currentComponent && (
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Variant
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {currentComponent.variants.map((variant) => (
                  <div
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    style={{
                      background: selectedVariant === variant ? "#667eea" : "#f3f4f6",
                      color: selectedVariant === variant ? "white" : "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                      padding: "1rem",
                      cursor: "pointer",
                      textAlign: "center",
                      fontWeight: "600",
                      transition: "all 0.2s ease",
                      textTransform: "capitalize"
                    }}
                  >
                    {variant.replace("-", " ")}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Framework & Styling */}
          <div>
            {/* Framework */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Framework
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
                {frameworks.map((fw) => (
                  <div
                    key={fw.id}
                    onClick={() => setFramework(fw.id)}
                    style={{
                      background: framework === fw.id ? "#667eea" : "#f3f4f6",
                      color: framework === fw.id ? "white" : "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                      padding: "1rem",
                      cursor: "pointer",
                      textAlign: "center",
                      fontWeight: "600",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{fw.icon}</div>
                    <div style={{ fontSize: "0.85rem" }}>{fw.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Styling */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
                Styling Method
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {stylingOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setStyling(option.id)}
                    style={{
                      background: styling === option.id ? "#667eea" : "#f3f4f6",
                      color: styling === option.id ? "white" : "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                      padding: "1rem",
                      cursor: "pointer",
                      textAlign: "center",
                      fontWeight: "600",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {option.icon} {option.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Generate Button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              color: "white",
              border: "none",
              padding: "1rem 3rem",
              borderRadius: "12px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: isGenerating ? "not-allowed" : "pointer",
              opacity: isGenerating ? 0.6 : 1,
              boxShadow: "0 4px 12px rgba(59,130,246,0.3)"
            }}
          >
            {isGenerating ? "Generating..." : "Generate Component"}
          </button>
        </div>

      </div>
    </div>
  );
}
