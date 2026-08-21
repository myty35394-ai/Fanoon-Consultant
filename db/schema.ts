import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

// ── Better Auth Schema ──────────────────────────────────────────

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: text("role").default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ── Fanoon Consultants Application Schemas ──────────────────────

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(), // Architecture, Interior Design, Landscape Design, etc.
  client: text("client"),
  location: text("location"),
  year: text("year"),
  coverImage: text("cover_image").notNull(),
  galleryImages: text("gallery_images").default("[]"), // JSON array of up to 5 uploaded gallery image URLs
  spaceNames: text("space_names").default("[]"), // JSON array of up to 5 names for gallery images
  drawingImages: text("drawing_images").default("[]"), // JSON array of up to 3 uploaded architectural/landscape drawing image URLs
  teamMembers: text("team_members").default("[]"), // JSON array of selected team member IDs
  materialsData: text("materials_data"), // JSON: structured materials & finishes data { concept, quote, exteriorFinishes[], interiorFloors[], interiorWalls[], ceilingLighting[], joineryMillwork[], metalGlass[], sustainableChoices[] }
  description: text("description"),
  tagline: text("tagline"),        // Short punchy hero subtitle (e.g. "Realistic. Detailed. Inspiring.")
  plotSize: text("plot_size"),     // e.g. "10 Marla", "1 Kanal"
  area: text("area"),              // e.g. "3,200 SQ FT"
  floors: text("floors"),          // e.g. "G+1", "G+3"
  scope: text("scope"),            // e.g. "Exterior Visualization", "Interior Design"
  status: text("status"),          // e.g. "Completed (2025)", "Ongoing"
  duration: text("duration"),      // e.g. "18 Months", "10 Months"
  structure: text("structure"),    // e.g. "RCC Frame Structure", "Post-Tensioned"
  constructionType: text("construction_type"), // e.g. "Commercial High-Rise", "Residential Villa"
  featured: boolean("featured").default(false),
  isArsalan: boolean("is_arsalan").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  location: text("location"),
  estimatedStartDate: text("estimated_start_date"),
  service: text("service"),
  projectType: text("project_type"),
  budgetRange: text("budget_range"),
  attachments: text("attachments").default("[]"), // JSON string: array of Cloudinary URLs
  message: text("message").notNull(),
  status: text("status").default("pending"), // pending, reviewed, archived
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const teamMembers = pgTable("team_members", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  socialLink: text("social_link"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content"),                 // full rich text / markdown (optional)
  category: text("category").notNull(),     // Architecture, Interior Design, etc.
  coverImage: text("cover_image").notNull(),
  readTime: text("read_time").default("5 MIN READ"),
  featured: boolean("featured").default(false),
  published: boolean("published").default(true),
  publishedAt: timestamp("published_at").defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const applications = pgTable("applications", {
  id: text("id").primaryKey(),
  role: text("role").notNull(), // e.g. Architect, Civil Engineer, etc.
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  experience: text("experience").notNull(),
  currentPosition: text("current_position"),
  highestQualification: text("highest_qualification").notNull(),
  institution: text("institution"),
  registrationNumber: text("registration_number"),
  affiliations: text("affiliations"),
  specialization: text("specialization"),
  softwareProficiency: text("software_proficiency").default("[]"), // JSON string of array
  department: text("department").notNull(),
  availability: text("availability").notNull(),
  motivation: text("motivation").notNull(),
  portfolioLink: text("portfolio_link"),
  resumeFileName: text("resume_file_name"),
  resumeFileSize: integer("resume_file_size"),
  status: text("status").default("pending"), // pending, reviewed, shortlisted, rejected
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const jobPostings = pgTable("job_postings", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  location: text("location").default("Peshawar, Pakistan"),
  type: text("type").default("Full-time"), // Full-time, Part-time, Contract, Internship
  description: text("description"),
  requirements: text("requirements"),
  active: boolean("active").default(true),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const bankAccounts = pgTable("bank_accounts", {
  id: text("id").primaryKey(),
  bankName: text("bank_name").notNull(), // e.g., Meezan Bank
  accountTitle: text("account_title").notNull(), // e.g., Fanoon Consultants
  accountNumber: text("account_number").notNull(),
  iban: text("iban"),
  branchCode: text("branch_code"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const invoices = pgTable("invoices", {
  id: text("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(), // e.g., INV-1001
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email"),
  clientPhone: text("client_phone"),
  projectName: text("project_name"),
  description: text("description").notNull(),
  amount: integer("amount").notNull(), // in PKR (whole numbers)
  dueDate: timestamp("due_date").notNull(),
  bankAccountId: text("bank_account_id").notNull().references(() => bankAccounts.id),
  status: text("status").default("pending"), // pending, processing, paid, cancelled
  paymentProofUrl: text("payment_proof_url"), // Cloudinary URL
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
  id: text("id").primaryKey().default("general"),
  companyName: text("company_name").default("Fanoon Consultants"),
  primaryEmail: text("primary_email").default("fanoonconsultants9@gmail.com"),
  secondaryEmail: text("secondary_email").default("info@fanoonconsultants.com"),
  careersEmail: text("careers_email").default("careers@fanoonconsultants.com"),
  primaryPhone: text("primary_phone").default("+92 318 9944488"),
  secondaryPhone: text("secondary_phone"),
  whatsappNumber: text("whatsapp_number").default("+92 318 9944488"),
  officeAddress: text("office_address").default("Office # 202, 2nd Floor, Giga Center, Jinnah Avenue, Blue Area, Islamabad, Pakistan"),
  officeHours: text("office_hours").default("Mon - Fri: 09:00 AM - 06:00 PM, Sat: 10:00 AM - 02:00 PM"),
  googleMapsUrl: text("google_maps_url").default("https://www.google.com/maps/dir/?api=1&destination=Office+%23+202%2C+2nd+Floor%2C+Ginza+Center%2C+Jinnah+Avenue%2C+Blue+Area%2C+Islamabad%2C+Pakistan"),
  facebookUrl: text("facebook_url").default("https://facebook.com"),
  instagramUrl: text("instagram_url").default("https://instagram.com"),
  linkedinUrl: text("linkedin_url").default("https://linkedin.com"),
  youtubeUrl: text("youtube_url").default("https://youtube.com"),
  pinterestUrl: text("pinterest_url").default("https://pinterest.com"),
  twitterUrl: text("twitter_url").default("https://x.com"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});



