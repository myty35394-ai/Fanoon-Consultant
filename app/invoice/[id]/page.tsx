import React from "react";
import { db } from "@/db";
import { invoices, bankAccounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, AlertCircle, Calendar, Receipt, Building, CreditCard } from "lucide-react";
import PaymentForm from "./PaymentForm";
import { getSiteSettings } from "@/lib/settings";

export default async function PublicInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const settings = await getSiteSettings();

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

  if (!bank) return notFound();

  const isPaid = invoice.status === "paid";
  const isProcessing = invoice.status === "processing";
  const isCancelled = invoice.status === "cancelled";

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 md:py-24 px-6 text-charcoal">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Status Banner */}
        {isPaid && (
          <div className="bg-[#eaf7f0] border border-[#169B62]/30 text-[#128351] p-4 rounded-lg flex items-center justify-center gap-3 mb-8 shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
            <p className="font-bold text-sm">Payment received successfully. Thank you!</p>
          </div>
        )}
        {isProcessing && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg flex items-center justify-center gap-3 mb-8 shadow-sm">
            <AlertCircle className="w-5 h-5" />
            <p className="font-bold text-sm">Payment proof submitted. Awaiting verification from administration.</p>
          </div>
        )}
        {isCancelled && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center justify-center gap-3 mb-8 shadow-sm">
            <AlertCircle className="w-5 h-5" />
            <p className="font-bold text-sm">This invoice has been cancelled.</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#eaeaea]">
          
          {/* Invoice Header */}
          <div className="bg-[#0a0f0c] text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col gap-6">
              <Image src="/logo.png" alt="Fanoon Consultants" width={200} height={60} className="object-contain" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">INVOICE</h1>
                <p className="text-white/60 font-medium">#{invoice.invoiceNumber}</p>
              </div>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
              <p className="text-white/60 text-sm font-medium mb-2 uppercase tracking-wider">Total Amount Due</p>
              <p className="text-4xl md:text-5xl font-bold text-primary">Rs. {invoice.amount.toLocaleString()}</p>
            </div>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Column: Details */}
            <div className="space-y-10">
              
              {/* Bill To */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-dark-gray/50 mb-3 border-b pb-2">Billed To</h3>
                <p className="font-bold text-lg">{invoice.clientName}</p>
                {invoice.clientEmail && <p className="text-dark-gray/80 text-sm">{invoice.clientEmail}</p>}
                {invoice.clientPhone && <p className="text-dark-gray/80 text-sm">{invoice.clientPhone}</p>}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-dark-gray/50 mb-3 border-b pb-2">Description of Services</h3>
                {invoice.projectName && (
                  <p className="font-bold text-sm mb-2">Project: <span className="font-medium text-dark-gray/80">{invoice.projectName}</span></p>
                )}
                <p className="text-dark-gray/80 text-sm whitespace-pre-wrap leading-relaxed">{invoice.description}</p>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-6 bg-[#f8f9fa] p-4 rounded-lg">
                <div>
                  <p className="text-xs font-bold text-dark-gray/50 mb-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Date Issued</p>
                  <p className="font-bold text-sm">{new Date(invoice.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-dark-gray/50 mb-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Due Date</p>
                  <p className="font-bold text-sm text-[#d32f2f]">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                </div>
              </div>

            </div>

            {/* Right Column: Payment Instructions */}
            <div className="space-y-8 relative">
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#eaeaea] to-transparent hidden md:block"></div>
              
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-dark-gray/50 mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Payment Instructions
                </h3>
                <p className="text-sm text-dark-gray/80 mb-6 leading-relaxed">
                  Please transfer the total amount to the bank account below. Once transferred, upload a screenshot of your receipt.
                </p>

                <div className="bg-[#f8f9fa] border border-[#eaeaea] rounded-xl p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-dark-gray/50 uppercase">Bank Name</p>
                      <p className="font-bold text-charcoal">{bank.bankName}</p>
                    </div>
                  </div>
                  <div className="pl-8 space-y-3">
                    <div>
                      <p className="text-[11px] font-bold text-dark-gray/50 uppercase">Account Title</p>
                      <p className="font-medium text-sm text-charcoal">{bank.accountTitle}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-dark-gray/50 uppercase">Account Number</p>
                      <p className="font-mono font-bold text-lg text-charcoal">{bank.accountNumber}</p>
                    </div>
                    {bank.iban && (
                      <div>
                        <p className="text-[11px] font-bold text-dark-gray/50 uppercase">IBAN</p>
                        <p className="font-mono text-sm font-medium text-charcoal">{bank.iban}</p>
                      </div>
                    )}
                    {bank.branchCode && (
                      <div>
                        <p className="text-[11px] font-bold text-dark-gray/50 uppercase">Branch Code</p>
                        <p className="font-mono text-sm font-medium text-charcoal">{bank.branchCode}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {!isPaid && !isProcessing && !isCancelled && (
                <div className="pt-4">
                  <PaymentForm invoiceId={invoice.id} />
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="text-center text-dark-gray/50 text-xs font-medium">
          If you have any questions regarding this invoice, please contact us at <a href={`mailto:${settings.primaryEmail}`} className="text-primary hover:underline">{settings.primaryEmail}</a>
        </div>
      </div>
    </div>
  );
}
