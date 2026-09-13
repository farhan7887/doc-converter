import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - File Conversion Tips & Guides | DocConverter",
  description: "Simple guides on converting, compressing, and working with PDFs, Word documents, and images.",
};

export default function Blog() {
  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Guides & Tips
          </h1>
          <p className="mt-3 text-slate-500">
            Simple, practical guides for converting and managing your files.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={"/blog/" + post.slug}>
              <div className="h-full rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <h2 className="font-semibold text-lg text-slate-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {post.description}
                </p>
                <div className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
                  Read more <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}