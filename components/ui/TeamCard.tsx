import React from "react";
import Image from "next/image";

export interface TeamCardProps {
  name: string;
  role: string;
  description?: string;
  imageUrl: string;
  socialLink?: string;
}

export default function TeamCard({
  name,
  role,
  description,
  imageUrl,
  socialLink,
}: TeamCardProps) {
  return (
    <div className="bg-white flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 w-full h-full">
      {/* Square image */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#d4d4d4]">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover object-top"
        />
        {/* LinkedIn badge — top-right corner */}
        {socialLink && (
          <a
            href={socialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-sm flex items-center justify-center shadow-sm text-[#0077b5] hover:text-primary transition-colors duration-300"
          >
            {/* LinkedIn 'in' icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        )}
      </div>

      {/* Text body */}
      <div className="py-5 px-4 flex flex-col flex-1 border-t border-[#f0f0f0]">
        <h3 className="text-[14px] font-bold text-charcoal mb-1 leading-snug">{name}</h3>
        <span className="text-[11px] font-semibold text-primary mb-3 leading-tight block">{role}</span>
        <p className="text-[12px] text-dark-gray leading-relaxed" style={{ opacity: 0.65 }}>
          {description}
        </p>
      </div>
    </div>
  );
}
