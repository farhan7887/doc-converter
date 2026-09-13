"use client";

import { useState } from "react";
import Link from "next/link";
import { FileStack, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/image-to-pdf", label: "Image to PDF" },
    { href: "/pdf-to-word", label: "PDF to Word" },
    { href: "/word-to-pdf", label: "Word to PDF" },
    { href: "/compress", label: "Compress" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <FileStack size={22} />
          DocConverter
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-muted-foreground transition">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <button className="rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90 transition">
            Get Started
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-muted-foreground transition"
            >
              {link.label}
            </Link>
          ))}
          <button className="rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90 transition w-full">
            Get Started
          </button>
        </nav>
      )}
    </header>
  );
}