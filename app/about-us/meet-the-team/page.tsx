import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, HardHat, Building2, Award, Trophy } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { db } from "@/db";
import { teamMembers } from "@/db/schema";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Meet the Team | Fanoon Consultants",
  description: "Meet the passionate professionals at Fanoon Consultants who bring creativity, technical excellence, and dedication to every project.",
};

const stats = [
  { icon: Building2, number: "150+", label: "Projects Completed" },
  { icon: Users, number: "80+", label: "Happy Clients" },
  { icon: Award, number: "10+", label: "Years of Experience" },
  { icon: Trophy, number: "25+", label: "Awards & Recognitions" },
];

const teamCategories = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-3 4H2v5h20v-5h-9z" />
      </svg>
    ),
    title: "Architecture",
    desc: "Conceptual design, master planning and architectural detailing.",
    count: "8+ Members",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16h16v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM4 16V8a2 2 0 012-2h12a2 2 0 012 2v8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8" />
      </svg>
    ),
    title: "Interior Design",
    desc: "Creating functional, aesthetic and inspiring interior environments.",
    count: "5+ Members",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-4a4 4 0 014-4h8a4 4 0 014 4v4" />
      </svg>
    ),
    title: "Landscape Design",
    desc: "Designing sustainable landscapes that connect people with nature.",
    count: "4+ Members",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Engineering",
    desc: "Structural, MEP and civil solutions that build strong foundations.",
    count: "3+ Members",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
    title: "3D Visualization",
    desc: "Bringing designs to life with realistic 3D renders and animations.",
    count: "3+ Members",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Project Management",
    desc: "Planning, coordination and execution to deliver projects seamlessly.",
    count: "4+ Members",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
  },
];

export default async function MeetTheTeamPage() {
  let dbMembers: any[] = [];
  try {
    dbMembers = await db.select().from(teamMembers).orderBy(teamMembers.order);
  } catch (err) {
    console.error("Failed to fetch team members", err);
  }

  // Fallback leadership team to match the exact design if DB is empty
  const leadership = dbMembers.length >= 4 ? dbMembers.slice(0, 4) : [
    {
      id: "1",
      name: "Ar. Arsalan Haider",
      role: "Founder & Principal Architect",
      description: "Leads design direction and overall vision, ensuring excellence in every project.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    },
    {
      id: "2",
      name: "Imtiaz Haider",
      role: "Managing Partner",
      description: "Oversees operations, strategy and business development.",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
    },
    {
      id: "3",
      name: "Ar. Bilal Khan",
      role: "Design Director",
      description: "Drives design innovation and ensures creative excellence.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    },
    {
      id: "4",
      name: "Engr. Usman Ali",
      role: "Technical Director",
      description: "Ensures technical accuracy, coordination and quality across disciplines.",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    },
  ];

  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[500px] flex flex-col justify-end pt-32 pb-0 bg-[#0d0d0d]">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt="Office Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about-us" },
              { label: "Meet The Team" },
            ]}
            className="mb-8"
          />

          <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-4 block">
            OUR STRENGTH
          </span>
          <h1 className="text-white font-bold leading-[1.1] mb-5" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
            Meet the Team<span className="text-primary">.</span>
          </h1>
          <p className="text-white/80 text-[14px] leading-[1.8] max-w-[480px] mb-16">
            Behind every detail is a team of passionate professionals who bring creativity, technical excellence and dedication to every project. We work together. We grow together. We build better, together.
          </p>

          {/* Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
            {stats.map((stat, i) => (
              <div key={i} className={`flex items-center gap-4 py-8 ${i < stats.length - 1 ? 'md:border-r border-white/10' : ''} ${i > 0 ? 'md:pl-8' : ''}`}>
                <div className="text-primary opacity-90">
                  <stat.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-white font-bold text-[22px] leading-none mb-1">{stat.number}</div>
                  <div className="text-white/60 text-[11px] font-semibold">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. LEADERSHIP TEAM ─────────────────────────────────── */}
      <section className="bg-[#f8f8f8] py-20 md:py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#f0f0f0] to-transparent pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-charcoal font-bold text-[18px] tracking-[0.1em] uppercase inline-block relative pb-3">
              LEADERSHIP TEAM
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-primary rounded-sm" />
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member) => (
              <div key={member.id} className="bg-white rounded-[8px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#eaeaea] flex h-[180px]">
                {/* Left: Image (fills height) */}
                <div className="w-[40%] h-full relative flex-shrink-0">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                {/* Right: Content */}
                <div className="p-4 flex flex-col justify-between w-full">
                  <div>
                    <h3 className="text-primary font-bold text-[14px] leading-tight mb-1">{member.name}</h3>
                    <p className="text-charcoal font-semibold text-[11px] mb-3 leading-tight">{member.role}</p>
                    <div className="w-6 h-[1px] bg-[#eaeaea] mb-3" />
                    <p className="text-dark-gray/80 text-[10px] leading-[1.6]">
                      {member.description}
                    </p>
                  </div>
                  {/* LinkedIn Icon */}
                  <div className="w-5 h-5 rounded-full border border-dark-gray/20 flex items-center justify-center text-dark-gray hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-colors cursor-pointer self-start">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. OUR TEAMS ───────────────────────────────────────── */}
      <section className="bg-[#f8f8f8] pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          
          <div className="text-center mb-16">
            <h2 className="text-charcoal font-bold text-[18px] tracking-[0.1em] uppercase inline-block relative pb-3">
              OUR TEAMS
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-primary rounded-sm" />
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {teamCategories.map((team, i) => (
              <div key={i} className="bg-white rounded-[10px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#eaeaea] flex flex-col items-center text-center">
                {/* Content top */}
                <div className="pt-8 px-5 pb-6 flex-1 flex flex-col items-center w-full">
                  {/* Icon Circle (Light Green) */}
                  <div className="w-14 h-14 rounded-full bg-[#169B62]/10 flex items-center justify-center text-primary mb-5">
                    {team.icon}
                  </div>
                  <h3 className="text-charcoal font-bold text-[14px] mb-2.5 leading-tight">{team.title}</h3>
                  <p className="text-[#666666] text-[11.5px] leading-[1.6] mb-5 flex-1 max-w-[180px]">
                    {team.desc}
                  </p>
                  <p className="text-primary font-bold text-[11px]">{team.count}</p>
                </div>
                {/* Bottom image strip */}
                <div className="w-full h-[100px] relative mt-auto border-t border-[#eaeaea]">
                  <Image
                    src={team.image}
                    alt={team.title}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. CTA SECTION ─────────────────────────────────────── */}
      <section className="bg-[#111111] border-t border-[#1a1a1a]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 flex flex-col md:flex-row items-center justify-between">
          
          {/* Left Block */}
          <div className="flex items-start gap-8 w-full md:w-1/2 relative md:pr-12">
            {/* Graphic element */}
            <div className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] relative flex-shrink-0 flex items-center justify-center">
              <Image
                src="/monogram.png"
                alt="Fanoon Monogram"
                fill
                className="object-contain"
              />
            </div>
            
            <div>
              <h3 className="text-white font-bold text-[28px] leading-[1.25] mb-4">
                Great projects start<br />with great people.
              </h3>
              <p className="text-white/60 text-[13.5px] leading-[1.6] max-w-[310px]">
                We&apos;re always looking for passionate individuals<br />who share our values and vision.
              </p>
            </div>
            
            {/* Vertical Separator Line */}
            <div className="hidden md:block absolute top-2 bottom-2 right-0 w-[1px] bg-white/10" />
          </div>

          {/* Right Block */}
          <div className="w-full md:w-1/2 md:pl-16 flex flex-col justify-center mt-12 md:mt-0">
            <span className="text-primary font-medium text-[20px] mb-3 block">
              Join Our Team
            </span>
            <p className="text-white/60 text-[13.5px] leading-[1.6] mb-6 max-w-[310px]">
              Think you&apos;d be a great fit? Explore career<br />opportunities and grow with us.
            </p>
            <Link
              href="/about-us/careers"
              className="inline-flex items-center justify-between border border-[#169B62] rounded-[4px] text-white hover:bg-[#169B62]/10 transition-all duration-200 px-5 py-3 text-[11px] font-bold tracking-widest uppercase w-[170px]"
            >
              VIEW CAREERS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </>
  );
}
