import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to PDF Converter - Free Online Tool | DocConverter",
  description: "Convert JPG, PNG, and WebP images into high-quality PDF files instantly. Free, fast, and secure — no signup required.",
};

export default function ImageToPdfLayout({ children }: { children: React.ReactNode }) {
  return children;
}