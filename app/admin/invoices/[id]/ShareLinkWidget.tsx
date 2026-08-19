"use client";

import React, { useState } from "react";
import { Copy, Link2, Check } from "lucide-react";

export default function ShareLinkWidget({ shareLink }: { shareLink: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-[#141b16] border border-primary/20 rounded-2xl p-6">
      <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
        <Link2 className="w-4 h-4 text-primary" /> Client Share Link
      </h2>
      <p className="text-white/60 text-xs mb-4 leading-relaxed">
        Copy this link and send it to your client. They will use this page to view the invoice and upload their payment proof.
      </p>
      <div className="relative flex items-center">
        <input 
          type="text" 
          readOnly 
          value={shareLink}
          className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-xs text-primary font-mono pr-12 focus:outline-none focus:border-primary/50"
        />
        <button 
          onClick={handleCopy}
          className="absolute right-2 p-1.5 bg-white/5 hover:bg-white/10 rounded-md text-white/70 hover:text-white transition-colors flex items-center justify-center"
          title="Copy Link"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
