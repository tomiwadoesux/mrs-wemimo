import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

// Gracefully handle missing configuration
const isConfigured = !!projectId && !!dataset;

export const client = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : ({
      fetch: async () => {
        throw new Error("Sanity not configured");
      },
    } as any);

const builder = isConfigured ? imageUrlBuilder(client) : null;

export function urlFor(source: any) {
  if (!builder) return { url: () => "/placeholder.svg" };
  return builder.image(source);
}

export async function getTestimonials() {
  const query = `*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    name,
    relationship,
    message,
    date,
  }`;

  return await client.fetch(query);
}

export async function getGallery() {
  const query = `*[_type == "gallery"] | order(_createdAt desc) {
    _id,
    "image": image.asset->url,
    description,
    year,
    alt,
  }`;

  return await client.fetch(query);
}
