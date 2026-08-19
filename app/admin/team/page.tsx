"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Users, Loader2, GripVertical } from "lucide-react";
import TeamMemberFormModal, { TeamMemberRecord } from "@/components/admin/TeamMemberFormModal";

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMemberRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMember, setEditMember] = useState<TeamMemberRecord | null>(null);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      setMembers(data.members ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove "${name}" from the team? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchMembers();
    } catch (err) {
      console.error(err);
    }
  };

  const openAdd = () => {
    setEditMember(null);
    setIsModalOpen(true);
  };

  const openEdit = (member: TeamMemberRecord) => {
    setEditMember(member);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-8 w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Team Members ({members.length})
            </h1>
            <p className="text-white/60 text-sm">
              Manage the team displayed on the About Us page. Changes reflect instantly on the live website.
            </p>
          </div>

          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/20 flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Team Member
          </button>
        </div>

        {/* Members Grid / Table */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <div className="bg-[#141b16] border border-white/10 rounded-xl p-16 text-center">
            <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/50 text-sm font-medium mb-1">No team members found</p>
            <p className="text-white/30 text-xs">
              Click &quot;Add Team Member&quot; to add your first team member.
            </p>
          </div>
        ) : (
          <div className="bg-[#141b16] border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1c261f] text-white/50 uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-4 pl-6 w-8"></th>
                    <th className="p-4">Member</th>
                    <th className="p-4">Role / Title</th>
                    <th className="p-4">Bio</th>
                    <th className="p-4">LinkedIn</th>
                    <th className="p-4">Order</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-white/[0.03] transition-colors">
                      {/* Drag handle (visual only) */}
                      <td className="p-4 pl-6 text-white/20">
                        <GripVertical className="w-4 h-4" />
                      </td>

                      {/* Avatar + Name */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#1c261f] border border-white/10">
                            <Image
                              src={member.imageUrl}
                              alt={member.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <span className="font-semibold text-white text-[13px] whitespace-nowrap">
                            {member.name}
                          </span>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="p-4">
                        <span className="text-primary font-medium">{member.role}</span>
                      </td>

                      {/* Bio */}
                      <td className="p-4 max-w-[220px]">
                        <p className="text-white/50 line-clamp-2 leading-relaxed">
                          {member.description || <span className="italic text-white/25">No bio</span>}
                        </p>
                      </td>

                      {/* LinkedIn */}
                      <td className="p-4">
                        {member.socialLink ? (
                          <a
                            href={member.socialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline truncate block max-w-[120px]"
                          >
                            View Profile
                          </a>
                        ) : (
                          <span className="text-white/25 italic">—</span>
                        )}
                      </td>

                      {/* Order */}
                      <td className="p-4">
                        <span className="bg-white/5 border border-white/10 text-white/60 rounded px-2 py-1 font-mono text-[11px]">
                          {member.order ?? 0}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(member)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(member.id, member.name)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold text-red-400/70 hover:text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer hint */}
            <div className="p-4 border-t border-white/5 text-center text-white/25 text-[10px]">
              {members.length} member{members.length !== 1 ? "s" : ""} · Changes reflect live on the About Us page
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <TeamMemberFormModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditMember(null); }}
        onSuccess={fetchMembers}
        editMember={editMember}
      />
    </>
  );
}
