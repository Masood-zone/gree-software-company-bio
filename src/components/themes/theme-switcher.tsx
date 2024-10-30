"use client";
import { useState, useEffect } from "react";
import { HiMoon, HiSun } from "react-icons/hi";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Get the stored theme preference
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 bg-bg dark:bg-primary rounded-full transition duration-300 hover:scale-105 focus:outline-none"
      aria-label="Toggle Dark Mode"
    >
      <div className="absolute transition-opacity duration-300 ease-in-out">
        {theme === "light" ? (
          <HiSun className="w-6 h-6 text-yellow-500 opacity-100" />
        ) : (
          <HiMoon className="w-6 h-6 text-yellow-300 opacity-100" />
        )}
      </div>
    </button>
  );
};

export default ThemeSwitcher;
