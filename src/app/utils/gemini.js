/**
 * Utility functions for working with the Gemini API to generate recipes
 */

/**
 * Generate a recipe based on user preferences
 * @param {Object} params - The parameters for recipe generation
 * @param {number} params.time - The maximum cooking time in minutes
 * @param {string} params.ingredients - Comma-separated list of available ingredients
 * @param {Object} params.dietaryPreferences - Object containing dietary restrictions (vegan, vegetarian, etc.)
 * @param {boolean} params.surprise - Whether to generate a surprise recipe
 * @returns {Promise<Object>} - The generated recipe
 */
export async function generateRecipe({
  time,
  ingredients,
  dietaryPreferences,
  surprise = false,
}) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "Gemini API key is not defined. Please add NEXT_PUBLIC_GEMINI_API_KEY to your environment variables."
      );
    }

    // Build the prompt for Gemini
    let prompt =
      "Generate a detailed recipe in JSON format with the following structure:";
    prompt += `{
      "title": "Recipe Title",
      "cookingTime": cooking time in minutes,
      "ingredients": ["ingredient 1", "ingredient 2", ...],
      "instructions": ["step 1", "step 2", ...],
      "dietaryInfo": "Dietary information (if applicable)",
      "tips": "Optional cooking tips"
    }`;

    if (!surprise) {
      // If not a surprise recipe, add user constraints
      prompt += `\n\nThe recipe should take ${time} minutes or less to prepare and cook.`;

      if (ingredients && ingredients.trim()) {
        prompt += `\n\nUse some or all of these ingredients: ${ingredients}.`;
      }

      // Add dietary restrictions
      const restrictions = [];
      if (dietaryPreferences.vegan)
        restrictions.push("vegan (no animal products)");
      if (dietaryPreferences.vegetarian)
        restrictions.push("vegetarian (no meat)");
      if (dietaryPreferences.glutenFree)
        restrictions.push("gluten-free (no wheat, barley, or rye)");
      if (dietaryPreferences.keto)
        restrictions.push("keto (low carb, high fat)");

      if (restrictions.length > 0) {
        prompt += `\n\nThe recipe must be ${restrictions.join(" and ")}.`;
      }
    } else {
      // For surprise recipes
      prompt +=
        "\n\nCreate a creative, surprising recipe that would be fun to make.";
    }

    // Log the prompt for debugging
    console.log("Recipe generation prompt:", prompt);

    // Create a mock recipe if API key is having quota issues
    if (
      apiKey.includes("quota-exceeded") ||
      apiKey === "your_gemini_api_key_here"
    ) {
      console.log("Using mock recipe due to API quota limitations");
      return getMockRecipe(time, ingredients, dietaryPreferences, surprise);
    }

    // Make the API call to Gemini
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-001:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "You are a helpful cooking assistant that generates creative recipes based on user requirements.",
                },
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: surprise ? 0.9 : 0.7, // Higher temperature for more creativity in surprise recipes
            topP: 0.8,
            topK: 40,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);

      if (
        errorData.error?.status === "RESOURCE_EXHAUSTED" ||
        errorData.error?.message?.includes("quota")
      ) {
        throw new Error(
          "Gemini API quota exceeded. Please check your API key usage limits or update your API key."
        );
      }

      throw new Error(errorData.error?.message || "Failed to generate recipe");
    }

    const data = await response.json();

    // Gemini response structure is different from OpenAI
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response from Gemini API");
    }

    const recipeText = data.candidates[0].content.parts[0].text;

    // Extract the JSON from the response
    const recipeMatch = recipeText.match(/({[\s\S]*})/);
    if (!recipeMatch) {
      throw new Error("Failed to parse recipe from Gemini response");
    }

    // Parse the JSON recipe
    try {
      const recipeJSON = JSON.parse(recipeMatch[0]);
      return recipeJSON;
    } catch (parseError) {
      console.error("Error parsing recipe JSON:", parseError);
      throw new Error("Failed to parse recipe data");
    }
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
}

/**
 * Get a mock recipe when API is unavailable
 */
function getMockRecipe(time, ingredients, dietaryPreferences, surprise) {
  // Generate a mock recipe based on parameters
  let title, cookingTime, mockIngredients, instructions, dietaryInfo, tips;

  if (surprise) {
    title = "Surprise Rainbow Pancake Tower";
    cookingTime = 30;
    mockIngredients = [
      "2 cups all-purpose flour",
      "2 tablespoons sugar",
      "1 tablespoon baking powder",
      "1/2 teaspoon salt",
      "2 eggs",
      "1 1/2 cups milk",
      "2 tablespoons vegetable oil",
      "Food coloring (red, orange, yellow, green, blue, purple)",
      "Whipped cream",
      "Fresh berries",
      "Maple syrup",
    ];
    instructions = [
      "In a large bowl, mix flour, sugar, baking powder, and salt.",
      "In another bowl, beat eggs, milk, and oil together.",
      "Pour the wet ingredients into the dry ingredients and stir until just combined.",
      "Divide the batter into 6 small bowls.",
      "Add different food coloring to each bowl to create rainbow colors.",
      "Heat a non-stick pan over medium heat.",
      "Pour a small amount of each colored batter to make 6 different colored pancakes.",
      "Cook until bubbles form on top, then flip and cook until golden.",
      "Stack the pancakes in rainbow order on each plate.",
      "Top with whipped cream, fresh berries, and maple syrup.",
    ];
    dietaryInfo = "Vegetarian";
    tips =
      "For a fun presentation, serve with a small cloud of cotton candy on top to complete the rainbow theme!";
  } else {
    const availableIngredients = ingredients
      ? ingredients.split(",").map((i) => i.trim())
      : [];
    const isVegan = dietaryPreferences.vegan;
    const isVegetarian = dietaryPreferences.vegetarian || isVegan;
    const isGlutenFree = dietaryPreferences.glutenFree;
    const isKeto = dietaryPreferences.keto;

    if (isKeto) {
      title = "Quick Keto Avocado Chicken Salad";
      cookingTime = Math.min(time, 25);
      mockIngredients = [
        "2 cooked chicken breasts, shredded",
        "2 ripe avocados, diced",
        "1/4 cup mayonnaise",
        "1 tablespoon Dijon mustard",
        "1 stalk celery, finely diced",
        "2 tablespoons red onion, minced",
        "1 tablespoon fresh lemon juice",
        "Salt and pepper to taste",
        "Lettuce leaves for serving",
      ];
      instructions = [
        "In a large bowl, combine the shredded chicken and diced avocados.",
        "In a small bowl, mix together mayonnaise, Dijon mustard, and lemon juice.",
        "Add the mayo mixture to the chicken and avocados.",
        "Fold in the diced celery and minced red onion.",
        "Season with salt and pepper to taste.",
        "Serve on lettuce leaves for a low-carb option.",
      ];
      dietaryInfo = "Keto, Low-carb, Gluten-free";
      tips =
        "For meal prep, keep the avocado separate until ready to serve to prevent browning.";
    } else if (isVegan) {
      title = "Vegan Chickpea Buddha Bowl";
      cookingTime = Math.min(time, 20);
      mockIngredients = [
        "1 can chickpeas, drained and rinsed",
        "1 sweet potato, cubed",
        "1 cup quinoa, cooked",
        "2 cups mixed greens",
        "1 avocado, sliced",
        "1/4 cup tahini",
        "1 tablespoon lemon juice",
        "1 tablespoon maple syrup",
        "Salt and pepper to taste",
      ];
      instructions = [
        "Preheat oven to 400°F (200°C).",
        "Toss sweet potato cubes with olive oil, salt, and pepper. Roast for 20 minutes.",
        "In a small bowl, mix tahini, lemon juice, maple syrup, and 2-3 tablespoons of water to make the dressing.",
        "Arrange cooked quinoa, roasted sweet potatoes, chickpeas, mixed greens, and avocado in a bowl.",
        "Drizzle with tahini dressing and serve.",
      ];
      dietaryInfo = "Vegan, Gluten-free";
      tips =
        "Add a sprinkle of nutritional yeast for a cheesy flavor without dairy!";
    } else if (isVegetarian) {
      title = "Mediterranean Vegetarian Pasta";
      cookingTime = Math.min(time, 30);
      mockIngredients = [
        "8 oz pasta (regular or gluten-free)",
        "1 cup cherry tomatoes, halved",
        "1/2 cup Kalamata olives, pitted",
        "1/2 cup feta cheese, crumbled",
        "1/4 cup red onion, thinly sliced",
        "2 tablespoons olive oil",
        "1 tablespoon balsamic vinegar",
        "1 teaspoon dried oregano",
        "Fresh basil leaves",
        "Salt and pepper to taste",
      ];
      instructions = [
        "Cook pasta according to package instructions. Drain and rinse with cold water.",
        "In a large bowl, combine pasta, tomatoes, olives, feta cheese, and red onion.",
        "In a small bowl, whisk together olive oil, balsamic vinegar, dried oregano, salt, and pepper.",
        "Pour dressing over the pasta mixture and toss to combine.",
        "Garnish with fresh basil leaves before serving.",
      ];
      dietaryInfo =
        "Vegetarian" +
        (isGlutenFree ? ", Gluten-free (with gluten-free pasta)" : "");
      tips =
        "This pasta salad tastes even better after chilling for a few hours, making it perfect for meal prep!";
    } else {
      title = "Simple Garlic Butter Chicken";
      cookingTime = Math.min(time, 25);
      mockIngredients = [
        "2 chicken breasts",
        "3 tablespoons butter",
        "4 cloves garlic, minced",
        "1 teaspoon Italian seasoning",
        "Salt and pepper to taste",
        "Fresh parsley, chopped",
        "Lemon wedges for serving",
      ];
      instructions = [
        "Season chicken breasts with salt, pepper, and Italian seasoning on both sides.",
        "In a large skillet, melt butter over medium-high heat.",
        "Add minced garlic and sauté for 30 seconds until fragrant.",
        "Add chicken breasts to the skillet and cook for 5-7 minutes per side until golden and cooked through.",
        "Spoon the garlic butter sauce over the chicken while cooking.",
        "Garnish with fresh parsley and serve with lemon wedges.",
      ];
      dietaryInfo = isGlutenFree ? "Gluten-free" : "";
      tips =
        "Pair with a simple side salad or roasted vegetables for a complete meal.";
    }
  }

  return {
    title,
    cookingTime,
    ingredients: mockIngredients,
    instructions,
    dietaryInfo,
    tips,
  };
}
