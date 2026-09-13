import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { ArrowRight, Calendar, ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found | DocConverter" };
  }

  return {
    title: post.title + " | DocConverter",
    description: post.description,
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-8 transition">
          <ArrowLeft size={16} /> Back to guides
        </Link>

        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <Calendar size={14} />
          <span>{post.date}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          {post.title}
        </h1>

        <div className="space-y-4 text-slate-600 leading-relaxed">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <Link
          href={post.toolHref}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-6 py-3.5 font-medium hover:bg-indigo-700 transition"
        >
          {post.toolLabel} <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  );
}