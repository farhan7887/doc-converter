"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileImage, FileText, FileType, Minimize2, FileEdit, ArrowRight } from "lucide-react";

const tools = [
  {
    icon: FileImage,
    title: "Image to PDF",
    desc: "Convert JPG, PNG, WebP images into high-quality PDF files instantly.",
    color: "#4F46E5",
    bg: "#EEF2FF",
    href: "/image-to-pdf",
  },
  {
    icon: FileText,
    title: "PDF to Word",
    desc: "Turn PDF documents into fully editable Word files with layout preserved.",
    color: "#0891B2",
    bg: "#ECFEFF",
    href: "/pdf-to-word",
  },
  {
    icon: FileType,
    title: "Word to PDF",
    desc: "Convert Word documents to professional, shareable PDF format.",
    color: "#059669",
    bg: "#ECFDF5",
    href: "/word-to-pdf",
  },
  {
    icon: Minimize2,
    title: "Compress Files",
    desc: "Reduce image and PDF file size without losing quality.",
    color: "#D97706",
    bg: "#FFFBEB",
    href: "/compress",
  },
  {
    icon: FileEdit,
    title: "Text to Document",
    desc: "Type your text and export it instantly as a PDF or Word file.",
    color: "#7C3AED",
    bg: "#F5F3FF",
    href: "/text-to-document",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-28 md:pt-32 md:pb-36">
        <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="pointer-events-none absolute top-10 -right-32 w-96 h-96 rounded-full bg-cyan-300/30 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium"
          >
            No signup needed · Files auto-deleted in 1 hour
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900"
          >
            Convert any file,{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              beautifully
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Image to PDF, PDF to Word, Word to PDF and more — fast, free,
            and secure, with no watermarks left behind.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex justify-center gap-4"
          >
            <Link
              href="/image-to-pdf"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-7 py-3.5 font-medium hover:bg-slate-800 transition shadow-lg shadow-slate-900/10"
            >
              Start Converting <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Everything you need, in one place
            </h2>
            <p className="mt-3 text-slate-500">
              Pick a tool below and convert your file in seconds.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {tools.map((tool, i) => (
              <Link key={tool.title} href={tool.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-2xl border-2 p-6 cursor-pointer bg-white shadow-sm hover:shadow-2xl transition-all duration-300 h-full"
                  style={{ borderColor: "#F1F5F9" }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                    style={{ backgroundColor: tool.bg }}
                  />

                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: tool.bg, boxShadow: "0 8px 20px -8px " + tool.color + "55" }}
                  >
                    <tool.icon size={26} style={{ color: tool.color }} />
                  </div>

                  <h3 className="font-semibold text-lg mb-1.5 text-slate-900">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {tool.desc}
                  </p>

                  <div
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                    style={{ color: tool.color }}
                  >
                    Try it now <ArrowRight size={14} />
                  </div>

                  <div
                    className="absolute top-0 left-6 right-6 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: tool.color }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}