"use client";

import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { CameraIcon } from "@/components/icons";
import { getGallery } from "@/lib/sanity";
import { galleryImages as fallbackGalleryImages } from "@/data/gallery";
import { GalleryUploadForm } from "@/components/gallery-upload-form";
import { Lightbox } from "@/components/lightbox";
import { useState, useEffect } from "react";

export default function GalleryPage() {
  const [displayGalleryImages, setDisplayGalleryImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    async function fetchGallery() {
      try {
        const images = await getGallery();
        setDisplayGalleryImages(images);
      } catch (error) {
        console.log("Sanity fetch failed, using fallback data");
        setDisplayGalleryImages([]);
      }
    }
    fetchGallery();
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
          <div className="container mx-auto px-6 relative">
            <div className="flex items-center gap-2 text-secondary mb-4">
              <CameraIcon className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">
                Photo Gallery
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-primary-foreground mb-4 text-balance">
              Moments Captured
            </h1>
            <p className="text-primary-foreground/70 text-xl max-w-2xl">
              A growing collection of photographs from family and friends.
            </p>
          </div>
        </section>

        <section id="share" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <GalleryUploadForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        image={selectedImage}
      />
    </>
  );
}
