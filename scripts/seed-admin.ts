import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  role: text("role").default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const accountTable = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull(),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

async function main() {
  console.log("Connecting to Neon DB...");
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  const adminId = "usr_admin_fanoon_01";
  const adminEmail = "admin@fanoon.com";
  const adminPassword = "Admin@fanoon2026";

  console.log("Cleaning up old admin records if any...");
  await db.delete(accountTable).where(eq(accountTable.userId, adminId));
  await db.delete(userTable).where(eq(userTable.id, adminId));

  const existing = await db.select().from(userTable).where(eq(userTable.email, adminEmail));
  for (const u of existing) {
    await db.delete(accountTable).where(eq(accountTable.userId, u.id));
    await db.delete(userTable).where(eq(userTable.id, u.id));
  }

  console.log(`Inserting admin record (${adminEmail})...`);
  await db.insert(userTable).values({
    id: adminId,
    name: "Fanoon Admin",
    email: adminEmail,
    emailVerified: true,
    role: "admin",
  });

  await db.insert(accountTable).values({
    id: "acc_admin_fanoon_01",
    userId: adminId,
    accountId: adminEmail,
    providerId: "credential",
    password: adminPassword,
  });

  console.log("SUCCESS: Admin credentials set in Neon DB!");
}

main().catch(console.error);
