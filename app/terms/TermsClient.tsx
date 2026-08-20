"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Building2,
  Users,
  FileSignature,
  CreditCard,
  PenTool,
  Lightbulb,
  Lock,
  ShieldAlert,
  CloudRain,
  Ban,
  Scale,
  Handshake,
  RotateCcw,
  Mail,
  Headphones,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { SiteSettings } from "@/types/settings";

const sections = [
  { id: "acceptance-of-terms", number: "1.", title: "Acceptance of Terms", icon: FileText },
  { id: "our-services", number: "2.", title: "Our Services", icon: Building2 },
  { id: "client-responsibilities", number: "3.", title: "Client Responsibilities", icon: Users },
  { id: "proposals-agreements", number: "4.", title: "Proposals & Agreements", icon: FileSignature },
  { id: "fees-payment-terms", number: "5.", title: "Fees & Payment Terms", icon: CreditCard },
  { id: "revisions-approvals", number: "6.", title: "Revisions & Approvals", icon: PenTool },
  { id: "intellectual-property", number: "7.", title: "Intellectual Property", icon: Lightbulb },
  { id: "confidentiality", number: "8.", title: "Confidentiality", icon: Lock },
  { id: "limitation-of-liability", number: "9.", title: "Limitation of Liability", icon: ShieldAlert },
  { id: "force-majeure", number: "10.", title: "Force Majeure", icon: CloudRain },
  { id: "termination", number: "11.", title: "Termination", icon: Ban },
  { id: "governing-law", number: "12.", title: "Governing Law", icon: Scale },
  { id: "dispute-resolution", number: "13.", title: "Dispute Resolution", icon: Handshake },
  { id: "changes-to-terms", number: "14.", title: "Changes to Terms", icon: RotateCcw },
  { id: "contact-us", number: "15.", title: "Contact Us", icon: Mail },
];

export default function TermsClient({ settings }: { settings: SiteSettings }) {
  const [activeSection, setActiveSection] = useState("acceptance-of-terms");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      {/* ── Left Sidebar (Sticky) ────────────────────────── */}
      <div className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0 space-y-6 lg:sticky lg:top-28">
        {/* On This Page Card */}
        <div className="bg-white rounded-xl border border-[#eaeaea] shadow-sm p-6">
          <h3 className="text-sm font-bold text-charcoal mb-4 tracking-tight">On This Page</h3>
          <nav className="space-y-1">
            {sections.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                    isActive
                      ? "bg-[#eaf7f0] text-primary font-semibold border border-primary/20 shadow-xs"
                      : "text-dark-gray/80 hover:bg-black/5 hover:text-charcoal"
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-primary" : "text-dark-gray/60"}`} />
                  <span className="truncate">
                    {item.number} {item.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Support / Questions Card */}
        <div className="bg-[#f7faf8] rounded-xl border border-[#e2ece5] p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-charcoal leading-snug">Questions about these terms?</h4>
              <p className="text-[11px] text-dark-gray/70">We&apos;re here to help.</p>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-black/5 text-xs">
            <a
              href={`mailto:${settings.primaryEmail}`}
              className="flex items-center gap-2.5 text-dark-gray hover:text-primary transition-colors break-all"
            >
              <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>{settings.primaryEmail}</span>
            </a>
            <a
              href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2.5 text-dark-gray hover:text-primary transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>{settings.primaryPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Right Content Area ─────────────────────────────── */}
      <div className="flex-1 bg-white rounded-xl border border-[#eaeaea] shadow-sm p-6 sm:p-10 md:p-12 space-y-10">
        {/* Last Updated Header */}
        <div className="flex items-center gap-2 text-xs text-dark-gray font-medium pb-6 border-b border-[#f0f0f0]">
          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
          <span>Last Updated: <strong className="text-primary font-bold">May 20, 2024</strong></span>
        </div>

        <p className="text-sm leading-relaxed text-dark-gray">
          Welcome to {settings.companyName || "Fanoon Consultants"}. By accessing our website or engaging our services, you agree to be bound by the following Terms &amp; Conditions.
        </p>

        {/* 1. Acceptance of Terms */}
        <section id="acceptance-of-terms" className="pt-2 scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">1. Acceptance of Terms</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            By using our website or availing our services, you agree to these Terms &amp; Conditions and our Privacy Policy. If you do not agree, please do not use our website or services.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 2. Our Services */}
        <section id="our-services" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">2. Our Services</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            {settings.companyName || "Fanoon Consultants"} provides architecture, interior design, landscape design, structural, MEP coordination, project management, construction supervision and related consultancy services.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 3. Client Responsibilities */}
        <section id="client-responsibilities" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">3. Client Responsibilities</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            Clients must provide accurate information, necessary documents and timely feedback required for the successful execution of the project.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 4. Proposals & Agreements */}
        <section id="proposals-agreements" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">4. Proposals &amp; Agreements</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            All proposals, scopes of work and timelines are subject to client approval. A formal agreement shall be signed before commencement of any project.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 5. Fees & Payment Terms */}
        <section id="fees-payment-terms" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">5. Fees &amp; Payment Terms</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            Fees, payment schedules and modes of payment will be clearly mentioned in the proposal and agreement. Payments must be made as per the agreed schedule.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 6. Revisions & Approvals */}
        <section id="revisions-approvals" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">6. Revisions &amp; Approvals</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            Revisions are included as per the agreed scope. Additional revisions beyond the included limit may attract extra charges and time.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 7. Intellectual Property */}
        <section id="intellectual-property" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">7. Intellectual Property</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            All designs, drawings, concepts and documents remain the intellectual property of {settings.companyName || "Fanoon Consultants"} until full payment is received. They shall not be used for any other purpose without written consent.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 8. Confidentiality */}
        <section id="confidentiality" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">8. Confidentiality</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            Both parties agree to keep all project-related information confidential and not disclose it to any third party without prior written permission.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 9. Limitation of Liability */}
        <section id="limitation-of-liability" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">9. Limitation of Liability</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            {settings.companyName || "Fanoon Consultants"} shall not be liable for any indirect, incidental or consequential damages arising from the use of our services or website.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 10. Force Majeure */}
        <section id="force-majeure" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">10. Force Majeure</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            We shall not be liable for any delay or failure in performance due to events beyond our reasonable control including natural disasters, strikes, or government restrictions.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 11. Termination */}
        <section id="termination" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">11. Termination</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            Either party may terminate the agreement with written notice if the other party breaches any material term. The client shall pay for all work completed up to the termination date.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 12. Governing Law */}
        <section id="governing-law" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">12. Governing Law</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of Pakistan.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 13. Dispute Resolution */}
        <section id="dispute-resolution" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">13. Dispute Resolution</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            Any dispute arising out of these terms shall be resolved amicably. If unresolved, the dispute shall be subject to the exclusive jurisdiction of the courts in Islamabad, Pakistan.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 14. Changes to Terms */}
        <section id="changes-to-terms" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">14. Changes to Terms</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            We may update these Terms &amp; Conditions from time to time. Changes will be posted on this page with the updated effective date.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 15. Contact Us */}
        <section id="contact-us" className="scroll-mt-28 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-primary">15. Contact Us</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            If you have any questions about these Terms &amp; Conditions, please contact us:
          </p>
          <div className="space-y-3 pt-2 text-xs sm:text-sm text-dark-gray">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="whitespace-pre-line">{settings.officeAddress}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <a href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors">
                {settings.primaryPhone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <a href={`mailto:${settings.primaryEmail}`} className="hover:text-primary transition-colors break-all">
                {settings.primaryEmail}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
