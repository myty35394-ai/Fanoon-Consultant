import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: "featured" | "standard";
}

export default function BlogCard({ post, variant = "standard" }: BlogCardProps) {
  if (variant === "featured") {
    return (
      <div className="flex flex-col group h-full bg-white rounded-xl border border-[#ececec] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
        {/* Image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden flex-shrink-0">
          {post.featured && (
            <span className="absolute top-3 left-3 z-10 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-sm">
              FEATURED
            </span>
          )}
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10.5px] font-bold text-primary uppercase tracking-[0.12em]">
              {post.category}
            </span>
            <span className="text-[#d0d0d0] text-[10px]">•</span>
            <span className="text-[11px] text-dark-gray">{post.date}</span>
            <span className="text-[#d0d0d0] text-[10px]">•</span>
            <span className="text-[11px] text-dark-gray">{post.readTime}</span>
          </div>

          {/* Title */}
          <h3 className="text-[17px] md:text-[18px] font-bold text-charcoal leading-[1.35] mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[13px] text-dark-gray leading-[1.7] mb-5 flex-1">
            {post.excerpt}
          </p>

          {/* Read More */}
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-[12px] font-bold text-primary uppercase tracking-[0.1em] hover:gap-3 transition-all duration-200 group/link"
          >
            READ MORE
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    );
  }

  // Standard variant
  return (
    <div className="flex flex-col group h-full bg-white rounded-xl border border-[#ececec] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden flex-shrink-0">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.12em]">
            {post.category}
          </span>
          <span className="text-[#d0d0d0] text-[10px]">•</span>
          <span className="text-[11px] text-dark-gray">{post.date}</span>
          <span className="text-[#d0d0d0] text-[10px]">•</span>
          <span className="text-[11px] text-dark-gray">{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-bold text-charcoal leading-[1.35] mb-2.5 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[12.5px] text-dark-gray leading-[1.7] mb-4 flex-1">
          {post.excerpt}
        </p>

        {/* Read More */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-[11px] font-bold text-primary uppercase tracking-[0.1em] hover:gap-3 transition-all duration-200 group/link"
        >
          READ MORE
          <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
