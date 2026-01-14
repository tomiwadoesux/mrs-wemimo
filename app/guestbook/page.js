"use server";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { TestimonialForm } from "@/components/testimonial-form";
import { QuoteIcon, CalendarIcon, UserIcon } from "@/components/icons";
import { getTestimonials } from "@/lib/sanity";
import { SortButton } from "@/components/sort-button";

export default async function TestimonialsPage({ searchParams }) {
  const { sort } = (await searchParams) || { sort: "newest" };
  const testimonials = await getTestimonials(sort);

  return (
    <>
      <Header />
      <main>
        {/* Aesthetic Hero Banner */}
        <section className="relative pt-40 pb-24 bg-primary overflow-hidden">
          {/* Abstract background element */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-50" />

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 text-secondary mb-6 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 backdrop-blur-sm">
              <QuoteIcon className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Guestbook
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-primary-foreground mb-6 overflow-hidden">
              <span className="inline-block animate-fade-in-up">
                Voices of Love
              </span>
            </h1>
            <p
              className="text-primary-foreground/80 text-xl font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Heartfelt words, cherished memories, and tributes from those whose
              lives were touched by Omowunmi Oludipe Oyawemimo.
            </p>
          </div>
        </section>

        {/* Form Section - Elegant & Non-intrusive */}
        <section id="share" className="py-16 -mt-10 relative z-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-background rounded-3xl shadow-2xl p-1 border border-border/50">
              {/* We wrap the form to give it that card look, components/testimonial-form.js has its own styling but we might want to check it later if it conflicts. 
                   The form component already has a card style, but putting it inside another white box might be double-boxing.
                   Actually, looking at the previous code, the form component *is* the card. 
                   So we should just place it here, maybe without the extra wrapper or adjust the wrapper.
                   The Gallery form was bare, so I added a wrapper. The Testimonial form has a card style internal div.
                   Let's use a wrapper but maybe simpler to blend it.
               */}
              <div className="rounded-3xl overflow-hidden bg-background">
                <TestimonialForm />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="flex flex-col">
                <div className="w-12 h-1 bg-secondary mb-4"></div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                  Community Tributes
                </h2>
                <p className="text-muted-foreground mt-2">
                  Reading {testimonials.length} beautiful memories
                </p>
              </div>
              <SortButton
                currentSort={(await searchParams)?.sort || "newest"}
              />
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="break-inside-avoid bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl hover:border-secondary/50 transition-all duration-300 group hover:-translate-y-1"
                >
                  <QuoteIcon className="w-8 h-8 text-secondary/40 mb-6 group-hover:text-secondary transition-colors" />
                  <p className="text-foreground/90 leading-relaxed mb-8 text-lg font-light">
                    &ldquo;{testimonial.message}&rdquo;
                  </p>

                  <div className="pt-6 border-t border-border/40 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-serif font-semibold text-lg text-foreground mb-1">
                        {testimonial.name}
                      </h4>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground font-medium">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary/5 text-secondary rounded-full">
                          <UserIcon className="w-3 h-3" />
                          {testimonial.relationship}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground/60 font-mono whitespace-nowrap mt-1">
                      {testimonial.date}
                    </span>
                  </div>
                </div>
              ))}

              {testimonials.length === 0 && (
                <div className="col-span-full py-20 text-center text-muted-foreground italic">
                  Be the first to share a memory.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
