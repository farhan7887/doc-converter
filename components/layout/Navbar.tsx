"use client";

import Link from "next/link";
import { FileStack } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <FileStack size={22} />
          DocConverter
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/image-to-pdf" className="hover:text-muted-foreground transition">
            Image to PDF
          </Link>
          <Link href="/pdf-to-word" className="hover:text-muted-foreground transition">
            PDF to Word
          </Link>
          <Link href="/word-to-pdf" className="hover:text-muted-foreground transition">
            Word to PDF
          </Link>
          <Link href="/compress" className="hover:text-muted-foreground transition">
            Compress
          </Link>
          <Link href="/blog" className="hover:text-muted-foreground transition">
            Blog
          </Link>
        </nav>

        <button className="rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90 transition">
          Get Started
        </button>
      </div>
    </header>
  );
}