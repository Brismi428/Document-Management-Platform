"""
Algorithmic Art Router - P5.js generative art creation
Handles generative art creation with seeded randomness and parameter exploration
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from pathlib import Path
import sys

sys.path.append(str(Path(__file__).parent.parent))

router = APIRouter(prefix="/api/algorithmic-art", tags=["algorithmic-art"])

class ArtGenerationRequest(BaseModel):
    art_type: str  # flow-field, particle-system, fractal, noise-field, wave, grid
    seed: Optional[int] = None
    parameters: Optional[Dict[str, Any]] = None
    width: int = 800
    height: int = 800

class ArtStyle(BaseModel):
    name: str
    description: str
    default_params: Dict[str, Any]

@router.get("/styles")
async def list_art_styles():
    """List all available algorithmic art styles"""
    styles = [
        {
            "id": "flow-field",
            "name": "Flow Field",
            "description": "Perlin noise-based flow fields with particle trails",
            "defaultParams": {
                "particles": 1000,
                "noiseScale": 0.01,
                "speed": 2,
                "trailLength": 50
            },
            "preview": "/api/algorithmic-art/preview/flow-field"
        },
        {
            "id": "particle-system",
            "name": "Particle System",
            "description": "Dynamic particle interactions with forces",
            "defaultParams": {
                "particleCount": 500,
                "gravity": 0.1,
                "repulsion": 100,
                "attraction": 50
            },
            "preview": "/api/algorithmic-art/preview/particle-system"
        },
        {
            "id": "fractal",
            "name": "Fractal Generator",
            "description": "Recursive fractal patterns (Mandelbrot, Julia sets)",
            "defaultParams": {
                "iterations": 100,
                "zoom": 1,
                "offsetX": 0,
                "offsetY": 0,
                "colorPalette": "rainbow"
            },
            "preview": "/api/algorithmic-art/preview/fractal"
        },
        {
            "id": "noise-field",
            "name": "Noise Field",
            "description": "Perlin/Simplex noise visualizations",
            "defaultParams": {
                "scale": 0.05,
                "octaves": 4,
                "persistence": 0.5,
                "animated": True
            },
            "preview": "/api/algorithmic-art/preview/noise-field"
        },
        {
            "id": "wave",
            "name": "Wave Patterns",
            "description": "Sine/cosine wave interference patterns",
            "defaultParams": {
                "waveCount": 3,
                "amplitude": 100,
                "frequency": 0.02,
                "phase": 0
            },
            "preview": "/api/algorithmic-art/preview/wave"
        },
        {
            "id": "grid",
            "name": "Generative Grid",
            "description": "Grid-based generative patterns",
            "defaultParams": {
                "gridSize": 20,
                "cellStyle": "circle",
                "colorMode": "gradient",
                "randomness": 0.5
            },
            "preview": "/api/algorithmic-art/preview/grid"
        }
    ]
    return {"styles": styles}

@router.post("/generate")
async def generate_art(request: ArtGenerationRequest):
    """
    Generate algorithmic art based on parameters
    Returns P5.js code that can be executed on the frontend
    """
    try:
        # Generate P5.js code based on art_type
        p5_code = _generate_p5_code(
            request.art_type,
            request.seed,
            request.parameters or {},
            request.width,
            request.height
        )

        return {
            "success": True,
            "artType": request.art_type,
            "seed": request.seed,
            "code": p5_code,
            "parameters": request.parameters,
            "dimensions": {"width": request.width, "height": request.height}
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/preview/{art_type}")
async def get_art_preview(art_type: str):
    """Get a preview of an art style with default parameters"""
    try:
        p5_code = _generate_p5_code(art_type, seed=42, params={}, width=400, height=400)
        return {"code": p5_code, "artType": art_type}
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Art type '{art_type}' not found")

@router.get("/parameters/{art_type}")
async def get_art_parameters(art_type: str):
    """Get adjustable parameters for a specific art type"""
    parameter_configs = {
        "flow-field": [
            {"name": "particles", "type": "number", "min": 100, "max": 5000, "default": 1000, "step": 100},
            {"name": "noiseScale", "type": "number", "min": 0.001, "max": 0.1, "default": 0.01, "step": 0.001},
            {"name": "speed", "type": "number", "min": 0.5, "max": 10, "default": 2, "step": 0.5},
            {"name": "trailLength", "type": "number", "min": 10, "max": 200, "default": 50, "step": 10}
        ],
        "particle-system": [
            {"name": "particleCount", "type": "number", "min": 50, "max": 2000, "default": 500, "step": 50},
            {"name": "gravity", "type": "number", "min": 0, "max": 1, "default": 0.1, "step": 0.05},
            {"name": "repulsion", "type": "number", "min": 0, "max": 500, "default": 100, "step": 10},
            {"name": "attraction", "type": "number", "min": 0, "max": 200, "default": 50, "step": 5}
        ],
        "fractal": [
            {"name": "iterations", "type": "number", "min": 10, "max": 500, "default": 100, "step": 10},
            {"name": "zoom", "type": "number", "min": 0.1, "max": 10, "default": 1, "step": 0.1},
            {"name": "colorPalette", "type": "select", "options": ["rainbow", "grayscale", "fire", "ocean"], "default": "rainbow"}
        ],
        "noise-field": [
            {"name": "scale", "type": "number", "min": 0.01, "max": 0.2, "default": 0.05, "step": 0.01},
            {"name": "octaves", "type": "number", "min": 1, "max": 8, "default": 4, "step": 1},
            {"name": "persistence", "type": "number", "min": 0.1, "max": 1, "default": 0.5, "step": 0.1},
            {"name": "animated", "type": "boolean", "default": True}
        ],
        "wave": [
            {"name": "waveCount", "type": "number", "min": 1, "max": 10, "default": 3, "step": 1},
            {"name": "amplitude", "type": "number", "min": 20, "max": 300, "default": 100, "step": 10},
            {"name": "frequency", "type": "number", "min": 0.001, "max": 0.1, "default": 0.02, "step": 0.001}
        ],
        "grid": [
            {"name": "gridSize", "type": "number", "min": 5, "max": 50, "default": 20, "step": 1},
            {"name": "cellStyle", "type": "select", "options": ["circle", "square", "triangle", "random"], "default": "circle"},
            {"name": "colorMode", "type": "select", "options": ["gradient", "random", "monochrome"], "default": "gradient"},
            {"name": "randomness", "type": "number", "min": 0, "max": 1, "default": 0.5, "step": 0.1}
        ]
    }

    if art_type not in parameter_configs:
        raise HTTPException(status_code=404, detail=f"Art type '{art_type}' not found")

    return {"artType": art_type, "parameters": parameter_configs[art_type]}

def _generate_p5_code(art_type: str, seed: Optional[int], params: Dict[str, Any], width: int, height: int) -> str:
    """Generate P5.js code for the specified art type"""

    seed_setup = f"randomSeed({seed});" if seed is not None else ""

    if art_type == "flow-field":
        particles = params.get("particles", 1000)
        noise_scale = params.get("noiseScale", 0.01)
        speed = params.get("speed", 2)
        trail_length = params.get("trailLength", 50)

        return f"""
let particles = [];
let flowField;

function setup() {{
  createCanvas({width}, {height});
  {seed_setup}

  for (let i = 0; i < {particles}; i++) {{
    particles.push(new Particle());
  }}

  background(0);
}}

function draw() {{
  fill(0, 5);
  noStroke();
  rect(0, 0, width, height);

  for (let particle of particles) {{
    particle.follow();
    particle.update();
    particle.show();
  }}
}}

class Particle {{
  constructor() {{
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = {speed};
    this.prevPos = this.pos.copy();
  }}

  follow() {{
    let x = this.pos.x * {noise_scale};
    let y = this.pos.y * {noise_scale};
    let angle = noise(x, y) * TWO_PI * 4;
    let force = p5.Vector.fromAngle(angle);
    force.setMag(0.1);
    this.acc.add(force);
  }}

  update() {{
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.x > width) {{ this.pos.x = 0; this.prevPos.x = 0; }}
    if (this.pos.x < 0) {{ this.pos.x = width; this.prevPos.x = width; }}
    if (this.pos.y > height) {{ this.pos.y = 0; this.prevPos.y = 0; }}
    if (this.pos.y < 0) {{ this.pos.y = height; this.prevPos.y = height; }}
  }}

  show() {{
    stroke(255, 50);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.prevPos = this.pos.copy();
  }}
}}
"""

    elif art_type == "fractal":
        iterations = params.get("iterations", 100)
        zoom = params.get("zoom", 1)
        color_palette = params.get("colorPalette", "rainbow")

        return f"""
function setup() {{
  createCanvas({width}, {height});
  {seed_setup}
  noLoop();
}}

function draw() {{
  loadPixels();
  for (let x = 0; x < width; x++) {{
    for (let y = 0; y < height; y++) {{
      let a = map(x, 0, width, -2.5 / {zoom}, 1 / {zoom});
      let b = map(y, 0, height, -1 / {zoom}, 1 / {zoom});

      let ca = a;
      let cb = b;

      let n = 0;
      while (n < {iterations}) {{
        let aa = a * a - b * b;
        let bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (abs(a + b) > 16) break;
        n++;
      }}

      let bright = map(n, 0, {iterations}, 0, 255);
      let pix = (x + y * width) * 4;

      if (n === {iterations}) {{
        pixels[pix + 0] = 0;
        pixels[pix + 1] = 0;
        pixels[pix + 2] = 0;
      }} else {{
        let hue = map(n, 0, {iterations}, 0, 360);
        colorMode(HSB);
        let c = color(hue, 255, bright);
        pixels[pix + 0] = red(c);
        pixels[pix + 1] = green(c);
        pixels[pix + 2] = blue(c);
      }}
      pixels[pix + 3] = 255;
    }}
  }}
  updatePixels();
}}
"""

    else:
        # Default: simple noise field
        return f"""
function setup() {{
  createCanvas({width}, {height});
  {seed_setup}
  noLoop();
}}

function draw() {{
  background(220);
  loadPixels();
  for (let x = 0; x < width; x++) {{
    for (let y = 0; y < height; y++) {{
      let bright = noise(x * 0.01, y * 0.01) * 255;
      let pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }}
  }}
  updatePixels();
}}
"""

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Algorithmic Art"}
