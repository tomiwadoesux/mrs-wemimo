"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { QuoteIcon, ArrowRightIcon, HeartIcon } from "./icons";
import { cn } from "@/lib/utils";
import { testimonials } from "@/data/testimonials";

export function TestimonialsPreviewSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [randomTestimonials, setRandomTestimonials] = useState([]);

  useEffect(() => {
    // Use client-side only random sort to avoid hydration mismatch
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
    setRandomTestimonials(shuffled.slice(0, 9));
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % randomTestimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + randomTestimonials.length) % randomTestimonials.length
    );
  };

  const visibleTestimonials =
    randomTestimonials.length > 0
      ? [0, 1, 2].map(
          (offset) =>
            randomTestimonials[
              (activeIndex + offset) % randomTestimonials.length
            ]
        )
      : [];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-secondary text-sm uppercase tracking-[0.2em] mb-4">
            Treasured Memories
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 text-balance">
            Words from Those Who Loved Her
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The memories and tributes shared by family, friends, and all those
            whose lives were touched by Omowunmi
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-7xl mx-auto mb-16">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:-left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-secondary/20 text-foreground hover:bg-secondary hover:text-white transition-all shadow-md group"
            aria-label="Previous testimonials"
          >
            <svg
              className="w-6 h-6 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className={`bg-white/40 backdrop-blur-sm rounded-xl p-8 border border-secondary/10 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg flex flex-col animate-fade-in-up ${index > 0 ? "hidden md:flex" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <QuoteIcon className="w-8 h-8 text-secondary/40 mb-6" />
                <blockquote className="text-lg text-foreground/90 leading-relaxed mb-6 font-light flex-grow">
                  {testimonial.message.length > 150
                    ? `${testimonial.message.substring(0, 150)}...`
                    : testimonial.message}
                </blockquote>
                <div className="mt-auto pt-6 border-t border-secondary/10">
                  <p className="font-serif text-lg font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-secondary uppercase tracking-wider font-medium mt-1">
                    {testimonial.relationship}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 md:-right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-secondary/20 text-foreground hover:bg-secondary hover:text-white transition-all shadow-md group"
            aria-label="Next testimonials"
          >
            <svg
              className="w-6 h-6 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/guestbook"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-sm text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors group"
          >
            View Guest Book
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 border border-primary text-foreground px-8 py-4 rounded-sm text-sm uppercase tracking-wider hover:bg-muted transition-colors group"
          >
            <HeartIcon className="w-4 h-4" />
            Share Your Memory
          </Link>
        </div>
      </div>
    </section>
  );
}
