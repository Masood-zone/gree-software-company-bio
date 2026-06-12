import { generateSEO } from "@/lib/seo";
import ContactHero from "@/components/sections/contact-hero";
import ContactForm from "@/components/sections/contact-form";
import ContactInfo from "@/components/sections/contact-info";

export const metadata = generateSEO({
  title: "Contact Gree Software Company",
  description:
    "Contact Gree Software Company in Kumasi, Ghana for web development, mobile app development, software consulting, hosting, and project quotes.",
  keywords: [
    "contact Gree Software Company",
    "contact software company",
    "software company Kumasi",
    "project consultation",
    "software development quote",
    "ghana software services",
  ],
  canonical: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactHero />
      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-4 py-16">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
}
