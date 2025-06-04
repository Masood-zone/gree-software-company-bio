import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      title: "Canteen Management System",
      description:
        "A comprehensive platform for managing canteen operations, including menu management, order processing, and payment integration.",
      image: "/cms-logo.svg",
      category: "Web Application",
      badgeColor:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      link: "https://canteen-management-system-private-s.vercel.app",
    },
    {
      title: "Farzel - Ecommerce App",
      description:
        "A modern ecommerce platform enabling seamless online shopping, product management, and secure payments.",
      image: "/farzel.svg",
      category: "Ecommerce",
      badgeColor:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    },
    {
      title: "Great AFA Construction",
      description: "Business services platform with project management tools",
      image: "/greatafa-logo.jpg",
      category: "Business Platform",
      badgeColor:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      link: "https://greatafaconstruction.com",
    },
    {
      title: "Guest House System",
      description:
        "A digital solution for managing guest house bookings, check-ins, and customer records efficiently.",
      image: "/guest-house-app.svg",
      category: "Hospitality",
      badgeColor:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    {
      title: "Hostel System",
      description:
        "A robust platform for hostel administration, including room allocation, fee management, and resident tracking.",
      image: "/hostel-system.svg",
      category: "Accommodation",
      badgeColor:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    },
    {
      title: "Invoice Management System",
      description:
        "Automated invoicing and billing platform for businesses to streamline financial operations and reporting.",
      image: "/invoice-system.svg",
      category: "Finance",
      badgeColor:
        "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    },
    {
      title: "Hospital System",
      description:
        "Comprehensive hospital management software for patient records, appointments, and staff coordination.",
      image: "/hospital-system.svg",
      category: "Healthcare",
      badgeColor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
    {
      title: "University Exams App",
      description:
        "A secure and scalable application for managing university examinations, results, and student performance analytics.",
      image: "/university-app.svg",
      category: "Education",
      badgeColor:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    },
    {
      title: "Church Management System",
      description:
        "A platform to manage church membership, events, donations, and communications.",
      image: "/church-mgt.svg",
      category: "Nonprofit",
      badgeColor:
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
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

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-16">
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
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-4 right-4">
                  {project.link ? (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-10 h-10 bg-white/80 dark:bg-secondary/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ExternalLink
                          size={20}
                          className="text-black dark:text-white"
                        />
                      </div>
                    </Link>
                  ) : null}
                </div>
              </div>
              <div className="p-8">
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${project.badgeColor}`}
                >
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
