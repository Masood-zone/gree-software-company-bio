import { Target, Eye, Heart } from "lucide-react";

export default function Vision() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower businesses with innovative software solutions that drive growth, enhance efficiency, and create exceptional user experiences.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be the leading software development company in Ghana and beyond, recognized for our commitment to excellence and innovation.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "We believe in transparency, quality, and building long-term partnerships with our clients through exceptional service and support.",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Purpose</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Driven by passion and guided by purpose, we&apos;re committed to
            delivering software solutions that make a real difference.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="text-center p-8 bg-secondary rounded-2xl animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
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
