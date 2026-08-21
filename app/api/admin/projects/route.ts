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
    const {
      title,
      category,
      client,
      location,
      year,
      coverImage,
      galleryImages,
      drawingImages,
      teamMembers,
      description,
      featured,
      isArsalan,
      tagline,
      plotSize,
      area,
      floors,
      scope,
      status,
      duration,
      structure,
      constructionType,
      materialsData,
      spaceNames,
    } = body;

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
        galleryImages: Array.isArray(galleryImages) ? JSON.stringify(galleryImages.slice(0, 5)) : typeof galleryImages === "string" ? galleryImages : "[]",
        drawingImages: Array.isArray(drawingImages) ? JSON.stringify(drawingImages.slice(0, 3)) : typeof drawingImages === "string" ? drawingImages : "[]",
        teamMembers: Array.isArray(teamMembers) ? JSON.stringify(teamMembers) : typeof teamMembers === "string" ? teamMembers : "[]",
        description: description || null,
        tagline: tagline || null,
        plotSize: plotSize || null,
        area: area || null,
        floors: floors || null,
        scope: scope || null,
        status: status || null,
        duration: duration || null,
        structure: structure || null,
        constructionType: constructionType || null,
        materialsData: materialsData ? (typeof materialsData === "string" ? materialsData : JSON.stringify(materialsData)) : null,
        spaceNames: Array.isArray(spaceNames) ? JSON.stringify(spaceNames.slice(0, 5)) : typeof spaceNames === "string" ? spaceNames : "[]",
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
