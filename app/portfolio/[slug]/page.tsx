import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProjectDetailClient, { ProjectDetailData } from "./ProjectDetailClient";

export const revalidate = 0;

// Curated project details fallback dictionary for prominent projects
const fallbackProjects: Record<string, Partial<ProjectDetailData>> = {
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
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb18f13f7?w=600&q=80",
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
      "https://images.unsplash.com/photo-1541888946425-d0fbb18f13f7?w=1000&q=80",
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
    overviewText1:
      "The Green Belt Development is an urban landscape initiative that creates a continuous green corridor to enhance environmental quality and community well-being.",
    overviewText2:
      "Spanning 5.2 KM, the project integrates walking and cycling tracks, native planting, public gathering spaces and sustainable infrastructure to promote a greener and healthier city.",
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
    conceptText:
      "The concept is inspired by the natural landscape and local context, creating a green spine that connects people with nature while promoting sustainability and eco-friendly living.",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80",
    ],
  },
  "cantt-beautification-peshawar": {
    title: "Cantt Beautification Project",
    category: "Landscape Design",
    location: "Peshawar Cantonment",
    year: "2025",
    area: "12 Acres",
    length: "3.5 KM",
    plantation: "8,000+ Native Plants",
    tagline: "Transforming Public Urban Spaces.",
    description:
      "Large-scale public landscape and urban design project creating pedestrian promenades, green corridors, and civic park zones.",
    coverImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1920&q=85",
    overviewText1:
      "An urban revitalization project designed to upgrade civic spaces, integrate modern street furniture, native vegetation, and pedestrian-first infrastructure.",
    overviewText2:
      "Creating vibrant civic corridors that enhance community wellbeing and beautify the historical Peshawar Cantonment district.",
    scopeOfWork: ["Urban Design", "Landscape Architecture", "Public Amenities", "Lighting Design"],
    status: "Completed (2025)",
  },
  "peshawar-cantonment-beautification": {
    title: "Peshawar Cantt Beautification",
    category: "Landscape Design",
    location: "Peshawar Cantonment",
    year: "2025",
    area: "12 Acres",
    length: "3.5 KM",
    plantation: "8,000+ Native Plants",
    tagline: "Transforming Public Urban Spaces.",
    description:
      "Large-scale public landscape and urban design project creating pedestrian promenades, green corridors, and civic park zones.",
    coverImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1920&q=85",
    scopeOfWork: ["Urban Design", "Landscape Architecture", "Public Amenities", "Lighting Design"],
    status: "Completed (2025)",
  },
  "green-belt-master-plan": {
    title: "Green Belt Master Plan",
    category: "Landscape Design",
    location: "Peshawar, Pakistan",
    year: "2025",
    area: "125 Acres",
    length: "5.2 KM",
    plantation: "10,000+ Trees",
    tagline: "Connecting Nature. Enhancing Life.",
    description:
      "Master planning for a 5.2km green belt corridor integrating ecological corridors, cycling tracks, and community pavilions.",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=85",
    scopeOfWork: ["Master Planning", "Ecology Study", "Landscape Design", "Community Spaces"],
    status: "Completed (2025)",
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
    overviewText1:
      "Fanoon Consultants was entrusted with the end-to-end project management of this 1 Kanal residence. Our role included planning, coordination, procurement supervision, quality control, budget management and timely execution to bring the client's vision to life.",
    overviewText2:
      "Through proactive communication and rigorous site management, we ensured a smooth construction process, maintaining high standards of quality, safety and efficiency.",
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
    hardHatImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  },
  "luxury-apartment-interior": {
    title: "Luxury Apartment Interior",
    category: "Interior Design",
    location: "Islamabad",
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
    conceptText:
      "The concept revolves around creating a calm, elegant and inviting home that reflects the client's lifestyle. The design emphasizes spatial flow, natural materials and bespoke details.",
  },
  "cantt-heights": {
    title: "Cantt Heights",
    category: "Architecture",
    location: "Peshawar Cantonment",
    year: "2024",
    area: "45,000 SQ FT",
    tagline: "Modern Vertical Living & Commercial Landmark.",
    description:
      "A G+6 mixed-use development combining high-end retail, corporate offices, and luxury residential apartments designed for seamless urban integration.",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85",
    scopeOfWork: ["Architectural Design", "Structural Coordination", "MEP", "Site Supervision"],
    status: "Completed",
  },
  "green-heights": {
    title: "Green Heights",
    category: "Architecture",
    location: "Peshawar",
    year: "2023",
    area: "38,000 SQ FT",
    tagline: "Eco-Friendly High-Rise with Dynamic Facade.",
    description:
      "Sustainable residential building incorporating natural ventilation, green terraces, and solar-optimized building envelopes.",
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85",
    scopeOfWork: ["Architectural Design", "Façade Engineering", "Interior Design"],
    status: "Completed",
  },
  "1-kanal-modern-villa": {
    title: "1 Kanal Modern Villa",
    category: "Architecture",
    location: "Lahore",
    year: "2024",
    area: "5,000 SQ FT",
    tagline: "Bold Geometry. Seamless Indoor-Outdoor Flow.",
    description:
      "A contemporary luxury residence characterized by double-height volumes, expansive glazing, and private landscaped courtyard gardens.",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85",
    scopeOfWork: ["Architectural Design", "Interior Architecture", "Landscape Design"],
    status: "Completed",
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

      projectData = {
        id: p.id,
        slug: p.slug,
        title: fallback.title || p.title,
        category: p.category,
        client: p.client || fallback.client || "Private Client",
        location: p.location || fallback.location || "Peshawar Cantonment",
        year: p.year || fallback.year || "2024",
        area: fallback.area || (p.category.toLowerCase().includes("supervision") ? "Approx. 180,000 SQ FT" : p.category.toLowerCase().includes("landscape") ? "Approx. 125 Acres" : p.category.toLowerCase().includes("interior") ? "2,450 SQ FT" : "7,200 SQ FT"),
        length: fallback.length || (p.category.toLowerCase().includes("landscape") ? "5.2 KM" : undefined),
        plantation: fallback.plantation || (p.category.toLowerCase().includes("landscape") ? "10,000+ Trees & Shrubs" : undefined),
        plotArea: fallback.plotArea || (p.category.toLowerCase().includes("supervision") ? "23,500 SQ FT" : undefined),
        plotSize: fallback.plotSize || "1 Kanal",
        use: fallback.use || (p.category.toLowerCase().includes("supervision") ? "Shops, Offices, Apartments" : undefined),
        structure: fallback.structure || (p.category.toLowerCase().includes("supervision") ? "RCC Framed Structure" : undefined),
        floors: fallback.floors || (p.category.toLowerCase().includes("supervision") ? "G+6 (Basement + Ground + 6)" : undefined),
        commencement: fallback.commencement || (p.category.toLowerCase().includes("supervision") ? "January 2023" : undefined),
        completion: fallback.completion || (p.category.toLowerCase().includes("supervision") ? "December 2024" : undefined),
        duration: fallback.duration || (p.category.toLowerCase().includes("supervision") ? "22 Months" : "10 Months"),
        constructionType: fallback.constructionType || "New Construction",
        contractType: fallback.contractType || p.category,
        coverImage: p.coverImage || fallback.coverImage || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=85",
        description: p.description || fallback.description,
        tagline: fallback.tagline || (p.category.toLowerCase().includes("supervision") ? "G+6 Mixed-Use Development" : p.category.toLowerCase().includes("landscape") ? "Connecting Nature. Enhancing Life." : `${p.category} Excellence & Modern Innovation`),
        tagline2: fallback.tagline2 || (p.category.toLowerCase().includes("supervision") ? "Supervision You Can Trust. Quality You Can See." : undefined),
        scopeOfWork: fallback.scopeOfWork || [
          "Review of shop drawings and material submittals",
          "Verification of setting out and dimensional accuracy",
          "Monitoring of quality of materials and workmanship",
          "Inspection of structural works at all stages",
          "Coordination with MEP and other consultants",
          "Monitoring of progress against approved schedule",
          "Site meetings, reporting and documentation",
          "Ensuring compliance with safety regulations",
        ],
        status: fallback.status || "Completed (2024)",
        siteProgressStages: fallback.siteProgressStages,
        gallery: fallback.gallery || [
          p.coverImage,
          "https://images.unsplash.com/photo-1541888946425-d0fbb18f13f7?w=1000&q=80",
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80",
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
        ],
        features: fallback.features,
        conceptText: fallback.conceptText,
        overviewText1: fallback.overviewText1,
        overviewText2: fallback.overviewText2,
        featureBedroomImage: fallback.featureBedroomImage,
        hardHatImage: fallback.hardHatImage,
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
        location: fallback.location || "Peshawar Cantonment",
        year: fallback.year || "2024",
        area: fallback.area || "Approx. 180,000 SQ FT",
        plotArea: fallback.plotArea || "23,500 SQ FT",
        use: fallback.use || "Shops, Offices, Apartments",
        structure: fallback.structure || "RCC Framed Structure",
        floors: fallback.floors || "G+6 (Basement + Ground + 6)",
        commencement: fallback.commencement || "January 2023",
        completion: fallback.completion || "December 2024",
        duration: fallback.duration || "22 Months",
        coverImage: fallback.coverImage,
        description: fallback.description,
        tagline: fallback.tagline,
        tagline2: fallback.tagline2,
        scopeOfWork: fallback.scopeOfWork,
        status: fallback.status || "Completed (2024)",
        siteProgressStages: fallback.siteProgressStages,
        gallery: fallback.gallery,
        features: fallback.features,
        conceptText: fallback.conceptText,
        overviewText1: fallback.overviewText1,
        overviewText2: fallback.overviewText2,
        featureBedroomImage: fallback.featureBedroomImage,
        hardHatImage: fallback.hardHatImage,
      };
    } else {
      const formattedTitle = slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      projectData = {
        slug,
        title: formattedTitle,
        category: "Construction Supervision",
        client: "Private Client",
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
        coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=85",
        tagline: "G+6 Mixed-Use Development",
        tagline2: "Supervision You Can Trust. Quality You Can See.",
        description:
          "Fanoon Consultants provided complete construction supervision services, ensuring the project was executed in strict accordance with the approved design, specifications, quality standards and project timeline.",
        overviewText1:
          "Our team was responsible for end-to-end construction supervision to ensure the highest standards of workmanship, material quality and compliance with drawings and specifications.",
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
      };
    }
  }

  return <ProjectDetailClient project={projectData} />;
}
