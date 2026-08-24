import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Building2, 
  GraduationCap, 
  Users2, 
  Leaf, 
  MapPin, 
  Briefcase 
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { db } from "@/db";
import { jobPostings } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { seedStandardJobsIfEmpty } from "@/app/api/admin/jobs/route";
import { getSiteSettings } from "@/lib/settings";

export const revalidate = 60; // Revalidate every 60s for fresh job postings

export const metadata: Metadata = {
  title: "Join Our Team | Fanoon Consultants",
  description: "Build your career with Fanoon Consultants. Explore open positions and discover a place to grow and belong.",
};

const cultureFeatures = [
  { icon: Users, title: "Collaborative Environment", desc: "Work with talented professionals who inspire and support each other." },
  { icon: Lightbulb, title: "Creative Freedom", desc: "We encourage innovation and value fresh perspectives." },
  { icon: TrendingUp, title: "Career Growth", desc: "Continuous learning and clear paths for professional growth." },
  { icon: ShieldCheck, title: "Well Being", desc: "We care about your well-being and work-life balance." },
  { icon: Award, title: "Recognition", desc: "Your contributions are recognized and celebrated." },
];

const whyJoinCards = [
  { 
    title: "Meaningful Projects", 
    desc: "Work on diverse projects that create real impact.", 
    icon: Building2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" 
  },
  { 
    title: "Continuous Learning", 
    desc: "Access workshops, mentorship, and professional development programs.", 
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" 
  },
  { 
    title: "Global Diversity", 
    desc: "Be part of an inclusive team that celebrates diverse perspectives.", 
    icon: Users2,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80" 
  },
  { 
    title: "Sustainable Focus", 
    desc: "Contribute to forward-thinking, sustainable design solutions.", 
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&q=80" 
  },
];

// Helper Graphic Component used in CTA
const CircleGraphic = ({ className }: { className?: string }) => (
  <div className={`relative flex-shrink-0 flex items-center justify-center ${className}`}>
    <Image
      src="/monogram.png"
      alt="Fanoon Monogram"
      fill
      className="object-contain"
    />
  </div>
);

// Hero Specific Graphic
const HeroGraphic = ({ className }: { className?: string }) => (
  <div className={`relative flex-shrink-0 flex items-center justify-center ${className}`}>
    <Image
      src="/monogram.png"
      alt="Fanoon Monogram"
      fill
      className="object-contain drop-shadow-[0_0_30px_rgba(22,155,98,0.25)]"
      priority
    />
  </div>
);

// Map predefined role slugs to their dedicated custom application pages
const predefinedRoleMap: Record<string, string> = {
  "architect": "/about-us/careers/architect",
  "interior-designer": "/about-us/careers/interior-designer",
  "3d-visualizer": "/about-us/careers/3d-visualizer",
  "landscape-architect": "/about-us/careers/landscape-architect",
  "draftsman": "/about-us/careers/draftsman",
  "structural-engineer": "/about-us/careers/structural-engineer",
  "civil-engineer": "/about-us/careers/civil-engineer",
  "quantity-surveyor": "/about-us/careers/quantity-surveyor",
};

function getJobDestination(slug: string, title: string) {
  const normalizedSlug = slug.toLowerCase().trim();
  const normalizedTitle = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  if (predefinedRoleMap[normalizedSlug]) return predefinedRoleMap[normalizedSlug];
  if (predefinedRoleMap[normalizedTitle]) return predefinedRoleMap[normalizedTitle];

  // If any other custom job posted by admin, route to General Application form
  return `/about-us/careers/general?role=${encodeURIComponent(title)}`;
}

export default async function CareersPage() {
  await seedStandardJobsIfEmpty();
  const settings = await getSiteSettings();

  const activeJobs = await db
    .select()
    .from(jobPostings)
    .where(eq(jobPostings.active, true))
    .orderBy(sql`${jobPostings.order} ASC, ${jobPostings.createdAt} DESC`);

  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section className="bg-[#0a0f0c] relative overflow-hidden min-h-[700px] flex flex-col justify-center pt-32 pb-16">
        
        {/* Background Image on Right */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[65%] z-0">
          <Image
            src="/Careers.jpeg"
            alt="Fanoon Team Collaborating"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Sharper gradient fade from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0c] via-[#0a0f0c] via-30% to-transparent" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 flex items-center">
          
          <div className="max-w-[560px] relative">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about-us" },
                { label: "Join Our Team" },
              ]}
              className="mb-10"
            />

            <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-4 block">
              JOIN OUR TEAM
            </span>
            
            <h1 className="text-white font-bold leading-[1.1] mb-6" style={{ fontSize: "clamp(44px, 5vw, 64px)" }}>
              Build Your Career<span className="text-primary">.</span><br />
              Shape the Future<span className="text-primary">.</span>
            </h1>

            <div className="w-10 h-[2px] bg-primary mb-6" />

            <p className="text-white/60 text-[15px] leading-[1.8] mb-12 max-w-[480px]">
              At Fanoon Consultants, we believe great design is the result of creative minds working together. Join a passionate team where your ideas are valued, your growth is supported, and your work makes a real impact.
            </p>

            <Link
              href="#opportunities"
              className="inline-flex items-center justify-between border border-primary/40 rounded-[4px] text-white hover:border-primary hover:bg-primary/5 transition-all duration-300 px-6 py-4 text-[11.5px] font-bold tracking-widest uppercase w-[260px] group"
            >
              EXPLORE OPPORTUNITIES
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Custom Graphic overlapping right side */}
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-[340px] opacity-90 mix-blend-screen pointer-events-none">
              <HeroGraphic className="w-[380px] h-[380px]" />
            </div>
          </div>
          
        </div>
      </section>

      {/* ── 2. OUR CULTURE ─────────────────────────────────────── */}
      <section className="bg-[#fcfcfc] py-20 md:py-28 border-b border-[#eaeaea]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          
          {/* Top header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-3 block">
                OUR CULTURE
              </span>
              <h2 className="text-charcoal font-bold leading-[1.2]" style={{ fontSize: "clamp(28px, 4vw, 36px)" }}>
                A Place to Grow.<br />A Team to Belong To.
              </h2>
              <div className="w-8 h-[2px] bg-primary mt-5" />
            </div>
            <p className="text-dark-gray/80 text-[13.5px] leading-[1.8] max-w-[420px] md:pl-10 md:border-l border-[#ddd]">
              We foster a culture of collaboration, creativity and continuous learning. We value diversity, encourage new ideas and empower our team members to take ownership and make a difference.
            </p>
          </div>

          {/* 5 Icons Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#eaeaea]">
            {cultureFeatures.map((feat, i) => (
              <div key={i} className={`flex flex-col items-center text-center pt-8 sm:pt-0 ${i > 0 ? 'sm:pl-6 lg:pl-8' : ''}`}>
                <div className="text-primary mb-5">
                  <feat.icon className="w-10 h-10" strokeWidth={1.2} />
                </div>
                <h3 className="text-charcoal font-bold text-[14px] mb-3">{feat.title}</h3>
                <p className="text-dark-gray/70 text-[12px] leading-[1.6]">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. WHY JOIN FANOON ─────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10">
            
            {/* Left Col (4/12) */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-3 block">
                WHY JOIN FANOON
              </span>
              <h2 className="text-charcoal font-bold leading-[1.2] mb-5" style={{ fontSize: "clamp(30px, 4vw, 42px)" }}>
                More Than a Job.<br />A Purpose<span className="text-primary">.</span>
              </h2>
              <div className="w-8 h-[2px] bg-primary mb-6" />
              <p className="text-dark-gray/80 text-[13.5px] leading-[1.8] mb-10 max-w-[340px]">
                Be a part of meaningful projects that shape communities and inspire lives. At Fanoon Consultants, your work has purpose and your voice matters.
              </p>
              <Link
                href="/about-us"
                className="inline-flex items-center justify-between border border-primary/30 rounded-[4px] text-charcoal hover:border-primary transition-all duration-300 px-5 py-3.5 text-[11px] font-bold tracking-widest uppercase w-[220px] group"
              >
                LEARN MORE ABOUT US
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Col (8/12) Continuous Image Layout */}
            <div className="lg:col-span-8 relative">
              
              {/* Continuous Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden rounded-[2px]">
                <Image 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" 
                  alt="Fanoon Projects" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#0a0f0c]/90" />
                
                {/* White Divider Lines to create "gaps" */}
                <div className="hidden sm:block absolute top-0 bottom-0 left-[50%] md:left-[25%] w-[10px] bg-white z-0" />
                <div className="hidden md:block absolute top-0 bottom-0 left-[50%] w-[10px] bg-white z-0" />
                <div className="hidden md:block absolute top-0 bottom-0 left-[75%] w-[10px] bg-white z-0" />
              </div>

              {/* 4 Cards Content */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-[360px] md:h-[420px]">
                {whyJoinCards.map((card, i) => (
                  <div key={i} className="p-6 md:p-8 flex flex-col justify-center border-b-[10px] sm:border-b-0 border-white">
                    <card.icon className="w-8 h-8 text-primary mb-6" strokeWidth={1.2} />
                    <h3 className="text-white font-bold text-[17px] leading-tight mb-4 pr-2">
                      {card.title}
                    </h3>
                    <div className="w-6 h-[2px] bg-primary mb-5" />
                    <p className="text-white/60 text-[12.5px] leading-[1.6]">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 4. CURRENT OPPORTUNITIES ───────────────────────────── */}
      <section id="opportunities" className="bg-[#f8f8f8] py-20 md:py-28 border-t border-[#eaeaea]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-3 block">
                OPEN POSITIONS
              </span>
              <h2 className="text-charcoal font-bold leading-[1.2]" style={{ fontSize: "clamp(28px, 4vw, 36px)" }}>
                Current Opportunities
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="text-[12.5px] leading-[1.6] text-dark-gray/80">
                Don&apos;t see a role that fits?<br />
                Send us your CV at <br className="hidden sm:block" />
                <a href={`mailto:${settings.careersEmail}`} className="text-primary font-medium hover:underline">{settings.careersEmail}</a>
              </div>
              <Link
                href="/about-us/careers/general"
                className="inline-flex items-center justify-between border border-[#eaeaea] bg-white rounded-[4px] text-charcoal hover:border-primary hover:text-primary transition-all duration-200 px-5 py-3.5 text-[10px] font-bold tracking-widest uppercase w-[220px]"
              >
                SEND GENERAL APPLICATION
                <ArrowRight className="w-3.5 h-3.5 text-[#a0a0a0]" />
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {activeJobs.map((job) => {
              const destinationUrl = getJobDestination(job.slug, job.title);

              return (
                <div key={job.id} className="bg-white border border-[#eaeaea] rounded-[6px] p-5 lg:p-6 flex flex-col lg:flex-row lg:items-center gap-6 transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] group">
                  
                  <div className="flex items-center gap-5 flex-1">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Briefcase className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-charcoal font-bold text-[15px] mb-1">{job.title}</h3>
                      <p className="text-dark-gray/60 text-[12px]">{job.department}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 lg:gap-16 flex-1">
                    <div className="flex items-center gap-2 text-dark-gray/80 text-[12.5px]">
                      <MapPin className="w-4 h-4 text-[#a0a0a0]" strokeWidth={1.5} />
                      {job.location || "Peshawar, Pakistan"}
                    </div>
                    <div className="flex items-center gap-2 text-dark-gray/80 text-[12.5px]">
                      <Briefcase className="w-4 h-4 text-[#a0a0a0]" strokeWidth={1.5} />
                      {job.type || "Full-time"}
                    </div>
                  </div>

                  <div className="flex-shrink-0 mt-2 lg:mt-0">
                    <Link
                      href={destinationUrl}
                      className="inline-flex items-center justify-between border border-[#eaeaea] rounded-[4px] text-charcoal group-hover:border-primary group-hover:bg-primary/5 group-hover:text-primary transition-all duration-200 px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase w-[150px]"
                    >
                      VIEW DETAILS
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 5. PRE-FOOTER CTA ──────────────────────────────────── */}
      <section className="bg-[#111111] border-t border-[#1a1a1a]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 flex flex-col md:flex-row items-center justify-between">
          
          {/* Left Block */}
          <div className="flex items-start gap-8 w-full md:w-[55%] relative md:pr-12">
            <CircleGraphic className="w-[110px] h-[110px] md:w-[130px] md:h-[130px]" />
            
            <div>
              <h3 className="text-white font-bold text-[28px] leading-[1.25] mb-4">
                Let&apos;s Create Extraordinary<br />Spaces Together<span className="text-primary">.</span>
              </h3>
            </div>
            
            {/* Vertical Separator Line */}
            <div className="hidden md:block absolute top-2 bottom-2 right-0 w-[1px] bg-white/10" />
          </div>

          {/* Right Block */}
          <div className="w-full md:w-[45%] md:pl-16 flex flex-col justify-center mt-12 md:mt-0">
            <p className="text-white/60 text-[13.5px] leading-[1.6] mb-6 max-w-[310px]">
              Take the next step in your career with Fanoon Consultants and be part of a team that designs a better tomorrow.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-between border border-[#169B62] rounded-[4px] text-white hover:bg-[#169B62]/10 transition-all duration-200 px-5 py-3 text-[11px] font-bold tracking-widest uppercase w-[170px]"
            >
              JOIN OUR TEAM
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </>
  );
}
