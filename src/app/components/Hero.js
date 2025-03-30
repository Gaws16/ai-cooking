"use client";

import Image from "next/image";
import ActionButton from "./ActionButton";

export default function Hero({ scrollToRecipes }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 hero-section">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Food background"
          className="w-full h-full object-cover"
          width={2070}
          height={1380}
          priority
        />
      </div>

      {/* Top Container with Text */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center hero-text-container mb-24">
        <div className="glass bg-black/40 dark:bg-black/50 py-8 px-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/10">
          <h1 className="hero-heading text-white">
            Hungry but <br className="hidden sm:block" />
            <span className="hero-gradient">short on time</span>?
          </h1>
          <p className="hero-paragraph text-white max-w-xl mx-auto">
            We&apos;ll find you the perfect recipe that matches your available
            time and ingredients!
          </p>
        </div>
      </div>

      {/* Bottom Container with Buttons - Separate from Text */}
      <div className="relative z-20 mx-auto px-6 text-center hero-buttons-container mt-8">
        <ActionButton href="#find-recipes" onClick={scrollToRecipes}>
          Find Recipes
        </ActionButton>
      </div>
    </section>
  );
}
