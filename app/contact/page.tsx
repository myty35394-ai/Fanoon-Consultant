import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Phone, Mail, Clock, Send,
  ChevronRight, ExternalLink,
} from "lucide-react";

import Button from "@/components/ui/Button";
import ContactForm from "@/components/contact/ContactForm";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Contact | Fanoon Consultants",
  description:
    "Have a project in mind? Reach out to Fanoon Consultants — a multidisciplinary architecture and design consultancy in Islamabad. Our team responds within 24 hours.",
};

const landmarks = [
  "Saudi Pak Tower – 200 m",
  "Kohsar Market – 350 m",
  "D-Chowk – 1.2 km",
  "Islamabad Expressway – 2.5 km",
];

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const officeAddress = settings.officeAddress;
  const googleMapsUrl = settings.googleMapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(officeAddress)}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://fanoonconsultants.com/" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://fanoonconsultants.com/contact" },
    ],
  };

  const contactPointJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    telephone: settings.primaryPhone,
    email: settings.primaryEmail,
    contactType: "Customer Service",
    hoursAvailable: settings.officeHours,
  };

  const socialLinks = [
    settings.facebookUrl && {
      label: "Facebook",
      href: settings.facebookUrl,
      svg: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    settings.linkedinUrl && {
      label: "LinkedIn",
      href: settings.linkedinUrl,
      svg: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    settings.instagramUrl && {
      label: "Instagram",
      href: settings.instagramUrl,
      svg: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    settings.youtubeUrl && {
      label: "YouTube",
      href: settings.youtubeUrl,
      svg: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
        </svg>
      ),
    },
    settings.pinterestUrl && {
      label: "Pinterest",
      href: settings.pinterestUrl,
      svg: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      ),
    },
  ].filter(Boolean) as { label: string; href: string; svg: React.ReactNode }[];
  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointJsonLd) }} />

      {/* ── BREADCRUMB + HERO — full-bleed photo with left dark gradient ── */}
      <section className="relative w-full overflow-hidden" style={{ paddingTop: 0 }}>

        {/* Full-bleed background photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=90"
            alt="Fanoon Consultants Office Interior"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Dark gradient: opaque black on left → transparent on right ~55% */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(10,13,10,0.97) 0%, rgba(10,13,10,0.90) 30%, rgba(10,13,10,0.65) 48%, rgba(10,13,10,0.15) 65%, rgba(10,13,10,0) 80%)",
            }}
          />
          {/* Slight bottom darkening */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0a0d0a]/60 to-transparent" />
        </div>

        {/* Content — sits above photo */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">

          {/* Breadcrumb — embedded inside the hero, top left */}
          <div className="pt-32 pb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] font-medium">
              <Link href="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-primary" strokeWidth={3} />
              <span className="text-primary font-semibold">Contact</span>
            </nav>
          </div>

          {/* Hero text — left-aligned, sits on dark portion */}
          <div className="pb-16 lg:pb-20" style={{ maxWidth: "480px" }}>
            <span className="text-[11px] font-bold tracking-[0.3em] text-primary uppercase mb-4 block">
              GET IN TOUCH
            </span>
            <h1
              className="text-white font-extrabold leading-[1.12] tracking-tight mb-5"
              style={{ fontSize: "clamp(28px, 3.8vw, 44px)", letterSpacing: "-0.01em" }}
            >
              Let&apos;s Build Something<br />
              Extraordinary Together<span className="text-primary">.</span>
            </h1>
            {/* Short green rule */}
            <div className="w-10 h-[3px] bg-primary rounded-sm mb-6" />
            <p className="text-white/75 text-[14px] leading-[1.8]">
              Have a project in mind? We&apos;d love to hear about it.<br />
              Reach out to us and our team will get back to you<br />
              as soon as possible.
            </p>
          </div>

        </div>
      </section>

      {/* ── 2. INFO STRIP ─────────────────────────────────────── */}
      <section className="bg-[#fafafa] border-b border-[#e5e5e5]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">

            {/* Our Office */}
            <div className="relative py-10 pr-4 lg:pr-6 after:hidden lg:after:block after:absolute after:right-0 after:top-[25%] after:bottom-[25%] after:w-px after:bg-[#e0e0e0]">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3.5 mb-3">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                    <path d="M5 21q7 3 14 0" />
                  </svg>
                  <p className="text-[15px] font-bold text-charcoal">Our Office</p>
                </div>
                <div className="text-[12.5px] text-dark-gray leading-[1.65]">
                  <p className="whitespace-pre-line">{settings.officeAddress}</p>
                </div>
              </div>
            </div>

            {/* Call Us */}
            <div className="relative py-10 px-4 lg:px-6 after:hidden lg:after:block after:absolute after:right-0 after:top-[25%] after:bottom-[25%] after:w-px after:bg-[#e0e0e0]">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3.5 mb-3">
                  <Phone className="w-[34px] h-[34px] text-primary flex-shrink-0" strokeWidth={1.25} />
                  <p className="text-[15px] font-bold text-charcoal">Call Us</p>
                </div>
                <div className="text-[12.5px] text-dark-gray leading-[1.65]">
                  <a href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors block font-medium">
                    {settings.primaryPhone}
                  </a>
                  <p className="text-dark-gray/70">{settings.officeHours}</p>
                </div>
              </div>
            </div>

            {/* Email Us */}
            <div className="relative py-10 px-4 lg:px-6 after:hidden lg:after:block after:absolute after:right-0 after:top-[25%] after:bottom-[25%] after:w-px after:bg-[#e0e0e0]">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3.5 mb-3">
                  <Mail className="w-[34px] h-[34px] text-primary flex-shrink-0" strokeWidth={1.25} />
                  <p className="text-[15px] font-bold text-charcoal">Email Us</p>
                </div>
                <div className="text-[12.5px] text-dark-gray leading-[1.65] break-words">
                  <a href={`mailto:${settings.primaryEmail}`} className="hover:text-primary transition-colors break-all block font-medium">
                    {settings.primaryEmail}
                  </a>
                  <p className="text-dark-gray/70">We reply within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="relative py-10 px-4 lg:px-6 after:hidden lg:after:block after:absolute after:right-0 after:top-[25%] after:bottom-[25%] after:w-px after:bg-[#e0e0e0]">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3.5 mb-3">
                  <Clock className="w-[34px] h-[34px] text-primary flex-shrink-0" strokeWidth={1.25} />
                  <p className="text-[15px] font-bold text-charcoal">Office Hours</p>
                </div>
                <div className="text-[12.5px] text-dark-gray leading-[1.65]">
                  <p className="whitespace-pre-line">{settings.officeHours}</p>
                </div>
              </div>
            </div>

            {/* Connect */}
            <div className="py-10 pl-4 lg:pl-6 col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3.5 mb-4">
                  <Send className="w-[34px] h-[34px] text-primary flex-shrink-0" strokeWidth={1.25} />
                  <p className="text-[15px] font-bold text-charcoal">Connect</p>
                </div>
                <div className="flex items-center gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-[34px] h-[34px] rounded-full border border-medium-gray/70 flex items-center justify-center text-charcoal hover:border-primary hover:text-primary transition-colors flex-shrink-0"
                    >
                      <div className="scale-90">{s.svg}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. FORM + OFFICE CARD ─────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── Left: Form ── */}
            <div className="w-full lg:w-[58%]">
              <div className="bg-white rounded-2xl border border-[#e8e8e8] shadow-sm p-7 md:p-9">
                {/* Heading */}
                <div className="mb-6">
                  <h2 className="text-[20px] font-bold text-charcoal mb-1">Send Us a Message</h2>
                  {/* Short primary underline matching reference */}
                  <div className="w-8 h-[2px] bg-primary mb-3" />
                  <p className="text-[13px] text-dark-gray">
                    Fill out the form below and we&apos;ll get back to you shortly.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>

            {/* ── Right: Office / Map Card ── */}
            <div className="w-full lg:w-[42%] bg-charcoal rounded-2xl overflow-hidden sticky top-28">

              {/* Dark Google Map */}
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.493922634426!2d73.07684071520935!3d33.72202688069677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf9dfab30f7d%3A0x8e833481f3e74b5c!2sGinza%20Center!5e0!3m2!1sen!2s!4v1687455823194!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(1) contrast(1)" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full pointer-events-auto"
                  title="Fanoon Consultants Location"
                ></iframe>
                {/* Green Pin Overlay - pointer-events-none so we can still drag the map */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center pb-8">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/50">
                      <MapPin className="w-5 h-5 text-white fill-white" strokeWidth={1.5} />
                    </div>
                    <div className="w-[2px] h-5 bg-primary" />
                    <div className="w-4 h-[5px] rounded-full bg-primary/40 blur-[2px]" />
                  </div>
                </div>
                {/* Street label overlays — matching reference feel */}
                <div className="absolute top-4 right-4 text-[9px] text-white/40 font-medium tracking-wider">BLUE AREA, ISLAMABAD</div>
              </div>

              {/* Office Details */}
              <div className="p-6">
                <h3 className="text-white font-bold text-[17px] mb-1">Our Office</h3>
                <div className="w-7 h-[2px] bg-primary mb-4" />

                <div className="flex items-start gap-3 mb-5">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-white/80 text-[13px] leading-relaxed whitespace-pre-line">
                    {settings.officeAddress}
                  </p>
                </div>

                <div className="h-px bg-white/10 mb-5" />

                <p className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-3">
                  Landmarks Nearby
                </p>
                <ul className="space-y-2 mb-6">
                  {landmarks.map((lm, i) => (
                    <li key={i} className="flex items-center gap-2 text-[13px] text-white/70">
                      <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0" strokeWidth={2.5} />
                      {lm}
                    </li>
                  ))}
                </ul>

                {/* Get Directions */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-white/20 hover:border-primary/60 text-white hover:text-primary text-[11px] font-bold uppercase tracking-[0.18em] py-3 rounded-lg transition-all duration-200 hover:bg-primary/5"
                >
                  GET DIRECTIONS
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. CTA BANNER ─────────────────────────────────────── */}
      <section className="bg-charcoal border-t border-white/5 py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

            {/* 1. Decorative Monogram */}
            <div className="flex-shrink-0 flex items-center justify-center relative w-20 h-20 md:w-24 md:h-24">
              <Image
                src="/monogram.png"
                alt="Fanoon Monogram"
                fill
                className="object-contain"
              />
            </div>

            {/* 2. Title Text */}
            <div className="flex-1 text-center lg:text-left min-w-[280px]">
              <h2 className="text-white font-bold text-[22px] md:text-[26px] leading-snug">
                Let&apos;s turn your ideas into<br />
                inspiring spaces<span className="text-primary">.</span>
              </h2>
            </div>

            {/* 3. Subtitle Text */}
            <div className="flex-1 text-center lg:text-left max-w-sm">
              <p className="text-[#a0a0a0] text-[13px] leading-relaxed">
                We collaborate with clients who value design,<br />
                quality, and long-term impact.
              </p>
            </div>

            {/* 4. Button */}
            <div className="flex-shrink-0">
              <Link href="/contact/start-project">
                <button
                  className="flex items-center gap-3 px-8 py-3 bg-[#111] border border-primary/60 hover:border-primary text-white text-[12px] font-bold uppercase tracking-[0.1em] rounded transition-all duration-200"
                >
                  START A PROJECT
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}

