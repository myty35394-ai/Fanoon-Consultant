import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, Users, Award, Target, Gem, Check, 
  MapPin, Trees, Sparkles, Play, Eye, ArrowRight, Trophy
} from "lucide-react";

import Button from "@/components/ui/Button";
import StatItem from "@/components/ui/StatItem";
import TeamCard from "@/components/ui/TeamCard";
import CtaBanner from "@/components/shared/CtaBanner";
import { db } from "@/db";
import { teamMembers } from "@/db/schema";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "About Us | Fanoon Consultants",
  description: "Learn about our mission, vision, values, and the leadership team behind our multidisciplinary design consultancy.",
};

export default async function AboutUsPage() {
  // Fetch team members from the database, ordered by display order
  let members: (typeof teamMembers.$inferSelect)[] = [];
  try {
    members = await db.select().from(teamMembers).orderBy(teamMembers.order);
  } catch (err) {
    console.error("Failed to fetch team members:", err);
  }
  return (
    <>
      {/* 1. Page Hero */}
      <section className="relative flex items-center justify-start bg-[#0a0a0a]" style={{ minHeight: '58vh' }}>
        {/* Background Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about us.jpeg"
            alt="Fanoon Consultants — Modern Architecture"
            fill
            className="object-cover object-center"
            style={{ opacity: 0.55 }}
            priority
          />
          {/* Dark overlay — strong on the left, fading slightly on right */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(5,10,8,0.92) 0%, rgba(5,10,8,0.75) 45%, rgba(5,10,8,0.45) 100%)'
          }} />
          {/* Extra bottom darkening */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050a08]/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-16">
          <div style={{ maxWidth: '520px' }}>
            {/* Eyebrow */}
            <span className="block font-bold uppercase tracking-[0.35em] text-primary mb-5"
              style={{ fontSize: '11px' }}>
              ABOUT US
            </span>

            {/* H1 */}
            <h1 className="text-white font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.01em' }}>
              Designing Spaces<span className="text-primary">.</span><br />
              Building Trust<span className="text-primary">.</span>
            </h1>

            {/* Body */}
            <p className="leading-relaxed mb-10 text-white/80"
              style={{ fontSize: '14px', maxWidth: '420px' }}>
              Fanoon Consultants is a multidisciplinary design consultancy delivering innovative and dedicated architectural, interior and landscape solutions with precision, creativity and integrity.
            </p>

            {/* Play / OUR STORY */}
            <Link href="/about-us/our-story" className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full border border-white/70 flex items-center justify-center bg-transparent text-white group-hover:border-primary group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <span className="text-white text-[12px] font-bold tracking-[0.2em] group-hover:text-primary transition-colors duration-300">
                OUR STORY
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="bg-white py-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

            {/* Left: Circular Image Composition */}
            <div className="w-full lg:w-[42%] flex-shrink-0 relative flex items-center justify-center" style={{ minHeight: '420px' }}>
              {/* Dotted background */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: 'radial-gradient(circle, #c8c8c8 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                  opacity: 0.25,
                }}
              />

              {/* Monogram — large, behind the circular photo */}
              <div className="absolute inset-0 flex items-center justify-center z-10 scale-[1.65] opacity-95 pointer-events-none">
                <Image
                  src="/monogram.png"
                  alt="Fanoon Monogram"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Circular photo */}
              <div className="relative z-20 rounded-full overflow-hidden shadow-xl border-[8px] border-white"
                style={{ width: '310px', height: '310px' }}>
                <Image
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
                  alt="Modern Architecture"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right: Text + Stats */}
            <div className="w-full lg:flex-1">
              <span className="text-[11px] font-bold tracking-widest text-primary uppercase mb-4 block">
                WHO WE ARE
              </span>
              <h2 className="leading-tight font-bold text-charcoal mb-6" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}>
                We are architects, designers<br />and problem solvers<span className="text-primary">.</span>
              </h2>
              <p className="text-[14px] text-dark-gray leading-relaxed mb-10 max-w-[520px]" style={{ opacity: 0.75 }}>
                At Fanoon Consultants, we believe architecture is more than structures — it&apos;s about people, purpose and place. Our team collaborates closely with clients to create inspiring environments that are functional, sustainable and timeless.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-x-8 gap-y-6">
                {[
                  { Icon: Building2, number: '150+', label: 'PROJECTS\nCOMPLETED' },
                  { Icon: Users,     number: '80+',  label: 'HAPPY\nCLIENTS' },
                  { Icon: Award,     number: '10+',  label: 'YEARS OF\nEXPERIENCE' },
                  { Icon: Trophy,    number: '25+',  label: 'AWARDS &\nRECOGNITIONS' },
                ].map(({ Icon, number, label }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Icon className="w-9 h-9 text-primary flex-shrink-0" strokeWidth={1.2} />
                    <div>
                      <div className="text-[26px] font-bold text-charcoal leading-none mb-1">{number}</div>
                      <div className="text-[8px] font-bold text-dark-gray uppercase tracking-widest leading-[1.6]" style={{ opacity: 0.55 }}>
                        {label.split('\n').map((l, j) => <span key={j} className="block">{l}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Vision / Mission / Values */}
      <section className="bg-[#fafafa] border-y border-light-gray">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row">
            
            {/* Vision */}
            <div className="w-full lg:w-1/3 py-16 lg:py-24 px-6 md:px-12 border-b lg:border-b-0 lg:border-r border-light-gray relative">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-14 h-14 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal">
                    <Eye className="w-6 h-6" strokeWidth={1.5} />
                 </div>
                 <span className="text-[12px] font-bold text-primary tracking-widest uppercase">OUR VISION</span>
               </div>
               <p className="text-[14px] leading-relaxed text-dark-gray opacity-80">
                 To be a leading design consultancy recognized for excellence, innovation, and positive impact on communities and the environment.
               </p>
            </div>
            
            {/* Mission */}
            <div className="w-full lg:w-1/3 py-16 lg:py-24 px-6 md:px-12 border-b lg:border-b-0 lg:border-r border-light-gray">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-14 h-14 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal">
                    <Target className="w-6 h-6" strokeWidth={1.5} />
                 </div>
                 <span className="text-[12px] font-bold text-primary tracking-widest uppercase">OUR MISSION</span>
               </div>
               <p className="text-[14px] leading-relaxed text-dark-gray opacity-80">
                 To deliver exceptional design and project management that exceeds client expectations through creativity, technical expertise, and professionalism.
               </p>
            </div>
            
            {/* Values */}
            <div className="w-full lg:w-1/3 py-16 lg:py-24 px-6 md:px-12">
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-14 h-14 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal">
                    <Gem className="w-6 h-6" strokeWidth={1.5} />
                 </div>
                 <span className="text-[12px] font-bold text-primary tracking-widest uppercase">OUR VALUES</span>
               </div>
               <ul className="space-y-3">
                 {[
                   "Integrity in everything we do",
                   "Excellence in our work",
                   "Innovation in our approach",
                   "Sustainability in our designs",
                   "Collaboration with our clients"
                 ].map((val, idx) => (
                   <li key={idx} className="flex items-center">
                     <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" strokeWidth={3} />
                     <span className="text-[14px] text-dark-gray opacity-80">{val}</span>
                   </li>
                 ))}
               </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* 4. Our Design Philosophy */}
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

            {/* Left: Text + stacked philosophy items */}
            <div className="w-full lg:w-[45%] flex-shrink-0">
              <span className="text-[11px] font-bold tracking-widest text-primary uppercase mb-5 block">
                OUR DESIGN PHILOSOPHY
              </span>
              <h2 className="font-bold text-charcoal mb-6 leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}>
                Thoughtful Design<span className="text-primary">.</span><br />
                Meaningful Impact<span className="text-primary">.</span>
              </h2>
              <p className="text-[13.5px] text-dark-gray leading-relaxed mb-10" style={{ opacity: 0.7, maxWidth: '420px' }}>
                We design with a deep understanding of context, users and purpose. Every project is a balance of aesthetics, functionality, sustainability and value — creating spaces that inspire and endure.
              </p>

              {/* Vertical list of 4 items */}
              <div className="flex flex-col gap-7">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9 flex-shrink-0" stroke="var(--color-primary)" strokeWidth="1.5">
                        <rect x="4" y="16" width="20" height="20" rx="1"/>
                        <path d="M4 20 L14 10 L24 16"/>
                        <rect x="14" y="26" width="6" height="10"/>
                        <rect x="26" y="8" width="10" height="28" rx="1"/>
                        <line x1="28" y1="14" x2="34" y2="14"/>
                        <line x1="28" y1="18" x2="34" y2="18"/>
                        <line x1="28" y1="22" x2="34" y2="22"/>
                      </svg>
                    ),
                    title: 'Context Driven',
                    desc: 'Responding to environment, culture and community.',
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9 flex-shrink-0" stroke="var(--color-primary)" strokeWidth="1.5">
                        <circle cx="20" cy="12" r="6"/>
                        <path d="M6 36 C6 28 34 28 34 36"/>
                        <circle cx="10" cy="18" r="4"/>
                        <path d="M2 32 C2 26 18 26 18 32"/>
                        <circle cx="30" cy="18" r="4"/>
                        <path d="M22 32 C22 26 38 26 38 32"/>
                      </svg>
                    ),
                    title: 'User Focused',
                    desc: 'Designing for comfort, functionality and well-being.',
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9 flex-shrink-0" stroke="var(--color-primary)" strokeWidth="1.5">
                        <path d="M20 4 C20 4 8 14 8 24 A12 12 0 0 0 32 24 C32 14 20 4 20 4Z"/>
                        <line x1="20" y1="16" x2="20" y2="28"/>
                        <line x1="14" y1="22" x2="26" y2="22"/>
                        <circle cx="20" cy="36" r="2"/>
                      </svg>
                    ),
                    title: 'Sustainable Solutions',
                    desc: 'Creating responsible, efficient and lasting environments.',
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9 flex-shrink-0" stroke="var(--color-primary)" strokeWidth="1.5">
                        <polygon points="20,4 24,14 36,14 26,22 30,34 20,26 10,34 14,22 4,14 16,14"/>
                      </svg>
                    ),
                    title: 'Timeless Aesthetics',
                    desc: 'Blending beauty, proportion and detail.',
                  },
                ].map(({ icon, title, desc }, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="flex-shrink-0 mt-0.5">{icon}</div>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-charcoal mb-1">{title}</h4>
                      <p className="text-[12.5px] text-dark-gray leading-relaxed" style={{ opacity: 0.65 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image + flush green promo bar */}
            <div className="w-full lg:flex-1 flex flex-col">
              {/* Image — sharp corners */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3.2' }}>
                <Image
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80"
                  alt="Interior Architecture"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Dark green bar — flush below image, no gap */}
              <div className="bg-[#1a2e22] flex flex-row items-center justify-between px-8 py-7 gap-6">
                {/* Left: text content */}
                <div className="flex-1 min-w-0">
                  <h5 className="text-[14px] font-bold text-white mb-2 leading-snug">Our Promise</h5>
                  <p className="text-[12px] text-white/75 leading-relaxed mb-4" style={{ maxWidth: '260px' }}>
                    We are committed to delivering exceptional design solutions with honesty, transparency and dedication at every step.
                  </p>
                  {/* Cursive signature */}
                  <span
                    className="text-white/70 italic"
                    style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive", fontSize: '20px', opacity: 0.9 }}
                  >
                    Arsalan Haider
                  </span>
                </div>

                {/* Right: circular play button + PLAY VIDEO label */}
                <div className="flex flex-col items-center gap-3 flex-shrink-0">
                  <Link
                    href="/portfolio"
                    className="w-14 h-14 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                    aria-label="Play video"
                  >
                    <Play className="w-5 h-5 text-white ml-0.5 fill-current" />
                  </Link>
                  <span className="text-[9px] font-bold text-white tracking-[0.25em] uppercase whitespace-nowrap">
                    PLAY VIDEO
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* 5. Our Leadership */}
      <section className="bg-[#0f0f0f] py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] lg:grid-cols-[280px_1fr_1fr_1fr] gap-0 items-center">

            {/* Col 1: Label + Heading */}
            <div className="py-8 pr-8 md:border-r border-white/10 relative">
              <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-5 block">
                OUR LEADERSHIP
              </span>
              <h2 className="text-white font-bold leading-[1.2] mb-5" style={{ fontSize: "clamp(26px, 3vw, 38px)" }}>
                The Minds Behind the Vision.
              </h2>
              <div className="w-8 h-[3px] bg-primary rounded-sm" />
              {/* Right fade divider */}
              <div className="hidden md:block absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </div>

            {/* Col 2: Profile Card */}
            <div className="py-8 px-8 md:border-r border-white/10 relative flex flex-col items-center text-center min-w-[220px]">
              {/* Circle photo */}
              <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-2 border-white/10 mb-5 flex-shrink-0">
                <Image
                  src={
                    (members.length > 0 && members[0].imageUrl)
                      ? members[0].imageUrl
                      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop&crop=faces"
                  }
                  alt="Ar. Arsalan Haider"
                  width={110}
                  height={110}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-primary font-bold text-[17px] mb-1">
                {members.length > 0 ? members[0].name : "Ar. Arsalan Haider"}
              </h3>
              <p className="text-white/60 text-[12px] mb-5">
                {members.length > 0 ? members[0].role : "Founder & Principal Architect"}
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a
                  href="mailto:info@fanoonconsultants.com"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </a>
              </div>
              {/* Right fade divider */}
              <div className="hidden md:block absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </div>

            {/* Col 3: Bio + View Profile */}
            <div className="py-8 px-8 md:border-r border-white/10 relative flex flex-col justify-center">
              <p className="text-white/75 text-[14px] leading-[1.8] mb-7">
                <span className="text-white font-semibold">
                  {members.length > 0 ? members[0].name : "Ar. Arsalan Haider"}
                </span>{" "}
                {members.length > 0 && members[0].description
                  ? members[0].description
                  : "leads the creative direction and strategic vision of Fanoon Consultants. With a strong background in architecture and project management, he is committed to delivering innovative solutions that combine aesthetics, functionality and sustainability."}
              </p>
              <div className="w-8 h-[2px] bg-primary rounded-sm mb-7" />
              <Link
                href="/about-us/our-leadership"
                className="flex items-center gap-3 text-white/80 hover:text-primary text-[12px] font-bold tracking-[0.15em] uppercase transition-colors duration-200 group"
              >
                VIEW PROFILE
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              {/* Right fade divider */}
              <div className="hidden md:block absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </div>

            {/* Col 4: Team photo + Our Team */}
            <div className="py-8 pl-8 flex flex-col justify-center">
              {/* Team group photo */}
              <div className="w-full aspect-[16/9] rounded-[10px] overflow-hidden mb-5 relative">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Our Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <h4 className="text-primary font-bold text-[16px] mb-1">Our Team</h4>
              <p className="text-white/60 text-[13px] mb-4 leading-[1.5]">
                Architects. Designers. Planners.<br />Problem Solvers.
              </p>
              <div className="w-8 h-[2px] bg-primary rounded-sm mb-4" />
              <Link
                href="/about-us/meet-the-team"
                className="flex items-center gap-3 text-white/80 hover:text-primary text-[12px] font-bold tracking-[0.15em] uppercase transition-colors duration-200 group"
              >
                MEET THE TEAM
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <CtaBanner />
    </>
  );
}
