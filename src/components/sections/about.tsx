import Link from "next/link";
import { Target, Users, Award, ArrowRight } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "Focused on delivering software solutions that drive real business results.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Experienced developers passionate about creating innovative solutions.",
    },
    {
      icon: Award,
      title: "Quality First",
      description: "Committed to excellence in every project we undertake.",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-left">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                About <span className="gradient-text">Gree Software</span>{" "}
                Company
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We are a professional software development company dedicated to
                transforming businesses through innovative technology solutions.
                Our team combines technical expertise with creative
                problem-solving to deliver exceptional results.
              </p>
            </div>

            <div className="space-y-6">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 border border-border rounded-full font-medium bg-white dark:bg-secondary hover:bg-secondary/80 dark:hover:bg-secondary/70 transition-colors group text-black dark:text-foreground"
            >
              Learn More About Us
              <ArrowRight
                size={20}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 animate-fade-in-right">
            <div className="text-center p-8 bg-card dark:bg-secondary rounded-2xl">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="text-center p-8 bg-card dark:bg-secondary rounded-2xl">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
            <div className="text-center p-8 bg-card dark:bg-secondary rounded-2xl">
              <div className="text-4xl font-bold mb-2">Fast</div>
              <div className="text-muted-foreground">Project Delivery</div>
            </div>
            <div className="text-center p-8 bg-card dark:bg-secondary rounded-2xl">
              <div className="text-4xl font-bold mb-2">Modern</div>
              <div className="text-muted-foreground">Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
