import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function CTA() {
  const benefits = [
    "Free consultation and project assessment",
    "Transparent pricing with no hidden costs",
    "Dedicated project manager assigned",
    "Regular progress updates and communication",
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-primary/5 to-secondary/50 rounded-3xl p-12 lg:p-16 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Transform Your
              <span className="block gradient-text">Business?</span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Let&apos;s discuss your project and explore how our software
              solutions can drive your business forward. Get started with a free
              consultation today.
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle
                    size={20}
                    className="text-primary flex-shrink-0"
                  />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors group"
              >
                Get Free Consultation
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border border-border rounded-full font-medium bg-white dark:bg-secondary text-black dark:text-foreground hover:bg-secondary/80 dark:hover:bg-secondary/70 transition-colors"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
