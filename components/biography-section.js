"use client";

import { useEffect, useState } from "react";

export function BiographySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="text-center mb-16">
            <span className="inline-block bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-widest mb-6">
              Her Life Story
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
              A Life of Love & Service
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="prose prose-lg md:prose-xl text-muted-foreground mx-auto leading-relaxed text-justify md:text-center font-light">
            <p className="mb-8">
              <strong className="text-foreground font-serif text-2xl block mb-2">
                Omowunmi Oludipe Oyawemimo, 57
              </strong>
              A detention officer with the Dallas County Sheriff’s Department,
              gained her Heavenly wings on December 25, 2025. Born June 8, 1968
              in Lagos, Nigeria, she was married to Olugbenga Oyawemimo.
            </p>

            <div
              className={`space-y-8 ${isExpanded ? "block" : "hidden md:block"}`}
            >
              <p>
                Omowunmi was a beautiful, devoted wife, mother, sister, and
                friend. She cherished time with family and loved ones, and
                prayed faithfully for them. She found joy in Christ and enjoyed
                many hobbies, especially interior and exterior decorations.
              </p>

              <p>
                Known for her kindness, generosity, and Godly wisdom, whether
                through family, church or friendship, she reflected Christ' love
                in tangible ways-offering encouragement, compassion, and a
                listening ear to all who crossed her path.
              </p>

              <p>
                A well-talented woman of God with song writing and singing
                ability, she was a faithful member of the African Evangelical
                Baptist Church and beloved member of the choir for several
                years.
              </p>

              <div className="bg-card p-8 rounded-2xl border border-border mt-12 shadow-sm text-left md:text-center">
                <p className="italic text-foreground">
                  Omowunmi is survived by her husband: Olugbenga; daughters:
                  Precious, Deborah and Shalom; brothers: Elder Peter Oludipe,
                  Dr. John Oludipe, Pastor Oluwole Oludipe, Segun Oludipe,
                  Gbenga Oludipe; sisters: Elizabeth Fadeyi and Nike
                  Omojugbagbe, along with a hosts of extended family and friends
                  all over the world.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden w-full mt-8 text-secondary font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 py-3 bg-secondary/5 rounded-lg active:bg-secondary/10 transition-colors"
            >
              {isExpanded ? "Read Less" : "Read More"}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
