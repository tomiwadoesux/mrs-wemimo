"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "./icons";
import Link from "next/link";
import { galleryImages } from "@/data/gallery";
import { Lightbox } from "./lightbox";

export function GalleryPreviewSection({ images = [] }) {
  const previewImages = images;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <p className="text-secondary text-sm uppercase tracking-[0.2em] mb-4">
            Life in Pictures
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance mb-6">
            Captured Moments
          </h2>
        </div>

        {/* Gallery Grid with Mobile Horizontal Scroll */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:pb-0 mb-12 scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
          {previewImages.map((item) => (
            <button
              key={item._id}
              onClick={() => openModal(item)}
              className="flex-shrink-0 w-[85vw] sm:w-auto h-[85vw] sm:h-auto snap-center aspect-square bg-card rounded-lg overflow-hidden relative group cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.alt || "Gallery Image"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </button>
          ))}
        </div>

        <Lightbox
          isOpen={isModalOpen}
          onClose={closeModal}
          image={
            selectedImage
              ? { ...selectedImage, src: selectedImage.image }
              : null
          }
        />

        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-10 py-4 rounded-lg text-sm uppercase tracking-wider hover:bg-secondary/90 transition-all hover:scale-105 shadow-md"
          >
            See More
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
