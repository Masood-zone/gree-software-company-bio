import Link from "next/link";
import Image from "next/image";
import { Github, Youtube, Send, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/gree-logo-white.jpg"
                  alt="Gree Software Company"
                  fill
                  className="object-contain dark:hidden"
                />
                <Image
                  src="/gree-logo-black.jpg"
                  alt="Gree Software Company"
                  fill
                  className="object-contain hidden dark:block"
                />
              </div>
              <span className="text-lg font-bold">Gree Software</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional software development company delivering innovative
              web solutions, mobile applications, and hosting services to
              transform your business.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/Gree-Software-Company"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://www.youtube.com/@greesoftwareacademy"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </Link>
              <Link
                href="https://t.me/greesoftwareacademy"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Telegram"
              >
                <Send size={20} />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Desktop Applications
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Web Hosting
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Process
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-muted-foreground" />
                <Link
                  href="mailto:greesoftwarecompany@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  greesoftwarecompany@gmail.com
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-muted-foreground" />
                <Link
                  href="tel:+233546393271"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +233 54 639 3271
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-muted-foreground" />
                <Link
                  href="tel:+233530929975"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +233
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-muted-foreground" />
                <Link
                  href="tel:+233544853278"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +233 54 485 3278
                </Link>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">
                  Abuakwa Housing, Tanoso
                  <br />
                  Kumasi, Ghana
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Gree Software Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
