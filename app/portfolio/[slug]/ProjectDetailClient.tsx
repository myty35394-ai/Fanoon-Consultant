"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Ruler,
  Calendar,
  Layers,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  LayoutGrid,
  Heart,
  Clock,
  Gem,
  Compass,
  Trees,
  Sliders,
  Smile,
  Headphones,
  ArrowRight,
  ChevronRight,
  X,
  Eye,
  DollarSign,
  Users,
  Award,
  TrendingUp,
  ShieldAlert,
  HardHat,
  MessageSquare,
  Handshake,
  Wrench,
  Activity,
  FileText,
  Home,
  Maximize,
  PenTool,
  Sprout,
  Droplets,
  Wind,
  Globe,
  Sun,
  ClipboardList,
  Store,
  Columns,
  CalendarCheck,
} from "lucide-react";

export interface ProjectDetailData {
  id?: string;
  slug: string;
  title: string;
  category: string;
  client?: string | null;
  location?: string | null;
  year?: string | null;
  area?: string | null;
  plotSize?: string | null;
  plotArea?: string | null;
  length?: string | null;
  plantation?: string | null;
  publicSpaces?: string | null;
  duration?: string | null;
  constructionType?: string | null;
  contractType?: string | null;
  commencement?: string | null;
  completion?: string | null;
  structure?: string | null;
  floors?: string | null;
  use?: string | null;
  scope?: string | null;
  coverImage: string;
  description?: string | null;
  tagline?: string;
  tagline2?: string;
  scopeOfWork?: string[];
  status?: string;
  gallery?: string[];
  features?: string[];
  conceptPillars?: { title: string; desc?: string }[];
  conceptText?: string;
  overviewText1?: string;
  overviewText2?: string;
  featureBedroomImage?: string;
  hardHatImage?: string;
  siteProgressStages?: { title: string; image: string }[];
}

export default function ProjectDetailClient({ project }: { project: ProjectDetailData }) {
  const [activeTab, setActiveTab] = useState("OVERVIEW");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const isConstructionSupervision =
    project.category.toLowerCase().includes("construction supervision") ||
    project.slug.includes("supervision") ||
    project.slug.includes("g8-building");

  const isLandscape =
    !isConstructionSupervision &&
    (project.category.toLowerCase().includes("landscape") ||
      project.slug.includes("landscape") ||
      project.slug.includes("green-belt") ||
      project.slug.includes("beautification"));

  const isProjectManagement =
    !isConstructionSupervision &&
    !isLandscape &&
    (project.category.toLowerCase().includes("project management") ||
      project.slug.includes("project-management"));

  const tabs = isConstructionSupervision
    ? [
        { id: "overview", label: "OVERVIEW" },
        { id: "scope", label: "SCOPE OF SUPERVISION" },
        { id: "approach", label: "OUR APPROACH" },
        { id: "progress", label: "SITE PROGRESS" },
        { id: "gallery", label: "GALLERY" },
        { id: "outcomes", label: "KEY OUTCOMES" },
      ]
    : isLandscape
    ? [
        { id: "overview", label: "OVERVIEW" },
        { id: "concept", label: "CONCEPT" },
        { id: "masterplan", label: "MASTERPLAN" },
        { id: "features", label: "DESIGN FEATURES" },
        { id: "gallery", label: "GALLERY" },
        { id: "drawings", label: "DRAWINGS" },
        { id: "impact", label: "IMPACT" },
        { id: "team", label: "TEAM" },
      ]
    : isProjectManagement
    ? [
        { id: "overview", label: "OVERVIEW" },
        { id: "approach", label: "OUR APPROACH" },
        { id: "services", label: "SERVICES" },
        { id: "process", label: "PROJECT PROCESS" },
        { id: "benefits", label: "KEY BENEFITS" },
        { id: "gallery", label: "GALLERY" },
        { id: "team", label: "TEAM" },
      ]
    : [
        { id: "overview", label: "OVERVIEW" },
        { id: "design-concept", label: "DESIGN CONCEPT" },
        { id: "spaces", label: "SPACES" },
        { id: "materials", label: "MATERIALS & FINISHES" },
        { id: "gallery", label: "GALLERY" },
        { id: "drawings", label: "DRAWINGS" },
        { id: "team", label: "TEAM" },
      ];

  const defaultGallery = isConstructionSupervision
    ? [
        project.coverImage || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=85",
        "https://images.unsplash.com/photo-1541888946425-d0fbb18f13f7?w=1000&q=80",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
      ]
    : isLandscape
    ? [
        project.coverImage || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1000&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80",
      ]
    : isProjectManagement
    ? [
        project.coverImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80",
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1000&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80",
      ]
    : [
        project.coverImage || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=85",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80",
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1000&q=80",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&q=80",
        "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1000&q=80",
      ];

  const galleryList = project.gallery && project.gallery.length > 0 ? project.gallery : defaultGallery;
  const mainImage = galleryList[0];
  const thumbList = galleryList.slice(1, 6);

  const scrollToTab = (tabId: string, label: string) => {
    setActiveTab(label);
    const element = document.getElementById(tabId);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  /* ─────────────────────────────────────────────────────────────
     1. RENDER: CONSTRUCTION SUPERVISION VARIANT (Exact match)
     ───────────────────────────────────────────────────────────── */
  if (isConstructionSupervision) {
    const supervisionScope = project.scopeOfWork || [
      "Review of shop drawings and material submittals",
      "Verification of setting out and dimensional accuracy",
      "Monitoring of quality of materials and workmanship",
      "Inspection of structural works at all stages",
      "Coordination with MEP and other consultants",
      "Monitoring of progress against approved schedule",
      "Site meetings, reporting and documentation",
      "Ensuring compliance with safety regulations",
    ];

    const defaultStages = [
      {
        title: "Excavation",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb18f13f7?w=600&q=80",
      },
      {
        title: "Foundation Works",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
      },
      {
        title: "RCC Structure",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
      },
      {
        title: "Brick Masonry",
        image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&q=80",
      },
      {
        title: "Finishing Works",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
      },
      {
        title: "MEP Installation",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
      },
    ];

    const stages = project.siteProgressStages || defaultStages;

    return (
      <>
        {/* ── 1. HERO SECTION (Construction Supervision) ───────── */}
        <section className="relative w-full overflow-hidden bg-[#0a0f0c] min-h-[620px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={project.coverImage || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=85"}
              alt={project.title}
              fill
              priority
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(10,15,12,0.98) 0%, rgba(10,15,12,0.92) 42%, rgba(10,15,12,0.72) 62%, rgba(10,15,12,0.25) 85%, rgba(10,15,12,0.12) 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0f0c] to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 pt-32 pb-16">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
              <div className="w-full lg:w-[60%]">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] font-medium mb-6">
                  <Link href="/" className="text-white/70 hover:text-primary transition-colors">
                    Home
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                  <Link href="/portfolio" className="text-white/70 hover:text-primary transition-colors">
                    Portfolio
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-white/70">Construction Supervision</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-primary font-semibold truncate max-w-[260px] md:max-w-none">
                    {project.title}
                  </span>
                </nav>

                {/* Category */}
                <span className="text-[11px] font-bold tracking-[0.25em] text-primary uppercase mb-3 block">
                  CONSTRUCTION SUPERVISION
                </span>

                {/* Title */}
                <h1
                  className="text-white font-extrabold leading-[1.12] tracking-tight mb-2"
                  style={{ fontSize: "clamp(32px, 4.5vw, 54px)" }}
                >
                  {project.title}
                </h1>

                {/* Subtitle / Tagline */}
                <h2 className="text-white/95 font-bold text-[18px] md:text-[22px] mb-2">
                  {project.tagline || "G+6 Mixed-Use Development"}
                </h2>

                <h3 className="text-primary font-semibold text-[14px] md:text-[15px] mb-4">
                  {project.tagline2 || "Supervision You Can Trust. Quality You Can See."}
                </h3>

                {/* Paragraph summary */}
                <p className="text-white/70 text-[13.5px] leading-[1.8] mb-8 max-w-xl">
                  {project.description ||
                    "Fanoon Consultants provided complete construction supervision services for Cantt Heights, ensuring the project was executed in strict accordance with the approved design, specifications, quality standards and project timeline."}
                </p>

                {/* 4 Metric Badges Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white/90 leading-tight">
                      Quality<br />Assurance
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <HardHat className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white/90 leading-tight">
                      On-Site<br />Supervision
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Activity className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white/90 leading-tight">
                      Progress<br />Monitoring
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white/90 leading-tight">
                      Safety<br />First
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Floating "Project Overview" Card */}
              <div className="w-full lg:w-[380px] flex-shrink-0">
                <div className="bg-[#0e1611]/90 border border-white/15 rounded-2xl p-6 md:p-7 shadow-2xl backdrop-blur-md space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary pb-2 border-b border-white/10">
                    Project Overview
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Project Name</span>
                        <span className="text-white font-semibold">{project.title}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Layers className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Project Type</span>
                        <span className="text-white font-semibold">{project.tagline || "G+6 Mixed-Use Development"}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Location</span>
                        <span className="text-white font-semibold">{project.location || "Peshawar Cantonment"}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Wrench className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Scope</span>
                        <span className="text-white font-semibold">Construction Supervision</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Commencement</span>
                        <span className="text-white font-semibold">{project.commencement || "January 2023"}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CalendarCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Completion</span>
                        <span className="text-white font-semibold">{project.completion || "December 2024"}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Duration</span>
                        <span className="text-white font-semibold">{project.duration || "22 Months"}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Status</span>
                        <span className="text-white font-semibold">{project.status || "Completed (2024)"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. STICKY SUB-NAVIGATION TABS ─────────────────────── */}
        <section className="bg-white border-b border-[#e5e5e5] sticky top-16 z-30 shadow-xs">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-3.5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.label;
                return (
                  <button
                    key={tab.id}
                    onClick={() => scrollToTab(tab.id, tab.label)}
                    className={`text-[12px] font-bold tracking-wider uppercase transition-all py-1 relative whitespace-nowrap cursor-pointer ${
                      isActive ? "text-primary font-extrabold" : "text-dark-gray/70 hover:text-charcoal"
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <span className="absolute -bottom-3.5 left-0 right-0 h-[2.5px] bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. PROJECT OVERVIEW SECTION (Supervision) ─────────── */}
        <section id="overview" className="bg-white py-16 md:py-20 scroll-mt-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Text + 8 Specs Grid */}
              <div className="lg:col-span-5 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
                  Project Overview
                </h2>

                <div className="space-y-4 text-[13.5px] leading-[1.8] text-dark-gray">
                  <p>
                    {project.overviewText1 ||
                      "Cantt Heights is a signature G+6 mixed-use development located in Peshawar Cantonment. Fanoon Consultants was responsible for end-to-end construction supervision to ensure the highest standards of workmanship, material quality and compliance with drawings and specifications."}
                  </p>
                  <p>
                    {project.overviewText2 ||
                      "Our team worked closely with the contractor and all stakeholders to monitor every activity on site, mitigate risks and deliver a safe, timely and high-quality project."}
                  </p>
                </div>

                {/* 8 Specs Grid (2 cols x 4 rows) */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Location</span>
                      <span className="text-xs font-bold text-charcoal">{project.location || "Peshawar Cantonment"}</span>
                    </div>
                  </div>

                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Project Type</span>
                      <span className="text-xs font-bold text-charcoal">{project.category || "Mixed-Use Development"}</span>
                    </div>
                  </div>

                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Maximize className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Plot Area</span>
                      <span className="text-xs font-bold text-charcoal">{project.plotArea || "23,500 SQ FT"}</span>
                    </div>
                  </div>

                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Store className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Use</span>
                      <span className="text-xs font-bold text-charcoal">{project.use || "Shops, Offices, Apartments"}</span>
                    </div>
                  </div>

                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Ruler className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Total Built-up Area</span>
                      <span className="text-xs font-bold text-charcoal">{project.area || "Approx. 180,000 SQ FT"}</span>
                    </div>
                  </div>

                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Columns className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Structure</span>
                      <span className="text-xs font-bold text-charcoal">{project.structure || "RCC Framed Structure"}</span>
                    </div>
                  </div>

                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Floors</span>
                      <span className="text-xs font-bold text-charcoal">{project.floors || "G+6 (Basement + Ground + 6)"}</span>
                    </div>
                  </div>

                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Completion Year</span>
                      <span className="text-xs font-bold text-charcoal">{project.year || "2024"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Showcase Image + Thumbnails */}
              <div id="gallery" className="lg:col-span-7 space-y-4 scroll-mt-28">
                <div
                  onClick={() => setLightboxImage(mainImage)}
                  className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-md cursor-pointer group"
                >
                  <Image
                    src={mainImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                      <Eye className="w-4 h-4 text-primary" /> View Fullscreen
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                  {thumbList.map((img, idx) => {
                    const isLast = idx === thumbList.length - 1;
                    return (
                      <div
                        key={idx}
                        onClick={() => setLightboxImage(img)}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group shadow-xs border border-black/5"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} thumbnail ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {isLast && (
                          <div className="absolute inset-0 bg-charcoal/85 backdrop-blur-xs flex flex-col items-center justify-center text-white text-center p-1">
                            <span className="text-[12px] font-bold leading-tight">+18</span>
                            <span className="text-[9px] uppercase tracking-wider text-white/80 font-medium">
                              More Images
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. SCOPE, APPROACH & SITE PROGRESS (3 Columns) ──────── */}
        <section id="scope" className="bg-[#fcfdfc] py-16 md:py-20 border-t border-[#f0f0f0] scroll-mt-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Col 1: Scope of Supervision (4 cols) */}
              <div className="lg:col-span-4 space-y-5">
                <h3 className="text-xl md:text-2xl font-bold text-charcoal">
                  Scope of Construction Supervision
                </h3>
                <ul className="space-y-2.5">
                  {supervisionScope.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-dark-gray">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Assurance note box */}
                <div className="bg-[#f0f9f3] border border-[#d3ecd9] rounded-xl p-4 flex items-start gap-3 mt-6">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <HardHat className="w-4 h-4" />
                  </div>
                  <p className="text-[11.5px] text-dark-gray leading-relaxed">
                    Our supervision ensured that every element of the project was executed to the highest standards of quality, safety and compliance.
                  </p>
                </div>
              </div>

              {/* Col 2: Our Approach (3.5 cols) */}
              <div id="approach" className="lg:col-span-3 space-y-5 scroll-mt-28">
                <h3 className="text-xl md:text-2xl font-bold text-charcoal">Our Approach</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-charcoal">Plan</h4>
                      <p className="text-[11px] text-dark-gray/70 leading-relaxed">
                        Detailed review of drawings, specifications and method statements.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-charcoal">Monitor</h4>
                      <p className="text-[11px] text-dark-gray/70 leading-relaxed">
                        Continuous on-site monitoring and quality inspections at each stage of construction.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <ClipboardList className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-charcoal">Report</h4>
                      <p className="text-[11px] text-dark-gray/70 leading-relaxed">
                        Regular site reports, snag lists and progress updates for informed decision-making.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-charcoal">Resolve</h4>
                      <p className="text-[11px] text-dark-gray/70 leading-relaxed">
                        Immediate identification and resolution of site issues to avoid delays and rework.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-charcoal">Deliver</h4>
                      <p className="text-[11px] text-dark-gray/70 leading-relaxed">
                        Final verification and documentation to ensure successful project completion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 3: Site Progress Photo Grid (4.5 cols) */}
              <div id="progress" className="lg:col-span-5 space-y-5 scroll-mt-28">
                <h3 className="text-xl md:text-2xl font-bold text-charcoal">Site Progress</h3>
                <div className="grid grid-cols-2 gap-3.5">
                  {stages.map((st, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-xs border border-black/10 mb-1.5">
                        <Image
                          src={st.image}
                          alt={st.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      </div>
                      <span className="text-[11.5px] font-bold text-charcoal block group-hover:text-primary transition-colors">
                        {st.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. FIVE KEY OUTCOMES (Dark Strip) ──────────────────── */}
        <section id="outcomes" className="bg-[#0a0f0c] py-10 border-t border-white/5 scroll-mt-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Badge Button */}
              <div className="bg-transparent border border-primary/40 text-primary px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex-shrink-0">
                Key Outcomes
              </div>

              {/* 5 Outcomes Items */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full text-center">
                <div className="space-y-1 flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-primary font-bold text-base">
                    <ShieldCheck className="w-4 h-4" />
                    <span>100%</span>
                  </div>
                  <span className="text-white/70 text-[11px]">Quality Compliance</span>
                </div>

                <div className="space-y-1 flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-primary font-bold text-base">
                    <DollarSign className="w-4 h-4" />
                    <span>On-Time</span>
                  </div>
                  <span className="text-white/70 text-[11px]">Project Delivery</span>
                </div>

                <div className="space-y-1 flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-primary font-bold text-base">
                    <MapPin className="w-4 h-4" />
                    <span>Zero</span>
                  </div>
                  <span className="text-white/70 text-[11px]">Major Safety Incidents</span>
                </div>

                <div className="space-y-1 flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-primary font-bold text-base">
                    <Calendar className="w-4 h-4" />
                    <span>Cost</span>
                  </div>
                  <span className="text-white/70 text-[11px]">Within Budget</span>
                </div>

                <div className="space-y-1 flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-primary font-bold text-base">
                    <Users className="w-4 h-4" />
                    <span>Client</span>
                  </div>
                  <span className="text-white/70 text-[11px]">Satisfaction Achieved</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. CTA BANNER (Supervision) ───────────────────────── */}
        <section className="bg-[#f2f7f4] py-10 border-t border-[#e2ede6]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                  <HardHat className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-charcoal leading-snug">
                    Need construction supervision for your project?
                  </h4>
                  <p className="text-xs text-dark-gray/80 mt-0.5">
                    We ensure quality, safety and on-time delivery from start to finish.
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex-shrink-0"
              >
                <span>LET&apos;S TALK</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 7. LIGHTBOX MODAL ──────────────────────────────────── */}
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full h-[70vh] rounded-xl overflow-hidden"
            >
              <Image
                src={lightboxImage}
                alt="Expanded view"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     2. RENDER: LANDSCAPE DESIGN VARIANT
     ───────────────────────────────────────────────────────────── */
  if (isLandscape) {
    const landscapeFeatures = project.features || [
      "Continuous green corridor for pedestrians and cyclists",
      "Native and drought-tolerant plantation",
      "Seating areas, plazas and community spaces",
      "Smart lighting and irrigation systems",
      "Stormwater management and bio-swales",
      "Enhanced biodiversity and microclimate",
      "Safe, accessible and inclusive design",
    ];

    return (
      <>
        {/* ── 1. HERO SECTION (Landscape Design) ───────────────── */}
        <section className="relative w-full overflow-hidden bg-[#0a0f0c] min-h-[620px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={project.coverImage || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85"}
              alt={project.title}
              fill
              priority
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(10,15,12,0.98) 0%, rgba(10,15,12,0.92) 42%, rgba(10,15,12,0.72) 62%, rgba(10,15,12,0.25) 85%, rgba(10,15,12,0.12) 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0f0c] to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 pt-32 pb-16">
            <div className="max-w-[660px]">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] font-medium mb-6">
                <Link href="/" className="text-white/70 hover:text-primary transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                <Link href="/portfolio" className="text-white/70 hover:text-primary transition-colors">
                  Portfolio
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                <span className="text-primary font-semibold truncate max-w-[260px] md:max-w-none">
                  {project.title}
                </span>
              </nav>

              <span className="text-[11px] font-bold tracking-[0.25em] text-primary uppercase mb-3 block">
                {project.category}
              </span>

              <h1
                className="text-white font-extrabold leading-[1.12] tracking-tight mb-4"
                style={{ fontSize: "clamp(32px, 4.5vw, 54px)" }}
              >
                {project.title}
              </h1>

              <h2 className="text-white/90 font-medium text-[15px] md:text-[17px] mb-4">
                {project.tagline || "Connecting Nature. Enhancing Life."}
              </h2>

              <p className="text-white/70 text-[13.5px] leading-[1.8] mb-8">
                {project.description ||
                  "A sustainable green belt initiative designed to improve urban ecology, promote biodiversity and create healthier, more livable communities."}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/50 block">Location</span>
                    <span className="text-xs font-semibold text-white">{project.location || "Peshawar Cantt"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Trees className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/50 block">Project Type</span>
                    <span className="text-xs font-semibold text-white">{project.category || "Landscape"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/50 block">Length</span>
                    <span className="text-xs font-semibold text-white">{project.length || "5.2 KM"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/50 block">Year</span>
                    <span className="text-xs font-semibold text-white">{project.year || "2024"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/50 block">Trees</span>
                    <span className="text-xs font-semibold text-white">{project.plantation || "10,000+"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. STICKY SUB-NAVIGATION TABS ─────────────────────── */}
        <section className="bg-white border-b border-[#e5e5e5] sticky top-16 z-30 shadow-xs">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-3.5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.label;
                return (
                  <button
                    key={tab.id}
                    onClick={() => scrollToTab(tab.id, tab.label)}
                    className={`text-[12px] font-bold tracking-wider uppercase transition-all py-1 relative whitespace-nowrap cursor-pointer ${
                      isActive ? "text-primary font-extrabold" : "text-dark-gray/70 hover:text-charcoal"
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <span className="absolute -bottom-3.5 left-0 right-0 h-[2.5px] bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. PROJECT OVERVIEW SECTION ────────────────────────── */}
        <section id="overview" className="bg-white py-16 md:py-20 scroll-mt-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
                  Project Overview
                </h2>

                <div className="space-y-4 text-[13.5px] leading-[1.8] text-dark-gray">
                  <p>
                    {project.overviewText1 ||
                      "The Green Belt Development is an urban landscape initiative that creates a continuous green corridor to enhance environmental quality and community well-being."}
                  </p>
                  <p>
                    {project.overviewText2 ||
                      "Spanning 5.2 KM, the project integrates walking and cycling tracks, native planting, public gathering spaces and sustainable infrastructure to promote a greener and healthier city."}
                  </p>
                </div>

                <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-6 space-y-4 mt-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
                    At a Glance
                  </h3>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs">
                    <div>
                      <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> Location
                      </span>
                      <span className="font-semibold text-charcoal">{project.location || "Peshawar Cantonment"}</span>
                    </div>

                    <div>
                      <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                        <Trees className="w-3.5 h-3.5 text-primary" /> Project Type
                      </span>
                      <span className="font-semibold text-charcoal">{project.category || "Landscape Development"}</span>
                    </div>

                    <div>
                      <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                        <Ruler className="w-3.5 h-3.5 text-primary" /> Total Length
                      </span>
                      <span className="font-semibold text-charcoal">{project.length || "5.2 KM"}</span>
                    </div>

                    <div>
                      <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                        <PenTool className="w-3.5 h-3.5 text-primary" /> Scope of Work
                      </span>
                      <span className="font-semibold text-charcoal leading-snug block">
                        {project.scopeOfWork
                          ? project.scopeOfWork.join(", ")
                          : "Masterplan, Landscape Design, Plantation, Streetscape, Lighting"}
                      </span>
                    </div>

                    <div>
                      <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                        <Maximize className="w-3.5 h-3.5 text-primary" /> Project Area
                      </span>
                      <span className="font-semibold text-charcoal">{project.area || "Approx. 125 Acres"}</span>
                    </div>

                    <div>
                      <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Status
                      </span>
                      <span className="font-semibold text-charcoal">{project.status || "Completed"}</span>
                    </div>

                    <div>
                      <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                        <Sprout className="w-3.5 h-3.5 text-primary" /> Plantation
                      </span>
                      <span className="font-semibold text-charcoal">{project.plantation || "10,000+ Trees & Shrubs"}</span>
                    </div>

                    <div>
                      <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" /> Year
                      </span>
                      <span className="font-semibold text-charcoal">{project.year || "2024"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div id="gallery" className="lg:col-span-7 space-y-4 scroll-mt-28">
                <div
                  onClick={() => setLightboxImage(mainImage)}
                  className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-md cursor-pointer group"
                >
                  <Image
                    src={mainImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                      <Eye className="w-4 h-4 text-primary" /> View Fullscreen
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                  {thumbList.map((img, idx) => {
                    const isLast = idx === thumbList.length - 1;
                    return (
                      <div
                        key={idx}
                        onClick={() => setLightboxImage(img)}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group shadow-xs border border-black/5"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} thumbnail ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {isLast && (
                          <div className="absolute inset-0 bg-charcoal/85 backdrop-blur-xs flex flex-col items-center justify-center text-white text-center p-1">
                            <span className="text-[12px] font-bold leading-tight">+12</span>
                            <span className="text-[9px] uppercase tracking-wider text-white/80 font-medium">
                              More Images
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. DESIGN CONCEPT, KEY FEATURES & PROJECT HIGHLIGHTS ── */}
        <section id="concept" className="bg-[#fcfdfc] py-16 md:py-20 border-t border-[#f0f0f0] scroll-mt-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-start">
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-charcoal">Design Concept</h3>
                <p className="text-[13.5px] leading-[1.8] text-dark-gray">
                  {project.conceptText ||
                    "The concept is inspired by the natural landscape and local context, creating a green spine that connects people with nature while promoting sustainability and eco-friendly living."}
                </p>

                <div className="grid grid-cols-4 gap-2 pt-4">
                  {[
                    { icon: Sprout, label: "Green\nConnectivity" },
                    { icon: Layers, label: "Ecological\nBalance" },
                    { icon: Building2, label: "Sustainable\nInfrastructure" },
                    { icon: Heart, label: "Community\nWellbeing" },
                  ].map((pillar, i) => {
                    const Icon = pillar.icon;
                    return (
                      <div key={i} className="flex flex-col items-center text-center gap-2">
                        <div className="w-11 h-11 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary">
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <span className="text-[11px] font-semibold text-charcoal leading-tight whitespace-pre-line">
                          {pillar.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div id="features" className="space-y-5 scroll-mt-28">
                <h3 className="text-xl md:text-2xl font-bold text-charcoal">Key Features</h3>
                <ul className="space-y-3">
                  {landscapeFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <span className="text-[13px] text-dark-gray leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="masterplan" className="space-y-6 scroll-mt-28">
                <h3 className="text-xl md:text-2xl font-bold text-charcoal">Project Highlights</h3>
                <div className="grid grid-cols-2 gap-5 pt-2">
                  <div className="space-y-1">
                    <div className="w-9 h-9 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary mb-2">
                      <Trees className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-charcoal block">5.2 KM</span>
                    <span className="text-[11px] text-dark-gray/70">Green Corridor</span>
                  </div>

                  <div className="space-y-1">
                    <div className="w-9 h-9 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary mb-2">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-charcoal block">10,000+</span>
                    <span className="text-[11px] text-dark-gray/70">Trees &amp; Shrubs</span>
                  </div>

                  <div className="space-y-1">
                    <div className="w-9 h-9 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary mb-2">
                      <Maximize className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-charcoal block">125 Acres</span>
                    <span className="text-[11px] text-dark-gray/70">Total Area</span>
                  </div>

                  <div className="space-y-1">
                    <div className="w-9 h-9 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary mb-2">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-charcoal block">6+</span>
                    <span className="text-[11px] text-dark-gray/70">Public Spaces</span>
                  </div>

                  <div className="space-y-1">
                    <div className="w-9 h-9 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary mb-2">
                      <Sun className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-charcoal block">Sustainable</span>
                    <span className="text-[11px] text-dark-gray/70">Urban Design</span>
                  </div>

                  <div className="space-y-1">
                    <div className="w-9 h-9 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary mb-2">
                      <Wind className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-charcoal block leading-tight">Improved Air Quality</span>
                    <span className="text-[11px] text-dark-gray/70">&amp; Wellbeing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. FIVE ENVIRONMENTAL IMPACT HIGHLIGHTS (Dark Strip) ── */}
        <section id="impact" className="bg-[#0a0f0c] py-14 border-t border-white/5 scroll-mt-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                {
                  icon: Trees,
                  title: "Improved Environment",
                  desc: "Reduces pollution and improves air quality through extensive green cover.",
                },
                {
                  icon: Users,
                  title: "Community Spaces",
                  desc: "Encourages social interaction with plazas, seating areas and open spaces.",
                },
                {
                  icon: Activity,
                  title: "Active Lifestyle",
                  desc: "Dedicated tracks for walking, jogging and cycling promote a healthy lifestyle.",
                },
                {
                  icon: Droplets,
                  title: "Stormwater Management",
                  desc: "Bio-swales and permeable surfaces help manage rainwater naturally.",
                },
                {
                  icon: Globe,
                  title: "Sustainable Future",
                  desc: "Enhances biodiversity and creates a resilient, eco-friendly urban environment.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="space-y-3">
                    <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-white font-bold text-sm leading-tight">{item.title}</h4>
                    <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 6. CTA BANNER (Landscape) ─────────────────────────── */}
        <section className="bg-[#f2f7f4] py-10 border-t border-[#e2ede6]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-charcoal leading-snug">
                    Have a similar project in mind?
                  </h4>
                  <p className="text-xs text-dark-gray/80 mt-0.5">
                    Let&apos;s collaborate to create a greener and more sustainable future.
                  </p>
                </div>
              </div>

              <Link
                href="/contact/start-project"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex-shrink-0"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 7. LIGHTBOX MODAL ──────────────────────────────────── */}
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full h-[70vh] rounded-xl overflow-hidden"
            >
              <Image
                src={lightboxImage}
                alt="Expanded view"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     3. RENDER: PROJECT MANAGEMENT VARIANT
     ───────────────────────────────────────────────────────────── */
  if (isProjectManagement) {
    const pmScopeOfWork = project.scopeOfWork || [
      "Project Planning & Scheduling",
      "Cost Management & Budgeting",
      "Procurement & Vendor Management",
      "Site Supervision & Coordination",
      "Quality Control & Assurance",
      "Risk Management",
      "Progress Monitoring & Reporting",
      "Health, Safety & Environment (HSE)",
      "Client Communication",
      "Final Handover & Documentation",
    ];

    return (
      <>
        {/* ── 1. HERO SECTION (Project Management) ──────────────── */}
        <section className="relative w-full overflow-hidden bg-[#0a0f0c] min-h-[620px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={project.coverImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"}
              alt={project.title}
              fill
              priority
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(10,15,12,0.98) 0%, rgba(10,15,12,0.92) 42%, rgba(10,15,12,0.72) 62%, rgba(10,15,12,0.30) 85%, rgba(10,15,12,0.15) 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0f0c] to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 pt-32 pb-16">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
              <div className="w-full lg:w-[60%]">
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] font-medium mb-6">
                  <Link href="/" className="text-white/70 hover:text-primary transition-colors">
                    Home
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                  <Link href="/portfolio" className="text-white/70 hover:text-primary transition-colors">
                    Portfolio
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-primary font-semibold truncate max-w-[260px] md:max-w-none">
                    {project.title}
                  </span>
                </nav>

                <span className="text-[11px] font-bold tracking-[0.25em] text-primary uppercase mb-3 block">
                  {project.category}
                </span>

                <h1
                  className="text-white font-extrabold leading-[1.12] tracking-tight mb-4"
                  style={{ fontSize: "clamp(32px, 4.5vw, 54px)" }}
                >
                  {project.title}
                </h1>

                <h2 className="text-white/90 font-medium text-[15px] md:text-[17px] mb-4">
                  {project.tagline || "Residential Project. Managed With Precision."}
                </h2>

                <p className="text-white/70 text-[13.5px] leading-[1.8] mb-8 max-w-xl">
                  {project.description ||
                    "We managed the complete project lifecycle of this 1 Kanal residence from planning to handover, ensuring quality, timely delivery and cost efficiency at every stage."}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white/90 leading-tight">
                      On Time<br />Delivery
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white/90 leading-tight">
                      Budget<br />Control
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white/90 leading-tight">
                      Quality<br />Assurance
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white/90 leading-tight">
                      Client<br />Satisfaction
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating "Project at a Glance" Card */}
              <div className="w-full lg:w-[380px] flex-shrink-0">
                <div className="bg-[#0e1611]/90 border border-white/15 rounded-2xl p-6 md:p-7 shadow-2xl backdrop-blur-md space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary pb-2 border-b border-white/10">
                    Project at a Glance
                  </h3>

                  <div className="space-y-3.5 text-xs">
                    <div className="flex items-start gap-3">
                      <Home className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Project Name</span>
                        <span className="text-white font-semibold">{project.title}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Location</span>
                        <span className="text-white font-semibold">{project.location || "Lahore, Pakistan"}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Building2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Project Type</span>
                        <span className="text-white font-semibold">{project.category || "Residential"}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Maximize className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Plot Size</span>
                        <span className="text-white font-semibold">{project.plotSize || "1 Kanal"}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Ruler className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Covered Area</span>
                        <span className="text-white font-semibold">{project.area || "7,200 SQ FT"}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Duration</span>
                        <span className="text-white font-semibold">{project.duration || "10 Months"}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/50 text-[11px] block">Status</span>
                        <span className="text-white font-semibold">{project.status || "Completed (2024)"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. STICKY SUB-NAVIGATION TABS ─────────────────────── */}
        <section className="bg-white border-b border-[#e5e5e5] sticky top-16 z-30 shadow-xs">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-3.5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.label;
                return (
                  <button
                    key={tab.id}
                    onClick={() => scrollToTab(tab.id, tab.label)}
                    className={`text-[12px] font-bold tracking-wider uppercase transition-all py-1 relative whitespace-nowrap cursor-pointer ${
                      isActive ? "text-primary font-extrabold" : "text-dark-gray/70 hover:text-charcoal"
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <span className="absolute -bottom-3.5 left-0 right-0 h-[2.5px] bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. PROJECT OVERVIEW SECTION ────────────────────────── */}
        <section id="overview" className="bg-white py-16 md:py-20 scroll-mt-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
                  Project Overview
                </h2>

                <div className="space-y-4 text-[13.5px] leading-[1.8] text-dark-gray">
                  <p>
                    {project.overviewText1 ||
                      "Fanoon Consultants was entrusted with the end-to-end project management of this 1 Kanal residence. Our role included planning, coordination, procurement supervision, quality control, budget management and timely execution to bring the client's vision to life."}
                  </p>
                  <p>
                    {project.overviewText2 ||
                      "Through proactive communication and rigorous site management, we ensured a smooth construction process, maintaining high standards of quality, safety and efficiency."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Client</span>
                      <span className="text-xs font-bold text-charcoal">{project.client || "Private Client"}</span>
                    </div>
                  </div>

                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Construction Type</span>
                      <span className="text-xs font-bold text-charcoal">{project.constructionType || "New Construction"}</span>
                    </div>
                  </div>

                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <PenTool className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Architectural Design</span>
                      <span className="text-xs font-bold text-charcoal">Fanoon Consultants</span>
                    </div>
                  </div>

                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Completion Year</span>
                      <span className="text-xs font-bold text-charcoal">{project.year || "2024"}</span>
                    </div>
                  </div>

                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Contract Type</span>
                      <span className="text-xs font-bold text-charcoal">{project.contractType || "Project Management"}</span>
                    </div>
                  </div>

                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Project Duration</span>
                      <span className="text-xs font-bold text-charcoal">{project.duration || "10 Months"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div id="gallery" className="lg:col-span-7 space-y-4 scroll-mt-28">
                <div
                  onClick={() => setLightboxImage(mainImage)}
                  className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-md cursor-pointer group"
                >
                  <Image
                    src={mainImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                      <Eye className="w-4 h-4 text-primary" /> View Fullscreen
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                  {thumbList.map((img, idx) => {
                    const isLast = idx === thumbList.length - 1;
                    return (
                      <div
                        key={idx}
                        onClick={() => setLightboxImage(img)}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group shadow-xs border border-black/5"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} thumbnail ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {isLast && (
                          <div className="absolute inset-0 bg-charcoal/85 backdrop-blur-xs flex flex-col items-center justify-center text-white text-center p-1">
                            <span className="text-[12px] font-bold leading-tight">+12</span>
                            <span className="text-[9px] uppercase tracking-wider text-white/80 font-medium">
                              More Images
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. SCOPE OF WORK & PROJECT MANAGEMENT APPROACH ─────── */}
        <section id="services" className="bg-[#fcfdfc] py-16 md:py-20 border-t border-[#f0f0f0] scroll-mt-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 space-y-5">
                <h3 className="text-xl md:text-2xl font-bold text-charcoal">Our Scope of Work</h3>
                <ul className="space-y-2.5">
                  {pmScopeOfWork.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-dark-gray">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2} />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-[3/4] rounded-xl overflow-hidden shadow-md group">
                <Image
                  src={
                    project.hardHatImage ||
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
                  }
                  alt="Fanoon Site Supervision Hard Hat"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <div id="approach" className="lg:col-span-5 space-y-6 scroll-mt-28">
                <h3 className="text-xl md:text-2xl font-bold text-charcoal">Project Management Approach</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary flex-shrink-0" />
                      <h4 className="text-xs font-bold text-charcoal">Client First</h4>
                    </div>
                    <p className="text-[11px] text-dark-gray/70 leading-relaxed">
                      We align with the client&apos;s goals and keep them informed at every step.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary flex-shrink-0" />
                      <h4 className="text-xs font-bold text-charcoal">Monitor Closely</h4>
                    </div>
                    <p className="text-[11px] text-dark-gray/70 leading-relaxed">
                      Continuous monitoring of progress, cost and quality on site.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-primary flex-shrink-0" />
                      <h4 className="text-xs font-bold text-charcoal">Plan Smart</h4>
                    </div>
                    <p className="text-[11px] text-dark-gray/70 leading-relaxed">
                      Detailed planning and resource allocation for smooth execution.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-primary flex-shrink-0" />
                      <h4 className="text-xs font-bold text-charcoal">Mitigate Risks</h4>
                    </div>
                    <p className="text-[11px] text-dark-gray/70 leading-relaxed">
                      Identifying potential risks early and implementing effective solutions.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-primary flex-shrink-0" />
                      <h4 className="text-xs font-bold text-charcoal">Execute Right</h4>
                    </div>
                    <p className="text-[11px] text-dark-gray/70 leading-relaxed">
                      Coordination with consultants, contractors and suppliers for quality delivery.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary flex-shrink-0" />
                      <h4 className="text-xs font-bold text-charcoal">Deliver Excellence</h4>
                    </div>
                    <p className="text-[11px] text-dark-gray/70 leading-relaxed">
                      On-time handover with documentation and complete client satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. PROJECT MANAGEMENT PROCESS (Stepper) ────────────── */}
        <section id="process" className="bg-white py-16 md:py-20 border-t border-[#f0f0f0] scroll-mt-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-12 text-center md:text-left">
              Our Project Management Process
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
              {[
                {
                  step: "01",
                  icon: MessageSquare,
                  title: "Initiation",
                  desc: "Understanding project goals, scope and requirements.",
                },
                {
                  step: "02",
                  icon: Sliders,
                  title: "Planning",
                  desc: "Developing timeline, budget, resources and execution strategy.",
                },
                {
                  step: "03",
                  icon: HardHat,
                  title: "Execution",
                  desc: "Coordinating construction activities, procurement and on-site operations.",
                },
                {
                  step: "04",
                  icon: Eye,
                  title: "Monitoring",
                  desc: "Tracking progress, quality and cost with regular site inspections.",
                },
                {
                  step: "05",
                  icon: ShieldCheck,
                  title: "Controlling",
                  desc: "Managing changes, risks and ensuring compliance with standards.",
                },
                {
                  step: "06",
                  icon: Handshake,
                  title: "Handover",
                  desc: "Final inspection, documentation and handover to client.",
                },
              ].map((item, idx, arr) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="flex flex-col items-center text-center space-y-3 relative group">
                    <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      {item.step}
                    </div>

                    <div className="w-12 h-12 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>

                    <h4 className="text-xs font-bold text-charcoal leading-tight">{item.title}</h4>
                    <p className="text-[11px] text-dark-gray/70 leading-relaxed max-w-[180px]">
                      {item.desc}
                    </p>

                    {idx < arr.length - 1 && (
                      <ChevronRight className="hidden lg:block absolute -right-3 top-8 text-primary/40 w-4 h-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 6. SIX KEY METRICS STRIP (Dark Strip) ──────────────── */}
        <section id="benefits" className="bg-[#0a0f0c] py-12 border-t border-white/5 scroll-mt-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
              <div className="space-y-1.5 flex flex-col items-center">
                <div className="text-primary font-extrabold text-2xl md:text-3xl leading-none">10</div>
                <div className="text-white/70 text-[11px] font-medium">Project Duration</div>
              </div>

              <div className="space-y-1.5 flex flex-col items-center">
                <div className="text-primary font-extrabold text-2xl md:text-3xl leading-none">100%</div>
                <div className="text-white/70 text-[11px] font-medium">On-Time Delivery</div>
              </div>

              <div className="space-y-1.5 flex flex-col items-center">
                <div className="text-primary font-extrabold text-2xl md:text-3xl leading-none">100%</div>
                <div className="text-white/70 text-[11px] font-medium">Quality Standards</div>
              </div>

              <div className="space-y-1.5 flex flex-col items-center">
                <div className="text-primary font-extrabold text-2xl md:text-3xl leading-none">15%</div>
                <div className="text-white/70 text-[11px] font-medium">Cost Savings Achieved</div>
              </div>

              <div className="space-y-1.5 flex flex-col items-center">
                <div className="text-primary font-extrabold text-2xl md:text-3xl leading-none">0</div>
                <div className="text-white/70 text-[11px] font-medium">Major Safety Incidents</div>
              </div>

              <div className="space-y-1.5 flex flex-col items-center">
                <div className="text-primary font-extrabold text-2xl md:text-3xl leading-none">100%</div>
                <div className="text-white/70 text-[11px] font-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. CTA BANNER (Project Management) ────────────────── */}
        <section className="bg-[#f2f7f4] py-10 border-t border-[#e2ede6]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-charcoal leading-snug">
                    Have a project to manage?
                  </h4>
                  <p className="text-xs text-dark-gray/80 mt-0.5">
                    Let us handle the details so you can focus on your vision.
                  </p>
                </div>
              </div>

              <Link
                href="/contact/start-project"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex-shrink-0"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 8. LIGHTBOX MODAL ─────────────────────────────────── */}
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full h-[70vh] rounded-xl overflow-hidden"
            >
              <Image
                src={lightboxImage}
                alt="Expanded view"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     4. RENDER: ARCHITECTURE / INTERIOR DESIGN VARIANT
     ───────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── 1. HERO SECTION ───────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[#0a0f0c] min-h-[580px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(10,15,12,0.98) 0%, rgba(10,15,12,0.94) 38%, rgba(10,15,12,0.78) 58%, rgba(10,15,12,0.35) 80%, rgba(10,15,12,0.15) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0f0c] to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 pt-32 pb-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] font-medium mb-6">
            <Link href="/" className="text-white/70 hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <Link href="/portfolio" className="text-white/70 hover:text-primary transition-colors">
              Portfolio
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-primary font-semibold truncate max-w-[260px] md:max-w-none">
              {project.title}
            </span>
          </nav>

          <div className="max-w-[620px]">
            <span className="text-[11px] font-bold tracking-[0.25em] text-primary uppercase mb-3 block">
              {project.category}
            </span>

            <h1
              className="text-white font-extrabold leading-[1.12] tracking-tight mb-4"
              style={{ fontSize: "clamp(32px, 4.5vw, 54px)" }}
            >
              {project.title}
            </h1>

            <h2 className="text-white/90 font-medium text-[15px] md:text-[17px] mb-4">
              {project.tagline || "Contemporary Elegance. Timeless Comfort."}
            </h2>

            <p className="text-white/70 text-[13.5px] leading-[1.8] mb-8">
              {project.description ||
                "This luxury apartment interior is a perfect blend of sophistication, warmth and functionality. Every detail from material selection to lighting is crafted to create a refined living experience."}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-white/10 max-w-[480px]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Location</span>
                  <span className="text-[13px] font-semibold text-white">{project.location || "Islamabad"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Project Type</span>
                  <span className="text-[13px] font-semibold text-white">{project.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Ruler className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Area</span>
                  <span className="text-[13px] font-semibold text-white">{project.area || "2,450 SQ FT"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Year</span>
                  <span className="text-[13px] font-semibold text-white">{project.year || "2024"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STICKY SUB-NAVIGATION TABS ───────────────────────── */}
      <section className="bg-white border-b border-[#e5e5e5] sticky top-16 z-30 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-3.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToTab(tab.id, tab.label)}
                  className={`text-[12px] font-bold tracking-wider uppercase transition-all py-1 relative whitespace-nowrap cursor-pointer ${
                    isActive ? "text-primary font-extrabold" : "text-dark-gray/70 hover:text-charcoal"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute -bottom-3.5 left-0 right-0 h-[2.5px] bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. PROJECT OVERVIEW SECTION ────────────────────────── */}
      <section id="overview" className="bg-white py-16 md:py-20 scroll-mt-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
                Project Overview
              </h2>

              <div className="space-y-4 text-[13.5px] leading-[1.8] text-dark-gray">
                <p>
                  {project.overviewText1 ||
                    "The apartment interior is designed with a focus on open spaces, natural light, and a refined material palette. The design combines modern aesthetics with functional layouts to create a serene and luxurious home environment."}
                </p>
                <p>
                  {project.overviewText2 ||
                    "Neutral tones, premium finishes, layered lighting, and custom furniture come together to deliver a cohesive and timeless interior experience."}
                </p>
              </div>

              <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-6 space-y-4 mt-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
                  At a Glance
                </h3>

                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs">
                  <div>
                    <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> Location
                    </span>
                    <span className="font-semibold text-charcoal">{project.location || "Islamabad"}</span>
                  </div>

                  <div>
                    <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                      <Ruler className="w-3.5 h-3.5 text-primary" /> Area
                    </span>
                    <span className="font-semibold text-charcoal">{project.area || "2,450 SQ FT"}</span>
                  </div>

                  <div>
                    <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                      <Building2 className="w-3.5 h-3.5 text-primary" /> Project Type
                    </span>
                    <span className="font-semibold text-charcoal">{project.category}</span>
                  </div>

                  <div>
                    <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                      <Layers className="w-3.5 h-3.5 text-primary" /> Scope of Work
                    </span>
                    <span className="font-semibold text-charcoal leading-snug block">
                      {project.scopeOfWork ? project.scopeOfWork.join(", ") : "Concept Design, Interior Design, FF&E, Lighting Design"}
                    </span>
                  </div>

                  <div>
                    <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" /> Completion
                    </span>
                    <span className="font-semibold text-charcoal">{project.year || "2024"}</span>
                  </div>

                  <div>
                    <span className="flex items-center gap-1.5 text-dark-gray/60 font-medium mb-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Status
                    </span>
                    <span className="font-semibold text-charcoal">{project.status || "Completed"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div id="gallery" className="lg:col-span-7 space-y-4 scroll-mt-28">
              <div
                onClick={() => setLightboxImage(mainImage)}
                className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-md cursor-pointer group"
              >
                <Image
                  src={mainImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" /> View Fullscreen
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {thumbList.map((img, idx) => {
                  const isLast = idx === thumbList.length - 1;
                  return (
                    <div
                      key={idx}
                      onClick={() => setLightboxImage(img)}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group shadow-xs border border-black/5"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {isLast && (
                        <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-xs flex flex-col items-center justify-center text-white text-center p-1">
                          <span className="text-[12px] font-bold leading-tight">+16</span>
                          <span className="text-[9px] uppercase tracking-wider text-white/80 font-medium">
                            More Images
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. DESIGN CONCEPT & KEY FEATURES SECTION ───────────── */}
      <section id="design-concept" className="bg-[#fcfdfc] py-16 md:py-20 border-t border-[#f0f0f0] scroll-mt-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-charcoal">Design Concept</h3>
              <p className="text-[13.5px] leading-[1.8] text-dark-gray">
                {project.conceptText ||
                  "The concept revolves around creating a calm, elegant and inviting home that reflects the client's lifestyle. The design emphasizes spatial flow, natural materials and bespoke details."}
              </p>

              <div className="grid grid-cols-4 gap-2 pt-4">
                {[
                  { icon: Gem, label: "Modern\nAesthetics" },
                  { icon: Heart, label: "Warm &\nInviting" },
                  { icon: LayoutGrid, label: "Functional\nLayouts" },
                  { icon: Clock, label: "Timeless\nDetails" },
                ].map((pillar, i) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={i} className="flex flex-col items-center text-center gap-2">
                      <div className="w-11 h-11 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <span className="text-[11px] font-semibold text-charcoal leading-tight whitespace-pre-line">
                        {pillar.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-xl md:text-2xl font-bold text-charcoal">Key Features</h3>
              <ul className="space-y-3">
                {(
                  project.features || [
                    "Spacious open-plan living and dining area",
                    "Custom joinery and premium finishes",
                    "Layered lighting for ambiance and functionality",
                    "Elegant neutral color palette with natural textures",
                    "High-end furniture and curated décor",
                    "Large windows for natural light and views",
                  ]
                ).map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[13px] text-dark-gray leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="spaces" className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md group scroll-mt-28">
              <Image
                src={
                  project.featureBedroomImage ||
                  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80"
                }
                alt={`${project.title} space`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FIVE FEATURE HIGHLIGHTS STRIP (Dark) ────────────── */}
      <section id="materials" className="bg-[#0a0f0c] py-14 border-t border-white/5 scroll-mt-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                icon: Gem,
                title: "Refined Luxury",
                desc: "Premium materials and finishes create a sophisticated and luxurious ambience.",
              },
              {
                icon: Compass,
                title: "Thoughtful Layout",
                desc: "Efficient planning ensures seamless flow and maximum space utilization.",
              },
              {
                icon: Trees,
                title: "Natural Elements",
                desc: "Use of wood, stone and natural textures brings warmth and timeless appeal.",
              },
              {
                icon: Sliders,
                title: "Custom Details",
                desc: "Bespoke furniture and joinery add character and a sense of exclusivity.",
              },
              {
                icon: Smile,
                title: "Comfort & Style",
                desc: "Every element is designed to ensure comfort without compromising on style.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="space-y-3">
                  <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-white font-bold text-sm leading-tight">{item.title}</h4>
                  <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CTA BANNER ──────────────────────────────────────── */}
      <section className="bg-[#f2f7f4] py-10 border-t border-[#e2ede6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-charcoal leading-snug">
                  Have a similar project in mind?
                </h4>
                <p className="text-xs text-dark-gray/80 mt-0.5">
                  Let&apos;s create a space that reflects your style and elevates your lifestyle.
                </p>
              </div>
            </div>

            <Link
              href="/contact/start-project"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex-shrink-0"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. LIGHTBOX MODAL ──────────────────────────────────── */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] w-full h-[70vh] rounded-xl overflow-hidden"
          >
            <Image
              src={lightboxImage}
              alt="Expanded view"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
