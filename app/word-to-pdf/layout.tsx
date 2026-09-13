import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word to PDF Converter - Free Online Tool | DocConverter",
  description: "Convert Word documents to professional, shareable PDF files instantly. Free, fast, and secure — no watermarks.",
};

export default function WordToPdfLayout({ children }: { children: React.ReactNode }) {
  return children;
}