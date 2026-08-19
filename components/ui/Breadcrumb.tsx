import React from "react";

export interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[12px] font-medium tracking-wide ${className}`}>
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              {item.href ? (
                <a
                  href={item.href}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-white font-semibold">
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <span className="mx-2 text-white/40 select-none">/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
