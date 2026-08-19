"use client";

import React, { useState } from "react";
import { X, Loader2, Sparkles } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

const CATEGORIES = [
  "Architecture",
  "Interior Design",
  "Landscape Design",
  "Construction",
  "Sustainability",
  "Project Management",
  "Industry Insights",
];

const READ_TIMES = [
  "3 MIN READ",
  "4 MIN READ",
  "5 MIN READ",
  "6 MIN READ",
  "8 MIN READ",
  "10 MIN READ",
];

export default function BlogPostFormModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Architecture");
  const [coverImage, setCoverImage] = useState("");
  const [readTime, setReadTime] = useState("5 MIN READ");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          category,
          coverImage:
            coverImage ||
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
          readTime,
          featured,
          published,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create post.");
      } else {
        onSuccess();
        onClose();
        // Reset
        setTitle("");
        setExcerpt("");
        setCoverImage("");
        setFeatured(false);
        setPublished(true);
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#141b16] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar p-6 md:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            New Blog Post
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Title */}
          <div>
            <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
              Post Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 10 Design Principles for Timeless Architecture"
              className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
              Excerpt *
            </label>
            <textarea
              required
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short summary shown on the blog listing page..."
              className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Category + Read Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
                Read Time
              </label>
              <select
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors"
              >
                {READ_TIMES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cover Image */}
          <ImageUploader
            value={coverImage}
            onChange={setCoverImage}
            folder="fanoon-consultants/blog"
            label="Cover Image *"
          />

          {/* Flags */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-[#1c261f] text-primary focus:ring-primary"
              />
              <span className="text-white/80 font-medium">Mark as Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-[#1c261f] text-primary focus:ring-primary"
              />
              <span className="text-white/80 font-medium">Publish immediately</span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-white/10 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Publish Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
