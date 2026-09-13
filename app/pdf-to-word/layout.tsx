import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to Word Converter - Free Online Tool | DocConverter",
  description: "Turn PDF documents into fully editable Word files with layout preserved. Free, fast, and secure conversion in your browser.",
};

export default function PdfToWordLayout({ children }: { children: React.ReactNode }) {
  return children;
}