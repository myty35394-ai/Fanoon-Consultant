import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import BlogListing from "@/components/blog/BlogListing";
import BlogSidebar from "@/components/blog/BlogSidebar";

export const metadata: Metadata = {
  title: "Blog | Fanoon Consultants",
  description:
    "Explore expert perspectives, design insights, industry trends and practical guides from the team at Fanoon Consultants.",
};

export const revalidate = 60; // ISR — revalidate every 60 seconds

/* ── Fallback posts shown when DB has no entries ─────── */
import type { BlogPost } from "@/components/blog/BlogCard";

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "designing-tomorrow-sustainable-livable-spaces",
    title: "Designing for Tomorrow: Creating Sustainable, Livable Spaces",
    excerpt:
      "Sustainable design is no longer a choice—it's a responsibility. Explore how thoughtful architecture can reduce environmental impact while enhancing quality of life.",
    category: "ARCHITECTURE",
    date: "May 13, 2026",
    readTime: "8 MIN READ",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    featured: true,
  },
  {
    id: "2",
    slug: "luxury-meets-function-modern-interior-design-trends",
    title: "Luxury Meets Function: Modern Interior Design Trends",
    excerpt:
      "From natural materials to warm minimalism, discover the latest interior design trends that combine elegance with everyday functionality.",
    category: "INTERIOR DESIGN",
    date: "May 10, 2026",
    readTime: "5 MIN READ",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  },
  {
    id: "3",
    slug: "role-of-landscape-design-in-wellbeing",
    title: "The Role of Landscape Design in Wellbeing",
    excerpt:
      "Well-designed outdoor spaces do more than look beautiful—they improve mental wellbeing, encourage relaxation, and connect us with nature.",
    category: "LANDSCAPE DESIGN",
    date: "May 2, 2026",
    readTime: "6 MIN READ",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    id: "4",
    slug: "construction-quality-commitment-to-excellence",
    title: "Construction Quality: Our Commitment to Excellence",
    excerpt:
      "A closer look at our construction supervision process and how we ensure the highest standards at every stage of development.",
    category: "CONSTRUCTION",
    date: "April 28, 2026",
    readTime: "4 MIN READ",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
  {
    id: "5",
    slug: "5-key-steps-to-successful-project-delivery",
    title: "5 Key Steps to a Successful Project Delivery",
    excerpt:
      "Clear planning, open communication, and the right team—these are the pillars of successful project management.",
    category: "PROJECT MANAGEMENT",
    date: "April 20, 2026",
    readTime: "5 MIN READ",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
  },
];

/* ── Helpers ────────────────────────────────────────── */
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
export default async function BlogPage() {
  /* Fetch published posts from Neon DB */
  let dbPosts: BlogPost[] = [];
  try {
    const rows = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedAt));

    dbPosts = rows.map((p) => ({
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
    console.error("Failed to fetch blog posts from DB:", err);
  }

  /* Use DB posts if available, otherwise show fallback content */
  const allPosts = dbPosts.length > 0 ? dbPosts : FALLBACK_POSTS;

  /* Split: featured (top 2) and standard (rest) */
  const featuredPosts = allPosts.slice(0, 2);
  const standardPosts = allPosts.slice(2);

  const isEmpty = allPosts.length === 0;

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────── */}
      <section className="relative min-h-[420px] flex items-end bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
            alt="Fanoon Blog"
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(4,8,6,0.92) 0%, rgba(4,8,6,0.75) 55%, rgba(4,8,6,0.45) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-charcoal/50 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-20">
          <div style={{ maxWidth: "520px" }}>
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
              className="mb-6"
            />
            <span
              className="block font-bold uppercase tracking-[0.35em] text-primary mb-5"
              style={{ fontSize: "11px" }}
            >
              BLOG
            </span>
            <h1
              className="text-white font-bold leading-[1.1] mb-6"
              style={{ fontSize: "clamp(34px, 5vw, 58px)" }}
            >
              Insights. Ideas.<br />Inspiration.
            </h1>
            <div className="w-10 h-[3px] bg-primary rounded-sm mb-6" />
            <p
              className="text-white/85 leading-relaxed"
              style={{ fontSize: "14px", maxWidth: "430px" }}
            >
              Explore expert perspectives, design insights, industry trends and
              practical guides from the team at Fanoon Consultants.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN CONTENT + SIDEBAR ───────────────────── */}
      <section className="bg-[#fafafa] py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col xl:flex-row gap-12 xl:gap-16 items-start">

            {/* ── Left: Articles ──────────────────────── */}
            <div className="w-full xl:w-[65%]">
              <BlogListing allPosts={allPosts} />
            </div>

            {/* ── Right: Sidebar ──────────────────────── */}
            <div className="w-full xl:w-[35%] xl:sticky xl:top-28">
              <BlogSidebar popularPosts={allPosts.slice(0, 3)} />
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. CTA BANNER ─────────────────────────────── */}
      <section className="relative bg-[#102418] py-14 overflow-hidden border-t border-[#1a3826]">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80"
            alt="Architecture Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 md:gap-8 text-center sm:text-left">
              <div className="flex-shrink-0 hidden sm:flex items-center justify-center relative w-20 h-20 md:w-24 md:h-24">
                <Image
                  src="/monogram.png"
                  alt="Fanoon Monogram"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-[22px] md:text-[26px] mb-1.5 leading-snug">
                  Have a project in mind?
                </h3>
                <p className="text-white/80 text-[15px]">
                  Let&apos;s turn your ideas into inspiring spaces.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href="/contact/start-project">
                <Button
                  variant="primary"
                  className="!bg-white !text-primary hover:!bg-[#f0f0f0] !border-white font-bold px-8 group"
                >
                  START A PROJECT
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

