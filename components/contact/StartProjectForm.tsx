"use client";

import React, { useState, useRef, useCallback, useActionState } from "react";
import { UploadCloud, X, CheckCircle2, Loader2, FileText } from "lucide-react";
import Link from "next/link";
import { submitStartProjectForm, type ContactFormState } from "@/app/contact/actions";

const PROJECT_TYPE_OPTIONS = [
  { value: "", label: "Select project type" },
  { value: "architecture", label: "Architecture Design" },
  { value: "interior", label: "Interior Design" },
  { value: "landscape", label: "Landscape Design" },
  { value: "construction", label: "Construction" },
  { value: "other", label: "Other" },
];

const BUDGET_OPTIONS = [
  { value: "", label: "Select budget range" },
  { value: "under-5m", label: "Under 5M PKR" },
  { value: "5m-10m", label: "5M - 10M PKR" },
  { value: "10m-50m", label: "10M - 50M PKR" },
  { value: "above-50m", label: "Above 50M PKR" },
  { value: "undecided", label: "To be decided" },
];

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];
const MAX_SIZE = 10 * 1024 * 1024;

const initialState: ContactFormState = { status: "idle" };

export default function StartProjectForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(submitStartProjectForm, initialState);

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      setFileError("");
      const next: File[] = [];
      for (const f of Array.from(incoming)) {
        if (!ALLOWED_TYPES.includes(f.type)) {
          setFileError(`"${f.name}" is not an allowed file type.`);
          continue;
        }
        if (f.size > MAX_SIZE) {
          setFileError(`"${f.name}" exceeds 10 MB.`);
          continue;
        }
        if (!files.find((x) => x.name === f.name && x.size === f.size)) next.push(f);
      }
      setFiles((prev) => [...prev, ...next]);
    },
    [files]
  );

  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const handleReset = () => {
    formRef.current?.reset();
    setFiles([]);
    setFileError("");
    setAgreed(false);
  };

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 gap-5">
        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-charcoal mb-2">Project Submitted!</h3>
          <p className="text-[14px] text-dark-gray leading-relaxed max-w-md mx-auto">{state.message}</p>
        </div>
        <button
          onClick={handleReset}
          className="text-[12px] mt-2 font-bold text-primary hover:underline uppercase tracking-widest"
        >
          Submit Another Project
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      {/* Server error */}
      {state.status === "error" && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[13px] flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-charcoal">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input 
            name="name"
            type="text" 
            placeholder="Enter your full name" 
            className="w-full px-4 py-3 border border-[#e0e0e0] rounded bg-white text-[14px] focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>
        
        {/* Email */}
        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-charcoal">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input 
            name="email"
            type="email" 
            placeholder="Enter your email address" 
            className="w-full px-4 py-3 border border-[#e0e0e0] rounded bg-white text-[14px] focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-charcoal">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input 
            name="phone"
            type="tel" 
            placeholder="Enter your phone number" 
            className="w-full px-4 py-3 border border-[#e0e0e0] rounded bg-white text-[14px] focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-charcoal">
            Company / Organization
          </label>
          <input 
            name="company"
            type="text" 
            placeholder="Enter company name (if any)" 
            className="w-full px-4 py-3 border border-[#e0e0e0] rounded bg-white text-[14px] focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Project Type */}
        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-charcoal">
            Project Type <span className="text-red-500">*</span>
          </label>
          <select 
            name="projectType"
            className="w-full px-4 py-3 border border-[#e0e0e0] rounded bg-white text-[14px] text-dark-gray focus:outline-none focus:border-primary transition-colors appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 0.75rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.2em 1.2em",
            }}
            required
          >
            {PROJECT_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Project Location */}
        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-charcoal">
            Project Location <span className="text-red-500">*</span>
          </label>
          <input 
            name="location"
            type="text" 
            placeholder="Enter project location" 
            className="w-full px-4 py-3 border border-[#e0e0e0] rounded bg-white text-[14px] focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>

        {/* Estimated Start Date */}
        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-charcoal">
            Estimated Start Date
          </label>
          <input 
            name="estimatedStartDate"
            type="date" 
            className="w-full px-4 py-3 border border-[#e0e0e0] rounded bg-white text-[14px] text-dark-gray focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Budget Range */}
        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-charcoal">
            Budget Range
          </label>
          <select 
            name="budgetRange"
            className="w-full px-4 py-3 border border-[#e0e0e0] rounded bg-white text-[14px] text-dark-gray focus:outline-none focus:border-primary transition-colors appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 0.75rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.2em 1.2em",
            }}
          >
            {BUDGET_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Brief */}
      <div className="space-y-2 mt-6">
        <label className="block text-[13px] font-bold text-charcoal">
          Project Brief / Requirements <span className="text-red-500">*</span>
        </label>
        <textarea 
          name="message"
          rows={5}
          placeholder="Tell us about your project, goals, requirements and timeline..."
          className="w-full px-4 py-3 border border-[#e0e0e0] rounded bg-white text-[14px] focus:outline-none focus:border-primary transition-colors resize-y"
          required
        ></textarea>
      </div>

      {/* Attach Files */}
      <div className="space-y-2 mt-6">
        <label className="block text-[13px] font-bold text-charcoal">
          Attach Files <span className="font-normal text-dark-gray/50 text-[11px]">(Optional)</span>
        </label>
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`w-full border-2 border-dashed rounded-lg p-8 flex flex-col sm:flex-row items-center justify-center gap-4 transition-colors cursor-pointer ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-[#e0e0e0] bg-[#fafafa] hover:bg-[#f5fbf7] hover:border-primary/50"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            <UploadCloud className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-[14px] font-medium text-charcoal mb-1">
              Drag & drop your files here
            </p>
            <p className="text-[12px] text-dark-gray">
              or <button type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} className="text-primary font-bold hover:underline">click to browse</button>
            </p>
            <p className="text-[10px] text-[#a0a0a0] mt-1">
              PDF, DOC, JPG, PNG (Max. 10MB each)
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          name="attachments"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />

        {/* File chips */}
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file, idx) => (
              <li key={idx} className="flex items-center justify-between gap-3 bg-[#f5f5f5] rounded-lg px-4 py-2.5 text-[13px]">
                <div className="flex items-center gap-3 truncate">
                  <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="truncate text-charcoal font-medium">{file.name}</span>
                  <span className="text-dark-gray/45 flex-shrink-0">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                </div>
                <button type="button" onClick={() => removeFile(idx)} className="text-dark-gray/40 hover:text-red-500 transition-colors flex-shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {fileError && <p className="mt-2 text-[12px] text-red-500">{fileError}</p>}
      </div>

      {/* Agreement Checkbox */}
      <div className="flex items-start gap-3 mt-8">
        <input 
          type="checkbox" 
          id="agreed"
          name="agreed"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-[#e0e0e0] text-primary focus:ring-primary"
          required 
        />
        <label htmlFor="agreed" className="text-[13px] text-dark-gray leading-relaxed cursor-pointer">
          I agree to the <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-primary hover:underline">Terms & Conditions</Link>.
        </label>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-[#f0f0f0]">
        <button 
          type="button"
          onClick={handleReset}
          className="px-8 py-3 border border-[#d0d0d0] text-charcoal text-[12px] font-bold uppercase tracking-[0.1em] rounded hover:border-charcoal hover:bg-charcoal/5 transition-all"
        >
          RESET
        </button>
        <button 
          type="submit" 
          disabled={isPending || !agreed}
          className="px-8 py-3 bg-primary disabled:opacity-50 disabled:cursor-not-allowed text-white text-[12px] font-bold uppercase tracking-[0.1em] rounded hover:bg-primary-dark transition-colors flex items-center gap-2 group shadow-md shadow-primary/20"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              SUBMITTING...
            </>
          ) : (
            <>
              SUBMIT PROJECT
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
