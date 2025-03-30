"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(isDarkMode);
    }

    // Listen for scroll events
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update document class when theme changes
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 backdrop-blur-lg" : "py-5"
      } ${isScrolled ? "glass" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`text-4xl md:text-5xl animate-float delay-100 ${
                isDark ? "text-purple-400" : "text-purple-600"
              } drop-shadow-lg`}
            >
              🍽️
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold animate-slide-down">
              <span className="gradient-text text-shadow">CookTime</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {["Home", "Recipes", "About", "Contact"].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`animate-slide-down delay-${
                  (index + 1) * 100
                } text-sm font-medium relative 
                  text-white drop-shadow-md
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r 
                  after:from-primary after:to-secondary after:transition-all after:duration-300 hover:after:w-full`}
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            className="animate-slide-down delay-300 p-3 rounded-full glass hover:scale-110 transition-all duration-300 shadow-lg"
            aria-label="Toggle dark mode"
          >
            <span
              className={`transition-transform duration-500 ${
                isDark ? "rotate-180" : "rotate-0"
              } block text-xl`}
            >
              {isDark ? "☀️" : "🌙"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
