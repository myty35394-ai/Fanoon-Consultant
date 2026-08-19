"use client";

import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import BlogCard, { type BlogPost } from "@/components/blog/BlogCard";

const CATEGORIES = [
  "All",
  "Architecture",
  "Interior Design",
  "Landscape Design",
  "Construction",
  "Sustainability",
  "Project Management",
  "Industry Insights",
];

const PAGE_SIZE = 9;

interface BlogGridProps {
  allPosts: BlogPost[];
}

export default function BlogGrid({ allPosts }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  /* ── Filter + Search ─────────────────────────────── */
  const filtered = useMemo(() => {
    return allPosts.filter((p) => {
      const matchesCategory =
        activeCategory === "All" ||
        p.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allPosts, activeCategory, searchQuery]);

  /* ── Pagination ──────────────────────────────────── */
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(0, page * PAGE_SIZE);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPage(1);
  };

  return (
    <div>
      {/* ── Filters Row ─────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-[11.5px] font-semibold uppercase tracking-[0.08em] transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary shadow-sm shadow-primary/30"
                  : "bg-white text-dark-gray border-[#e0e0e0] hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-shrink-0">
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search articles..."
            className="w-full md:w-[260px] pl-4 pr-10 py-2.5 border border-[#e0e0e0] rounded-[4px] bg-white text-[13px] text-charcoal placeholder:text-[#b0b0b0] focus:outline-none focus:border-primary transition-colors"
          />
          {searchQuery ? (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b0b0b0] hover:text-charcoal transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b0b0b0]"
              strokeWidth={2}
            />
          )}
        </div>
      </div>

      {/* ── Results count ───────────────────────────── */}
      <p className="text-[12px] text-dark-gray mb-7">
        Showing <span className="font-semibold text-charcoal">{paginated.length}</span> of{" "}
        <span className="font-semibold text-charcoal">{filtered.length}</span> article
        {filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "All" && (
          <> in <span className="text-primary font-semibold">{activeCategory}</span></>
        )}
        {searchQuery && (
          <> matching &ldquo;<span className="text-primary font-semibold">{searchQuery}</span>&rdquo;</>
        )}
      </p>

      {/* ── Grid ────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-dark-gray text-[15px] mb-2">No articles found.</p>
          <button
            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
            className="text-primary text-[13px] font-semibold underline hover:no-underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((post) => (
              <BlogCard key={post.id} post={post} variant="standard" />
            ))}
          </div>

          {/* Load More */}
          {page < totalPages && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-10 py-3.5 border border-[#d0d0d0] text-[12px] font-bold text-charcoal uppercase tracking-[0.12em] rounded-[4px] hover:border-primary hover:text-primary transition-all duration-200 bg-white"
              >
                LOAD MORE ({filtered.length - paginated.length} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
