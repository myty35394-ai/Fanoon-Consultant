"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentForm({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file (JPG, PNG)");
        return;
      }
      setError(null);
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please select a screenshot first.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("receipt", selectedFile);

      const res = await fetch(`/api/invoices/${invoiceId}/pay`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload receipt");

      // Reload the page to show the processing state
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#eaeaea] rounded-xl p-5 shadow-sm">
      <h3 className="text-xs font-bold uppercase tracking-wider text-dark-gray/80 mb-4">
        Upload Payment Receipt
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {selectedFile ? (
        <div className="mb-4 flex items-center justify-between p-3 border border-primary/20 bg-primary/5 rounded-lg">
          <div className="flex items-center gap-2 overflow-hidden">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs font-bold text-charcoal truncate">
              {selectedFile.name}
            </span>
          </div>
          <button
            onClick={() => setSelectedFile(null)}
            className="text-xs text-red-500 hover:underline font-medium shrink-0 ml-2"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full mb-4 py-8 border-2 border-dashed border-[#ddd] hover:border-primary/50 bg-[#fafafa] rounded-lg flex flex-col items-center justify-center gap-2 transition-colors group"
        >
          <UploadCloud className="w-6 h-6 text-dark-gray/40 group-hover:text-primary transition-colors" />
          <span className="text-xs font-semibold text-dark-gray/60 group-hover:text-primary transition-colors">
            Click to upload screenshot
          </span>
          <span className="text-[10px] text-dark-gray/40">JPG, PNG up to 5MB</span>
        </button>
      )}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !selectedFile}
        className="w-full bg-primary hover:bg-[#128351] text-white py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSubmitting ? "UPLOADING..." : "SUBMIT PAYMENT PROOF"}
      </button>
    </div>
  );
}
