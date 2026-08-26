"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  DollarSign,
  Briefcase,
  FileText,
  Trash2,
  Search,
  Loader2,
  ExternalLink,
  Clock,
  CheckCircle2,
  Paperclip,
  Download,
  AlertCircle
} from "lucide-react";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  location: string | null;
  estimatedStartDate: string | null;
  service: string | null;
  projectType: string | null;
  budgetRange: string | null;
  attachments: string | null; // JSON string: array of Cloudinary URLs
  message: string;
  status: string | null;
  createdAt: string | Date;
}

export default function AdminInquiriesPage() {
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.inquiries) {
        setInquiriesList(data.inquiries);
      }
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
        setInquiriesList((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Failed to update inquiry status:", err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the inquiry from ${name}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(null);
        }
        setInquiriesList((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  const parseAttachments = (raw: string | null | undefined): string[] => {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const formatBudgetLabel = (budget: string | null) => {
    if (!budget) return "Not specified";
    switch (budget) {
      case "under-5m":
        return "Under 5M PKR";
      case "5m-10m":
        return "5M - 10M PKR";
      case "10m-50m":
        return "10M - 50M PKR";
      case "above-50m":
        return "Above 50M PKR";
      case "undecided":
        return "To be decided";
      default:
        return budget;
    }
  };

  const formatProjectType = (type: string | null) => {
    if (!type) return "General Project";
    switch (type) {
      case "architecture":
        return "Architecture Design";
      case "interior":
        return "Interior Design";
      case "landscape":
        return "Landscape Design";
      case "construction":
        return "Construction";
      case "other":
        return "Other";
      default:
        return type;
    }
  };

  // Filter inquiries
  const filteredInquiries = inquiriesList.filter((inq) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.phone && inq.phone.toLowerCase().includes(q)) ||
      (inq.company && inq.company.toLowerCase().includes(q)) ||
      (inq.location && inq.location.toLowerCase().includes(q)) ||
      (inq.service && inq.service.toLowerCase().includes(q)) ||
      (inq.projectType && inq.projectType.toLowerCase().includes(q)) ||
      inq.message.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" || (inq.status || "pending").toLowerCase() === statusFilter.toLowerCase();

    const matchesService =
      serviceFilter === "all" ||
      (inq.service && inq.service.toLowerCase().includes(serviceFilter.toLowerCase())) ||
      (inq.projectType && inq.projectType.toLowerCase().includes(serviceFilter.toLowerCase()));

    return matchesSearch && matchesStatus && matchesService;
  });

  const pendingCount = inquiriesList.filter((a) => (a.status || "pending") === "pending").length;
  const reviewedCount = inquiriesList.filter((a) => a.status === "reviewed").length;

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-primary" />
            Client Inquiries & Leads
          </h1>
          <p className="text-white/60 text-sm">
            Review contact form submissions, project briefs, estimated budgets, and client attachments.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-6">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-2">
            Total Inquiries
          </span>
          <div className="text-3xl font-extrabold text-white">{inquiriesList.length}</div>
        </div>
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-6">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-2">
            Pending Review
          </span>
          <div className="text-3xl font-extrabold text-amber-400">{pendingCount}</div>
        </div>
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-6">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-2">
            Reviewed Leads
          </span>
          <div className="text-3xl font-extrabold text-primary">{reviewedCount}</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#141b16] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, email, phone, location or brief..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0a0f0b] border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="bg-[#0a0f0b] border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Services</option>
            <option value="architecture">Architecture Design</option>
            <option value="interior">Interior Design</option>
            <option value="landscape">Landscape Design</option>
            <option value="construction">Construction Supervision</option>
            <option value="project">Project Inquiry</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-[#141b16] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-white/50 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-sm">Loading client inquiries...</span>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-20 text-center text-white/50">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-white/20" />
            <p className="text-base font-semibold text-white/70">No inquiries found</p>
            <p className="text-xs mt-1">Leads submitted through the contact forms will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-white/80">
              <thead className="bg-white/5 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-white/60">
                <tr>
                  <th className="py-4 px-6">Client Name</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Requested Service</th>
                  <th className="py-4 px-6">Message Preview</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredInquiries.map((inq) => {
                  const attachments = parseAttachments(inq.attachments);
                  const currentStatus = inq.status || "pending";

                  return (
                    <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white text-base mb-0.5">
                          {inq.name}
                        </div>
                        {inq.company ? (
                          <div className="text-xs text-white/50 flex items-center gap-1">
                            <Building className="w-3 h-3 text-white/40" />
                            {inq.company}
                          </div>
                        ) : inq.location ? (
                          <div className="text-xs text-white/50 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-white/40" />
                            {inq.location}
                          </div>
                        ) : null}
                      </td>

                      <td className="py-4 px-6">
                        <div className="text-xs text-white/90 mb-0.5 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-primary" />
                          <a href={`mailto:${inq.email}`} className="hover:underline">
                            {inq.email}
                          </a>
                        </div>
                        {inq.phone && (
                          <div className="text-xs text-white/50 flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-white/40" />
                            <a href={`tel:${inq.phone}`} className="hover:underline">
                              {inq.phone}
                            </a>
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-white/90">
                          {inq.service || formatProjectType(inq.projectType)}
                        </span>
                        {attachments.length > 0 && (
                          <span className="ml-2 inline-flex items-center gap-1 text-[11px] text-primary font-medium">
                            <Paperclip className="w-3 h-3" />
                            {attachments.length}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 max-w-xs">
                        <p className="line-clamp-2 text-white/60 text-xs leading-relaxed">
                          {inq.message}
                        </p>
                      </td>

                      <td className="py-4 px-6 text-xs text-white/50 whitespace-nowrap">
                        {new Date(inq.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            currentStatus === "reviewed"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : currentStatus === "archived"
                              ? "bg-white/10 text-white/40 border border-white/20"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {currentStatus}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="bg-primary hover:bg-[#128351] text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleDelete(inq.id, inq.name)}
                            className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Details Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141b16] border border-white/15 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 sticky top-0 bg-[#141b16] z-10">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                  {selectedInquiry.service || formatProjectType(selectedInquiry.projectType)}
                </div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  {selectedInquiry.name}
                  {selectedInquiry.company && (
                    <span className="text-sm font-normal text-white/50">
                      ({selectedInquiry.company})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-white/40 hover:text-white text-2xl transition-colors cursor-pointer p-1"
              >
                &times;
              </button>
            </div>

            <div className="space-y-6">
              {/* Status Bar */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50">Current Status:</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {selectedInquiry.status || "pending"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50">Update Status:</span>
                  <div className="flex gap-2">
                    {["pending", "reviewed", "archived"].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          (selectedInquiry.status || "pending") === st
                            ? "bg-primary text-white"
                            : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Personal & Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[11px] text-white/40 uppercase">Email Address</div>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-sm text-white font-medium hover:underline break-all"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[11px] text-white/40 uppercase">Phone Number</div>
                    {selectedInquiry.phone ? (
                      <a
                        href={`tel:${selectedInquiry.phone}`}
                        className="text-sm text-white font-medium hover:underline"
                      >
                        {selectedInquiry.phone}
                      </a>
                    ) : (
                      <span className="text-sm text-white/40">Not provided</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[11px] text-white/40 uppercase">Project Location</div>
                    <div className="text-sm text-white font-medium capitalize">
                      {selectedInquiry.location || "Not specified"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[11px] text-white/40 uppercase">Submitted Date</div>
                    <div className="text-sm text-white font-medium">
                      {new Date(selectedInquiry.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Scope & Requirements */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-3">
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest">
                  Project Details & Scope
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/50 text-xs block">Service Requested</span>
                    <span className="text-white font-medium">
                      {selectedInquiry.service || "General Inquiry"}
                    </span>
                  </div>

                  <div>
                    <span className="text-white/50 text-xs block">Project Type</span>
                    <span className="text-white font-medium">
                      {formatProjectType(selectedInquiry.projectType)}
                    </span>
                  </div>

                  {selectedInquiry.budgetRange && (
                    <div>
                      <span className="text-white/50 text-xs block">Budget Range</span>
                      <span className="text-white font-medium">
                        {formatBudgetLabel(selectedInquiry.budgetRange)}
                      </span>
                    </div>
                  )}

                  {selectedInquiry.estimatedStartDate && (
                    <div>
                      <span className="text-white/50 text-xs block">Estimated Start Timeline</span>
                      <span className="text-white font-medium">
                        {selectedInquiry.estimatedStartDate}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Client Message / Brief */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-2">
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest">
                  Client Message / Project Brief
                </h3>
                <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line bg-black/30 p-4 rounded-lg border border-white/5">
                  {selectedInquiry.message}
                </p>
              </div>

              {/* Attached Files & Documents */}
              {parseAttachments(selectedInquiry.attachments).length > 0 && (
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5" />
                    Attached Files ({parseAttachments(selectedInquiry.attachments).length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {parseAttachments(selectedInquiry.attachments).map((url, idx) => {
                      const isImage = url.match(/\.(jpeg|jpg|gif|png|webp)($|\?)/i);
                      return (
                        <a
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/10 hover:border-primary/50 transition-colors group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileText className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-xs text-white/80 group-hover:text-white truncate">
                              Attachment #{idx + 1} {isImage ? "(Image)" : "(Document)"}
                            </span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-primary shrink-0 ml-2" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Footer */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Regarding%20your%20inquiry%20with%20Fanoon%20Consultants`}
                    className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email Client
                  </a>

                  {selectedInquiry.phone && (
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call Client
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selectedInquiry.id, selectedInquiry.name)}
                    className="px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>

                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
