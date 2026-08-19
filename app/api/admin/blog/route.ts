import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, sql, desc } from "drizzle-orm";

/* ── GET — list all posts (admin sees unpublished too) ── */
export async function GET() {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

/* ── POST — create a new post ───────────────────────── */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, excerpt, content, category, coverImage, readTime, featured, published } = body;

    if (!title || !excerpt || !category || !coverImage) {
      return NextResponse.json(
        { error: "Title, excerpt, category, and cover image are required." },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newPost = await db
      .insert(blogPosts)
      .values({
        id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        slug,
        title,
        excerpt,
        content: content || null,
        category,
        coverImage,
        readTime: readTime || "5 MIN READ",
        featured: Boolean(featured),
        published: published !== false,
      })
      .returning();

    return NextResponse.json({ success: true, post: newPost[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}

/* ── DELETE — remove a post by id ───────────────────── */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}

/* ── PATCH — update published / featured flag ────────── */
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, published, featured } = body;
    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }
    const updated = await db
      .update(blogPosts)
      .set({
        ...(published !== undefined ? { published } : {}),
        ...(featured !== undefined ? { featured } : {}),
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return NextResponse.json({ success: true, post: updated[0] });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}
