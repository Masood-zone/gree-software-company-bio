"use client";
import React, { useState, useEffect } from "react";
import GreeLogo from "@/assets/images/favicon-32x32.png";
import Image from "next/image";
import Link from "next/link";
import Button from "../button/button";
import ThemeSwitcher from "../themes/theme-switcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed z-20 w-full dark:bg-dark-bg backdrop-blur navbar transition-shadow  ${
        hasShadow
          ? "dark:bg-dark-bg backdrop-blur navbar shadow-2xl shadow-gray-600/5 border-b border-gray-100 dark:border-gray-800 dark:shadow-none"
          : ""
      }`}
    >
      <div className="xl:container m-auto px-6 md:px-12 lg:px-6">
        <div className="flex flex-wrap items-center justify-between gap-6 md:py-3 md:gap-0 lg:py-5">
          <Link href="/" className="max-lg:w-full">
            <div className="w-full items-center flex justify-between lg:w-auto">
              <span
                className="relative z-10 max-lg:flex max-lg:items-center"
                aria-label="logo"
              >
                <Image
                  src={GreeLogo}
                  alt="Gree Software Company Logo"
                  className="w-8 h-8"
                />
                <span className="block lg:hidden">
                  <strong className="text-xl font-bold text-text dark:text-text-light">
                    Gree
                  </strong>{" "}
                  Sofware Company
                </span>
              </span>
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
                  className={`m-auto h-0.5 w-5 rounded bg-text dark:bg-text-light transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></div>
                <div
                  className={`m-auto mt-2 h-0.5 w-5 rounded bg-text dark:bg-text-light transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></div>
              </button>
            </div>
          </Link>
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } navmenu w-full flex-wrap lg:justify-end items-center mb-16 space-y-8 p-6 border-gray-100 rounded-3xl shadow-2xl shadow-gray-300/20 bg-white dark:bg-gray-700 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none dark:shadow-none dark:border-gray-700 lg:border-0`}
          >
            {/* Links */}
            <div className="text-gray-600 dark:text-text-light lg:pr-4">
              <ul className="space-y-6 tracking-wide font-medium text-base lg:text-lg lg:flex lg:space-y-0">
                <li>
                  <Link
                    href="/"
                    className="block md:px-4 transition hover:text-primary dark:hover:text-dark-primary"
                  >
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block md:px-4 transition hover:text-primary dark:hover:text-dark-primary"
                  >
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="block md:px-4 transition hover:text-primary dark:hover:text-dark-primary"
                  >
                    <span>Pricing</span>
                  </Link>
                </li>
              </ul>
            </div>
            {/* External */}
            <div className="w-full border-primary/10 pl-2 gap-5 dark:border-gray-700 flex flex-col -ml-1 sm:flex-row lg:space-y-0 md:w-max lg:border-l">
              <Button href="/contact-us" variant="outline" size="medium">
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
