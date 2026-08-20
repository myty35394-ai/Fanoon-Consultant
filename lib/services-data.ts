import {
  Building2,
  Users,
  PenTool,
  Lightbulb,
  Leaf,
  FileText,
  CheckCircle2,
  HardHat,
  MapPin,
  FileImage,
  Ruler,
  Calculator,
  Sofa,
  Trees,
  Box,
  ClipboardList
} from "lucide-react";

export type ServiceDetail = {
  slug: string;
  navLabel: string;
  heroTitle: string;
  heroBody: string;
  heroImage: string;
  introTitle: string;
  introBody: string[];
  introImage: string;
  pillars: { icon: any; label: string }[];
  process: { icon: any; step: number; title: string; description: string }[];
  deliverables: { icon: any; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  projectCategory: string;
};

export const servicesData: ServiceDetail[] = [
  {
    slug: "architecture-design",
    navLabel: "Architecture Design",
    heroTitle: "Designing Spaces. Building Legacies.",
    heroBody:
      "We create innovative, functional and timeless architectural solutions that balance aesthetics, functionality, sustainability and context to enhance the way people live and work.",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    introTitle: "Architecture That Inspires and Endures.",
    introBody: [
      "At Fanoon Consultants, architecture is more than design — it is the art of creating meaningful spaces that elevate human experience. We combine creativity with technical expertise to deliver buildings that are functional, aesthetically refined and sustainable.",
      "Our designs are driven by a deep understanding of context, user needs and future growth, ensuring every project we create stands the test of time.",
    ],
    introImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    pillars: [
      { icon: MapPin, label: "Contextual Design" },
      { icon: Lightbulb, label: "Innovative & Functional" },
      { icon: Leaf, label: "Sustainable Solutions" },
      { icon: Users, label: "Client-Centric Approach" },
    ],
    process: [
      {
        icon: Users,
        step: 1,
        title: "Consultation",
        description: "Understanding your vision, requirements and budget.",
      },
      {
        icon: Building2,
        step: 2,
        title: "Site Analysis",
        description:
          "Analyzing site conditions, context, regulations and opportunities.",
      },
      {
        icon: Lightbulb,
        step: 3,
        title: "Concept Design",
        description: "Developing initial concepts and design direction.",
      },
      {
        icon: PenTool,
        step: 4,
        title: "Design Development",
        description: "Refining design, materials and technical solutions.",
      },
      {
        icon: FileText,
        step: 5,
        title: "Documentation",
        description:
          "Preparing detailed drawings, specifications and schedules.",
      },
      {
        icon: CheckCircle2,
        step: 6,
        title: "Approval & Submission",
        description: "Managing authority submissions and approvals.",
      },
      {
        icon: HardHat,
        step: 7,
        title: "Construction Support",
        description:
          "Providing support during tendering and construction for design integrity.",
      },
    ],
    deliverables: [
      {
        icon: FileImage,
        title: "Concept Design Package",
        description: "Layouts, sketches, 3D views and concept presentations",
      },
      {
        icon: FileImage,
        title: "Design Development Package",
        description:
          "Refined drawings, 3D visualizations, materials and finishes",
      },
      {
        icon: Ruler,
        title: "Working Drawings",
        description:
          "Detailed architectural drawings with complete specifications",
      },
      {
        icon: Building2,
        title: "Authority Submission Drawings",
        description: "Documentation for permits and regulatory approvals",
      },
      {
        icon: Calculator,
        title: "BOQ & Cost Estimation",
        description: "Detailed quantity takeoff and cost estimation",
      },
      {
        icon: FileText,
        title: "Tender Documents",
        description: "Tender drawings, specifications and instructions",
      },
    ],
    faqs: [
      {
        question: "What does your architecture design service include?",
        answer:
          "We offer end-to-end architectural design, including concept development, detailed drawings, authority approvals, and construction support.",
      },
      {
        question: "How long does the architecture design process take?",
        answer:
          "The timeline varies by project size, typically ranging from a few weeks for initial concepts to several months for full construction documentation.",
      },
      {
        question: "Do you handle approvals and submissions?",
        answer:
          "Yes, we manage all necessary authority submissions to ensure your project complies with local regulations.",
      },
      {
        question: "Can you work on renovation or existing buildings?",
        answer:
          "Absolutely. We offer design services for both ground-up new builds and renovations or adaptive reuse of existing structures.",
      },
      {
        question: "What sets Fanoon Consultants apart in architecture design?",
        answer:
          "We combine a highly contextual, client-centric approach with rigorous technical detailing and a strong focus on sustainability.",
      },
    ],
    projectCategory: "Architecture",
  },
  // TODO: The following 5 services use placeholder content.
  // Flag for real content review before launch.
  {
    slug: "interior-design",
    navLabel: "Interior Design",
    heroTitle: "Elegant Interiors. Functional Spaces.",
    heroBody:
      "We design interiors that reflect your style and elevate the everyday experience through meticulous detailing and creativity.",
    heroImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
    introTitle: "Bringing Spaces to Life.",
    introBody: [
      "Our interior design service focuses on harmony, proportion, and aesthetic refinement, creating spaces that feel as good as they look.",
      "From material selection to custom furnishings, we handle every detail.",
    ],
    introImage:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    pillars: [
      { icon: Sofa, label: "Custom Furnishings" },
      { icon: Lightbulb, label: "Lighting Design" },
      { icon: Leaf, label: "Material Selection" },
      { icon: Users, label: "User Experience" },
    ],
    process: [
      { icon: Users, step: 1, title: "Consultation", description: "Understanding your vision" },
      { icon: Lightbulb, step: 2, title: "Concept", description: "Moodboards and initial ideas" },
      { icon: PenTool, step: 3, title: "Design", description: "Detailed 3D models" },
      { icon: FileText, step: 4, title: "Documentation", description: "Technical drawings" },
      { icon: Calculator, step: 5, title: "Procurement", description: "Sourcing materials" },
      { icon: HardHat, step: 6, title: "Execution", description: "Site coordination" },
      { icon: CheckCircle2, step: 7, title: "Handover", description: "Final styling and delivery" },
    ],
    deliverables: [
      { icon: FileImage, title: "Moodboards", description: "Visual direction" },
      { icon: Box, title: "3D Renders", description: "Photorealistic previews" },
      { icon: Ruler, title: "Layout Plans", description: "Space planning" },
      { icon: Leaf, title: "Material Boards", description: "Finishes and textures" },
      { icon: FileText, title: "Furniture Schedules", description: "Detailed lists" },
      { icon: CheckCircle2, title: "Styling Guide", description: "Final touches" },
    ],
    faqs: [
      { question: "Do you provide furniture?", answer: "We assist with sourcing and custom design." },
      { question: "How much does it cost?", answer: "Cost varies based on scope and materials." },
      { question: "Can I use my existing furniture?", answer: "Yes, we can integrate it seamlessly." },
      { question: "Do you handle execution?", answer: "Yes, we oversee the entire installation." },
      { question: "What styles do you specialize in?", answer: "Modern, contemporary, and classical." },
    ],
    projectCategory: "Interior Design",
  },
  {
    slug: "landscape-design",
    navLabel: "Landscape Design",
    heroTitle: "Nature Meets Architecture.",
    heroBody:
      "We design sustainable outdoor environments that seamlessly connect nature with built spaces.",
    heroImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    introTitle: "Creating Beautiful Environments.",
    introBody: [
      "Our landscape designs prioritize sustainability, local ecology, and aesthetic beauty, creating tranquil and engaging outdoor spaces.",
      "We balance hardscape and softscape elements perfectly.",
    ],
    introImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    pillars: [
      { icon: Trees, label: "Softscape" },
      { icon: MapPin, label: "Hardscape" },
      { icon: Leaf, label: "Sustainability" },
      { icon: Lightbulb, label: "Lighting" },
    ],
    process: [
      { icon: Users, step: 1, title: "Consultation", description: "Site assessment" },
      { icon: Building2, step: 2, title: "Analysis", description: "Soil and climate study" },
      { icon: Lightbulb, step: 3, title: "Concept", description: "Initial layouts" },
      { icon: PenTool, step: 4, title: "Design", description: "Plant selection" },
      { icon: FileText, step: 5, title: "Documentation", description: "Irrigation plans" },
      { icon: CheckCircle2, step: 6, title: "Approval", description: "Local permits" },
      { icon: Trees, step: 7, title: "Planting", description: "Execution oversight" },
    ],
    deliverables: [
      { icon: Trees, title: "Planting Plans", description: "Species selection" },
      { icon: Ruler, title: "Hardscape Plans", description: "Paving and structures" },
      { icon: Leaf, title: "Irrigation Design", description: "Water management" },
      { icon: Lightbulb, title: "Lighting Layout", description: "Nighttime ambiance" },
      { icon: Calculator, title: "Cost Estimates", description: "Budgeting" },
      { icon: FileText, title: "Maintenance Guide", description: "Care instructions" },
    ],
    faqs: [
      { question: "Do you offer maintenance?", answer: "We provide guidelines and can recommend partners." },
      { question: "What plants do you use?", answer: "We prefer native, drought-resistant species." },
      { question: "Can you design pools?", answer: "Yes, water features are part of our expertise." },
      { question: "How long does plants take to grow?", answer: "We design for immediate impact and future growth." },
      { question: "Do you handle irrigation?", answer: "Yes, comprehensive water systems are included." },
    ],
    projectCategory: "Landscape Design",
  },
  {
    slug: "3d-visualization",
    navLabel: "3D Visualization",
    heroTitle: "Visualize Before You Build.",
    heroBody:
      "High-quality, photorealistic 3D renders and animations to bring your project to life.",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    introTitle: "Seeing Is Believing.",
    introBody: [
      "Our visualization team uses cutting-edge software to create stunningly realistic representations of unbuilt spaces.",
      "This helps in making informed design decisions and marketing projects effectively.",
    ],
    introImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    pillars: [
      { icon: Box, label: "Photorealistic" },
      { icon: Lightbulb, label: "Lighting Accurancy" },
      { icon: Users, label: "Interactive" },
      { icon: FileImage, label: "High Resolution" },
    ],
    process: [
      { icon: Users, step: 1, title: "Briefing", description: "Understanding requirements" },
      { icon: Box, step: 2, title: "Modeling", description: "Creating 3D geometry" },
      { icon: Leaf, step: 3, title: "Texturing", description: "Applying materials" },
      { icon: Lightbulb, step: 4, title: "Lighting", description: "Setting up environments" },
      { icon: FileImage, step: 5, title: "Drafts", description: "Low-res previews" },
      { icon: PenTool, step: 6, title: "Refinements", description: "Client feedback" },
      { icon: CheckCircle2, step: 7, title: "Final Render", description: "High-res delivery" },
    ],
    deliverables: [
      { icon: FileImage, title: "Exterior Renders", description: "Building facades" },
      { icon: Sofa, title: "Interior Renders", description: "Room views" },
      { icon: Trees, title: "Aerial Views", description: "Masterplan overviews" },
      { icon: Box, title: "3D Floor Plans", description: "Layout visualization" },
      { icon: Lightbulb, title: "Walkthroughs", description: "Animated tours" },
      { icon: Users, title: "VR Experiences", description: "Immersive models" },
    ],
    faqs: [
      { question: "What software do you use?", answer: "We use industry-standard tools like 3ds Max and V-Ray." },
      { question: "How long does a render take?", answer: "Usually 1-2 weeks depending on complexity." },
      { question: "Can I request changes?", answer: "Yes, we include a revision round in our process." },
      { question: "Do you need CAD files?", answer: "Yes, DWG files help us ensure accuracy." },
      { question: "Do you provide animations?", answer: "Yes, we offer high-quality walkthroughs." },
    ],
    projectCategory: "3D Visualization",
  },
  {
    slug: "project-management",
    navLabel: "Project Management",
    heroTitle: "Seamless Execution. On Time & Budget.",
    heroBody:
      "Comprehensive project management services to coordinate, plan, and deliver your project successfully.",
    heroImage:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80",
    introTitle: "Orchestrating Success.",
    introBody: [
      "We act as your representative, managing all stakeholders, timelines, and budgets to ensure a stress-free construction phase.",
      "Our proactive approach mitigates risks before they become issues.",
    ],
    introImage:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    pillars: [
      { icon: ClipboardList, label: "Planning" },
      { icon: Calculator, label: "Cost Control" },
      { icon: Users, label: "Coordination" },
      { icon: CheckCircle2, label: "Quality Assurance" },
    ],
    process: [
      { icon: Users, step: 1, title: "Initiation", description: "Defining scope" },
      { icon: FileText, step: 2, title: "Planning", description: "Scheduling and budgeting" },
      { icon: PenTool, step: 3, title: "Design Phase", description: "Design management" },
      { icon: Calculator, step: 4, title: "Tendering", description: "Contractor selection" },
      { icon: HardHat, step: 5, title: "Execution", description: "Site monitoring" },
      { icon: CheckCircle2, step: 6, title: "Control", description: "Quality and cost tracking" },
      { icon: Box, step: 7, title: "Closeout", description: "Handover and snagging" },
    ],
    deliverables: [
      { icon: FileText, title: "Project Charter", description: "Scope definition" },
      { icon: Calculator, title: "Master Schedule", description: "Timeline management" },
      { icon: Ruler, title: "Budget Reports", description: "Financial tracking" },
      { icon: Users, title: "Risk Register", description: "Issue mitigation" },
      { icon: ClipboardList, title: "Status Reports", description: "Regular updates" },
      { icon: CheckCircle2, title: "Handover Manuals", description: "Final documentation" },
    ],
    faqs: [
      { question: "Why do I need a project manager?", answer: "To save time, control costs, and ensure quality." },
      { question: "Do you manage contractors?", answer: "Yes, we coordinate all third parties." },
      { question: "How do you control budgets?", answer: "Through rigorous tendering and value engineering." },
      { question: "What if there are delays?", answer: "We proactively manage risks to keep projects on track." },
      { question: "Do you handle procurement?", answer: "Yes, we manage the purchasing process." },
    ],
    projectCategory: "Project Management",
  },
  {
    slug: "construction-supervision",
    navLabel: "Construction Supervision",
    heroTitle: "Ensuring Quality at Every Step.",
    heroBody:
      "Professional site supervision to guarantee that your project is built exactly as designed, safely and to the highest standards.",
    heroImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
    introTitle: "Building with Integrity.",
    introBody: [
      "Our supervision teams are on-site to ensure compliance with drawings, specifications, and safety regulations.",
      "We catch errors early, preventing costly rework and ensuring the final product meets your expectations.",
    ],
    introImage:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    pillars: [
      { icon: HardHat, label: "Site Safety" },
      { icon: CheckCircle2, label: "Quality Control" },
      { icon: Ruler, label: "Compliance" },
      { icon: FileText, label: "Reporting" },
    ],
    process: [
      { icon: Users, step: 1, title: "Kickoff", description: "Contractor onboarding" },
      { icon: FileText, step: 2, title: "Review", description: "Checking shop drawings" },
      { icon: HardHat, step: 3, title: "Inspection", description: "Daily site visits" },
      { icon: Ruler, step: 4, title: "Testing", description: "Material verification" },
      { icon: Calculator, step: 5, title: "Valuation", description: "Payment certification" },
      { icon: PenTool, step: 6, title: "Snagging", description: "Defect identification" },
      { icon: CheckCircle2, step: 7, title: "Completion", description: "Final sign-off" },
    ],
    deliverables: [
      { icon: FileText, title: "Daily Logs", description: "Site activity records" },
      { icon: CheckCircle2, title: "Inspection Reports", description: "Quality checks" },
      { icon: Ruler, title: "Material Approvals", description: "Sample verification" },
      { icon: Box, title: "Progress Photos", description: "Visual updates" },
      { icon: Calculator, title: "Payment Certificates", description: "Invoice verification" },
      { icon: Users, title: "Snag Lists", description: "Defect rectifications" },
    ],
    faqs: [
      { question: "Are you on site full-time?", answer: "We offer both full-time and part-time supervision." },
      { question: "How do you ensure quality?", answer: "Through rigorous inspections and material testing." },
      { question: "What about safety?", answer: "We enforce strict HSE protocols on all sites." },
      { question: "Do you approve payments?", answer: "Yes, we certify contractor valuations." },
      { question: "What happens if there is a mistake?", answer: "We issue non-compliance reports and oversee fixes." },
    ],
    projectCategory: "Construction Supervision",
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesData.find((s) => s.slug === slug);
}
