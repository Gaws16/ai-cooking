"use client";

import TimeSlider from "./TimeSlider";
import IngredientInput from "./IngredientInput";
import DietaryPreferences from "./DietaryPreferences";
import RecipeActionButtons from "./RecipeActionButtons";

export default function RecipeFinder({
  isLoaded,
  time,
  setTime,
  ingredients,
  setIngredients,
  dietaryPreferences,
  handleDietaryChange,
  setRecipe,
  setIsLoading,
  setError,
}) {
  return (
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

          <div className="p-6 md:p-8">
            {/* Dietary Preferences */}
            <DietaryPreferences
              dietaryPreferences={dietaryPreferences}
              handleDietaryChange={handleDietaryChange}
            />

            {/* Time Input */}
            <TimeSlider time={time} setTime={setTime} />

            {/* Ingredient Input */}
            <IngredientInput
              ingredients={ingredients}
              setIngredients={setIngredients}
            />

            {/* Action Buttons */}
            <RecipeActionButtons
              time={time}
              ingredients={ingredients}
              dietaryPreferences={dietaryPreferences}
              setRecipe={setRecipe}
              setIsLoading={setIsLoading}
              setError={setError}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
