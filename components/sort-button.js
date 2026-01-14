"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SortButton({ currentSort }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSort = (sort) => {
    const params = new URLSearchParams(window.location.search);
    params.set("sort", sort);
    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left mb-8">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center gap-2 bg-background border border-border px-5 py-2.5 rounded-xl text-sm font-medium text-foreground shadow-sm hover:border-secondary hover:text-secondary transition-all"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="text-muted-foreground">Sort via:</span>
          <span className="capitalize">
            {currentSort === "random" ? "Random" : "Newest First"}
          </span>
          <svg
            className={`-mr-1 h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute left-0 z-20 mt-2 w-48 origin-top-left rounded-xl bg-card border border-border shadow-xl ring-1 ring-black/5 focus:outline-none overflow-hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <button
              onClick={() => toggleSort("newest")}
              className={`block w-full text-left px-4 py-3 text-sm transition-colors ${currentSort !== "random" ? "bg-secondary/10 text-secondary font-medium" : "text-foreground hover:bg-muted"}`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              Newest First
            </button>
            <button
              onClick={() => toggleSort("random")}
              className={`block w-full text-left px-4 py-3 text-sm transition-colors ${currentSort === "random" ? "bg-secondary/10 text-secondary font-medium" : "text-foreground hover:bg-muted"}`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
            >
              Random
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
