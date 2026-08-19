import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const updated = await db
      .update(inquiries)
      .set({ status })
      .where(eq(inquiries.id, id))
      .returning();

    return NextResponse.json({ success: true, inquiry: updated[0] });
  } catch (error) {
    console.error("Error updating inquiry status:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(inquiries).where(eq(inquiries.id, id));
    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
