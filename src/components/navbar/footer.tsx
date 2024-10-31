import React from "react";
import { FaGithub, FaTelegram, FaYoutube } from "react-icons/fa";
import GreeLogo from "@/assets/images/gree-logo-no-bg.png";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://github.com/Gree-Software-Company",
      icon: <FaGithub size={20} />,
      label: "github",
    },
    {
      href: "https://www.youtube.com/@greesoftwareacademy",
      icon: <FaYoutube size={20} />,
      label: "youtube",
    },
    {
      href: "https://t.me/greesoftwareacademy",
      icon: <FaTelegram size={20} />,
      label: "telegram",
    },
  ];

  const navLinks = [
    {
      title: "Company",
      links: [
        { href: "/about", text: "About" },
        { href: "/contact-us", text: "Brainstorming" },
        { href: "/contact-us", text: "Enterprise applications" },
        { href: "#clients", text: "Clients" },
      ],
    },
    {
      title: "Products",
      links: [{ href: "/pricing", text: "Pricing" }],
    },
    {
      title: "Resources",
      links: [
        { href: "/about", text: "About" },
        { href: "#faq", text: "FAQs" },
        { href: "/contact-us", text: "Help Center" },
      ],
    },
  ];

  return (
    <footer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="-mb-0.5 w-full"
        viewBox="0 0 1367.743 181.155"
      >
        <path
          className="fill-current text-gray-100 dark:text-gray-800"
          d="M0,0S166.91-56.211,405.877-49.5,715.838,14.48,955.869,26.854,1366,0,1366,0V115H0Z"
          transform="translate(1.743 66.155)"
        />
      </svg>

      <div className="bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent pt-1">
        <div className="container m-auto space-y-8 px-6 text-gray-600 dark:text-gray-400 md:px-12 lg:px-20">
          <div className="grid grid-cols-8 gap-6 md:gap-0">
            <div className="col-span-8 border-r border-gray-100 dark:border-gray-800 md:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between gap-6 border-b border-white dark:border-gray-800 py-6 md:block md:space-y-6 md:border-none md:py-0">
                <div className="flex flex-col items-start">
                  <Image
                    src={GreeLogo}
                    alt="Gree Software Company Logo"
                    width={100}
                    height={42}
                    className="w-32 dark:brightness-200 dark:grayscale"
                  />
                  <span>
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Gree Software Company
                    </span>
                    <br />
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      Our web development services deliver custom, impactful
                      websites to elevate your brand, streamline operations, and
                      boost engagement.
                    </span>
                  </span>
                </div>
                <div className="flex gap-6">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      target="_blank"
                      aria-label={link.label}
                      className="hover:text-text-dark"
                    >
                      {link.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-8 md:col-span-6 lg:col-span-5">
              <div className="grid grid-cols-2 gap-6 pb-16 sm:grid-cols-3 md:pl-16">
                {navLinks.map((section, index) => (
                  <div key={index}>
                    <h6 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {section.title}
                    </h6>
                    <ul className="mt-4 list-inside space-y-4">
                      {section.links.map((link, idx) => (
                        <li key={idx}>
                          <Link
                            className="transition hover:text-text-dark"
                            href={link.href}
                          >
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex justify-between border-t border-gray-100 dark:border-gray-800 py-4 pb-8 md:pl-16">
                <span>&copy; Gree Software Company {currentYear}</span>
                <span>All rights reserved.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
