import { NextResponse } from "next/server";
import { db } from "@/db";
import { invoices } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await db
      .update(invoices)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(invoices.id, id))
      .returning();

    return NextResponse.json({ success: true, invoice: updated[0] });
  } catch (error) {
    console.error("Error updating invoice:", error);
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(invoices).where(eq(invoices.id, id));
    return NextResponse.json({ success: true, message: "Invoice deleted" });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return NextResponse.json({ error: "Failed to delete invoice" }, { status: 500 });
  }
}
