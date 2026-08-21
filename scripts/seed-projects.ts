export {};
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const { neon } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-http");
const { projects } = require("../db/schema");

async function main() {
  console.log("🏗️  Seeding distinct portfolio projects to Neon DB for Fanoon and Arsalan...");
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  // 1. Clear existing projects first to ensure clean state
  await db.delete(projects);
  console.log("Cleared existing projects table.");

  const portfolioProjects = [
    // ══════════════════════════════════════════════════════════════
    // 🏢 FANOON CONSULTANTS PROJECTS (isArsalan: false)
    // ══════════════════════════════════════════════════════════════

    // 1. Architecture (Fanoon)
    {
      id: "prj_fan_01",
      slug: "cantt-heights-mixed-use",
      title: "Cantt Heights Mixed-Use Complex",
      category: "Architecture",
      client: "Peshawar Urban Development Corp",
      location: "Peshawar Cantonment, Pakistan",
      year: "2024",
      tagline: "Contemporary Commercial & Residential Façade Architecture",
      plotSize: "2 Kanal (1,000 Sq Yds)",
      area: "18,500 SQ FT",
      floors: "Basement + G+6 Floors",
      scope: "Complete Concept Design, Architectural CAD & Exterior Facade Styling",
      status: "Completed",
      duration: "18 Months",
      structure: "RCC Frame with Post-Tensioned Slabs",
      constructionType: "Mixed-Use Commercial & Residential",
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      ]),
      drawingImages: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
      ]),
      teamMembers: JSON.stringify(["team_01", "team_03", "team_04"]),
      description: "G+6 Mixed-Use Development featuring a retail ground floor, commercial mezzanine, and luxury residential apartments above. Designed with an energy-efficient building envelope, cantilevered balconies, and architectural louvers.",
      materialsData: JSON.stringify({
        concept: "The material palette is anchored by natural stone, dark aluminum, and high-performance glazing—balancing the solidity of a commercial facade with the warmth required for residential spaces above. Every material is selected for durability, low maintenance, and architectural impact.",
        quote: "Bold materiality, disciplined detail, and enduring craftsmanship define the character of this mixed-use development.",
        exteriorFinishes: ["Natural Stone Cladding (Facade)", "Dark Anodized Aluminum Cladding", "Wood Look Aluminum Louvers (Sun Control)", "High-Performance Double Glazed Curtain Wall", "Pre-cast Concrete Elements", "Dark Aluminum Framing"],
        interiorFloors: ["Polished Concrete (Retail Ground Floor)", "Large Format Vitrified Tiles (Lobby)", "Engineered Timber (Residential Floors)", "Carpet Tiles (Offices)", "Anti-Skid Porcelain (Common Areas)"],
        interiorWalls: ["Off-White Textured Paint (Residential)", "Exposed Concrete Feature Wall (Lobby)", "Timber Acoustic Panels (Offices)", "High-Gloss Tiles (Commercial Units)"],
        ceilingLighting: ["Exposed Concrete Ceiling (Ground Floor)", "Suspended Gypsum Board (Residential)", "Recessed LED Downlights Throughout", "Pendant Lighting (Lobby)", "Linear LED Track Lighting (Retail)"],
        joineryMillwork: ["Custom Steel-Frame Doors (Commercial)", "Solid Core Timber Doors (Residential)", "Built-in Joinery (Apartment Units)", "Powder-Coated Steel Handrails"],
        metalGlass: ["Dark Aluminum Window Frames", "Structural Glass Balustrades", "Stainless Steel Entrance Canopy", "Black Powder-Coated Metal Railings"],
        sustainableChoices: ["Low-E double glazing for solar heat gain control", "Dark anodized aluminum for reduced heat absorption", "Energy-efficient LED lighting throughout", "Natural ventilation corridors in residential units"],
      }),
      featured: true,
      isArsalan: false,
    },

    // 2. Interior Design (Fanoon)
    {
      id: "prj_fan_02",
      slug: "the-haven-luxury-penthouse",
      title: "The Haven Luxury Penthouse",
      category: "Interior Design",
      client: "Private Client",
      location: "Sector F-7, Islamabad",
      year: "2025",
      tagline: "Bespoke Warm Minimalism with Italian Marble & Custom Joinery",
      plotSize: "5,200 SQ FT Penthouse",
      area: "5,200 SQ FT",
      floors: "Full 14th Floor Penthouse",
      scope: "Turnkey Interior Fit-out, Lighting Schemes, Custom Millwork & Furniture Styling",
      status: "Completed",
      duration: "6 Months",
      structure: "Interior Fit-out",
      constructionType: "Luxury Residential Interior",
      coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
      ]),
      drawingImages: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
      ]),
      teamMembers: JSON.stringify(["team_01", "team_05"]),
      description: "A serene luxury penthouse designed with organic materials, brushed brass details, bookmatched Calacatta marble, and automated circadian lighting. Features custom walnut cabinetry and an integrated open-plan lounge.",
      materialsData: JSON.stringify({
        concept: "The material palette of The Haven is a study in warm minimalism—bookmatched Calacatta marble, hand-brushed solid walnut joinery, and champagne-toned brass hardware define every surface. The selections elevate the everyday lived experience, creating a home that feels both curated and intimately personal.",
        quote: "A home's true luxury lies in the quality of its materials, the warmth of its textures, and the precision of its craftsmanship.",
        interiorFloors: ["Bookmatched Calacatta Marble (Entrance Hall)", "Wide-Board Engineered Oak (Living & Dining)", "Honed Basalt Tile (Kitchen & Wet Areas)", "Heated Travertine (Master Bathroom)", "Natural Sisal Carpet (Bedrooms)"],
        interiorWalls: ["Warm White Limewash Plaster (Living)", "Fluted Walnut Paneling (Feature Walls)", "Natural Lime Stone Cladding (Fireplace)", "Bouclé Fabric Wall Panels (Bedrooms)", "Satin Porcelain (Bathrooms)"],
        ceilingLighting: ["Gypsum Cove Ceiling with Warm LED Strip (Living)", "Suspended Timber Slat Ceiling (Dining)", "Recessed Spotlights (Kitchen)", "Bespoke Bronze Pendant Lights (Dining & Entry)", "Concealed Linear LED Strips (Hallways)"],
        joineryMillwork: ["Solid Walnut Custom Kitchen Cabinetry", "Built-in Walk-in Wardrobes (Smoked Oak)", "TV Feature Unit with Integrated Shelving", "Vanity Units with Stone Tops (Quartz)", "Library Shelving with Brass Ladder"],
        metalGlass: ["Brushed Brass Door Hardware Throughout", "Matte Black Tapware & Fittings (Bathrooms)", "Frameless Glass Shower Screens", "Smoked Glass Partitions (Study)", "Brushed Gold Chandelier (Entry)"],
        sustainableChoices: ["VOC-free paints and lime plasters", "FSC-certified engineered timber flooring", "Energy-efficient circadian LED lighting system", "Water-saving tapware with flow restrictors", "Natural fibre carpets and rugs"],
      }),
      featured: true,
      isArsalan: false,
    },

    // 3. Landscape Design (Fanoon)
    {
      id: "prj_fan_03",
      slug: "margalla-valley-eco-park",
      title: "Margalla Valley Eco-Park & Promenade",
      category: "Landscape Design",
      client: "Capital Development Authority",
      location: "Margalla Foothills, Islamabad",
      year: "2024",
      tagline: "Native Flora Restoration, Water Bodies & Community Walkways",
      plotSize: "45 Acres Ecological Zone",
      area: "65% Native Forest & Canopy Cover",
      floors: "3.8 KM Walkway & Cycling Track",
      scope: "Masterplanning, Botanical Selection, Stormwater Recycling & Public Parks",
      status: "Completed",
      duration: "12 Months",
      structure: "Landscape Infrastructure",
      constructionType: "Civic Eco-Park Masterplan",
      coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
        "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=1200&q=80",
        "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&q=80",
        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&q=80",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
      ]),
      drawingImages: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
      ]),
      teamMembers: JSON.stringify(["team_01", "team_03"]),
      description: "A sustainable landscape masterplan featuring stormwater retention bio-swales, indigenous drought-tolerant trees, pedestrian timber boardwalks, and interactive amphitheater zones.",
      materialsData: JSON.stringify({
        concept: "The material palette of Margalla Valley Eco-Park draws directly from the natural terrain—local stone, weathered timber, and native earth tones create a seamless transition between built infrastructure and natural wilderness. Every material is chosen to minimize ecological impact while providing lasting public amenity.",
        quote: "Landscape endures when its materials are honest, its forms are generous, and its planting is rooted in the native ecology.",
        exteriorFinishes: ["Rough-hewn Local Limestone (Boundary & Feature Walls)", "Treated Hardwood Timber Screens", "Rammed Earth Feature Walls (Amphitheater)", "Naturally Weathered Corten Steel (Signage & Edging)", "Local Fieldstone Dry-stack Walls"],
        interiorFloors: ["Granite Cobblestone (Main Plazas)", "Compacted Gravel Paths (Nature Trails)", "Recycled Timber Boardwalk (Waterfront)", "Exposed Aggregate Concrete (Cycling Track)", "Natural Stone Stepping Stones (Stream Crossings)"],
        interiorWalls: ["Local Limestone Retaining Walls", "Corten Steel Planting Bed Edging", "Rendered Concrete (Pavilion Walls)", "Natural Stone Veneer (Seating Structures)"],
        ceilingLighting: ["Timber Pergola Frames (Shaded Seating)", "Tensile Fabric Sail Shades (Open Areas)", "Solar-Powered Bollard Lighting (Pathways)", "Recessed Ground Uplights (Feature Trees)", "Open-Sky Amphitheater (No Overhead)"],
        joineryMillwork: ["Hardwood Slatted Bench Seating", "Steel-Frame Timber Pergola Structures", "Prefabricated Timber Pavilion Units", "Ornamental Iron Fencing (Boundary)", "Natural Timber Play Structures (Children's Area)"],
        metalGlass: ["Galvanized Steel Railings (Elevated Walkway)", "Aluminum Interpretive Signage Boards", "Cast Iron Tree Grates & Drain Channels", "Brass Drinking Fountain Fittings"],
        sustainableChoices: ["100% native and drought-tolerant tree species", "Permeable paving to recharge groundwater", "Stormwater bio-swales and retention ponds", "Solar-powered pathway and plaza lighting", "Recycled timber and reclaimed stone throughout"],
      }),
      featured: true,
      isArsalan: false,
    },

    // 4. 3D Visualization (Fanoon)
    {
      id: "prj_fan_04",
      slug: "the-lumina-modern-residence-cgi",
      title: "The Lumina Modern Residence CGI",
      category: "3D Visualization",
      client: "Apex Realty Group",
      location: "DHA Phase 6, Lahore",
      year: "2026",
      tagline: "Realistic. Detailed. Inspiring.",
      plotSize: "1 Kanal (500 Sq Yds)",
      area: "3ds Max + Corona Renderer + Photoshop",
      floors: "G+2 Residence",
      scope: "Exterior Photorealistic CGI, Twilight Lighting & 360° Panoramas",
      status: "Completed",
      duration: "3 Weeks",
      structure: "3D Digital Twin",
      constructionType: "Architectural CGI Visualization",
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      ]),
      drawingImages: JSON.stringify([]),
      teamMembers: JSON.stringify(["team_01", "team_03"]),
      description: "High-end architectural 3D CGI visuals showcasing realistic dusk illumination, landscape foliage shaders, refractive water caustics, and fine facade material texturing.",
      featured: true,
      isArsalan: false,
    },

    // 5. Construction Supervision (Fanoon)
    {
      id: "prj_fan_05",
      slug: "titan-commercial-plaza-supervision",
      title: "Titan Commercial Plaza Structural Supervision",
      category: "Construction Supervision",
      client: "Titan Horizon Ventures",
      location: "Blue Area, Islamabad",
      year: "2025",
      tagline: "Rigorous Structural Inspections & Milestone QA Delivery",
      plotSize: "165,000 SQ FT Total Built-up",
      area: "RCC Frame Structure with Post-Tensioned Slabs",
      floors: "2 Basements + G+9 Commercial Floors",
      scope: "Full Civil, Structural, Concrete Core Testing, MEP & Safety QA Monitoring",
      status: "Under Construction",
      duration: "22 Months",
      structure: "Reinforced Concrete Frame",
      constructionType: "Commercial High-Rise Complex",
      coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
        "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1200&q=80",
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
      ]),
      drawingImages: JSON.stringify([]),
      teamMembers: JSON.stringify(["team_02", "team_04"]),
      description: "On-site construction supervision covering raft foundation casting, post-tensioned slab stress tests, structural steel fabrication audits, MEP rough-ins, and OSHA site safety compliance.",
      featured: false,
      isArsalan: false,
    },

    // 6. Project Management (Fanoon)
    {
      id: "prj_fan_06",
      slug: "nexus-corporate-headquarters",
      title: "Nexus Corporate Headquarters Turnkey Delivery",
      category: "Project Management",
      client: "Nexus Tech Holdings",
      location: "Gulberg III, Lahore",
      year: "2024",
      tagline: "Comprehensive Scheduling, Procurement & Budget Optimization",
      plotSize: "45,000 SQ FT Corporate Facility",
      area: "Lump Sum Turnkey (EPC)",
      floors: "G+5 Corporate Offices",
      scope: "Tendering, Vendor Procurement, Critical Path Scheduling & Quality Auditing",
      status: "Completed",
      duration: "14 Months",
      structure: "Composite Steel & Concrete",
      constructionType: "Turnkey Corporate Office Delivery",
      coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      ]),
      drawingImages: JSON.stringify([]),
      teamMembers: JSON.stringify(["team_02", "team_04"]),
      description: "End-to-end project management overseeing contractor tendering, value engineering, Primavera P6 scheduling, milestone certifications, and defect liability handover.",
      featured: false,
      isArsalan: false,
    },

    // ══════════════════════════════════════════════════════════════
    // 👑 AR. ARSALAN HAIDER PORTFOLIO (isArsalan: true)
    // ══════════════════════════════════════════════════════════════

    // 1. Architecture (Arsalan - Landmark Coastal Tower)
    {
      id: "prj_ars_01",
      slug: "al-reem-island-coastal-tower",
      title: "Al Reem Island Coastal Residential Tower",
      category: "Architecture",
      client: "Aldar Properties JV",
      location: "Abu Dhabi, United Arab Emirates",
      year: "2024",
      tagline: "Parametric Glazing & Aerodynamic Seaside Architecture",
      plotSize: "85,000 SQ FT Footprint",
      area: "240,000 SQ FT Built-up Area",
      floors: "3 Basements + Podium + 28 Floors",
      scope: "Lead Principal Architectural Design, Parametric Facade Modeling & Environmental Analysis",
      status: "Completed",
      duration: "30 Months",
      structure: "High-Performance Concrete Core with Outriggers",
      constructionType: "High-Rise Coastal Residential",
      coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1200&q=80",
        "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&q=80",
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80",
        "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=1200&q=80",
      ]),
      drawingImages: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
      ]),
      teamMembers: JSON.stringify(["team_01", "team_03"]),
      description: "A signature 28-storey luxury waterfront residential high-rise featuring curved aerodynamic balconies, solar-responsive kinetic facades, double-height sky gardens, and infinity pools overlooking the Arabian Gulf.",
      featured: true,
      isArsalan: true,
    },

    // 2. Architecture (Arsalan - Dubai Executive Towers)
    {
      id: "prj_ars_02",
      slug: "dubai-business-bay-executive-towers",
      title: "Dubai Business Bay Executive Towers",
      category: "Architecture",
      client: "Emaar Properties Partner",
      location: "Business Bay, Dubai, UAE",
      year: "2023",
      tagline: "Sculptural Twin-Tower Commercial Center with Connecting Skybridge",
      plotSize: "120,000 SQ FT Development",
      area: "380,000 SQ FT Total GFA",
      floors: "Twin Towers — 32 & 24 Storeys",
      scope: "Master Architectural Concept, Skybridge Design, Glass Curtain Wall & Structural Integration",
      status: "Completed",
      duration: "36 Months",
      structure: "Steel-Concrete Composite Framed Structure",
      constructionType: "Commercial Twin Towers",
      coverImage: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
        "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&q=80",
      ]),
      drawingImages: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
      ]),
      teamMembers: JSON.stringify(["team_01"]),
      description: "An iconic corporate landmark in Dubai's financial district. The two towers are joined at level 18 by a 40-meter glass-floored executive skybridge, housing meeting lounges and panoramic observation decks.",
      featured: true,
      isArsalan: true,
    },

    // 3. Interior Design (Arsalan - Royal Estate)
    {
      id: "prj_ars_03",
      slug: "villa-seraphina-luxury-estate",
      title: "Villa Seraphina Luxury Estate",
      category: "Interior Design",
      client: "Private Royal Client",
      location: "Al Barari, Dubai, UAE",
      year: "2025",
      tagline: "Contemporary Mediterranean Grandeur with Bespoke Millwork",
      plotSize: "14,000 SQ FT Interior Spread",
      area: "14,000 SQ FT",
      floors: "Basement Spa + Ground + First + Rooftop Lounge",
      scope: "Ultra-luxury Interior Styling, Custom Italian Joinery, Onyx Feature Walls & Smart Home Integration",
      status: "Completed",
      duration: "10 Months",
      structure: "Bespoke Millwork & Interior Architecture",
      constructionType: "Ultra-Luxury Residential Estate",
      coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
      ]),
      drawingImages: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
      ]),
      teamMembers: JSON.stringify(["team_01", "team_05"]),
      description: "A private royal sanctuary comprising master bedroom suites, indoor spa retreats, bespoke wine cellars, custom bronze screens, and backlit green onyx walls curated by Ar. Arsalan Haider.",
      featured: true,
      isArsalan: true,
    },

    // 4. Landscape Design (Arsalan - Botanical Gardens)
    {
      id: "prj_ars_04",
      slug: "sharjah-botanical-oasis-gardens",
      title: "Sharjah Botanical Oasis & Cultural Gardens",
      category: "Landscape Design",
      client: "Sharjah Investment & Development Authority",
      location: "Sharjah, United Arab Emirates",
      year: "2024",
      tagline: "Arid-Zone Microclimate Landscape & Shaded Peristyles",
      plotSize: "18 Hectares (44 Acres)",
      area: "80% Xeriscaping & Date Palm Canopy",
      floors: "4.5 KM Shaded Pedestrian Arcade",
      scope: "Landscape Masterplanning, Water Evaporative Cooling, Sunken Pavilions & Nighttime Lighting Scheme",
      status: "Completed",
      duration: "16 Months",
      structure: "Civic Oasis Infrastructure",
      constructionType: "Public Botanical & Cultural Park",
      coverImage: "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=1200&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
        "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&q=80",
        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&q=80",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
      ]),
      drawingImages: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
      ]),
      teamMembers: JSON.stringify(["team_01", "team_03"]),
      description: "An innovative desert urban sanctuary incorporating evaporative mist cooling corridors, sunken reflection courts, drought-hardy flora, and geometric stone plazas inspired by traditional Islamic architecture.",
      featured: true,
      isArsalan: true,
    },

    // 5. Architecture (Arsalan - Modernist Cantilever Villa)
    {
      id: "prj_ars_05",
      slug: "the-cantilever-modernist-villa",
      title: "The Cantilever Modernist Villa",
      category: "Architecture",
      client: "Private Tech Executive",
      location: "DHA Raya, Lahore",
      year: "2025",
      tagline: "Dramatic Floating Concrete Slabs & Floor-to-Ceiling Glass",
      plotSize: "2 Kanal (1,000 Sq Yds)",
      area: "7,800 SQ FT Built-up Area",
      floors: "Basement + G+1 + Cantilevered Upper Terrace",
      scope: "Architecture Concept Design, Post-Tensioned Cantilever Engineering & Infinity Pool Integration",
      status: "Completed",
      duration: "14 Months",
      structure: "Exposed Board-Form Concrete & Post-Tensioned Beams",
      constructionType: "Modernist Luxury Residence",
      coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      ]),
      drawingImages: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
      ]),
      teamMembers: JSON.stringify(["team_01", "team_03"]),
      description: "A bold architectural statement featuring an 8-meter cantilevered master wing floating above an infinity pool. Seamless indoor-outdoor connections with floor-to-ceiling motorized minimalist glazing.",
      featured: true,
      isArsalan: true,
    },

    // 6. 3D Visualization (Arsalan - Coastal Resort CGI)
    {
      id: "prj_ars_06",
      slug: "the-mirage-horizon-resort-cgi",
      title: "The Mirage Horizon Luxury Resort CGI",
      category: "3D Visualization",
      client: "Global Hospitality Brand",
      location: "Ras Al Khaimah Coastline, UAE",
      year: "2026",
      tagline: "Cinematic Photorealism, Water Reflections & Sunset Ambiance",
      plotSize: "30-Acre Coastal Resort",
      area: "Unreal Engine 5 + V-Ray Photorealism",
      floors: "Waterfront Chalets & Grand Pavilion",
      scope: "Photorealistic 3D Visualization, Drone Matchmoving & 360° Virtual Tour",
      status: "Completed",
      duration: "4 Weeks",
      structure: "3D Interactive Digital Twin",
      constructionType: "Photorealistic 3D Resort Visualization",
      coverImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      ]),
      drawingImages: JSON.stringify([]),
      teamMembers: JSON.stringify(["team_01"]),
      description: "State-of-the-art cinematic 3D visual storytelling for a 5-star coastal destination, featuring real-time water wave dynamics, golden hour sunlight refraction, and immersive 360° panoramic viewpoints.",
      featured: true,
      isArsalan: true,
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
