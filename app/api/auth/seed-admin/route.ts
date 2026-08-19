import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user, account } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Seed route is disabled in production." }, { status: 403 });
  }

  try {
    const adminEmail = "admin@fanoon.com";
    const adminPassword = "Admin@fanoon2026";

    // Clean up old unhashed records if any
    const existing = await db.select().from(user).where(eq(user.email, adminEmail));
    for (const u of existing) {
      await db.delete(account).where(eq(account.userId, u.id));
      await db.delete(user).where(eq(user.id, u.id));
    }

    // Call Better Auth internal API to properly hash password & store in Neon DB
    const res = await auth.api.signUpEmail({
      body: {
        email: adminEmail,
        password: adminPassword,
        name: "Fanoon Admin",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin account registered and hashed successfully.",
      user: res.user,
      credentials: {
        email: adminEmail,
        password: adminPassword,
      },
    });
  } catch (error) {
    console.error("Error seeding Better Auth admin:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
