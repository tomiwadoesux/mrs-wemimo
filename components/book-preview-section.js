"use client";

import Image from "next/image";
import { ArrowRightIcon, BookIcon } from "./icons";
import Link from "next/link";

export function BookPreviewSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="flex-1 relative">
            <div className="relative z-10 max-w-md mx-auto bg-white shadow-2xl rounded-sm overflow-hidden transform hover:rotate-0 transition-transform duration-500">
              <Image
                src="/thebook.jpg"
                alt="Legacy book cover"
                width={400}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            {/* <div className="absolute top-10 -left-10 w-full h-full border-2 border-secondary/20 rounded-sm -z-0" /> */}
          </div>

          <div className="flex-1 text-center md:text-left">
            <p className="text-secondary text-sm uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <BookIcon className="w-4 h-4" />
              Published Work
            </p>
            <h2 className="font-serif text-4xl flex flex-col md:text-5xl text-foreground mb-6 text-balance">
              Legacy{" "}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              LEGACY is a true reflection of Omowunmi's heart ... to encourage
              and inspire the body of Christ to receive all the great gifts and
              promises God has provided through His Word.
            </p>

            <div className="flex flex-col sm:flex-row items-center md:justify-start gap-4">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-sm text-sm uppercase tracking-wider hover:bg-secondary/90 transition-colors group"
              >
                Read Excerpt
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
