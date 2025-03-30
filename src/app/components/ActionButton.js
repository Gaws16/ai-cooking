"use client";

import React from "react";

export default function ActionButton({ href, onClick, children }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="btn glass text-white font-medium px-8 py-4 rounded-xl shadow-lg
                transition-all duration-300 hover:bg-white/30 hover:shadow-xl
                border border-white/10 backdrop-blur-sm
                text-lg inline-block"
    >
      {children}
    </a>
  );
}
