"use client";

import React, { useState } from "react";
import { X, Loader2, Sparkles } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function ProjectFormModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Architecture");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("2026");
  const [coverImage, setCoverImage] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          client,
          location,
          year,
          coverImage: coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
          description,
          featured,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create project.");
      } else {
        onSuccess();
        onClose();
        // Reset form
        setTitle("");
        setClient("");
        setLocation("");
        setCoverImage("");
        setDescription("");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#141b16] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Add New Project
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
          <div>
            <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Modern Residential Villa"
              className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
              >
                <option value="Architecture">Architecture</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Landscape Design">Landscape Design</option>
                <option value="3D Visualization">3D Visualization</option>
                <option value="Project Management">Project Management</option>
                <option value="Construction Supervision">Construction Supervision</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
                Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
                Client Name
              </label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Private Client"
                className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Islamabad, Pakistan"
                className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
          </div>

          <ImageUploader
            value={coverImage}
            onChange={setCoverImage}
            folder="fanoon-consultants/projects"
            label="Cover Image"
          />

          <div>
            <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
              Project Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the design concept and architectural details..."
              className="w-full bg-[#1c261f] border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-[#1c261f] text-primary focus:ring-primary"
            />
            <label htmlFor="featured" className="text-white/80 font-medium">
              Feature on Homepage Carousel
            </label>
          </div>

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
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
