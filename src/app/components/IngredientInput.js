"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./IngredientInput.module.css";

export default function IngredientInput({ ingredients, setIngredients }) {
  const [input, setInput] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const inputRef = useRef(null);

  // Common ingredients suggestions with real photos
  const suggestions = [
    {
      text: "Chicken",
      image:
        "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=300&q=80&fit=crop",
    },
    {
      text: "Beef",
      image:
        "https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
    },
    {
      text: "Rice",
      image:
        "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&q=80&fit=crop",
    },
    {
      text: "Potatoes",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&q=80&fit=crop",
    },
    {
      text: "Tomatoes",
      image:
        "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=400&h=300&q=80&fit=crop",
    },
    {
      text: "Onions",
      image:
        "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400&h=300&q=80&fit=crop",
    },
    {
      text: "Garlic",
      image:
        "https://images.pexels.com/photos/4197447/pexels-photo-4197447.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
    },
    {
      text: "Pasta",
      image:
        "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400&h=300&q=80&fit=crop",
    },
    {
      text: "Eggs",
      image:
        "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=300&q=80&fit=crop",
    },
    {
      text: "Cheese",
      image:
        "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&q=80&fit=crop",
    },
    {
      text: "Spinach",
      image:
        "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400&h=300&q=80&fit=crop",
    },
    {
      text: "Mushrooms",
      image:
        "https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
    },
  ];

  // Parse ingredients string into array on initial load
  useEffect(() => {
    if (ingredients && !selectedIngredients.length) {
      setSelectedIngredients(
        ingredients
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      );
    }
  }, []);

  // Update parent component's ingredients string when selections change
  useEffect(() => {
    setIngredients(selectedIngredients.join(", "));
  }, [selectedIngredients, setIngredients]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      addIngredient(input.trim());
      setInput("");
    }
  };

  const addIngredient = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const removeIngredient = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item !== ingredient)
    );
  };

  const clearAllIngredients = () => {
    setSelectedIngredients([]);
  };

  const handleAddClick = () => {
    if (input.trim()) {
      addIngredient(input.trim());
      setInput("");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    addIngredient(suggestion.text);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>What ingredients do you have?</h2>
        {selectedIngredients.length > 0 && (
          <button
            className={styles.clearAllButton}
            onClick={clearAllIngredients}
            aria-label="Clear all ingredients"
          >
            Clear All
          </button>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type an ingredient and press Enter..."
          className={styles.inputField}
        />
        <button
          className={styles.addButton}
          onClick={handleAddClick}
          aria-label="Add ingredient"
        >
          ➕
        </button>
      </div>

      {/* Suggestions */}
      <div className={styles.suggestionsContainer}>
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.text}
            className={styles.suggestionChip}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <div className={styles.chipImageContainer}>
              <div className={styles.chipImageOverlay}></div>
              <Image
                src={suggestion.image}
                alt={suggestion.text}
                className={styles.chipImage}
                width={400}
                height={300}
              />
            </div>
            <div className={styles.chipContent}>
              <span className={styles.chipText}>{suggestion.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Ingredients */}
      {selectedIngredients.length > 0 && (
        <div className={styles.selectedIngredientsContainer}>
          <h3 className={styles.selectedIngredientsTitle}>
            Selected Ingredients
          </h3>
          <div className={styles.ingredientTags}>
            {selectedIngredients.map((ingredient) => (
              <div key={ingredient} className={styles.selectedIngredient}>
                <span className={styles.chipText}>{ingredient}</span>
                <button
                  className={styles.removeButton}
                  onClick={() => removeIngredient(ingredient)}
                  aria-label={`Remove ${ingredient}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
