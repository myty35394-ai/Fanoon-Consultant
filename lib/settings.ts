import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { SiteSettings, DEFAULT_SITE_SETTINGS } from "@/types/settings";

export type { SiteSettings };
export { DEFAULT_SITE_SETTINGS };

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await db.select().from(siteSettings).limit(1);
    if (rows && rows.length > 0) {
      const row = rows[0];
      return {
        id: row.id,
        companyName: row.companyName || DEFAULT_SITE_SETTINGS.companyName,
        primaryEmail: row.primaryEmail || DEFAULT_SITE_SETTINGS.primaryEmail,
        secondaryEmail: row.secondaryEmail || DEFAULT_SITE_SETTINGS.secondaryEmail,
        careersEmail: row.careersEmail || DEFAULT_SITE_SETTINGS.careersEmail,
        primaryPhone: row.primaryPhone || DEFAULT_SITE_SETTINGS.primaryPhone,
        secondaryPhone: row.secondaryPhone ?? DEFAULT_SITE_SETTINGS.secondaryPhone,
        whatsappNumber: row.whatsappNumber || DEFAULT_SITE_SETTINGS.whatsappNumber,
        officeAddress: row.officeAddress || DEFAULT_SITE_SETTINGS.officeAddress,
        officeHours: row.officeHours || DEFAULT_SITE_SETTINGS.officeHours,
        googleMapsUrl: row.googleMapsUrl || DEFAULT_SITE_SETTINGS.googleMapsUrl,
        facebookUrl: row.facebookUrl || DEFAULT_SITE_SETTINGS.facebookUrl,
        instagramUrl: row.instagramUrl || DEFAULT_SITE_SETTINGS.instagramUrl,
        linkedinUrl: row.linkedinUrl || DEFAULT_SITE_SETTINGS.linkedinUrl,
        youtubeUrl: row.youtubeUrl || DEFAULT_SITE_SETTINGS.youtubeUrl,
        pinterestUrl: row.pinterestUrl || DEFAULT_SITE_SETTINGS.pinterestUrl,
        twitterUrl: row.twitterUrl || DEFAULT_SITE_SETTINGS.twitterUrl,
        updatedAt: row.updatedAt,
      };
    }
    return DEFAULT_SITE_SETTINGS;
  } catch (error) {
    console.error("Error retrieving site settings from db:", error);
    return DEFAULT_SITE_SETTINGS;
  }
}
