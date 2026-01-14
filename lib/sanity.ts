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

export async function getTestimonials(sort = "newest") {
  let query = `*[_type == "guestbook"] | order(_createdAt desc)`;

  if (sort === "random") {
    // Sanity doesn't have a true random sort built-in easily in one query without plugins or complexity.
    // A common workaround is to fetch all and shuffle on client/server, OR use a random seed if valid.
    // For simplicity and performance on small datasets, we'll fetch all and shuffle in JS.
    query = `*[_type == "guestbook"]`;
  }

  const results = await client.fetch(
    query +
      `{
    _id,
    name,
    relationship,
    message,
    date,
    "image": image.asset->url,
  }`
  );

  if (sort === "random") {
    // Fisher-Yates shuffle
    for (let i = results.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [results[i], results[j]] = [results[j], results[i]];
    }
  }

  return results;
}

export async function getGallery(limit = null) {
  const limitQuery = limit ? `[0...${limit}]` : "";
  const query = `*[_type == "images"] | order(_createdAt desc) ${limitQuery} {
    _id,
    "image": image.asset->url,
    description,
    year,
    alt,
  }`;

  return await client.fetch(query);
}

export async function getVideos() {
  const query = `*[_type == "video"] | order(_createdAt desc) {
    _id,
    title,
    "videoUrl": videoFile.asset->url,
    description,
    date,
  }`;

  return await client.fetch(query);
}
