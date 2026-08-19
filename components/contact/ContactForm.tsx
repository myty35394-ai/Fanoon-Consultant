"use client";

import React, { useState, useRef, useCallback, useActionState } from "react";
import { UploadCloud, X, CheckCircle2, Loader2, FileText } from "lucide-react";
import Link from "next/link";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";

const SUBJECT_OPTIONS = [
  { value: "", label: "Select a subject" },
  { value: "General Inquiry", label: "General Inquiry" },
  { value: "Architecture Design", label: "Architecture Design" },
  { value: "Interior Design", label: "Interior Design" },
  { value: "Landscape Design", label: "Landscape Design" },
  { value: "3D Visualization", label: "3D Visualization" },
  { value: "Project Management", label: "Project Management" },
  { value: "Construction Supervision", label: "Construction Supervision" },
];

const PROJECT_TYPE_OPTIONS = [
  { value: "", label: "Select project type" },
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Mixed-Use", label: "Mixed-Use" },
  { value: "Landscape/Public Realm", label: "Landscape / Public Realm" },
  { value: "Other", label: "Other" },
];

const BUDGET_OPTIONS = [
  { value: "", label: "Select budget range" },
  { value: "Under PKR 5M", label: "Under PKR 5M" },
  { value: "PKR 5M – 15M", label: "PKR 5M – 15M" },
  { value: "PKR 15M – 50M", label: "PKR 15M – 50M" },
  { value: "PKR 50M+", label: "PKR 50M+" },
  { value: "Not sure yet", label: "Not sure yet" },
];

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];
const MAX_SIZE = 10 * 1024 * 1024;

// ── Shared field style ────────────────────────────────────────────────────────
const labelCls =
  "block text-[12.5px] font-semibold text-charcoal mb-1.5";

const requiredLabel = (text: string, required = false) => (
  <label className={labelCls}>
    {text}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

const inputCls =
  "w-full border border-[#e0e0e0] rounded-[6px] px-3.5 py-2.5 text-[13.5px] text-charcoal placeholder:text-dark-gray/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all bg-white";

const selectCls =
  "w-full border border-[#e0e0e0] rounded-[6px] px-3.5 py-2.5 text-[13.5px] text-charcoal focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all bg-white appearance-none cursor-pointer";

const selectWrapperStyle = {
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: "right 0.6rem center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "1.2em 1.2em",
};

const initialState: ContactFormState = { status: "idle" };

export default function ContactForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

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

  // ── Success state ─────────────────────────────────────────────────────────
  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-5">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-charcoal mb-1.5">Message Sent!</h3>
          <p className="text-[13px] text-dark-gray leading-relaxed max-w-sm mx-auto">{state.message}</p>
        </div>
        <button
          onClick={handleReset}
          className="text-[11px] font-bold text-primary hover:underline uppercase tracking-widest"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {/* Server error */}
      {state.status === "error" && (
        <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[13px] flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Row 1: Full Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          {requiredLabel("Full Name", true)}
          <input name="name" type="text" required placeholder="Enter your full name" className={inputCls} />
        </div>
        <div>
          {requiredLabel("Email Address", true)}
          <input name="email" type="email" required placeholder="Enter your email address" className={inputCls} />
        </div>
      </div>

      {/* Row 2: Phone + Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          {requiredLabel("Phone Number")}
          <input name="phone" type="tel" placeholder="Enter your phone number" className={inputCls} />
        </div>
        <div>
          {requiredLabel("Subject", true)}
          <select name="subject" required className={selectCls} style={selectWrapperStyle}>
            {SUBJECT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Project Type + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          {requiredLabel("Project Type")}
          <select name="projectType" className={selectCls} style={selectWrapperStyle}>
            {PROJECT_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          {requiredLabel("Budget Range")}
          <select name="budgetRange" className={selectCls} style={selectWrapperStyle}>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Your Message */}
      <div>
        {requiredLabel("Your Message", true)}
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tell us about your project, requirements and timeline..."
          className={`${inputCls} min-h-[110px] resize-y`}
        />
      </div>

      {/* File Drop Zone */}
      <div>
        <p className={labelCls}>
          Attach Files <span className="font-normal text-dark-gray/50 text-[11px]">(Optional)</span>
        </p>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg px-5 py-6 flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-200 ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-[#d8d8d8] hover:border-primary/50 hover:bg-[#fafafa]"
          }`}
        >
          <UploadCloud
            className={`w-8 h-8 ${dragOver ? "text-primary" : "text-dark-gray/35"}`}
            strokeWidth={1.5}
          />
          <div className="text-center">
            <p className="text-[13px] text-dark-gray">
              Drag &amp; drop your files here{" "}
            </p>
            <p className="text-[13px] text-dark-gray">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                className="text-primary font-semibold hover:underline"
              >
                or click to browse
              </button>
            </p>
            <p className="text-[11px] text-dark-gray/45 mt-1">
              PDF, DOC, JPG, PNG (Max. 10MB each)
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />

        {/* File chips */}
        {files.length > 0 && (
          <ul className="mt-2.5 space-y-1.5">
            {files.map((file, idx) => (
              <li key={idx} className="flex items-center justify-between gap-2 bg-[#f5f5f5] rounded-lg px-3 py-2 text-[12px]">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="truncate text-charcoal font-medium">{file.name}</span>
                  <span className="text-dark-gray/45 flex-shrink-0">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                </div>
                <button type="button" onClick={() => removeFile(idx)} className="text-dark-gray/40 hover:text-red-500 transition-colors flex-shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {fileError && <p className="mt-1.5 text-[11.5px] text-red-500">{fileError}</p>}
      </div>

      {/* Privacy checkbox */}
      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          id="agreed"
          name="agreed"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-3.5 h-3.5 accent-primary flex-shrink-0 cursor-pointer"
        />
        <label htmlFor="agreed" className="text-[12.5px] text-dark-gray leading-relaxed cursor-pointer">
          I agree to the{" "}
          <Link href="/privacy-policy" className="text-primary underline underline-offset-2 hover:text-primary-dark">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-primary underline underline-offset-2 hover:text-primary-dark">
            Terms &amp; Conditions
          </Link>
          .
        </label>
      </div>

      {/* Action Buttons — RESET left, SEND MESSAGE right */}
      <div className="flex items-center justify-between gap-4 pt-1">
        {/* RESET — outlined dark, matches reference */}
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2.5 border border-charcoal/30 rounded-[6px] text-charcoal text-[12px] font-bold uppercase tracking-[0.12em] hover:border-charcoal hover:bg-charcoal/5 transition-all"
        >
          RESET
        </button>

        {/* SEND MESSAGE — primary green with arrow */}
        <button
          type="submit"
          disabled={isPending || !agreed}
          className="flex items-center gap-2.5 px-7 py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white text-[12px] font-bold uppercase tracking-[0.12em] rounded-[6px] transition-all duration-200 shadow-md shadow-primary/20"
        >
          {isPending ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              SENDING...
            </>
          ) : (
            <>
              SEND MESSAGE
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
