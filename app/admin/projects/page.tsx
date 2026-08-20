"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, FolderKanban, Loader2, User } from "lucide-react";
import ProjectFormModal from "@/components/admin/ProjectFormModal";

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string | null;
  location: string | null;
  year: string | null;
  coverImage: string;
  description: string | null;
  featured: boolean | null;
  isArsalan: boolean | null;
  createdAt: Date;
}

type Tab = "fanoon" | "arsalan";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("fanoon");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const fanoonProjects = projects.filter((p) => !p.isArsalan);
  const arsalanProjects = projects.filter((p) => p.isArsalan);
  const displayedProjects = activeTab === "fanoon" ? fanoonProjects : arsalanProjects;

  const tabs: { id: Tab; label: string; count: number; color: string }[] = [
    { id: "fanoon", label: "Fanoon Portfolio", count: fanoonProjects.length, color: "text-primary" },
    { id: "arsalan", label: "Ar. Arsalan Portfolio", count: arsalanProjects.length, color: "text-amber-400" },
  ];

  return (
    <div className="space-y-8 w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Portfolio Projects ({projects.length})
          </h1>
          <p className="text-white/60 text-sm">
            Manage and publish architectural works. Changes reflect instantly on the live website.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          Add New Project
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[#0d1410] rounded-xl p-1.5 border border-white/8 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === tab.id
                ? "bg-[#1c2820] text-white shadow-md border border-white/10"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            {tab.id === "arsalan" && <User className="w-3.5 h-3.5 text-amber-400" />}
            <span className={activeTab === tab.id ? tab.color : ""}>{tab.label}</span>
            <span
              className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                activeTab === tab.id ? "bg-primary/20 text-primary" : "bg-white/5 text-white/40"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab description */}
      {activeTab === "arsalan" && (
        <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl text-xs text-amber-300/80">
          <User className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
          <p>
            Projects in this tab are shown on <strong className="text-amber-400">Ar. Arsalan Haider&apos;s personal portfolio page</strong> at{" "}
            <code className="text-amber-300 bg-amber-500/10 px-1 rounded">/about-us/our-leadership/portfolio</code>.
            They do <em>not</em> appear on the main Fanoon portfolio unless toggled back.
          </p>
        </div>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div className="p-16 flex items-center justify-center text-white/40 gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span>Loading projects from Neon DB...</span>
        </div>
      ) : displayedProjects.length === 0 ? (
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-12 text-center space-y-4">
          <FolderKanban className="w-12 h-12 text-white/20 mx-auto" />
          <h3 className="text-lg font-bold text-white">
            No {activeTab === "arsalan" ? "Arsalan" : "Fanoon"} projects found
          </h3>
          <p className="text-white/50 text-xs max-w-sm mx-auto">
            {activeTab === "arsalan"
              ? "Add a project and tick “Add to Arsalan’s Portfolio” to show it here."
              : "Get started by adding your first project entry."}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            Add First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((prj) => (
            <div
              key={prj.id}
              className={`bg-[#141b16] border rounded-xl overflow-hidden group hover:border-white/20 transition-all flex flex-col ${
                prj.isArsalan ? "border-amber-500/20" : "border-white/10"
              }`}
            >
              {/* Cover Image Thumbnail */}
              <div className="relative aspect-[16/10] bg-[#1c261f] overflow-hidden">
                <Image
                  src={prj.coverImage}
                  alt={prj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {prj.featured && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-black px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md">
                    Featured
                  </span>
                )}
                {prj.isArsalan && (
                  <span className="absolute top-3 left-3 bg-amber-500/90 text-black px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <User className="w-2.5 h-2.5" /> Arsalan
                  </span>
                )}
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-primary border border-primary/30 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                  {prj.category}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-white text-base mb-1.5 line-clamp-1">{prj.title}</h3>
                  <p className="text-white/50 text-xs line-clamp-2 leading-relaxed">
                    {prj.description || "No description provided."}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                  <div>
                    {prj.location && <span>{prj.location}</span>}
                    {prj.year && <span> • {prj.year}</span>}
                  </div>
                  <button
                    onClick={() => handleDelete(prj.id, prj.title)}
                    className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Modal */}
      <ProjectFormModal
        isOpen={isModalOpen}
        defaultTab={activeTab}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProjects}
      />
    </div>
  );
}
