"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  FileText, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Loader2, 
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  GraduationCap
} from "lucide-react";

export interface Application {
  id: string;
  role: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  currentPosition?: string;
  highestQualification: string;
  institution?: string;
  registrationNumber?: string;
  affiliations?: string;
  specialization?: string;
  softwareProficiency: string; // JSON string array
  department: string;
  availability: string;
  motivation: string;
  portfolioLink?: string;
  resumeFileName?: string;
  resumeFileSize?: number;
  status: string;
  createdAt: string;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/applications");
      const data = await res.json();
      if (data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/admin/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
      fetchApplications();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the application submitted by ${name}?`)) {
      return;
    }

    try {
      await fetch(`/api/admin/applications?id=${id}`, {
        method: "DELETE",
      });
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(null);
      }
      fetchApplications();
    } catch (err) {
      console.error("Failed to delete application:", err);
    }
  };

  // Filter applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      selectedRoleFilter === "all" ||
      app.role.toLowerCase().includes(selectedRoleFilter.toLowerCase());

    return matchesSearch && matchesRole;
  });

  const pendingCount = applications.filter((a) => a.status === "pending").length;

  const parseSoftware = (raw: string) => {
    try {
      return JSON.parse(raw) as string[];
    } catch {
      return [];
    }
  };

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Candidate Applications
          </h1>
          <p className="text-white/60 text-sm">
            Review job applicants, qualifications, software proficiencies, and attached candidate resumes.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-6">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-2">
            Total Submissions
          </span>
          <div className="text-3xl font-extrabold text-white">{applications.length}</div>
        </div>
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-6">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-2">
            Pending Review
          </span>
          <div className="text-3xl font-extrabold text-amber-400">{pendingCount}</div>
        </div>
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-6">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-2">
            Shortlisted Candidates
          </span>
          <div className="text-3xl font-extrabold text-primary">
            {applications.filter((a) => a.status === "shortlisted").length}
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#141b16] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidates by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="bg-[#0a0f0b] border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Roles</option>
            <option value="Architect">Architect</option>
            <option value="Interior Designer">Interior Designer</option>
            <option value="3D Visualizer">3D Visualizer</option>
            <option value="Landscape Architect">Landscape Architect</option>
            <option value="Draftsman">Draftsman</option>
            <option value="Structural Engineer">Structural Engineer</option>
            <option value="Civil Engineer">Civil Engineer</option>
            <option value="Quantity Surveyor">Quantity Surveyor</option>
            <option value="General">General Application</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-[#141b16] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-white/50 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-sm">Loading applications...</span>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="py-20 text-center text-white/50">
            <FileText className="w-12 h-12 mx-auto mb-3 text-white/20" />
            <p className="text-base font-semibold text-white/70">No applications found</p>
            <p className="text-xs mt-1">Applications submitted by candidates will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-white/80">
              <thead className="bg-white/5 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-white/60">
                <tr>
                  <th className="py-4 px-6">Candidate & Position</th>
                  <th className="py-4 px-6">Contact Details</th>
                  <th className="py-4 px-6">Attached Resume</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white text-base mb-0.5">
                        {app.fullName}
                      </div>
                      <div className="text-xs text-primary font-medium">{app.role}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-xs text-white/80 mb-0.5">{app.email}</div>
                      <div className="text-xs text-white/50">{app.phone} • {app.location}</div>
                    </td>
                    <td className="py-4 px-6">
                      {app.resumeFileName ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          <FileText className="w-3.5 h-3.5" />
                          {app.resumeFileName}
                        </span>
                      ) : (
                        <span className="text-xs text-white/40">No file</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-xs text-white/50">
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          app.status === "shortlisted"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : app.status === "reviewed"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : app.status === "rejected"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="bg-primary hover:bg-[#128351] text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDelete(app.id, app.fullName)}
                          className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Candidate Profile Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141b16] border border-white/15 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 sticky top-0 bg-[#141b16] z-10">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                  {selectedApp.role}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedApp.fullName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-white/40 hover:text-white text-2xl transition-colors"
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
                    {selectedApp.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50">Update Status:</span>
                  <div className="flex gap-2">
                    {["pending", "reviewed", "shortlisted", "rejected"].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedApp.id, st)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-colors ${
                          selectedApp.status === st
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
                  <Mail className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-[11px] text-white/40 uppercase">Email Address</div>
                    <a href={`mailto:${selectedApp.email}`} className="text-sm text-white font-medium hover:underline">
                      {selectedApp.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-[11px] text-white/40 uppercase">Phone Number</div>
                    <a href={`tel:${selectedApp.phone}`} className="text-sm text-white font-medium hover:underline">
                      {selectedApp.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-[11px] text-white/40 uppercase">Location</div>
                    <div className="text-sm text-white font-medium capitalize">{selectedApp.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-[11px] text-white/40 uppercase">Applied Date</div>
                    <div className="text-sm text-white font-medium">
                      {new Date(selectedApp.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional & Academic */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-3">
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest">
                  Professional & Academic Background
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/50 text-xs block">Experience</span>
                    <span className="text-white font-medium">{selectedApp.experience}</span>
                  </div>
                  <div>
                    <span className="text-white/50 text-xs block">Highest Qualification</span>
                    <span className="text-white font-medium">{selectedApp.highestQualification}</span>
                  </div>
                  {selectedApp.currentPosition && (
                    <div>
                      <span className="text-white/50 text-xs block">Current Position</span>
                      <span className="text-white font-medium">{selectedApp.currentPosition}</span>
                    </div>
                  )}
                  {selectedApp.institution && (
                    <div>
                      <span className="text-white/50 text-xs block">Institution</span>
                      <span className="text-white font-medium">{selectedApp.institution}</span>
                    </div>
                  )}
                  {selectedApp.registrationNumber && (
                    <div>
                      <span className="text-white/50 text-xs block">Registration Number</span>
                      <span className="text-white font-medium">{selectedApp.registrationNumber}</span>
                    </div>
                  )}
                  {selectedApp.specialization && (
                    <div>
                      <span className="text-white/50 text-xs block">Specialization</span>
                      <span className="text-white font-medium capitalize">{selectedApp.specialization}</span>
                    </div>
                  )}
                </div>

                {/* Software Badges */}
                {parseSoftware(selectedApp.softwareProficiency).length > 0 && (
                  <div className="pt-3 border-t border-white/10">
                    <span className="text-white/50 text-xs block mb-2">Software Proficiencies</span>
                    <div className="flex flex-wrap gap-2">
                      {parseSoftware(selectedApp.softwareProficiency).map((sw) => (
                        <span
                          key={sw}
                          className="px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-md text-xs font-medium"
                        >
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Motivation Statement */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-2">
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest">
                  Why join Fanoon / Introduction
                </h3>
                <p className="text-white/80 text-sm leading-relaxed italic">
                  &ldquo;{selectedApp.motivation}&rdquo;
                </p>
              </div>

              {/* Portfolio Link & Resume info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedApp.portfolioLink && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <span className="text-white/50 text-xs block mb-1">Portfolio Link</span>
                    <a
                      href={selectedApp.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm font-medium hover:underline flex items-center gap-1.5"
                    >
                      Open Portfolio / Drive
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {selectedApp.resumeFileName && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <span className="text-white/50 text-xs block mb-1">Attached Document</span>
                    <div className="text-sm font-medium text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      {selectedApp.resumeFileName}
                    </div>
                    <span className="text-[11px] text-white/40 block mt-1">
                      (Sent directly as attachment in admin notification email)
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
