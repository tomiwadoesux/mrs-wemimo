import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { BiographySection } from "@/components/biography-section";
import { EventsSection } from "@/components/events-section";
import { TestimonialsPreviewSection } from "@/components/testimonials-preview-section";
import { GalleryPreviewSection } from "@/components/gallery-preview-section";
import { BackToTop } from "@/components/back-to-top";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BiographySection />
        <EventsSection />
        <TestimonialsPreviewSection />
        <GalleryPreviewSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
