"use server";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { getVideos } from "@/lib/sanity";
import { CalendarIcon, PlayIcon } from "@/components/icons";

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
          <div className="container mx-auto px-6 relative">
            <div className="flex items-center gap-2 text-secondary mb-4">
              <PlayIcon className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">
                Video Tribute
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-primary-foreground mb-4 text-balance">
              Videos
            </h1>
            <p className="text-primary-foreground/70 text-xl max-w-2xl">
              Watch sermons, messages, and special moments.
            </p>
          </div>
        </section>

        {/* Video Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((item) => (
                <div
                  key={item._id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl hover:border-secondary transition-all"
                >
                  <div className="relative aspect-video bg-black rounded-t-2xl overflow-hidden">
                    <video
                      src={item.videoUrl}
                      controls
                      preload="none"
                      className="w-full h-full object-cover"
                      poster="/placeholder-video-poster.jpg" // You might want to add a poster field to sanity schema later
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-medium text-foreground mb-3 group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {item.description}
                      </p>
                    )}
                    {item.date && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium bg-muted px-3 py-1.5 rounded-lg w-fit">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {item.date}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {videos.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <p>No videos available yet. Please check back later.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
