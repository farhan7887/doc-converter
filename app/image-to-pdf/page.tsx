"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileImage, Download, Loader2 } from "lucide-react";

export default function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (newFiles: File[]) => {
    setFiles(newFiles);
    setDownloadUrl(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
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
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch("/api/convert/image-to-pdf", {
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
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-5">
            <FileImage size={30} className="text-indigo-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Image to PDF Converter
          </h1>
          <p className="mt-3 text-slate-500">
            Upload one or more images and convert them into a single PDF.
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
              ? "rounded-2xl border-2 border-dashed border-indigo-500 bg-indigo-50 p-10 text-center transition-colors"
              : "rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center bg-slate-50/50 hover:border-indigo-300 transition-colors"
          }
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
            <Upload size={32} className="text-slate-400" />
            <span className="text-slate-600 font-medium">
              {isDragging ? "Drop your images here" : "Click or drag images here to upload"}
            </span>
            <span className="text-sm text-slate-400">
              JPG, PNG, WebP supported
            </span>
          </label>

          {files.length > 0 && (
            <div className="mt-6 text-left">
              <p className="text-sm font-medium text-slate-700 mb-2">
                {files.length} file{files.length > 1 ? "s" : ""} selected:
              </p>
              <ul className="text-sm text-slate-500 space-y-1">
                {files.map((f, i) => (
                  <li key={i}>• {f.name}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        <button
          onClick={handleConvert}
          disabled={files.length === 0 || loading}
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-white px-6 py-3.5 font-medium hover:bg-indigo-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Converting...
            </>
          ) : (
            "Convert to PDF"
          )}
        </button>

        {downloadUrl && (
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            href={downloadUrl}
            download="converted.pdf"
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-6 py-3.5 font-medium hover:bg-emerald-100 transition"
          >
            <Download size={18} /> Download PDF
          </motion.a>
        )}
      </div>
    </main>
  );
}