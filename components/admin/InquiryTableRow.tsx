"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, Trash2, Mail, Phone } from "lucide-react";

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: string | null;
  createdAt: Date;
}

export default function InquiryTableRow({ inquiry }: { inquiry: InquiryRecord }) {
  const [status, setStatus] = useState(inquiry.status || "pending");
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete inquiry from ${inquiry.name}?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeleted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (deleted) return null;

  return (
    <tr className="hover:bg-white/5 transition-colors group">
      <td className="p-4 pl-6">
        <div className="font-semibold text-white text-[13px]">{inquiry.name}</div>
        <div className="text-[11px] text-white/40">{new Date(inquiry.createdAt).toLocaleDateString()}</div>
      </td>

      <td className="p-4">
        <div className="flex items-center gap-1.5 text-white/90">
          <Mail className="w-3.5 h-3.5 text-primary" />
          <a href={`mailto:${inquiry.email}`} className="hover:underline">{inquiry.email}</a>
        </div>
        {inquiry.phone && (
          <div className="flex items-center gap-1.5 text-white/50 mt-1">
            <Phone className="w-3 h-3 text-white/40" />
            <a href={`tel:${inquiry.phone}`} className="hover:underline">{inquiry.phone}</a>
          </div>
        )}
      </td>

      <td className="p-4">
        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[11px] font-medium text-white/80">
          {inquiry.service || "General Inquiry"}
        </span>
      </td>

      <td className="p-4 max-w-xs">
        <p className="line-clamp-2 text-white/70 text-[12px] leading-relaxed">
          {inquiry.message}
        </p>
      </td>

      <td className="p-4">
        <select
          value={status}
          disabled={loading}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-[#1c261f] border transition-colors focus:outline-none ${
            status === "pending"
              ? "text-amber-400 border-amber-500/40"
              : status === "reviewed"
              ? "text-emerald-400 border-emerald-500/40"
              : "text-white/40 border-white/20"
          }`}
        >
          <option value="pending" className="bg-[#141b16] text-amber-400">PENDING</option>
          <option value="reviewed" className="bg-[#141b16] text-emerald-400">REVIEWED</option>
          <option value="archived" className="bg-[#141b16] text-white/40">ARCHIVED</option>
        </select>
      </td>

      <td className="p-4 pr-6 text-right">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          title="Delete Inquiry"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
