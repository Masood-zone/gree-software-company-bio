"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code, Smartphone, Monitor, Server } from "lucide-react";

export default function Hero() {
  const [currentService, setCurrentService] = useState(0);

  const services = [
    { icon: Code, text: "Web Development" },
    { icon: Smartphone, text: "Mobile Apps" },
    { icon: Monitor, text: "Desktop Software" },
    { icon: Server, text: "Web Hosting" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-8 animate-fade-in-left">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Transform Your
              <span className="block gradient-text">Business</span>
              <span className="block">with Code</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Professional software development services that drive growth,
              enhance efficiency, and deliver exceptional user experiences.
            </p>
          </div>

          {/* Rotating Services */}
          <div className="flex items-center space-x-4 p-4 bg-secondary rounded-lg">
            <div className="flex items-center space-x-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      index === currentService
                        ? "opacity-100 scale-110"
                        : "opacity-40 scale-90"
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                );
              })}
            </div>
            <span className="text-lg font-medium">
              {services[currentService].text}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors group"
            >
              Start Your Project
              <ArrowRight
                size={20}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 border border-border rounded-full font-medium hover:bg-secondary transition-colors"
            >
              View Our Services
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">2+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10+</div>
              <div className="text-sm text-muted-foreground">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">3+</div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
          </div>
        </div>

        {/* Logo Display */}
        <div className="flex justify-center animate-fade-in-right">
          <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">
            <Image
              src="/gree-logo-white.jpg"
              alt="Gree Software Company"
              fill
              className="object-contain dark:hidden animate-pulse"
              priority
            />
            <Image
              src="/gree-logo-black.jpg"
              alt="Gree Software Company"
              fill
              className="object-contain hidden dark:block animate-pulse"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
