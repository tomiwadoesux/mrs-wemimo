"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "./icons";
import Link from "next/link";
import { galleryImages } from "@/data/gallery";
import { Lightbox } from "./lightbox";

export function GalleryPreviewSection() {
  const previewImages = [];
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
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <p className="text-secondary text-sm uppercase tracking-[0.2em] mb-4">
              Life in Pictures
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
              Captured Moments
            </h2>
          </div>
          <Link
            href="/gallery"
            className="hidden md:inline-flex items-center gap-2 text-foreground hover:text-secondary transition-colors group"
          >
            View Full Gallery
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {previewImages.map((image) => (
            <button
              key={image.id}
              onClick={() => openModal(image)}
              className="aspect-square bg-card rounded-lg overflow-hidden relative group cursor-pointer"
            >
              <Image
                src={image.src}
                alt={image.alt}
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
          image={selectedImage}
        />

        <div className="text-center md:hidden">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-sm text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
          >
            Slide to View
          </Link>
        </div>
      </div>
    </section>
  );
}
