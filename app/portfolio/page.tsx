import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Users,
  PenTool,
  Trophy,
} from "lucide-react";

import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import StatItem from "@/components/ui/StatItem";
import PortfolioGrid, { ProjectData } from "@/components/portfolio/PortfolioGrid";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const revalidate = 0; // Always fetch fresh from DB

export const metadata: Metadata = {
  title: "Portfolio | Fanoon Consultants",
  description:
    "Explore our diverse portfolio of architectural, interior, landscape, and development projects. Each reflects our commitment to quality, creativity, and client satisfaction.",
};

const stats = [
  { icon: <Building2 />, number: "150+", label: "Projects Completed" },
  { icon: <Users />, number: "80+", label: "Happy Clients" },
  { icon: <PenTool />, number: "10+", label: "Years of Experience" },
  { icon: <Trophy />, number: "25+", label: "Awards & Recognitions" },
];

/* ─── Page ────────────────────────────────────────────────────── */

export default async function PortfolioPage() {
  // Fetch all Fanoon projects (exclude Arsalan-only) from Neon DB, newest first
  let dbProjects: ProjectData[] = [];
  try {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.isArsalan, false))
      .orderBy(sql`${projects.createdAt} DESC`);

    dbProjects = rows.map((p) => ({
      title: p.title,
      category: p.category,
      subtitle: p.description ?? undefined,
      location: p.location ?? undefined,
      imageUrl: p.coverImage,
      href: `/portfolio/${p.slug}`,
    }));
  } catch (err) {
    console.error("Failed to fetch portfolio projects:", err);
  }

  return (
    <>
      {/* ── JSON-LD ──────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://fanoonconsultants.com/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Portfolio",
                    item: "https://fanoonconsultants.com/portfolio",
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* ── 1. Hero ──────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-start bg-[#080c0a]"
        style={{ minHeight: "55vh" }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80"
            alt="Fanoon Consultants Portfolio"
            fill
            className="object-cover object-center"
            style={{ opacity: 0.4 }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(4,8,6,0.95) 0%, rgba(4,8,6,0.75) 50%, rgba(4,8,6,0.40) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#040806]/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-36 pb-20">
          <div style={{ maxWidth: "560px" }}>
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
              className="mb-6"
            />
            <span
              className="block font-bold uppercase tracking-[0.35em] text-primary mb-5"
              style={{ fontSize: "11px" }}
            >
              OUR PORTFOLIO
            </span>
            <h1
              className="text-white font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}
            >
              Designing Spaces<span className="text-primary">.</span>
              <br />
              Delivering Excellence<span className="text-primary">.</span>
            </h1>
            <p
              className="text-white/85 leading-relaxed mb-8"
              style={{ fontSize: "14px", maxWidth: "480px" }}
            >
              Explore our diverse portfolio of architectural, interior,
              landscape, and development projects. Each project reflects our
              commitment to quality, creativity, and client satisfaction.
            </p>
            <Link href="/contact/start-project">
              <Button variant="primary" icon="arrow-right">
                START A PROJECT
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2 & 3. Filter Bar + Grid ─────────────────────────── */}
      {dbProjects.length === 0 ? (
        <section className="bg-white py-32 text-center">
          <p className="text-dark-gray opacity-50 text-sm">
            No projects have been published yet. Add some from the Admin Dashboard.
          </p>
        </section>
      ) : (
        <PortfolioGrid initialProjects={dbProjects} />
      )}

      {/* ── 4. Stats Bar ─────────────────────────────────────── */}
      <section className="bg-charcoal py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
            {stats.map((stat, idx) => (
              <StatItem
                key={idx}
                icon={stat.icon}
                number={stat.number}
                label={stat.label}
                theme="dark"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
