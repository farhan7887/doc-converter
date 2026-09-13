import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to PDF & Word Converter - Free Online Tool | DocConverter",
  description: "Type or paste your text and download it instantly as a PDF or Word document. No signup needed.",
};

export default function TextToDocumentLayout({ children }: { children: React.ReactNode }) {
  return children;
}