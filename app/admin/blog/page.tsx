"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, FileText, Loader2, Sparkles, Eye, EyeOff, Star } from "lucide-react";
import BlogPostFormModal from "@/components/admin/BlogPostFormModal";

export interface BlogPostRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readTime: string | null;
  featured: boolean | null;
  published: boolean | null;
  publishedAt: Date | null;
  createdAt: Date;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete post "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id: string, field: "published" | "featured", current: boolean) => {
    try {
      await fetch("/api/admin/blog", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, [field]: !current }),
      });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Blog Posts ({posts.length})
          </h1>
          <p className="text-white/60 text-sm">
            Create, manage and publish blog articles. Changes reflect instantly on the live site.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          New Blog Post
        </button>
      </div>

      {/* Posts Table */}
      {loading ? (
        <div className="p-16 flex items-center justify-center text-white/40 gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span>Loading posts...</span>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-12 text-center space-y-4">
          <FileText className="w-12 h-12 text-white/20 mx-auto" />
          <h3 className="text-lg font-bold text-white">No blog posts yet</h3>
          <p className="text-white/50 text-xs max-w-sm mx-auto">
            Write your first article to share design insights and industry knowledge with your clients.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            Create First Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#141b16] border border-white/10 rounded-xl overflow-hidden group hover:border-white/20 transition-all flex flex-col"
            >
              {/* Cover Thumbnail */}
              <div className="relative aspect-[16/9] bg-[#1c261f] overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Status badges */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {post.featured && (
                    <span className="bg-amber-500 text-black px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      post.published
                        ? "bg-primary/90 text-white"
                        : "bg-white/20 text-white/70 backdrop-blur-sm"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-primary border border-primary/30 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-white text-sm mb-1.5 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-white/50 text-xs line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Actions Row */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-white/40 text-xs">{post.readTime}</span>
                  <div className="flex items-center gap-1">
                    {/* Toggle Published */}
                    <button
                      onClick={() => handleToggle(post.id, "published", post.published ?? true)}
                      title={post.published ? "Unpublish" : "Publish"}
                      className="p-2 text-white/40 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    {/* Toggle Featured */}
                    <button
                      onClick={() => handleToggle(post.id, "featured", post.featured ?? false)}
                      title={post.featured ? "Unfeature" : "Feature"}
                      className={`p-2 rounded-lg transition-colors ${
                        post.featured
                          ? "text-amber-400 hover:bg-amber-400/10"
                          : "text-white/40 hover:text-amber-400 hover:bg-amber-400/10"
                      }`}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      title="Delete post"
                      className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <BlogPostFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPosts}
      />
    </div>
  );
}
