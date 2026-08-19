import React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export default function Select({
  label,
  error,
  options,
  className = "",
  id,
  ...props
}: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={selectId} className="text-body2 font-semibold text-charcoal">
        {label}
      </label>
      <select
        id={selectId}
        className={`bg-white border rounded-[var(--radius-button)] px-4 py-2.5 text-body1 text-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none ${
          error ? "border-red-500 focus:ring-red-500" : "border-medium-gray"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.5rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-caption text-red-500">{error}</span>}
    </div>
  );
}
