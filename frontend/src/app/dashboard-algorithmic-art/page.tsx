"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ArtStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
  defaultParams: {
    particles?: number;
    noiseScale?: number;
    speed?: number;
    trailLength?: number;
    depth?: number;
    iterations?: number;
    gridSize?: number;
    frequency?: number;
    amplitude?: number;
  };
}

export default function AlgorithmicArtPage() {
  const router = useRouter();
  const [selectedStyle, setSelectedStyle] = useState<string>("flow-field");
  const [parameters, setParameters] = useState<any>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const artStyles: ArtStyle[] = [
    {
      id: "flow-field",
      name: "Flow Field",
      description: "Perlin noise-based flow fields with particle trails",
      icon: "🌊",
      defaultParams: { particles: 1000, noiseScale: 0.01, speed: 2, trailLength: 50 }
    },
    {
      id: "particle-system",
      name: "Particle System",
      description: "Physics-based particle systems with forces and interactions",
      icon: "✨",
      defaultParams: { particles: 500, gravity: 0.1, friction: 0.99 }
    },
    {
      id: "fractal",
      name: "Fractal",
      description: "Recursive fractal patterns (Mandelbrot, Julia sets, L-systems)",
      icon: "🔮",
      defaultParams: { depth: 5, iterations: 100 }
    },
    {
      id: "noise-field",
      name: "Noise Field",
      description: "Perlin/Simplex noise visualizations with dynamic gradients",
      icon: "🎨",
      defaultParams: { noiseScale: 0.005, octaves: 4 }
    },
    {
      id: "wave",
      name: "Wave Patterns",
      description: "Sine/cosine wave interference patterns",
      icon: "〰️",
      defaultParams: { frequency: 2, amplitude: 50, waves: 5 }
    },
    {
      id: "grid",
      name: "Grid Systems",
      description: "Generative grid-based patterns with transformations",
      icon: "⬜",
      defaultParams: { gridSize: 20, rotation: 0 }
    }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:8000/api/algorithmic-art/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          style: selectedStyle,
          parameters: parameters
        })
      });
      const data = await response.json();
      console.log("Generated art:", data);
      // TODO: Display generated P5.js code or preview
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentStyle = artStyles.find(s => s.id === selectedStyle);

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
              background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px"
            }}>
              🌊
            </div>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#1f2937" }}>
                Algorithmic Art Generator
              </h1>
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0" }}>
                Generate P5.js generative art: flow fields, particle systems, fractals
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1rem" }}>

        {/* Art Style Selection */}
        <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
            Select Art Style
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {artStyles.map((style) => (
              <div
                key={style.id}
                onClick={() => {
                  setSelectedStyle(style.id);
                  setParameters(style.defaultParams);
                }}
                style={{
                  background: selectedStyle === style.id ? "#f3f4f6" : "white",
                  border: selectedStyle === style.id ? "2px solid #667eea" : "2px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{style.icon}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                  {style.name}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: "1.4" }}>
                  {style.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Parameters */}
        {currentStyle && (
          <div style={{ background: "white", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1f2937", marginBottom: "1.5rem" }}>
              Parameters
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
              {Object.entries(currentStyle.defaultParams).map(([key, value]) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#374151", marginBottom: "0.5rem" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type="number"
                    value={parameters[key] ?? value}
                    onChange={(e) => setParameters({ ...parameters, [key]: parseFloat(e.target.value) })}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "0.95rem"
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
              color: "white",
              border: "none",
              padding: "1rem 3rem",
              borderRadius: "12px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: isGenerating ? "not-allowed" : "pointer",
              opacity: isGenerating ? 0.6 : 1,
              boxShadow: "0 4px 12px rgba(139,92,246,0.3)"
            }}
          >
            {isGenerating ? "Generating..." : "Generate Art"}
          </button>
        </div>

      </div>
    </div>
  );
}
