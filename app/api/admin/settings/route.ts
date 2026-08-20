import { NextResponse } from "next/server";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from "@/lib/settings";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error in GET /api/admin/settings:", error);
    return NextResponse.json(DEFAULT_SITE_SETTINGS);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      companyName,
      primaryEmail,
      secondaryEmail,
      careersEmail,
      primaryPhone,
      secondaryPhone,
      whatsappNumber,
      officeAddress,
      officeHours,
      googleMapsUrl,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      youtubeUrl,
      pinterestUrl,
      twitterUrl,
    } = body;

    const existing = await db.select().from(siteSettings).where(eq(siteSettings.id, "general")).limit(1);

    if (existing.length === 0) {
      await db.insert(siteSettings).values({
        id: "general",
        companyName: companyName || DEFAULT_SITE_SETTINGS.companyName,
        primaryEmail: primaryEmail || DEFAULT_SITE_SETTINGS.primaryEmail,
        secondaryEmail: secondaryEmail || "",
        careersEmail: careersEmail || DEFAULT_SITE_SETTINGS.careersEmail,
        primaryPhone: primaryPhone || DEFAULT_SITE_SETTINGS.primaryPhone,
        secondaryPhone: secondaryPhone || "",
        whatsappNumber: whatsappNumber || "",
        officeAddress: officeAddress || DEFAULT_SITE_SETTINGS.officeAddress,
        officeHours: officeHours || DEFAULT_SITE_SETTINGS.officeHours,
        googleMapsUrl: googleMapsUrl || DEFAULT_SITE_SETTINGS.googleMapsUrl,
        facebookUrl: facebookUrl || "",
        instagramUrl: instagramUrl || "",
        linkedinUrl: linkedinUrl || "",
        youtubeUrl: youtubeUrl || "",
        pinterestUrl: pinterestUrl || "",
        twitterUrl: twitterUrl || "",
        updatedAt: new Date(),
      });
    } else {
      await db
        .update(siteSettings)
        .set({
          companyName: companyName || DEFAULT_SITE_SETTINGS.companyName,
          primaryEmail: primaryEmail || DEFAULT_SITE_SETTINGS.primaryEmail,
          secondaryEmail: secondaryEmail || "",
          careersEmail: careersEmail || DEFAULT_SITE_SETTINGS.careersEmail,
          primaryPhone: primaryPhone || DEFAULT_SITE_SETTINGS.primaryPhone,
          secondaryPhone: secondaryPhone || "",
          whatsappNumber: whatsappNumber || "",
          officeAddress: officeAddress || DEFAULT_SITE_SETTINGS.officeAddress,
          officeHours: officeHours || DEFAULT_SITE_SETTINGS.officeHours,
          googleMapsUrl: googleMapsUrl || DEFAULT_SITE_SETTINGS.googleMapsUrl,
          facebookUrl: facebookUrl || "",
          instagramUrl: instagramUrl || "",
          linkedinUrl: linkedinUrl || "",
          youtubeUrl: youtubeUrl || "",
          pinterestUrl: pinterestUrl || "",
          twitterUrl: twitterUrl || "",
          updatedAt: new Date(),
        })
        .where(eq(siteSettings.id, "general"));
    }

    const updated = await getSiteSettings();
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("Error in POST /api/admin/settings:", error);
    return NextResponse.json({ error: "Failed to update site settings" }, { status: 500 });
  }
}
