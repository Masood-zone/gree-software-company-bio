import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      title: "Sean Nation TV",
      description:
        "Media and entertainment website with content management system",
      image: "/src/assets/images/sean-nation-logo.jpg",
      category: "Web Development",
    },
    {
      title: "Ramoth Services",
      description: "Business services platform with client management features",
      image: "/src/assets/images/ramoth-official-logo.jpg",
      category: "Business Platform",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover some of the successful projects we&apos;ve delivered for
            our clients, showcasing our expertise and commitment to excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-secondary rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/80 dark:bg-secondary/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ExternalLink
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm text-primary font-medium mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </section>
  );
}
