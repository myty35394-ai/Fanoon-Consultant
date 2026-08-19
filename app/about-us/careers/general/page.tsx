import React, { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { 
  TrendingUp, 
  Users, 
  Users2, 
  Sprout, 
  Mail,
  Loader2
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import GeneralApplicationForm from "@/components/careers/GeneralApplicationForm";

export const metadata: Metadata = {
  title: "Send General Application | Fanoon Consultants",
  description: "Don't see a role that fits? Send us your details and portfolio – we'd love to hear from you.",
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

export default function GeneralApplicationPage() {
  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section className="bg-[#0a0f0c] relative overflow-hidden min-h-[600px] flex flex-col justify-center pt-32 pb-16">
        
        {/* Background Image on Right */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[65%] z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Modern Architecture Night View"
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
                { label: "Send General Application" },
              ]}
              className="mb-10"
            />

            <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-4 block">
              JOIN OUR TEAM
            </span>
            
            <h1 className="text-white font-bold leading-[1.1] mb-6" style={{ fontSize: "clamp(44px, 5vw, 64px)" }}>
              Send General<br />Application<span className="text-primary">.</span>
            </h1>

            <div className="w-10 h-[2px] bg-primary mb-6" />

            <p className="text-white/60 text-[15px] leading-[1.8] mb-12 max-w-[480px]">
              Don&apos;t see a role that fits? We&apos;re always looking for talented individuals who share our passion for design, innovation and excellence. Send us your details and portfolio – we&apos;d love to hear from you.
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
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
            
            {/* Left Sidebar (4/12) */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="text-charcoal font-bold text-[32px] leading-[1.2] mb-6">
                We Welcome<br />Great Minds<span className="text-primary">.</span>
              </h2>
              <div className="w-8 h-[2px] bg-primary mb-8" />
              <p className="text-dark-gray/80 text-[14px] leading-[1.8] mb-12">
                At Fanoon Consultants, great opportunities are created by great people. If you&apos;re passionate about design and want to be part of a collaborative and forward-thinking team, we encourage you to introduce yourself.
              </p>

              {/* 4 Features List */}
              <div className="space-y-8 mb-12">
                
                <div className="flex gap-5">
                  <div className="w-8 h-8 rounded-full bg-[#169B62]/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Be Yourself</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">
                      We value individuality and diverse perspectives.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-8 h-8 rounded-full bg-[#169B62]/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <Users className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Share Your Work</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">
                      Showcase your skills and achievements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-8 h-8 rounded-full bg-[#169B62]/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <Users2 className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Make an Impact</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">
                      Contribute to meaningful projects that shape spaces and communities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-8 h-8 rounded-full bg-[#169B62]/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <Sprout className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-charcoal font-bold text-[14px] mb-1">Grow With Us</h3>
                    <p className="text-dark-gray/70 text-[12.5px] leading-[1.6]">
                      Learn, evolve and build a rewarding career journey.
                    </p>
                  </div>
                </div>

              </div>

              {/* Prefer to email us directly? Card */}
              <div className="bg-[#f2f9f5] border border-[#e2efe7] rounded-[6px] p-6">
                <div className="w-10 h-10 rounded-full bg-[#169B62]/10 flex items-center justify-center text-primary mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-charcoal font-bold text-[15px] mb-1">Prefer to email us directly?</h4>
                <p className="text-dark-gray/80 text-[13px] mb-3">
                  Send your CV and portfolio to
                </p>
                <a 
                  href="mailto:careers@fanoonconsultants.com" 
                  className="text-primary font-medium text-[13px] hover:underline block"
                >
                  careers@fanoonconsultants.com
                </a>
              </div>

            </div>

            {/* Right Form Card (8/12) */}
            <div className="lg:col-span-8">
              <Suspense
                fallback={
                  <div className="bg-white p-12 rounded-[8px] border border-[#eaeaea] flex items-center justify-center min-h-[400px]">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                }
              >
                <GeneralApplicationForm />
              </Suspense>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
