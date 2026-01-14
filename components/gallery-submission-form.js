"use client";

import { useState } from "react";
import { SpinnerIcon, CheckIcon } from "./icons";

export function GallerySubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
  });
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 20 * 1024 * 1024) {
        // 20MB limit
        alert("File size exceeds 20MB. Please upload a smaller file.");
        e.target.value = null;
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append("file", file);
    data.append("title", formData.title || "");

    try {
      const response = await fetch("/api/gallery-submission", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit media");
      }

      setIsSuccess(true);
      setFormData({ title: "" });
      setFile(null);
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        error.message ||
          "There was an error uploading your media. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 md:p-12 shadow-lg border border-border/50 backdrop-blur-sm">
      <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-3 font-bold">
        Contribute to the Gallery
      </h3>
      <p className="text-muted-foreground text-base mb-8 leading-relaxed">
        Share your photos or videos of Pastor Bayo. (Max size: 20MB)
      </p>

      {isSuccess ? (
        <div className="flex items-center gap-4 bg-secondary/10 border border-secondary/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex-shrink-0">
            <CheckIcon className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">
              Upload Successful!
            </p>
            <p className="text-foreground/80 text-sm">
              Your media has been submitted and will be reviewed shortly.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="media-title"
              className="block text-sm font-semibold text-foreground mb-3"
            >
              Title (Optional)
            </label>
            <input
              type="text"
              id="media-title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground/60"
              placeholder="e.g., Birthday Celebration 2020"
            />
          </div>

          <div>
            <label
              htmlFor="file-upload"
              className="block text-sm font-semibold text-foreground mb-3"
            >
              Upload Image or Video <span className="text-destructive">*</span>
            </label>
            <div className="relative border-2 border-dashed border-input rounded-lg hover:border-secondary/50 transition-colors bg-background/50 text-center py-8">
              <input
                type="file"
                id="file-upload"
                accept="image/*,video/*"
                required
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="pointer-events-none">
                {file ? (
                  <p className="text-secondary font-medium">
                    {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                ) : (
                  <div className="space-y-1">
                    <p className="text-foreground text-sm font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Images or Videos (Max 20MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-secondary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <SpinnerIcon className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>Upload Media</>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
