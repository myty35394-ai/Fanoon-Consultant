import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects, blogPosts } from "@/db/schema";
import { eq, ilike, or, and } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ projects: [], posts: [] });
  }

  const pattern = `%${q}%`;

  try {
    const [matchedProjects, matchedPosts] = await Promise.all([
      db
        .select({
          title: projects.title,
          slug: projects.slug,
          category: projects.category,
          location: projects.location,
          coverImage: projects.coverImage,
        })
        .from(projects)
        .where(
          or(
            ilike(projects.title, pattern),
            ilike(projects.category, pattern),
            ilike(projects.location, pattern)
          )
        )
        .limit(5),

      db
        .select({
          title: blogPosts.title,
          slug: blogPosts.slug,
          category: blogPosts.category,
          excerpt: blogPosts.excerpt,
          coverImage: blogPosts.coverImage,
        })
        .from(blogPosts)
        .where(
          and(
            eq(blogPosts.published, true),
            or(
              ilike(blogPosts.title, pattern),
              ilike(blogPosts.category, pattern),
              ilike(blogPosts.excerpt, pattern)
            )
          )
        )
        .limit(5),
    ]);

    return NextResponse.json({ projects: matchedProjects, posts: matchedPosts });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ projects: [], posts: [] }, { status: 500 });
  }
}
