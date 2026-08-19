export {};
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const { neon } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-http");
const { teamMembers } = require("../db/schema");

async function main() {
  console.log("Seeding initial team members to Neon DB...");
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  const initialMembers = [
    {
      id: "team_01",
      name: "Ar. Arsalan Haider",
      role: "Founder & Principal Architect",
      description: "Architect by profession and a passionate designer at heart. Leads the vision, design direction and overall strategic planning of the firm.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&fit=crop&crop=faces",
      socialLink: "#",
      order: 1,
    },
    {
      id: "team_02",
      name: "Imtiaz Haider",
      role: "Managing Partner",
      description: "Oversees business operations, client relations and project management with a focus on quality and growth.",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&fit=crop&crop=faces",
      socialLink: "#",
      order: 2,
    },
    {
      id: "team_03",
      name: "Ar. Saba Khan",
      role: "Senior Architect",
      description: "Specializes in architectural design development, documentation and coordination.",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&fit=crop&crop=faces",
      socialLink: "#",
      order: 3,
    },
    {
      id: "team_04",
      name: "Engr. Usman Ali",
      role: "Project Manager",
      description: "Ensures projects are delivered on time, within scope and budget with maximum efficiency.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&crop=faces",
      socialLink: "#",
      order: 4,
    },
    {
      id: "team_05",
      name: "Ar. Hina Fatima",
      role: "Interior Designer",
      description: "Creates elegant, functional interior spaces that reflect client personality and enhance experience.",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80&fit=crop&crop=faces",
      socialLink: "#",
      order: 5,
    },
  ];

  for (const member of initialMembers) {
    await db.insert(teamMembers).values(member).onConflictDoNothing();
  }

  console.log("SUCCESS: 5 team members seeded into Neon DB!");
}

main().catch(console.error);
