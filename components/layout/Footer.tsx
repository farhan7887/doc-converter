import Link from "next/link";
import { FileStack } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 bg-slate-900 overflow-hidden">
      <div className="pointer-events-none absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2">
          <div className="flex items-center gap-2 font-semibold text-lg text-white mb-3">
            <FileStack size={22} className="text-cyan-400" />
            DocConverter
          </div>
          <p className="text-slate-400 max-w-xs">
            Fast, free, and secure file conversion tools for everyone. No
            watermarks, no clutter.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Tools</h4>
          <div className="flex flex-col gap-2 text-slate-400">
            <Link href="/image-to-pdf" className="hover:text-cyan-400 transition">Image to PDF</Link>
            <Link href="/pdf-to-word" className="hover:text-cyan-400 transition">PDF to Word</Link>
            <Link href="/word-to-pdf" className="hover:text-cyan-400 transition">Word to PDF</Link>
            <Link href="/compress" className="hover:text-cyan-400 transition">Compress Files</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Company</h4>
          <div className="flex flex-col gap-2 text-slate-400">
            <Link href="/about" className="hover:text-cyan-400 transition">About</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Legal</h4>
          <div className="flex flex-col gap-2 text-slate-400">
            <Link href="/privacy-policy" className="hover:text-cyan-400 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cyan-400 transition">Terms of Service</Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} DocConverter. All rights reserved.</p>
        <p className="mt-1">
          Made by <span className="text-slate-300 font-medium">Farri</span> — Student at COMSATS University Islamabad
        </p>
      </div>
    </footer>
  );
}