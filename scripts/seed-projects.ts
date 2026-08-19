export {};
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const { neon } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-http");
const { projects } = require("../db/schema");

async function main() {
  console.log("🏗️  Seeding portfolio projects to Neon DB...");
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  const portfolioProjects = [
    // ── Architecture ──────────────────────────────────────
    {
      id: "prj_001",
      slug: "cantt-heights-mixed-use",
      title: "Cantt Heights",
      category: "Architecture",
      client: "Private Developer",
      location: "Peshawar Cantonment",
      year: "2024",
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      description: "G+6 Mixed-Use Development featuring retail ground floor, commercial mezzanine and residential apartments above. Designed with a contemporary façade using aluminum cladding and curtain wall glazing.",
      featured: true,
    },
    {
      id: "prj_002",
      slug: "green-heights-residential",
      title: "Green Heights Residency",
      category: "Architecture",
      client: "Green Heights Pvt. Ltd.",
      location: "Peshawar",
      year: "2023",
      coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      description: "G+6 residential apartment complex with 24 units. Emphasis on natural ventilation, shared green terraces and energy-efficient building envelope.",
      featured: true,
    },
    {
      id: "prj_003",
      slug: "10-marla-residence-peshawar",
      title: "10 Marla Modern Residence",
      category: "Architecture",
      client: "Private Client",
      location: "Peshawar",
      year: "2024",
      coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      description: "G+1 contemporary family home on a 10 Marla plot. Open-plan living areas, double-height entrance foyer and landscaped rear courtyard. Material palette of exposed brick, textured plaster and warm timber.",
      featured: false,
    },
    {
      id: "prj_004",
      slug: "1-kanal-modern-villa-lahore",
      title: "1 Kanal Modern Villa",
      category: "Architecture",
      client: "Private Client",
      location: "Lahore",
      year: "2023",
      coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      description: "Luxury G+1 villa on 1 Kanal plot featuring a swimming pool, home cinema, smart home automation and a rooftop entertainment deck with city views.",
      featured: true,
    },
    {
      id: "prj_005",
      slug: "multi-storey-commercial-building",
      title: "Multi-Storey Commercial Tower",
      category: "Architecture",
      client: "Commercial Developers Group",
      location: "Peshawar",
      year: "2022",
      coverImage: "https://images.unsplash.com/photo-1541888086913-913a48e788bc?w=1200&q=80",
      description: "G+8 commercial office building with structured parking, double-skin façade and LEED-aligned mechanical systems. Achieved 30% energy savings over baseline.",
      featured: false,
    },

    // ── Interior Design ───────────────────────────────────
    {
      id: "prj_006",
      slug: "luxury-apartment-interior-islamabad",
      title: "Luxury Apartment Interior",
      category: "Interior Design",
      client: "Private Client",
      location: "Islamabad",
      year: "2024",
      coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      description: "High-end interior fit-out for a 4-bedroom penthouse. Custom joinery, Italian marble flooring, bespoke lighting design and curated art collection.",
      featured: true,
    },
    {
      id: "prj_007",
      slug: "corporate-office-interior-islamabad",
      title: "Corporate Office Interior",
      category: "Interior Design",
      client: "Tech Startup",
      location: "Islamabad",
      year: "2023",
      coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      description: "Modern agile workspace for a 200-person tech company. Biophilic design elements, acoustic treatment, collaboration zones and ergonomic open-plan desking.",
      featured: false,
    },
    {
      id: "prj_008",
      slug: "residential-interior-peshawar",
      title: "Classic Residential Interior",
      category: "Interior Design",
      client: "Private Client",
      location: "Peshawar",
      year: "2024",
      coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
      description: "Traditional-contemporary fusion interior for a large family home. Hand-crafted woodwork, bespoke upholstery and a warm colour palette inspired by local craft traditions.",
      featured: false,
    },

    // ── Landscape Design ──────────────────────────────────
    {
      id: "prj_009",
      slug: "cantt-beautification-peshawar",
      title: "Cantt Beautification Project",
      category: "Landscape Design",
      client: "Peshawar Cantonment Board",
      location: "Peshawar Cantonment",
      year: "2023",
      coverImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
      description: "Urban streetscape and public realm upgrade covering 3.5 km of Cantt roads. Includes native tree planting, pedestrian walkways, seating nodes and decorative lighting.",
      featured: false,
    },
    {
      id: "prj_010",
      slug: "green-belt-development",
      title: "Green Belt Development",
      category: "Landscape Design",
      client: "Cantonment Authority",
      location: "Peshawar Cantonment",
      year: "2022",
      coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      description: "Linear park and green buffer zone along a 2 km arterial road. Integrated cycle track, jogging path, children's play area and native drought-tolerant planting.",
      featured: false,
    },

    // ── 3D Visualization ──────────────────────────────────
    {
      id: "prj_011",
      slug: "masterplan-3d-visualization",
      title: "Residential Community Masterplan",
      category: "3D Visualization",
      client: "Real Estate Developer",
      location: "Islamabad",
      year: "2024",
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      description: "Photo-realistic 3D masterplan visualization and walkthrough animation for a 500-unit gated residential community. Used for pre-sales marketing and investor presentations.",
      featured: false,
    },

    // ── Construction Supervision ──────────────────────────
    {
      id: "prj_012",
      slug: "g8-building-supervision",
      title: "G+8 Building Supervision",
      category: "Construction Supervision",
      client: "Al-Noor Developers",
      location: "Peshawar",
      year: "2023",
      coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
      description: "Full construction supervision and quality control for a G+8 multi-storey building from foundation to finish. Ensured compliance with AASHTO standards and client specification.",
      featured: false,
    },

    // ── Project Management ────────────────────────────────
    {
      id: "prj_013",
      slug: "project-management-services",
      title: "Project Management Services",
      category: "Project Management",
      client: "Multiple Clients",
      location: "Multiple Locations",
      year: "2022–2024",
      coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
      description: "End-to-end project management for a portfolio of residential and commercial projects across KPK and Punjab. Scope includes scheduling, cost control, tendering and contractor coordination.",
      featured: false,
    },
  ];

  let added = 0;
  let skipped = 0;

  for (const project of portfolioProjects) {
    try {
      await db.insert(projects).values(project).onConflictDoNothing();
      console.log(`  ✅ ${project.title}`);
      added++;
    } catch (err: any) {
      console.log(`  ⚠️  Skipped (${project.title}): ${err?.message}`);
      skipped++;
    }
  }

  console.log(`\n🎉 Done! ${added} projects seeded, ${skipped} skipped (already exist).`);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
