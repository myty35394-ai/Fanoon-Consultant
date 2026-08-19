import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Building2, 
  Lightbulb, 
  Leaf, 
  Users,
  Mail
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JobApplicationForm from "@/components/careers/JobApplicationForm";

export const metadata: Metadata = {
  title: "Architect Application | Fanoon Consultants",
  description: "Apply for the Architect position at Fanoon Consultants.",
};

// Hero Specific Graphic (Reused from Careers page)
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

export default function ArchitectApplicationPage() {
  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section className="bg-[#0a0f0c] relative overflow-hidden min-h-[600px] flex flex-col justify-center pt-32 pb-16">
        
        {/* Background Image on Right */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[65%] z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Modern Architecture"
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
                { label: "Architect Application" },
              ]}
              className="mb-10"
            />

            <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-4 block">
              ARCHITECT APPLICATION
            </span>
            
            <h1 className="text-white font-bold leading-[1.1] mb-6" style={{ fontSize: "clamp(44px, 5vw, 64px)" }}>
              Architects Shape<br />The Future<span className="text-primary">.</span>
            </h1>

            <div className="w-10 h-[2px] bg-primary mb-6" />

            <p className="text-white/60 text-[15px] leading-[1.8] mb-12 max-w-[480px]">
              We are always looking for passionate architects who are driven by design excellence, innovation and a desire to create meaningful spaces. Share your portfolio with us and become part of a studio where your ideas can grow.
            </p>

            {/* Custom Graphic overlapping right side */}
            <div className="hidden lg:block absolute top-[40%] -translate-y-1/2 -right-[340px] opacity-90 mix-blend-screen pointer-events-none">
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
                We Believe In<br />Design Excellence.
              </h2>
              <div className="w-8 h-[2px] bg-primary mb-8" />
              <p className="text-dark-gray/80 text-[14px] leading-[1.8] mb-12">
                At Fanoon Consultants, architects are not just team members &ndash; they are visionaries, creators and problem solvers. If you are passionate about architecture and want to make an impact, we would love to hear from you.
              </p>

              {/* Features List */}
              <div className="space-y-8 mb-12">
                <div className="flex gap-5">
                  <Users className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Growth & Mentorship</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">Learn, grow and collaborate with experienced professionals.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Building2 className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Diverse Projects</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">Work on residential, commercial, institutional and urban projects.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Lightbulb className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Creative Freedom</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">Your ideas matter here. We value creativity and innovation.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Leaf className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Sustainable Future</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">Be part of a team that designs responsibly for a better future.</p>
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
                  Feel free to reach out to our HR team.
                </p>
                <a href="mailto:careers@fanoonconsultants.com" className="text-primary font-medium text-[13px] hover:underline">
                  careers@fanoonconsultants.com
                </a>
              </div>
            </div>

            {/* Right Form Card (8/12) */}
            <div className="lg:col-span-8">
              <JobApplicationForm
                role="Architect"
                formTitle="Architect Application Form"
                registrationLabel="Registration Number (PCATP/COA)"
                registrationPlaceholder="Enter your registration number"
                specializationLabel="Area of Expertise"
                specializationOptions={[
                  { value: "residential", label: "Residential" },
                  { value: "commercial", label: "Commercial" },
                  { value: "institutional", label: "Institutional" },
                  { value: "urban", label: "Urban Design" },
                ]}
                qualificationOptions={[
                  { value: "barch", label: "B.Arch" },
                  { value: "march", label: "M.Arch" },
                  { value: "bs", label: "BS Architecture" },
                  { value: "other", label: "Other" },
                ]}
                softwareList={["AutoCAD", "Revit", "Rhino", "SketchUp", "3ds Max", "Lumion", "Photoshop", "V-Ray", "Other"]}
                departmentOptions={[
                  { value: "architecture", label: "Architecture" },
                  { value: "interior", label: "Interior Design" },
                  { value: "landscape", label: "Landscape" },
                ]}
              />
            </div>

          </div>

        </div>
      </section>

    </>
  );
}
