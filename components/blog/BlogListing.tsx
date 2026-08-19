"use client";

import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import BlogCard, { type BlogPost } from "@/components/blog/BlogCard";

interface BlogListingProps {
  allPosts: BlogPost[];
}

export default function BlogListing({ allPosts }: BlogListingProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allPosts;
    return allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [allPosts, searchQuery]);

  const featuredPosts = filtered.slice(0, 2);
  const standardPosts = filtered.slice(2);
  const isEmpty = filtered.length === 0;

  return (
    <>
      {/* Search + Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-[22px] font-bold text-charcoal">
          {searchQuery.trim()
            ? `Results for "${searchQuery}"`
            : "Latest Articles"}
        </h2>
        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full sm:w-[240px] pl-4 pr-10 py-2.5 border border-[#e0e0e0] rounded-[4px] bg-white text-[13px] text-charcoal placeholder:text-[#b0b0b0] focus:outline-none focus:border-primary transition-colors"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b0b0b0] hover:text-charcoal transition-colors"
              aria-label="Clear search"
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

      {/* No results */}
      {isEmpty ? (
        <div className="py-20 text-center">
          <p className="text-dark-gray text-[15px] mb-3">
            No articles match &ldquo;<span className="text-charcoal font-semibold">{searchQuery}</span>&rdquo;
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="text-primary text-[13px] font-semibold underline hover:no-underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          {/* Featured Posts (2-col) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 mb-10">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} variant="featured" />
            ))}
          </div>

          {/* Standard Posts (3-col) */}
          {standardPosts.length > 0 && (
            <>
              <div className="w-full h-px bg-[#ebebeb] mb-10" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {standardPosts.map((post) => (
                  <BlogCard key={post.id} post={post} variant="standard" />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* View All Articles — only show when not searching */}
      {!searchQuery.trim() && !isEmpty && (
        <div className="flex justify-center pt-4 border-t border-[#ebebeb]">
          <Link href="/blog/all">
            <button className="inline-flex items-center gap-3 px-10 py-3.5 border border-[#d0d0d0] text-[12px] font-bold text-charcoal uppercase tracking-[0.12em] rounded-[4px] hover:border-primary hover:text-primary transition-all duration-200 group bg-white">
              VIEW ALL ARTICLES
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </button>
          </Link>
        </div>
      )}

      {/* When searching, show a link to browse all */}
      {searchQuery.trim() && !isEmpty && (
        <div className="flex justify-center pt-4 border-t border-[#ebebeb]">
          <Link href={`/blog/all`}>
            <button className="inline-flex items-center gap-3 px-10 py-3.5 border border-[#d0d0d0] text-[12px] font-bold text-charcoal uppercase tracking-[0.12em] rounded-[4px] hover:border-primary hover:text-primary transition-all duration-200 group bg-white">
              BROWSE ALL ARTICLES
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
