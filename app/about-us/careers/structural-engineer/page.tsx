import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Users, 
  BarChart2, 
  Mail
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JobApplicationForm from "@/components/careers/JobApplicationForm";

export const metadata: Metadata = {
  title: "Structural Engineer Application | Fanoon Consultants",
  description: "Apply for the Structural Engineer position at Fanoon Consultants.",
};

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

// Form Label Component
const FormLabel = ({ children, required = false }: { children: React.ReactNode, required?: boolean }) => (
  <label className="block text-[12px] font-bold text-charcoal mb-2">
    {children} {required && <span className="text-[#d32f2f]">*</span>}
  </label>
);

// Form Input Wrapper Styling
const inputClasses = "w-full border border-[#eaeaea] rounded-[4px] px-4 py-3 text-[13px] text-charcoal focus:outline-none focus:border-primary transition-colors bg-white";
const selectClasses = "w-full border border-[#eaeaea] rounded-[4px] px-4 py-3 text-[13px] text-dark-gray focus:outline-none focus:border-primary transition-colors bg-white appearance-none";

const softwareList = [
  "ETABS", "SAFE", "STAAD.Pro", "SAP2000", 
  "Tekla Structures", "Revit Structure", "AutoCAD", 
  "RAM Connection", "CSi Bridge", "Microsoft Excel", "Other"
];

export default function StructuralEngineerApplicationPage() {
  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section className="bg-[#0a0f0c] relative overflow-hidden min-h-[600px] flex flex-col justify-center pt-32 pb-16">
        
        {/* Background Image on Right */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[65%] z-0">
          <Image
            src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1920&q=80"
            alt="Structural Engineering Construction"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Sharper gradient fade from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0c] via-[#0a0f0c] via-30% to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 flex items-center">
          
          <div className="max-w-[560px] relative">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about-us" },
                { label: "Join Our Team", href: "/about-us/careers" },
                { label: "Structural Engineer Application" },
              ]}
              className="mb-10"
            />

            <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-4 block">
              STRUCTURAL ENGINEER APPLICATION
            </span>
            
            <h1 className="text-white font-bold leading-[1.1] mb-6" style={{ fontSize: "clamp(44px, 5vw, 64px)" }}>
              Strong Structures.<br />Stronger Futures<span className="text-primary">.</span>
            </h1>

            <div className="w-10 h-[2px] bg-primary mb-6" />

            <p className="text-white/60 text-[15px] leading-[1.8] mb-12 max-w-[480px]">
              We are looking for skilled structural engineers who can design safe, efficient and innovative structures. Share your portfolio with us and help build stronger communities.
            </p>

            {/* Custom Graphic overlapping right side */}
            <div className="hidden lg:block absolute top-[40%] -translate-y-1/2 -right-[340px] opacity-90 pointer-events-none">
              <HeroGraphic className="w-[380px] h-[380px]" />
            </div>
          </div>
          
        </div>
      </section>

      {/* ── 2. MAIN CONTENT (Split Layout) ───────────────────────── */}
      <section className="bg-[#fcfcfc] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-start">
            
            {/* Left Sidebar (4/12) */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="text-charcoal font-bold text-[32px] leading-[1.2] mb-6">
                Engineering Tomorrow.<br />Building With Strength.
              </h2>
              <div className="w-8 h-[2px] bg-primary mb-8" />
              <p className="text-dark-gray/80 text-[14px] leading-[1.8] mb-12">
                At Fanoon Consultants, our structural engineers play a critical role in delivering safe, sustainable and high-performance structures that stand the test of time.
              </p>

              {/* Features List */}
              <div className="space-y-8 mb-12">
                <div className="flex gap-5">
                  <ShieldCheck className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Safety First</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">We prioritize safety and reliability in every structural solution.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Building2 className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Innovative Design</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">We use smart engineering and modern tools to create better structures.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Users className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Collaborative Environment</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">Work with architects, designers and specialists on diverse projects.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <BarChart2 className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Career Growth</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">Continuous learning and exposure to challenging projects.</p>
                  </div>
                </div>
              </div>

              {/* Have Questions Box */}
              <div className="bg-[#f2f9f5] rounded-[6px] p-6">
                <div className="w-10 h-10 rounded-full bg-[#169B62]/10 flex items-center justify-center text-primary mb-5">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-charcoal font-bold text-[15px] mb-2">Have Questions?</h4>
                <p className="text-dark-gray/80 text-[13px] mb-4">
                  Our HR team is here to help.
                </p>
                <a href="mailto:careers@fanoonconsultants.com" className="text-primary font-medium text-[13px] hover:underline">
                  careers@fanoonconsultants.com
                </a>
              </div>
            </div>

            {/* Right Form Card (8/12) */}
            <div className="lg:col-span-8">
              <JobApplicationForm
                role="Structural Engineer"
                formTitle="Structural Engineer Application Form"
                registrationLabel="PEC Registration Number"
                registrationPlaceholder="Enter your PEC registration number"
                affiliationsLabel="Professional Affiliations"
                affiliationsPlaceholder="e.g. ACE, IStructE, ASCE, etc."
                specializationLabel="Structural Engineering Specialization"
                specializationOptions={[
                  { value: "rcc", label: "Reinforced Concrete Structures (RCC)" },
                  { value: "steel", label: "Steel Structures & PEB" },
                  { value: "highrise", label: "High-Rise & Commercial Buildings" },
                  { value: "bridges", label: "Bridges & Infrastructure" },
                  { value: "retrofitting", label: "Seismic Design & Structural Retrofitting" },
                ]}
                qualificationOptions={[
                  { value: "bsc_civil", label: "B.Sc Civil Engineering / Structural" },
                  { value: "msc_structural", label: "M.Sc Structural Engineering" },
                  { value: "phd", label: "Ph.D in Structural Engineering" },
                  { value: "other", label: "Other" },
                ]}
                softwareList={["ETABS", "SAP2000", "SAFE", "Staad.Pro", "CSI Bridge", "AutoCAD", "Revit Structure", "TEKLA", "Prokon", "Robot Structural", "MATLAB", "Other"]}
                departmentOptions={[
                  { value: "engineering", label: "Structural Engineering" },
                  { value: "architecture", label: "Architecture & Engineering" },
                  { value: "supervision", label: "Site & Construction Supervision" },
                ]}
              />
            </div>

          </div>

        </div>
      </section>

    </>
  );
}

