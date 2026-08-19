import React from "react";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

export interface ProjectCardProps {
  title: string;
  category: string;
  location?: string;
  subtitle?: string;
  imageUrl: string;
  href: string;
  variant?: "default" | "featured";
}

export default function ProjectCard({
  title,
  category,
  location,
  subtitle,
  imageUrl,
  href,
  variant = "featured",
}: ProjectCardProps) {
  if (variant === "default") {
    return (
      <div className="bg-white rounded-[12px] border border-[#e5e5e5] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col group h-full">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-2 block">
            {category}
          </span>
          <h3 className="text-[15px] font-bold text-charcoal mb-1 leading-snug">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[12px] text-dark-gray opacity-80 mb-2 leading-relaxed">
              {subtitle}
            </p>
          )}
          {location && (
            <div className="flex items-center text-[12px] text-dark-gray opacity-60 mb-5">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              {location}
            </div>
          )}
          <a
            href={href}
            className="mt-auto flex items-center text-[11px] font-bold text-primary tracking-widest uppercase group/link"
          >
            VIEW PROJECT
            <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    );
  }

  // featured variant (Home page style)
  return (
    <a
      href={href}
      className="group relative flex flex-col overflow-hidden w-full aspect-square bg-charcoal"
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Dark overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex items-end justify-between z-10">
        <div className="flex flex-col flex-1 pr-4">
          <h3 className="text-[14px] md:text-[15px] font-bold text-white tracking-wide uppercase mb-1.5 drop-shadow-sm leading-snug">
            {title}
          </h3>
          <span className="text-[10px] md:text-[11px] text-white/60 uppercase tracking-[0.2em] font-medium">
            {location}
          </span>
        </div>
        
        {/* Button */}
        <div className="w-11 h-11 border border-primary/60 bg-black/10 backdrop-blur-sm flex items-center justify-center text-white/70 transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white flex-shrink-0">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </a>
  );
}
