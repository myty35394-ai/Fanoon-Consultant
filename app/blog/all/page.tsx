import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { eq, desc } from "drizzle-orm";

import { db } from "@/db";
import { blogPosts } from "@/db/schema";

import Breadcrumb from "@/components/ui/Breadcrumb";
import BlogGrid from "@/components/blog/BlogGrid";
import type { BlogPost } from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "All Articles | Fanoon Consultants Blog",
  description:
    "Browse all design insights, architecture articles, industry trends and practical guides from the Fanoon Consultants team.",
};

export const revalidate = 60;

function formatDate(d: Date | null | string): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function AllArticlesPage() {
  let allPosts: BlogPost[] = [];

  try {
    const rows = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedAt));

    allPosts = rows.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category.toUpperCase(),
      date: formatDate(p.publishedAt),
      readTime: p.readTime ?? "5 MIN READ",
      imageUrl: p.coverImage,
      featured: p.featured ?? false,
    }));
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="All Articles"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/80 to-charcoal" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-40 pb-16">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "All Articles" },
            ]}
            className="mb-6"
          />
          <span className="block text-[11px] font-bold uppercase tracking-[0.35em] text-primary mb-4">
            BLOG
          </span>
          <h1
            className="text-white font-bold leading-tight mb-5"
            style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}
          >
            All Articles
          </h1>
          <div className="w-10 h-[3px] bg-primary rounded-sm mb-5" />
          <p className="text-white/75 text-[14px] max-w-[480px] leading-relaxed">
            Browse our full library of design insights, architecture guides, and
            industry perspectives from the Fanoon Consultants team.
          </p>
        </div>
      </section>

      {/* ── ARTICLES GRID ─────────────────────────────── */}
      <section className="bg-[#fafafa] py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">

          {/* Back to Blog */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[12px] font-bold text-dark-gray hover:text-primary uppercase tracking-[0.1em] mb-10 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
            Back to Blog
          </Link>

          {/* Interactive Grid with filtering */}
          <BlogGrid allPosts={allPosts} />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="relative bg-[#102418] py-14 overflow-hidden border-t border-[#1a3826]">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 md:gap-8">
              <div className="flex-shrink-0 hidden sm:flex items-center justify-center relative w-20 h-20 md:w-24 md:h-24">
                <Image
                  src="/monogram.png"
                  alt="Fanoon Monogram"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-[22px] md:text-[26px] mb-1.5">
                  Have a project in mind?
                </h3>
                <p className="text-white/80 text-[15px]">
                  Let&apos;s turn your ideas into inspiring spaces.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href="/contact/start-project">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-bold text-[12px] uppercase tracking-[0.1em] rounded hover:bg-[#f0f0f0] transition-colors group">
                  START A PROJECT
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

