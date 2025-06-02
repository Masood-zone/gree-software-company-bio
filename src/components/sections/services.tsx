import Link from "next/link";
import { Code, Smartphone, Monitor, Server, ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description:
        "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
      features: [
        "Responsive Design",
        "SEO Optimized",
        "Fast Loading",
        "Secure",
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description:
        "Native and cross-platform mobile apps for iOS and Android that engage users and drive business growth.",
      features: [
        "iOS & Android",
        "Cross-Platform",
        "User-Friendly",
        "Scalable",
      ],
    },
    {
      icon: Monitor,
      title: "Desktop Applications",
      description:
        "Powerful desktop software solutions tailored to your business needs with intuitive interfaces.",
      features: [
        "Cross-Platform",
        "High Performance",
        "Secure",
        "Customizable",
      ],
    },
    {
      icon: Server,
      title: "Web Hosting",
      description:
        "Reliable and secure web hosting services with 99.9% uptime guarantee and 24/7 technical support.",
      features: [
        "99.9% Uptime",
        "SSL Certificates",
        "Daily Backups",
        "24/7 Support",
      ],
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We provide comprehensive software development services to help your
            business thrive in the digital landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-8 bg-white dark:bg-secondary rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/services"
                  className="inline-flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors"
                >
                  Learn More
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors group"
          >
            View All Services
            <ArrowRight
              size={20}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
