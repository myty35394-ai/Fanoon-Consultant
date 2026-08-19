import React from "react";
import { Check } from "lucide-react";

export interface StepItem {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: string[] | StepItem[];
  activeStep?: number;
  className?: string;
  variant?: "default" | "rail";
  icons?: React.ReactNode[];
  connector?: "solid" | "dotted";
  showNumbers?: boolean;
  theme?: "light" | "dark";
}

export default function Stepper({
  steps,
  activeStep = 0,
  className = "",
  variant = "default",
  icons,
  connector = "dotted",
  showNumbers = true,
  theme = "dark",
}: StepperProps) {
  // Normalize steps to StepItem[]
  const normalizedSteps: StepItem[] = steps.map((s) =>
    typeof s === "string" ? { label: s } : s
  );

  if (variant === "rail") {
    const isDark = theme === "dark";
    // Light theme circle dimensions
    // Outer ring: 88px, inner circle: 68px, gap between = (88-68)/2 = 10px
    const OUTER = 88;
    const INNER = 68;
    const connectorTop = OUTER / 2; // 44px — vertically centres the line on the circles

    return (
      <div className={`w-full overflow-x-auto no-scrollbar ${className}`}>
        <div
          className="flex items-start justify-between relative"
          style={{ minWidth: '900px', paddingLeft: '2rem', paddingRight: '2rem' }}
        >
          {/* Connector line — centred on the circles */}
          <svg
            className="absolute pointer-events-none"
            style={{
              left: '4rem',
              right: '4rem',
              top: `${connectorTop - 1}px`,
              width: 'calc(100% - 8rem)',
              height: '4px',
              overflow: 'visible',
            }}
            preserveAspectRatio="none"
          >
            <line
              x1="0" y1="2" x2="100%" y2="2"
              stroke="var(--color-primary)"
              strokeWidth={isDark ? "1.5" : "1"}
              strokeDasharray={
                connector === "dotted"
                  ? isDark ? "4 10" : "1 5"
                  : "none"
              }
              strokeLinecap="round"
              opacity={isDark ? 0.6 : 0.45}
            />
          </svg>

          {normalizedSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center relative z-10"
              style={{ width: `${100 / normalizedSteps.length}%` }}
            >
              {/* Circle wrapper — sized to hold both rings */}
              <div
                className="relative flex items-center justify-center flex-shrink-0"
                style={{ width: OUTER, height: OUTER }}
              >
                {isDark ? (
                  /* ── Dark theme: single green-bordered circle ── */
                  <div
                    className="absolute rounded-full flex items-center justify-center"
                    style={{
                      inset: (OUTER - INNER) / 2,
                      background: 'rgba(10,16,12,0.85)',
                      border: '1.5px solid var(--color-primary)',
                      boxShadow: '0 0 0 6px rgba(55,130,80,0.08)',
                    }}
                  >
                    {icons?.[index]
                      ? React.cloneElement(icons[index] as React.ReactElement<any>, {
                          className: 'w-8 h-8 text-white',
                          strokeWidth: 1.2,
                        })
                      : <span className="text-white">{index + 1}</span>}
                  </div>
                ) : (
                  /* ── Light theme: outer thin ring + inner white circle ── */
                  <>
                    {/* Outer thin ring */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: '1px solid var(--color-primary)',
                        opacity: 0.25,
                      }}
                    />
                    {/* Inner white circle with green border */}
                    <div
                      className="absolute rounded-full flex items-center justify-center bg-white"
                      style={{
                        inset: (OUTER - INNER) / 2,
                        border: '1px solid var(--color-primary)',
                      }}
                    >
                      {icons?.[index]
                        ? React.cloneElement(icons[index] as React.ReactElement<any>, {
                            className: 'w-7 h-7 text-charcoal',
                            strokeWidth: 1.2,
                          })
                        : <span className="text-charcoal">{index + 1}</span>}
                    </div>
                  </>
                )}
              </div>

              {/* Number + Label + Description */}
              <div className="mt-4 flex flex-col items-center text-center px-1">
                {showNumbers && (
                  <span className="text-[11px] font-bold text-primary mb-1">
                    0{index + 1}
                  </span>
                )}
                <span
                  className={`font-bold mb-1.5 leading-tight ${
                    isDark
                      ? 'text-[11px] tracking-[0.18em] uppercase text-white'
                      : 'text-[13px] text-charcoal'
                  }`}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span
                    className={`leading-relaxed text-center max-w-[130px] ${
                      isDark
                        ? 'text-[11px] text-white/45'
                        : 'text-[11px] text-dark-gray opacity-65'
                    }`}
                  >
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // default variant remains unchanged
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-medium-gray -z-10" />
        {normalizedSteps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          return (
            <div key={index} className="flex flex-col items-center relative z-10 bg-white px-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-body2 font-semibold transition-colors duration-300 ${
                  isActive || isCompleted
                    ? "bg-primary text-white border-2 border-primary"
                    : "bg-white text-dark-gray border-2 border-medium-gray"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={`mt-2 text-caption font-medium absolute top-8 whitespace-nowrap ${
                  isActive ? "text-primary" : "text-dark-gray"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-8" />
    </div>
  );
}
