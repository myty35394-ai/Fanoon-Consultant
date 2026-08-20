import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TermsClient from "./TermsClient";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Terms & Conditions | Fanoon Consultants",
  description:
    "Please read these terms and conditions carefully before using our website or engaging our services. Fanoon Consultants.",
  openGraph: {
    title: "Terms & Conditions | Fanoon Consultants",
    description:
      "Please read these terms and conditions carefully before using our website or engaging our services.",
  },
};

export default async function TermsAndConditionsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* ── 1. HERO SECTION ───────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[#0a0f0c]">
        {/* Full-bleed background photo matching screenshot */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=90"
            alt="Fanoon Consultants Architectural Residence"
            fill
            priority
            className="object-cover object-center opacity-70"
          />
          {/* Dark gradient overlay from left */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(10,15,12,0.98) 0%, rgba(10,15,12,0.92) 35%, rgba(10,15,12,0.70) 55%, rgba(10,15,12,0.25) 75%, rgba(10,15,12,0) 100%)",
            }}
          />
          {/* Bottom shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0f0c]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="pt-32 pb-20 lg:pb-24" style={{ maxWidth: "620px" }}>
            <span className="text-[11px] font-bold tracking-[0.3em] text-primary uppercase mb-4 block">
              TERMS &amp; CONDITIONS
            </span>
            <h1
              className="text-white font-extrabold leading-[1.12] tracking-tight mb-5"
              style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.01em" }}
            >
              Terms &amp; Conditions<span className="text-primary">.</span>
            </h1>
            {/* Short green rule */}
            <div className="w-10 h-[3px] bg-primary rounded-sm mb-6" />
            <p className="text-white/80 text-[14.5px] leading-[1.8] max-w-lg">
              Please read these terms and conditions carefully before using our website or engaging our services.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. BREADCRUMB ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[#ececec]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] font-medium">
            <Link href="/" className="text-dark-gray/70 hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-dark-gray/40" />
            <span className="text-primary font-semibold">Terms &amp; Conditions</span>
          </nav>
        </div>
      </section>

      {/* ── 3. MAIN CONTENT (Two-Column Layout) ───────────────── */}
      <main className="bg-[#fafafa] py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <TermsClient settings={settings} />
        </div>
      </main>
    </>
  );
}
