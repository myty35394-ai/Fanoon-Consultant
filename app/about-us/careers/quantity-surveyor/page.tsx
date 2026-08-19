import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Calculator, 
  FileCheck, 
  TrendingUp, 
  Users, 
  Sprout, 
  Mail
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JobApplicationForm from "@/components/careers/JobApplicationForm";

export const metadata: Metadata = {
  title: "Quantity Surveyor / Cost Estimator Application | Fanoon Consultants",
  description: "Apply for the Quantity Surveyor / Cost Estimator position at Fanoon Consultants.",
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
  "MS Excel", "CostX", "Planswift", "Bluebeam Revu", 
  "Primavera P6", "MS Project", "AutoCAD", "Revit (Quantification)", 
  "CUBICOST", "Buildertrend", "Sage 300", "Other"
];

export default function QuantitySurveyorApplicationPage() {
  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section className="bg-[#0a0f0c] relative overflow-hidden min-h-[600px] flex flex-col justify-center pt-32 pb-16">
        
        {/* Background Image on Right */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[65%] z-0">
          <Image
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80"
            alt="Cost Estimation and Quantity Surveying"
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
                { label: "Quantity Surveyor/Cost Estimator Application" },
              ]}
              className="mb-10"
            />

            <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-4 block">
              QUANTITY SURVEYOR / COST ESTIMATOR APPLICATION
            </span>
            
            <h1 className="text-white font-bold leading-[1.1] mb-6" style={{ fontSize: "clamp(44px, 5vw, 64px)" }}>
              Accurate Estimates.<br />Stronger Decisions<span className="text-primary">.</span>
            </h1>

            <div className="w-10 h-[2px] bg-primary mb-6" />

            <p className="text-white/60 text-[15px] leading-[1.8] mb-12 max-w-[480px]">
              We are looking for detail-oriented quantity surveyors and cost estimators who can turn numbers into value and help deliver projects with precision, transparency and profitability.
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
                Numbers You Trust.<br />Value We Deliver.
              </h2>
              <div className="w-8 h-[2px] bg-primary mb-8" />
              <p className="text-dark-gray/80 text-[14px] leading-[1.8] mb-12">
                Our QS & cost estimators play a vital role in planning, estimating, tendering and cost control to ensure successful project delivery.
              </p>

              {/* Features List */}
              <div className="space-y-8 mb-12">
                <div className="flex gap-5">
                  <Calculator className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Cost Accuracy</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">We ensure precise estimates and transparent cost planning.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <FileCheck className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Value Engineering</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">Smart suggestions that optimize cost without compromising quality.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <TrendingUp className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Budget Control</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">Effective cost monitoring and reporting at every project stage.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Users className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Collaborative Approach</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">Work closely with design and construction teams for best results.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Sprout className="w-7 h-7 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Career Growth</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">Continuous learning, mentorship and exposure to diverse projects.</p>
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
                role="Quantity Surveyor / Cost Estimator"
                formTitle="Quantity Surveyor / Cost Estimator Application Form"
                registrationLabel="AIQS / RICS Membership Number"
                registrationPlaceholder="Enter your membership number (if any)"
                affiliationsLabel="Professional Affiliations"
                affiliationsPlaceholder="e.g. AIQS, RICS, PAQS, etc."
                specializationLabel="QS Specialization"
                specializationOptions={[
                  { value: "cost_planning", label: "Cost Planning & Estimation" },
                  { value: "bills", label: "Bills of Quantities (BOQ) Preparation" },
                  { value: "contract", label: "Contract Administration & Procurement" },
                  { value: "commercial", label: "Commercial & Value Engineering" },
                  { value: "claims", label: "Claims & Dispute Resolution" },
                ]}
                qualificationOptions={[
                  { value: "bsc_qs", label: "B.Sc Quantity Surveying / Cost Management" },
                  { value: "msc_qs", label: "M.Sc Quantity Surveying" },
                  { value: "bsc_civil", label: "B.Sc Civil Engineering" },
                  { value: "diploma", label: "Diploma in Construction Cost Management" },
                  { value: "other", label: "Other" },
                ]}
                softwareList={["CostX", "Candy / IRM", "MS Excel (Advanced)", "Primavera P6", "AutoCAD", "Revit (BIM QS)", "Buildsoft", "RIB iTWO", "PlanSwift", "BlueBeam", "Other"]}
                departmentOptions={[
                  { value: "qs", label: "Quantity Surveying & Cost Control" },
                  { value: "procurement", label: "Procurement & Contracts" },
                  { value: "project", label: "Project Management" },
                  { value: "engineering", label: "Engineering" },
                ]}
              />
            </div>

          </div>

        </div>
      </section>

    </>
  );
}
