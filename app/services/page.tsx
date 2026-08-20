import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2, Sofa, Trees, Box, ClipboardList, HardHat,
  Users, FileText, Share2, CheckCircle2, ArrowRight,
  Eye, PenTool, Headphones,
} from "lucide-react";

import Stepper from "@/components/ui/Stepper";
import ServiceDetailCard from "@/components/ui/ServiceDetailCard";
import InlineCtaCard from "@/components/ui/InlineCtaCard";
import CtaBanner from "@/components/shared/CtaBanner";

export const metadata: Metadata = {
  title: "Our Services | Fanoon Consultants",
  description:
    "Explore Fanoon Consultants' full range of services: Architectural Design, Interior Design, Landscape Design, 3D Visualization, Project Management, and Construction Supervision.",
};

/* ─── Data ────────────────────────────────────────────────────── */

const services = [
  {
    index: 1,
    title: "Architecture Design",
    description:
      "Innovative architectural solutions that balance aesthetics, functionality, and sustainability while reflecting your vision and context.",
    icon: <Building2 />,
    imageUrl:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    href: "/services/architecture-design",
  },
  {
    index: 2,
    title: "Interior Design",
    description:
      "Creating elegant and functional interiors that enhance user experience and bring spaces to life with creativity and detail.",
    icon: <Sofa />,
    imageUrl:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    href: "/services/interior-design",
  },
  {
    index: 3,
    title: "Landscape Design",
    description:
      "Designing outdoor spaces that connect nature and architecture for a sustainable and beautiful environment.",
    icon: <Trees />,
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    href: "/services/landscape-design",
  },
  {
    index: 4,
    title: "3D Visualization",
    description:
      "High-quality 3D renders and animations that help you visualize your project before it is built.",
    icon: <Box />,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    href: "/services/3d-visualization",
  },
  {
    index: 5,
    title: "Project Management",
    description:
      "Efficient planning, coordination, and management to ensure projects are delivered on time, within scope and budget.",
    icon: <ClipboardList />,
    imageUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    href: "/services/project-management",
  },
  {
    index: 6,
    title: "Construction Supervision",
    description:
      "Professional site supervision ensuring quality, safety, and compliance at every stage of construction.",
    icon: <HardHat />,
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    href: "/services/construction-supervision",
  },
];

const approachSteps = [
  {
    label: "Understand",
    description: "We listen and understand your goals",
    icon: <Users />,
  },
  {
    label: "Plan",
    description: "We analyse, plan and strategise",
    icon: <FileText />,
  },
  {
    label: "Design",
    description: "We design with creativity and precision",
    icon: <PenTool />,
  },
  {
    label: "Coordinate",
    description: "We coordinate all aspects seamlessly",
    icon: <Share2 />,
  },
  {
    label: "Deliver",
    description: "We deliver quality results on time",
    icon: <HardHat />,
  },
  {
    label: "Support",
    description: "We provide ongoing support",
    icon: <Headphones />,
  },
];

const whyList = [
  "Client-focused approach",
  "Innovative and sustainable solutions",
  "Attention to detail",
  "On-time, on-budget delivery",
  "Quality and integrity at every stage",
];

/* ─── Page ────────────────────────────────────────────────────── */

export default function ServicesPage() {
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
                ],
              },
              ...services.map((s) => ({
                "@type": "Service",
                name: s.title,
                provider: { "@type": "Organization", name: "Fanoon Consultants" },
                description: s.description,
              })),
            ],
          }),
        }}
      />

      {/* ── 1. Hero ──────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-start bg-[#080c0a]"
        style={{ minHeight: "50vh" }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1920&q=80"
            alt="Fanoon Consultants Services"
            fill
            className="object-cover object-center"
            style={{ opacity: 0.5 }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(4,8,6,0.92) 0%, rgba(4,8,6,0.72) 50%, rgba(4,8,6,0.40) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#040806]/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-20">
          <div style={{ maxWidth: "560px" }}>
            <span
              className="block font-bold uppercase tracking-[0.35em] text-primary mb-5"
              style={{ fontSize: "11px" }}
            >
              OUR SERVICES
            </span>
            <h1
              className="text-white font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              Comprehensive Solutions<span className="text-primary">.</span>
              <br />
              Exceptional Results<span className="text-primary">.</span>
            </h1>
            <p
              className="text-white/85 leading-relaxed"
              style={{ fontSize: "14px", maxWidth: "480px" }}
            >
              From initial concept to final delivery, we provide end-to-end design
              and project management tailored to your needs — ensuring quality,
              efficiency, and excellence at every stage.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Services Intro ────────────────────────────────── */}
      <section className="bg-white pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <span
            className="block font-bold uppercase tracking-[0.35em] text-primary mb-5"
            style={{ fontSize: "11px" }}
          >
            WHAT WE DO
          </span>
          <h2
            className="font-bold text-charcoal mb-5 leading-tight"
            style={{ fontSize: "clamp(30px, 4vw, 46px)" }}
          >
            Services That Add Value<br />
            At Every Stage.
          </h2>
          <p
            className="text-dark-gray leading-relaxed mx-auto"
            style={{ fontSize: "14px", opacity: 0.68, maxWidth: "580px" }}
          >
            We combine creativity, technical expertise and industry knowledge to deliver
            solutions that are functional, aesthetic and sustainable.
          </p>
        </div>
      </section>

      {/* ── 3. Services Grid ─────────────────────────────────── */}
      <section className="bg-white pt-8 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((svc) => (
              <ServiceDetailCard
                key={svc.index}
                index={svc.index}
                title={svc.title}
                description={svc.description}
                icon={svc.icon}
                imageUrl={svc.imageUrl}
                href={svc.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Our Approach ──────────────────────────────────── */}
      <section style={{ background: '#0c0f0d' }} className="py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="text-center mb-20">
            <span
              className="block font-bold uppercase tracking-[0.35em] text-primary mb-5"
              style={{ fontSize: "11px" }}
            >
              OUR APPROACH
            </span>
            <h2
              className="font-bold text-white"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
            >
              Integrated Expertise. Seamless Delivery<span className="text-primary">.</span>
            </h2>
          </div>

          <Stepper
            variant="rail"
            connector="dotted"
            showNumbers={false}
            steps={approachSteps.map((s) => ({
              label: s.label,
              description: s.description,
            }))}
            activeStep={0}
            icons={approachSteps.map((s) => s.icon)}
            className="mb-12"
          />
        </div>
      </section>

      {/* ── 5. Why Choose Us + Inline CTA ────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row gap-10 items-stretch">

            {/* Left: text + checklist (~50%) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <span
                className="block font-bold uppercase tracking-[0.35em] text-primary mb-4"
                style={{ fontSize: "11px" }}
              >
                WHY CHOOSE US
              </span>
              <h2
                className="font-bold text-charcoal mb-6 leading-tight"
                style={{ fontSize: "clamp(26px, 3vw, 38px)" }}
              >
                Design Excellence You Can Count On<span className="text-primary">.</span>
              </h2>
              <p
                className="text-dark-gray leading-relaxed mb-8"
                style={{ fontSize: "14px", opacity: 0.72, maxWidth: "420px" }}
              >
                Our multidisciplinary team brings passion, precision, and
                professionalism to every project — from first sketch to final
                handover.
              </p>
              <ul className="space-y-4">
                {whyList.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <CheckCircle2
                      className="w-5 h-5 text-primary/80 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span
                      className="text-[13.5px] font-medium text-dark-gray"
                      style={{ opacity: 0.8 }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: tall photo (~50%) */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-full min-h-[380px] rounded-[16px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Fanoon Consultants Interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. Footer will follow (provided by layout) ───────────────────────────── */}
    </>
  );
}
