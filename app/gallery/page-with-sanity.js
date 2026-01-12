'use server'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { getGallery } from "@/lib/sanity"

export default async function GalleryPage() {
  const gallery = await getGallery()

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
          <div className="container mx-auto px-6 relative">
            <div className="flex items-center gap-2 text-secondary mb-4">
              <span className="text-sm uppercase tracking-wider">📸 Photo Gallery</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-primary-foreground mb-4 text-balance">
              Gallery
            </h1>
            <p className="text-primary-foreground/70 text-xl max-w-2xl">
              A visual celebration of Pastor Bayo's life and legacy.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gallery.map((item: any) => (
                <div
                  key={item._id}
                  className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <img
                    src={item.image}
                    alt={item.alt || item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-semibold">{item.title}</p>
                    {item.caption && <p className="text-white/80 text-sm">{item.caption}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
