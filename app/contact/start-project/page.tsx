import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  MessageSquare, 
  ClipboardCheck, 
  Users, 
  FileEdit, 
  Target,
  Clock,
  MessageCircle,
  FileText,
  Rocket,
  Phone,
  Mail,
  UploadCloud
} from "lucide-react";
import StartProjectForm from "@/components/contact/StartProjectForm";

export const metadata: Metadata = {
  title: "Start A Project | Fanoon Consultants",
  description: "Tell us about your project and our team will guide you through the next steps to bring your vision to life.",
};

const STEPS = [
  {
    id: 1,
    title: "Tell Us",
    description: "Share your ideas, requirements and project details.",
    icon: MessageSquare,
  },
  {
    id: 2,
    title: "We Review",
    description: "Our team reviews your information carefully.",
    icon: ClipboardCheck,
  },
  {
    id: 3,
    title: "We Connect",
    description: "We get in touch to discuss your project in detail.",
    icon: Users,
  },
  {
    id: 4,
    title: "Proposal",
    description: "We create a tailored proposal that fits your goals.",
    icon: FileEdit,
  },
  {
    id: 5,
    title: "Let's Build",
    description: "Once approved, we begin turning your vision into reality.",
    icon: Target,
  },
];

export default function StartProjectPage() {
  return (
    <>
      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ paddingTop: 0 }}>
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=90"
            alt="Modern luxury house at night"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Dark gradient: opaque black on left → transparent on right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(10,13,10,0.98) 0%, rgba(10,13,10,0.92) 35%, rgba(10,13,10,0.7) 55%, rgba(10,13,10,0.2) 75%, rgba(10,13,10,0) 100%)",
            }}
          />
          {/* Bottom shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0d0a] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Breadcrumb */}
          <div className="pt-28 pb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] font-medium">
              <Link href="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-primary" strokeWidth={3} />
              <Link href="/contact" className="text-white/60 hover:text-white transition-colors">Contact</Link>
              <ChevronRight className="w-3 h-3 text-primary" strokeWidth={3} />
              <span className="text-primary font-semibold">Start A Project</span>
            </nav>
          </div>

          {/* Hero text */}
          <div className="pb-16 lg:pb-24" style={{ maxWidth: "600px" }}>
            <span className="text-[11px] font-bold tracking-[0.3em] text-primary uppercase mb-4 block">
              START A PROJECT
            </span>
            <h1
              className="text-white font-extrabold leading-[1.12] tracking-tight mb-5"
              style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.01em" }}
            >
              Great Projects Begin<br />
              With a Great Conversation<span className="text-primary">.</span>
            </h1>
            {/* Short green rule */}
            <div className="w-10 h-[3px] bg-primary rounded-sm mb-6" />
            <p className="text-white/80 text-[15px] leading-[1.8] max-w-md">
              Tell us about your project and our team will guide you<br />
              through the next steps to bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* ── TIMELINE STRIP ─────────────────────────────────── */}
      <section className="bg-white border-b border-[#ececec] py-10 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="relative">
            {/* Connecting dotted line (visible on lg+) */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#e0e0e0] z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              {STEPS.map((step) => (
                <div key={step.id} className="flex flex-col items-center lg:items-start bg-white lg:pr-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 flex-shrink-0">
                      <step.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <span className="text-primary font-bold text-[32px] leading-none opacity-80">
                      {step.id}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-bold text-charcoal mb-2">{step.title}</h3>
                  <p className="text-[12.5px] text-dark-gray leading-[1.6] text-center lg:text-left">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM SECTION ───────────────────────────────────── */}
      <section className="bg-[#fafafa] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

            {/* Left: Form Container */}
            <div className="w-full lg:w-[65%]">
              <div className="bg-white rounded-xl border border-[#ececec] shadow-sm p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="text-[24px] font-bold text-charcoal mb-2">Project Information</h2>
                  <p className="text-[14px] text-dark-gray">
                    Please fill out the form below and we&apos;ll get back to you promptly.
                  </p>
                </div>

                <StartProjectForm />
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="w-full lg:w-[35%]">
              <div className="bg-[#f7f9f8] rounded-xl border border-[#ececec] p-8 md:p-10 sticky top-28">
                <h3 className="text-[20px] font-bold text-charcoal mb-8">What Happens Next?</h3>
                
                <div className="space-y-8 mb-10">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#e0e0e0] flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                      <Clock className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-charcoal mb-1">Quick Response</h4>
                      <p className="text-[12.5px] text-dark-gray leading-[1.6]">We&apos;ll contact you within 24 hours.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#e0e0e0] flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                      <MessageCircle className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-charcoal mb-1">Project Discussion</h4>
                      <p className="text-[12.5px] text-dark-gray leading-[1.6]">We&apos;ll understand your vision and requirements in detail.</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#e0e0e0] flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                      <FileText className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-charcoal mb-1">Transparent Proposal</h4>
                      <p className="text-[12.5px] text-dark-gray leading-[1.6]">You&apos;ll receive a customized proposal with scope, timeline and fees.</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#e0e0e0] flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                      <Rocket className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-charcoal mb-1">Project Kickoff</h4>
                      <p className="text-[12.5px] text-dark-gray leading-[1.6]">Once we&apos;re aligned, our team gets to work on your project.</p>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-[#e0e0e0] mb-8"></div>

                <div className="space-y-4">
                  <h4 className="text-[14px] font-bold text-primary">Need Immediate Assistance?</h4>
                  <p className="text-[13px] text-dark-gray">Call us directly or email us, we&apos;re here to help.</p>
                  
                  <div className="space-y-3 mt-4">
                    <a href="tel:+923189944488" className="flex items-center gap-3 text-[14px] font-medium text-charcoal hover:text-primary transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                      +92 318 9944488
                    </a>
                    <a href="mailto:fanoonconsultants9@gmail.com" className="flex items-center gap-3 text-[14px] font-medium text-charcoal hover:text-primary transition-colors break-all">
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      fanoonconsultants9@gmail.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
