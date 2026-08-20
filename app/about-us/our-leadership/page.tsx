import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Building2, Leaf, Lightbulb, Users } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Ar. Arsalan Haider | Founder & Principal Architect | Fanoon Consultants",
  description:
    "Ar. Arsalan Haider leads Fanoon Consultants with a vision rooted in purpose, design excellence, and responsible architecture.",
};

const expertise = [
  "Architectural Design & Master Planning",
  "Sustainable & Contextual Design",
  "Construction Documentation & Detailing",
  "Project Management & Coordination",
  "Public & Private Sector Projects",
  "Design Leadership & Team Mentorship",
];

const pillars = [
  { icon: Building2, label: "Architecture", sub: "Leadership" },
  { icon: Lightbulb, label: "Design", sub: "Excellence" },
  { icon: Leaf, label: "Sustainable", sub: "Thinking" },
  { icon: Users, label: "People", sub: "Focused" },
];

const journey = [
  {
    period: "2014 – 2019",
    title: "Education",
    desc: "Completed Bachelor of Architecture from CECOS University of IT & Emerging Sciences, Peshawar.",
  },
  {
    period: "2019 – 2026",
    title: "Professional Growth in UAE",
    desc: "Worked with leading architectural firms in the UAE, delivering diverse scale projects and gaining international exposure.",
  },
  {
    period: "2025",
    title: "Return to Pakistan",
    desc: "Returned with a vision to bring global experience and contribute to the growth of architecture and design in Pakistan.",
  },
  {
    period: "2025 – Present",
    title: "Fanoon Consultants",
    desc: "Founded Fanoon Consultants to deliver meaningful, innovative, and sustainable architecture across diverse sectors.",
  },
];

const portfolioFallback = [
  {
    title: "Cantt Heights",
    category: "Mixed-use Development",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    href: "/about-us/our-leadership/portfolio",
  },
  {
    title: "Green Heights",
    category: "Mixed-use Development",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    href: "/about-us/our-leadership/portfolio",
  },
  {
    title: "Peshawar Cantonment",
    category: "Beautification Project",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    href: "/about-us/our-leadership/portfolio",
  },
  {
    title: "Green Belt Development",
    category: "Landscape & Public Spaces",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    href: "/about-us/our-leadership/portfolio",
  },
];

export default async function LeadershipProfilePage() {
  // Fetch up to 4 of Arsalan's portfolio projects from DB
  let portfolioItems: { title: string; category: string; image: string; href: string }[] = [];
  try {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.isArsalan, true))
      .orderBy(sql`${projects.createdAt} DESC`)
      .limit(4);

    if (rows.length > 0) {
      portfolioItems = rows.map((p) => ({
        title: p.title,
        category: p.category,
        image: p.coverImage,
        href: `/portfolio/${p.slug}`,
      }));
    } else {
      // Fall back to static placeholders while DB is empty
      portfolioItems = portfolioFallback;
    }
  } catch {
    portfolioItems = portfolioFallback;
  }

  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section className="bg-[#0a0f0c] relative overflow-hidden min-h-[560px] flex flex-col justify-between pt-32">
        
        {/* Right side image container — showing the person fully on the right */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[60%] z-0">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&q=80"
            alt="Ar. Arsalan Haider"
            fill
            className="object-cover object-top lg:object-[center_top]"
            priority
          />
          {/* Gradient to blend the image seamlessly into the left solid color */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0c] via-[#0a0f0c]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col justify-between flex-1 pb-10">
          {/* Breadcrumbs */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about-us" },
              { label: "Our Leadership", href: "/about-us/our-leadership" },
              { label: "Ar. Arsalan Haider" },
            ]}
            className="mb-10"
          />

          {/* Main text — left side only */}
          <div className="max-w-[500px]">
            <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-4 block">
              OUR LEADERSHIP
            </span>

            <h1
              className="text-white font-bold leading-[1.1] mb-3"
              style={{ fontSize: "clamp(34px, 5vw, 56px)" }}
            >
              Ar. Arsalan Haider
            </h1>
            <p className="text-primary font-semibold text-[17px] md:text-[19px] mb-5">
              Founder &amp; Principal Architect
            </p>
            <div className="w-10 h-[3px] bg-primary rounded-sm mb-7" />

            <p className="text-white/75 text-[14px] leading-[1.9] mb-10 max-w-[420px]">
              Arsalan Haider leads Fanoon Consultants with a vision rooted in purpose, design excellence, and responsible architecture. His approach blends creativity with technical precision to craft meaningful spaces that inspire people and elevate communities.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-4 gap-3 max-w-[420px]">
              {pillars.map((p, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/8 border border-primary/40 flex items-center justify-center text-primary">
                    <p.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-white text-[11px] font-bold leading-tight">{p.label}</p>
                    <p className="text-white/50 text-[10px]">{p.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ABOUT + PHILOSOPHY ─────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

            {/* ── Left: About + Info List Card ── */}
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-6">
                ABOUT AR. <span className="text-charcoal">ARSALAN HAIDER</span>
              </h3>

              <div className="space-y-4 text-dark-gray text-[14px] leading-[1.85] mb-8">
                <p>
                  Arsalan Haider is the Founder and Principal Architect of Fanoon Consultants. He believes architecture is more than form and function—it is about creating experiences that nurture life, strengthen communities, and stand the test of time.
                </p>
                <p>
                  With a strong foundation in design, detailing, and project management, Arsalan leads multidisciplinary teams in delivering innovative and sustainable solutions across residential, commercial, institutional, and public sector projects.
                </p>
              </div>

              {/* Single bordered info card with internal dividers */}
              <div className="border border-[#e4e4e4] rounded-[8px] overflow-hidden">
                {[
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h6"/></svg>
                    ),
                    label: "Registration No.",
                    value: "PCATP: A-07221",
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    ),
                    label: "Education",
                    value: "CECOS University of IT & Emerging Sciences, Peshawar (2014 – 2019)",
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    ),
                    label: "Experience",
                    value: "2019 – 2026 in UAE | 2026 – Present in Pakistan",
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    ),
                    label: "Email",
                    value: "arsalan@fanoonconsultants.com",
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.44 2 2 0 0 1 3.55 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    ),
                    label: "Phone",
                    value: "+92 318 9944488",
                  },
                ].map((item, i, arr) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 px-5 py-4 ${i < arr.length - 1 ? "border-b border-[#f0f0f0]" : ""}`}
                  >
                    <div className="text-primary mt-0.5 flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-[12px] font-bold text-charcoal mb-0.5">{item.label}</p>
                      <p className="text-[13px] text-dark-gray leading-[1.5]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Philosophy + Expertise ── */}
            <div className="relative">
              {/* Dot grid decoration — top right */}
              <div
                className="absolute top-0 right-0 w-[120px] h-[100px] pointer-events-none select-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #ccc 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                  opacity: 0.5,
                }}
              />

              {/* Philosophy */}
              <div className="mb-12">
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-charcoal mb-6">
                  PHILOSOPHY
                </h3>

                {/* Large opening quote */}
                <div
                  className="text-primary font-black mb-3 leading-none"
                  style={{ fontSize: "56px", fontFamily: "Georgia, serif", lineHeight: 1 }}
                >
                  &#x201C;&#x201C;
                </div>

                <blockquote className="text-charcoal font-medium leading-[1.65] mb-4" style={{ fontSize: "clamp(16px, 2vw, 19px)" }}>
                  Good architecture is not just about buildings; it&apos;s about creating spaces that improve lives and leave a positive impact on the world.
                </blockquote>

                <div className="flex items-end justify-between">
                  <p className="text-primary font-semibold text-[13px]">– Ar. Arsalan Haider</p>
                  {/* Handwriting-style signature */}
                  <span
                    className="text-charcoal/40 text-[22px] italic pr-2"
                    style={{ fontFamily: "'Dancing Script', 'Segoe Script', cursive" }}
                  >
                    Arsalan Haider
                  </span>
                </div>
              </div>

              {/* Expertise */}
              <div>
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-charcoal mb-6">
                  EXPERTISE
                </h3>

                <ul className="divide-y divide-[#f0f0f0]">
                  {expertise.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-dark-gray text-[14px] py-3">
                      <CheckCircle2 className="w-[18px] h-[18px] text-primary flex-shrink-0" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. JOURNEY ────────────────────────────────────────── */}
      <section className="bg-[#111111] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="mb-12">
            <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-3 block">
              JOURNEY
            </span>
            <h2 className="text-white font-bold leading-[1.2]" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
              A Path Built on Passion and Purpose.
            </h2>
          </div>

          {/* Timeline */}
          <div className="hidden md:block">
            {/* Line + Dots row */}
            <div className="relative flex items-center mb-8">
              {/* Full-width green line */}
              <div className="absolute left-0 right-0 h-[2px] bg-primary" />
              {/* Dots positioned evenly */}
              <div className="relative w-full grid grid-cols-4">
                {journey.map((_, i) => (
                  <div key={i} className="flex justify-start">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-[#111111] relative z-10 -ml-1.5 ring-1 ring-primary" />
                  </div>
                ))}
              </div>
            </div>

            {/* Content row */}
            <div className="grid grid-cols-4 gap-8">
              {journey.map((step, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-primary font-bold text-[13px] mb-1 leading-tight">{step.period}</span>
                  <h4 className="text-white font-bold text-[15px] mb-3 leading-snug">{step.title}</h4>
                  <p className="text-white/50 text-[13px] leading-[1.7]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical stacked */}
          <div className="md:hidden flex flex-col gap-0">
            {journey.map((step, i) => (
              <div key={i} className="flex gap-5">
                {/* Left: dot + vertical line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-primary ring-1 ring-primary mt-1" />
                  {i < journey.length - 1 && (
                    <div className="w-[2px] flex-1 bg-primary/30 my-1" />
                  )}
                </div>
                {/* Right: content */}
                <div className="pb-8">
                  <span className="text-primary font-bold text-[13px] mb-1 block">{step.period}</span>
                  <h4 className="text-white font-bold text-[15px] mb-2">{step.title}</h4>
                  <p className="text-white/50 text-[13px] leading-[1.7]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PORTFOLIO HIGHLIGHTS ───────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-3 block">
                PORTFOLIO HIGHLIGHTS
              </span>
              <h2 className="text-charcoal font-bold leading-[1.2]" style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}>
                Designing Meaningful Spaces.
              </h2>
            </div>
            <Link
              href="/about-us/our-leadership/portfolio"
              className="flex items-center gap-3 border border-charcoal/30 text-charcoal hover:border-primary hover:text-primary transition-all duration-200 px-6 py-3 text-[11px] font-bold tracking-[0.15em] uppercase group flex-shrink-0"
            >
              EXPLORE PORTFOLIO
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {portfolioItems.map((item, i) => (
              <Link key={i} href={item.href} className="group cursor-pointer block">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[10px] mb-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                  {/* Category badge */}
                  <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.category}
                  </span>
                </div>
                <h4 className="text-charcoal font-bold text-[14px] mb-0.5 group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-dark-gray/60 text-[12px]">{item.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA BANNER ──────────────────────────────────────── */}
      <section className="bg-[#1c4b31] py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-6">
              {/* Circular graphic */}
              <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 hidden sm:flex items-center justify-center relative">
                <Image
                  src="/monogram.png"
                  alt="Fanoon Monogram"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-[26px] md:text-[32px] font-bold text-white leading-[1.2] mb-1">
                  Great Design Happens
                </h3>
                <h3 className="text-[26px] md:text-[32px] font-bold text-white/85 leading-[1.2]">
                  When Great Minds Collaborate.
                </h3>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-5">
              <p className="text-white/75 text-[14px] max-w-[280px] text-center md:text-right">
                We are always looking for passionate individuals to join our journey.
              </p>
              <Link
                href="/contact"
                className="flex items-center gap-3 border border-white text-white hover:bg-white hover:text-[#1c4b31] px-8 py-3.5 text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-200 group"
              >
                JOIN OUR TEAM
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
