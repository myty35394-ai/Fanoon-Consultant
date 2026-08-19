import { NextResponse } from "next/server";
import { db } from "@/db";
import { jobPostings } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const initialStandardJobs = [
  {
    title: "Architect",
    department: "Architecture Department",
    location: "Peshawar, Pakistan",
    type: "Full-time",
    slug: "architect",
    order: 1,
  },
  {
    title: "Interior Designer",
    department: "Interior Design Department",
    location: "Peshawar, Pakistan",
    type: "Full-time",
    slug: "interior-designer",
    order: 2,
  },
  {
    title: "3D Visualizer",
    department: "Visualization Department",
    location: "Peshawar, Pakistan",
    type: "Full-time",
    slug: "3d-visualizer",
    order: 3,
  },
  {
    title: "Landscape Architect",
    department: "Landscape Design Department",
    location: "Peshawar, Pakistan",
    type: "Full-time",
    slug: "landscape-architect",
    order: 4,
  },
  {
    title: "Draftsman",
    department: "Drafting & Modeling Department",
    location: "Peshawar, Pakistan",
    type: "Full-time",
    slug: "draftsman",
    order: 5,
  },
  {
    title: "Structural Engineer",
    department: "Engineering Department",
    location: "Peshawar, Pakistan",
    type: "Full-time",
    slug: "structural-engineer",
    order: 6,
  },
  {
    title: "Civil Engineer",
    department: "Civil & Infrastructure Department",
    location: "Peshawar, Pakistan",
    type: "Full-time",
    slug: "civil-engineer",
    order: 7,
  },
  {
    title: "Quantity Surveyor / Cost Estimator",
    department: "Quantity Surveying & Cost Estimation",
    location: "Peshawar, Pakistan",
    type: "Full-time",
    slug: "quantity-surveyor",
    order: 8,
  },
];

// Helper to seed standard jobs if none exist
export async function seedStandardJobsIfEmpty() {
  try {
    const existing = await db.select({ count: sql<number>`count(*)` }).from(jobPostings);
    const count = Number(existing[0]?.count || 0);

    if (count === 0) {
      for (const job of initialStandardJobs) {
        await db.insert(jobPostings).values({
          id: `job_${job.slug}`,
          slug: job.slug,
          title: job.title,
          department: job.department,
          location: job.location,
          type: job.type,
          active: true,
          order: job.order,
        }).onConflictDoNothing();
      }
    }
  } catch (error) {
    console.error("Error seeding initial jobs:", error);
  }
}

// GET all jobs
export async function GET() {
  try {
    await seedStandardJobsIfEmpty();
    const jobs = await db
      .select()
      .from(jobPostings)
      .orderBy(sql`${jobPostings.order} ASC, ${jobPostings.createdAt} DESC`);

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST create job
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, department, location, type, description, requirements, active, order } = body;

    if (!title || !department) {
      return NextResponse.json({ error: "Title and Department are required" }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newJob = await db
      .insert(jobPostings)
      .values({
        id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        slug: `${slug}-${Math.random().toString(36).substring(2, 6)}`,
        title,
        department,
        location: location || "Peshawar, Pakistan",
        type: type || "Full-time",
        description: description || null,
        requirements: requirements || null,
        active: active !== undefined ? active : true,
        order: Number(order) || 0,
      })
      .returning();

    return NextResponse.json({ success: true, job: newJob[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

// PUT update job
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, department, location, type, description, requirements, active, order } = body;

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    const updated = await db
      .update(jobPostings)
      .set({
        ...(title && { title }),
        ...(department && { department }),
        ...(location !== undefined && { location }),
        ...(type !== undefined && { type }),
        ...(description !== undefined && { description }),
        ...(requirements !== undefined && { requirements }),
        ...(active !== undefined && { active }),
        ...(order !== undefined && { order: Number(order) }),
        updatedAt: new Date(),
      })
      .where(eq(jobPostings.id, id))
      .returning();

    return NextResponse.json({ success: true, job: updated[0] });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

// DELETE job
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    await db.delete(jobPostings).where(eq(jobPostings.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
