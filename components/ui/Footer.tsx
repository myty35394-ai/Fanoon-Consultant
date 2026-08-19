"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/invoice")) {
    return null;
  }

  return (
    <footer className="bg-charcoal text-white pt-16 pb-8 border-t border-dark-gray mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="flex flex-col">
            <Link href="/" className="mb-6 block">
              <Image
                src="/logo.png"
                alt="Fanoon Consultants"
                width={150}
                height={52}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-body2 text-medium-gray mb-6 leading-relaxed">
              Fanoon Consultants is a multidisciplinary design consultancy offering architecture, interior design, landscape design, 3D visualization, project management and construction supervision services.
            </p>
            <div className="flex space-x-4 mt-auto">
              <a href="#" className="w-10 h-10 rounded-full bg-dark-gray flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-gray flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-gray flex items-center justify-center hover:bg-primary transition-colors" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-gray flex items-center justify-center hover:bg-primary transition-colors" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="text-h6 font-semibold mb-6 uppercase tracking-wider text-medium-gray">Quick Links</h4>
            <ul className="space-y-4 text-body2">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/our-process" className="hover:text-primary transition-colors">Our Process</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="text-h6 font-semibold mb-6 uppercase tracking-wider text-medium-gray">Our Services</h4>
            <ul className="space-y-4 text-body2">
              <li><Link href="/services#architecture" className="hover:text-primary transition-colors">Architecture Design</Link></li>
              <li><Link href="/services#interior" className="hover:text-primary transition-colors">Interior Design</Link></li>
              <li><Link href="/services#landscape" className="hover:text-primary transition-colors">Landscape Design</Link></li>
              <li><Link href="/services#3d-visualization" className="hover:text-primary transition-colors">3D Visualization</Link></li>
              <li><Link href="/services#project-management" className="hover:text-primary transition-colors">Project Management</Link></li>
              <li><Link href="/services#construction" className="hover:text-primary transition-colors">Construction Supervision</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-h6 font-semibold mb-6 uppercase tracking-wider text-medium-gray">Contact Info</h4>
            <ul className="space-y-4 text-body2">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-medium-gray leading-relaxed">Office # 202, 2nd Floor, Giga Center,<br />Jinnah Avenue, Blue Area,<br />Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <a href="tel:+923189944488" className="text-medium-gray hover:text-white transition-colors">+92 318 9944488</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <a href="mailto:fanoonconsultants9@gmail.com" className="text-medium-gray hover:text-white transition-colors">fanoonconsultants9@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dark-gray flex flex-col md:flex-row items-center justify-between text-caption text-medium-gray">
          <p>&copy; {currentYear} Fanoon Consultants. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
