import React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

export default function Checkbox({
  label,
  className = "",
  id,
  ...props
}: CheckboxProps) {
  const checkboxId = id || "checkbox-" + Math.random().toString(36).substring(2, 9);

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="relative flex items-center pt-0.5">
        <input
          type="checkbox"
          id={checkboxId}
          className="peer appearance-none w-5 h-5 border-2 border-medium-gray rounded-sm bg-white checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors cursor-pointer"
          {...props}
        />
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <label
        htmlFor={checkboxId}
        className="text-body2 text-dark-gray cursor-pointer select-none [&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary-dark"
      >
        {label}
      </label>
    </div>
  );
}
