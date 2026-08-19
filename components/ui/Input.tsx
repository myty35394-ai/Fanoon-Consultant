import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={inputId} className="text-body2 font-semibold text-charcoal">
        {label}
      </label>
      <input
        id={inputId}
        className={`bg-white border rounded-[var(--radius-button)] px-4 py-2.5 text-body1 text-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          error ? "border-red-500 focus:ring-red-500" : "border-medium-gray"
        }`}
        {...props}
      />
      {error && <span className="text-caption text-red-500">{error}</span>}
    </div>
  );
}
