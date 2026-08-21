"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Loader2,
  Sparkles,
  User,
  Trash2,
  Users,
  Check,
  Building2,
  Compass,
  HardHat,
  Trees,
  Box,
  ClipboardCheck,
  Info,
  ImageIcon,
  FileText,
  Sliders,
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

const CATEGORIES = [
  { id: "Architecture", label: "Architecture", icon: Building2 },
  { id: "Interior Design", label: "Interior Design", icon: Compass },
  { id: "Landscape Design", label: "Landscape Design", icon: Trees },
  { id: "3D Visualization", label: "3D Visualization", icon: Box },
  { id: "Construction Supervision", label: "Construction Supervision", icon: HardHat },
  { id: "Project Management", label: "Project Management", icon: ClipboardCheck },
];

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
  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Architecture");
  const [tagline, setTagline] = useState("");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("2026");
  const [status, setStatus] = useState("Completed");

  // Specs State
  const [plotSize, setPlotSize] = useState("");
  const [area, setArea] = useState("");
  const [floors, setFloors] = useState("");
  const [scope, setScope] = useState("");
  const [duration, setDuration] = useState("");
  const [constructionType, setConstructionType] = useState("");
  const [description, setDescription] = useState("");

  // Media State
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [spaceNames, setSpaceNames] = useState<string[]>([]);
  const [drawingImages, setDrawingImages] = useState<string[]>([]);

  // Team & Publishing State
  const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [isArsalan, setIsArsalan] = useState(defaultTab === "arsalan");

  // Materials & Finishes State (for Architecture, Interior, Landscape)
  const [matConcept, setMatConcept] = useState("");
  const [matQuote, setMatQuote] = useState("");
  const [matExterior, setMatExterior] = useState("");
  const [matFloors, setMatFloors] = useState("");
  const [matWalls, setMatWalls] = useState("");
  const [matCeiling, setMatCeiling] = useState("");
  const [matJoinery, setMatJoinery] = useState("");
  const [matMetal, setMatMetal] = useState("");
  const [matSustainable, setMatSustainable] = useState("");


  // Auxiliary
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allTeamMembers, setAllTeamMembers] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(false);

  // Sync default tab
  useEffect(() => {
    setIsArsalan(defaultTab === "arsalan");
  }, [defaultTab]);

  // Load team members
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
      setSpaceNames([...spaceNames, ""]);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, idx) => idx !== index));
    setSpaceNames(spaceNames.filter((_, idx) => idx !== index));
  };

  const handleSpaceNameChange = (index: number, name: string) => {
    const newNames = [...spaceNames];
    newNames[index] = name;
    setSpaceNames(newNames);
  };

  const handleAddDrawingImage = (url: string) => {
    if (url && drawingImages.length < 3) {
      setDrawingImages([...drawingImages, url]);
    }
  };

  const handleRemoveDrawingImage = (index: number) => {
    setDrawingImages(drawingImages.filter((_, idx) => idx !== index));
  };

  const toggleTeamMember = (id: string) => {
    setSelectedTeamIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isDrawingSupported =
    category === "Architecture" ||
    category === "Interior Design" ||
    category === "Landscape Design";

  const isMaterialsSupported =
    category === "Architecture" ||
    category === "Interior Design" ||
    category === "Landscape Design";

  const splitLines = (s: string) => s.split("\n").map(l => l.trim()).filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a project title.");
      return;
    }
    if (!coverImage.trim()) {
      setError("Please upload a main cover image.");
      return;
    }

    setLoading(true);
    setError("");

    // Build materialsData JSON if applicable
    const materialsData = isMaterialsSupported ? {
      concept: matConcept.trim() || undefined,
      quote: matQuote.trim() || undefined,
      exteriorFinishes: splitLines(matExterior).length ? splitLines(matExterior) : undefined,
      interiorFloors: splitLines(matFloors).length ? splitLines(matFloors) : undefined,
      interiorWalls: splitLines(matWalls).length ? splitLines(matWalls) : undefined,
      ceilingLighting: splitLines(matCeiling).length ? splitLines(matCeiling) : undefined,
      joineryMillwork: splitLines(matJoinery).length ? splitLines(matJoinery) : undefined,
      metalGlass: splitLines(matMetal).length ? splitLines(matMetal) : undefined,
      sustainableChoices: splitLines(matSustainable).length ? splitLines(matSustainable) : undefined,
    } : undefined;

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category,
          client: client.trim() || null,
          location: location.trim() || null,
          year: year.trim() || new Date().getFullYear().toString(),
          tagline: tagline.trim() || null,
          plotSize: plotSize.trim() || null,
          area: area.trim() || null,
          floors: floors.trim() || null,
          scope: scope.trim() || null,
          duration: duration.trim() || null,
          constructionType: constructionType.trim() || null,
          status: status.trim() || "Completed",
          coverImage: coverImage.trim(),
          galleryImages: galleryImages.filter(Boolean),
          spaceNames,
          drawingImages: isDrawingSupported ? drawingImages.filter(Boolean) : [],
          teamMembers: selectedTeamIds,
          description: description.trim() || null,
          materialsData: materialsData ? JSON.stringify(materialsData) : null,
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
        // Reset fields
        setTitle("");
        setTagline("");
        setClient("");
        setLocation("");
        setYear("2026");
        setStatus("Completed");
        setPlotSize("");
        setArea("");
        setFloors("");
        setScope("");
        setDuration("");
        setConstructionType("");
        setDescription("");
        setCoverImage("");
        setGalleryImages([]);
        setSpaceNames([]);
        setDrawingImages([]);
        setSelectedTeamIds([]);
        setFeatured(false);
        setIsArsalan(defaultTab === "arsalan");
        setMatConcept(""); setMatQuote(""); setMatExterior(""); setMatFloors("");
        setMatWalls(""); setMatCeiling(""); setMatJoinery(""); setMatMetal(""); setMatSustainable("");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#121814] border border-white/10 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#151e18] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                Add New Project
              </h2>
              <p className="text-xs text-white/50">
                Fill in the details below to publish a new portfolio project
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── ERROR MESSAGE ───────────────────────────────────── */}
        {error && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError("")} className="text-red-400 hover:text-red-200">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ── SCROLLABLE FORM BODY ────────────────────────────── */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto no-scrollbar space-y-6 flex-1 text-xs">
          {/* 1. CATEGORY SELECTOR */}
          <div>
            <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-2">
              1. Select Project Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary/20 border-primary text-white font-bold ring-1 ring-primary"
                        : "bg-[#18221b] border-white/8 text-white/70 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? "text-primary" : "text-white/40"}`} />
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. BASIC INFORMATION */}
          <div className="p-4 bg-[#162019] border border-white/8 rounded-xl space-y-3.5">
            <h3 className="text-xs font-bold text-white/90 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/6 pb-2">
              <FileText className="w-3.5 h-3.5 text-primary" /> Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern Residential Villa"
                  className="w-full bg-[#1b271f] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">
                  Subtitle / Tagline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Luxury Living in Islamabad"
                  className="w-full bg-[#1b271f] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="e.g. Private Client"
                  className="w-full bg-[#1b271f] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Islamabad, Pakistan"
                  className="w-full bg-[#1b271f] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2026"
                  className="w-full bg-[#1b271f] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-[#1b271f] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary text-xs"
                >
                  <option value="Completed">Completed</option>
                  <option value="Completed (2026)">Completed (2026)</option>
                  <option value="Completed (2025)">Completed (2025)</option>
                  <option value="Completed (2024)">Completed (2024)</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. SPECIFICATIONS & OVERVIEW */}
          <div className="p-4 bg-[#162019] border border-white/8 rounded-xl space-y-3.5">
            <h3 className="text-xs font-bold text-white/90 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/6 pb-2">
              <Sliders className="w-3.5 h-3.5 text-primary" /> {category} Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">
                  {category === "Landscape Design"
                    ? "Total Land Area"
                    : category === "Interior Design"
                    ? "Interior Area"
                    : category === "Construction Supervision"
                    ? "Covered Area"
                    : "Plot Size"}
                </label>
                <input
                  type="text"
                  value={plotSize}
                  onChange={(e) => setPlotSize(e.target.value)}
                  placeholder={
                    category === "Landscape Design"
                      ? "e.g. 125 Acres / 2 Kanal"
                      : category === "Interior Design"
                      ? "e.g. 3,500 SQ FT"
                      : category === "Construction Supervision"
                      ? "e.g. 180,000 SQ FT"
                      : "e.g. 1 Kanal / 10 Marla"
                  }
                  className="w-full bg-[#1b271f] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">
                  {category === "Landscape Design"
                    ? "Greenery / Flora"
                    : category === "Interior Design"
                    ? "Design Style / Theme"
                    : category === "Construction Supervision"
                    ? "Structure Type"
                    : category === "3D Visualization"
                    ? "Software Engine"
                    : "Built-up Area"}
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder={
                    category === "Landscape Design"
                      ? "e.g. 65% Native Trees"
                      : category === "Interior Design"
                      ? "e.g. Contemporary Luxury"
                      : category === "Construction Supervision"
                      ? "e.g. RCC Frame"
                      : category === "3D Visualization"
                      ? "e.g. 3ds Max / Corona"
                      : "e.g. 4,500 SQ FT"
                  }
                  className="w-full bg-[#1b271f] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">
                  {category === "Landscape Design"
                    ? "Pathways Length"
                    : category === "Construction Supervision"
                    ? "Building Floors"
                    : category === "Project Management"
                    ? "Duration"
                    : "Floors / Levels"}
                </label>
                <input
                  type="text"
                  value={floors}
                  onChange={(e) => setFloors(e.target.value)}
                  placeholder={
                    category === "Landscape Design"
                      ? "e.g. 2.5 KM Tracks"
                      : category === "Construction Supervision"
                      ? "e.g. 2 Basements + G+8"
                      : "e.g. G+1 / G+2"
                  }
                  className="w-full bg-[#1b271f] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-semibold text-white/70 mb-1">
                  Project Scope
                </label>
                <input
                  type="text"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  placeholder="e.g. Full Architectural Design, Interior Detailing & 3D Visualization"
                  className="w-full bg-[#1b271f] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-primary text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-white/70 mb-1">
                Project Overview &amp; Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of the project concept, spatial layout, and design highlights..."
                className="w-full bg-[#1b271f] border border-white/10 rounded-lg p-3 text-white placeholder-white/30 focus:outline-none focus:border-primary text-xs leading-relaxed"
              />
            </div>
          </div>

          {/* 4. MEDIA UPLOAD (Cover, Gallery, Drawings) */}
          <div className="p-4 bg-[#162019] border border-white/8 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-white/90 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/6 pb-2">
              <ImageIcon className="w-3.5 h-3.5 text-primary" /> Project Photos &amp; Drawings
            </h3>

            {/* A. Cover Image */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-white/80">
                1. Main Cover Image * (Hero banner)
              </label>
              <ImageUploader
                value={coverImage}
                onChange={setCoverImage}
                folder="fanoon-consultants/projects"
                label=""
              />
            </div>

            {/* B. Gallery Photos (Max 5) */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-semibold text-white/80">
                  2. Gallery Photos ({galleryImages.length}/5 uploaded)
                </label>
                <span className="text-[10px] text-white/40">Max 5 images</span>
              </div>

              {galleryImages.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div
                        className="relative aspect-square rounded-lg overflow-hidden border border-white/15 group"
                      >
                        <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-200 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={spaceNames[idx] || ""}
                        onChange={(e) => handleSpaceNameChange(idx, e.target.value)}
                        placeholder={`Space ${idx + 1} Name`}
                        className="w-full bg-[#1b271f] border border-white/10 rounded p-1.5 text-white placeholder-white/40 focus:outline-none focus:border-primary text-[10px] text-center"
                      />
                    </div>
                  ))}
                </div>
              )}

              {galleryImages.length < 5 && (
                <ImageUploader
                  value=""
                  onChange={(url) => handleAddGalleryImage(url)}
                  folder="fanoon-consultants/projects/gallery"
                  label={`+ Add Gallery Photo (${galleryImages.length + 1} of 5)`}
                />
              )}
            </div>

            {/* C. Technical Drawings (Max 3) */}
            {isDrawingSupported && (
              <div className="space-y-2 pt-2 border-t border-white/6">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-semibold text-white/80">
                    3. Technical Drawings &amp; Blueprints ({drawingImages.length}/3 uploaded)
                  </label>
                  <span className="text-[10px] text-white/40">Max 3 drawings</span>
                </div>

                {drawingImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {drawingImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/15 group"
                      >
                        <Image src={img} alt={`Drawing ${idx + 1}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveDrawingImage(idx)}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-200 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/80 text-[9px] text-primary font-bold rounded">
                          Plan #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {drawingImages.length < 3 && (
                  <ImageUploader
                    value=""
                    onChange={(url) => handleAddDrawingImage(url)}
                    folder="fanoon-consultants/projects/drawings"
                    label={`+ Add Drawing Plan (${drawingImages.length + 1} of 3)`}
                  />
                )}
              </div>
            )}
          </div>

          {/* 5. MATERIALS & FINISHES (Architecture, Interior, Landscape only) */}
          {isMaterialsSupported && (
            <div className="p-4 bg-[#162019] border border-white/8 rounded-xl space-y-4">
              <div className="border-b border-white/6 pb-2 flex items-start justify-between">
                <h3 className="text-xs font-bold text-white/90 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-primary" /> Materials &amp; Finishes
                </h3>
                <span className="text-[10px] text-white/40 italic">Optional — leave blank to use smart defaults</span>
              </div>

              {/* Concept description */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-white/70">Concept Paragraph</label>
                <textarea
                  rows={2}
                  value={matConcept}
                  onChange={(e) => setMatConcept(e.target.value)}
                  placeholder="Describe the overall material philosophy and palette for this project..."
                  className="w-full bg-[#1b271f] border border-white/10 rounded-lg p-3 text-white placeholder-white/25 focus:outline-none focus:border-primary text-xs leading-relaxed"
                />
              </div>

              {/* Blockquote */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-white/70">Featured Quote</label>
                <input
                  type="text"
                  value={matQuote}
                  onChange={(e) => setMatQuote(e.target.value)}
                  placeholder="e.g. Quality materials, thoughtful details and expert craftsmanship..."
                  className="w-full bg-[#1b271f] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/25 focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <p className="text-[10px] text-white/40 -mt-1">For the sections below, enter <strong className="text-white/60">one item per line</strong>. E.g. &ldquo;Marble Flooring (Entrance)&rdquo;</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category !== "Interior Design" && (
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-white/70">
                      {category === "Landscape Design" ? "Hardscape & Surfaces" : "Exterior Finishes"}
                    </label>
                    <textarea rows={3} value={matExterior} onChange={(e) => setMatExterior(e.target.value)}
                      placeholder={"Natural Stone Cladding\nTextured Paint (Beige)\nWood Look Aluminum Louvers"}
                      className="w-full bg-[#1b271f] border border-white/10 rounded-lg p-2.5 text-white placeholder-white/20 focus:outline-none focus:border-primary text-[11px] leading-relaxed font-mono"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-white/70">
                    {category === "Landscape Design" ? "Paving & Flooring" : "Interior Finishes – Floors"}
                  </label>
                  <textarea rows={3} value={matFloors} onChange={(e) => setMatFloors(e.target.value)}
                    placeholder={"Marble Flooring (Entrance & Lobby)\nLarge Format Porcelain Tiles (Living)\nEngineered Wood (Bedrooms)"}
                    className="w-full bg-[#1b271f] border border-white/10 rounded-lg p-2.5 text-white placeholder-white/20 focus:outline-none focus:border-primary text-[11px] leading-relaxed font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-white/70">
                    {category === "Landscape Design" ? "Vertical Elements" : "Interior Finishes – Walls"}
                  </label>
                  <textarea rows={3} value={matWalls} onChange={(e) => setMatWalls(e.target.value)}
                    placeholder={"Paint Finish (Warm White)\nWood Wall Paneling (Accent Walls)\nNatural Stone Veneer (Feature Walls)"}
                    className="w-full bg-[#1b271f] border border-white/10 rounded-lg p-2.5 text-white placeholder-white/20 focus:outline-none focus:border-primary text-[11px] leading-relaxed font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-white/70">
                    {category === "Landscape Design" ? "Overhead Structures" : "Ceiling & Lighting"}
                  </label>
                  <textarea rows={3} value={matCeiling} onChange={(e) => setMatCeiling(e.target.value)}
                    placeholder={"False Ceiling with Cove Lighting\nWooden Ceiling Cladding\nRecessed LED Downlights"}
                    className="w-full bg-[#1b271f] border border-white/10 rounded-lg p-2.5 text-white placeholder-white/20 focus:outline-none focus:border-primary text-[11px] leading-relaxed font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-white/70">
                    {category === "Landscape Design" ? "Furniture & Structures" : "Joinery & Millwork"}
                  </label>
                  <textarea rows={3} value={matJoinery} onChange={(e) => setMatJoinery(e.target.value)}
                    placeholder={"Wooden Doors & Frames\nBuilt-in Wardrobes (Wood Finish)\nKitchen Cabinetry (Matte Finish)"}
                    className="w-full bg-[#1b271f] border border-white/10 rounded-lg p-2.5 text-white placeholder-white/20 focus:outline-none focus:border-primary text-[11px] leading-relaxed font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-white/70">
                    {category === "Landscape Design" ? "Metalwork & Accessories" : "Metal & Glass Details"}
                  </label>
                  <textarea rows={3} value={matMetal} onChange={(e) => setMatMetal(e.target.value)}
                    placeholder={"Black Metal Handrail\nBrass/Gold Metal Accents\nGlass Partition (Frameless)"}
                    className="w-full bg-[#1b271f] border border-white/10 rounded-lg p-2.5 text-white placeholder-white/20 focus:outline-none focus:border-primary text-[11px] leading-relaxed font-mono"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-white/70">Sustainable Choices</label>
                  <textarea rows={3} value={matSustainable} onChange={(e) => setMatSustainable(e.target.value)}
                    placeholder={"Energy-efficient windows for better insulation\nNatural materials for a healthier environment\nLED lighting for energy savings"}
                    className="w-full bg-[#1b271f] border border-white/10 rounded-lg p-2.5 text-white placeholder-white/20 focus:outline-none focus:border-primary text-[11px] leading-relaxed font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 6. TEAM & PUBLISHING SETTINGS */}
          <div className="p-4 bg-[#162019] border border-white/8 rounded-xl space-y-3.5">
            <h3 className="text-xs font-bold text-white/90 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/6 pb-2">
              <Users className="w-3.5 h-3.5 text-primary" /> Team Members &amp; Settings
            </h3>

            {/* Team Picker */}
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-white/70">
                Select Team Members on this Project ({selectedTeamIds.length} selected):
              </label>

              {loadingTeam ? (
                <div className="py-4 text-center text-white/40">
                  <Loader2 className="w-4 h-4 animate-spin mx-auto mb-1" />
                  Loading team...
                </div>
              ) : allTeamMembers.length === 0 ? (
                <div className="text-white/40 text-[11px] py-2">No team members added yet.</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-44 overflow-y-auto no-scrollbar">
                  {allTeamMembers.map((member) => {
                    const isSelected = selectedTeamIds.includes(member.id);
                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => toggleTeamMember(member.id)}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-primary/20 border-primary text-white font-semibold"
                            : "bg-[#1b271f] border-white/6 text-white/70 hover:border-white/15 hover:text-white"
                        }`}
                      >
                        <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-white/10">
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="truncate text-[11px]">{member.name}</span>
                        {isSelected && <Check className="w-3 h-3 text-primary ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-white/6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-[#1b271f] text-primary focus:ring-primary"
                />
                <span className="text-white/80 text-xs">Feature on Homepage Carousel</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isArsalan}
                  onChange={(e) => setIsArsalan(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-[#1b271f] text-amber-500 focus:ring-amber-500"
                />
                <span className="text-amber-300 text-xs font-medium">
                  Add to Ar. Arsalan&apos;s Portfolio
                </span>
              </label>
            </div>
          </div>

          {/* ── MODAL FOOTER ────────────────────────────────────── */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-primary/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Publish Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



