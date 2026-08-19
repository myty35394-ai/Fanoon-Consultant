import { NextResponse } from "next/server";
import { db } from "@/db";
import { bankAccounts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await db
      .update(bankAccounts)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(bankAccounts.id, id))
      .returning();

    return NextResponse.json({ success: true, bank: updated[0] });
  } catch (error) {
    console.error("Error updating bank account:", error);
    return NextResponse.json({ error: "Failed to update bank account" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(bankAccounts).where(eq(bankAccounts.id, id));
    return NextResponse.json({ success: true, message: "Bank account deleted" });
  } catch (error) {
    console.error("Error deleting bank account:", error);
    return NextResponse.json({ error: "Failed to delete bank account" }, { status: 500 });
  }
}
