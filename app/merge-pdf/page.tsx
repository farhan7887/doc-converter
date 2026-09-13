"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FilesIcon, Download, Loader2, X, GripVertical, ChevronUp, ChevronDown } from "lucide-react";

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
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

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setDownloadUrl(null);
  };

  const moveFile = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= files.length) return;
    const updated = files.slice();
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setFiles(updated);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("pdfs", file));

    try {
      const res = await fetch("/api/convert/merge-pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Merge failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const dropzoneClass = isDragging
    ? "rounded-2xl border-2 border-dashed border-rose-500 bg-rose-50 p-10 text-center transition-colors"
    : "rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center bg-slate-50/50 hover:border-rose-300 transition-colors";

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-5">
            <FilesIcon size={30} className="text-rose-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Merge PDF Files
          </h1>
          <p className="mt-3 text-slate-500">
            Combine multiple PDFs into a single file, in the order you choose.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={dropzoneClass}
        >
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
            <Upload size={32} className="text-slate-400" />
            <span className="text-slate-600 font-medium">
              {isDragging ? "Drop your PDFs here" : "Click or drag PDFs here to upload"}
            </span>
            <span className="text-sm text-slate-400">
              Select two or more PDF files
            </span>
          </label>
        </motion.div>

        {files.length > 0 && (
          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium text-slate-700">
              {files.length} file(s) selected. Use the arrows to reorder:
            </p>
            {files.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 bg-white"
              >
                <GripVertical size={16} className="text-slate-300 flex-shrink-0" />
                <span className="text-sm text-slate-700 flex-1 truncate">
                  {i + 1}. {file.name}
                </span>
                <button
                  onClick={() => moveFile(i, -1)}
                  disabled={i === 0}
                  className="text-slate-400 hover:text-slate-700 disabled:opacity-30"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={() => moveFile(i, 1)}
                  disabled={i === files.length - 1}
                  className="text-slate-400 hover:text-slate-700 disabled:opacity-30"
                >
                  <ChevronDown size={16} />
                </button>
                <button
                  onClick={() => removeFile(i)}
                  className="text-slate-400 hover:text-rose-600 flex-shrink-0"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleMerge}
          disabled={files.length < 2 || loading}
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-full bg-rose-600 text-white px-6 py-3.5 font-medium hover:bg-rose-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading && (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Merging...</span>
            </>
          )}
          {!loading && <span>Merge PDFs</span>}
        </button>

        {downloadUrl && (
          <a href={downloadUrl} download="merged.pdf" className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-6 py-3.5 font-medium hover:bg-emerald-100 transition">
            <Download size={18} />
            <span>Download Merged PDF</span>
          </a>
        )}
      </div>
    </main>
  );
}