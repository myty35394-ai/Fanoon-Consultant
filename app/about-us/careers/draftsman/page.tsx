import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Crosshair, 
  GraduationCap, 
  Users, 
  BarChart2, 
  Mail
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JobApplicationForm from "@/components/careers/JobApplicationForm";

export const metadata: Metadata = {
  title: "Draftsman Application | Fanoon Consultants",
  description: "Apply for the Draftsman position at Fanoon Consultants.",
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
  "AutoCAD", "Revit", "SketchUp", "3ds Max", "ArchiCAD", "Other"
];

export default function DraftsmanApplicationPage() {
  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section className="bg-[#0a0f0c] relative overflow-hidden min-h-[600px] flex flex-col justify-center pt-32 pb-16">
        
        {/* Background Image on Right */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[65%] z-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt="Architectural Drafting Workspace"
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
                { label: "Draftsman Application" },
              ]}
              className="mb-10"
            />

            <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-4 block">
              DRAFTSMAN APPLICATION
            </span>
            
            <h1 className="text-white font-bold leading-[1.1] mb-6" style={{ fontSize: "clamp(44px, 5vw, 64px)" }}>
              Precision Today.<br />Perfect Tomorrow<span className="text-primary">.</span>
            </h1>

            <div className="w-10 h-[2px] bg-primary mb-6" />

            <p className="text-white/60 text-[15px] leading-[1.8] mb-12 max-w-[480px]">
              We are looking for skilled draftsmen who pay attention to detail, follow standards and turn ideas into accurate drawings. Join us and be part of a team that builds with precision and purpose.
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
                Great Drawings<br />Build Great Projects.
              </h2>
              <div className="w-8 h-[2px] bg-primary mb-8" />
              <p className="text-dark-gray/80 text-[14px] leading-[1.8] mb-12">
                At Fanoon Consultants, our draftsmen ensure that every line is accurate, every detail is clear, and every drawing meets the highest standards of quality and coordination.
              </p>

              {/* Features List */}
              <div className="space-y-8 mb-12">
                <div className="flex gap-5">
                  <Crosshair className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Accuracy & Detail</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">We value precision and attention to every detail.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <GraduationCap className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Professional Growth</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">Work on diverse projects and upgrade your drafting skills.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Users className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Supportive Team</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">Collaborate with experienced architects and designers.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <BarChart2 className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Career Opportunities</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">Grow your career with continuous learning and development.</p>
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
                role="Draftsman"
                formTitle="Draftsman Application Form"
                specializationLabel="Drafting Specialization"
                specializationOptions={[
                  { value: "architectural", label: "Architectural Drafting" },
                  { value: "structural", label: "Structural Drafting" },
                  { value: "mep", label: "MEP (Mechanical / Electrical / Plumbing)" },
                  { value: "civil", label: "Civil & Site Plans" },
                  { value: "interior", label: "Interior Design Drafting" },
                ]}
                qualificationOptions={[
                  { value: "diploma", label: "Diploma in Drafting / CAD Technology" },
                  { value: "dae", label: "DAE (Civil / Architecture)" },
                  { value: "bachelors", label: "Bachelor's Degree" },
                  { value: "other", label: "Other" },
                ]}
                softwareList={["AutoCAD", "Revit", "SketchUp", "SolidWorks", "ArchiCAD", "Other"]}
                departmentOptions={[
                  { value: "architecture", label: "Architecture" },
                  { value: "engineering", label: "Structural Engineering" },
                  { value: "interior", label: "Interior Design" },
                  { value: "mep", label: "MEP Engineering" },
                ]}
              />
            </div>

          </div>

        </div>
      </section>

    </>
  );
}
