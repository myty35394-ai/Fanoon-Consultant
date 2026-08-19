import React from "react";

export interface FilterPillProps {
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
}

export default function FilterPill({
  label,
  icon,
  isActive = false,
  onClick,
}: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold tracking-wider transition-all duration-300 flex-shrink-0
        ${
          isActive
            ? "bg-primary text-white border border-primary shadow-sm"
            : "bg-white text-dark-gray border border-medium-gray/50 hover:border-primary/50 hover:text-primary"
        }
      `}
    >
      {icon && (
        <span
          className={`flex items-center justify-center ${
            isActive ? "text-white" : "text-dark-gray opacity-70"
          }`}
        >
          {React.cloneElement(icon as React.ReactElement<any>, {
            className: "w-4 h-4",
            strokeWidth: 1.5,
          })}
        </span>
      )}
      {label}
    </button>
  );
}
