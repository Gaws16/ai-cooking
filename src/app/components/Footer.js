"use client";

export default function Footer() {
  return (
    <footer className="glass mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} CookTime. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
