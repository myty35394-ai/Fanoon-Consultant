import { NextResponse } from "next/server";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { sendJobApplicationEmail } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const role = (formData.get("role") as string) || "General Application";
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;
    const experience = formData.get("experience") as string;
    const currentPosition = (formData.get("currentPosition") as string) || undefined;
    const highestQualification = formData.get("highestQualification") as string;
    const institution = (formData.get("institution") as string) || undefined;
    const registrationNumber = (formData.get("registrationNumber") as string) || undefined;
    const affiliations = (formData.get("affiliations") as string) || undefined;
    const specialization = (formData.get("specialization") as string) || undefined;
    const department = formData.get("department") as string;
    const availability = formData.get("availability") as string;
    const motivation = formData.get("motivation") as string;
    const portfolioLink = (formData.get("portfolioLink") as string) || undefined;

    // Parse software proficiencies
    const softwareProficiencyRaw = formData.get("softwareProficiency") as string;
    let softwareProficiency: string[] = [];
    if (softwareProficiencyRaw) {
      try {
        softwareProficiency = JSON.parse(softwareProficiencyRaw);
      } catch {
        softwareProficiency = softwareProficiencyRaw.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }

    // Required fields validation
    if (!fullName || !email || !phone || !location || !experience || !highestQualification || !department || !availability || !motivation) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Process attached resume file if provided
    const file = formData.get("resume") as File | null;
    let resumeFile: { name: string; buffer: Buffer; size: number } | undefined = undefined;

    if (file && file.size > 0) {
      const allowedExtensions = [".pdf", ".doc", ".docx"];
      const fileNameLower = file.name.toLowerCase();
      const isValidExtension = allowedExtensions.some((ext) => fileNameLower.endsWith(ext));

      if (!isValidExtension) {
        return NextResponse.json(
          { error: "Only PDF, DOC, and DOCX files are allowed." },
          { status: 400 }
        );
      }

      const maxSize = 4.5 * 1024 * 1024; // 4.5 MB Vercel Serverless payload limit
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: "Uploaded file size exceeds 4.5MB limit. Please provide a Google Drive / portfolio link for larger files." },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      resumeFile = {
        name: file.name,
        buffer,
        size: file.size,
      };
    }

    // 1. Save application in Database
    try {
      await db.insert(applications).values({
        id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        role,
        fullName,
        email,
        phone,
        location,
        experience,
        currentPosition: currentPosition || null,
        highestQualification,
        institution: institution || null,
        registrationNumber: registrationNumber || null,
        affiliations: affiliations || null,
        specialization: specialization || null,
        softwareProficiency: JSON.stringify(softwareProficiency),
        department,
        availability,
        motivation,
        portfolioLink: portfolioLink || null,
        resumeFileName: resumeFile?.name || null,
        resumeFileSize: resumeFile?.size || null,
        status: "pending",
      });
    } catch (dbError) {
      console.error("Database save warning:", dbError);
      // Even if DB has an issue, proceed to send email so application isn't lost
    }

    // 2. Send email via Resend
    await sendJobApplicationEmail({
      role,
      fullName,
      email,
      phone,
      location,
      experience,
      currentPosition,
      highestQualification,
      institution,
      registrationNumber,
      affiliations,
      specialization,
      softwareProficiency,
      department,
      availability,
      motivation,
      portfolioLink,
      resumeFile: resumeFile ? { name: resumeFile.name, buffer: resumeFile.buffer } : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your application has been submitted successfully! Our recruitment team will review it shortly.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Career application submission error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
}
