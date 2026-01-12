"use client";

import { useEffect, useState } from "react";
import { YoutubeIcon } from "./icons";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 ${isLoaded ? "animate-ken-burns" : ""}`}
          style={{
            backgroundImage: "url('/hero.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.68_0.08_145)]/50 via-[oklch(0.78_0.06_60)]/30 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <div
          className={`max-w-5xl transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="inline-block bg-primary text-white px-6 py-2 rounded-lg text-sm uppercase tracking-[0.2em] mb-6 font-medium shadow-sm">
            In Loving Memory
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-6 text-balance drop-shadow-md">
            Omowunmi Oludipe Oyawemimo
          </h1>
          <p className="text-primary-foreground/90 text-xl md:text-2xl mb-10 font-light tracking-wide drop-shadow-md">
            June 8, 1968 — December 25, 2025
          </p>
          <blockquote className="text-xl md:text-2xl text-center text-primary-foreground/90 leading-relaxed italic border-secondary py-2 mb-10 max-w-2xl mx-auto">
            "Known for her kindness, generosity, and Godly wisdom, she reflected
            Christ's love to all who crossed her path."
          </blockquote>
          <a
            href="/guestbook"
            className="inline-flex items-center gap-2 bg-secondary text-primary-foreground px-10 py-4 rounded-sm text-sm uppercase tracking-wider hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg group"
          >
            Celebrate Her Life
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
