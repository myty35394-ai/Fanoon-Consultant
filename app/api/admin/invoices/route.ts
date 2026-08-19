import { NextResponse } from "next/server";
import { db } from "@/db";
import { invoices, bankAccounts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import crypto from "crypto";

export async function GET() {
  try {
    const data = await db
      .select()
      .from(invoices)
      .leftJoin(bankAccounts, eq(invoices.bankAccountId, bankAccounts.id))
      .orderBy(desc(invoices.createdAt));
      
    // Format the response
    const formattedInvoices = data.map((row) => ({
      ...row.invoices,
      bankAccount: row.bank_accounts
    }));

    return NextResponse.json(formattedInvoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientName, clientEmail, clientPhone, projectName, description, amount, dueDate, bankAccountId } = body;

    if (!clientName || !description || !amount || !dueDate || !bankAccountId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate Invoice Number
    const countRes = await db.select().from(invoices);
    const invNumber = "INV-2026-" + String(countRes.length + 1).padStart(3, "0");

    const newInvoice = await db
      .insert(invoices)
      .values({
        id: crypto.randomUUID(),
        invoiceNumber: invNumber,
        clientName,
        clientEmail: clientEmail || null,
        clientPhone: clientPhone || null,
        projectName: projectName || null,
        description,
        amount: parseInt(amount, 10),
        dueDate: new Date(dueDate),
        bankAccountId,
        status: "pending",
      })
      .returning();

    return NextResponse.json({ success: true, invoice: newInvoice[0] });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}
