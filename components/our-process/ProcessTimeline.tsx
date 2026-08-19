import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export interface ProcessStep {
  number: string;
  icon: React.ReactNode;
  title: string;
  imageUrl: string;
  bullets: string[];
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="w-full relative mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-12">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="flex flex-col items-center relative group">
              {/* Number Badge & Connector Line (Desktop) */}
              <div className="relative flex justify-center w-full mb-8">
                {/* Connector Line & Arrow to next step */}
                {!isLast && (
                  <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-[50%] w-full items-center z-0">
                    <div className="w-full h-px border-t-[1.5px] border-dashed border-[#d0d0d0]" />
                    <div className="absolute left-1/2 -translate-x-1/2 bg-white px-1.5 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-[#a0a0a0]" strokeWidth={2.5} />
                    </div>
                  </div>
                )}
                
                {/* The circle */}
                <div className="w-12 h-12 rounded-full border border-primary bg-white flex items-center justify-center relative z-10">
                  <span className="text-[15px] font-bold text-primary leading-none">{step.number}</span>
                </div>
              </div>

              {/* Icon */}
              <div className="mb-4 text-primary flex justify-center w-full relative z-10">
                {React.cloneElement(step.icon as React.ReactElement<any>, {
                  className: "w-8 h-8",
                  strokeWidth: 1.5,
                })}
              </div>

              {/* Title */}
              <h3 className="text-[14px] font-bold text-charcoal text-center mb-6 relative z-10">{step.title}</h3>

              {/* Photo */}
              <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden mb-5 z-10">
                <Image
                  src={step.imageUrl}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Bullets */}
              <ul className="space-y-2 w-full flex-1 z-10">
                {step.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[12px] text-dark-gray leading-[1.5]">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-[6px] flex-shrink-0" />
                    <span className="flex-1">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
