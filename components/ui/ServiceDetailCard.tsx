import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export interface ServiceDetailCardProps {
  index: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  href?: string;
}

export default function ServiceDetailCard({
  index,
  title,
  description,
  icon,
  imageUrl,
  href = "#",
}: ServiceDetailCardProps) {
  const indexStr = index.toString().padStart(2, "0");

  return (
    <div className="bg-white rounded-[12px] border border-[#e5e5e5] flex flex-col overflow-hidden group hover:shadow-sm transition-shadow duration-300">
      <div className="p-5 pb-4 flex flex-col flex-1">

        {/* Top row: icon badge + index number */}
        <div className="flex items-center gap-3 mb-3">
          {/* Thin-outline circle with line-art icon */}
          <div
            className="flex-shrink-0 rounded-full border border-[#d0d0d0] flex items-center justify-center bg-white"
            style={{ width: 44, height: 44 }}
          >
            {React.cloneElement(icon as React.ReactElement<any>, {
              className: "w-5 h-5 text-primary",
              strokeWidth: 1.4,
            })}
          </div>
          {/* Green index number */}
          <span className="text-[13px] font-bold text-primary leading-none">
            {indexStr}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-bold text-charcoal mb-2.5 leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-[12.5px] text-dark-gray leading-relaxed mb-4"
          style={{ opacity: 0.68 }}
        >
          {description}
        </p>

        {/* Photo — rounded corners, full inner width */}
        <div
          className="relative w-full rounded-[8px] overflow-hidden mb-4 flex-shrink-0"
          style={{ aspectRatio: "16/9" }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        {/* LEARN MORE */}
        <a
          href={href}
          className="flex items-center gap-2 text-primary font-semibold text-[11px] tracking-widest uppercase mt-auto group/link"
        >
          LEARN MORE
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
