import { generateSEO } from "@/lib/seo";
import ServicesHero from "@/components/sections/services-hero";
import ServicesList from "@/components/sections/services-list";
import Process from "@/components/sections/process";
import Technologies from "@/components/sections/technologies";

export const metadata = generateSEO({
  title: "Software Development Services",
  description:
    "Explore Gree Software Company's web development, mobile app development, desktop software, web hosting, integrations, SEO, and software consulting services.",
  keywords: [
    "Gree Software Company services",
    "web development services",
    "mobile app development",
    "desktop applications",
    "web hosting",
    "SEO services",
    "software integrations",
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
