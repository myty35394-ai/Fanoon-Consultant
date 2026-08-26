import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allInquiries = await db
      .select()
      .from(inquiries)
      .orderBy(sql`${inquiries.createdAt} DESC`);

    return NextResponse.json({ inquiries: allInquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
    }

    const updated = await db
      .update(inquiries)
      .set({ status })
      .where(eq(inquiries.id, id))
      .returning();

    return NextResponse.json({ success: true, inquiry: updated[0] });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    await db.delete(inquiries).where(eq(inquiries.id, id));
    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
