"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const servicesLinks = [
  { name: "Architecture Design", href: "/services/architecture-design" },
  { name: "Interior Design", href: "/services/interior-design" },
  { name: "Landscape Design", href: "/services/landscape-design" },
  { name: "3D Visualization", href: "/services/3d-visualization" },
  { name: "Project Management", href: "/services/project-management" },
  { name: "Construction Supervision", href: "/services/construction-supervision" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // For mobile sidebar
  const pathname = usePathname();


  // Switch to solid bg after scrolling 60px
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Do not render navbar on admin or invoice pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/invoice")) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Our Process", href: "/our-process" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/about-us/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[60] transition-all duration-300 ${
          scrolled || isMobileMenuOpen
            ? "bg-charcoal shadow-lg"
            : "bg-gradient-to-b from-charcoal/80 to-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative z-10" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/logo.png"
              alt="Fanoon Consultants"
              width={240}
              height={80}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-10">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.hasDropdown && pathname.startsWith('/services/'));
                
                if (link.hasDropdown) {
                  return (
                    <li key={link.name} className="relative group py-6">
                      <Link
                        href={link.href}
                        className={`flex items-center text-[15px] font-medium transition-colors relative pb-1 ${
                          isActive 
                            ? "text-white after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-[2px] after:bg-primary/80" 
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="ml-1.5 w-4 h-4 transition-transform group-hover:rotate-180" />
                      </Link>
                      
                      {/* Desktop Dropdown */}
                      <div className="absolute top-[80%] left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="bg-white rounded-lg shadow-xl py-3 min-w-[260px] flex flex-col relative before:content-[''] before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white">
                          {servicesLinks.map((sublink) => (
                            <Link
                              key={sublink.name}
                              href={sublink.href}
                              className="px-6 py-2.5 text-[14px] text-charcoal hover:bg-light-gray hover:text-primary transition-colors block"
                            >
                              {sublink.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-[15px] font-medium transition-colors relative pb-1 ${
                        isActive 
                          ? "text-white after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-[2px] after:bg-primary/80" 
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            <Link href="/contact" className="flex items-center text-[13px] font-semibold text-white tracking-widest uppercase border-2 border-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-300 px-6 py-2.5 rounded-sm gap-2 group">
              LET&apos;S TALK
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden p-2 -mr-2 text-white hover:text-primary transition-colors focus:outline-none relative z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </header>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] xl:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-charcoal z-[55] shadow-2xl transition-transform duration-400 ease-in-out xl:hidden flex flex-col pt-24 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex-1 overflow-y-auto px-8 py-6 pb-24 no-scrollbar">
          <ul className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <li key={link.name} className="flex flex-col border-b border-white/10 last:border-0 py-3">
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="flex items-center justify-between text-h5 font-semibold text-white w-full text-left"
                    >
                      {link.name}
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform duration-300 ${servicesOpen ? "rotate-180 text-primary" : "text-white/60"}`} 
                      />
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${servicesOpen ? "max-h-[400px] mt-4 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <ul className="flex flex-col space-y-3 pl-4 border-l border-white/10 ml-2">
                        {servicesLinks.map((sublink) => (
                          <li key={sublink.name}>
                            <Link
                              href={sublink.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-[15px] text-white/70 hover:text-primary transition-colors block py-1"
                            >
                              {sublink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.name} className="border-b border-white/10 last:border-0 py-3">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-h5 font-semibold hover:text-primary transition-colors text-white block"
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <div className="mt-12">
             <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex justify-center items-center text-[14px] font-semibold text-white tracking-widest uppercase border border-primary bg-transparent hover:bg-primary/20 transition-colors duration-300 px-6 py-4 rounded-sm"
              >
              LET&apos;S TALK
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
