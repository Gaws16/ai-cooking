"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./DietaryPreferences.module.css";

export default function DietaryPreferences({
  dietaryPreferences,
  handleDietaryChange,
}) {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Image URLs and descriptions for each preference
  const dietaryInfo = {
    vegan: {
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop",
      title: "Vegan",
      description: "Plant-based foods with no animal products",
    },
    vegetarian: {
      image:
        "https://images.unsplash.com/photo-1540914124281-342587941389?q=80&w=500&auto=format&fit=crop",
      title: "Vegetarian",
      description: "No meat, but may include dairy and eggs",
    },
    keto: {
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=500&auto=format&fit=crop",
      title: "Keto",
      description: "Low carb, high fat for ketosis",
    },
    glutenFree: {
      image:
        "https://images.unsplash.com/photo-1546548970-71785318a17b?q=80&w=500&auto=format&fit=crop",
      title: "Gluten Free",
      description: "No wheat, barley or rye products",
    },
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dietary Preferences</h2>
      <div className={styles.grid}>
        {Object.entries(dietaryPreferences).map(([preference, checked]) => (
          <div
            key={preference}
            className={styles.perspective}
            onMouseEnter={() => setHoveredCard(preference)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className={`${styles.card} 
                ${checked ? styles.cardChecked : ""} 
                ${hoveredCard === preference ? styles.cardHovered : ""}`}
              onClick={() => handleDietaryChange(preference)}
            >
              {/* Card Background with Image */}
              <div className={styles.imageContainer}>
                <div
                  className={`${styles.overlay} 
                    ${checked ? styles.overlayChecked : ""}`}
                ></div>
                <Image
                  src={dietaryInfo[preference].image}
                  alt={dietaryInfo[preference].title}
                  width={500}
                  height={500}
                  className={`${styles.image} 
                    ${
                      hoveredCard === preference || checked
                        ? styles.imageActive
                        : ""
                    }`}
                />
              </div>

              {/* Card Content */}
              <div className={styles.content}>
                {/* Top Section */}
                <div className={styles.topSection}>
                  <div
                    className={`${styles.checkbox} 
                      ${checked ? styles.checkboxChecked : ""} 
                      ${
                        hoveredCard === preference ? styles.checkboxHovered : ""
                      }`}
                  >
                    {checked && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className={styles.checkIcon}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Bottom Section */}
                <div
                  className={`${styles.bottomSection} 
                    ${
                      !(hoveredCard === preference || checked)
                        ? styles.bottomSectionInactive
                        : ""
                    }`}
                >
                  <h3 className={styles.title}>
                    {dietaryInfo[preference].title}
                  </h3>
                  <p
                    className={`${styles.description} 
                      ${
                        !(hoveredCard === preference || checked)
                          ? styles.descriptionInactive
                          : ""
                      }`}
                  >
                    {dietaryInfo[preference].description}
                  </p>
                </div>
              </div>

              {/* Animated Border */}
              <div
                className={`${styles.cardBorder} 
                  ${checked ? styles.cardBorderChecked : ""} 
                  ${
                    hoveredCard === preference && !checked
                      ? styles.cardBorderHovered
                      : ""
                  }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
