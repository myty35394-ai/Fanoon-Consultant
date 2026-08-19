"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Loader2, Building, AlertCircle, X, Check } from "lucide-react";

interface BankAccount {
  id: string;
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string | null;
  branchCode: string | null;
  isActive: boolean;
}

export default function AdminBanksPage() {
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    bankName: "",
    accountTitle: "",
    accountNumber: "",
    iban: "",
    branchCode: "",
    isActive: true,
  });

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const res = await fetch("/api/admin/banks");
      if (!res.ok) throw new Error("Failed to fetch bank accounts");
      const data = await res.json();
      setBanks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (bank?: BankAccount) => {
    if (bank) {
      setEditingId(bank.id);
      setFormData({
        bankName: bank.bankName,
        accountTitle: bank.accountTitle,
        accountNumber: bank.accountNumber,
        iban: bank.iban || "",
        branchCode: bank.branchCode || "",
        isActive: bank.isActive,
      });
    } else {
      setEditingId(null);
      setFormData({
        bankName: "",
        accountTitle: "",
        accountNumber: "",
        iban: "",
        branchCode: "",
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? "/api/admin/banks/" + editingId : "/api/admin/banks";
      const method = editingId ? "PATCH" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save bank account");
      
      setIsModalOpen(false);
      fetchBanks();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this bank account?")) return;
    try {
      const res = await fetch("/api/admin/banks/" + id, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      fetchBanks();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading bank accounts...</div>;

  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Bank Accounts</h1>
          <p className="text-white/60 text-sm">Manage bank accounts available for invoice payments.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Bank Account
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banks.length === 0 ? (
          <div className="col-span-full p-12 bg-[#141b16] border border-white/10 rounded-xl text-center text-white/50">
            No bank accounts added yet.
          </div>
        ) : (
          banks.map((bank) => (
            <div key={bank.id} className="bg-[#141b16] border border-white/10 rounded-xl p-6 relative group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{bank.bankName}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${bank.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/40'}`}>
                      {bank.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(bank)} className="p-1.5 text-white/40 hover:text-white transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(bank.id)} className="p-1.5 text-white/40 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 mt-4 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Title:</span>
                  <span className="text-white/90 font-medium">{bank.accountTitle}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 pt-1">
                  <span className="text-white/40">Account:</span>
                  <span className="text-white/90 font-medium">{bank.accountNumber}</span>
                </div>
                {bank.iban && (
                  <div className="flex justify-between border-b border-white/5 pb-2 pt-1">
                    <span className="text-white/40">IBAN:</span>
                    <span className="text-white/90 font-medium">{bank.iban}</span>
                  </div>
                )}
                {bank.branchCode && (
                  <div className="flex justify-between pt-1">
                    <span className="text-white/40">Branch:</span>
                    <span className="text-white/90 font-medium">{bank.branchCode}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1a231d] w-full max-w-lg rounded-xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Edit Bank Account" : "Add Bank Account"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-2">Bank Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.bankName}
                    onChange={e => setFormData({...formData, bankName: e.target.value})}
                    placeholder="e.g. Meezan Bank"
                    className="w-full bg-[#141b16] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-2">Account Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.accountTitle}
                    onChange={e => setFormData({...formData, accountTitle: e.target.value})}
                    placeholder="e.g. Fanoon Consultants"
                    className="w-full bg-[#141b16] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-2">Account Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.accountNumber}
                    onChange={e => setFormData({...formData, accountNumber: e.target.value})}
                    className="w-full bg-[#141b16] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-2">IBAN (Optional)</label>
                    <input
                      type="text"
                      value={formData.iban}
                      onChange={e => setFormData({...formData, iban: e.target.value})}
                      className="w-full bg-[#141b16] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-2">Branch Code (Optional)</label>
                    <input
                      type="text"
                      value={formData.branchCode}
                      onChange={e => setFormData({...formData, branchCode: e.target.value})}
                      className="w-full bg-[#141b16] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={e => setFormData({...formData, isActive: e.target.checked})}
                    className="w-4 h-4 text-primary bg-[#141b16] border-white/10 rounded"
                  />
                  <label htmlFor="isActive" className="text-sm text-white/80">Active for new invoices</label>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  {editingId ? "Update Bank" : "Add Bank"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
