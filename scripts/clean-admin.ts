import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, text } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
});

const accountTable = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
});

async function main() {
  console.log("Cleaning old unhashed admin accounts from Neon DB...");
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  const existing = await db.select().from(userTable).where(eq(userTable.email, "admin@fanoon.com"));
  for (const u of existing) {
    await db.delete(accountTable).where(eq(accountTable.userId, u.id));
    await db.delete(userTable).where(eq(userTable.id, u.id));
  }
  console.log("Cleaned old accounts successfully.");
}

main().catch(console.error);
