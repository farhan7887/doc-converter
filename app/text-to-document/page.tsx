"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileEdit, Download } from "lucide-react";
import { jsPDF } from "jspdf"
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function TextToDocument() {
  const [text, setText] = useState("");

  const handleDownloadPdf = () => {
    if (!text.trim()) return;

    const doc = new jsPDF();
    const margin = 15;
    const maxWidth = 180;
    const lines = doc.splitTextToSize(text, maxWidth);

    let y = margin;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.height;

    lines.forEach((line: string) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save("document.pdf");
  };

  const handleDownloadWord = async () => {
    if (!text.trim()) return;

    const paragraphs = text.split("\n").map(
      (line) =>
        new Paragraph({
          children: [new TextRun(line)],
        })
    );

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "document.docx");
  };

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-5">
            <FileEdit size={30} className="text-violet-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Text to PDF / Word
          </h1>
          <p className="mt-3 text-slate-500">
            Type or paste your text, then download it as a PDF or Word document.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            rows={12}
            className="w-full rounded-2xl border border-slate-200 p-5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none"
          />
        </motion.div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleDownloadPdf}
            disabled={!text.trim()}
            className="flex items-center justify-center gap-2 rounded-full bg-violet-600 text-white px-6 py-3.5 font-medium hover:bg-violet-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download size={18} /> Download as PDF
          </button>

          <button
            onClick={handleDownloadWord}
            disabled={!text.trim()}
            className="flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-6 py-3.5 font-medium hover:bg-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download size={18} /> Download as Word
          </button>
        </div>
      </div>
    </main>
  );
}