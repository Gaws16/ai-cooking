"use client";

import React from "react";

export default function Logo({ isDark }) {
  return (
    <div className="flex items-center gap-5 px-6 py-4 rounded-full glass bg-black/30 backdrop-blur-xl shadow-xl border border-white/10">
      <p
        className={`text-6xl md:text-7xl animate-float delay-100 ${
          isDark ? "text-purple-400" : "text-purple-600"
        } drop-shadow-lg`}
      >
        🍽️
      </p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold animate-slide-down">
        <p className="gradient-text text-shadow">CookTime</p>
      </h1>
    </div>
  );
}
