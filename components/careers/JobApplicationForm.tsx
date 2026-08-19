"use client";

import React, { useState, useRef } from "react";
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

interface Option {
  value: string;
  label: string;
}

export interface JobApplicationFormProps {
  role: string;
  formTitle: string;
  registrationLabel?: string;
  registrationPlaceholder?: string;
  affiliationsLabel?: string;
  affiliationsPlaceholder?: string;
  specializationLabel?: string;
  specializationOptions?: Option[];
  qualificationOptions?: Option[];
  softwareList?: string[];
  departmentOptions?: Option[];
}

export default function JobApplicationForm({
  role,
  formTitle,
  registrationLabel,
  registrationPlaceholder,
  affiliationsLabel,
  affiliationsPlaceholder,
  specializationLabel = "Specialization",
  specializationOptions = [
    { value: "general", label: "General" },
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
  ],
  qualificationOptions = [
    { value: "bachelors", label: "Bachelor's Degree" },
    { value: "masters", label: "Master's Degree" },
    { value: "diploma", label: "Diploma / Certification" },
    { value: "other", label: "Other" },
  ],
  softwareList = ["AutoCAD", "Revit", "SketchUp", "3ds Max", "Other"],
  departmentOptions = [
    { value: "architecture", label: "Architecture" },
    { value: "interior", label: "Interior Design" },
    { value: "landscape", label: "Landscape Design" },
    { value: "engineering", label: "Structural Engineering" },
  ],
}: JobApplicationFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Fields State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [experience, setExperience] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [institution, setInstitution] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [affiliations, setAffiliations] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);

  const [department, setDepartment] = useState("");
  const [availability, setAvailability] = useState("");
  const [motivation, setMotivation] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // UI Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Toggle software checkbox
  const toggleSoftware = (item: string) => {
    setSelectedSoftware((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

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
      setErrorMessage("File size exceeds 4MB (Vercel limit). Please upload a file under 4MB or paste your portfolio/Drive link in the Portfolio Link field below.");
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
    setExperience("");
    setCurrentPosition("");
    setHighestQualification("");
    setInstitution("");
    setRegistrationNumber("");
    setAffiliations("");
    setSpecialization("");
    setSelectedSoftware([]);
    setDepartment("");
    setAvailability("");
    setMotivation("");
    setPortfolioLink("");
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
    if (!experience || !highestQualification) {
      setErrorMessage("Please select your years of experience and highest qualification.");
      return;
    }
    if (!department || !availability) {
      setErrorMessage("Please select your preferred department and availability.");
      return;
    }
    if (!motivation.trim()) {
      setErrorMessage("Please explain why you want to join Fanoon Consultants.");
      return;
    }
    if (!selectedFile) {
      setErrorMessage("Please upload your CV / Resume document.");
      return;
    }
    if (!agreeTerms) {
      setErrorMessage("You must agree to the Privacy Policy and Terms & Conditions.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("role", role);
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("location", location);
      formData.append("experience", experience);
      formData.append("currentPosition", currentPosition.trim());
      formData.append("highestQualification", highestQualification);
      formData.append("institution", institution.trim());
      formData.append("registrationNumber", registrationNumber.trim());
      formData.append("affiliations", affiliations.trim());
      formData.append("specialization", specialization);
      formData.append("softwareProficiency", JSON.stringify(selectedSoftware));
      formData.append("department", department);
      formData.append("availability", availability);
      formData.append("motivation", motivation.trim());
      formData.append("portfolioLink", portfolioLink.trim());
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
            Thank you, <strong className="text-charcoal">{fullName}</strong>. Your application for the <strong className="text-primary">{role}</strong> role and attached CV (<span className="italic">{selectedFile?.name}</span>) have been sent directly to our recruitment team.
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
          <div className="mb-10">
            <h2 className="text-charcoal font-bold text-[24px] mb-2">{formTitle}</h2>
            <p className="text-dark-gray/70 text-[13.5px]">
              Please fill in the form below and attach your CV and portfolio.
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

          <form className="space-y-10" onSubmit={handleSubmit}>
            
            {/* 1. PERSONAL INFORMATION */}
            <div>
              <h3 className="text-primary font-bold text-[11px] uppercase tracking-[0.1em] mb-6">
                PERSONAL INFORMATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
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
                    <option value="islamabad">Islamabad</option>
                    <option value="peshawar">Peshawar</option>
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
            </div>

            {/* 2. PROFESSIONAL INFORMATION */}
            <div>
              <h3 className="text-primary font-bold text-[11px] uppercase tracking-[0.1em] mb-6">
                PROFESSIONAL INFORMATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-6">
                <div className="relative">
                  <FormLabel required>Years of Experience</FormLabel>
                  <select
                    className={selectClasses}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select your experience</option>
                    <option value="0-2">0 - 2 Years</option>
                    <option value="3-5">3 - 5 Years</option>
                    <option value="5-10">5 - 10 Years</option>
                    <option value="10+">10+ Years</option>
                  </select>
                  <div className="absolute right-4 top-[38px] pointer-events-none text-dark-gray/60">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
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
                <div className="relative">
                  <FormLabel required>Highest Qualification</FormLabel>
                  <select
                    className={selectClasses}
                    value={highestQualification}
                    onChange={(e) => setHighestQualification(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select your qualification</option>
                    {qualificationOptions.map((opt) => (
                      <option key={opt.value} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-[38px] pointer-events-none text-dark-gray/60">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                <div>
                  <FormLabel>Technical Institute / University</FormLabel>
                  <input
                    type="text"
                    placeholder="Enter your institute / university"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className={inputClasses}
                  />
                </div>

                {/* Optional Registration & Affiliation Fields */}
                {registrationLabel && (
                  <div>
                    <FormLabel>{registrationLabel}</FormLabel>
                    <input
                      type="text"
                      placeholder={registrationPlaceholder || "Enter registration number"}
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                )}
                {affiliationsLabel && (
                  <div className={!registrationLabel ? "md:col-span-2" : ""}>
                    <FormLabel>{affiliationsLabel}</FormLabel>
                    <input
                      type="text"
                      placeholder={affiliationsPlaceholder || "e.g. Professional bodies, memberships"}
                      value={affiliations}
                      onChange={(e) => setAffiliations(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                )}

                {/* Specialization Field */}
                <div className="relative md:col-span-2">
                  <FormLabel required>{specializationLabel}</FormLabel>
                  <select
                    className={selectClasses}
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select your specialization</option>
                    {specializationOptions.map((opt) => (
                      <option key={opt.value} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-[38px] pointer-events-none text-dark-gray/60">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>

              {/* Software Proficiency Checkboxes */}
              <div>
                <FormLabel required>Software Proficiency</FormLabel>
                <p className="text-[12px] text-dark-gray/70 mb-4 -mt-1">
                  Select all that apply
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-4">
                  {softwareList.map((software) => (
                    <div key={software} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`sw-${software.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
                        checked={selectedSoftware.includes(software)}
                        onChange={() => toggleSoftware(software)}
                        className="w-4 h-4 text-primary rounded border-[#ddd] focus:ring-primary accent-[#169B62]"
                      />
                      <label
                        htmlFor={`sw-${software.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
                        className="text-[13px] text-charcoal cursor-pointer"
                      >
                        {software}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. APPLICATION DETAILS */}
            <div>
              <h3 className="text-primary font-bold text-[11px] uppercase tracking-[0.1em] mb-6">
                APPLICATION DETAILS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-6">
                <div className="relative">
                  <FormLabel required>Preferred Department</FormLabel>
                  <select
                    className={selectClasses}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select department</option>
                    {departmentOptions.map((opt) => (
                      <option key={opt.value} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-[38px] pointer-events-none text-dark-gray/60">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                <div className="relative">
                  <FormLabel required>Availability</FormLabel>
                  <select
                    className={selectClasses}
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select your availability</option>
                    <option value="immediate">Immediate</option>
                    <option value="1month">1 Month Notice</option>
                    <option value="2months">2 Months Notice</option>
                  </select>
                  <div className="absolute right-4 top-[38px] pointer-events-none text-dark-gray/60">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <FormLabel required>Why do you want to join Fanoon Consultants?</FormLabel>
                <textarea
                  rows={4}
                  placeholder="Tell us about your motivation and how you can contribute to our team."
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className={`${inputClasses} resize-none`}
                  required
                />
              </div>

              <div className="mb-6">
                <FormLabel>
                  Portfolio Link{" "}
                  <span className="text-dark-gray/60 font-normal">
                    (Behance/Website/Google Drive)
                  </span>
                </FormLabel>
                <input
                  type="url"
                  placeholder="Paste your portfolio link"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  className={inputClasses}
                />
              </div>

              {/* Upload Documents Zone */}
              <div>
                <FormLabel required>Upload Documents</FormLabel>
                <p className="text-[12px] text-dark-gray/70 mb-3">
                  Please upload your CV and Portfolio (PDF format recommended)
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
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-3 mt-8">
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
            <div className="pt-6 border-t border-[#eaeaea] flex items-center justify-between mt-10">
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
