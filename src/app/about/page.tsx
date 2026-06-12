import { generateSEO } from "@/lib/seo";
import AboutHero from "@/components/sections/about-hero";
import Team from "@/components/sections/team";
import Vision from "@/components/sections/vision";
import Values from "@/components/sections/values";
import { aboutPageSchema, teamMemberSchemas } from "@/lib/structured-data";

export const metadata = generateSEO({
  title: "About Gree Software Company, Founders & Team",
  description:
    "Meet Dickson Osei Yeboah and Masood Acheampong, the founders behind Gree Software Company, and learn about our mission, vision, and software development team.",
  keywords: [
    "about gree software",
    "Gree Software Company founders",
    "Dickson Osei Yeboah",
    "Masood Acheampong",
    "software development team",
    "company mission",
    "ghana tech company",
  ],
  canonical: "/about",
  ogImage: "/yeboah.jpg",
});

export default function AboutPage() {
  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([aboutPageSchema, ...teamMemberSchemas]),
        }}
      />
      <AboutHero />
      <Vision />
      <Team />
      <Values />
    </div>
  );
}
