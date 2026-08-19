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
  description: text("description"),
  featured: boolean("featured").default(false),
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


