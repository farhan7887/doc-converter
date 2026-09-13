import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://doc-converter-seven.vercel.app";

  const staticPages = [
    "",
    "/image-to-pdf",
    "/pdf-to-word",
    "/word-to-pdf",
    "/compress",
    "/text-to-document",
    "/merge-pdf",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: baseUrl + route,
    lastModified: new Date(),
  }));

  const blogPages = blogPosts.map((post) => ({
    url: baseUrl + "/blog/" + post.slug,
    lastModified: new Date(post.date),
  }));

  return [...staticPages, ...blogPages];
}