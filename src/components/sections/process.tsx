import { MessageSquare, Lightbulb, Code, Rocket } from "lucide-react";

export default function Process() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Discovery & Consultation",
      description:
        "We start by understanding your business needs, goals, and requirements through detailed consultation sessions.",
      details: [
        "Requirements gathering",
        "Project scope definition",
        "Timeline planning",
        "Budget estimation",
      ],
    },
    {
      icon: Lightbulb,
      title: "Design & Planning",
      description:
        "Our team creates detailed designs and technical specifications to ensure your project meets all requirements.",
      details: [
        "UI/UX design",
        "Technical architecture",
        "Database design",
        "Project roadmap",
      ],
    },
    {
      icon: Code,
      title: "Development & Testing",
      description:
        "We build your solution using best practices and conduct thorough testing to ensure quality and performance.",
      details: [
        "Agile development",
        "Code reviews",
        "Quality assurance",
        "Performance testing",
      ],
    },
    {
      icon: Rocket,
      title: "Launch & Support",
      description:
        "We deploy your solution and provide ongoing support to ensure continued success and optimal performance.",
      details: ["Deployment", "Training", "Documentation", "Ongoing support"],
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We follow a proven methodology to ensure your project is delivered
            on time, within budget, and exceeds your expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-background rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-8 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                <div className="pt-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Icon size={32} className="text-primary" />
                  </div>

                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
