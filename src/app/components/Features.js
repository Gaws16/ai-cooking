"use client";

import Image from "next/image";
import styles from "./Features.module.css";
import { useState } from "react";

export default function Features({ isLoaded }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      title: "Time-Based Recipes",
      description:
        "Find recipes that perfectly match your available cooking time.",
      icon: "⏱️",
      image:
        "https://images.unsplash.com/photo-1564936281291-294551497d81?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Ingredient Matching",
      description: "Use what you already have in your kitchen.",
      icon: "🍳",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Dietary Preferences",
      description: "Customize recipes to fit your dietary needs.",
      icon: "🥗",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.gradientText}>Why use CookTime?</span>
        </h2>

        <div className={styles.cardsContainer}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={styles.cardWrapper}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`${styles.card} ${
                  hoveredCard === index ? styles.cardHovered : ""
                }`}
              >
                <div className={styles.imageContainer}>
                  <div className={styles.overlay}></div>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={600}
                    height={400}
                    className={`${styles.image} ${
                      hoveredCard === index ? styles.imageActive : ""
                    }`}
                  />
                </div>

                <div className={styles.content}>
                  <div className={styles.iconContainer}>
                    <span className={styles.icon}>{feature.icon}</span>
                  </div>

                  <div className={styles.textContainer}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.description}>{feature.description}</p>
                  </div>
                </div>

                <div className={styles.cardBorder}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
