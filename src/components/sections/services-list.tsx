import {
  Code,
  Smartphone,
  Monitor,
  Server,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function ServicesList() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description:
        "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
      features: [
        "Responsive Design",
        "SEO Optimization",
        "Content Management Systems",
        "E-commerce Solutions",
        "Progressive Web Apps",
        "API Integration",
      ],
      technologies: ["React", "Next.js", "Node.js", "PHP", "WordPress"],
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description:
        "Native and cross-platform mobile apps for iOS and Android that engage users and drive business growth.",
      features: [
        "iOS Development",
        "Android Development",
        "Cross-Platform Apps",
        "UI/UX Design",
        "App Store Optimization",
        "Push Notifications",
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Xamarin"],
    },
    {
      icon: Monitor,
      title: "Desktop Applications",
      description:
        "Powerful desktop software solutions tailored to your business needs with intuitive interfaces.",
      features: [
        "Cross-Platform Compatibility",
        "High Performance",
        "Secure Architecture",
        "Custom Integrations",
        "Database Management",
        "User Access Control",
      ],
      technologies: ["Electron", "Qt", "C#", ".NET", "Java"],
    },
    {
      icon: Server,
      title: "Web Hosting & Cloud Services",
      description:
        "Reliable and secure web hosting services with 99.9% uptime guarantee and 24/7 technical support.",
      features: [
        "99.9% Uptime Guarantee",
        "SSL Certificates",
        "Daily Backups",
        "24/7 Technical Support",
        "Scalable Infrastructure",
        "Security Monitoring",
      ],
      technologies: ["AWS", "DigitalOcean", "Cloudflare", "Linux", "Docker"],
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  isEven ? "" : "lg:grid-flow-col-dense"
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Content */}
                <div className={`space-y-6 ${isEven ? "" : "lg:col-start-2"}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Icon size={32} className="text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold">{service.title}</h3>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Key Features:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle
                            size={16}
                            className="text-primary flex-shrink-0"
                          />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-secondary text-sm rounded-full border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors group"
                  >
                    Get Started
                    <ArrowRight
                      size={20}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>

                {/* Visual */}
                <div className={`${isEven ? "" : "lg:col-start-1"}`}>
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/30 rounded-2xl p-12 text-center">
                    <Icon size={120} className="text-primary mx-auto mb-6" />
                    <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                    <p className="text-muted-foreground">
                      Professional solutions tailored to your needs
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
