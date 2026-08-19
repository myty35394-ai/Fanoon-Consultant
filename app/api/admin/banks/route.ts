import { NextResponse } from "next/server";
import { db } from "@/db";
import { bankAccounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export async function GET() {
  try {
    const banks = await db.select().from(bankAccounts).orderBy(bankAccounts.createdAt);
    return NextResponse.json(banks);
  } catch (error) {
    console.error("Error fetching banks:", error);
    return NextResponse.json({ error: "Failed to fetch bank accounts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bankName, accountTitle, accountNumber, iban, branchCode, isActive } = body;

    if (!bankName || !accountTitle || !accountNumber) {
      return NextResponse.json(
        { error: "Bank name, account title, and account number are required" },
        { status: 400 }
      );
    }

    const newBank = await db
      .insert(bankAccounts)
      .values({
        id: crypto.randomUUID(),
        bankName,
        accountTitle,
        accountNumber,
        iban: iban || null,
        branchCode: branchCode || null,
        isActive: isActive !== undefined ? isActive : true,
      })
      .returning();

    return NextResponse.json({ success: true, bank: newBank[0] });
  } catch (error) {
    console.error("Error creating bank account:", error);
    return NextResponse.json({ error: "Failed to create bank account" }, { status: 500 });
  }
}
