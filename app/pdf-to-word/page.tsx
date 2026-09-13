"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Download, Loader2 } from "lucide-react";

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addFile = (newFile: File) => {
    setFile(newFile);
    setDownloadUrl(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFile(e.dataTransfer.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("/api/convert/pdf-to-word", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Conversion failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center mx-auto mb-5">
            <FileText size={30} className="text-cyan-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            PDF to Word Converter
          </h1>
          <p className="mt-3 text-slate-500">
            Upload a PDF and get a fully editable Word document.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={
            isDragging
              ? "rounded-2xl border-2 border-dashed border-cyan-500 bg-cyan-50 p-10 text-center transition-colors"
              : "rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center bg-slate-50/50 hover:border-cyan-300 transition-colors"
          }
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
            <Upload size={32} className="text-slate-400" />
            <span className="text-slate-600 font-medium">
              {isDragging ? "Drop your PDF here" : "Click or drag a PDF here to upload"}
            </span>
            <span className="text-sm text-slate-400">PDF files only</span>
          </label>

          {file && (
            <p className="mt-6 text-sm text-slate-600 font-medium">
              Selected: {file.name}
            </p>
          )}
        </motion.div>

        <button
          onClick={handleConvert}
          disabled={!file || loading}
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-full bg-cyan-600 text-white px-6 py-3.5 font-medium hover:bg-cyan-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Converting...
            </>
          ) : (
            "Convert to Word"
          )}
        </button>

        {downloadUrl && (
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            href={downloadUrl}
            download="converted.docx"
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-6 py-3.5 font-medium hover:bg-emerald-100 transition"
          >
            <Download size={18} /> Download Word File
          </motion.a>
        )}
      </div>
    </main>
  );
}