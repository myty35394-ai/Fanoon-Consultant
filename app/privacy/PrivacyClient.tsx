"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  User,
  Settings,
  Share2,
  Cookie,
  Lock,
  UserCheck,
  Link2,
  Database,
  Smile,
  FileText,
  Mail,
  Headphones,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { SiteSettings } from "@/types/settings";

const sections = [
  { id: "introduction", number: "1.", title: "Introduction", icon: ShieldCheck },
  { id: "information-we-collect", number: "2.", title: "Information We Collect", icon: User },
  { id: "how-we-use-information", number: "3.", title: "How We Use Your Information", icon: Settings },
  { id: "how-we-share-information", number: "4.", title: "How We Share Your Information", icon: Share2 },
  { id: "cookies-tracking", number: "5.", title: "Cookies & Tracking Technologies", icon: Cookie },
  { id: "data-security", number: "6.", title: "Data Security", icon: Lock },
  { id: "rights-choices", number: "7.", title: "Your Rights & Choices", icon: UserCheck },
  { id: "third-party-links", number: "8.", title: "Third-Party Links", icon: Link2 },
  { id: "data-retention", number: "9.", title: "Data Retention", icon: Database },
  { id: "childrens-privacy", number: "10.", title: "Children's Privacy", icon: Smile },
  { id: "changes-to-policy", number: "11.", title: "Changes to This Policy", icon: FileText },
  { id: "contact-us", number: "12.", title: "Contact Us", icon: Mail },
];

export default function PrivacyClient({ settings }: { settings: SiteSettings }) {
  const [activeSection, setActiveSection] = useState("introduction");

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
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
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
              <h4 className="text-xs font-bold text-charcoal leading-snug">Questions about your privacy?</h4>
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
          This Privacy Policy explains how {settings.companyName || "Fanoon Consultants"} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, discloses and protects your information when you visit our website or use our services.
        </p>

        {/* 1. Introduction */}
        <section id="introduction" className="pt-2 scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">1. Introduction</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            {settings.companyName || "Fanoon Consultants"} is committed to safeguarding your privacy. This policy applies to all information collected through our website, communications, and services.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 2. Information We Collect */}
        <section id="information-we-collect" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">2. Information We Collect</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            We may collect personal and non-personal information, including:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-dark-gray pl-1">
            <li>Name, email address, phone number, and company details</li>
            <li>Project requirements and messages you submit</li>
            <li>Information collected automatically through cookies and analytics</li>
          </ul>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 3. How We Use Your Information */}
        <section id="how-we-use-information" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">3. How We Use Your Information</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            We use your information to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-dark-gray pl-1">
            <li>Respond to inquiries and provide requested services</li>
            <li>Manage projects and client communications</li>
            <li>Improve our website, services and user experience</li>
            <li>Send updates, newsletters and marketing communications (with your consent)</li>
          </ul>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 4. How We Share Your Information */}
        <section id="how-we-share-information" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">4. How We Share Your Information</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-dark-gray pl-1">
            <li>Trusted service providers who assist in our operations</li>
            <li>Authorities when required by law or legal process</li>
            <li>Business partners, only with your consent</li>
          </ul>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 5. Cookies & Tracking Technologies */}
        <section id="cookies-tracking" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">5. Cookies & Tracking Technologies</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            We use cookies and similar technologies to enhance your browsing experience, analyze website traffic and understand user behavior. You can manage your cookie preferences in your browser.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 6. Data Security */}
        <section id="data-security" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">6. Data Security</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 7. Your Rights & Choices */}
        <section id="rights-choices" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">7. Your Rights & Choices</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            You have the right to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-dark-gray pl-1">
            <li>Access, update or delete your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed pt-1">
            To exercise these rights, please contact us using the details below.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 8. Third-Party Links */}
        <section id="third-party-links" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">8. Third-Party Links</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            Our website may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 9. Data Retention */}
        <section id="data-retention" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">9. Data Retention</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            We retain your information only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 10. Children's Privacy */}
        <section id="childrens-privacy" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">10. Children&apos;s Privacy</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 11. Changes to This Policy */}
        <section id="changes-to-policy" className="scroll-mt-28 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-primary">11. Changes to This Policy</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated effective date.
          </p>
        </section>

        <div className="h-px bg-[#f0f0f0]" />

        {/* 12. Contact Us */}
        <section id="contact-us" className="scroll-mt-28 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-primary">12. Contact Us</h2>
          <p className="text-xs sm:text-sm text-dark-gray leading-relaxed">
            If you have any questions or concerns about this Privacy Policy, please contact us:
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
