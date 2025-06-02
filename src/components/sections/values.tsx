import { Shield, Users, Lightbulb, Award, Clock, Heart } from "lucide-react";

export default function Values() {
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We maintain the highest standards of honesty and transparency in all our interactions.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We work closely with our clients as partners to achieve shared success.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace new technologies and creative solutions to solve complex challenges.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We are committed to delivering exceptional quality in every project we undertake.",
    },
    {
      icon: Clock,
      title: "Reliability",
      description:
        "We deliver on our promises and meet deadlines with consistent, dependable service.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "We love what we do and bring enthusiasm to every project and client relationship.",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Values</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The core principles that guide our work and define our commitment to
            excellence in everything we do.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="p-6 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
