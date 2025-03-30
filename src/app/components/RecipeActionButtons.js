"use client";

import { useState } from "react";
import styles from "./RecipeActionButtons.module.css";

export default function RecipeActionButtons({
  time,
  ingredients,
  dietaryPreferences,
  setRecipe,
  setIsLoading,
  setError,
}) {
  const handleFindRecipe = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setRecipe(null);

      const { generateRecipe } = await import("../utils/gemini");
      const recipe = await generateRecipe({
        time,
        ingredients,
        dietaryPreferences,
        surprise: false,
      });

      setRecipe(recipe);
    } catch (error) {
      setError(error.message);
      console.error("Error finding recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSurpriseMe = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setRecipe(null);

      const { generateRecipe } = await import("../utils/gemini");
      const recipe = await generateRecipe({
        surprise: true,
      });

      setRecipe(recipe);
    } catch (error) {
      setError(error.message);
      console.error("Error generating surprise recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.recipeButton} onClick={handleFindRecipe}>
        <span className={styles.buttonIcon}>🍳</span>
        <span className={styles.buttonText}>Find a Recipe!</span>
      </button>
      <button className={styles.surpriseButton} onClick={handleSurpriseMe}>
        <span className={styles.buttonIcon}>🎲</span>
        <span className={styles.buttonText}>Surprise Me!</span>
      </button>
    </div>
  );
}
