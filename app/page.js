import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { BiographySection } from "@/components/biography-section";
import { EventsSection } from "@/components/events-section";
import { TestimonialsPreviewSection } from "@/components/testimonials-preview-section";
import { GalleryPreviewSection } from "@/components/gallery-preview-section";
import { BackToTop } from "@/components/back-to-top";

import { getGallery } from "@/lib/sanity";

export const revalidate = 0;

export default async function HomePage() {
  // Fetch more images and shuffle for random selection
  const allImages = await getGallery(50);
  const previewImages = allImages
    ? allImages.sort(() => 0.5 - Math.random()).slice(0, 3)
    : [];

  // Get latest 3 images for Hero slideshow
  const heroSlides = allImages
    ? allImages.slice(0, 3).map((item) => item.image)
    : [];

  return (
    <>
      <Header />
      <main>
        <HeroSection slides={heroSlides} />
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
