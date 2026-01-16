"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { PlayIcon } from "@/components/icons";
import { useState, useEffect } from "react";

const sermons = [
  {
    id: 1,
    title: "The Excellency of God",
    date: "2024",
    youtubeId: "uNfNqLjzryo",
    startTime: 0,
  },
  {
    id: 2,
    title: "Living in God's Grace",
    date: "2024",
    youtubeId: "i_tqXpf-AqQ",
    startTime: 1280, // 21:20
  },
  {
    id: 3,
    title: "Faith and Trust",
    date: "2024",
    youtubeId: "vX4lWe4t4Ss",
    startTime: 1525, // 25:25
  },
  {
    id: 4,
    title: "Purpose and Calling",
    date: "2024",
    youtubeId: "UnkdpPJ6Hss",
    startTime: 1114, // 18:34
  },
  {
    id: 5,
    title: "Love and Compassion",
    date: "2024",
    youtubeId: "xU6qz3kK40g",
    startTime: 1412, // 23:32
  },
  {
    id: 6,
    title: "Building Strong Families",
    date: "2024",
    youtubeId: "J_tUtcNilYM",
    startTime: 0,
  },
  {
    id: 7,
    title: "Legacy of Generosity",
    date: "2024",
    youtubeId: "TWic_uj8uAY",
    startTime: 0,
  },
  {
    id: 8,
    title: "Walking in Light",
    date: "2024",
    youtubeId: "UCClNUlWEsc",
    startTime: 0,
  },
  {
    id: 9,
    title: "Strength in Seasons",
    date: "2024",
    youtubeId: "dAhmEG_TZOU",
    startTime: 0,
  },
  {
    id: 10,
    title: "The Journey of Faith",
    date: "2024",
    youtubeId: "lEDlyo0HhUA",
    startTime: 2420, // 40:20
  },
  {
    id: 11,
    title: "A Celebration of Life - Omowunmi Oludipe Oyawemimo",
    date: "Dec 11 2024",
    youtubeId: "DH6aSJnSJiU",
    description:
      "Join us in celebrating the remarkable life and legacy of Omowunmi Oludipe Oyawemimo. This special tribute video captures the essence of her faith, wisdom, and the profound impact she had on countless lives. Through heartfelt testimonies and cherished memories, we honor a woman who dedicated her life to serving God and uplifting her community.",
    featured: true,
  },
];

export default function MessagesPage() {
  const [selectedSermon, setSelectedSermon] = useState(null);
  const [randomizedSermons, setRandomizedSermons] = useState([]);
  const [featuredSermon, setFeaturedSermon] = useState(null);

  // Separate featured sermon and randomize the rest
  useEffect(() => {
    const featured = sermons.find((s) => s.featured);
    const others = sermons.filter((s) => !s.featured);
    const shuffled = [...others].sort(() => Math.random() - 0.5);
    setFeaturedSermon(featured);
    setRandomizedSermons(shuffled);
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
          <div className="container mx-auto px-6 relative">
            <div className="flex items-center gap-2 text-secondary mb-4">
              <PlayIcon className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">Messages</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-primary-foreground mb-4 text-balance">
              Omowunmi's Messages
            </h1>
            <p className="text-primary-foreground/70 text-xl max-w-2xl">
              A collection of inspiring sermons and teachings that reflect
              Omowunmi's wisdom, faith, and dedication to helping others.
            </p>
          </div>
        </section>

        {/* Messages Grid */}
        <section className="py-28 bg-background relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -mr-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -ml-48"></div>

          <div className="container mx-auto px-6 relative z-10">
            {/* Featured Video */}
            {featuredSermon && (
              <div className="mb-20">
                <div
                  onClick={() => setSelectedSermon(featuredSermon)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Video Thumbnail */}
                      <div className="relative h-80 md:h-[500px] overflow-hidden">
                        <img
                          src="/omowunmi-profile.webp"
                          alt={featuredSermon.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-secondary/90 group-hover:bg-secondary group-hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-2xl">
                            <PlayIcon className="w-12 h-12 text-secondary-foreground ml-1" />
                          </div>
                        </div>

                        {/* Featured Badge */}
                        <div className="absolute top-6 left-6 bg-secondary backdrop-blur-md px-5 py-2.5 rounded-full text-xs text-secondary-foreground font-bold uppercase tracking-wider shadow-lg z-20">
                          Featured
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-card to-card/50">
                        <div className="flex items-center gap-2 text-secondary mb-4">
                          <PlayIcon className="w-4 h-4" />
                          <span className="text-xs uppercase tracking-widest font-semibold">
                            Special Tribute
                          </span>
                        </div>

                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight group-hover:text-secondary transition-colors duration-300">
                          {featuredSermon.title}
                        </h2>

                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                          {featuredSermon.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span>{featuredSermon.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-secondary group-hover:gap-4 transition-all duration-300">
                          <span className="text-sm font-bold uppercase tracking-wider">
                            Watch Now
                          </span>
                          <svg
                            className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4 font-bold">
                More Messages
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
                Experience the wisdom, faith, and inspiration from Omowunmi's
                powerful messages. Each sermon is a journey into deeper
                understanding and spiritual growth.
              </p>
            </div>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {randomizedSermons.map((sermon) => (
                <div
                  key={sermon.id}
                  onClick={() => setSelectedSermon(sermon)}
                  className="group cursor-pointer h-full flex flex-col"
                >
                  {/* Video Card */}
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 bg-linear-to-br from-slate-800 to-slate-900 h-56 shrink-0 flex items-center justify-center group">
                    {/* YouTube Thumbnail - Try multiple quality options */}
                    <picture className="absolute inset-0 w-full h-full">
                      <source
                        srcSet={`https://img.youtube.com/vi/${sermon.youtubeId}/maxresdefault.jpg`}
                      />
                      <source
                        srcSet={`https://img.youtube.com/vi/${sermon.youtubeId}/sddefault.jpg`}
                      />
                      <source
                        srcSet={`https://img.youtube.com/vi/${sermon.youtubeId}/hqdefault.jpg`}
                      />
                      <img
                        src={`https://img.youtube.com/vi/${sermon.youtubeId}/mqdefault.jpg`}
                        alt={sermon.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                    </picture>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center z-10">
                      <div className="w-16 h-16 rounded-full bg-secondary/80 group-hover:bg-secondary flex items-center justify-center transition-all duration-300 shadow-xl">
                        <PlayIcon className="w-8 h-8 text-secondary-foreground ml-0.5" />
                      </div>
                    </div>

                    {/* Date Badge */}
                    <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-md px-4 py-2 rounded-full text-xs text-secondary-foreground font-bold uppercase tracking-wider z-20">
                      {sermon.date}
                    </div>

                    {/* Duration or View Count Badge */}
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white/80 z-20">
                      Click to watch
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-6 flex-1 flex flex-col">
                    {/* CTA */}
                    <div className="mt-auto flex items-center gap-2 text-secondary group-hover:gap-3 transition-all duration-300">
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        Watch message
                      </span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />

      {/* Video Modal */}
      {selectedSermon && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedSermon(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedSermon.youtubeId}?autoplay=1&start=${selectedSermon.startTime}`}
              title={selectedSermon.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />

            {/* Close Button */}
            <button
              onClick={() => setSelectedSermon(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
