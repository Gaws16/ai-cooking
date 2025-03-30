"use client";

export default function RecipeActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <button className="btn btn-primary flex-1 animate-shimmer overflow-hidden">
        Find a Recipe!
      </button>
      <button className="btn btn-secondary flex-1 animate-shimmer overflow-hidden">
        🎲 Surprise Me!
      </button>
    </div>
  );
}
