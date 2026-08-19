export {};
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const { auth } = require("../lib/auth");
const { db } = require("../db");
const { user, account } = require("../db/schema");
const { eq } = require("drizzle-orm");

async function main() {
  console.log("Cleaning old unhashed records...");
  const adminEmail = "admin@fanoon.com";
  const adminPassword = "Admin@fanoon2026";

  const existing = await db.select().from(user).where(eq(user.email, adminEmail));
  for (const u of existing) {
    await db.delete(account).where(eq(account.userId, u.id));
    await db.delete(user).where(eq(user.id, u.id));
  }

  console.log("Registering & hashing password via Better Auth API...");
  const res = await auth.api.signUpEmail({
    body: {
      email: adminEmail,
      password: adminPassword,
      name: "Fanoon Admin",
    },
  });

  console.log("SUCCESS! Admin user registered with ID:", res?.user?.id);
  console.log("Admin account is live on Neon DB with email: admin@fanoon.com");
}

main().catch(console.error);
