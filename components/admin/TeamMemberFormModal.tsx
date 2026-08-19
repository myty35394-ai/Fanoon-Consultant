"use client";

import React, { useState } from "react";
import { X, Loader2, Users } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

export interface TeamMemberRecord {
  id: string;
  name: string;
  role: string;
  description: string | null;
  imageUrl: string;
  socialLink: string | null;
  order: number | null;
}

export default function TeamMemberFormModal({
  isOpen,
  onClose,
  onSuccess,
  editMember,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editMember?: TeamMemberRecord | null;
}) {
  const isEditing = !!editMember;

  const [name, setName] = useState(editMember?.name ?? "");
  const [role, setRole] = useState(editMember?.role ?? "");
  const [description, setDescription] = useState(editMember?.description ?? "");
  const [imageUrl, setImageUrl] = useState(editMember?.imageUrl ?? "");
  const [socialLink, setSocialLink] = useState(editMember?.socialLink ?? "");
  const [order, setOrder] = useState<number>(editMember?.order ?? 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync fields when editMember changes
  React.useEffect(() => {
    setName(editMember?.name ?? "");
    setRole(editMember?.role ?? "");
    setDescription(editMember?.description ?? "");
    setImageUrl(editMember?.imageUrl ?? "");
    setSocialLink(editMember?.socialLink ?? "");
    setOrder(editMember?.order ?? 0);
    setError("");
  }, [editMember]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = { name, role, description, imageUrl, socialLink, order };
      const res = await fetch(
        isEditing ? "/api/admin/team" : "/api/admin/team",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(isEditing ? { id: editMember!.id, ...payload } : payload),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save team member.");
      } else {
        onSuccess();
        onClose();
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors";

  const labelCls = "block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5";



  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#141b16] border border-white/10 rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            {isEditing ? "Edit Team Member" : "Add Team Member"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {error && (
            <div className="mb-5 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className={labelCls}>Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ar. Arsalan Haider"
                className={inputCls}
              />
            </div>

            {/* Role */}
            <div>
              <label className={labelCls}>Role / Title *</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Founder & Principal Architect"
                className={inputCls}
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelCls}>Short Bio</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of expertise and responsibilities..."
                className={inputCls}
              />
            </div>

            <ImageUploader
              value={imageUrl}
              onChange={setImageUrl}
              folder="fanoon-consultants/team"
              label="Photo"
            />

            {/* LinkedIn / Social */}
            <div>
              <label className={labelCls}>LinkedIn / Social URL</label>
              <input
                type="url"
                value={socialLink}
                onChange={(e) => setSocialLink(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className={inputCls}
              />
            </div>

            {/* Display Order */}
            <div>
              <label className={labelCls}>Display Order</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                min={0}
                className={inputCls}
              />
              <p className="text-white/30 text-[10px] mt-1">Lower number = appears first on About Us page</p>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg border border-white/10 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isEditing ? (
                  "Save Changes"
                ) : (
                  "Add Member"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
