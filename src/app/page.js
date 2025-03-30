"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RecipeFinder from "./components/RecipeFinder";
import Features from "./components/Features";
import Footer from "./components/Footer";

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

      <Hero scrollToRecipes={scrollToRecipes} />

      <RecipeFinder
        isLoaded={isLoaded}
        time={time}
        setTime={setTime}
        ingredients={ingredients}
        setIngredients={setIngredients}
        dietaryPreferences={dietaryPreferences}
        handleDietaryChange={handleDietaryChange}
      />

      <Features isLoaded={isLoaded} />

      <Footer />
    </div>
  );
}
