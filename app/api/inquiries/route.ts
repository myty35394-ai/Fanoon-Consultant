import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const newInquiry = await db.insert(inquiries).values({
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name,
      email,
      phone: phone || null,
      service: service || null,
      message,
    }).returning();

    return NextResponse.json({ success: true, inquiry: newInquiry[0] }, { status: 201 });
  } catch (error) {
    console.error("Error saving inquiry:", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
