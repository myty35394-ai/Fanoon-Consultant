import React from "react";

export interface StatItemProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  theme?: "light" | "dark";
  labelPosition?: "before" | "after";
}

export default function StatItem({ icon, number, label, theme = "light", labelPosition = "after" }: StatItemProps) {
  if (theme === "dark") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 w-full text-center bg-transparent p-4">
        <div className="flex-shrink-0 flex justify-center mb-1">
          {React.cloneElement(icon as React.ReactElement<any>, {
            className: "w-[42px] h-[42px] text-primary",
            strokeWidth: 1.2,
          })}
        </div>
        <div className="flex flex-col items-center">
          {labelPosition === "before" && (
            <div className="text-[12.5px] font-medium text-white/80 tracking-wide text-center mb-2">{label}</div>
          )}
          <div className="text-[36px] font-bold text-white leading-none mb-1">{number}</div>
          {labelPosition === "after" && (
            <div className="text-[12.5px] font-medium text-white/80 tracking-wide text-center mt-1">{label}</div>
          )}
        </div>
      </div>
    );
  }

  // default (light) theme used in Home and About pages
  return (
    <div className="bg-white border border-light-gray/60 p-8 flex flex-col md:flex-row md:items-center justify-center gap-4 md:gap-6 w-full text-center md:text-left">
      <div className="flex-shrink-0 flex justify-center">
        {icon}
      </div>
      <div className="flex flex-col items-center md:items-start">
        {labelPosition === "before" && (
          <div className="text-[9px] font-bold text-dark-gray uppercase tracking-widest text-center md:text-left mb-1.5">{label}</div>
        )}
        <div className="text-[34px] font-bold text-charcoal leading-none mb-1.5">{number}</div>
        {labelPosition === "after" && (
          <div className="text-[9px] font-bold text-dark-gray opacity-60 uppercase tracking-widest text-center md:text-left">{label}</div>
        )}
      </div>
    </div>
  );
}
