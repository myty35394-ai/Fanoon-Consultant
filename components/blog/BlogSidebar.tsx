"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Layers,
  Leaf,
  HardHat,
  Sprout,
  BarChart2,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import type { BlogPost } from "./BlogCard";

interface Category {
  name: string;
  count: number;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { name: "Architecture", count: 18, icon: <Home /> },
  { name: "Interior Design", count: 14, icon: <Layers /> },
  { name: "Landscape Design", count: 10, icon: <Leaf /> },
  { name: "Construction", count: 12, icon: <HardHat /> },
  { name: "Sustainability", count: 9, icon: <Sprout /> },
  { name: "Project Management", count: 8, icon: <BarChart2 /> },
  { name: "Industry Insights", count: 15, icon: <Lightbulb /> },
];
interface BlogSidebarProps {
  popularPosts?: BlogPost[];
}

export default function BlogSidebar({ popularPosts }: BlogSidebarProps = {}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* ── Categories ───────────────── */}
      <div>
        <h3 className="text-[17px] font-bold text-charcoal mb-5 pb-4 border-b border-[#e8e8e8]">
          Categories
        </h3>
        <ul className="space-y-0">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link
                href={`/blog?category=${cat.name.toLowerCase().replace(/ /g, "-")}`}
                className="flex items-center justify-between py-3 border-b border-[#f0f0f0] group hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-dark-gray group-hover:text-primary transition-colors flex-shrink-0">
                    {React.cloneElement(cat.icon as React.ReactElement<any>, {
                      className: "w-[18px] h-[18px]",
                      strokeWidth: 1.5,
                    })}
                  </span>
                  <span className="text-[13.5px] font-medium text-charcoal group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                </div>
                <span className="text-[12px] font-semibold text-dark-gray bg-[#f4f4f4] px-2.5 py-0.5 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Stay Updated ─────────────── */}
      <div className="bg-charcoal rounded-[8px] p-7">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full border border-primary/50 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1L8.4 7.6L15 8L8.4 8.4L8 15L7.6 8.4L1 8L7.6 7.6L8 1Z" fill="#169B62" />
            </svg>
          </div>
          <h3 className="text-[16px] font-bold text-white">Stay Updated</h3>
        </div>
        <p className="text-[12.5px] text-white/70 leading-[1.7] mb-5">
          Subscribe to our newsletter and get the latest insights and updates delivered to your inbox.
        </p>

        {submitted ? (
          <p className="text-primary text-[13px] font-semibold py-2">
            ✓ Thanks for subscribing!
          </p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-[4px] text-white text-[13px] placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white text-[12px] font-bold uppercase tracking-[0.1em] py-3 rounded-[4px] flex items-center justify-center gap-2 transition-colors group"
            >
              SUBSCRIBE
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </button>
          </form>
        )}

        <p className="text-[11px] text-white/40 mt-3">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>

      {/* ── Popular Posts (Optional) ── */}
      {popularPosts && popularPosts.length > 0 && (
        <div>
          <h3 className="text-[17px] font-bold text-charcoal mb-5 pb-4 border-b border-[#e8e8e8]">
            Popular Posts
          </h3>
          <div className="flex flex-col gap-0">
            {popularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex items-start gap-4 py-4 border-b border-[#f0f0f0] last:border-0 group"
              >
                <div className="relative w-[72px] h-[60px] rounded-[4px] overflow-hidden flex-shrink-0">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-semibold text-charcoal leading-[1.45] mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <span className="text-[11px] text-dark-gray">{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
