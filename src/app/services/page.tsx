import { generateSEO } from "@/lib/seo";
import ServicesHero from "@/components/sections/services-hero";
import ServicesList from "@/components/sections/services-list";
import Process from "@/components/sections/process";
import Technologies from "@/components/sections/technologies";

export const metadata = generateSEO({
  title: "Our Services - Web Development, Mobile Apps & More",
  description:
    "Comprehensive software development services including web development, mobile applications, desktop software, and hosting solutions. Professional services for businesses.",
  keywords: [
    "web development services",
    "mobile app development",
    "desktop applications",
    "web hosting",
    "software consulting",
  ],
  canonical: "/services",
});

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <ServicesHero />
      <ServicesList />
      <Process />
      <Technologies />
    </div>
  );
}
