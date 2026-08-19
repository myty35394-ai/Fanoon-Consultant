import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Target,
  Lightbulb,
  ShieldCheck,
  Leaf,
  MessageSquare,
  Search,
  PenTool,
  LayoutDashboard,
  ClipboardList,
  HardHat,
  CalendarCheck,
  Award, // Using Award as alternative to ShieldCheck for stats if needed
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import StatItem from "@/components/ui/StatItem";
import ProcessTimeline, { ProcessStep } from "@/components/our-process/ProcessTimeline";

export const metadata: Metadata = {
  title: "Our Process | Fanoon Consultants",
  description:
    "A well-defined process is the backbone of every successful project. Explore Fanoon Consultants' 6-step design and delivery process.",
};

const principles = [
  {
    icon: <Users />,
    title: "Client-Centered",
    desc: "We listen, understand and align our solutions with your goals and vision",
  },
  {
    icon: <Target />,
    title: "Clear & Transparent",
    desc: "We keep you informed at every step with open communication",
  },
  {
    icon: <Lightbulb />,
    title: "Creative & Functional",
    desc: "We combine creativity with functionality to deliver inspiring spaces",
  },
  {
    icon: <ShieldCheck />,
    title: "Quality Assured",
    desc: "We follow the highest standards of quality in design, documentation and execution",
  },
  {
    icon: <Leaf />,
    title: "Sustainable Approach",
    desc: "We design responsibly for a better future and a positive environmental impact",
  },
];

const timelineSteps: ProcessStep[] = [
  {
    number: "01",
    icon: <MessageSquare />,
    title: "Project Initiation",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    bullets: [
      "Initial consultation",
      "Understanding your needs",
      "Project goals & objectives",
      "Scope of services",
      "Feasibility Review",
    ],
  },
  {
    number: "02",
    icon: <Search />,
    title: "Research & Analysis",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    bullets: [
      "Site analysis",
      "Context & environment study",
      "Regulations & compliance",
      "Space requirements",
      "Client brief finalization",
    ],
  },
  {
    number: "03",
    icon: <PenTool />,
    title: "Concept Design",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    bullets: [
      "Concept development",
      "Design exploration",
      "3D massing & mood boards",
      "Client presentation",
      "Concept approval",
    ],
  },
  {
    number: "04",
    icon: <LayoutDashboard />,
    title: "Design Development",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    bullets: [
      "Detailed design",
      "Plans, elevations & sections",
      "Material & finishes selection",
      "3D visualization",
      "Client review & approval",
    ],
  },
  {
    number: "05",
    icon: <ClipboardList />,
    title: "Documentation",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80", // Using a drafting photo
    bullets: [
      "Construction drawings",
      "Structural, MEP coordination",
      "Specifications & BOQs",
      "Authority submissions",
      "Tender documentation",
    ],
  },
  {
    number: "06",
    icon: <HardHat />,
    title: "Construction & Handover",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    bullets: [
      "Construction supervision",
      "Quality & progress monitoring",
      "Site coordination",
      "Final inspection",
      "Project handover",
    ],
  },
];

const actionImages = [
  {
    title: "Concept",
    desc: "Every great design begins with a meaningful idea.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
  },
  {
    title: "Design",
    desc: "We refine the concept into functional & beautiful designs.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    title: "Build",
    desc: "We bring the designs to life with precision and care.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
  {
    title: "Deliver",
    desc: "We hand over spaces that inspire and endure.",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80",
  },
];

export default function OurProcessPage() {
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
                    name: "Our Process",
                    item: "https://fanoonconsultants.com/our-process",
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* ── 1. PAGE HERO ─────────────────────────────────────── */}
      <section className="relative bg-charcoal pt-32 lg:pb-0 pb-12 overflow-hidden border-b border-white/5">
        {/* Desktop Image (Bleeds to right edge) */}
        <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
            alt="Fanoon Consultants Process"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient to fade the left edge of the image into the background */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Content */}
            <div className="w-full lg:w-[55%] pb-8 lg:pb-24 pr-0 lg:pr-12">
              <div className="mb-8">
                <Breadcrumb items={[{ label: "Our Process" }]} />
              </div>
              <div className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-4">
                OUR PROCESS
              </div>
              <h1 className="text-white font-bold text-[36px] md:text-[46px] lg:text-[56px] leading-[1.1] mb-6 tracking-tight">
                A Structured Approach<span className="text-primary">.</span><br />
                Thoughtful Results<span className="text-primary">.</span>
              </h1>
              <div className="w-12 h-[3px] bg-primary mb-6" />
              <p className="text-white/80 text-[15px] md:text-[16px] leading-[1.8] max-w-[500px]">
                At Fanoon Consultants, our process is built on clarity, collaboration and commitment. From the first conversation to the final handover, we follow a proven approach that ensures quality, transparency and exceptional design outcomes.
              </p>
            </div>

            {/* Mobile Image (Visible only on small screens) */}
            <div className="w-full h-[400px] relative lg:hidden mt-8 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                alt="Fanoon Consultants Process"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PRINCIPLES ROW ─────────────────────────────────── */}
      <section className="bg-[#fafafa] py-20 border-b border-[#e5e5e5]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#e0e0e0]">
            {principles.map((p, idx) => (
              <div key={idx} className={`flex flex-col items-center text-center ${idx > 0 ? "pt-10 md:pt-0" : ""} px-2`}>
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-5 border border-[#eaeaea]">
                  {React.cloneElement(p.icon as React.ReactElement<any>, {
                    className: "w-6 h-6 text-primary",
                    strokeWidth: 1.5,
                  })}
                </div>
                <h3 className="text-[15px] font-bold text-charcoal mb-3">{p.title}</h3>
                <p className="text-[13px] text-dark-gray leading-[1.6]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. OUR 6-STEP DESIGN & DELIVERY PROCESS ────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12 mb-16">
            <div className="w-full md:w-[45%] lg:w-[40%]">
              <h2 className="text-[28px] md:text-[34px] font-bold text-charcoal leading-[1.2] mb-5">
                Our 6-Step Design &<br />Delivery Process
              </h2>
              <div className="w-12 h-[3px] bg-primary rounded-sm" />
            </div>
            <div className="w-full md:w-[55%] lg:w-[60%] pt-2">
              <p className="text-[14px] md:text-[15px] text-dark-gray leading-[1.7]">
                A well-defined process is the backbone of every successful project.<br className="hidden md:block" />Here&apos;s how we turn your vision into reality.
              </p>
            </div>
          </div>

          {/* Timeline Component */}
          <ProcessTimeline steps={timelineSteps} />
        </div>
      </section>

      {/* ── 4. WHY OUR PROCESS WORKS ──────────────────────────── */}
      <section className="bg-charcoal border-t border-white/5 py-0">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row items-stretch divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Left Content */}
            <div className="w-full lg:w-[25%] flex flex-col justify-center py-16 lg:py-24 pr-0 lg:pr-10 xl:pr-12">
              <h3 className="text-[22px] md:text-[24px] font-bold text-white mb-5 leading-tight">
                Why Our Process Works
              </h3>
              <p className="text-white/70 text-[13.5px] leading-[1.8]">
                We believe great projects are not just about good design, but about the right process. Our structured approach ensures a smooth journey from concept to completion.
              </p>
            </div>

            {/* Right Stats */}
            <div className="w-full lg:w-[75%] grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-white/10 border-t lg:border-t-0 border-white/10">
              <div className="py-12 lg:py-20 px-2 sm:px-6 flex items-center justify-center">
                <StatItem
                  theme="dark"
                  icon={<Users />}
                  number="100+"
                  label="Projects Completed"
                  labelPosition="after"
                />
              </div>
              <div className="py-12 lg:py-20 px-2 sm:px-6 flex items-center justify-center">
                <StatItem
                  theme="dark"
                  icon={<Award />}
                  number="98%"
                  label="Client Satisfaction"
                  labelPosition="before"
                />
              </div>
              <div className="py-12 lg:py-20 px-2 sm:px-6 flex items-center justify-center">
                <StatItem
                  theme="dark"
                  icon={<CalendarCheck />}
                  number="95%"
                  label="On-Time Delivery"
                  labelPosition="before"
                />
              </div>
              <div className="py-12 lg:py-20 px-2 sm:px-6 flex items-center justify-center">
                <StatItem
                  theme="dark"
                  icon={<Target />}
                  number="100%"
                  label="Attention to Detail"
                  labelPosition="before"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS IN ACTION ──────────────────────────────── */}
      <section className="bg-white py-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col xl:flex-row gap-12 xl:gap-8 items-start">
            
            {/* Left Content */}
            <div className="w-full xl:w-[25%] xl:pt-4">
              <div className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-4">
                PROCESS IN ACTION
              </div>
              <h2 className="text-[28px] md:text-[34px] font-bold text-charcoal leading-[1.2] mb-5">
                From Vision<br />to Reality
              </h2>
              <div className="w-10 h-[3px] bg-primary rounded-sm mb-6" />
              <p className="text-[14px] text-dark-gray leading-[1.7] mb-8 pr-4">
                We transform ideas into inspiring spaces through collaboration, expertise and dedication.
              </p>
              <Link href="/portfolio">
                <Button variant="primary-outline" className="!text-primary !border-primary hover:!bg-primary hover:!text-white group">
                  VIEW OUR PROJECTS
                  <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Right Filmstrip */}
            <div className="w-full xl:w-[75%]">
              <div className="flex flex-col md:flex-row gap-6 md:gap-4 mt-8 xl:mt-0">
                {actionImages.map((img, i) => {
                  const isLast = i === actionImages.length - 1;
                  return (
                    <div key={img.title} className="flex-1 flex flex-col group">
                      <div className="relative mb-5">
                        {/* Image Wrapper */}
                        <div className="relative w-full aspect-[4/3] rounded-[6px] overflow-hidden shadow-sm">
                          <Image
                            src={img.img}
                            alt={img.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        {/* Connector Arrow */}
                        {!isLast && (
                          <div className="hidden md:flex absolute z-20 w-[38px] h-[38px] rounded-full bg-white shadow-sm border border-[#c6e0d2] items-center justify-center bottom-0 -right-2 translate-x-1/2 translate-y-1/2">
                            <ChevronRight className="w-5 h-5 text-primary" strokeWidth={2.5} />
                          </div>
                        )}
                      </div>
                      <h4 className="text-[14px] font-bold text-charcoal text-center mb-1.5">{img.title}</h4>
                      <p className="text-[12px] text-dark-gray text-center leading-[1.6] px-1 md:px-2">
                        {img.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. CTA BANNER ─────────────────────────────────────── */}
      <section className="relative bg-[#102418] py-14 overflow-hidden border-t border-[#1a3826]">
        {/* Subtle background overlay */}
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
              {/* Decorative Monogram */}
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
                  Ready to start your project?
                </h3>
                <p className="text-white/80 text-[15px]">
                  Let&apos;s create something extraordinary together.
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

