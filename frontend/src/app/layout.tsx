import type { Metadata } from "next";
import "../styles/globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Document Management Platform - AI-Powered Document Creation",
  description: "Create, edit, and style DOCX, PDF, XLSX, and PPTX files with AI assistance. Professional templates and premium brand styling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
