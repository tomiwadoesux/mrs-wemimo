"use client";

import Link from "next/link";
import {
  HeartIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  MailIcon,
} from "./icons";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Link
              href="/"
              className="font-serif text-3xl tracking-wide block mb-4 font-bold hover:text-secondary transition-colors"
            >
              Omowunmi Oludipe Oyawemimo
            </Link>
            <p className="text-primary-foreground/80 max-w-sm leading-relaxed text-base">
              Celebrating a life of grace, wisdom, and unconditional love. May
              her memory be a blessing to all who knew her and continue to
              inspire generations to come.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/guestbook"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors font-medium"
                >
                  Guest Book
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors font-medium"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-primary-foreground uppercase tracking-widest text-sm">
              Contact Family
            </h4>
            <div className="flex items-center gap-6 mb-6">
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:gbengawunmi@hotmail.com"
                className="text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                <MailIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/70">
              © 2025 Omowunmi Oludipe Oyawemimo Memorial. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 text-secondary animate-pulse" />
              <span>by her family</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
