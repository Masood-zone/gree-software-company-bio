"use client";

import React, { useState, useEffect } from "react";
import GreeLogo from "@/assets/images/favicon-32x32.png";
import Image from "next/image";
import Link from "next/link";
import Button from "../button/button";
import ThemeSwitcher from "../themes/theme-switcher";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const location = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add shadow and change link color on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
        setIsScrolled(true);
      } else {
        setHasShadow(false);
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "About", link: "/about" },
    { id: 3, title: "Pricing", link: "/pricing" },
  ];

  return (
    <nav
      className={`fixed z-20 w-full dark:bg-dark-bg backdrop-blur navbar transition-shadow ${
        hasShadow
          ? "dark:bg-dark-bg backdrop-blur navbar shadow-2xl shadow-gray-600/5 border-b border-gray-100 dark:border-gray-800 dark:shadow-none"
          : ""
      }`}
    >
      <div className="xl:container m-auto px-6 md:px-12 lg:px-6">
        <div className="flex flex-wrap items-center justify-between gap-6 md:py-3 md:gap-0 lg:py-5">
          <div className="w-full items-center flex justify-between lg:w-auto lg:dark:bg-black dark:rounded-full dark:p-1">
            <Link href="/" className="max-lg:w-full">
              <span
                className="relative z-10 max-lg:flex max-lg:items-center"
                aria-label="logo"
              >
                <Image
                  src={GreeLogo}
                  alt="Gree Software Company Logo"
                  className="w-8 h-8"
                />
                <span className="block lg:hidden text-black">
                  <strong className="text-xl font-bold">Gree</strong> Sofware
                  Company
                </span>
              </span>
            </Link>
            <span className="hidden lg:block">
              <strong className="text-xl font-bold text-text dark:text-text-light">
                Gree
              </strong>{" "}
              Sofware Company
            </span>

            <button
              onClick={toggleMenu}
              className="lg:hidden p-6 -mr-6 relative z-20"
              aria-label="Toggle menu"
            >
              <div
                className={`m-auto h-0.5 w-5 rounded bg-text dark:bg-black transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></div>
              <div
                className={`m-auto mt-2 h-0.5 w-5 rounded bg-text dark:bg-black transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></div>
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } navmenu w-full flex-wrap lg:justify-end items-center mb-16 space-y-8 p-6 border-gray-100 rounded-3xl shadow-2xl shadow-gray-300/20 bg-white dark:bg-black lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none dark:shadow-none dark:border-gray-700 lg:border-0`}
          >
            {/* Links */}
            <div
              className={`text-gray-600 dark:text-gray-300 lg:pr-4 ${
                isScrolled ? "lg:text-black lg:dark:text-white" : ""
              }`}
            >
              <ul className="space-y-6 tracking-wide font-medium text-base lg:text-lg lg:flex lg:space-y-0">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.link}
                      className={`block md:px-4 transition hover:text-primary dark:hover:text-dark-primary
                        ${
                          location === link.link
                            ? "text-primary"
                            : isScrolled
                            ? "lg:text-black lg:dark:text-white"
                            : ""
                        }
                      `}
                    >
                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* External */}
            <div className="w-full border-primary/10 pl-2 gap-5 dark:border-gray-700 -ml-1 md:flex lg:space-y-0 md:w-max lg:border-l place-items-center space-y-4">
              <Button
                href="/contact-us"
                variant="outline"
                size="medium"
                className={`text-gray-600 dark:text-gray-300 ${
                  isScrolled ? "lg:text-black lg:dark:text-white" : ""
                }`}
              >
                Contact Us
              </Button>
              {/* Theme switcher */}
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
