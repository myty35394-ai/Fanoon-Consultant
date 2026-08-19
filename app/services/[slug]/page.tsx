import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import Stepper from "@/components/ui/Stepper";
import DeliverableCard from "@/components/ui/DeliverableCard";
import ProjectCard from "@/components/ui/ProjectCard";
import Accordion from "@/components/ui/Accordion";
import CtaBanner from "@/components/shared/CtaBanner";

import { servicesData, getServiceBySlug } from "@/lib/services-data";
import { ProjectData } from "@/components/portfolio/PortfolioGrid";

// Import sample project data from Portfolio
const allProjects: ProjectData[] = [
  {
    title: "Cantt Heights",
    category: "Architecture",
    subtitle: "G+6 Mixed-Use Development",
    location: "Peshawar Cantonment",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    href: "#",
  },
  {
    title: "Green Heights",
    category: "Architecture",
    subtitle: "G+6 Mixed-Use Development",
    location: "Peshawar",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    href: "#",
  },
  {
    title: "Luxury Apartment Interior",
    category: "Interior Design",
    location: "Islamabad",
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    href: "#",
  },
  {
    title: "Peshawar Cantt Beautification",
    category: "Landscape Design",
    subtitle: "Urban Design & Public Realm",
    location: "Peshawar Cantonment",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    href: "#",
  },
  {
    title: "10 Marla Residence",
    category: "Architecture",
    subtitle: "G+1 House",
    location: "Peshawar",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    href: "#",
  },
  {
    title: "Corporate Office Interior",
    category: "Interior Design",
    location: "Islamabad",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    href: "#",
  },
  {
    title: "Masterplan 3D Visualization",
    category: "3D Visualization",
    subtitle: "Residential Community",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    href: "#",
  },
  {
    title: "Multi-Storey Building",
    category: "Construction Supervision",
    subtitle: "G+8 Building",
    location: "Peshawar",
    imageUrl: "https://images.unsplash.com/photo-1541888086913-913a48e788bc?w=800&q=80",
    href: "#",
  },
  {
    title: "Green Belt Development",
    category: "Landscape Design",
    location: "Peshawar Cantonment",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    href: "#",
  },
  {
    title: "1 Kanal Modern Residence",
    category: "Architecture",
    location: "Lahore",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    href: "#",
  },
  {
    title: "Residential Interior",
    category: "Interior Design",
    location: "Peshawar",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    href: "#",
  },
  {
    title: "Project Management Services",
    category: "Project Management",
    location: "Multiple Locations",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    href: "#",
  },
];

export async function generateStaticParams() {
  return servicesData.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.navLabel} | Fanoon Consultants`,
    description: service.heroBody,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const categoryProjects = allProjects
    .filter((p) => p.category === service.projectCategory)
    .slice(0, 4);

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
                    name: "Services",
                    item: "https://fanoonconsultants.com/services",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: service.navLabel,
                    item: `https://fanoonconsultants.com/services/${service.slug}`,
                  },
                ],
              },
              {
                "@type": "Service",
                name: service.navLabel,
                provider: { "@type": "Organization", name: "Fanoon Consultants" },
                description: service.heroBody,
              },
            ],
          }),
        }}
      />

      {/* ── 1. Page Hero ──────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-start bg-[#080c0a]"
        style={{ minHeight: "55vh" }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={service.heroImage}
            alt={service.heroTitle}
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
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.navLabel },
              ]}
              className="mb-6"
            />
            <span
              className="block font-bold uppercase tracking-[0.35em] text-primary mb-5"
              style={{ fontSize: "11px" }}
            >
              {service.navLabel}
            </span>
            <h1
              className="text-white font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}
            >
              {service.heroTitle}
            </h1>
            <p
              className="text-white/85 leading-relaxed mb-8"
              style={{ fontSize: "14px", maxWidth: "480px" }}
            >
              {service.heroBody}
            </p>
            <Button variant="primary" icon="arrow-right">
              START YOUR PROJECT
            </Button>
          </div>
        </div>
      </section>

      {/* ── 2. Introduction ────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            {/* Left: Decorative Image Composition */}
            <div className="w-full lg:w-[45%] relative aspect-square max-w-[480px] mx-auto lg:mx-0 p-4 md:p-8 flex items-center justify-center">
              {/* Monogram — large, behind the circular photo */}
              <div className="absolute inset-0 flex items-center justify-center z-0 scale-[1.55] opacity-95 pointer-events-none">
                <Image
                  src="/monogram.png"
                  alt="Fanoon Monogram"
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden shadow-2xl border-[6px] border-white z-10 bg-light-gray">
                <Image
                  src={service.introImage}
                  alt={service.introTitle}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-[55%] lg:pl-10">
              <span
                className="block font-bold uppercase tracking-[0.35em] text-primary mb-5"
                style={{ fontSize: "11px" }}
              >
                INTRODUCTION
              </span>
              <h2
                className="font-bold text-charcoal mb-8 leading-tight"
                style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
              >
                {service.introTitle.replace(/\.$/, "")}
                <span className="text-primary">.</span>
              </h2>
              <div
                className="text-dark-gray leading-relaxed mb-12 space-y-5"
                style={{ fontSize: "14px", opacity: 0.72 }}
              >
                {service.introBody.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Pillars Row */}
              <div className="flex flex-row justify-between items-start pt-6 border-t border-[#e8e8e8]/50">
                {service.pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  const isLast = idx === service.pillars.length - 1;
                  return (
                    <div key={idx} className={`flex flex-col items-center text-center flex-1 ${!isLast ? 'border-r border-[#e8e8e8]/60' : ''} px-2`}>
                      {/* Sketchy Icon Container */}
                      <div className="relative w-[56px] h-[56px] mb-4 group">
                        {/* Offset sketched border */}
                        <div className="absolute inset-0 rounded-full border border-dark-gray/20 -translate-x-[2px] translate-y-[2px] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 z-0" />
                        {/* Main circle */}
                        <div className="absolute inset-0 rounded-full border-[1.5px] border-[#e8e8e8] bg-white flex items-center justify-center group-hover:border-primary/40 transition-colors duration-300 z-10">
                          <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                        </div>
                      </div>
                      <span className="text-[11.5px] font-semibold text-dark-gray opacity-80 leading-snug max-w-[80px]">
                        {pillar.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Our Process ─────────────────────────────────────── */}
      <section className="bg-light-gray py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <span
              className="block font-bold uppercase tracking-[0.35em] text-primary mb-5"
              style={{ fontSize: "11px" }}
            >
              OUR PROCESS
            </span>
            <h2
              className="font-bold text-charcoal"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
            >
              A Structured Approach<span className="text-primary">.</span>
              <br />
              Seamless Execution<span className="text-primary">.</span>
            </h2>
          </div>

          <Stepper
            variant="rail"
            connector="dotted"
            theme="light"
            steps={service.process.map((s) => ({
              label: s.title,
              description: s.description,
            }))}
            activeStep={0}
            icons={service.process.map((s) => <s.icon />)}
          />
        </div>
      </section>

      {/* ── 4. What You Receive ────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="mb-14">
            <span
              className="block font-bold uppercase tracking-[0.35em] text-primary mb-5"
              style={{ fontSize: "11px" }}
            >
              DELIVERABLES
            </span>
            <h2
              className="font-bold text-charcoal"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
            >
              What You Receive<span className="text-primary">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {service.deliverables.map((del, idx) => (
              <DeliverableCard
                key={idx}
                icon={<del.icon />}
                title={del.title}
                description={del.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Sample Projects ─────────────────────────────────── */}
      {categoryProjects.length > 0 && (
        <section className="bg-white pb-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span
                  className="block font-bold uppercase tracking-[0.35em] text-primary mb-5"
                  style={{ fontSize: "11px" }}
                >
                  SAMPLE PROJECTS
                </span>
                <h2
                  className="font-bold text-charcoal"
                  style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
                >
                  Our {service.projectCategory} Work<span className="text-primary">.</span>
                </h2>
              </div>
              <div className="hidden md:block pb-2">
                <a
                  href={`/portfolio?category=${encodeURIComponent(service.projectCategory)}`}
                  className="flex items-center text-[12px] font-bold text-charcoal tracking-widest uppercase relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-full after:h-[2px] after:bg-primary/30 hover:after:bg-primary transition-all group"
                >
                  VIEW ALL PROJECTS
                  <ArrowRight className="w-4 h-4 ml-3 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryProjects.map((project, idx) => (
                <ProjectCard
                  key={idx}
                  title={project.title}
                  category={project.category}
                  location={project.location}
                  imageUrl={project.imageUrl}
                  href={project.href}
                  variant="default"
                />
              ))}
            </div>

            {/* Decorative Carousel Dots */}
            <div className="flex justify-center mt-12 space-x-2.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-2 h-2 rounded-full bg-medium-gray/40" />
              <div className="w-2 h-2 rounded-full bg-medium-gray/40" />
            </div>

            <div className="mt-8 text-center md:hidden flex justify-center">
              <a
                href={`/portfolio?category=${encodeURIComponent(service.projectCategory)}`}
                className="flex items-center text-[12px] font-bold text-charcoal tracking-widest uppercase relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-full after:h-[2px] after:bg-primary/30 hover:after:bg-primary transition-all"
              >
                VIEW ALL PROJECTS
                <ArrowRight className="w-4 h-4 ml-3" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Common Questions ────────────────────────────────── */}
      <section className="bg-white pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            {/* Left: Decorative Illustration */}
            <div className="hidden lg:flex w-[40%] flex-col justify-start sticky top-24">
              <span
                className="block font-bold uppercase tracking-[0.35em] text-primary mb-5"
                style={{ fontSize: "11px" }}
              >
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2
                className="font-bold text-charcoal mb-12 leading-tight"
                style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
              >
                Common Questions<span className="text-primary">.</span>
              </h2>
              {/* Decorative SVG wireframe */}
              <div className="opacity-20" style={{ maxWidth: "400px" }}>
                <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50,250 L350,250" stroke="currentColor" strokeWidth="2" />
                  <path d="M100,250 L100,100 L300,100 L300,250" stroke="currentColor" strokeWidth="2" />
                  <path d="M150,250 L150,50 L250,50 L250,250" stroke="currentColor" strokeWidth="2" />
                  <path d="M100,150 L300,150" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
                  <path d="M100,200 L300,200" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
                  <path d="M200,50 L200,250" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
                </svg>
              </div>
            </div>

            {/* Right: FAQ Accordion */}
            <div className="w-full lg:w-[60%] lg:pt-16">
              {/* Mobile headers (hidden on desktop) */}
              <div className="lg:hidden mb-12">
                <span
                  className="block font-bold uppercase tracking-[0.35em] text-primary mb-5"
                  style={{ fontSize: "11px" }}
                >
                  FREQUENTLY ASKED QUESTIONS
                </span>
                <h2
                  className="font-bold text-charcoal leading-tight"
                  style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
                >
                  Common Questions<span className="text-primary">.</span>
                </h2>
              </div>
              
              <Accordion
                items={service.faqs.map((faq, idx) => ({
                  id: `faq-${idx}`,
                  title: faq.question,
                  content: faq.answer,
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Footer will follow (provided by layout) ───────────────────────────────────── */}
    </>
  );
}
