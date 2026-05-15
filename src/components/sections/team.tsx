import Image from "next/image";
import Link from "next/link";
import { Facebook, Github, Linkedin, Phone } from "lucide-react";

export default function Team() {
  const teamMembers = [
    {
      name: "Dickson Osei Yeboah",
      role: "Founder & CEO",
      image: "/yeboah.jpg",
      bio: "Visionary leader with expertise in software architecture and business strategy. Passionate about creating innovative solutions that drive business growth.",
      social: {
        linkedin: "https://www.linkedin.com/in/dickson-osei-yeboah-56884728b/",
        github: "https://github.com/MrYEBOAH",
        tel: "tel:+233546393271",
      },
    },
    {
      name: "Masood Acheampong",
      role: "Co-Founder & Managing Director",
      image: "/masood.jpg",
      bio: "Technical expert with deep knowledge in full-stack development and project management. Committed to delivering high-quality software solutions.",
      social: {
        linkedin: "https://www.linkedin.com/in/masood-acheampong-3793b4239",
        github: "https://github.com/masood-zone",
        facebook: "https://www.facebook.com/profile.php?id=100080657544884",
        tel: "tel:+233530929975",
      },
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The passionate individuals behind Gree Software Company, dedicated
            to bringing your vision to life through innovative technology
            solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group rounded-[2rem] bg-card dark:bg-secondary p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-border/60 dark:border-border/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_28px_70px_rgba(0,0,0,0.35)] animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 px-2 pt-1 text-left">
                <h3 className="text-[1.35rem] sm:text-[1.5rem] font-semibold tracking-tight text-card-foreground dark:text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1 text-base sm:text-lg text-muted-foreground dark:text-foreground/70">
                  {member.role}
                </p>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-muted dark:bg-background/20 ring-1 ring-black/5 dark:ring-white/10">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex justify-center gap-4 pt-4 pb-1 opacity-0 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                {member.social.tel && (
                  <Link
                    href={member.social.tel}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-secondary/80 dark:bg-background/15 text-foreground/90 dark:text-foreground/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label="Phone"
                  >
                    <Phone size={18} />
                  </Link>
                )}
                {member.social.linkedin && (
                  <Link
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-secondary/80 dark:bg-background/15 text-foreground/90 dark:text-foreground/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </Link>
                )}
                {member.social.github && (
                  <Link
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-secondary/80 dark:bg-background/15 text-foreground/90 dark:text-foreground/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </Link>
                )}
                {member.social.facebook && (
                  <Link
                    href={member.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-secondary/80 dark:bg-background/15 text-foreground/90 dark:text-foreground/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
