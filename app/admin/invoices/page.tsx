"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Loader2, FileText, AlertCircle, Check, Eye, X } from "lucide-react";
import Link from "next/link";

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [banks, setBanks] = useState<any[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);

  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    projectName: "",
    description: "",
    amount: "",
    dueDate: "",
    bankAccountId: "",
  });

  useEffect(() => {
    fetchInvoices();
    fetchBanks();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await fetch("/api/admin/invoices");
      if (!res.ok) throw new Error("Failed to fetch invoices");
      const data = await res.json();
      setInvoices(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBanks = async () => {
    try {
      const res = await fetch("/api/admin/banks");
      const data = await res.json();
      const activeBanks = data.filter((b: any) => b.isActive);
      setBanks(activeBanks);
      if (activeBanks.length > 0) {
        setFormData(prev => ({ ...prev, bankAccountId: activeBanks[0].id }));
      }
    } catch (err) {
      console.error("Failed to fetch banks");
    } finally {
      setLoadingBanks(false);
    }
  };

  const handleOpenModal = () => {
    setFormData(prev => ({
      ...prev,
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      projectName: "",
      description: "",
      amount: "",
      dueDate: "",
    }));
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create invoice");
      
      setIsModalOpen(false);
      fetchInvoices();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;
    try {
      const res = await fetch(`/api/admin/invoices/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      fetchInvoices();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading invoices...</div>;

  return (
    <div className="space-y-8 w-full relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Invoices</h1>
          <p className="text-white/60 text-sm">Manage client invoices and payments.</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors w-fit"
        >
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      {error && !isModalOpen && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="bg-[#141b16] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        {invoices.length === 0 ? (
          <div className="p-12 text-center text-white/50 text-sm">
            No invoices generated yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1c261f] text-white/50 uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4 pl-6">Invoice</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 pl-6 font-medium text-white">{inv.invoiceNumber}</td>
                    <td className="p-4">
                      <div className="font-semibold text-white/90">{inv.clientName}</div>
                      <div className="text-white/50">{inv.clientEmail}</div>
                    </td>
                    <td className="p-4 font-bold text-white">Rs. {inv.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        inv.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' :
                        inv.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                        inv.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4">{new Date(inv.dueDate).toLocaleDateString()}</td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/invoices/${inv.id}`}
                          className="p-1.5 text-white/40 hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(inv.id)}
                          className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                          title="Delete"
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto pt-24 pb-12">
          <div className="bg-[#1a231d] w-full max-w-2xl rounded-xl shadow-2xl border border-white/10 overflow-hidden relative mt-auto mb-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#1a231d] z-10">
              <h2 className="text-xl font-bold text-white">Create New Invoice</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-2">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={e => setFormData({...formData, clientName: e.target.value})}
                    className="w-full bg-[#141b16] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-2">Client Email</label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={e => setFormData({...formData, clientEmail: e.target.value})}
                    className="w-full bg-[#141b16] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-2">Client Phone</label>
                  <input
                    type="text"
                    value={formData.clientPhone}
                    onChange={e => setFormData({...formData, clientPhone: e.target.value})}
                    className="w-full bg-[#141b16] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={formData.projectName}
                    onChange={e => setFormData({...formData, projectName: e.target.value})}
                    placeholder="e.g. Phase 1 Design"
                    className="w-full bg-[#141b16] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 mb-2">Invoice Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Detailed description of services..."
                  className="w-full bg-[#141b16] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-2">Amount (PKR) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                    placeholder="50000"
                    className="w-full bg-[#141b16] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-2">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={e => setFormData({...formData, dueDate: e.target.value})}
                    style={{ colorScheme: 'dark' }}
                    className="w-full bg-[#141b16] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 mb-2">Select Payment Bank *</label>
                {loadingBanks ? (
                  <div className="text-white/50 text-sm">Loading banks...</div>
                ) : banks.length === 0 ? (
                  <div className="text-red-400 text-sm">No active bank accounts found. Please add one first.</div>
                ) : (
                  <select
                    required
                    value={formData.bankAccountId}
                    onChange={e => setFormData({...formData, bankAccountId: e.target.value})}
                    className="w-full bg-[#141b16] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none appearance-none"
                  >
                    <option value="" disabled>Select a bank</option>
                    {banks.map(bank => (
                      <option key={bank.id} value={bank.id}>
                        {bank.bankName} - {bank.accountNumber} ({bank.accountTitle})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-[#1a231d] pb-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || banks.length === 0}
                  className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isSubmitting ? "Generating..." : "Generate Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
