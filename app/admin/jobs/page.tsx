"use client";

import React, { useState, useEffect } from "react";
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Search,
  MapPin,
  Clock,
  Sparkles,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

// 8 Predefined roles with dedicated custom application pages
const predefinedRoles = [
  "architect",
  "interior-designer",
  "3d-visualizer",
  "landscape-architect",
  "draftsman",
  "structural-engineer",
  "civil-engineer",
  "quantity-surveyor",
];

export interface JobPosting {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description?: string;
  requirements?: string;
  active: boolean;
  order: number;
  createdAt: string;
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("Peshawar, Pakistan");
  const [type, setType] = useState("Full-time");
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/jobs");
      const data = await res.json();
      if (data.jobs) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openCreateModal = () => {
    setEditingJob(null);
    setTitle("");
    setDepartment("");
    setLocation("Peshawar, Pakistan");
    setType("Full-time");
    setOrder(jobs.length + 1);
    setActive(true);
    setDescription("");
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (job: JobPosting) => {
    setEditingJob(job);
    setTitle(job.title);
    setDepartment(job.department);
    setLocation(job.location || "Peshawar, Pakistan");
    setType(job.type || "Full-time");
    setOrder(job.order || 0);
    setActive(job.active);
    setDescription(job.description || "");
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !department.trim()) {
      setFormError("Job Title and Department are required.");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      if (editingJob) {
        // Update
        const res = await fetch("/api/admin/jobs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingJob.id,
            title: title.trim(),
            department: department.trim(),
            location: location.trim(),
            type,
            order,
            active,
            description: description.trim(),
          }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to update job");
      } else {
        // Create
        const res = await fetch("/api/admin/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            department: department.trim(),
            location: location.trim(),
            type,
            order,
            active,
            description: description.trim(),
          }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to create job");
      }

      setIsModalOpen(false);
      fetchJobs();
    } catch (err: any) {
      setFormError(err.message || "Failed to save job posting");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleActiveStatus = async (job: JobPosting) => {
    try {
      await fetch("/api/admin/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: job.id,
          active: !job.active,
        }),
      });
      fetchJobs();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the job posting: "${title}"?`)) {
      return;
    }

    try {
      await fetch(`/api/admin/jobs?id=${id}`, {
        method: "DELETE",
      });
      fetchJobs();
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  // Helper to determine destination URL
  const getJobUrl = (job: JobPosting) => {
    const slug = job.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");

    // Match one of the predefined roles
    const matched = predefinedRoles.find((r) => r === slug || r === job.slug);
    if (matched) {
      return `/about-us/careers/${matched}`;
    }
    return `/about-us/careers/general?role=${encodeURIComponent(job.title)}`;
  };

  const isDedicatedForm = (job: JobPosting) => {
    const slug = job.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");
    return predefinedRoles.some((r) => r === slug || r === job.slug);
  };

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = jobs.filter((j) => j.active).length;

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" />
            Job Postings & Careers
          </h1>
          <p className="text-white/60 text-sm">
            Manage open opportunities displayed on the public careers page. Custom positions automatically route to the General Application form.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-primary hover:bg-[#128351] text-white px-5 py-3 rounded-lg font-bold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          Add New Job
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-6">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-2">
            Total Positions
          </span>
          <div className="text-3xl font-extrabold text-white">{jobs.length}</div>
        </div>
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-6">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-2">
            Active on Website
          </span>
          <div className="text-3xl font-extrabold text-primary">{activeCount}</div>
        </div>
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-6">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-2">
            Archived / Inactive
          </span>
          <div className="text-3xl font-extrabold text-white/40">{jobs.length - activeCount}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#141b16] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search positions by title or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="text-xs text-white/50">
          Showing {filteredJobs.length} of {jobs.length} positions
        </div>
      </div>

      {/* Jobs List Table */}
      <div className="bg-[#141b16] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-white/50 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-sm">Loading job postings...</span>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-20 text-center text-white/50">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-white/20" />
            <p className="text-base font-semibold text-white/70">No job postings found</p>
            <p className="text-xs mt-1">Click &ldquo;Add New Job&rdquo; to post a new opening.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-white/80">
              <thead className="bg-white/5 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-white/60">
                <tr>
                  <th className="py-4 px-6">Job Title & Department</th>
                  <th className="py-4 px-6">Location & Type</th>
                  <th className="py-4 px-6">Form Destination</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredJobs.map((job) => {
                  const destinationUrl = getJobUrl(job);
                  const isDedicated = isDedicatedForm(job);

                  return (
                    <tr key={job.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white text-base mb-0.5">
                          {job.title}
                        </div>
                        <div className="text-xs text-white/50">{job.department}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
                          <MapPin className="w-3.5 h-3.5 text-white/40" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-white/50">
                          <Clock className="w-3.5 h-3.5 text-white/40" />
                          {job.type}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {isDedicated ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            Dedicated Form
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <Sparkles className="w-3 h-3" />
                            General Form
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleActiveStatus(job)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                            job.active
                              ? "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30"
                              : "bg-white/10 text-white/40 border border-white/10 hover:bg-white/20"
                          }`}
                        >
                          {job.active ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              Hidden
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={destinationUrl}
                            target="_blank"
                            className="p-2 text-white/60 hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
                            title="View Public Form"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => openEditModal(job)}
                            className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            title="Edit Job"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(job.id, job.title)}
                            className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete Job"
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

      {/* Add / Edit Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141b16] border border-white/15 rounded-2xl w-full max-w-xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                {editingJob ? "Edit Job Posting" : "Post New Job Opportunity"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                &times;
              </button>
            </div>

            {formError && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Urban Planner, BIM Specialist"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Urban Planning & Architecture"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                    Job Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-[#0a0f0b] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-white/20 focus:ring-primary accent-[#169B62]"
                />
                <label htmlFor="activeCheck" className="text-sm text-white/80 cursor-pointer">
                  Publish position actively on Careers page
                </label>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-[#128351] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>Save Position</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
