import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import Portfolio from "@/components/sections/portfolio";
import CTA from "@/components/sections/cta";
import { generateSEO } from "@/lib/seo";
import { servicesSchema } from "@/lib/structured-data";
import ScrollToTop from "@/components/scroll-to-top";
import EmbedModal from "@/components/ui/embed-modal";
import Banner from "@/components/enrollment/banner";

export const metadata = generateSEO({
  title: "Professional Software Development Services",
  description:
    "Transform your business with custom web development, mobile apps, desktop applications, and reliable hosting services. Get started with Gree Software Company today.",
  canonical: "/",
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesSchema),
        }}
      />
      <Hero />
      <Banner />
      <Services />
      <About />
      <Portfolio />
      <CTA />
      <EmbedModal title="💻 Learn practical computer skills for your future career!" />
      <ScrollToTop />
    </>
  );
}
