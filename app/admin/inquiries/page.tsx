import React from "react";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { sql } from "drizzle-orm";
import InquiryTableRow from "@/components/admin/InquiryTableRow";

export const revalidate = 0; // Fresh DB data

export default async function AdminInquiriesPage() {
  const allInquiries = await db
    .select()
    .from(inquiries)
    .orderBy(sql`${inquiries.createdAt} DESC`);

  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Client Inquiries ({allInquiries.length})
          </h1>
          <p className="text-white/60 text-sm">
            All leads submitted through the website contact forms.
          </p>
        </div>
      </div>

      <div className="bg-[#141b16] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        {allInquiries.length === 0 ? (
          <div className="p-12 text-center text-white/50 text-sm">
            No client inquiries found in database yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1c261f] text-white/50 uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4 pl-6">Client Name</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Requested Service</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {allInquiries.map((inq) => (
                  <InquiryTableRow key={inq.id} inquiry={inq} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
