import React from "react";
import Link from "next/link";
import { db } from "@/db";
import { inquiries, projects } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { Inbox, FolderKanban, ArrowUpRight, Sparkles, CheckCircle2, Clock } from "lucide-react";

export const revalidate = 0; // Fresh DB data on load

export default async function AdminDashboardOverview() {
  // Fetch real counts from Neon DB
  const [inquiryCountResult] = await db.select({ count: sql<number>`count(*)` }).from(inquiries);
  const [pendingCountResult] = await db.select({ count: sql<number>`count(*)` }).from(inquiries).where(eq(inquiries.status, "pending"));
  const [projectCountResult] = await db.select({ count: sql<number>`count(*)` }).from(projects);

  const totalInquiries = Number(inquiryCountResult?.count || 0);
  const pendingInquiries = Number(pendingCountResult?.count || 0);
  const totalProjects = Number(projectCountResult?.count || 0);

  // Fetch recent inquiries
  const recentInquiries = await db
    .select()
    .from(inquiries)
    .orderBy(sql`${inquiries.createdAt} DESC`)
    .limit(5);

  return (
    <div className="space-y-8 w-full">
      {/* Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-white/60 text-sm">
          Welcome back to the Fanoon Consultants management portal.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">
              Total Inquiries
            </span>
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {totalInquiries}
          </div>
          <span className="text-xs text-white/50">Total recorded</span>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">
              Pending Reviews
            </span>
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-400 mb-1">
            {pendingInquiries}
          </div>
          <span className="text-xs text-white/50">Requires staff follow-up</span>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#141b16] border border-white/10 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">
              Active Projects
            </span>
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 mb-1">
            {totalProjects}
          </div>
          <span className="text-xs text-white/50">Published entries</span>
        </div>
      </div>

      {/* Quick Action Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/inquiries"
          className="bg-[#141b16] hover:bg-[#1a231d] border border-white/10 rounded-xl p-6 transition-all duration-200 group flex items-start justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
              <Inbox className="w-4 h-4" />
              Manage Inquiries
            </div>
              <p className="text-white/60 text-xs leading-relaxed max-w-md">
                Review lead contact submissions, update statuses, or respond to clients directly.
              </p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
        </Link>

        <Link
          href="/admin/projects"
          className="bg-[#141b16] hover:bg-[#1a231d] border border-white/10 rounded-xl p-6 transition-all duration-200 group flex items-start justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
              <FolderKanban className="w-4 h-4" />
              Manage Portfolio Projects
            </div>
              <p className="text-white/60 text-xs leading-relaxed max-w-md">
                Add new architectural works with image uploads and publish to the live website.
              </p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-emerald-400 transition-colors" />
        </Link>
      </div>

      {/* Recent Client Inquiries Table */}
      <div className="bg-[#141b16] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-bold text-white text-base">Recent Client Inquiries</h2>
          <Link href="/admin/inquiries" className="text-xs text-primary font-semibold hover:underline">
            View All →
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <p className="text-white/60 text-sm p-8">No inquiries recorded yet. Form submissions on the live website will appear here automatically.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1c261f] text-white/50 uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4 pl-6">Client Name</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 pl-6 font-semibold text-white">{inq.name}</td>
                    <td className="p-4">
                      <div>{inq.email}</div>
                      {inq.phone && <div className="text-white/40 text-[11px]">{inq.phone}</div>}
                    </td>
                    <td className="p-4">{inq.service || "General Inquiry"}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inq.status === "pending"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-white/40">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
