"use client";

import React, { useState } from "react";
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from "lucide-react";

export type AlertVariant = "success" | "info" | "warning" | "error";

export interface AlertProps {
  variant?: AlertVariant;
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export default function Alert({
  variant = "info",
  message,
  onDismiss,
  className = "",
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  const variants = {
    success: {
      bg: "bg-[#edf7ed]",
      border: "border-[#4caf50]",
      text: "text-[#1e4620]",
      icon: <CheckCircle2 className="w-5 h-5 text-[#4caf50]" />,
    },
    info: {
      bg: "bg-[#e5f6fd]",
      border: "border-[#03a9f4]",
      text: "text-[#014361]",
      icon: <Info className="w-5 h-5 text-[#03a9f4]" />,
    },
    warning: {
      bg: "bg-[#fff4e5]",
      border: "border-[#ff9800]",
      text: "text-[#663c00]",
      icon: <AlertTriangle className="w-5 h-5 text-[#ff9800]" />,
    },
    error: {
      bg: "bg-[#fdeded]",
      border: "border-[#ef5350]",
      text: "text-[#5f2120]",
      icon: <XCircle className="w-5 h-5 text-[#ef5350]" />,
    },
  };

  const currentStyle = variants[variant];

  return (
    <div
      className={`flex items-start p-4 rounded-[var(--radius-button)] border ${currentStyle.bg} ${currentStyle.border} ${className}`}
      role="alert"
    >
      <div className="flex-shrink-0 mr-3 mt-0.5">{currentStyle.icon}</div>
      <div className={`flex-1 text-body2 font-medium ${currentStyle.text}`}>
        {message}
      </div>
      <button
        onClick={handleDismiss}
        className={`flex-shrink-0 ml-3 mt-0.5 opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-1 rounded-sm ${currentStyle.text}`}
        aria-label="Dismiss alert"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
