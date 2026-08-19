import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Trophy, Globe, Users, Award } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PortfolioGrid, { ProjectData } from "@/components/portfolio/PortfolioGrid";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { sql } from "drizzle-orm";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Portfolio | Ar. Arsalan Haider | Fanoon Consultants",
  description:
    "Explore the portfolio of Ar. Arsalan Haider — a collection of work reflecting a commitment to thoughtful design, functional excellence, and meaningful experiences.",
};

const stats = [
  { icon: Building2, number: "100+", label: "Projects Completed" },
  { icon: Award, number: "12+", label: "Years of Experience" },
  { icon: Trophy, number: "25+", label: "Awards & Recognition" },
  { icon: Globe, number: "3", label: "Countries Worked In" },
  { icon: Users, number: "50+", label: "Happy Clients" },
];

export default async function LeadershipPortfolioPage() {
  let dbProjects: ProjectData[] = [];
  try {
    const rows = await db
      .select()
      .from(projects)
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
      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section className="bg-[#0a0f0c] relative overflow-hidden min-h-[600px] flex flex-col justify-between pt-20">
        
        {/* Right side image container — showing the person fully on the right */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[60%] z-0">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&q=80"
            alt="Ar. Arsalan Haider Portfolio"
            fill
            className="object-cover object-top lg:object-[center_top]"
            priority
          />
          {/* Gradient to blend the image seamlessly into the left solid color */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0c] via-[#0a0f0c]/80 to-transparent" />
          {/* Bottom fade into the stats strip */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col justify-between flex-1 pb-14 pt-4">
          {/* Breadcrumbs */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about-us" },
              { label: "Our Leadership", href: "/about-us/our-leadership" },
              { label: "Ar. Arsalan Haider", href: "/about-us/our-leadership" },
              { label: "Portfolio" },
            ]}
            className="mb-10"
          />

          {/* Main text — constrained to LEFT ~45% so person is visible on right */}
          <div className="max-w-[480px]">
            <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-4 block">
              ARSALAN HAIDER PORTFOLIO
            </span>

            <h1
              className="text-white font-bold leading-[1.1] mb-6"
              style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
            >
              Designs That Inspire.<br />
              Spaces That Endure.
            </h1>

            <p className="text-white/60 text-[13.5px] leading-[1.9] mb-10 max-w-[380px]">
              A collection of work that reflects a commitment to thoughtful design, functional excellence, and meaningful experiences. Each project is a result of collaboration, creativity, and attention to every detail.
            </p>

            {/* Signature + name block */}
            <div className="pt-5 border-t border-white/15">
              <span
                className="text-white/35 text-[22px] italic block mb-2"
                style={{ fontFamily: "'Dancing Script', 'Segoe Script', cursive" }}
              >
                Arsalan Haider
              </span>
              <p className="text-primary font-bold text-[12px]">Ar. Arsalan Haider</p>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.15em] mt-0.5">Founder &amp; Principal Architect</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS STRIP ─────────────────────────────────────── */}
      <section className="bg-[#111111] border-t border-white/5 py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-0">
            {stats.map((stat, i) => (
              <div key={i} className="relative flex flex-col md:flex-row items-center md:items-start gap-3 md:px-6 text-center md:text-left">
                <div className="text-primary flex-shrink-0">
                  <stat.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-white font-bold text-[26px] leading-none mb-1">{stat.number}</div>
                  <div className="text-white/50 text-[11px] uppercase tracking-widest font-medium leading-tight">{stat.label}</div>
                </div>
                {/* Divider */}
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PORTFOLIO GRID ──────────────────────────────────── */}
      <PortfolioGrid initialProjects={dbProjects} />

      {/* ── 4. DESIGN APPROACH ─────────────────────────────────── */}
      <section className="bg-[#0d0d0d] flex flex-col lg:flex-row min-h-[320px]">

        {/* Col 1: Large architectural photo */}
        <div className="w-full lg:w-[30%] relative min-h-[280px] lg:min-h-auto">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80"
            alt="Architecture at night"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          {/* Right fade to blend into middle column */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0d0d0d] to-transparent" />
        </div>

        {/* Col 2: MY DESIGN APPROACH text + process icons */}
        <div className="w-full lg:w-[40%] py-14 px-8 lg:px-12 flex flex-col justify-center border-r border-white/8">
          <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-5 block">
            MY DESIGN APPROACH
          </span>
          <h2
            className="text-white font-bold leading-[1.2] mb-5"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
          >
            Purpose. People. Place.
          </h2>
          <p className="text-white/55 text-[13px] leading-[1.9] mb-10 max-w-[380px]">
            I believe great design begins with understanding people and purpose, responding to place, and crafting spaces that stand the test of time.
          </p>

          {/* 4 process steps */}
          <div className="flex items-start gap-6 flex-wrap">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                ),
                label: "Understanding",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                ),
                label: "Conceptualizing",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                ),
                label: "Designing",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
                label: "Delivering",
              },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2 min-w-[60px]">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-primary/30 flex items-center justify-center text-primary">
                  {step.icon}
                </div>
                <p className="text-white/55 text-[11px] font-medium leading-tight">{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3: Philosophy quote */}
        <div className="w-full lg:w-[30%] py-14 px-8 lg:px-10 flex flex-col justify-center">
          <div
            className="text-primary font-black mb-4 leading-none"
            style={{ fontSize: "52px", fontFamily: "Georgia, serif", lineHeight: 1 }}
          >
            &#x201C;&#x201C;
          </div>
          <blockquote
            className="text-white/80 font-medium leading-[1.75] mb-6"
            style={{ fontSize: "clamp(14px, 1.8vw, 18px)" }}
          >
            Architecture is not just about buildings; it&apos;s about creating spaces that improve lives and leave a positive impact on the world.
          </blockquote>
          <p className="text-primary font-semibold text-[13px]">– Ar. Arsalan Haider</p>
        </div>

      </section>
    </>
  );
}

