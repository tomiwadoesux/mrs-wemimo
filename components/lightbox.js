"use client"

import Image from "next/image"
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "./icons";

export function Lightbox({ isOpen, onClose, image }) {
  if (!image) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={image.image || image.src}
              alt={image.alt || image.description}
              width={1200}
              height={800}
              className="object-contain max-w-full max-h-[80vh] rounded-lg shadow-2xl"
            />

            {(image.description || image.year) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg text-white">
                {image.description && <p className="text-base mb-1">{image.description}</p>}
                {image.year && <p className="text-sm text-white/70">Year: {image.year}</p>}
              </div>
            )}

            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-colors z-10"
                aria-label="Close"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}