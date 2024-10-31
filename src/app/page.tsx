import Faq from "@/components/accordion/faq";
import ServicesBanner from "@/components/banner/services-banner";
import Supercharge from "@/components/banner/supercharge";
import { Header } from "@/components/header/header";

export default function Home() {
  return (
    <section className="h-full">
      <Header />
      <section className="container m-auto space-y-8 px-6">
        {/* Supercharge organization */}
        <Supercharge />
        {/* Services */}
        <ServicesBanner />
        {/* FAQ */}
        <section id="faq">
          <Faq />
        </section>
      </section>
    </section>
  );
}
