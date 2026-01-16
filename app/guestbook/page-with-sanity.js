"use server";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { TestimonialForm } from "@/components/testimonial-form";
import { QuoteIcon, CalendarIcon, UserIcon } from "@/components/icons";
import { getTestimonials } from "@/lib/sanity";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
          <div className="container mx-auto px-6 relative">
            <div className="flex items-center gap-2 text-secondary mb-4">
              <QuoteIcon className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">
                Memories of Omowunmi Oludipe Oyawemimo
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-primary-foreground mb-4 text-balance">
              Memories & Tributes
            </h1>
            <p className="text-primary-foreground/70 text-xl max-w-2xl">
              Heartfelt words from those whose lives were touched by Omowunmi
              Oludipe Oyawemimo.
            </p>
          </div>
        </section>

        <section id="share" className="py-24 bg-muted">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-secondary text-sm uppercase tracking-[0.2em] mb-4">
                  Memories Live On
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4 text-balance">
                  Share a Memory of Omowunmi Oludipe Oyawemimo
                </h2>
                <p className="text-muted-foreground">
                  Your words help keep her memory alive for future generations.
                </p>
              </div>
              <TestimonialForm />
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="break-inside-avoid bg-gradient-to-br from-card to-card/50 rounded-2xl p-7 shadow-lg border border-border/50 hover:shadow-xl hover:border-secondary transition-all backdrop-blur-sm group"
                >
                  <QuoteIcon className="w-8 h-8 text-secondary/40 mb-4 group-hover:text-secondary/60 transition-colors" />
                  <p className="text-foreground leading-relaxed mb-6 text-lg">
                    {testimonial.message}
                  </p>
                  <div className="pt-5 border-t border-border/50">
                    <p className="font-semibold text-foreground mb-3">
                      {testimonial.name}
                    </p>
                    <div className="flex flex-col gap-2 text-xs text-muted-foreground font-medium">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/10 rounded-lg w-fit">
                        <UserIcon className="w-3.5 h-3.5 text-secondary" />
                        {testimonial.relationship}
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg w-fit">
                        <CalendarIcon className="w-3.5 h-3.5 text-muted-foreground" />
                        {testimonial.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
