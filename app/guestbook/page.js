"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { TestimonialForm } from "@/components/testimonial-form";
import { QuoteIcon, CalendarIcon, UserIcon } from "@/components/icons";
import { getTestimonials } from "@/lib/sanity";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";

export default function TestimonialsPage() {
  const [displayTestimonials, setDisplayTestimonials] = useState([]);
  const [sortByDate, setSortByDate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      let testimonials = [];
      try {
        testimonials = await getTestimonials();
      } catch (error) {
        console.log("Sanity fetch failed, using fallback data");
        testimonials = fallbackTestimonials;
      }

      // Randomize testimonials order by default
      testimonials = [...testimonials].sort(() => Math.random() - 0.5);
      setDisplayTestimonials(testimonials);
      setIsLoading(false);
    };

    fetchTestimonials();
  }, []);

  const sortedTestimonials = sortByDate
    ? [...displayTestimonials].sort((a, b) => {
        const parseDate = (dateStr) => {
          if (!dateStr) return new Date(0);
          const [month, day, year] = dateStr.split("/");
          // Convert YY to YYYY (24 -> 2024, 25 -> 2025, etc.)
          const fullYear =
            parseInt(year) > 50 ? 1900 + parseInt(year) : 2000 + parseInt(year);
          return new Date(fullYear, parseInt(month) - 1, parseInt(day));
        };
        return parseDate(b.date) - parseDate(a.date);
      })
    : displayTestimonials;

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
                Guest Book
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-primary-foreground mb-4 text-balance">
              Guest Book
            </h1>
            <p className="text-primary-foreground/70 text-xl max-w-2xl">
              Heartfelt words from those whose lives were touched by Omowunmi.
            </p>
          </div>
        </section>

        <section id="share" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-secondary text-sm uppercase tracking-[0.2em] mb-4">
                  Memories Live On
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4 text-balance">
                  Share a Memory of Omowunmi
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
            <div className="mb-16">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3 font-bold">
                    Voices of Love & Gratitude
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-3xl">
                    Over {displayTestimonials.length} people have shared their
                    heartfelt memories and tributes. Read below to discover how
                    Omowunmi's life touched the hearts of her family, friends,
                    colleagues, and the community she served.
                  </p>
                </div>
                <button
                  onClick={() => setSortByDate(!sortByDate)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-secondary/30 bg-secondary/5 hover:bg-secondary/10 transition-colors text-foreground font-medium whitespace-nowrap"
                >
                  <CalendarIcon className="w-4 h-4" />
                  {sortByDate ? "Random Order" : "Newest First"}
                </button>
              </div>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {sortedTestimonials.map((testimonial) => (
                <div
                  key={testimonial._id || testimonial.id}
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

            {/* Impact Statistics */}
            <div className="mt-20 pt-16 border-t border-border">
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-12 text-center">
                The Impact of Her Life
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-lg bg-secondary/5 border border-secondary/10">
                  <div className="text-4xl font-bold text-secondary mb-2">
                    {displayTestimonials.length}
                  </div>
                  <p className="text-muted-foreground font-medium">
                    Testimonies Shared
                  </p>
                </div>
                <div className="text-center p-6 rounded-lg bg-secondary/5 border border-secondary/10">
                  <div className="text-4xl font-bold text-secondary mb-2">
                    {
                      new Set(displayTestimonials.map((t) => t.relationship))
                        .size
                    }
                  </div>
                  <p className="text-muted-foreground font-medium">
                    Circles of Influence
                  </p>
                </div>
                <div className="text-center p-6 rounded-lg bg-secondary/5 border border-secondary/10">
                  <div className="text-4xl font-bold text-secondary mb-2">
                    ∞
                  </div>
                  <p className="text-muted-foreground font-medium">
                    Lasting Legacy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
