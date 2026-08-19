"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    eyebrow: "DESIGNING SPACES",
    heading: "Inspiring Lives.",
    copy: "Fanoon Consultants is a multidisciplinary design consultancy delivering innovative architectural, interior, and landscape solutions with precision, creativity, and integrity.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    eyebrow: "INNOVATIVE INTERIORS",
    heading: "Crafting Comfort.",
    copy: "Our interior design experts blend aesthetics with functionality, creating spaces that elevate your everyday living and working experiences.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1920&q=80",
    eyebrow: "SUSTAINABLE LANDSCAPES",
    heading: "Connecting with Nature.",
    copy: "We design sustainable and breathtaking outdoor environments that seamlessly bridge the gap between built architecture and the natural world.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
    eyebrow: "EXPERT SUPERVISION",
    heading: "Building the Future.",
    copy: "Our professional project management and construction supervision ensure that every design is executed flawlessly, on time, and on budget.",
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-charcoal">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.heading}
            fill
            priority={index === 0}
            className="object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 w-full h-full max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col justify-center">
        <div className="max-w-[500px]">
          <span className="text-caption font-semibold tracking-[0.2em] text-primary uppercase mb-4 block">
            {slides[currentSlide].eyebrow}
          </span>
          <h1 className="text-white mb-6 animate-fade-in-up">
            {slides[currentSlide].heading}
          </h1>
          <p className="text-body1 text-white/90 mb-8 max-w-[440px] leading-relaxed">
            {slides[currentSlide].copy}
          </p>
          <Link href="/portfolio">
            <Button variant="primary" icon="arrow-right">
              EXPLORE OUR WORK
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Left Slide Indicator */}
      <div className="absolute z-20 bottom-10 left-6 md:left-10 lg:left-[calc(50%-560px)] flex items-center space-x-4">
        {slides.map((_, index) => (
          <div key={index} className="flex items-center">
            <span
              className={`text-body2 font-semibold font-sans tabular-nums transition-colors ${
                index === currentSlide ? "text-white" : "text-white/40 cursor-pointer hover:text-white/70"
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              0{index + 1}
            </span>
            {index < slides.length - 1 && (
              <div className="w-8 h-[1px] bg-white/20 mx-4" />
            )}
          </div>
        ))}
      </div>

      {/* Right Edge Rail */}
      <div className="absolute z-20 right-6 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-8">
        <div className="flex flex-col space-y-6">
          {/* Inline SVG Icons for Socials */}
          <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="X (Twitter)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
          </a>
          <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>
        <div className="w-[1px] h-12 bg-white/30 my-2" />
        <button className="text-white/60 hover:text-white transition-colors focus:outline-none" aria-label="Search">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
