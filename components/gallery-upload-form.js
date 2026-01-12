"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarIcon,
  SpinnerIcon,
  CheckIcon,
  HeartIcon,
  UploadIcon,
} from "./icons";

export function GalleryUploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    images: [],
    year: "",
    description: "",
  });

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setFormData({ ...formData, images: files });

      // Generate image previews
      const previews = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          previews.push({
            url: event.target.result,
            name: file.name,
          });
          if (previews.length === files.length) {
            setImagePreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert("Please select at least one image to upload.");
      return;
    }
    setIsSubmitting(true);

    try {
      for (const image of formData.images) {
        const data = new FormData();
        data.append("image", image);
        data.append("year", formData.year);
        data.append("description", formData.description);

        const response = await fetch("/api/gallery", {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }
      }

      setIsSuccess(true);
      setFormData({ images: [], year: "", description: "" });
      setImagePreviews([]);
      e.target.reset(); // Reset file input

      // Refresh the page to show the new images
      window.location.reload();
    } catch (error) {
      console.error("Upload error:", error);
      alert("There was an error uploading your images. Please try again.");
    } finally {
      setIsSubmitting(false);
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border backdrop-blur-sm overflow-hidden relative">
      {/* Decorative gradient elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="mb-8">
          <h3 className="font-serif text-4xl md:text-5xl text-foreground mb-3 font-bold">
            Share a Memory
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Contribute to our visual history. Your photos help preserve
            cherished moments and bring communities together.
          </p>
        </div>

        {isSuccess ? (
          <div className="relative group">
            <div className="absolute inset-0 bg-secondary/10 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
            <div className="relative flex items-start gap-4 bg-card border border-secondary/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="shrink-0 mt-1">
                <div className="flex items-center justify-center w-8 h-8 bg-secondary/20 rounded-full">
                  <CheckIcon className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-foreground mb-1">
                  Thank You!
                </p>
                <p className="text-muted-foreground">
                  Your photo has been submitted successfully and will be
                  reviewed shortly. It will appear in the gallery soon.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Image Upload Area */}
            <div>
              <label
                htmlFor="image-upload"
                className="block text-sm font-bold text-foreground mb-3 uppercase tracking-wide"
              >
                Select Images or Videos{" "}
                <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="image-upload"
                  required
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="relative flex flex-col items-center justify-center w-full px-6 py-12 border-2 border-dashed border-border rounded-2xl cursor-pointer transition-all duration-300 hover:border-secondary hover:bg-secondary/5 group"
                >
                  <div className="flex flex-col items-center gap-3">
                    {imagePreviews.length > 0 ? (
                      <div className="flex flex-wrap gap-3 justify-center">
                        {imagePreviews.slice(0, 3).map((preview, index) => (
                          <div
                            key={index}
                            className="relative w-24 h-24 rounded-xl overflow-hidden shadow-md"
                          >
                            <Image
                              src={preview.url}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                        {imagePreviews.length > 3 && (
                          <div className="flex items-center justify-center w-24 h-24 rounded-xl bg-secondary/20 text-secondary font-bold text-lg">
                            +{imagePreviews.length - 3}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-all">
                        <UploadIcon className="w-8 h-8 text-secondary" />
                      </div>
                    )}
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">
                        {imagePreviews.length > 0
                          ? "Change selection"
                          : "Drop your images or videos here"}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        or click to browse from your device
                      </p>
                      {imagePreviews.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-2 font-medium">
                          {imagePreviews.length} file
                          {imagePreviews.length !== 1 ? "s" : ""} selected
                        </p>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-bold text-foreground mb-3 uppercase tracking-wide"
                >
                  Year{" "}
                  <span className="text-muted-foreground font-normal">
                    (Optional)
                  </span>
                </label>
                <div className="relative group">
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                  <input
                    type="number"
                    id="year"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3.5 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="e.g., 2023"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-bold text-foreground mb-3 uppercase tracking-wide"
              >
                Description{" "}
                <span className="text-muted-foreground font-normal">
                  (Optional)
                </span>
              </label>
              <textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3.5 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none text-foreground placeholder:text-muted-foreground"
                placeholder="Tell us about this photo..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-10 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:bg-secondary/90 hover:shadow-lg active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <SpinnerIcon className="w-5 h-5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <HeartIcon className="w-5 h-5" />
                    <span>Submit Photo</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
