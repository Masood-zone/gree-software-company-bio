import { Clock, CheckCircle, Users, Award } from "lucide-react";

export default function ContactInfo() {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Free Consultation",
      description: "Get expert advice and project assessment at no cost",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "We respond to all inquiries within 24 hours",
    },
    {
      icon: Users,
      title: "Dedicated Team",
      description: "Work directly with experienced developers",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all projects",
    },
  ];

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on complexity, but most projects are completed within 4-12 weeks.",
    },
    {
      question: "Do you provide ongoing support?",
      answer:
        "Yes, we offer comprehensive support and maintenance packages for all our solutions.",
    },
    {
      question: "What technologies do you use?",
      answer:
        "We use modern technologies like React, Node.js, React Native, and cloud platforms.",
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in-right">
      {/* Benefits */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Why Choose Gree Software?</h3>
        <div className="space-y-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 bg-secondary rounded-xl">
              <h4 className="font-semibold mb-3">{faq.question}</h4>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/30 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Business Hours</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Monday - Friday</span>
            <span>9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span>10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span>Closed</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          * Emergency support available 24/7 for existing clients
        </p>
      </div>
    </div>
  );
}
