"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Minimize2, Download, Loader2, FileImage, FileText } from "lucide-react";
import imageCompression from "browser-image-compression";

type Mode = "image" | "pdf";

export default function Compress() {
  const [mode, setMode] = useState<Mode>("image");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [newSize, setNewSize] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const addFile = (newFile: File) => {
    setFile(newFile);
    setOriginalSize(newFile.size);
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

  const handleCompressImage = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);
      setNewSize(compressedFile.size);
      const url = URL.createObjectURL(compressedFile);
      setDownloadUrl(url);
    } catch (err) {
      alert("Something went wrong compressing the image.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompressPdf = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);
    try {
      const res = await fetch("/api/convert/compress-pdf", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Compression failed");
      const blob = await res.blob();
      setNewSize(blob.size);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      alert("Something went wrong compressing the PDF.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompress = () => {
    if (mode === "image") {
      handleCompressImage();
    } else {
      handleCompressPdf();
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  let savedPercent = 0;
  if (originalSize > 0 && newSize > 0) {
    const diff = originalSize - newSize;
    const pct = Math.round((diff / originalSize) * 100);
    savedPercent = pct > 0 ? pct : 0;
  }

  const downloadName = mode === "image" ? "compressed-image.jpg" : "compressed.pdf";
  const sizeSummary = formatSize(originalSize) + " to " + formatSize(newSize);

  const dropzoneClass = isDragging
    ? "rounded-2xl border-2 border-dashed border-amber-500 bg-amber-50 p-10 text-center transition-colors"
    : "rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center bg-slate-50/50 hover:border-amber-300 transition-colors";

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-5">
            <Minimize2 size={30} className="text-amber-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Compress Files</h1>
          <p className="mt-3 text-slate-500">Reduce image or PDF file size without losing quality.</p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => {
              setMode("image");
              setFile(null);
              setDownloadUrl(null);
            }}
            className={
              mode === "image"
                ? "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition bg-amber-600 text-white"
                : "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition bg-slate-100 text-slate-600 hover:bg-slate-200"
            }
          >
            <FileImage size={16} />
            <span>Image</span>
          </button>
          <button
            onClick={() => {
              setMode("pdf");
              setFile(null);
              setDownloadUrl(null);
            }}
            className={
              mode === "pdf"
                ? "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition bg-amber-600 text-white"
                : "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition bg-slate-100 text-slate-600 hover:bg-slate-200"
            }
          >
            <FileText size={16} />
            <span>PDF</span>
          </button>
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
            accept={mode === "image" ? "image/*" : "application/pdf"}
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
            <Upload size={32} className="text-slate-400" />
            <span className="text-slate-600 font-medium">
              {isDragging
                ? "Drop your file here"
                : mode === "image"
                ? "Click or drag an image here to upload"
                : "Click or drag a PDF here to upload"}
            </span>
            <span className="text-sm text-slate-400">
              {mode === "image" ? "JPG, PNG, WebP" : "PDF files only"}
            </span>
          </label>

          {file && (
            <p className="mt-6 text-sm text-slate-600 font-medium">
              Selected: {file.name} ({formatSize(file.size)})
            </p>
          )}
        </motion.div>

        <button
          onClick={handleCompress}
          disabled={!file || loading}
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-full bg-amber-600 text-white px-6 py-3.5 font-medium hover:bg-amber-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading && (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Compressing...</span>
            </>
          )}
          {!loading && <span>Compress File</span>}
        </button>

        {downloadUrl && (
          <div className="mt-4">
            {savedPercent > 0 && (
              <p className="text-center text-sm text-emerald-600 font-medium mb-3">
                Reduced by {savedPercent}% ({sizeSummary})
              </p>
            )}
            <a href={downloadUrl} download={downloadName} className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-6 py-3.5 font-medium hover:bg-emerald-100 transition">
              <Download size={18} />
              <span>Download Compressed File</span>
            </a>
          </div>
        )}
      </div>
    </main>
  );
}