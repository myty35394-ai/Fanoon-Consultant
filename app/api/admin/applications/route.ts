import { NextResponse } from "next/server";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

// GET all applications
export async function GET() {
  try {
    const list = await db
      .select()
      .from(applications)
      .orderBy(sql`${applications.createdAt} DESC`);

    return NextResponse.json({ applications: list });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

// PUT update status
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and Status are required" }, { status: 400 });
    }

    const updated = await db
      .update(applications)
      .set({ status })
      .where(eq(applications.id, id))
      .returning();

    return NextResponse.json({ success: true, application: updated[0] });
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}

// DELETE application
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    await db.delete(applications).where(eq(applications.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}
