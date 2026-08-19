import React from "react";
import { db } from "@/db";
import { invoices, bankAccounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, FileText, User, Building, Copy, ExternalLink, Link2 } from "lucide-react";
import Image from "next/image";
import AdminInvoiceDetailClient from "./AdminInvoiceDetailClient";
import ShareLinkWidget from "./ShareLinkWidget";

export default async function AdminInvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await db
    .select()
    .from(invoices)
    .leftJoin(bankAccounts, eq(invoices.bankAccountId, bankAccounts.id))
    .where(eq(invoices.id, id))
    .limit(1);

  if (data.length === 0) {
    notFound();
  }

  const invoice = data[0].invoices;
  const bank = data[0].bank_accounts;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const shareLink = `${appUrl}/invoice/${invoice.id}`;

  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/invoices" className="p-2.5 bg-[#141b16] border border-white/10 hover:border-primary/50 rounded-xl text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Invoice {invoice.invoiceNumber}</h1>
            <p className="text-white/50 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Created on {new Date(invoice.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <a
            href={shareLink}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-semibold text-white flex items-center gap-2 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Preview Public Page
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Main Left Column (3/4 width on XL) */}
        <div className="xl:col-span-3 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Client Info Card */}
            <div className="bg-[#141b16] border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <User className="w-24 h-24" />
              </div>
              <h2 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-6 flex items-center gap-2">
                <User className="w-4 h-4" /> Client Information
              </h2>
              <div className="space-y-4 relative z-10">
                <div>
                  <p className="text-white font-bold text-xl mb-1">{invoice.clientName}</p>
                  <p className="text-primary font-medium">{invoice.clientEmail}</p>
                </div>
                {invoice.clientPhone && (
                  <div>
                    <p className="text-white/40 text-xs font-medium uppercase mb-1">Phone</p>
                    <p className="text-white/90">{invoice.clientPhone}</p>
                  </div>
                )}
                {invoice.projectName && (
                  <div>
                    <p className="text-white/40 text-xs font-medium uppercase mb-1">Project</p>
                    <p className="text-white/90">{invoice.projectName}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bank Info Card */}
            <div className="bg-[#141b16] border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Building className="w-24 h-24" />
              </div>
              <h2 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Building className="w-4 h-4" /> Assigned Bank
              </h2>
              {bank ? (
                <div className="space-y-4 relative z-10">
                  <div>
                    <p className="text-white font-bold text-xl mb-1">{bank.bankName}</p>
                    <p className="text-white/70 font-medium">{bank.accountTitle}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-medium uppercase mb-1">Account Number</p>
                    <p className="text-white/90 font-mono text-lg">{bank.accountNumber}</p>
                  </div>
                </div>
              ) : (
                <p className="text-red-400">Bank account not found or deleted.</p>
              )}
            </div>
          </div>

          {/* Invoice Particulars */}
          <div className="bg-[#141b16] border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-8 border-b border-white/10">
              <h2 className="text-sm font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" /> Invoice Particulars
              </h2>
            </div>
            
            <div className="p-8">
              <div className="flex flex-col md:flex-row justify-between mb-8 gap-8 border-b border-white/5 pb-8">
                <div className="flex-1">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-2">Description of Services</p>
                  <p className="text-white/90 whitespace-pre-wrap leading-relaxed">{invoice.description}</p>
                </div>
                <div className="md:w-48 shrink-0 text-right">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-2">Due Date</p>
                  <p className="text-red-400 font-bold">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="text-white/40 text-sm font-medium">Total Amount Due</div>
                <div className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                  <span className="text-xl md:text-2xl text-primary/70 mr-2">Rs.</span>
                  {invoice.amount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1/4 width on XL) */}
        <div className="space-y-8">
          {/* Share Link Widget */}
          <ShareLinkWidget shareLink={shareLink} />

          {/* Payment Status Manager */}
          <div className="bg-[#141b16] border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-white mb-4">Payment Status</h2>
            
            <AdminInvoiceDetailClient invoice={invoice} />
            
            {invoice.paymentProofUrl && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white/90 text-sm font-bold">Payment Proof Uploaded</p>
                  <p className="text-white/40 text-xs">{new Date(invoice.updatedAt).toLocaleDateString()}</p>
                </div>
                
                <a href={invoice.paymentProofUrl} target="_blank" rel="noreferrer" className="block relative aspect-[4/5] w-full rounded-xl overflow-hidden border-2 border-white/10 hover:border-primary transition-colors group shadow-lg">
                  <Image src={invoice.paymentProofUrl} alt="Payment Proof" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                    <ExternalLink className="w-8 h-8 text-white" />
                    <span className="text-white text-sm font-bold tracking-wider">VIEW RECEIPT</span>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
