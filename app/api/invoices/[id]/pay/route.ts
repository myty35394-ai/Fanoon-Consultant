import { NextResponse } from "next/server";
import { db } from "@/db";
import { invoices } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await req.formData();
    const file = formData.get("receipt") as File;

    if (!file) {
      return NextResponse.json({ error: "Receipt image is required" }, { status: 400 });
    }

    const imgbbApiKey = process.env.IMGBB_API_KEY;
    if (!imgbbApiKey) {
      console.error("Missing IMGBB_API_KEY in environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Convert File to base64
    const buffer = await file.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString("base64");

    // Upload to ImgBB
    const imgbbFormData = new FormData();
    imgbbFormData.append("image", base64Data);
    
    const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: "POST",
      body: imgbbFormData,
    });

    const uploadData = await uploadRes.json();
    if (!uploadData.success) {
      console.error("ImgBB upload failed:", uploadData);
      throw new Error(uploadData.error?.message || "Failed to upload to ImgBB");
    }

    const imageUrl = uploadData.data.url;

    // Update invoice status to processing and set proof URL
    const updated = await db
      .update(invoices)
      .set({
        paymentProofUrl: imageUrl,
        status: "processing", // awaiting admin approval
        updatedAt: new Date(),
      })
      .where(eq(invoices.id, id))
      .returning();

    if (!updated.length) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, invoice: updated[0] });
  } catch (error) {
    console.error("Error submitting payment proof:", error);
    return NextResponse.json({ error: "Failed to submit payment" }, { status: 500 });
  }
}
