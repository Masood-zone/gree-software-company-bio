import {
  Code,
  Database,
  Cloud,
  Smartphone,
  Monitor,
  Globe,
} from "lucide-react";

export default function Technologies() {
  const categories = [
    {
      icon: Globe,
      title: "Frontend",
      technologies: [
        "React",
        "Next.js",
        "Vue.js",
        "TypeScript",
        "Tailwind CSS",
        "HTML5/CSS3",
      ],
    },
    {
      icon: Code,
      title: "Backend",
      technologies: [
        "Node.js",
        "PHP",
        "Python",
        "Express.js",
        "Laravel",
        "REST APIs",
      ],
    },
    {
      icon: Database,
      title: "Database",
      technologies: [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Firebase",
        "SQLite",
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile",
      technologies: [
        "React Native",
        "Flutter",
        "Swift",
        "Kotlin",
        "Xamarin",
        "Ionic",
      ],
    },
    {
      icon: Monitor,
      title: "Desktop",
      technologies: ["Electron", "Qt", "C#/.NET", "Java", "Python", "C++"],
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      technologies: ["AWS", "DigitalOcean", "Docker", "Git", "CI/CD", "Linux"],
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Technologies We <span className="gradient-text">Master</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We stay current with the latest technologies and frameworks to
            deliver cutting-edge solutions that meet modern business
            requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="p-8 bg-secondary rounded-2xl border border-border hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-background text-sm rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
