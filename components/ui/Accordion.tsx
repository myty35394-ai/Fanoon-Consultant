"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  className = "",
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={`w-full border-t border-medium-gray ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);

        return (
          <div key={item.id} className="border-b border-medium-gray">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full py-5 flex items-center justify-between text-left focus:outline-none focus-visible:bg-light-gray transition-colors group"
              aria-expanded={isOpen}
            >
              <span className="text-h6 font-semibold text-charcoal group-hover:text-primary transition-colors">
                {item.title}
              </span>
              <div className="flex-shrink-0 ml-4 text-primary transition-transform duration-300">
                {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-body1 text-dark-gray">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
