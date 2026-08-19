import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  className = "",
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={textareaId} className="text-body2 font-semibold text-charcoal">
        {label}
      </label>
      <textarea
        id={textareaId}
        className={`bg-white border rounded-[var(--radius-button)] px-4 py-2.5 text-body1 text-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px] resize-y ${
          error ? "border-red-500 focus:ring-red-500" : "border-medium-gray"
        }`}
        {...props}
      />
      {error && <span className="text-caption text-red-500">{error}</span>}
    </div>
  );
}
