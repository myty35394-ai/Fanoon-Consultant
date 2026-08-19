import React from "react";
import { ArrowRight, Download, LucideIcon } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "primary-outline"
  | "secondary"
  | "secondary-outline"
  | "text";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: "arrow-right" | "download" | LucideIcon;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  icon,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center uppercase tracking-medium rounded-[var(--radius-button)] px-6 py-3 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark border border-transparent",
    "primary-outline":
      "bg-white border-2 border-charcoal text-charcoal hover:bg-primary-light hover:border-primary-light",
    secondary:
      "bg-charcoal text-white hover:bg-dark-gray border border-transparent",
    "secondary-outline":
      "bg-white border-2 border-medium-gray text-charcoal hover:border-charcoal",
    text: "bg-transparent text-primary hover:text-primary-dark p-0 group",
  };

  const IconComponent =
    icon === "arrow-right"
      ? ArrowRight
      : icon === "download"
      ? Download
      : icon;

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {IconComponent && (
        <IconComponent
          className={`ml-2 h-5 w-5 ${
            variant === "text"
              ? "transition-transform group-hover:translate-x-1"
              : ""
          }`}
        />
      )}
    </button>
  );
}
