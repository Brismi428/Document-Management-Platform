import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Forward to Python FastAPI backend
    const response = await fetch("http://localhost:8000/polish", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      return Response.json({ error: error }, { status: 500 });
    }

    // Return the polished document
    const blob = await response.blob();
    const filename = response.headers.get("content-disposition")?.split("filename=")[1] || "polished_document.docx";

    return new Response(blob, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error in polish API route:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
