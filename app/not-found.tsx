import Link from "next/link";
import { FileQuestion, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 flex items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-6">
          <FileQuestion size={40} className="text-indigo-600" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-500 mb-8">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-6 py-3 font-medium hover:bg-slate-800 transition"
          >
            <Home size={18} /> Back to Home
          </Link>
          <Link
            href="/image-to-pdf"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-50 text-indigo-700 px-6 py-3 font-medium hover:bg-indigo-100 transition"
          >
            Try a converter <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}