import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(sql`${projects.createdAt} DESC`);
    return NextResponse.json({ projects: allProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, client, location, year, coverImage, description, featured, isArsalan } = body;

    if (!title || !category || !coverImage) {
      return NextResponse.json(
        { error: "Title, category, and cover image are required." },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newProject = await db
      .insert(projects)
      .values({
        id: `prj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        slug,
        title,
        category,
        client: client || null,
        location: location || null,
        year: year || new Date().getFullYear().toString(),
        coverImage,
        description: description || null,
        featured: Boolean(featured),
        isArsalan: Boolean(isArsalan),
      })
      .returning();

    return NextResponse.json({ success: true, project: newProject[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    await db.delete(projects).where(eq(projects.id, id));
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
