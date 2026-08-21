"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  Lightbulb,
  Leaf,
  Target,
  Sofa,
  ZoomIn,
  Scale,
  Zap,
  BarChart3,
  FileCheck,
  Check,
  Box,
  Camera,
} from "lucide-react";

export interface SelectedTeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  socialLink?: string | null;
  description?: string | null;
}

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
  selectedTeam?: SelectedTeamMember[];
}

/* ─────────────────────────────────────────────────────────────
   SHARED TEAM SECTION (For Architecture, Interior, Landscape & PM)
   ───────────────────────────────────────────────────────────── */
function ProjectTeamSection({ selectedTeam }: { selectedTeam?: SelectedTeamMember[] }) {
  const hasRealTeam = selectedTeam && selectedTeam.length > 0;

  return (
    <div className="space-y-16 py-14">
      {/* ── TOP ROW: The Minds Behind the Design + Key Leadership ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Title + Paragraph + 2x2 Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight leading-tight">
              The Minds Behind<br />the Design
            </h2>
            <p className="text-[13px] leading-[1.8] text-dark-gray/80 mt-4">
              Our diverse team combines creativity, technical expertise and industry experience to deliver designs that are functional, sustainable and timeless.
            </p>
          </div>

          {/* 2x2 Stats Box */}
          <div className="grid grid-cols-2 gap-3.5 pt-2">
            <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 space-y-1">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-charcoal block leading-none">20+</span>
              <span className="text-[11px] text-dark-gray/70 font-medium">Team Members</span>
            </div>

            <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 space-y-1">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-charcoal block leading-none">200+</span>
              <span className="text-[11px] text-dark-gray/70 font-medium">Projects Completed</span>
            </div>

            <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 space-y-1">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-charcoal block leading-none">10+</span>
              <span className="text-[11px] text-dark-gray/70 font-medium">Years of Experience</span>
            </div>

            <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 space-y-1">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
                <HardHat className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-charcoal block leading-none">100%</span>
              <span className="text-[11px] text-dark-gray/70 font-medium">Client Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Right Column: Real Team Member Cards or empty state */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-charcoal">
              KEY TEAM MEMBERS
            </span>
            <div className="flex-1 h-[1px] bg-black/10" />
            {hasRealTeam && (
              <span className="text-[10px] text-dark-gray/50 font-medium">
                {selectedTeam.length} assigned
              </span>
            )}
          </div>

          {hasRealTeam ? (
            <div className={`grid gap-4 ${
              selectedTeam.length === 1 ? "grid-cols-1 max-w-[200px]" :
              selectedTeam.length === 2 ? "grid-cols-2" :
              selectedTeam.length === 3 ? "grid-cols-3" :
              "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            }`}>
              {selectedTeam.map((member) => (
                <div
                  key={member.id}
                  className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/5] bg-dark-gray/5 overflow-hidden">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-charcoal text-[13.5px] leading-tight mb-0.5">
                        {member.name}
                      </h4>
                      <p className="text-primary font-semibold text-[11.5px] leading-tight">
                        {member.role}
                      </p>
                      {member.description && (
                        <p className="text-dark-gray/65 text-[11px] mt-2 leading-relaxed line-clamp-2">
                          {member.description}
                        </p>
                      )}
                    </div>

                    {member.socialLink && (
                      <div className="pt-2">
                        <a
                          href={member.socialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 rounded bg-[#f0f0f0] hover:bg-primary hover:text-white text-dark-gray/70 flex items-center justify-center transition-colors text-[10px]"
                          title={`LinkedIn profile of ${member.name}`}
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-[#e0e0e0] rounded-2xl bg-[#fafcfa]">
              <div className="w-12 h-12 rounded-full bg-dark-gray/5 flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-dark-gray/30" />
              </div>
              <p className="text-[13px] font-semibold text-dark-gray/50">No team members assigned</p>
              <p className="text-[11.5px] text-dark-gray/35 mt-1">Team members can be selected in the admin panel when editing this project.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   1. DEDICATED SECTION: OUR APPROACH
   ───────────────────────────────────────────────────────────── */
function OurApproachSection() {
  const approachPillars = [
    {
      icon: Users,
      title: "Client First",
      desc: "We align with the client's goals and keep them informed at every step of project development with weekly progress reviews and direct executive access.",
      highlight: "Direct stakeholder alignment",
    },
    {
      icon: Activity,
      title: "Monitor Closely",
      desc: "Continuous monitoring of progress, cost and quality on site with real-time digital snag lists and rigorous milestone inspections.",
      highlight: "Daily site logs & tracking",
    },
    {
      icon: Compass,
      title: "Plan Smart",
      desc: "Detailed scheduling, resource allocation, and Critical Path Method (CPM) programming for smooth and predictable execution.",
      highlight: "CPM timeline scheduling",
    },
    {
      icon: ShieldAlert,
      title: "Mitigate Risks",
      desc: "Identifying potential risks, supply delays, and design clashes early to implement effective mitigation before they impact the budget.",
      highlight: "Proactive risk containment",
    },
    {
      icon: Wrench,
      title: "Execute Right",
      desc: "Seamless coordination with architects, MEP consultants, structural engineers, contractors and specialized trade suppliers for flawless delivery.",
      highlight: "Inter-disciplinary coordination",
    },
    {
      icon: Award,
      title: "Deliver Excellence",
      desc: "On-time handover with complete as-built documentation, warranty schedules, operational manuals, and 100% client satisfaction.",
      highlight: "Defect-free handover guarantee",
    },
  ];

  return (
    <div className="space-y-12 py-12 md:py-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
            Our Approach
          </h2>
          <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approachPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-[#fafcfa] border border-[#e5ece7] rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors group shadow-2xs"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-charcoal leading-snug">
                  {pillar.title}
                </h4>
                <p className="text-dark-gray/75 text-xs md:text-[13px] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center gap-2 text-primary text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{pillar.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. DEDICATED SECTION: SERVICES / SCOPE OF WORK
   ───────────────────────────────────────────────────────────── */
function ServicesScopeSection({
  scopeOfWork,
  coverImage,
}: {
  scopeOfWork: string[];
  coverImage?: string;
}) {
  const defaultServices = [
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

  const serviceList = scopeOfWork && scopeOfWork.length > 0 ? scopeOfWork : defaultServices;

  return (
    <div className="space-y-12 py-12 md:py-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
            Our Scope of Work &amp; Services
          </h2>
          <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 7 cols: 10 checklist items */}
        <div className="lg:col-span-7 space-y-4">
          <p className="text-dark-gray text-xs md:text-sm leading-relaxed mb-6">
            We provide end-to-end management services overseeing every architectural, engineering, and contractual detail so your investment is protected from initiation to final handover.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {serviceList.map((srv, idx) => (
              <div
                key={idx}
                className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-3.5 flex items-center gap-3 shadow-2xs hover:border-primary/40 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-charcoal text-xs leading-snug">
                  {srv}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 cols: Showcase Photo Card with real project cover */}
        <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group border border-black/5">
          <Image
            src={coverImage || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80"}
            alt="Site management and hard hat supervision"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-end p-6 text-white">
            <div className="bg-primary/90 backdrop-blur-sm self-start px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2">
              Full Lifecycle Management
            </div>
            <h4 className="text-base font-bold leading-tight">
              Rigorous On-Site Supervision
            </h4>
            <p className="text-white/80 text-xs mt-1">
              Ensuring 100% compliance with approved drawings, structural calculations, and safety standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. DEDICATED SECTION: PROJECT PROCESS (6-Step Stepper)
   ───────────────────────────────────────────────────────────── */
function ProjectProcessSection() {
  const steps = [
    {
      step: "01",
      icon: MessageSquare,
      title: "Initiation",
      desc: "Understanding project goals, client vision, site constraints, and feasibility requirements.",
    },
    {
      step: "02",
      icon: Sliders,
      title: "Planning",
      desc: "Developing detailed schedule, resource allocation, procurement matrix, and budget benchmarks.",
    },
    {
      step: "03",
      icon: HardHat,
      title: "Execution",
      desc: "Coordinating multi-trade contractors, materials testing, site labor, and daily operations.",
    },
    {
      step: "04",
      icon: Eye,
      title: "Monitoring",
      desc: "Live tracking of milestones, cost variance, quality inspections, and HSE safety protocols.",
    },
    {
      step: "05",
      icon: ShieldCheck,
      title: "Controlling",
      desc: "Managing change orders, eliminating site clashes, and preventing budget overruns.",
    },
    {
      step: "06",
      icon: Handshake,
      title: "Handover",
      desc: "Final snagging, as-built documentation, authority approvals, and successful key handover.",
    },
  ];

  return (
    <div className="space-y-12 py-12 md:py-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
            Our Project Management Process
          </h2>
          <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
        {steps.map((item, idx, arr) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="bg-[#fafcfa] border border-[#e5ece7] rounded-2xl p-5 flex flex-col items-center text-center space-y-3 relative group hover:border-primary/40 transition-colors shadow-2xs"
            >
              <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs">
                {item.step}
              </div>

              <div className="w-11 h-11 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>

              <h4 className="text-sm font-bold text-charcoal leading-tight">
                {item.title}
              </h4>
              <p className="text-[11.5px] text-dark-gray/70 leading-relaxed">
                {item.desc}
              </p>

              {idx < arr.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-10 z-10">
                  <ChevronRight className="text-primary/40 w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. DEDICATED SECTION: KEY BENEFITS
   ───────────────────────────────────────────────────────────── */
function KeyBenefitsSection({ duration }: { duration?: string | null }) {
  const metrics = [
    { value: duration || "10 Months", label: "Project Duration" },
    { value: "100%", label: "On-Time Delivery" },
    { value: "100%", label: "Quality Standards" },
    { value: "15%", label: "Cost Savings Achieved" },
    { value: "0", label: "Major Safety Incidents" },
    { value: "100%", label: "Client Satisfaction" },
  ];

  const benefitsCards = [
    {
      icon: DollarSign,
      title: "Cost Optimization & Budget Control",
      desc: "Value engineering, bulk procurement discounts, and strict contract administration prevent cost overruns and save up to 15% on overall construction expenditure.",
    },
    {
      icon: Clock,
      title: "Time Compression & Schedule Guarantee",
      desc: "Proactive CPM timeline scheduling and concurrent task management eliminate idle site time, ensuring handover strictly on or ahead of schedule.",
    },
    {
      icon: ShieldCheck,
      title: "Uncompromising Quality & QA Audits",
      desc: "Multi-stage inspections of concrete slump, reinforcement placement, MEP conduits, and architectural finishes ensure flawless execution with zero rework.",
    },
    {
      icon: Handshake,
      title: "Single-Point Accountability",
      desc: "No contractor blame games. You have one dedicated project director managing all sub-contractors, vendors, and consultants on your behalf.",
    },
  ];

  return (
    <div className="space-y-12 py-12 md:py-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
            Key Benefits &amp; Measurable Outcomes
          </h2>
          <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
        </div>
      </div>

      {/* Dark Metrics Bar */}
      <div className="bg-[#0a0f0c] p-8 md:p-10 rounded-2xl border border-white/10 shadow-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {metrics.map((m, idx) => (
            <div key={idx} className="space-y-1.5 flex flex-col items-center">
              <div className="text-primary font-extrabold text-2xl md:text-3xl leading-none">
                {m.value}
              </div>
              <div className="text-white/75 text-xs font-medium">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Value Driver Advantage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefitsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-[#fafcfa] border border-[#e5ece7] rounded-2xl p-6 space-y-3 hover:border-primary/40 transition-colors group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-charcoal leading-snug">
                {card.title}
              </h4>
              <p className="text-dark-gray/75 text-xs md:text-[13px] leading-relaxed">
                {card.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProjectDetailClient({ project }: { project: ProjectDetailData }) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab")?.toUpperCase() || "OVERVIEW";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Dynamic gallery list containing real uploaded images
  const defaultFallbackGallery = [
    project.coverImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=85",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=85",
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  ];

  const galleryList = (project.gallery && project.gallery.length > 0)
    ? project.gallery
    : project.coverImage
    ? [project.coverImage]
    : defaultFallbackGallery;

  // Active main image in Overview section (clicking thumbnails swaps the main view)
  const [activeOverviewImage, setActiveOverviewImage] = useState<string>(
    galleryList[0] || project.coverImage
  );

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

  const is3DVisualization =
    !isConstructionSupervision &&
    !isLandscape &&
    !isProjectManagement &&
    (project.category.toLowerCase().includes("3d") ||
      project.category.toLowerCase().includes("visualization") ||
      project.category.toLowerCase().includes("rendering") ||
      project.slug.includes("3d") ||
      project.slug.includes("visualization") ||
      project.slug.includes("render") ||
      project.slug.includes("10-marla-modern-residence"));

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
    : is3DVisualization
    ? [
        { id: "overview", label: "OVERVIEW" },
        { id: "gallery", label: "GALLERY" },
        { id: "elevations", label: "ELEVATIONS" },
        { id: "360-views", label: "360° VIEWS" },
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

  const isTeamActive = activeTab === "TEAM";
  const isGalleryActive = activeTab === "GALLERY";
  const isApproachActive = activeTab === "OUR APPROACH" || activeTab === "APPROACH";
  const isServicesActive = activeTab === "SERVICES";
  const isProcessActive = activeTab === "PROJECT PROCESS" || activeTab === "PROCESS";
  const isBenefitsActive = activeTab === "KEY BENEFITS" || activeTab === "BENEFITS";

  const handleTabClick = (label: string) => {
    setActiveTab(label);
    const navEl = document.getElementById("project-subnav");
    if (navEl) {
      const yOffset = -80;
      const y = navEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  /* ─────────────────────────────────────────────────────────────
     1. RENDER: 3D VISUALIZATION VARIANT
     ───────────────────────────────────────────────────────────── */
  if (is3DVisualization) {
    const curated3DImages = [
      ...(galleryList && galleryList.length > 0 ? galleryList : []),
      project.coverImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=85",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
    ].filter((v, i, a) => v && typeof v === "string" && a.indexOf(v) === i);

    const eightGalleryImages = curated3DImages.slice(0, 8);

    return (
      <>
        {/* ── 1. HERO SECTION (3D Visualization) ────────────────── */}
        <section className="relative w-full overflow-hidden bg-[#0a0f0c] min-h-[580px] md:min-h-[640px] flex items-center">
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
                  "linear-gradient(to right, rgba(10,15,12,0.96) 0%, rgba(10,15,12,0.88) 40%, rgba(10,15,12,0.68) 60%, rgba(10,15,12,0.22) 80%, rgba(10,15,12,0.05) 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0f0c] to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 pt-32 pb-16">
            {/* Breadcrumb: Home > Portfolio > 3D Visualization > [Title in Green] */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] font-medium mb-6">
              <Link href="/" className="text-white/70 hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <Link href="/portfolio" className="text-white/70 hover:text-primary transition-colors">
                Portfolio
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white/70">3D Visualization</span>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-primary font-semibold">{project.title}</span>
            </nav>

            <div className="max-w-[700px]">
              {/* Category Tag */}
              <span className="text-[11.5px] font-extrabold tracking-[0.2em] text-primary uppercase mb-3 block">
                {project.scope?.toUpperCase() || "EXTERIOR VISUALIZATION"}
              </span>

              {/* Title */}
              <h1
                className="text-white font-extrabold leading-[1.1] tracking-tight mb-3"
                style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}
              >
                {project.title}
              </h1>

              {/* Subtitle / Tagline */}
              <h3 className="text-white font-bold text-lg md:text-xl mb-4 text-white/95">
                {project.tagline || "Realistic. Detailed. Inspiring."}
              </h3>

              {/* Description */}
              <p className="text-white/80 text-[13.5px] md:text-[14px] leading-[1.8] mb-10 max-w-[620px]">
                {project.description ||
                  "These exterior visualizations present a modern residence design with a perfect blend of contemporary architecture, premium materials and lush landscaping. Every angle is crafted to showcase the beauty of design before it's built."}
              </p>

              {/* 4 Bottom Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Project Type</span>
                    <span className="text-xs font-semibold text-white">Residential</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Plot Size</span>
                    <span className="text-xs font-semibold text-white">{project.plotSize || "10 Marla"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Scope</span>
                    <span className="text-xs font-semibold text-white">{project.scope || "Exterior Visualization"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Year</span>
                    <span className="text-xs font-semibold text-white">{project.year || "2024"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. STICKY SUB-NAVIGATION TABS ───────────────────────── */}
        <section id="project-subnav" className="bg-white border-b border-[#e5e5e5] sticky top-16 z-30 shadow-xs">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-3.5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.label;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.label)}
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

        {/* ── 3. TAB CONTENT VIEWS (3D Visualization) ─────────────── */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* TAB: OVERVIEW */}
          {activeTab === "OVERVIEW" && (
            <div className="space-y-12 py-12 md:py-16">
              {/* Section 1: Project Overview Top Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
                      Project Overview
                    </h2>
                    <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
                  </div>

                  <p className="text-[13.5px] leading-[1.8] text-dark-gray">
                    {project.overviewText1 ||
                      project.description ||
                      `This ${project.plotSize || "10 Marla"} modern residence is designed with clean lines, balanced proportions and a harmonious combination of textures. The design emphasizes natural light, open spaces and a strong connection between indoor and outdoor living.`}
                  </p>

                  <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-y-5 gap-x-6 text-xs">
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Location</span>
                          <span className="font-semibold text-charcoal">{project.location || "Lahore, Pakistan"}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Project Type</span>
                          <span className="font-semibold text-charcoal">{project.category || "Residential"}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                          <Ruler className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Plot Size</span>
                          <span className="font-semibold text-charcoal">{project.plotSize || "10 Marla"}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                          <PenTool className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Scope</span>
                          <span className="font-semibold text-charcoal">{project.scope || "Exterior Visualization"}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                          <Layers className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Floors</span>
                          <span className="font-semibold text-charcoal">{project.floors || "G+1"}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                          <Calendar className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-dark-gray/60 block">Year</span>
                          <span className="font-semibold text-charcoal">{project.year || "2024"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Large Showcase Render */}
                <div className="lg:col-span-7">
                  <div
                    onClick={() => setLightboxImage(curated3DImages[0] || project.coverImage)}
                    className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-md cursor-pointer group border border-black/5"
                  >
                    <Image
                      src={curated3DImages[0] || project.coverImage}
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
                </div>
              </div>

              {/* Section 2: Key Visual Highlights Bar */}
              <div className="bg-[#fafcfa] border border-[#e5ece7] rounded-2xl p-6">
                <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
                  <h3 className="text-base font-bold text-charcoal tracking-tight flex-shrink-0">
                    Key Visual Highlights
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 flex-1 w-full">
                    {[
                      { icon: Compass, label: "Modern\nArchitecture" },
                      { icon: Box, label: "Premium\nMaterials" },
                      { icon: Leaf, label: "Lush\nLandscaping" },
                      { icon: Sparkles, label: "Realistic Lighting\n& Shadows" },
                      { icon: Lightbulb, label: "High Quality\nRendering" },
                      { icon: Maximize, label: "Multiple Views\n& Angles" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div key={i} className="flex flex-col items-center text-center gap-2">
                          <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary">
                            <Icon className="w-4 h-4" strokeWidth={1.5} />
                          </div>
                          <span className="text-[11px] font-semibold text-charcoal leading-tight whitespace-pre-line">
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handleTabClick("GALLERY")}
                    className="bg-[#0a0f0c] hover:bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer self-end xl:self-center"
                  >
                    <span>+{Math.max(curated3DImages.length, 12)} More Images</span>
                  </button>
                </div>
              </div>

              {/* Section 3: Exterior Visualization Gallery (8 cards) */}
              <div className="space-y-6 pt-2">
                <h3 className="text-2xl font-bold text-charcoal tracking-tight">
                  Exterior Visualization Gallery
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                  {eightGalleryImages.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightboxImage(img)}
                      className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} Render ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-black/70 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-primary" /> View
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: GALLERY */}
          {activeTab === "GALLERY" && (
            <div className="space-y-8 py-12 md:py-16">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
                  Complete 3D Render Gallery
                </h2>
                <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {curated3DImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setLightboxImage(img)}
                    className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} gallery shot ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-primary" /> View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ELEVATIONS */}
          {activeTab === "ELEVATIONS" && (
            <div className="space-y-10 py-12 md:py-16">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
                  Exterior 3D Elevations
                </h2>
                <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
                <p className="text-dark-gray/70 text-xs md:text-sm mt-2">
                  Front, rear, and lateral orthographic perspectives displaying architectural massing and material balance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Front Facade Elevation", desc: "Main architectural elevation featuring cantilevered terrace and louvers.", img: curated3DImages[0] },
                  { title: "Right Side Elevation", desc: "Lateral perspective showing window rhythm and boundary wall integration.", img: curated3DImages[1] || curated3DImages[0] },
                  { title: "Left Side Elevation", desc: "Service entry, ducting recesses, and linear aesthetic verticality.", img: curated3DImages[2] || curated3DImages[0] },
                  { title: "Rear Garden Facade", desc: "Full-height glazed aperture opening into private landscaped lawn.", img: curated3DImages[3] || curated3DImages[0] },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group">
                    <div onClick={() => setLightboxImage(item.img)} className="relative aspect-[16/10] overflow-hidden cursor-pointer">
                      <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1.5">
                        <ZoomIn className="w-3.5 h-3.5 text-primary" /> View Elevation
                      </div>
                    </div>
                    <div className="p-5 space-y-1">
                      <h4 className="font-bold text-charcoal text-sm">{item.title}</h4>
                      <p className="text-dark-gray/70 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* TAB: 360° VIEWS */}
          {(activeTab === "360° VIEWS" || activeTab === "360") && (
            <div className="space-y-10 py-12 md:py-16">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
                  360° Panoramic Exterior Experience
                </h2>
                <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
                <p className="text-dark-gray/70 text-xs md:text-sm mt-2">
                  Explore full spherical perspective rendering showcasing surrounding context, street trees, and approach driveway.
                </p>
              </div>

              <div
                onClick={() => setLightboxImage(curated3DImages[0] || project.coverImage)}
                className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-lg border border-black/5 cursor-pointer group"
              >
                <Image
                  src={curated3DImages[0] || project.coverImage}
                  alt="360 Panoramic Experience"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white space-y-2">
                  <div className="w-14 h-14 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-xs uppercase font-bold tracking-widest bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md">
                    Click to Open Full View
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── 4. CTA BANNER (3D Visualization) ───────────────────── */}
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
                    Let&apos;s create visuals that bring your ideas to life.
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

        {/* ── 5. LIGHTBOX MODAL ──────────────────────────────────── */}
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
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
     2. RENDER: CONSTRUCTION SUPERVISION VARIANT
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

                <span className="text-[11px] font-bold tracking-[0.25em] text-primary uppercase mb-3 block">
                  CONSTRUCTION SUPERVISION
                </span>

                <h1
                  className="text-white font-extrabold leading-[1.12] tracking-tight mb-2"
                  style={{ fontSize: "clamp(32px, 4.5vw, 54px)" }}
                >
                  {project.title}
                </h1>

                <h2 className="text-white/95 font-bold text-[18px] md:text-[22px] mb-2">
                  {project.tagline || "G+6 Mixed-Use Development"}
                </h2>

                <h3 className="text-primary font-semibold text-[14px] md:text-[15px] mb-4">
                  {project.tagline2 || "Supervision You Can Trust. Quality You Can See."}
                </h3>

                <p className="text-white/70 text-[13.5px] leading-[1.8] mb-8 max-w-xl">
                  {project.description ||
                    "Fanoon Consultants provided complete construction supervision services for Cantt Heights, ensuring the project was executed in strict accordance with the approved design, specifications, quality standards and project timeline."}
                </p>

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
        <section id="project-subnav" className="bg-white border-b border-[#e5e5e5] sticky top-16 z-30 shadow-xs">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-3.5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.label;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.label)}
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
        {activeTab === "OVERVIEW" && (
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
                        "Cantt Heights is a signature G+6 mixed-use development located in Peshawar Cantonment. Fanoon Consultants was responsible for end-to-end construction supervision to ensure the highest standards of workmanship, material quality and compliance with drawings and specifications."}
                    </p>
                    <p>
                      {project.overviewText2 ||
                        "Our team worked closely with the contractor and all stakeholders to monitor every activity on site, mitigate risks and deliver a safe, timely and high-quality project."}
                    </p>
                  </div>

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

                {/* Real Project Images in Overview */}
                <div id="gallery" className="lg:col-span-7 space-y-4 scroll-mt-28">
                  <div
                    onClick={() => setLightboxImage(activeOverviewImage)}
                    className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-md cursor-pointer group border border-black/5"
                  >
                    <Image
                      src={activeOverviewImage}
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

                  {/* Thumbnails of real uploaded images */}
                  {galleryList.length > 1 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3">
                      {galleryList.map((img, idx) => {
                        const isSelected = activeOverviewImage === img;
                        return (
                          <div
                            key={idx}
                            onClick={() => setActiveOverviewImage(img)}
                            className={`relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group shadow-xs border transition-all ${
                              isSelected ? "ring-2 ring-primary border-transparent scale-98" : "border-black/10 hover:border-primary/50"
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`${project.title} image ${idx + 1}`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── 4. SCOPE OF SUPERVISION TAB ──────── */}
        {(activeTab === "SCOPE OF SUPERVISION" || activeTab === "SCOPE") && (
          <section id="scope" className="bg-[#fcfdfc] py-16 md:py-20 border-t border-[#f0f0f0] scroll-mt-28">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-charcoal">
                    Scope of Construction Supervision
                  </h3>
                  <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {supervisionScope.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-dark-gray bg-white p-4 rounded-xl border border-[#e5ece7]">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-[#f0f9f3] border border-[#d3ecd9] rounded-xl p-5 flex items-start gap-4 mt-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <p className="text-xs md:text-sm text-dark-gray leading-relaxed">
                    Our supervision ensures that every element of the project is executed to the highest standards of quality, safety and compliance with approved drawings and specifications.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── 5. OUR APPROACH TAB ──────── */}
        {(activeTab === "OUR APPROACH" || activeTab === "APPROACH") && (
          <section id="approach" className="bg-white py-16 md:py-20 scroll-mt-28">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-charcoal">Our Supervision Approach</h3>
                <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { title: "Plan", icon: FileText, desc: "Detailed review of drawings, specifications and method statements." },
                  { title: "Monitor", icon: Activity, desc: "Continuous on-site monitoring and quality inspections at each stage of construction." },
                  { title: "Report", icon: ClipboardList, desc: "Regular site reports, snag lists and progress updates for informed decision-making." },
                  { title: "Resolve", icon: Wrench, desc: "Immediate identification and resolution of site issues to avoid delays and rework." },
                  { title: "Deliver", icon: Award, desc: "Final verification and documentation to ensure successful project completion." },
                ].map((appr, i) => {
                  const Icon = appr.icon;
                  return (
                    <div key={i} className="bg-[#fafcfa] border border-[#e5ece7] rounded-2xl p-6 space-y-3 hover:border-primary/40 transition-colors shadow-2xs">
                      <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-charcoal">{appr.title}</h4>
                      <p className="text-xs text-dark-gray/70 leading-relaxed">{appr.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── 6. SITE PROGRESS TAB ──────── */}
        {(activeTab === "SITE PROGRESS" || activeTab === "PROGRESS") && (
          <section id="progress" className="bg-[#fcfdfc] py-16 md:py-20 scroll-mt-28">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-charcoal">Site Progress Stages</h3>
                <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {stages.map((st, i) => (
                  <div key={i} onClick={() => setLightboxImage(st.image)} className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={st.image}
                        alt={st.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-0.5">Stage {i + 1}</span>
                      <h4 className="text-sm font-bold text-charcoal">{st.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 7. GALLERY TAB ──────── */}
        {activeTab === "GALLERY" && (
          <section id="gallery" className="bg-white py-16 md:py-20 scroll-mt-28">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-charcoal">Project Gallery</h3>
                <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {galleryList.map((img, i) => (
                  <div key={i} onClick={() => setLightboxImage(img)} className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5">
                    <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                        <Eye className="w-4 h-4 text-primary" /> View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 8. FIVE KEY OUTCOMES (Dark Strip) ──────────────────── */}
        {(activeTab === "KEY OUTCOMES" || activeTab === "OUTCOMES") && (
          <section id="outcomes" className="bg-white py-16 md:py-20 scroll-mt-28">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-charcoal">Key Outcomes & Results</h3>
                <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
              </div>
              <div className="bg-[#0a0f0c] p-8 md:p-12 rounded-2xl border border-white/10 shadow-xl">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
                  <div className="space-y-1 flex flex-col items-center">
                    <div className="flex items-center gap-1.5 text-primary font-bold text-xl md:text-2xl">
                      <ShieldCheck className="w-5 h-5" />
                      <span>100%</span>
                    </div>
                    <span className="text-white/70 text-xs">Quality Compliance</span>
                  </div>

                  <div className="space-y-1 flex flex-col items-center">
                    <div className="flex items-center gap-1.5 text-primary font-bold text-xl md:text-2xl">
                      <DollarSign className="w-5 h-5" />
                      <span>On-Time</span>
                    </div>
                    <span className="text-white/70 text-xs">Project Delivery</span>
                  </div>

                  <div className="space-y-1 flex flex-col items-center">
                    <div className="flex items-center gap-1.5 text-primary font-bold text-xl md:text-2xl">
                      <MapPin className="w-5 h-5" />
                      <span>Zero</span>
                    </div>
                    <span className="text-white/70 text-xs">Major Safety Incidents</span>
                  </div>

                  <div className="space-y-1 flex flex-col items-center">
                    <div className="flex items-center gap-1.5 text-primary font-bold text-xl md:text-2xl">
                      <Calendar className="w-5 h-5" />
                      <span>Cost</span>
                    </div>
                    <span className="text-white/70 text-xs">Within Budget</span>
                  </div>

                  <div className="space-y-1 flex flex-col items-center">
                    <div className="flex items-center gap-1.5 text-primary font-bold text-xl md:text-2xl">
                      <Users className="w-5 h-5" />
                      <span>Client</span>
                    </div>
                    <span className="text-white/70 text-xs">Satisfaction Achieved</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
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
     2. RENDER: GENERAL (Architecture, Interior, Landscape, PM)
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
            <span className="text-white/80">{project.title}</span>
            {isTeamActive && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                <span className="text-primary font-semibold">Team</span>
              </>
            )}
            {isGalleryActive && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                <span className="text-primary font-semibold">Gallery</span>
              </>
            )}
            {isApproachActive && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                <span className="text-primary font-semibold">Our Approach</span>
              </>
            )}
            {isServicesActive && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                <span className="text-primary font-semibold">Services</span>
              </>
            )}
            {isProcessActive && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                <span className="text-primary font-semibold">Project Process</span>
              </>
            )}
            {isBenefitsActive && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                <span className="text-primary font-semibold">Key Benefits</span>
              </>
            )}
          </nav>

          <div className="max-w-[660px]">
            <span className="text-[11px] font-bold tracking-[0.25em] text-primary uppercase mb-3 block">
              {project.category.toUpperCase()}
            </span>

            <h1
              className="text-white font-extrabold leading-[1.12] tracking-tight mb-4"
              style={{ fontSize: "clamp(32px, 4.5vw, 54px)" }}
            >
              {project.title}
            </h1>

            {isTeamActive ? (
              <>
                <h2 className="text-white font-bold text-[20px] md:text-[24px] mb-3">
                  Our Team
                </h2>
                <p className="text-white/75 text-[14px] leading-[1.8] mb-8">
                  A multidisciplinary team of architects, designers and technicians working together to transform ideas into exceptional spaces.
                </p>
              </>
            ) : isGalleryActive ? (
              <>
                <h2 className="text-white font-bold text-[20px] md:text-[24px] mb-3">
                  Gallery
                </h2>
                <p className="text-white/75 text-[14px] leading-[1.8] mb-8">
                  Explore the visual story of this {project.plotSize || "1 Kanal"} residence through a collection of exterior and interior photographs that capture its design, details and ambiance.
                </p>
              </>
            ) : isApproachActive ? (
              <>
                <h2 className="text-white font-bold text-[20px] md:text-[24px] mb-3">
                  Our Approach
                </h2>
                <p className="text-white/75 text-[14px] leading-[1.8] mb-8">
                  A structured, transparent and disciplined methodology that ensures seamless project delivery, budget control, and quality excellence.
                </p>
              </>
            ) : isServicesActive ? (
              <>
                <h2 className="text-white font-bold text-[20px] md:text-[24px] mb-3">
                  Services &amp; Scope of Work
                </h2>
                <p className="text-white/75 text-[14px] leading-[1.8] mb-8">
                  End-to-end management covering planning, vendor procurement, site supervision, cost control, and quality inspection.
                </p>
              </>
            ) : isProcessActive ? (
              <>
                <h2 className="text-white font-bold text-[20px] md:text-[24px] mb-3">
                  Project Process
                </h2>
                <p className="text-white/75 text-[14px] leading-[1.8] mb-8">
                  From initial feasibility to final key handover, our 6-phase project lifecycle guarantees milestone precision.
                </p>
              </>
            ) : isBenefitsActive ? (
              <>
                <h2 className="text-white font-bold text-[20px] md:text-[24px] mb-3">
                  Key Benefits &amp; Outcomes
                </h2>
                <p className="text-white/75 text-[14px] leading-[1.8] mb-8">
                  Proven benchmarks in budget savings, on-time delivery, quality assurance, and zero-defect handover.
                </p>
              </>
            ) : null}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 max-w-[560px]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Location</span>
                  <span className="text-xs font-semibold text-white truncate max-w-[110px] block">{project.location || "Lahore, Pakistan"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Maximize className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Plot Size</span>
                  <span className="text-xs font-semibold text-white">{project.plotSize || project.area || "1 Kanal"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Project Type</span>
                  <span className="text-xs font-semibold text-white">{project.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Year</span>
                  <span className="text-xs font-semibold text-white">{project.year || "2024"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STICKY SUB-NAVIGATION TABS ───────────────────────── */}
      <section id="project-subnav" className="bg-white border-b border-[#e5e5e5] sticky top-16 z-30 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-3.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.label)}
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

      {/* ── 3. TAB CONTENT VIEWS ────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* TAB: OUR APPROACH */}
        {isApproachActive && <OurApproachSection />}

        {/* TAB: SERVICES */}
        {isServicesActive && (
          <ServicesScopeSection
            scopeOfWork={project.scopeOfWork || []}
            coverImage={project.coverImage}
          />
        )}

        {/* TAB: PROJECT PROCESS */}
        {isProcessActive && <ProjectProcessSection />}

        {/* TAB: KEY BENEFITS */}
        {isBenefitsActive && <KeyBenefitsSection duration={project.duration} />}

        {/* TAB: TEAM */}
        {isTeamActive && <ProjectTeamSection selectedTeam={project.selectedTeam} />}

        {/* TAB: GALLERY (Real Uploaded Images Grid) */}
        {isGalleryActive && (
          <div className="space-y-8 py-12 md:py-16">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
                  Project Gallery
                </h2>
                <div className="w-10 h-[3px] bg-primary rounded-full mt-1.5" />
              </div>
            </div>

            {/* Dynamic Rendering of Real Images */}
            {galleryList.length === 1 ? (
              <div
                onClick={() => setLightboxImage(galleryList[0])}
                className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md cursor-pointer group border border-black/5"
              >
                <Image
                  src={galleryList[0]}
                  alt={`${project.title} - Main Image`}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" /> View Fullscreen
                  </span>
                </div>
              </div>
            ) : galleryList.length === 2 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {galleryList.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setLightboxImage(img)}
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} - Image ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-primary" /> View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : galleryList.length === 3 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div
                  onClick={() => setLightboxImage(galleryList[0])}
                  className="md:col-span-2 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5"
                >
                  <Image
                    src={galleryList[0]}
                    alt={`${project.title} - Image 1`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-primary" /> View
                    </span>
                  </div>
                </div>
                <div className="space-y-4 md:space-y-6 flex flex-col justify-between">
                  {galleryList.slice(1, 3).map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightboxImage(img)}
                      className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5 flex-1"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} - Image ${i + 2}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-primary" /> View
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : galleryList.length === 4 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {galleryList.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setLightboxImage(img)}
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} - Image ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-primary" /> View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : galleryList.length === 5 ? (
              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {galleryList.slice(0, 2).map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightboxImage(img)}
                      className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} - Image ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-primary" /> View Fullscreen
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {galleryList.slice(2, 5).map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightboxImage(img)}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} - Image ${i + 3}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-primary" /> View
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* If >= 6 images (e.g. curated reference list) */
              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                  <div
                    onClick={() => setLightboxImage(galleryList[0])}
                    className="md:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5"
                  >
                    <Image
                      src={galleryList[0]}
                      alt={`${project.title} - Image 1`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-primary" /> View
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setLightboxImage(galleryList[1] || galleryList[0])}
                    className="md:col-span-3 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5"
                  >
                    <Image
                      src={galleryList[1] || galleryList[0]}
                      alt={`${project.title} - Image 2`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-primary" /> View
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setLightboxImage(galleryList[2] || galleryList[0])}
                    className="md:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5"
                  >
                    <Image
                      src={galleryList[2] || galleryList[0]}
                      alt={`${project.title} - Image 3`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-primary" /> View
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {galleryList.slice(3, 7).map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightboxImage(img)}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} - Image ${i + 4}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-primary" /> View
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {galleryList.length > 7 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {galleryList.slice(7).map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setLightboxImage(img)}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg cursor-pointer group border border-black/5"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} - Image ${i + 8}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-primary" /> View
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB: OVERVIEW (Default overview contents) */}
        {activeTab === "OVERVIEW" && (
          <div className="space-y-16 py-14">
            {/* Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
                  Project Overview
                </h2>

                <div className="space-y-4 text-[13.5px] leading-[1.8] text-dark-gray">
                  <p>
                    {project.overviewText1 ||
                      project.description ||
                      `This prestigious ${project.category} project located in ${project.location || "Lahore"} represents our commitment to design excellence, functional elegance, and tailored spaces that elevate the everyday living experience.`}
                  </p>
                  <p>
                    {project.overviewText2 ||
                      "Through meticulous space planning, premium materials, and layered lighting schemes, we achieved a seamless connection between aesthetic sophistication and comfortable utility."}
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
                        {project.scopeOfWork ? project.scopeOfWork.join(", ") : "Concept Design, Architecture, Interior, Site Supervision"}
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

              {/* Real Project Images in Overview */}
              <div className="lg:col-span-7 space-y-4">
                <div
                  onClick={() => setLightboxImage(activeOverviewImage)}
                  className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-md cursor-pointer group border border-black/5"
                >
                  <Image
                    src={activeOverviewImage}
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

                {/* Thumbnails of real uploaded images */}
                {galleryList.length > 1 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3">
                    {galleryList.map((img, idx) => {
                      const isSelected = activeOverviewImage === img;
                      return (
                        <div
                          key={idx}
                          onClick={() => setActiveOverviewImage(img)}
                          className={`relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group shadow-xs border transition-all ${
                            isSelected ? "ring-2 ring-primary border-transparent scale-98" : "border-black/10 hover:border-primary/50"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${project.title} thumbnail ${idx + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB: DRAWINGS */}
        {activeTab === "DRAWINGS" && (
          <div className="space-y-10 py-14">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Architectural Drawings & Plans</h2>
              <p className="text-dark-gray/70 text-xs md:text-sm">
                Technical 2D/3D architectural elevations, ground floor blueprints, and spatial section layouts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Ground Floor Architectural Plan",
                  desc: "Zoning, spatial flow, double-height living areas and courtyard integration.",
                  image: galleryList[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
                },
                {
                  title: "First Floor & Master Suite Layout",
                  desc: "Private family lounge, terraces, ensuite bathrooms, and walk-in wardrobe allocations.",
                  image: galleryList[1] || galleryList[0] || "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80",
                },
                {
                  title: "Front & Rear Facade Elevations",
                  desc: "Material treatment, louvre details, dynamic cantilever projections, and glass curtain wall dimensions.",
                  image: galleryList[2] || galleryList[0] || "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1000&q=80",
                },
                {
                  title: "Cross Section & Structural Framing",
                  desc: "Slab heights, RCC column layout, foundation depth, and staircase detailing.",
                  image: galleryList[3] || galleryList[0] || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80",
                },
              ].map((dwg, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group"
                >
                  <div
                    onClick={() => setLightboxImage(dwg.image)}
                    className="relative aspect-[16/10] bg-[#111] overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={dwg.image}
                      alt={dwg.title}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-103 transition-all duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <ZoomIn className="w-3 h-3 text-primary" /> View Drawing
                    </div>
                  </div>
                  <div className="p-5 space-y-1.5">
                    <h4 className="font-bold text-charcoal text-sm">{dwg.title}</h4>
                    <p className="text-dark-gray/70 text-xs leading-relaxed">{dwg.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: SPACES */}
        {activeTab === "SPACES" && (
          <div className="space-y-10 py-14">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Curated Spaces</h2>
              <p className="text-dark-gray/70 text-xs md:text-sm">
                A room-by-room journey through meticulously crafted environments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {galleryList.slice(0, 6).map((img, i) => (
                <div key={i} className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group">
                  <div
                    onClick={() => setLightboxImage(img)}
                    className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} space ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-1">
                    <h4 className="font-bold text-charcoal text-sm">Design Space #{i + 1}</h4>
                    <p className="text-dark-gray/70 text-xs leading-relaxed">
                      Custom tailored spatial detailing and execution for {project.title}.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: MATERIALS & FINISHES */}
        {(activeTab === "MATERIALS & FINISHES" || activeTab === "MATERIALS") && (
          <div className="space-y-10 py-14">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Materials & Finishes</h2>
              <p className="text-dark-gray/70 text-xs md:text-sm">
                Tactile materials carefully selected for durability, sustainability, and sensory beauty.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Italian Calacatta Marble",
                  type: "Countertops & Feature Walls",
                  desc: "Selected for dramatic grey-gold veining and timeless natural sophistication.",
                  image: galleryList[0],
                },
                {
                  name: "Natural European Oak",
                  type: "Flooring & Bespoke Joinery",
                  desc: "Fumed matte finish delivering organic warmth and tactile texture.",
                  image: galleryList[1] || galleryList[0],
                },
                {
                  name: "Matte Black Anodized Metal",
                  type: "Fixtures & Window Mullions",
                  desc: "Precision laser-cut architectural profiles with sleek scratch-resistant coating.",
                  image: galleryList[2] || galleryList[0],
                },
                {
                  name: "Low-E Double Glazed Glass",
                  type: "Facade & Sliding Doors",
                  desc: "Thermal barrier optimizing acoustic silence and energy efficiency.",
                  image: galleryList[3] || galleryList[0],
                },
              ].map((mat, i) => (
                <div key={i} className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group">
                  <div
                    onClick={() => setLightboxImage(mat.image)}
                    className="relative aspect-square overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={mat.image}
                      alt={mat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-primary font-bold text-[10px] uppercase tracking-wider block">
                      {mat.type}
                    </span>
                    <h4 className="font-bold text-charcoal text-sm">{mat.name}</h4>
                    <p className="text-dark-gray/70 text-xs leading-relaxed">{mat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: DESIGN CONCEPT / CONCEPT */}
        {(activeTab === "DESIGN CONCEPT" || activeTab === "CONCEPT") && (
          <div className="space-y-16 py-14">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Design Concept & Philosophy</h2>
              <p className="text-dark-gray/70 text-xs md:text-sm">
                How form, daylight, and materiality converge to create responsive architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-charcoal">Contextual Modernism</h3>
                <p className="text-dark-gray text-xs md:text-sm leading-relaxed">
                  {project.conceptText ||
                    "Our architectural vision for this residence emerged from the dialogue between clean contemporary geometry and local climatic needs. Deep overhangs protect the interior from harsh summer sun while wide apertures invite morning breezes."}
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold text-charcoal text-xs">Passive Solar Design</h5>
                      <p className="text-dark-gray/70 text-[11px]">Building orientation calibrated for winter thermal gain and summer shading.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold text-charcoal text-xs">Fluid Spatial Zoning</h5>
                      <p className="text-dark-gray/70 text-[11px]">Seamless movement from welcoming public reception to intimate family retreats.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold text-charcoal text-xs">Biophilic Integration</h5>
                      <p className="text-dark-gray/70 text-[11px]">Internal pocket gardens and water features bringing tranquility indoors.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setLightboxImage(project.coverImage)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
              >
                <Image
                  src={project.coverImage}
                  alt="Concept Visualization"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Key Features & Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start pt-8 border-t border-[#f0f0f0]">
              <div className="space-y-5">
                <h3 className="text-xl md:text-2xl font-bold text-charcoal">Key Features & Highlights</h3>
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

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Gem, label: "Modern Aesthetics", desc: "Refined materials and geometry" },
                  { icon: Heart, label: "Warm & Inviting", desc: "Cozy spaces with organic warmth" },
                  { icon: LayoutGrid, label: "Functional Layouts", desc: "Optimized spatial circulation" },
                  { icon: Clock, label: "Timeless Details", desc: "Enduring architectural craftsmanship" },
                ].map((pillar, i) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={i} className="bg-[#fafcfa] border border-[#e5ece7] rounded-xl p-4 space-y-2">
                      <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center text-primary">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <h4 className="text-xs font-bold text-charcoal">{pillar.label}</h4>
                      <p className="text-[11px] text-dark-gray/70">{pillar.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5 Value Pillars */}
            <div className="bg-[#0a0f0c] -mx-6 md:-mx-10 px-6 md:px-10 py-12 rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {[
                  { icon: Gem, title: "Refined Luxury", desc: "Premium materials and finishes create a sophisticated ambience." },
                  { icon: Compass, title: "Thoughtful Layout", desc: "Efficient planning ensures seamless flow and maximum space utilization." },
                  { icon: Trees, title: "Natural Elements", desc: "Use of wood, stone and natural textures brings warmth." },
                  { icon: Sliders, title: "Custom Details", desc: "Bespoke furniture and joinery add character." },
                  { icon: Smile, title: "Comfort & Style", desc: "Designed to ensure comfort without compromising on style." },
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
          </div>
        )}

        {/* TAB: MASTERPLAN */}
        {activeTab === "MASTERPLAN" && (
          <div className="space-y-12 py-14">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Masterplan & Spatial Layout</h2>
              <p className="text-dark-gray/70 text-xs md:text-sm">
                Comprehensive zoning, pedestrian circulation, and ecological corridor mapping.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-black/5 cursor-pointer group" onClick={() => setLightboxImage(galleryList[0] || project.coverImage)}>
                <Image src={galleryList[0] || project.coverImage} alt="Masterplan layout" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-primary" /> View Plan
                </div>
              </div>
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-xl font-bold text-charcoal">Masterplan Highlights</h3>
                <div className="space-y-3">
                  {[
                    { label: "Pedestrian Arteries", desc: "Continuous 5.2 km walking and cycling boulevards" },
                    { label: "Public Plazas", desc: "6+ multi-generational civic nodes with shaded pavilions" },
                    { label: "Bio-Swales & Rain Gardens", desc: "Integrated stormwater absorption networks" },
                    { label: "Native Tree Canopies", desc: "Over 10,000 native trees for microclimate regulation" },
                  ].map((item, i) => (
                    <div key={i} className="bg-[#fafcfa] border border-[#e5ece7] p-4 rounded-xl">
                      <h4 className="text-xs font-bold text-charcoal mb-0.5">{item.label}</h4>
                      <p className="text-[11px] text-dark-gray/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: DESIGN FEATURES */}
        {(activeTab === "DESIGN FEATURES" || activeTab === "FEATURES") && (
          <div className="space-y-12 py-14">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Key Design Features</h2>
              <p className="text-dark-gray/70 text-xs md:text-sm">
                Distinctive architectural and landscape interventions tailored for this development.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(project.features || [
                "Continuous green corridor for pedestrians and cyclists",
                "Native and drought-tolerant plantation",
                "Seating areas, plazas and community spaces",
                "Smart lighting and irrigation systems",
                "Stormwater management and bio-swales",
                "Enhanced biodiversity and microclimate",
                "Safe, accessible and inclusive design",
              ]).map((feat, i) => (
                <div key={i} className="bg-white border border-[#e5ece7] rounded-2xl p-6 space-y-3 hover:border-primary/40 transition-colors shadow-2xs">
                  <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-charcoal">{feat}</h4>
                  <p className="text-xs text-dark-gray/70">Engineered with precision for longevity, aesthetic harmony, and environmental resilience.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: IMPACT */}
        {activeTab === "IMPACT" && (
          <div className="space-y-12 py-14">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Environmental & Community Impact</h2>
              <p className="text-dark-gray/70 text-xs md:text-sm">
                Sustainable benchmarks achieved through green infrastructure and ecological restoration.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { value: "10,000+", label: "Trees & Native Shrubs", desc: "Expanding urban forest canopy" },
                { value: "40%", label: "Water Savings", desc: "Smart sensor drip irrigation" },
                { value: "5.2 KM", label: "Car-Free Corridor", desc: "Promoting pedestrian health" },
                { value: "100%", label: "LED Solar Lighting", desc: "Zero-carbon night illumination" },
              ].map((m, i) => (
                <div key={i} className="bg-[#0a0f0c] text-white p-8 rounded-2xl border border-white/10 space-y-2">
                  <div className="text-primary font-extrabold text-3xl">{m.value}</div>
                  <div className="text-sm font-bold">{m.label}</div>
                  <div className="text-white/60 text-xs">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 4. CTA BANNER ──────────────────────────────────────── */}
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
                  Let&apos;s create a home that reflects your lifestyle and aspirations.
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

      {/* ── 5. LIGHTBOX MODAL ──────────────────────────────────── */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
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
