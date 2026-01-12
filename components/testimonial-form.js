"use client";

import { useState } from "react";
import { UserIcon, HeartIcon, SpinnerIcon, CheckIcon } from "./icons";

export function TestimonialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get current date in mm/dd/yy format
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = String(today.getFullYear()).slice(-2);
    const formattedDate = `${month}/${day}/${year}`;

    // Create testimonial object with form data and current date
    const testimonialData = {
      ...formData,
      date: formattedDate,
    };

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testimonialData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit testimonial");
      }

      setIsSuccess(true);
      setFormData({ name: "", relationship: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your memory. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 md:p-12 shadow-lg border border-border/50 backdrop-blur-sm">
      <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-3 font-bold">
        Share Your Memory
      </h3>
      <p className="text-muted-foreground text-base mb-8 leading-relaxed">
        Help us celebrate Omowunmi Oludipe Oyawemimo's life by sharing a
        cherished memory or message. Your words keep her legacy alive.
      </p>

      {isSuccess ? (
        <div className="flex items-center gap-4 bg-secondary/10 border border-secondary/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex-shrink-0">
            <CheckIcon className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">Thank You!</p>
            <p className="text-foreground/80 text-sm">
              Your memory has been submitted and will be reviewed shortly. It
              will be added to our tribute wall soon.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-foreground mb-3"
              >
                Your Name <span className="text-destructive">*</span>
              </label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground/60"
                  placeholder="Full name"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="relationship"
                className="block text-sm font-semibold text-foreground mb-3"
              >
                Your Relationship <span className="text-destructive">*</span>
              </label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                <input
                  type="text"
                  id="relationship"
                  required
                  value={formData.relationship}
                  onChange={(e) =>
                    setFormData({ ...formData, relationship: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground/60"
                  placeholder="e.g., Family, Friend, Colleague"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-foreground mb-3"
            >
              Your Memory or Message <span className="text-destructive">*</span>
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none text-foreground placeholder:text-muted-foreground/60"
              placeholder="Share a special memory, a lesson learned, or words of remembrance..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-secondary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <SpinnerIcon className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <HeartIcon className="w-4 h-4" />
                Submit Memory
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
