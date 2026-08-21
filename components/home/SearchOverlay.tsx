"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, FileText, Layers, Loader2, ArrowRight } from "lucide-react";

interface SearchResult {
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  location?: string | null;
  excerpt?: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<SearchResult[]>([]);
  const [posts, setPosts] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    if (!query || query.length < 2) {
      setProjects([]);
      setPosts([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setProjects(data.projects || []);
        setPosts(data.posts || []);
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setProjects([]);
      setPosts([]);
      setActiveIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const allResults = [
    ...projects.map(p => ({ ...p, type: "project" as const })),
    ...posts.map(p => ({ ...p, type: "post" as const })),
  ];

  const handleNavigate = useCallback((type: "project" | "post", slug: string) => {
    const path = type === "project" ? `/portfolio/${slug}` : `/blog/${slug}`;
    router.push(path);
    onClose();
  }, [router, onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(prev => Math.min(prev + 1, allResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, -1));
      } else if (e.key === "Enter" && activeIndex >= 0 && allResults[activeIndex]) {
        const item = allResults[activeIndex];
        handleNavigate(item.type, item.slug);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, allResults, activeIndex, handleNavigate]);

  if (!isOpen) return null;

  const hasResults = projects.length > 0 || posts.length > 0;
  const showEmpty = query.length >= 2 && !loading && !hasResults;

  let globalIndex = 0;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-20 md:pt-28 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" onClick={onClose} />

      {/* Search Panel */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Input Row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(-1); }}
            placeholder="Search projects, blog posts..."
            className="flex-1 text-base text-charcoal placeholder-gray-400 bg-transparent outline-none"
          />
          {loading && <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />}
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close search"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Results */}
        {(hasResults || showEmpty) && (
          <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <div className="px-5 pt-4 pb-2 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[11px] font-bold tracking-widest text-primary uppercase">Portfolio</span>
                </div>
                {projects.map((project) => {
                  const idx = globalIndex++;
                  return (
                    <button
                      key={project.slug}
                      onClick={() => handleNavigate("project", project.slug)}
                      className={`w-full flex items-center gap-4 px-5 py-3 text-left transition-colors ${
                        activeIndex === idx ? "bg-stone-50" : "hover:bg-stone-50"
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-charcoal truncate">{project.title}</p>
                        <p className="text-xs text-gray-400 truncate">{project.category}{project.location ? ` · ${project.location}` : ""}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Blog Posts */}
            {posts.length > 0 && (
              <div>
                <div className={`px-5 pb-2 flex items-center gap-2 ${projects.length > 0 ? "pt-3 border-t border-gray-50" : "pt-4"}`}>
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[11px] font-bold tracking-widest text-primary uppercase">Blog</span>
                </div>
                {posts.map((post) => {
                  const idx = globalIndex++;
                  return (
                    <button
                      key={post.slug}
                      onClick={() => handleNavigate("post", post.slug)}
                      className={`w-full flex items-center gap-4 px-5 py-3 text-left transition-colors ${
                        activeIndex === idx ? "bg-stone-50" : "hover:bg-stone-50"
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-charcoal truncate">{post.title}</p>
                        <p className="text-xs text-gray-400 truncate">{post.category}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Empty state */}
            {showEmpty && (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-gray-400">No results found for <span className="font-semibold text-charcoal">&ldquo;{query}&rdquo;</span></p>
                <p className="text-xs text-gray-300 mt-1">Try a different keyword</p>
              </div>
            )}
          </div>
        )}

        {/* Hint when empty */}
        {!hasResults && !showEmpty && query.length === 0 && (
          <div className="px-5 py-8 text-center">
            <p className="text-sm text-gray-400">Start typing to search across projects and blog posts</p>
            <div className="flex items-center justify-center gap-3 mt-4 text-[11px] text-gray-300">
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-gray-100 font-mono">↑↓</kbd> navigate</span>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-gray-100 font-mono">↵</kbd> open</span>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-gray-100 font-mono">Esc</kbd> close</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
