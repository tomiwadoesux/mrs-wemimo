"use client";

import { useState } from "react";
import { Lightbox } from "./lightbox";

export function GalleryGrid({ gallery }) {
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
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-secondary to-transparent mb-6"></div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center">
              Captured Memories
            </h2>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {gallery.map((item) => (
              <button
                key={item._id}
                onClick={() => openModal(item)}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card border border-border/50 w-full text-left"
              >
                <img
                  src={item.image}
                  alt={item.alt || "Memory"}
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.description && (
                      <p className="text-white font-medium text-lg mb-1 leading-snug">
                        {item.description}
                      </p>
                    )}
                    {item.alt && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="h-px w-8 bg-white/50"></div>
                        <p className="text-white/80 text-xs tracking-widest font-mono uppercase">
                          {item.alt}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {gallery.length === 0 && (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground text-lg italic">
                No photos have been added yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <Lightbox
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </>
  );
}
