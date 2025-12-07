import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Document Polisher - Transform Documents with Premium Brand Styling",
  description: "Transform your documents with 10 premium brand styles including McKinsey, Apple, Stripe, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
