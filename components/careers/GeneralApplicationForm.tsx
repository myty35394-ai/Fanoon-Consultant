"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  ArrowRight, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X,
  RefreshCw 
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Predefined area-of-interest options
const PREDEFINED_INTERESTS = [
  "Architecture Design",
  "Interior Design",
  "Landscape Design",
  "3D Visualization",
  "Drafting & Modeling",
  "Structural Engineering",
  "Civil & Infrastructure",
  "Quantity Surveying & Cost Estimation",
  "Project Management",
  "Construction Supervision",
  "Other",
];

export default function GeneralApplicationForm() {
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams.get("role") || "";

  // If the role param isn't in the predefined list, treat it as a custom option
  const isCustomRole =
    !!initialRoleParam && !PREDEFINED_INTERESTS.includes(initialRoleParam);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Fields State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState(initialRoleParam || "");
  const [introduction, setIntroduction] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // UI Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (initialRoleParam) {
      setAreaOfInterest(initialRoleParam);
    }
  }, [initialRoleParam]);

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!allowed.includes(ext)) {
      setErrorMessage("Please upload a PDF, DOC, or DOCX document.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setErrorMessage("File size exceeds 4MB (Vercel limit). Please upload a file under 4MB or provide your portfolio/Google Drive link in your introduction.");
      return;
    }
    setErrorMessage(null);
    setSelectedFile(file);
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  // Reset form
  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setCurrentPosition("");
    setAreaOfInterest("");
    setIntroduction("");
    setSelectedFile(null);
    setAgreeTerms(false);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim() || !email.trim() || !phone.trim() || !location) {
      setErrorMessage("Please fill in all required personal information fields.");
      return;
    }
    if (!areaOfInterest) {
      setErrorMessage("Please select your area of interest.");
      return;
    }
    if (!introduction.trim()) {
      setErrorMessage("Please provide a brief introduction about yourself.");
      return;
    }
    if (!selectedFile) {
      setErrorMessage("Please upload your CV and portfolio document.");
      return;
    }
    if (!agreeTerms) {
      setErrorMessage("You must agree to the Privacy Policy and Terms & Conditions.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("role", areaOfInterest ? `General Application - ${areaOfInterest}` : "General Application");
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("location", location);
      formData.append("experience", "Not specified");
      formData.append("currentPosition", currentPosition.trim());
      formData.append("highestQualification", "Not specified");
      formData.append("department", areaOfInterest || "General");
      formData.append("availability", "Standard");
      formData.append("motivation", introduction.trim());
      formData.append("softwareProficiency", JSON.stringify([]));
      formData.append("resume", selectedFile);

      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full border border-[#eaeaea] rounded-[4px] px-4 py-3 text-[13px] text-charcoal focus:outline-none focus:border-primary transition-colors bg-white";
  const selectClasses =
    "w-full border border-[#eaeaea] rounded-[4px] px-4 py-3 text-[13px] text-dark-gray focus:outline-none focus:border-primary transition-colors bg-white appearance-none";

  const FormLabel = ({
    children,
    required = false,
  }: {
    children: React.ReactNode;
    required?: boolean;
  }) => (
    <label className="block text-[12px] font-bold text-charcoal mb-2">
      {children} {required && <span className="text-[#d32f2f]">*</span>}
    </label>
  );

  return (
    <div className="bg-white p-8 md:p-12 rounded-[8px] shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-[#eaeaea] relative">
      
      {/* Success State View */}
      {isSuccess ? (
        <div className="py-12 px-6 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-[#eaf7f0] rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-[26px] font-bold text-charcoal mb-3">
            Application Submitted!
          </h3>
          <p className="text-dark-gray/80 text-[14px] leading-relaxed mb-8">
            Thank you, <strong className="text-charcoal">{fullName}</strong>. Your general application and attached CV (<span className="italic">{selectedFile?.name}</span>) have been sent directly to our recruitment team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => {
                handleReset();
                setIsSuccess(false);
              }}
              className="inline-flex items-center justify-center gap-2 border border-[#ddd] rounded-[4px] text-charcoal font-bold text-[11px] tracking-widest uppercase px-6 py-3.5 hover:bg-[#f8f8f8] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Submit Another Application
            </button>
            <Link
              href="/about-us/careers"
              className="inline-flex items-center justify-center gap-2 bg-primary border border-primary rounded-[4px] text-white font-bold text-[11px] tracking-widest uppercase px-6 py-3.5 hover:bg-[#128351] transition-colors"
            >
              Back to Careers
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-charcoal font-bold text-[24px] mb-2">General Application Form</h2>
            <p className="text-dark-gray/70 text-[13.5px]">
              Please fill out the form below and attach your CV and portfolio.
            </p>
          </div>

          {/* Error Alert Banner */}
          {errorMessage && (
            <div className="mb-8 p-4 bg-[#fdf2f2] border border-[#f8b4b4] rounded-[6px] flex items-start gap-3 text-[#9b1c1c]">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-[13px] leading-snug font-medium flex-1">
                {errorMessage}
              </div>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="text-[#9b1c1c]/70 hover:text-[#9b1c1c]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Row 1: Full Name & Email Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormLabel required>Full Name</FormLabel>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <FormLabel required>Email Address</FormLabel>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            {/* Row 2: Phone Number & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormLabel required>Phone Number</FormLabel>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
              <div className="relative">
                <FormLabel required>Location</FormLabel>
                <select
                  className={selectClasses}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  <option value="" disabled>Select your city</option>
                  <option value="peshawar">Peshawar</option>
                  <option value="islamabad">Islamabad</option>
                  <option value="lahore">Lahore</option>
                  <option value="rawalpindi">Rawalpindi</option>
                  <option value="karachi">Karachi</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-4 top-[38px] pointer-events-none text-dark-gray/60">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>

            {/* Row 3: Current Position */}
            <div>
              <FormLabel>Current Position</FormLabel>
              <input
                type="text"
                placeholder="Your current position"
                value={currentPosition}
                onChange={(e) => setCurrentPosition(e.target.value)}
                className={inputClasses}
              />
            </div>

            {/* Row 4: Area of Interest */}
            <div className="relative">
              <FormLabel required>Area of Interest</FormLabel>
              <select
                className={selectClasses}
                value={areaOfInterest}
                onChange={(e) => setAreaOfInterest(e.target.value)}
                required
              >
                <option value="" disabled>Select area of interest</option>
                {/* Inject custom admin-posted job as the first option when applicable */}
                {isCustomRole && (
                  <option value={initialRoleParam}>{initialRoleParam}</option>
                )}
                <option value="Architecture Design">Architecture Design</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Landscape Design">Landscape Design</option>
                <option value="3D Visualization">3D Visualization</option>
                <option value="Drafting & Modeling">Drafting &amp; Modeling</option>
                <option value="Structural Engineering">Structural Engineering</option>
                <option value="Civil & Infrastructure">Civil &amp; Infrastructure</option>
                <option value="Quantity Surveying & Cost Estimation">Quantity Surveying &amp; Cost Estimation</option>
                <option value="Project Management">Project Management</option>
                <option value="Construction Supervision">Construction Supervision</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute right-4 top-[38px] pointer-events-none text-dark-gray/60">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            {/* Row 5: Brief Introduction */}
            <div>
              <FormLabel required>Brief Introduction</FormLabel>
              <textarea
                rows={4}
                placeholder="Tell us about yourself, your experience and what excites you about joining Fanoon Consultants."
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                className={`${inputClasses} resize-none`}
                required
              />
            </div>

            {/* Row 6: Upload Your Documents */}
            <div>
              <FormLabel required>Upload Your Documents</FormLabel>
              <p className="text-[12px] text-dark-gray/70 mb-3">
                Please upload your CV and portfolio (PDF format recommended)
              </p>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-[6px] p-8 transition-colors cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-6 ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : selectedFile
                    ? "border-primary/60 bg-[#f4fbf7]"
                    : "border-[#eaeaea] bg-[#fafafa] hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`w-12 h-12 rounded-full border flex items-center justify-center shadow-sm ${
                      selectedFile
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-dark-gray/60 border-[#ddd]"
                    }`}
                  >
                    {selectedFile ? (
                      <FileText className="w-5 h-5" />
                    ) : (
                      <UploadCloud className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    {selectedFile ? (
                      <>
                        <p className="text-[13.5px] text-charcoal font-semibold flex items-center gap-2">
                          {selectedFile.name}
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </p>
                        <p className="text-[12px] text-dark-gray/70">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB •{" "}
                          <span className="text-primary font-medium hover:underline">
                            Click to change
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-[13px] text-charcoal font-medium">
                          Drag & drop your files here
                        </p>
                        <p className="text-[12.5px] text-dark-gray/70">
                          or <span className="text-primary font-medium">click to browse</span>
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right sm:text-right text-center">
                  <p className="text-[12px] text-dark-gray/80 font-medium">PDF, DOC, DOCX</p>
                  <p className="text-[11.5px] text-dark-gray/60 mt-1">Max. 4MB each</p>
                </div>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-primary rounded border-[#ddd] focus:ring-primary accent-[#169B62]"
                required
              />
              <label htmlFor="terms" className="text-[13px] text-dark-gray/80 leading-[1.6] cursor-pointer">
                I agree to the{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms-and-conditions" className="text-primary hover:underline">
                  Terms & Conditions
                </Link>
                .
              </label>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-[#eaeaea] flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                className="border border-[#ddd] rounded-[4px] text-charcoal font-bold text-[11px] tracking-widest uppercase px-6 py-3.5 hover:bg-[#f8f8f8] transition-colors disabled:opacity-50"
              >
                RESET
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary border border-primary rounded-[4px] text-white font-bold text-[11px] tracking-widest uppercase px-6 py-3.5 hover:bg-[#128351] transition-colors flex items-center gap-2 disabled:opacity-75 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    SUBMITTING...
                  </>
                ) : (
                  <>
                    SUBMIT APPLICATION
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

          </form>
        </>
      )}

    </div>
  );
}
