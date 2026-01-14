import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { BiographySection } from "@/components/biography-section";
import { EventsSection } from "@/components/events-section";
import { TestimonialsPreviewSection } from "@/components/testimonials-preview-section";
import { GalleryPreviewSection } from "@/components/gallery-preview-section";
import { BackToTop } from "@/components/back-to-top";

import { getGallery } from "@/lib/sanity";

export default async function HomePage() {
  const previewImages = await getGallery(4);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BiographySection />
        <EventsSection />
        <TestimonialsPreviewSection />
        <GalleryPreviewSection images={previewImages} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
