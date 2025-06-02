import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactHero() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      value: "greesoftwarecompany@gmail.com",
      href: "mailto:greesoftwarecompany@gmail.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team during business hours",
      value: "+233 530 929 975",
      href: "tel:+233530929975",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come visit our office in Kumasi, Ghana",
      value: "AAMUSTED, Tanoso, Kumasi",
      href: "https://maps.app.goo.gl/V9bAmbosihqzwxhD7",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with custom software solutions?
            We&apos;d love to hear about your project and discuss how we can
            help you achieve your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                className="group p-8 bg-background rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{method.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {method.description}
                  </p>
                  <p className="font-medium text-primary group-hover:text-primary/80 transition-colors">
                    {method.value}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
