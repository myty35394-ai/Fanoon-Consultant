export interface SiteSettings {
  id?: string;
  companyName: string;
  primaryEmail: string;
  secondaryEmail: string;
  careersEmail: string;
  primaryPhone: string;
  secondaryPhone?: string | null;
  whatsappNumber: string;
  officeAddress: string;
  officeHours: string;
  googleMapsUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  pinterestUrl: string;
  twitterUrl: string;
  updatedAt?: Date;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  companyName: "Fanoon Consultants",
  primaryEmail: "fanoonconsultants9@gmail.com",
  secondaryEmail: "info@fanoonconsultants.com",
  careersEmail: "careers@fanoonconsultants.com",
  primaryPhone: "+92 318 9944488",
  secondaryPhone: "",
  whatsappNumber: "+92 318 9944488",
  officeAddress: "Office # 202, 2nd Floor, Giga Center, Jinnah Avenue, Blue Area, Islamabad, Pakistan",
  officeHours: "Mon - Fri: 09:00 AM - 06:00 PM, Sat: 10:00 AM - 02:00 PM",
  googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Office+%23+202%2C+2nd+Floor%2C+Ginza+Center%2C+Jinnah+Avenue%2C+Blue+Area%2C+Islamabad%2C+Pakistan",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  linkedinUrl: "https://linkedin.com",
  youtubeUrl: "https://youtube.com",
  pinterestUrl: "https://pinterest.com",
  twitterUrl: "https://x.com",
};
