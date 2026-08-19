"use client";

import React, { useRef, useState } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  folder = "fanoon-consultants",
  label = "Photo",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed.");
      } else {
        onChange(data.url);
      }
    } catch {
      setError("Upload failed. Check your connection.");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const clearImage = () => {
    onChange("");
    setError("");
  };

  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50">
        {label} *
      </label>

      {/* Drop zone / preview */}
      {value ? (
        /* ── Preview ── */
        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#1c261f]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Overlay actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold border border-white/20 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              Replace
            </button>
            <button
              type="button"
              onClick={clearImage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-[11px] font-semibold border border-red-500/30 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* ── Drop zone ── */
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center gap-3 h-40 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 ${
            dragOver
              ? "border-primary bg-primary/10 scale-[1.01]"
              : "border-white/15 bg-[#1c261f] hover:border-primary/50 hover:bg-primary/5"
          } ${uploading ? "pointer-events-none" : ""}`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <span className="text-white/50 text-[12px]">Uploading to Cloudinary…</span>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-white/70 text-[12px] font-medium">
                  Drop image here or{" "}
                  <span className="text-primary underline underline-offset-2">browse</span>
                </p>
                <p className="text-white/30 text-[10px] mt-1">JPG, PNG or WebP · max 10 MB</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Manual URL input as fallback */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/30 text-[10px] uppercase tracking-wider">or paste URL</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://res.cloudinary.com/… or any image URL"
        className="w-full bg-[#1c261f] border border-white/10 rounded-lg px-4 py-2.5 text-white text-[12px] placeholder:text-white/25 focus:outline-none focus:border-primary transition-colors"
      />

      {error && (
        <p className="text-red-400 text-[11px] flex items-center gap-1">
          <X className="w-3 h-3" /> {error}
        </p>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
}
