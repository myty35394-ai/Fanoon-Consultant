import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Users,
  Building2,
  Trophy,
  Eye,
  Gem,
  Leaf,
  Handshake,
  Lightbulb,
  Search,
  Headset,
  MapPin,
  Medal
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Story | Fanoon Consultants",
  description:
    "Fanoon Consultants was founded on the belief that great design has the power to transform communities and elevate lives. Discover our story.",
};

export default function OurStoryPage() {
  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-[500px] flex items-end bg-charcoal overflow-hidden pt-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Fanoon Consultants Building"
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(4,8,6,0.95) 0%, rgba(4,8,6,0.85) 45%, rgba(4,8,6,0.55) 75%, rgba(4,8,6,0.2) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
          <div style={{ maxWidth: "600px" }}>
            <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-4 block">
              OUR STORY
            </span>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about-us" },
                { label: "Our Story" },
              ]}
              className="mb-8"
            />

            <h1 className="text-white font-bold leading-[1.1] mb-4" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Our Story.
            </h1>
            <h2 className="text-white/90 font-medium leading-[1.3] mb-6" style={{ fontSize: "clamp(18px, 3vw, 24px)" }}>
              Built on Vision. Driven by Purpose.
            </h2>
            
            <p className="text-white/70 leading-[1.8] text-[15px] max-w-[500px]">
              Fanoon Consultants was founded on the belief that great design has the power to transform communities and elevate lives. Our story is one of passion, persistence, and a commitment to delivering excellence in every detail.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. HOW IT ALL BEGAN ───────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
            {/* Left: Text */}
            <div className="lg:w-[35%] flex flex-col justify-center">
              <h2 className="text-[32px] md:text-[38px] font-bold text-charcoal mb-6 leading-[1.2]">
                How It All Began
              </h2>
              <div className="w-12 h-[3px] bg-primary rounded-sm mb-8" />
              <div className="space-y-6 text-dark-gray text-[15px] leading-[1.8] mb-10">
                <p>
                  Fanoon Consultants began as a vision shared by two like-minded professionals with a passion for architecture, design, and positive impact.
                </p>
                <p>
                  What started as a small idea has grown into a multidisciplinary practice delivering innovative and sustainable solutions across Pakistan and beyond.
                </p>
              </div>
              <div className="flex items-center gap-5 pt-6 border-t border-[#f0f0f0]">
                {/* Signature Image Placeholder - using a cursive text for now */}
                <div className="text-[28px] font-medium italic text-charcoal/80" style={{ fontFamily: "serif" }}>
                  Ar. Arsalan Haider
                </div>
                <div>
                  <h4 className="text-primary font-bold text-[13px]">Ar. Arsalan Haider</h4>
                  <p className="text-dark-gray text-[11px] uppercase tracking-widest mt-0.5">Founder & Principal Architect</p>
                </div>
              </div>
            </div>

            {/* Right: Timeline */}
            <div className="lg:w-[65%] flex items-center">
              <div className="w-full relative">
                {/* Connecting Line */}
                <div className="absolute top-[35px] left-0 right-0 h-[2px] bg-[#e8e8e8] hidden sm:block z-0" />
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 sm:gap-6 relative z-10">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-[70px] h-[70px] rounded-full bg-[#f4fbf7] border border-primary/20 flex items-center justify-center mb-6 text-primary shadow-sm">
                      <Target className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <span className="text-primary font-bold text-[15px] mb-1">2019</span>
                    <h4 className="text-charcoal font-bold text-[14px] mb-3">The Beginning</h4>
                    <p className="text-dark-gray text-[13px] leading-[1.6]">
                      The journey began with a clear vision to create meaningful architecture and design solutions.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-[70px] h-[70px] rounded-full bg-[#f4fbf7] border border-primary/20 flex items-center justify-center mb-6 text-primary shadow-sm">
                      <Users className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <span className="text-primary font-bold text-[15px] mb-1">2020 – 2022</span>
                    <h4 className="text-charcoal font-bold text-[14px] mb-3">Building Foundations</h4>
                    <p className="text-dark-gray text-[13px] leading-[1.6]">
                      We grew our team, expanded our capabilities and delivered impactful projects across sectors.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-[70px] h-[70px] rounded-full bg-[#f4fbf7] border border-primary/20 flex items-center justify-center mb-6 text-primary shadow-sm">
                      <Building2 className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <span className="text-primary font-bold text-[15px] mb-1">2023 – 2024</span>
                    <h4 className="text-charcoal font-bold text-[14px] mb-3">Expanding Horizons</h4>
                    <p className="text-dark-gray text-[13px] leading-[1.6]">
                      New partnerships, wider reach, and more complex projects strengthened our presence in the industry.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-[70px] h-[70px] rounded-full bg-[#f4fbf7] border border-primary/20 flex items-center justify-center mb-6 text-primary shadow-sm">
                      <Trophy className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <span className="text-primary font-bold text-[15px] mb-1">2025 & Beyond</span>
                    <h4 className="text-charcoal font-bold text-[14px] mb-3">Shaping Tomorrow</h4>
                    <p className="text-dark-gray text-[13px] leading-[1.6]">
                      We continue to innovate, embrace sustainability, and design a better future for generations to come.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. BY THE NUMBERS ────────────────────────────────── */}
      <section className="bg-[#121212] py-20 border-t border-[#1a1a1a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <h2 className="text-[28px] md:text-[34px] font-bold text-white mb-16 text-center md:text-left">
            By the Numbers
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-0">
            {/* Stat 1 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:px-6 pt-6 md:pt-0 first:pt-0 first:px-0 text-center md:text-left relative">
              <div className="text-primary flex-shrink-0">
                <Building2 className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-white font-bold text-[32px] leading-none mb-1">100+</div>
                <div className="text-white/60 text-[12px] uppercase tracking-widest font-medium">Projects Completed</div>
              </div>
              <div className="hidden md:block absolute right-0 top-[20%] bottom-[20%] w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:px-6 pt-6 md:pt-0 text-center md:text-left relative">
              <div className="text-primary flex-shrink-0">
                <Users className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-white font-bold text-[32px] leading-none mb-1">50+</div>
                <div className="text-white/60 text-[12px] uppercase tracking-widest font-medium">Happy Clients</div>
              </div>
              <div className="hidden md:block absolute right-0 top-[20%] bottom-[20%] w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:px-6 pt-6 md:pt-0 text-center md:text-left relative">
              <div className="text-primary flex-shrink-0">
                <MapPin className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-white font-bold text-[32px] leading-none mb-1">10+</div>
                <div className="text-white/60 text-[12px] uppercase tracking-widest font-medium">Cities Served</div>
              </div>
              <div className="hidden md:block absolute right-0 top-[20%] bottom-[20%] w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:px-6 pt-6 md:pt-0 text-center md:text-left relative">
              <div className="text-primary flex-shrink-0">
                <Users className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-white font-bold text-[32px] leading-none mb-1">25+</div>
                <div className="text-white/60 text-[12px] uppercase tracking-widest font-medium">Team Members</div>
              </div>
              <div className="hidden md:block absolute right-0 top-[20%] bottom-[20%] w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            </div>

            {/* Stat 5 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:px-6 pt-6 md:pt-0 text-center md:text-left relative">
              <div className="text-primary flex-shrink-0">
                <Medal className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-white font-bold text-[32px] leading-none mb-1">5+</div>
                <div className="text-white/60 text-[12px] uppercase tracking-widest font-medium">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. OUR FOUNDATION ────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="mb-16">
            <h2 className="text-[28px] md:text-[34px] font-bold text-charcoal mb-4">
              Our Foundation
            </h2>
            <div className="w-12 h-[3px] bg-primary rounded-sm mb-6" />
            <p className="text-dark-gray text-[15px]">
              The principles that guide us in everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {/* Vision */}
            <div className="flex flex-col lg:pr-10 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-[50px] h-[50px] rounded-full bg-[#f4fbf7] text-primary flex items-center justify-center border border-primary/20 shadow-sm flex-shrink-0">
                  <Eye className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-bold text-charcoal">Our Vision</h3>
              </div>
              <p className="text-dark-gray text-[14px] leading-[1.7] flex-1">
                To be a leading design consultancy recognized for innovation, quality, and sustainable solutions that create lasting impact.
              </p>
              <div className="hidden lg:block absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-black/15 to-transparent" />
            </div>

            {/* Mission */}
            <div className="flex flex-col lg:px-10 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-[50px] h-[50px] rounded-full bg-[#f4fbf7] text-primary flex items-center justify-center border border-primary/20 shadow-sm flex-shrink-0">
                  <Target className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-bold text-charcoal">Our Mission</h3>
              </div>
              <p className="text-dark-gray text-[14px] leading-[1.7] flex-1">
                To deliver exceptional architectural and design services through creativity, collaboration, and a commitment to excellence.
              </p>
              <div className="hidden lg:block absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-black/15 to-transparent" />
            </div>

            {/* Values */}
            <div className="flex flex-col lg:px-10 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-[50px] h-[50px] rounded-full bg-[#f4fbf7] text-primary flex items-center justify-center border border-primary/20 shadow-sm flex-shrink-0">
                  <Gem className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-bold text-charcoal">Our Values</h3>
              </div>
              <ul className="text-dark-gray text-[14px] leading-[1.8] list-disc list-inside flex-1 marker:text-primary">
                <li>Integrity</li>
                <li>Excellence</li>
                <li>Innovation</li>
                <li>Collaboration</li>
                <li>Sustainability</li>
              </ul>
              <div className="hidden lg:block absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-black/15 to-transparent" />
            </div>

            {/* Philosophy */}
            <div className="flex flex-col lg:pl-10 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-[50px] h-[50px] rounded-full bg-[#f4fbf7] text-primary flex items-center justify-center border border-primary/20 shadow-sm flex-shrink-0">
                  <Leaf className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-bold text-charcoal">Our Philosophy</h3>
              </div>
              <p className="text-dark-gray text-[14px] leading-[1.7] flex-1">
                We believe thoughtful design has the power to transform communities, enrich lives, and create a better tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. THE FANOON DIFFERENCE ─────────────────────────── */}
      <section className="bg-[#101010] flex flex-col lg:flex-row">
        {/* Left: Image */}
        <div className="w-full lg:w-[45%] relative min-h-[400px] lg:min-h-auto">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
            alt="Fanoon Office"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-[55%] py-20 px-8 lg:px-16 xl:px-24 flex flex-col justify-center">
          <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] mb-4 block">
            THE FANOON DIFFERENCE
          </span>
          <h2 className="text-[32px] md:text-[40px] font-bold text-white mb-6 leading-[1.2]">
            More Than Design. A Partnership.
          </h2>
          <p className="text-white/70 text-[15px] leading-[1.8] mb-14 max-w-[600px]">
            We don't just design spaces; we build relationships. We take time to understand our clients, their goals, and their aspirations — then craft solutions that go beyond expectations.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 sm:gap-y-0">
            {/* Item 1 */}
            <div className="flex flex-col items-center text-center sm:pr-4 relative">
              <div className="text-primary mb-4">
                <Handshake className="w-9 h-9" strokeWidth={1.2} />
              </div>
              <h4 className="text-white text-[13px] font-bold leading-[1.4]">
                Client-Centered<br />Approach
              </h4>
              <div className="hidden sm:block absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center text-center sm:px-4 relative">
              <div className="text-primary mb-4">
                <Lightbulb className="w-9 h-9" strokeWidth={1.2} />
              </div>
              <h4 className="text-white text-[13px] font-bold leading-[1.4]">
                Innovative<br />Solutions
              </h4>
              <div className="hidden sm:block absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center text-center sm:px-4 relative">
              <div className="text-primary mb-4">
                <Search className="w-9 h-9" strokeWidth={1.2} />
              </div>
              <h4 className="text-white text-[13px] font-bold leading-[1.4]">
                Attention to<br />Detail
              </h4>
              <div className="hidden sm:block absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center text-center sm:pl-4 relative">
              <div className="text-primary mb-4">
                <Headset className="w-9 h-9" strokeWidth={1.2} />
              </div>
              <h4 className="text-white text-[13px] font-bold leading-[1.4]">
                End-to-End<br />Support
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA BANNER ──────────────────────────────────────── */}
      <section className="bg-[#1c4b31] py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-6">
              {/* Circular graphic */}
              <div className="flex-shrink-0 relative w-20 h-20 md:w-24 md:h-24 hidden sm:flex items-center justify-center">
                <Image
                  src="/monogram.png"
                  alt="Fanoon Monogram"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-[28px] md:text-[34px] font-bold text-white leading-[1.2] mb-1">
                  Every project has a story.
                </h3>
                <h3 className="text-[28px] md:text-[34px] font-bold text-white/90 leading-[1.2]">
                  Let's create yours together.
                </h3>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-5">
              <p className="text-white/80 text-[14px] max-w-[300px] text-center md:text-right">
                We are always excited to take on new challenges and bring inspiring ideas to life.
              </p>
              <Link href="/contact/start-project">
                <Button 
                  variant="primary" 
                  className="bg-transparent border border-white text-white hover:bg-white hover:text-[#1c4b31] px-8 py-3.5 group font-bold tracking-[0.1em] text-[12px]"
                >
                  LET'S WORK TOGETHER
                  <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
