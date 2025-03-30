"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Image from "next/image";
import ActionButton from "./components/ActionButton";

export default function Home() {
  const [time, setTime] = useState(30);
  const [ingredients, setIngredients] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState({
    vegan: false,
    vegetarian: false,
    keto: false,
    glutenFree: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const heroRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);

    // Parallax effect for hero decorations
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;

      const decorations = heroRef.current.querySelectorAll(".parallax-item");
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      decorations.forEach((item, index) => {
        const speed = 1 + index * 0.5;
        const xOffset = (x - 0.5) * speed * 40;
        const yOffset = (y - 0.5) * speed * 40;
        item.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleDietaryChange = (preference) => {
    setDietaryPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }));
  };

  const scrollToRecipes = (e) => {
    e.preventDefault();
    document.getElementById("find-recipes").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 hero-section">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Food background"
            className="w-full h-full object-cover"
            width={2070}
            height={1380}
            priority
          />
        </div>

        {/* Top Container with Text */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center hero-text-container mb-24">
          <div className="glass bg-black/40 dark:bg-black/50 py-8 px-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/10">
            <h1 className="hero-heading text-white">
              Hungry but <br className="hidden sm:block" />
              <span className="hero-gradient">short on time</span>?
            </h1>
            <p className="hero-paragraph text-white max-w-xl mx-auto">
              We&apos;ll find you the perfect recipe that matches your available
              time and ingredients!
            </p>
          </div>
        </div>

        {/* Bottom Container with Buttons - Separate from Text */}
        <div className="relative z-20 mx-auto px-6 text-center hero-buttons-container mt-8">
          <ActionButton href="#find-recipes" onClick={scrollToRecipes}>
            Find Recipes
          </ActionButton>
        </div>
      </section>

      {/* Recipe Finder Section */}
      <section id="find-recipes" className="py-20 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`modern-card overflow-visible ${
              isLoaded ? "animate-slide-up delay-300" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="gradient-text">Find Your Perfect Recipe</span>
            </h2>

            {/* Time Input */}
            <div className="mb-8">
              <label className="block text-lg font-medium mb-3">
                How much time do you have?
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                  className="w-full"
                />
                <div className="min-w-[4rem] text-center">
                  <span className="text-xl font-bold gradient-text">
                    {time}
                  </span>
                  <span className="ml-1">min</span>
                </div>
              </div>
            </div>

            {/* Ingredient Input */}
            <div className="mb-8">
              <label className="block text-lg font-medium mb-3">
                What ingredients do you have? (Optional)
              </label>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., chicken, rice, tomatoes..."
                className="w-full glass"
              />
            </div>

            {/* Dietary Preferences */}
            <div className="mb-8">
              <label className="block text-lg font-medium mb-3">
                Dietary Preferences (Optional)
              </label>
              <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
                {Object.entries(dietaryPreferences).map(
                  ([preference, checked]) => (
                    <label
                      key={preference}
                      className={`flex items-center p-3 cursor-pointer rounded-lg transition-all duration-300 w-[140px] ${
                        checked
                          ? "glass bg-primary/10 dark:bg-primary/20 shadow-lg"
                          : "bg-card hover:bg-primary/5 border border-border"
                      }`}
                      onClick={() => handleDietaryChange(preference)}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => {}}
                      />
                      <div
                        className={`mr-3 w-5 h-5 flex items-center justify-center rounded-md border ${
                          checked
                            ? "bg-primary border-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {checked && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="w-3 h-3 text-white"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="capitalize">
                        {preference.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <button className="btn btn-primary flex-1 animate-shimmer overflow-hidden">
                Find a Recipe!
              </button>
              <button className="btn btn-secondary flex-1 animate-shimmer overflow-hidden">
                🎲 Surprise Me!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">
            <span className="gradient-text">Why use CookTime?</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Time-Based Recipes",
                description:
                  "Find recipes that perfectly match your available cooking time.",
                icon: "⏱️",
              },
              {
                title: "Ingredient Matching",
                description: "Use what you already have in your kitchen.",
                icon: "🍳",
              },
              {
                title: "Dietary Preferences",
                description: "Customize recipes to fit your dietary needs.",
                icon: "🥗",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`modern-card p-6 text-center ${
                  isLoaded
                    ? `animate-slide-up delay-${(index + 3) * 100}`
                    : "opacity-0"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            © 2024 CookTime. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
