"use server";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { getGallery } from "@/lib/sanity";
import { GallerySubmissionForm } from "@/components/gallery-submission-form";
import { ImageIcon } from "@/components/icons";

import { GalleryGrid } from "@/components/gallery-grid";

export default async function GalleryPage() {
  const gallery = await getGallery();

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
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Visual Journey
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-primary-foreground mb-6 overflow-hidden">
              <span className="inline-block animate-fade-in-up">
                Moments of Light
              </span>
            </h1>
            <p
              className="text-primary-foreground/80 text-xl font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              A curated collection of cherished memories celebrating the
              beautiful life and enduring spirit of Omowunmi Oludipe Oyawemimo.
            </p>
          </div>
        </section>

        {/* Submission Section - Elegant & Non-intrusive */}
        <section className="py-16 -mt-10 relative z-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-background rounded-3xl shadow-2xl p-1 border border-border/50">
              <GallerySubmissionForm />
            </div>
          </div>
        </section>

        {/* Gallery Grid - Masonry Layout */}
        <GalleryGrid gallery={gallery} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
