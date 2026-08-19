import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, ChevronRight } from "lucide-react";

import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc, ne, and } from "drizzle-orm";

import Breadcrumb from "@/components/ui/Breadcrumb";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogCard, { type BlogPost } from "@/components/blog/BlogCard";

export const revalidate = 60;

/* ── Generate static params from published slugs ─────── */
export async function generateStaticParams() {
  try {
    const posts = await db
      .select({ slug: blogPosts.slug })
      .from(blogPosts)
      .where(eq(blogPosts.published, true));
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

/* ── Dynamic metadata ───────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
      .limit(1);

    if (!post) return { title: "Article Not Found | Fanoon Consultants" };

    return {
      title: `${post.title} | Fanoon Consultants Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: post.coverImage }],
      },
    };
  } catch {
    return { title: "Blog | Fanoon Consultants" };
  }
}

function formatDate(d: Date | null | string): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ── Page ─────────────────────────────────────────────── */
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  /* Fetch the post */
  let post: typeof blogPosts.$inferSelect | null = null;
  let relatedPosts: BlogPost[] = [];

  try {
    const [found] = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
      .limit(1);

    if (!found) notFound();
    post = found;

    /* Fetch up to 3 related posts from the same category */
    const related = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.published, true),
          eq(blogPosts.category, found.category),
          ne(blogPosts.id, found.id)
        )
      )
      .orderBy(desc(blogPosts.publishedAt))
      .limit(3);

    relatedPosts = related.map((p) => ({
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
    console.error("Failed to fetch blog post:", err);
    notFound();
  }

  if (!post) notFound();

  /* Build article body paragraphs — use content field or excerpt as fallback */
  const bodyParagraphs = post.content
    ? post.content.split("\n\n").filter(Boolean)
    : [
        post.excerpt,
        "At Fanoon Consultants, we approach every project with a commitment to design excellence, technical precision, and client-focused collaboration. Our multidisciplinary team brings together expertise in architecture, interior design, landscape design, and construction supervision.",
        "We believe that great design is born from deep understanding — of the site, the client, the culture, and the purpose. Every project begins with a thorough discovery phase where we listen, research, and explore possibilities.",
        "The result is always spaces that are not only beautiful but functionally superior — environments that enhance the lives of those who inhabit them while standing the test of time.",
      ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[480px] flex items-end bg-charcoal overflow-hidden">
        {/* BG Image */}
        <div className="absolute inset-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(4,8,6,0.96) 0%, rgba(4,8,6,0.85) 45%, rgba(4,8,6,0.55) 75%, rgba(4,8,6,0.2) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pt-44 pb-20">
          <div style={{ maxWidth: "680px" }}>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
              className="mb-6"
            />

            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-sm">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/60 text-[12px]">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5 text-white/60 text-[12px]">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1
              className="text-white font-bold leading-[1.15] mb-5"
              style={{ fontSize: "clamp(26px, 4vw, 46px)" }}
            >
              {post.title}
            </h1>
            <div className="w-10 h-[3px] bg-primary rounded-sm" />
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ──────────────────────── */}
      <section className="bg-[#fafafa] py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col xl:flex-row gap-12 xl:gap-16 items-start">

            {/* ── Article Body ──────────────────────────── */}
            <article className="w-full xl:w-[65%]">

              {/* Back link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[12px] font-bold text-dark-gray hover:text-primary uppercase tracking-[0.1em] mb-8 transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
                Back to Blog
              </Link>

              {/* Excerpt highlight */}
              <div className="bg-white border-l-4 border-primary rounded-r-lg px-6 py-5 mb-10 shadow-sm">
                <p className="text-[15px] text-charcoal leading-[1.8] font-medium italic">
                  &ldquo;{post.excerpt}&rdquo;
                </p>
              </div>

              {/* Article content */}
              <div className="space-y-6 mb-12">
                {bodyParagraphs.map((para, i) => (
                  <p key={i} className="text-[15px] text-dark-gray leading-[1.85]">
                    {para}
                  </p>
                ))}
              </div>

              {/* Tags + Share */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-[#e8e8e8]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-charcoal uppercase tracking-widest mr-1">Category:</span>
                  <span className="bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-charcoal uppercase tracking-widest">Share:</span>
                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://fanoonconsultants.com/blog/${post.slug}`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-[#e0e0e0] flex items-center justify-center text-dark-gray hover:border-primary hover:text-primary transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://fanoonconsultants.com/blog/${post.slug}`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-[#e0e0e0] flex items-center justify-center text-dark-gray hover:border-primary hover:text-primary transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-14">
                  <h3 className="text-[20px] font-bold text-charcoal mb-2">Related Articles</h3>
                  <div className="w-8 h-[3px] bg-primary rounded-sm mb-8" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {relatedPosts.map((p) => (
                      <BlogCard key={p.id} post={p} variant="standard" />
                    ))}
                  </div>
                </div>
              )}

              {/* Back to blog */}
              <div className={`${relatedPosts.length > 0 ? "mt-10" : "mt-6"} pt-6 border-t border-[#e8e8e8] flex justify-center`}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#d0d0d0] text-[12px] font-bold text-charcoal uppercase tracking-[0.12em] rounded-[4px] hover:border-primary hover:text-primary transition-all group bg-white"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
                  VIEW ALL ARTICLES
                </Link>
              </div>

            </article>

            {/* ── Sidebar ───────────────────────────────── */}
            <div className="w-full xl:w-[35%] xl:sticky xl:top-28">
              <BlogSidebar />
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
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
              <div className="flex-shrink-0 hidden sm:flex items-center justify-center relative w-16 h-16">
                <svg width="64" height="64" viewBox="0 0 64 64" className="absolute inset-0">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                  <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeDasharray="60 180" strokeLinecap="round" className="origin-center rotate-[100deg]" />
                  <circle cx="32" cy="32" r="28" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeDasharray="50 180" strokeLinecap="round" className="origin-center -rotate-[60deg]" />
                  <path d="M32 26 L32.5 31.5 L38 32 L32.5 32.5 L32 38 L31.5 32.5 L26 32 L31.5 31.5 Z" fill="var(--color-primary)" />
                </svg>
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
