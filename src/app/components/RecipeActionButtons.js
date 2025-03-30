"use client";

import styles from "./RecipeActionButtons.module.css";

export default function RecipeActionButtons() {
  return (
    <div className={styles.container}>
      <button className={styles.recipeButton}>
        <span className={styles.buttonIcon}>🍳</span>
        <span className={styles.buttonText}>Find a Recipe!</span>
      </button>
      <button className={styles.surpriseButton}>
        <span className={styles.buttonIcon}>🎲</span>
        <span className={styles.buttonText}>Surprise Me!</span>
      </button>
    </div>
  );
}
