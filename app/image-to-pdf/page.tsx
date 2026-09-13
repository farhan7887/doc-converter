"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileImage, Download, Loader2, Camera, Sparkles } from "lucide-react";

export default function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [enhance, setEnhance] = useState(true);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setDownloadUrl(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
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

  const enhanceImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas not supported"));
          return;
        }

        ctx.filter = "contrast(1.35) brightness(1.12) saturate(0.9)";
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          const sharpenedGray = gray > 140 ? Math.min(255, gray * 1.08) : gray * 0.92;

          data[i] = data[i] * 0.25 + sharpenedGray * 0.75;
          data[i + 1] = data[i + 1] * 0.25 + sharpenedGray * 0.75;
          data[i + 2] = data[i + 2] * 0.25 + sharpenedGray * 0.75;
        }

        ctx.putImageData(imageData, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to process image"));
              return;
            }
            const enhancedFile = new File([blob], file.name, { type: "image/jpeg" });
            resolve(enhancedFile);
          },
          "image/jpeg",
          0.92
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      reader.readAsDataURL(file);
    });
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setLoading(true);

    try {
      let filesToSend = files;

      if (enhance) {
        setEnhancing(true);
        filesToSend = await Promise.all(files.map((f) => enhanceImage(f)));
        setEnhancing(false);
      }

      const formData = new FormData();
      filesToSend.forEach((file) => formData.append("images", file));

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
      setEnhancing(false);
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
            Upload images or take a photo, and convert them into a single PDF.
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
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleCameraCapture}
            className="hidden"
            id="camera-capture"
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

          <div className="mt-5 flex items-center gap-3 justify-center">
            <div className="h-px bg-slate-200 w-16" />
            <span className="text-xs text-slate-400 font-medium">OR</span>
            <div className="h-px bg-slate-200 w-16" />
          </div>

          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 text-slate-700 px-5 py-2.5 text-sm font-medium hover:border-indigo-300 hover:text-indigo-600 transition"
          >
            <Camera size={18} /> Take a Photo
          </button>

          {files.length > 0 && (
            <div className="mt-6 text-left">
              <p className="text-sm font-medium text-slate-700 mb-2">
                {files.length} file{files.length > 1 ? "s" : ""} selected:
              </p>
              <ul className="text-sm text-slate-500 space-y-1">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span>• {f.name}</span>
                    <button
                      onClick={() => removeFile(i)}
                      className="text-slate-400 hover:text-rose-600 text-xs ml-2"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        <label className="mt-4 flex items-center gap-2 justify-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={enhance}
            onChange={(e) => setEnhance(e.target.checked)}
            className="w-4 h-4 accent-indigo-600"
          />
          <span className="text-sm text-slate-600 flex items-center gap-1">
            <Sparkles size={14} className="text-indigo-500" />
            Enhance photos for a clearer, scan-like look
          </span>
        </label>

        <button
          onClick={handleConvert}
          disabled={files.length === 0 || loading}
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-white px-6 py-3.5 font-medium hover:bg-indigo-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading && enhancing && (
            <>
              <Loader2 size={18} className="animate-spin" /> Enhancing photos...
            </>
          )}
          {loading && !enhancing && (
            <>
              <Loader2 size={18} className="animate-spin" /> Converting...
            </>
          )}
          {!loading && <span>Convert to PDF</span>}
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