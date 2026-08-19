import { NextResponse } from "next/server";
import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const members = await db.select().from(teamMembers).orderBy(teamMembers.order);
    return NextResponse.json({ members });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, description, imageUrl, socialLink, order } = body;

    if (!name || !role || !imageUrl) {
      return NextResponse.json(
        { error: "Name, role, and image URL are required." },
        { status: 400 }
      );
    }

    const newMember = await db
      .insert(teamMembers)
      .values({
        id: `team_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name,
        role,
        description: description || null,
        imageUrl,
        socialLink: socialLink || null,
        order: order ?? 0,
      })
      .returning();

    return NextResponse.json({ success: true, member: newMember[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, role, description, imageUrl, socialLink, order } = body;

    if (!id) {
      return NextResponse.json({ error: "Member ID is required." }, { status: 400 });
    }

    const updated = await db
      .update(teamMembers)
      .set({
        name,
        role,
        description: description || null,
        imageUrl,
        socialLink: socialLink || null,
        order: order ?? 0,
        updatedAt: new Date(),
      })
      .where(eq(teamMembers.id, id))
      .returning();

    return NextResponse.json({ success: true, member: updated[0] });
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Member ID is required" }, { status: 400 });
    }

    await db.delete(teamMembers).where(eq(teamMembers.id, id));
    return NextResponse.json({ success: true, message: "Team member deleted" });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
