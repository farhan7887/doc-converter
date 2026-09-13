import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress Images & PDFs Online Free | DocConverter",
  description: "Reduce image and PDF file size without losing quality. Fast, free, and secure compression right in your browser.",
};

export default function CompressLayout({ children }: { children: React.ReactNode }) {
  return children;
}