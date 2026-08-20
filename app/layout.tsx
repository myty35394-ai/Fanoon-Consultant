import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getSiteSettings } from "@/lib/settings";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Fanoon Consultants",
    default: "Fanoon Consultants | Architecture & Design",
  },
  description: "Fanoon Consultants is an architecture and design consultancy offering Architectural Design, Interior Design, Landscape Design, Town Planning, and more.",
  openGraph: {
    title: "Fanoon Consultants | Architecture & Design",
    description: "Fanoon Consultants is an architecture and design consultancy offering Architectural Design, Interior Design, Landscape Design, Town Planning, and more.",
    url: "https://fanoonconsultants.com",
    siteName: "Fanoon Consultants",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  // Organization Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: settings.companyName || "Fanoon Consultants",
    logo: "https://fanoonconsultants.com/logo.png",
    url: "https://fanoonconsultants.com",
    description: "Architecture and design consultancy.",
  };

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer initialSettings={settings} />
      </body>
    </html>
  );
}
