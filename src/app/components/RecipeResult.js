"use client";

import { useState, useEffect } from "react";
import styles from "./RecipeResult.module.css";

export default function RecipeResult({ recipe, isLoading, error }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check if document is available (client-side)
    if (typeof document !== "undefined") {
      // Initial check for dark mode
      setIsDarkMode(!document.documentElement.classList.contains("light"));

      // Create an observer to watch for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            setIsDarkMode(
              !document.documentElement.classList.contains("light")
            );
          }
        });
      });

      observer.observe(document.documentElement, { attributes: true });

      // Cleanup
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (recipe || isLoading) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [recipe, isLoading]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.container} ${
        isDarkMode ? styles.darkOverlay : styles.lightOverlay
      }`}
    >
      <div className={styles.recipeCard}>
        {isLoading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Crafting your perfect recipe...</p>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <h3>Something went wrong</h3>
            <p>{error}</p>
          </div>
        ) : recipe ? (
          <>
            <div className={styles.header}>
              <h2 className={styles.title}>{recipe.title}</h2>
              <div className={styles.details}>
                <span className={styles.time}>
                  ⏱️ {recipe.cookingTime} minutes
                </span>
                {recipe.dietaryInfo && (
                  <span className={styles.dietary}>{recipe.dietaryInfo}</span>
                )}
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Ingredients</h3>
              <ul className={styles.ingredientsList}>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className={styles.ingredient}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Instructions</h3>
              <ol className={styles.instructionsList}>
                {recipe.instructions.map((step, index) => (
                  <li key={index} className={styles.instruction}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {recipe.tips && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Tips</h3>
                <p className={styles.tips}>{recipe.tips}</p>
              </div>
            )}

            <button
              className={styles.closeButton}
              onClick={() => setIsVisible(false)}
              aria-label="Close recipe"
            >
              ×
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
