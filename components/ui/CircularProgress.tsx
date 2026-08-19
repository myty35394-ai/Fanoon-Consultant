import React from "react";

export interface CircularProgressProps {
  value: number; // 0 to 100
  size?: number; // width and height in px
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export default function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  label,
  className = "",
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.max(0, Math.min(100, value)) / 100) * circumference;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-light-gray"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-h4 font-bold text-charcoal">{Math.round(value)}%</span>
        {label && <span className="text-caption font-medium text-dark-gray">{label}</span>}
      </div>
    </div>
  );
}
