"use client";

import React, { useState } from "react";
import FilterPill from "@/components/ui/FilterPill";
import ProjectCard, { ProjectCardProps } from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import {
  LayoutGrid,
  Building2,
  Sofa,
  Trees,
  Box,
  ClipboardList,
  HardHat,
  ChevronDown,
} from "lucide-react";

export interface ProjectData extends Omit<ProjectCardProps, "variant"> {
  // we add specific types if needed, but the props match
}

export interface PortfolioGridProps {
  initialProjects: ProjectData[];
}

const filterCategories = [
  { label: "All Projects", icon: <LayoutGrid />, value: "All Projects" },
  { label: "Architecture", icon: <Building2 />, value: "Architecture" },
  { label: "Interior Design", icon: <Sofa />, value: "Interior Design" },
  { label: "Landscape Design", icon: <Trees />, value: "Landscape Design" },
  { label: "3D Visualization", icon: <Box />, value: "3D Visualization" },
  { label: "Project Management", icon: <ClipboardList />, value: "Project Management" },
  { label: "Construction Supervision", icon: <HardHat />, value: "Construction Supervision" },
];

export default function PortfolioGrid({ initialProjects }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredProjects =
    activeFilter === "All Projects"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeFilter);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="bg-white">
      {/* 2. Filter Bar */}
      <div className="border-b border-light-gray/40">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
            {filterCategories.map((cat) => (
              <FilterPill
                key={cat.value}
                label={cat.label}
                icon={cat.icon}
                isActive={activeFilter === cat.value}
                onClick={() => {
                  setActiveFilter(cat.value);
                  setVisibleCount(8); // reset count on filter change
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Projects Grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProjects.map((project, idx) => (
            <ProjectCard
              key={`${project.title}-${idx}`}
              title={project.title}
              category={project.category}
              subtitle={project.subtitle}
              location={project.location}
              imageUrl={project.imageUrl}
              href={project.href}
              variant="default"
            />
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredProjects.length && (
          <div className="mt-16 text-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center justify-center border border-charcoal/20 text-charcoal rounded-full px-8 py-3 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 group"
            >
              LOAD MORE PROJECTS
              <ChevronDown className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
