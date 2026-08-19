import React from "react";

export interface DeliverableCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function DeliverableCard({ icon, title, description }: DeliverableCardProps) {
  return (
    <div className="bg-white border border-[#e8e8e8]/70 rounded-[12px] p-6 lg:px-4 lg:py-8 flex flex-col items-center text-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow duration-300 h-full">
      <div className="relative w-12 h-12 flex items-center justify-center mb-5">
        {/* Centered gray background circle */}
        <div className="absolute inset-0 bg-[#f4f5f4] rounded-full" />
        {/* Icon on top */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {React.cloneElement(icon as React.ReactElement<any>, {
            className: "w-6 h-6 text-primary",
            strokeWidth: 1.5,
          })}
        </div>
      </div>
      <h3 className="text-[12.5px] font-bold text-charcoal mb-3 leading-snug">
        {title}
      </h3>
      <p className="text-[10px] text-dark-gray leading-relaxed opacity-70 px-1">
        {description}
      </p>
    </div>
  );
}
