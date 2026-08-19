"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

export default function AdminInvoiceDetailClient({ invoice }: { invoice: any }) {
  const [status, setStatus] = useState(invoice.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/invoices/${invoice.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
      }
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative">
      {isUpdating && (
        <div className="absolute inset-0 bg-[#141b16]/80 flex items-center justify-center rounded-lg z-10">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
        </div>
      )}
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#1c261f] border transition-colors focus:outline-none appearance-none ${
          status === "pending"
            ? "text-amber-400 border-amber-500/40"
            : status === "processing"
            ? "text-blue-400 border-blue-500/40"
            : status === "paid"
            ? "text-emerald-400 border-emerald-500/40"
            : "text-red-400 border-red-500/40"
        }`}
      >
        <option value="pending" className="bg-[#1c261f] text-amber-400">PENDING (Unpaid)</option>
        <option value="processing" className="bg-[#1c261f] text-blue-400">PROCESSING (Verifying)</option>
        <option value="paid" className="bg-[#1c261f] text-emerald-400">PAID (Verified)</option>
        <option value="cancelled" className="bg-[#1c261f] text-red-400">CANCELLED</option>
      </select>
    </div>
  );
}
