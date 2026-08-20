"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Share2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    companyName: "",
    primaryEmail: "",
    secondaryEmail: "",
    careersEmail: "",
    primaryPhone: "",
    secondaryPhone: "",
    whatsappNumber: "",
    officeAddress: "",
    officeHours: "",
    googleMapsUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    youtubeUrl: "",
    pinterestUrl: "",
    twitterUrl: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings");
      if (!res.ok) throw new Error("Failed to fetch settings");
      const data = await res.json();
      setFormData({
        companyName: data.companyName || "",
        primaryEmail: data.primaryEmail || "",
        secondaryEmail: data.secondaryEmail || "",
        careersEmail: data.careersEmail || "",
        primaryPhone: data.primaryPhone || "",
        secondaryPhone: data.secondaryPhone || "",
        whatsappNumber: data.whatsappNumber || "",
        officeAddress: data.officeAddress || "",
        officeHours: data.officeHours || "",
        googleMapsUrl: data.googleMapsUrl || "",
        facebookUrl: data.facebookUrl || "",
        instagramUrl: data.instagramUrl || "",
        linkedinUrl: data.linkedinUrl || "",
        youtubeUrl: data.youtubeUrl || "",
        pinterestUrl: data.pinterestUrl || "",
        twitterUrl: data.twitterUrl || "",
      });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save settings");

      setSuccessMessage("Site settings & social links saved successfully! Changes are now live across the website.");
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-white/60 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm">Loading site settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1.5 flex items-center gap-3">
            Site Settings & Contact Details
          </h1>
          <p className="text-white/60 text-sm">
            Manage contact emails, phone numbers, office location, and social media handles globally across the site.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex-shrink-0 cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving Changes..." : "Save Settings"}
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Contact Information */}
        <div className="bg-[#141b16] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Company & Contact Information</h2>
              <p className="text-white/50 text-xs">These details appear on the contact page, footer, and inquiry sections.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Fanoon Consultants"
                className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Primary Phone */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Primary Phone</span>
                <span className="text-primary text-[11px] font-normal lowercase">Main display number</span>
              </label>
              <input
                type="text"
                name="primaryPhone"
                value={formData.primaryPhone}
                onChange={handleChange}
                placeholder="+92 318 9944488"
                className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                WhatsApp Phone Number
              </label>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="+92 318 9944488"
                className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Primary Email */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Primary Email</span>
                <span className="text-primary text-[11px] font-normal lowercase">Footer & Contact email</span>
              </label>
              <input
                type="email"
                name="primaryEmail"
                value={formData.primaryEmail}
                onChange={handleChange}
                placeholder="fanoonconsultants9@gmail.com"
                className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Inquiries / Secondary Email */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>General Inquiries Email</span>
                <span className="text-white/40 text-[11px] font-normal lowercase">Optional</span>
              </label>
              <input
                type="email"
                name="secondaryEmail"
                value={formData.secondaryEmail}
                onChange={handleChange}
                placeholder="info@fanoonconsultants.com"
                className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Careers Email */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Careers & HR Email
              </label>
              <input
                type="email"
                name="careersEmail"
                value={formData.careersEmail}
                onChange={handleChange}
                placeholder="careers@fanoonconsultants.com"
                className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Office Address */}
          <div>
            <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
              Physical Office Address
            </label>
            <textarea
              name="officeAddress"
              rows={2}
              value={formData.officeAddress}
              onChange={handleChange}
              placeholder="Office # 202, 2nd Floor, Giga Center, Jinnah Avenue, Blue Area, Islamabad, Pakistan"
              className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Working Hours */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Office Working Hours
              </label>
              <input
                type="text"
                name="officeHours"
                value={formData.officeHours}
                onChange={handleChange}
                placeholder="Mon - Fri: 09:00 AM - 06:00 PM, Sat: 10:00 AM - 02:00 PM"
                className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Google Maps URL */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Google Maps Directions URL
              </label>
              <input
                type="url"
                name="googleMapsUrl"
                value={formData.googleMapsUrl}
                onChange={handleChange}
                placeholder="https://maps.google.com/..."
                className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Social Media Links */}
        <div className="bg-[#141b16] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Social Media Profiles</h2>
              <p className="text-white/50 text-xs">Direct links to your public social media pages across the website footer and contact sections.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Facebook */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Facebook Page URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="facebookUrl"
                  value={formData.facebookUrl}
                  onChange={handleChange}
                  placeholder="https://facebook.com/fanoonconsultants"
                  className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors pr-10"
                />
                {formData.facebookUrl && (
                  <a
                    href={formData.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-primary transition-colors"
                    title="Open link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Instagram Profile URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="instagramUrl"
                  value={formData.instagramUrl}
                  onChange={handleChange}
                  placeholder="https://instagram.com/fanoonconsultants"
                  className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors pr-10"
                />
                {formData.instagramUrl && (
                  <a
                    href={formData.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-primary transition-colors"
                    title="Open link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                LinkedIn Company URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/company/fanoonconsultants"
                  className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors pr-10"
                />
                {formData.linkedinUrl && (
                  <a
                    href={formData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-primary transition-colors"
                    title="Open link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* YouTube */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                YouTube Channel URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/@fanoonconsultants"
                  className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors pr-10"
                />
                {formData.youtubeUrl && (
                  <a
                    href={formData.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-primary transition-colors"
                    title="Open link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Pinterest */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Pinterest Profile URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="pinterestUrl"
                  value={formData.pinterestUrl}
                  onChange={handleChange}
                  placeholder="https://pinterest.com/fanoonconsultants"
                  className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors pr-10"
                />
                {formData.pinterestUrl && (
                  <a
                    href={formData.pinterestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-primary transition-colors"
                    title="Open link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Twitter / X */}
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Twitter / X Profile URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="twitterUrl"
                  value={formData.twitterUrl}
                  onChange={handleChange}
                  placeholder="https://x.com/fanoonconsultants"
                  className="w-full bg-[#1c261f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary focus:outline-none transition-colors pr-10"
                />
                {formData.twitterUrl && (
                  <a
                    href={formData.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-primary transition-colors"
                    title="Open link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2.5 transition-all shadow-lg shadow-primary/25 disabled:opacity-50 cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "SAVING SETTINGS..." : "SAVE SETTINGS"}
          </button>
        </div>
      </form>
    </div>
  );
}
