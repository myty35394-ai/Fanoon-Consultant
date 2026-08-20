import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, Sofa, Trees, Box, ClipboardList, HardHat, 
  MessageSquare, Search, FileText, Eye, Check, CheckCircle2, Users, Award, ArrowRight
} from "lucide-react";

import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import Stepper from "@/components/ui/Stepper";
import StatItem from "@/components/ui/StatItem";
import CircularProgress from "@/components/ui/CircularProgress";
import HeroSlider from "@/components/home/HeroSlider";
import CtaBanner from "@/components/shared/CtaBanner";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Fanoon Consultants | Architecture, Interior & Landscape Design",
  description: "Fanoon Consultants is a multidisciplinary design consultancy delivering innovative architectural, interior, and landscape solutions with precision, creativity, and integrity.",
  openGraph: {
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Fanoon Consultants Hero Image",
      }
    ],
  },
};

export const revalidate = 0;

export default async function Home() {
  // Fetch up to 4 featured Fanoon projects from the DB (exclude Arsalan-only projects)
  let featuredProjects: { title: string; category: string; location: string | null; coverImage: string; slug: string }[] = [];
  try {
    featuredProjects = await db
      .select()
      .from(projects)
      .where(and(eq(projects.featured, true), eq(projects.isArsalan, false)))
      .orderBy(sql`${projects.createdAt} DESC`)
      .limit(4);

    // If no featured projects, fall back to the 4 most recent non-Arsalan projects
    if (featuredProjects.length === 0) {
      featuredProjects = await db
        .select()
        .from(projects)
        .where(eq(projects.isArsalan, false))
        .orderBy(sql`${projects.createdAt} DESC`)
        .limit(4);
    }
  } catch (err) {
    console.error("Failed to fetch featured projects:", err);
  }

  // 3. Services Data
  const services = [
    {
      title: "Architecture Design",
      slug: "architecture-design",
      description: "Creative and functional architectural design solutions tailored to your vision and context.",
      icon: <Building2 className="w-8 h-8 text-charcoal group-hover:text-primary transition-colors" strokeWidth={1.2} />,
    },
    {
      title: "Interior Design",
      slug: "interior-design",
      description: "Elegant and practical interior spaces that reflect your style and enhance everyday living.",
      icon: <Sofa className="w-8 h-8 text-charcoal group-hover:text-primary transition-colors" strokeWidth={1.2} />,
    },
    {
      title: "Landscape Design",
      slug: "landscape-design",
      description: "Sustainable and innovative landscape designs that connect nature with architecture.",
      icon: <Trees className="w-8 h-8 text-charcoal group-hover:text-primary transition-colors" strokeWidth={1.2} />,
    },
    {
      title: "3D Visualization",
      slug: "3d-visualization",
      description: "High-quality 3D renders and walkthroughs that bring your project to life before it's built.",
      icon: <Box className="w-8 h-8 text-charcoal group-hover:text-primary transition-colors" strokeWidth={1.2} />,
    },
    {
      title: "Project Management",
      slug: "project-management",
      description: "Efficient planning, coordination and management to ensure on-time, on-budget delivery.",
      icon: <ClipboardList className="w-8 h-8 text-charcoal group-hover:text-primary transition-colors" strokeWidth={1.2} />,
    },
    {
      title: "Construction Supervision",
      slug: "construction-supervision",
      description: "Professional site supervision ensuring quality, safety and compliance at every stage.",
      icon: <HardHat className="w-8 h-8 text-charcoal group-hover:text-primary transition-colors" strokeWidth={1.2} />,
    },
  ];

  // 5. Process Data
  const processSteps = [
    "Consultation", "Site Analysis", "Concept Design", "Design Development", 
    "Detailed Documentation", "Tender Documents", "Construction", "Supervision", "Completion"
  ];
  
  const processIcons = [
    <MessageSquare key="1" className="w-5 h-5" />,
    <Search key="2" className="w-5 h-5" />,
    <FileText key="3" className="w-5 h-5" />,
    <ClipboardList key="4" className="w-5 h-5" />,
    <FileText key="5" className="w-5 h-5" />,
    <FileText key="6" className="w-5 h-5" />,
    <HardHat key="7" className="w-5 h-5" />,
    <Eye key="8" className="w-5 h-5" />,
    <Check key="9" className="w-5 h-5" />
  ];

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSlider />

      {/* 2. Who We Are */}
      <section className="bg-white py-24 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left: Decorative Graphic */}
            <div className="w-full lg:w-[45%] relative flex justify-center lg:justify-end">
              <div className="relative w-[340px] h-[340px] md:w-[440px] md:h-[440px] my-8 mr-4">
                {/* Dotted pattern background */}
                <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-[140px] h-[220px] opacity-40 z-0" style={{ backgroundImage: 'radial-gradient(#a3a3a3 2px, transparent 2px)', backgroundSize: '14px 14px' }} />

                {/* Monogram — extra large, behind the circular photo */}
                <div className="absolute inset-0 flex items-center justify-center z-0 scale-[1.65] opacity-95 pointer-events-none">
                  <Image
                    src="/monogram.png"
                    alt="Fanoon Monogram"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Central Circular Image */}
                <div className="absolute inset-[15%] rounded-full overflow-hidden border-[6px] border-white z-10 bg-white shadow-xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" 
                    alt="Modern Architecture Building" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Right: Content */}
            <div className="w-full lg:w-[55%]">
              <span className="text-[11px] font-bold tracking-widest text-primary uppercase mb-5 block">
                WHO WE ARE
              </span>
              <h2 className="mb-6 leading-tight text-[36px] md:text-[42px] font-bold text-charcoal">
                Designing with Purpose<span className="text-primary">.</span><br className="hidden md:block" />
                Building with Passion<span className="text-primary">.</span>
              </h2>
              <div className="space-y-6 mb-10 text-[15px] md:text-[16px] text-dark-gray leading-relaxed max-w-[540px]">
                <p>
                  We are architects, designers and project managers who believe that great design is the perfect balance of beauty, function and sustainability. 
                </p>
                <p>
                  From concept to completion, we collaborate with our clients to create spaces that enhance the way people live, work and experience their environment.
                </p>
              </div>
              <Link href="/about-us">
                <Button variant="primary-outline" icon="arrow-right" className="!border-primary/40 !text-charcoal hover:!bg-primary/5 hover:!border-primary px-8 text-[13px]">
                  READ MORE ABOUT US
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Services */}
      <section className="bg-[#fafafa] py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-bold tracking-widest text-primary uppercase mb-4 block">
              OUR SERVICES
            </span>
            <h2 className="leading-tight text-[36px] md:text-[42px] font-bold text-charcoal">
              Comprehensive Solutions<span className="text-primary">.</span><br />
              Exceptional Results<span className="text-primary">.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {services.map((service) => (
              <Link 
                key={service.title} 
                href={`/services/${service.slug}`}
                className="bg-white px-4 py-10 shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center group hover:-translate-y-1 block cursor-pointer border border-transparent hover:border-primary/30 rounded-sm"
              >
                <div className="relative w-20 h-20 flex items-center justify-center mb-6">
                  {/* Imperfect sketchy green ring */}
                  <svg className="absolute inset-0 w-full h-full text-primary opacity-80 group-hover:scale-105 transition-transform" viewBox="0 0 100 100">
                    <path d="M 50 8 C 75 8, 92 25, 92 50 C 92 72, 78 92, 50 92 C 28 92, 8 75, 8 50 C 8 25, 25 8, 50 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="16 6 8 4 20 6" strokeLinecap="round" className="-rotate-12 origin-center" />
                    <path d="M 45 10 C 60 8, 85 15, 90 40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" opacity="0.5" />
                  </svg>
                  {service.icon}
                </div>
                <h6 className="uppercase text-[12px] font-bold tracking-wider leading-tight mb-4 text-charcoal group-hover:text-primary transition-colors h-8 flex flex-col items-center justify-center">
                  {service.title.split(' ').map((word, i) => (
                    <span key={i}>{word}</span>
                  ))}
                </h6>
                <p className="text-[12px] leading-relaxed text-dark-gray opacity-80 px-1">{service.description}</p>
                <span className="mt-4 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Learn More <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Projects */}
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-primary uppercase mb-4 block">
                FEATURED PROJECTS
              </span>
              <h2 className="leading-tight text-[36px] md:text-[42px] font-bold text-charcoal">
                Some of Our Recent Work<span className="text-primary">.</span>
              </h2>
            </div>
            <div className="hidden md:block pb-2">
              <a href="/portfolio" className="flex items-center text-[12px] font-bold text-charcoal tracking-widest uppercase relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-full after:h-[2px] after:bg-primary/30 hover:after:bg-primary transition-all group">
                VIEW ALL PROJECTS
                <ArrowRight className="w-4 h-4 ml-3 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 snap-x">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <div key={project.slug} className="snap-start min-w-[280px]">
                  <ProjectCard
                    title={project.title}
                    category={project.category}
                    location={project.location ?? undefined}
                    imageUrl={project.coverImage}
                    href={`/portfolio/${project.slug}`}
                  />
                </div>
              ))
            ) : (
              /* Placeholder cards when DB is empty */
              [
                { title: "10 Marla Residence", category: "Architecture", location: "Peshawar", imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
                { title: "Mixed-Use Development", category: "Commercial", location: "Peshawar", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
                { title: "Luxury Interior", category: "Interior Design", location: "Peshawar", imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80" },
                { title: "Landscape Design", category: "Landscape Design", location: "Peshawar Cantonment", imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80" },
              ].map((project) => (
                <div key={project.title} className="snap-start min-w-[280px]">
                  <ProjectCard
                    title={project.title}
                    category={project.category}
                    location={project.location}
                    imageUrl={project.imageUrl}
                    href="/portfolio"
                  />
                </div>
              ))
            )}
          </div>
          
          {/* Decorative Carousel Dots */}
          <div className="flex justify-center mt-12 space-x-2.5">
             <div className="w-2 h-2 rounded-full bg-primary" />
             <div className="w-2 h-2 rounded-full bg-medium-gray/40" />
             <div className="w-2 h-2 rounded-full bg-medium-gray/40" />
          </div>

          <div className="mt-8 text-center md:hidden flex justify-center">
            <a href="/portfolio" className="flex items-center text-[12px] font-bold text-charcoal tracking-widest uppercase relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-full after:h-[2px] after:bg-primary/30 hover:after:bg-primary transition-all">
              VIEW ALL PROJECTS
              <ArrowRight className="w-4 h-4 ml-3" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. Our Process */}
      <section className="bg-charcoal py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <span className="text-[11px] font-bold tracking-widest text-primary uppercase mb-4 block">
              OUR PROCESS
            </span>
            <h2 className="leading-tight text-[36px] md:text-[42px] font-bold text-white">
              A Clear Process<span className="text-primary">.</span> Successful Outcomes<span className="text-primary">.</span>
            </h2>
          </div>
          
          <Stepper 
            variant="rail" 
            steps={processSteps} 
            activeStep={8}
            icons={processIcons}
            className="mb-20"
          />

          <div className="text-center flex justify-center mt-8">
            <Link href="/our-process" className="flex justify-center items-center text-[12px] font-bold text-white tracking-widest uppercase border border-primary/50 bg-transparent hover:bg-primary/20 transition-colors duration-300 px-8 py-3.5 rounded-sm">
              EXPLORE OUR PROCESS
              <ArrowRight className="ml-4 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center relative">
            
            {/* Middle Divider for Desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-light-gray/70 -translate-x-1/2">
               {/* Center green dash */}
               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-4 bg-primary" />
            </div>

            {/* Left: Checklist */}
            <div className="w-full lg:w-1/2 lg:pr-12">
              <span className="text-[11px] font-bold tracking-widest text-primary uppercase mb-4 block">
                WHY CHOOSE US
              </span>
              <h2 className="leading-tight text-[36px] md:text-[42px] font-bold text-charcoal mb-8">
                Commitment You Can<br />Rely On<span className="text-primary">.</span>
              </h2>
              
              <ul className="space-y-4">
                {[
                  "Client-focused approach",
                  "Innovative and sustainable design",
                  "Attention to detail",
                  "On-time, on-budget delivery",
                  "Quality and integrity at every stage"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <CheckCircle2 className="w-[20px] h-[20px] text-primary/80 mr-4 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-[13.5px] font-medium text-dark-gray opacity-80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Right: Stats Grid */}
            <div className="w-full lg:w-1/2 lg:pl-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Building2 className="w-12 h-12 text-primary" strokeWidth={1} />, number: "50+", label: "Projects Completed" },
                  { icon: <Users className="w-12 h-12 text-primary" strokeWidth={1} />, number: "30+", label: "Happy Clients" },
                  { icon: <Award className="w-12 h-12 text-primary" strokeWidth={1} />, number: "5+", label: "Years of Experience" },
                  { icon: <Users className="w-12 h-12 text-primary" strokeWidth={1} />, number: "15+", label: "Professionals" },
                ].map((stat, idx) => (
                  <StatItem
                    key={idx}
                    icon={stat.icon}
                    number={stat.number}
                    label={stat.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Banner */}
      <CtaBanner />
    </>
  );
}
