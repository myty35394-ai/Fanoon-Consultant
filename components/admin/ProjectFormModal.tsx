"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Loader2, Sparkles, User, Trash2, Users, Check } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export default function ProjectFormModal({
  isOpen,
  onClose,
  onSuccess,
  defaultTab = "fanoon",
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultTab?: "fanoon" | "arsalan";
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Architecture");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("2026");
  const [tagline, setTagline] = useState("");
  const [plotSize, setPlotSize] = useState("");
  const [area, setArea] = useState("");
  const [floors, setFloors] = useState("");
  const [scope, setScope] = useState("");
  const [status, setStatus] = useState("Completed");
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isArsalan, setIsArsalan] = useState(defaultTab === "arsalan");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allTeamMembers, setAllTeamMembers] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(false);

  // Sync isArsalan when defaultTab changes
  useEffect(() => {
    setIsArsalan(defaultTab === "arsalan");
  }, [defaultTab]);

  // Load team members when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setLoadingTeam(true);
    fetch("/api/admin/team")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.members)) setAllTeamMembers(data.members);
      })
      .catch(() => {})
      .finally(() => setLoadingTeam(false));
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddGalleryImage = (url: string) => {
    if (url && galleryImages.length < 5) {
      setGalleryImages([...galleryImages, url]);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, idx) => idx !== index));
  };

  const toggleTeamMember = (id: string) => {
    setSelectedTeamIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

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
          tagline,
          plotSize,
          area,
          floors,
          scope,
          status,
          coverImage: coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
          galleryImages: galleryImages.filter(Boolean),
          teamMembers: selectedTeamIds,
          description,
          featured,
          isArsalan,
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
        setTagline("");
        setPlotSize("");
        setArea("");
        setFloors("");
        setScope("");
        setStatus("Completed");
        setCoverImage("");
        setGalleryImages([]);
        setSelectedTeamIds([]);
        setDescription("");
        setFeatured(false);
        setIsArsalan(defaultTab === "arsalan");
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

          {/* Tagline */}
          <div>
            <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
              Tagline <span className="text-white/30 normal-case text-[10px] font-normal">(short hero subtitle)</span>
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Realistic. Detailed. Inspiring."
              className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>

          {/* Plot Size & Area */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
                Plot Size
              </label>
              <input
                type="text"
                value={plotSize}
                onChange={(e) => setPlotSize(e.target.value)}
                placeholder="e.g. 10 Marla / 1 Kanal"
                className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
                Built-up Area
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. 3,200 SQ FT"
                className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
          </div>

          {/* Floors & Scope */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
                Floors
              </label>
              <input
                type="text"
                value={floors}
                onChange={(e) => setFloors(e.target.value)}
                placeholder="e.g. G+1 / G+3"
                className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
                Scope
              </label>
              <input
                type="text"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                placeholder="e.g. Exterior Visualization"
                className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium text-white/70 uppercase tracking-wider mb-1.5">
              Project Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
            >
              <option value="Completed">Completed</option>
              <option value="Completed (2025)">Completed (2025)</option>
              <option value="Completed (2024)">Completed (2024)</option>
              <option value="Completed (2023)">Completed (2023)</option>
              <option value="Ongoing">Ongoing</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Construction">Under Construction</option>
            </select>
          </div>

          <ImageUploader
            value={coverImage}
            onChange={setCoverImage}
            folder="fanoon-consultants/projects"
            label="Cover Image *"
          />

          {/* 5 Project Gallery Images */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="block font-medium text-white/70 uppercase tracking-wider">
                Project Gallery Images ({galleryImages.length}/5)
              </label>
              <span className="text-[11px] text-white/40">Upload up to 5 photos for gallery</span>
            </div>

            {/* Current gallery previews */}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-5 gap-2.5">
                {galleryImages.map((imgUrl, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/20 group">
                    <Image src={imgUrl} alt={`Gallery image ${idx + 1}`} fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600/90 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/70 text-[9px] text-white font-bold rounded">
                      #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Upload next gallery slot if less than 5 */}
            {galleryImages.length < 5 && (
              <div className="p-3.5 bg-[#18221b] border border-white/10 border-dashed rounded-xl space-y-2">
                <ImageUploader
                  value=""
                  onChange={(url) => handleAddGalleryImage(url)}
                  folder="fanoon-consultants/projects/gallery"
                  label={`Add Gallery Photo (${galleryImages.length + 1} of 5)`}
                />
              </div>
            )}
          </div>

          {/* Team Member Selection */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="block font-medium text-white/70 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-primary" />
                Assign Team Members
                {selectedTeamIds.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-primary/20 text-primary rounded text-[10px] font-bold">
                    {selectedTeamIds.length} selected
                  </span>
                )}
              </label>
              <span className="text-[11px] text-white/40">Select who worked on this project</span>
            </div>

            <div className="bg-[#18221b] border border-white/10 rounded-xl p-3">
              {loadingTeam ? (
                <div className="flex items-center justify-center py-6 gap-2 text-white/40">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs">Loading team members...</span>
                </div>
              ) : allTeamMembers.length === 0 ? (
                <div className="text-center py-6 text-white/30 text-xs">
                  <User className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  No team members found. Add team members in the Team section first.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto no-scrollbar">
                  {allTeamMembers.map((member) => {
                    const isSelected = selectedTeamIds.includes(member.id);
                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => toggleTeamMember(member.id)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary/50 bg-primary/10"
                            : "border-white/10 bg-[#1c261f] hover:border-white/20"
                        }`}
                      >
                        {/* Avatar */}
                        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-[12px] truncate leading-tight ${isSelected ? "text-white" : "text-white/80"}`}>
                            {member.name}
                          </p>
                          <p className="text-[10px] text-white/40 truncate leading-tight mt-0.5">
                            {member.role}
                          </p>
                        </div>
                        {/* Check indicator */}
                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected ? "bg-primary border-primary" : "border-white/20"
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

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

          {/* Toggles */}
          <div className="space-y-3 pt-2 pb-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-[#1c261f] text-primary focus:ring-primary"
              />
              <span className="text-white/80 font-medium group-hover:text-white transition-colors">
                Feature on Homepage Carousel
              </span>
            </label>

            {/* Arsalan toggle */}
            <label className={`flex items-center gap-3 cursor-pointer group p-3 rounded-xl border transition-all ${
              isArsalan ? "bg-amber-500/10 border-amber-500/40" : "border-transparent"
            }`}>
              <input
                type="checkbox"
                id="isArsalan"
                checked={isArsalan}
                onChange={(e) => setIsArsalan(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-[#1c261f] text-amber-500 focus:ring-amber-500"
              />
              <User className={`w-4 h-4 flex-shrink-0 ${isArsalan ? "text-amber-400" : "text-white/40"}`} />
              <div>
                <p className={`font-semibold ${isArsalan ? "text-amber-400" : "text-white/80"} transition-colors`}>
                  Add to Ar. Arsalan&apos;s Portfolio
                </p>
                <p className="text-white/40 text-[11px] mt-0.5">
                  Shows this project on Arsalan&apos;s personal leadership portfolio page
                </p>
              </div>
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-white/10 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
