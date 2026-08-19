"use client";

import React, { useState } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  className?: string;
}

export default function Tabs({ items, defaultActiveId, className = "" }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultActiveId || items[0]?.id);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex overflow-x-auto border-b border-medium-gray no-scrollbar">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`whitespace-nowrap px-6 py-3 font-medium text-body1 transition-colors relative focus:outline-none focus-visible:bg-light-gray ${
                isActive
                  ? "text-primary"
                  : "text-dark-gray hover:text-charcoal"
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
              )}
            </button>
          );
        })}
      </div>
      <div className="py-6">
        {items.find((item) => item.id === activeId)?.content}
      </div>
    </div>
  );
}
