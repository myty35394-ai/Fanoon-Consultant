"use server";

import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // ── 1. Extract fields ──────────────────────────────────────────
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || null;
  const subject = (formData.get("subject") as string)?.trim();
  const projectType = (formData.get("projectType") as string)?.trim() || null;
  const budgetRange = (formData.get("budgetRange") as string)?.trim() || null;
  const message = (formData.get("message") as string)?.trim();
  const agreed = formData.get("agreed") === "on";
  const files = formData.getAll("attachments") as File[];

  // ── 2. Server-side validation ──────────────────────────────────
  if (!name) return { status: "error", message: "Full name is required." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { status: "error", message: "A valid email address is required." };
  if (!subject) return { status: "error", message: "Please select a subject." };
  if (!message || message.length < 10)
    return { status: "error", message: "Message must be at least 10 characters." };
  if (!agreed)
    return { status: "error", message: "You must agree to the Privacy Policy to submit." };

  // ── 3. Upload attachments to Cloudinary ───────────────────────
  const attachmentUrls: string[] = [];
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];
  const maxSize = 10 * 1024 * 1024; // 10 MB

  for (const file of files) {
    if (!file || file.size === 0) continue;
    if (!allowedTypes.includes(file.type)) continue;
    if (file.size > maxSize) continue;

    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "fanoon/leads",
        resource_type: "auto",
      });
      attachmentUrls.push(result.secure_url);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      // Non-fatal — continue without that file
    }
  }

  // ── 4. Insert into DB ──────────────────────────────────────────
  try {
    await db.insert(inquiries).values({
      id: randomUUID(),
      name,
      email,
      phone,
      service: subject,
      projectType,
      budgetRange,
      attachments: JSON.stringify(attachmentUrls),
      message,
      status: "pending",
    });
  } catch (err) {
    console.error("DB insert error:", err);
    return {
      status: "error",
      message: "Failed to submit your message. Please try again later.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you! Your message has been received. Our team will get back to you within 24 hours.",
  };
}

export async function submitStartProjectForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || null;
  const company = (formData.get("company") as string)?.trim() || null;
  const projectType = (formData.get("projectType") as string)?.trim() || null;
  const location = (formData.get("location") as string)?.trim() || null;
  const estimatedStartDate = (formData.get("estimatedStartDate") as string)?.trim() || null;
  const budgetRange = (formData.get("budgetRange") as string)?.trim() || null;
  const message = (formData.get("message") as string)?.trim();
  const agreed = formData.get("agreed") === "on";
  const files = formData.getAll("attachments") as File[];

  if (!name) return { status: "error", message: "Full name is required." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { status: "error", message: "A valid email address is required." };
  if (!projectType) return { status: "error", message: "Please select a project type." };
  if (!location) return { status: "error", message: "Project location is required." };
  if (!message || message.length < 10)
    return { status: "error", message: "Project brief must be at least 10 characters." };
  if (!agreed)
    return { status: "error", message: "You must agree to the Privacy Policy to submit." };

  const attachmentUrls: string[] = [];
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];
  const maxSize = 10 * 1024 * 1024;

  for (const file of files) {
    if (!file || file.size === 0) continue;
    if (!allowedTypes.includes(file.type)) continue;
    if (file.size > maxSize) continue;

    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");
      const dataUri = "data:${file.type};base64,${base64}"; // Escaping for PS

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "fanoon/leads",
        resource_type: "auto",
      });
      attachmentUrls.push(result.secure_url);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    }
  }

  try {
    await db.insert(inquiries).values({
      id: randomUUID(),
      name,
      email,
      phone,
      company,
      location,
      estimatedStartDate,
      service: "Project Inquiry",
      projectType,
      budgetRange,
      attachments: JSON.stringify(attachmentUrls),
      message,
      status: "pending",
    });
  } catch (err) {
    console.error("DB insert error:", err);
    return {
      status: "error",
      message: "Failed to submit your project. Please try again later.",
    };
  }

  return {
    status: "success",
    message: "Thank you! Your project inquiry has been received. Our team will contact you soon.",
  };
}
