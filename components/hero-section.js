"use client";

import { useEffect, useState } from "react";
import { YoutubeIcon } from "./icons";

const SLIDES = ["/hero.webp", "/images/001.jpeg", "/images/002.jpeg"];

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startAnimate, setStartAnimate] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => setStartAnimate(true), 100);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000); // Change slide every 7 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-black">
      {/* Background Slideshow with Alternating Ken Burns Effect */}
      {SLIDES.map((src, index) => {
        const isActive = currentSlide === index;
        const isEven = index % 2 === 0;

        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              isActive ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center w-full h-full transform transition-transform duration-[10000ms] ease-linear ${
                isActive
                  ? isEven
                    ? "scale-110" // Even: Zoom In (1.0 -> 1.1)
                    : "scale-100" // Odd: Zoom Out (1.1 -> 1.0)
                  : isEven
                    ? "scale-100" // Reset for next time
                    : "scale-110" // Reset for next time
              }`}
              style={{
                backgroundImage: `url('${src}')`,
              }}
            />
          </div>
        );
      })}

      {/* Gradient Overlay - darker at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-black/80 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <div
          className={`max-w-5xl transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="inline-block bg-primary/90 backdrop-blur-sm text-white px-6 py-2 rounded-lg text-sm uppercase tracking-[0.2em] mb-6 font-medium shadow-sm border border-white/10">
            In Loving Memory
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 text-balance drop-shadow-lg">
            Omowunmi Oludipe Oyawemimo
          </h1>
          <p className="text-white/90 text-xl md:text-2xl mb-10 font-light tracking-wide drop-shadow-md">
            June 8, 1968 — December 25, 2025
          </p>
          <blockquote className="text-xl md:text-2xl text-center text-white/90 leading-relaxed italic border-secondary py-2 mb-10 max-w-2xl mx-auto drop-shadow-md">
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
