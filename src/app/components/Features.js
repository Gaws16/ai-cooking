"use client";

export default function Features({ isLoaded }) {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-12">
          <span className="gradient-text">Why use CookTime?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              title: "Time-Based Recipes",
              description:
                "Find recipes that perfectly match your available cooking time.",
              icon: "⏱️",
            },
            {
              title: "Ingredient Matching",
              description: "Use what you already have in your kitchen.",
              icon: "🍳",
            },
            {
              title: "Dietary Preferences",
              description: "Customize recipes to fit your dietary needs.",
              icon: "🥗",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`modern-card p-6 text-center ${
                isLoaded
                  ? `animate-slide-up delay-${(index + 3) * 100}`
                  : "opacity-0"
              }`}
            >
              <div className="flex justify-center mb-4">
                <span className="text-4xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
