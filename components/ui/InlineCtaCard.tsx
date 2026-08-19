import React from "react";
import Button from "@/components/ui/Button";

export interface InlineCtaCardProps {
  icon?: React.ReactNode;
  headline: string;
  body: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function InlineCtaCard({
  icon,
  headline,
  body,
  buttonLabel = "GET IN TOUCH",
  buttonHref = "/contact",
}: InlineCtaCardProps) {
  return (
    <div
      className="flex flex-col items-start rounded-[16px] p-8 md:p-10 h-full"
      style={{ background: "#1a3327" }}
    >
      {/* Icon badge */}
      {icon && (
        <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mb-8 flex-shrink-0">
          {React.cloneElement(icon as React.ReactElement<any>, {
            className: "w-6 h-6 text-white",
            strokeWidth: 1.5,
          })}
        </div>
      )}

      {/* Headline */}
      <h4 className="text-[22px] font-bold text-white leading-snug mb-4">
        {headline}
      </h4>

      {/* Body */}
      <p className="text-[13px] text-white/80 leading-relaxed mb-8 flex-1">
        {body}
      </p>

      {/* Button */}
      <a
        href={buttonHref}
        className="inline-flex items-center justify-center uppercase tracking-wider font-semibold text-[12px] bg-primary text-white hover:bg-primary-dark transition-colors duration-200 px-7 py-3 rounded-[4px]"
      >
        {buttonLabel}
      </a>
    </div>
  );
}
