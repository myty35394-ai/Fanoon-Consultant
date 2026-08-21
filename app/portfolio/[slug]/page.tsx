import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { projects, teamMembers as teamMembersTable } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import ProjectDetailClient, { ProjectDetailData } from "./ProjectDetailClient";

export const revalidate = 0;

// Curated project details fallback dictionary for prominent projects
const fallbackProjects: Record<string, Partial<ProjectDetailData>> = {
  "1-kanal-modern-villa": {
    title: "1 Kanal Modern Residence",
    category: "Residential Architecture",
    location: "Lahore, Pakistan",
    year: "2024",
    area: "5,000 SQ FT",
    plotSize: "1 Kanal",
    tagline: "Bold Geometry. Seamless Indoor-Outdoor Flow.",
    description:
      "A contemporary luxury residence characterized by double-height volumes, expansive glazing, and private landscaped courtyard gardens.",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85",
    scopeOfWork: ["Architectural Design", "Interior Architecture", "Landscape Design"],
    status: "Completed",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=85",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    ],
  },
  "luxury-apartment-interior": {
    title: "Luxury Apartment Interior",
    category: "Interior Design",
    location: "Islamabad, Pakistan",
    year: "2024",
    area: "2,450 SQ FT",
    tagline: "Contemporary Elegance. Timeless Comfort.",
    description:
      "This luxury apartment interior is a perfect blend of sophistication, warmth and functionality. Every detail from material selection to lighting is crafted to create a refined living experience.",
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=85",
    overviewText1:
      "The apartment interior is designed with a focus on open spaces, natural light, and a refined material palette. The design combines modern aesthetics with functional layouts to create a serene and luxurious home environment.",
    overviewText2:
      "Neutral tones, premium finishes, layered lighting, and custom furniture come together to deliver a cohesive and timeless interior experience.",
    scopeOfWork: ["Concept Design", "Interior Design", "FF&E", "Lighting Design"],
    status: "Completed",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1000&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1000&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
    ],
    featureBedroomImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    features: [
      "Spacious open-plan living and dining area",
      "Custom joinery and premium finishes",
      "Layered lighting for ambiance and functionality",
      "Elegant neutral color palette with natural textures",
      "High-end furniture and curated décor",
      "Large windows for natural light and views",
    ],
  },
  "g8-building-supervision": {
    title: "Cantt Heights",
    category: "Construction Supervision",
    location: "Peshawar Cantonment",
    year: "2024",
    area: "Approx. 180,000 SQ FT",
    plotArea: "23,500 SQ FT",
    use: "Shops, Offices, Apartments",
    structure: "RCC Framed Structure",
    floors: "G+6 (Basement + Ground + 6)",
    commencement: "January 2023",
    completion: "December 2024",
    duration: "22 Months",
    tagline: "G+6 Mixed-Use Development",
    tagline2: "Supervision You Can Trust. Quality You Can See.",
    description:
      "Fanoon Consultants provided complete construction supervision services for Cantt Heights, ensuring the project was executed in strict accordance with the approved design, specifications, quality standards and project timeline.",
    coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=85",
    overviewText1:
      "Cantt Heights is a signature G+6 mixed-use development located in Peshawar Cantonment. Fanoon Consultants was responsible for end-to-end construction supervision to ensure the highest standards of workmanship, material quality and compliance with drawings and specifications.",
    overviewText2:
      "Our team worked closely with the contractor and all stakeholders to monitor every activity on site, mitigate risks and deliver a safe, timely and high-quality project.",
    scopeOfWork: [
      "Review of shop drawings and material submittals",
      "Verification of setting out and dimensional accuracy",
      "Monitoring of quality of materials and workmanship",
      "Inspection of structural works at all stages",
      "Coordination with MEP and other consultants",
      "Monitoring of progress against approved schedule",
      "Site meetings, reporting and documentation",
      "Ensuring compliance with safety regulations",
    ],
    status: "Completed (2024)",
    siteProgressStages: [
      {
        title: "Excavation",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
      },
      {
        title: "Foundation Works",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
      },
      {
        title: "RCC Structure",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
      },
      {
        title: "Brick Masonry",
        image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&q=80",
      },
      {
        title: "Finishing Works",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
      },
      {
        title: "MEP Installation",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=85",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
    ],
  },
  "green-belt-development": {
    title: "Green Belt Development",
    category: "Landscape Design",
    location: "Peshawar Cantonment",
    year: "2024",
    area: "Approx. 125 Acres",
    length: "5.2 KM",
    plantation: "10,000+ Trees & Shrubs",
    publicSpaces: "6+ Public Plazas",
    tagline: "Connecting Nature. Enhancing Life.",
    description:
      "A sustainable green belt initiative designed to improve urban ecology, promote biodiversity and create healthier, more livable communities.",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85",
    scopeOfWork: [
      "Masterplan",
      "Landscape Design",
      "Plantation",
      "Streetscape",
      "Lighting",
    ],
    status: "Completed",
    features: [
      "Continuous green corridor for pedestrians and cyclists",
      "Native and drought-tolerant plantation",
      "Seating areas, plazas and community spaces",
      "Smart lighting and irrigation systems",
      "Stormwater management and bio-swales",
      "Enhanced biodiversity and microclimate",
      "Safe, accessible and inclusive design",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80",
    ],
  },
  "project-management-services": {
    title: "Project Management Services",
    category: "Project Management",
    location: "Lahore, Pakistan",
    year: "2024",
    area: "7,200 SQ FT",
    plotSize: "1 Kanal",
    duration: "10 Months",
    constructionType: "New Construction",
    contractType: "Project Management",
    tagline: "Residential Project. Managed With Precision.",
    description:
      "We managed the complete project lifecycle of this 1 Kanal residence from planning to handover, ensuring quality, timely delivery and cost efficiency at every stage.",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85",
    scopeOfWork: [
      "Project Planning & Scheduling",
      "Cost Management & Budgeting",
      "Procurement & Vendor Management",
      "Site Supervision & Coordination",
      "Quality Control & Assurance",
      "Risk Management",
      "Progress Monitoring & Reporting",
      "Health, Safety & Environment (HSE)",
      "Client Communication",
      "Final Handover & Documentation",
    ],
    status: "Completed (2024)",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1000&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80",
    ],
  },
  "10-marla-modern-residence": {
    title: "10 Marla Modern Residence",
    category: "3D Visualization",
    location: "Lahore, Pakistan",
    year: "2024",
    area: "3,200 SQ FT",
    plotSize: "10 Marla",
    floors: "G+1",
    scope: "Exterior Visualization",
    tagline: "Realistic. Detailed. Inspiring.",
    description:
      "These exterior visualizations present a modern residence design with a perfect blend of contemporary architecture, premium materials and lush landscaping. Every angle is crafted to showcase the beauty of design before it's built.",
    overviewText1:
      "This 10 Marla modern residence is designed with clean lines, balanced proportions and a harmonious combination of textures. The design emphasizes natural light, open spaces and a strong connection between indoor and outdoor living.",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85",
    scopeOfWork: [
      "3D Exterior Rendering",
      "Day & Night Views",
      "Elevation Renders",
      "Material Detailing",
      "Landscape Visuals",
    ],
    status: "Completed (2024)",
    features: [
      "Modern Architecture",
      "Premium Materials",
      "Lush Landscaping",
      "Realistic Lighting & Shadows",
      "High Quality Rendering",
      "Multiple Views & Angles",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=85",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    if (rows.length > 0) {
      const p = rows[0];
      return {
        title: `${p.title} | Fanoon Consultants`,
        description: p.description || `${p.title} - ${p.category} project by Fanoon Consultants.`,
      };
    }
  } catch {}

  const fallback = fallbackProjects[slug];
  if (fallback) {
    return {
      title: `${fallback.title} | Fanoon Consultants`,
      description: fallback.description || `Explore ${fallback.title} project by Fanoon Consultants.`,
    };
  }

  const formattedTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} | Fanoon Consultants`,
    description: `Explore the ${formattedTitle} architectural and design project by Fanoon Consultants.`,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let projectData: ProjectDetailData | null = null;

  try {
    let rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    if (rows.length === 0) {
      const allDb = await db.select().from(projects);
      const matched = allDb.find(
        (p) => p.slug === slug || p.slug.startsWith(slug) || slug.startsWith(p.slug)
      );
      if (matched) {
        rows = [matched];
      }
    }

    if (rows.length > 0) {
      const p = rows[0];
      const fallback = fallbackProjects[slug] || fallbackProjects[p.slug] || {};

      // Parse gallery images uploaded by admin
      let dbGallery: string[] = [];
      if (p.galleryImages) {
        try {
          const parsed = JSON.parse(p.galleryImages);
          if (Array.isArray(parsed) && parsed.length > 0) {
            dbGallery = parsed.filter((img) => typeof img === "string" && img.trim().length > 0);
          }
        } catch {}
      }

      // Parse drawing images uploaded by admin
      let dbDrawings: string[] = [];
      if (p.drawingImages) {
        try {
          const parsed = JSON.parse(p.drawingImages);
          if (Array.isArray(parsed) && parsed.length > 0) {
            dbDrawings = parsed.filter((img) => typeof img === "string" && img.trim().length > 0);
          }
        } catch {}
      }

      // Parse selected team member IDs
      let selectedTeamIds: string[] = [];
      if (p.teamMembers) {
        try {
          const parsed = JSON.parse(p.teamMembers);
          if (Array.isArray(parsed)) {
            selectedTeamIds = parsed.filter((id) => typeof id === "string" && id.trim().length > 0);
          }
        } catch {}
      }

      // Fetch real team member rows for selected IDs
      let selectedTeamData: { id: string; name: string; role: string; imageUrl: string; socialLink: string | null; description: string | null }[] = [];
      if (selectedTeamIds.length > 0) {
        try {
          selectedTeamData = await db
            .select({
              id: teamMembersTable.id,
              name: teamMembersTable.name,
              role: teamMembersTable.role,
              imageUrl: teamMembersTable.imageUrl,
              socialLink: teamMembersTable.socialLink,
              description: teamMembersTable.description,
            })
            .from(teamMembersTable)
            .where(inArray(teamMembersTable.id, selectedTeamIds));
        } catch {}
      }

      // Build unified list of real images uploaded by admin
      const realImages: string[] = [];
      if (p.coverImage && p.coverImage.trim().length > 0) {
        realImages.push(p.coverImage);
      }
      for (const img of dbGallery) {
        if (img && typeof img === "string" && img.trim().length > 0 && !realImages.includes(img)) {
          realImages.push(img);
        }
      }

      const hasUploadedImages = realImages.length > 0;

      projectData = {
        id: p.id,
        slug: p.slug,
        title: p.title || fallback.title || "Project",
        category: p.category || fallback.category || "Architecture",
        client: p.client || fallback.client || "Private Client",
        location: p.location || fallback.location || "Lahore, Pakistan",
        year: p.year || fallback.year || "2024",
        area: p.area || fallback.area || "",
        length: fallback.length,
        plantation: fallback.plantation,
        plotArea: fallback.plotArea,
        plotSize: p.plotSize || fallback.plotSize || "",
        floors: p.floors || fallback.floors || "",
        use: fallback.use,
        structure: p.structure || fallback.structure,
        commencement: fallback.commencement,
        completion: fallback.completion,
        duration: p.duration || fallback.duration || "10 Months",
        constructionType: p.constructionType || fallback.constructionType || "New Construction",
        contractType: fallback.contractType || p.category,
        coverImage: p.coverImage || fallback.coverImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85",
        description: p.description || fallback.description,
        tagline: p.tagline || fallback.tagline || "",
        tagline2: fallback.tagline2,
        scopeOfWork: fallback.scopeOfWork || [
          "Concept Design",
          "Architectural Drawings",
          "Interior Detailing",
          "Site Supervision",
        ],
        status: p.status || fallback.status || "Completed",
        siteProgressStages: fallback.siteProgressStages,
        // Strictly use real images uploaded by admin whenever available
        gallery: hasUploadedImages ? realImages : fallback.gallery || [
          p.coverImage,
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=85",
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=85",
          "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
          "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
          "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
        ],
        features: fallback.features,
        conceptText: p.description || fallback.conceptText,
        overviewText1: p.description || fallback.overviewText1,
        overviewText2: fallback.overviewText2,
        featureBedroomImage: fallback.featureBedroomImage,
        hardHatImage: fallback.hardHatImage,
        drawingImages: dbDrawings.length > 0 ? dbDrawings : fallback.drawingImages || undefined,
        selectedTeam: selectedTeamData.length > 0 ? selectedTeamData : undefined,
        spaceNames: (() => {
          if (!p.spaceNames) return [];
          try { return JSON.parse(p.spaceNames); } catch { return []; }
        })(),
        materialsData: (() => {
          if (!p.materialsData) return undefined;
          try { return JSON.parse(p.materialsData); } catch { return undefined; }
        })(),
      };
    }
  } catch (err) {
    console.error("Error fetching project by slug:", err);
  }

  // If not found in DB, check fallback projects dictionary
  if (!projectData) {
    const fallback = fallbackProjects[slug];
    if (fallback && fallback.title && fallback.category && fallback.coverImage) {
      projectData = {
        slug,
        title: fallback.title,
        category: fallback.category,
        client: fallback.client || "Private Client",
        location: fallback.location || "Lahore, Pakistan",
        year: fallback.year || "2024",
        area: fallback.area || "5,000 SQ FT",
        plotSize: fallback.plotSize || "1 Kanal",
        coverImage: fallback.coverImage,
        description: fallback.description,
        tagline: fallback.tagline,
        scopeOfWork: fallback.scopeOfWork,
        status: fallback.status || "Completed",
        gallery: fallback.gallery,
        features: fallback.features,
        conceptText: fallback.conceptText,
        overviewText1: fallback.overviewText1,
        overviewText2: fallback.overviewText2,
        featureBedroomImage: fallback.featureBedroomImage,
      };
    } else {
      const formattedTitle = slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      projectData = {
        slug,
        title: formattedTitle,
        category: "Residential Architecture",
        client: "Private Client",
        location: "Lahore, Pakistan",
        year: "2024",
        area: "5,000 SQ FT",
        plotSize: "1 Kanal",
        coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85",
        tagline: "1 Kanal Modern Residence",
        description:
          "An exceptional architectural and interior design project executed with precision, timeless aesthetics, and sustainable construction practices.",
        status: "Completed (2024)",
      };
    }
  }

  return <ProjectDetailClient project={projectData} />;
}
