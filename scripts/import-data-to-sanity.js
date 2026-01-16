#!/usr/bin/env node
/**
 * Import testimonials and gallery data to Sanity CMS
 *
 * Usage:
 *   node -r dotenv/config scripts/import-data-to-sanity.js
 *   OR npm run import:data
 *
 * This script reads from your local data files, uploads assets, and imports them into Sanity.
 */

import dotenv from "dotenv";
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { testimonials } from "../data/testimonials.js";
import { galleryImages } from "../data/gallery.js";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

console.log("\n========================================");
console.log("📊 Sanity Data Import Tool");
console.log("========================================\n");

// Check for required environment variables
if (!projectId || !dataset || !token) {
  console.error("❌ Error: Missing Sanity environment variables.");
  console.error(
    "Ensure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN are set in your .env.local file."
  );
  console.error("\nTo generate a token:");
  console.error("1. Go to https://manage.sanity.io/projects");
  console.error("2. Select your project");
  console.error("3. Go to Settings > API > Tokens");
  console.error('4. Create a new token with "Editor" role');
  console.error("5. Add it to .env.local as SANITY_API_TOKEN=your_token");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

/**
 * Deletes all documents of a given type from Sanity.
 * @param {string} type - The schema type to delete (e.g., 'testimonial', 'gallery').
 */
async function deleteAll(type) {
  const query = `*[_type == "${type}"]`;
  try {
    const docs = await client.fetch(query);
    if (docs.length === 0) {
      console.log(`- No documents of type "${type}" to delete.`);
      return 0;
    }
    console.log(
      `🗑️ Deleting ${docs.length} existing documents of type "${type}"...`
    );
    const transaction = client.transaction();
    docs.forEach((doc) => {
      transaction.delete(doc._id);
    });
    await transaction.commit();
    console.log(
      `✅ Successfully deleted ${docs.length} "${type}" documents.\n`
    );
    return docs.length;
  } catch (error) {
    console.error(`❌ Error deleting "${type}" documents:`, error.message);
    throw error;
  }
}

async function importTestimonials() {
  console.log("🚀 Starting testimonials import...");
  console.log(`📝 Found ${testimonials.length} testimonials to import\n`);

  const testimonialDocs = testimonials.map((testimonial) => ({
    _type: "guestbook",
    name: testimonial.name,
    relationship: testimonial.relationship,
    message: testimonial.message,
    date: testimonial.date,
  }));

  try {
    let count = 0;
    for (const doc of testimonialDocs) {
      try {
        await client.create(doc);
        count++;
        process.stdout.write(
          `\r✅ Imported ${count}/${testimonialDocs.length} testimonials`
        );
      } catch (error) {
        console.error(
          `\n❌ Error importing testimonial "${doc.name}":`,
          error.message
        );
      }
    }
    console.log(`\n\n✨ Successfully imported ${count} testimonials!\n`);
    return count;
  } catch (error) {
    console.error("❌ Testimonials import failed:", error.message);
    throw error;
  }
}

async function importGallery() {
  console.log("🚀 Starting gallery import...");
  console.log(`📸 Found ${galleryImages.length} gallery images to import\n`);

  let count = 0;
  for (const image of galleryImages) {
    const imagePath = path.join(process.cwd(), "public", image.src);

    if (!fs.existsSync(imagePath)) {
      console.warn(
        `\n⚠️ Warning: Image file not found at ${imagePath}. Skipping.`
      );
      continue;
    }

    try {
      const imageAsset = await client.assets.upload(
        "image",
        fs.createReadStream(imagePath),
        {
          filename: path.basename(imagePath),
        }
      );

      const doc = {
        _type: "images",
        description: "",
        year: parseInt(image.date) || 2024,
        alt: image.alt || "Omowunmi Oludipe Oyawemimo Memorial",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
      };

      await client.create(doc);
      count++;
      process.stdout.write(
        `\r✅ Uploaded and imported ${count}/${galleryImages.length} gallery items`
      );
    } catch (error) {
      console.error(
        `\n❌ Error importing gallery item for "${image.src}":`,
        error.message
      );
    }
  }
  console.log(`\n\n✨ Successfully imported ${count} gallery items!\n`);
  return count;
}

async function main() {
  try {
    console.log("🧹 Clearing existing data in Sanity...");
    await deleteAll("guestbook");
    await deleteAll("images");

    const testimonialsCount = await importTestimonials();
    const galleryCount = await importGallery();

    console.log("========================================");
    console.log("✅ Import completed successfully!");
    console.log("========================================");
    console.log(`\n📊 Summary:`);
    console.log(`   • ${testimonialsCount} testimonials imported`);
    console.log(`   • ${galleryCount} gallery items imported`);
    console.log("\n📌 Next steps:");
    console.log("1. Go to http://localhost:3000/studio");
    console.log("2. Your testimonials and gallery images are now in Sanity.");
    console.log(
      "3. You can add descriptions or re-organize them in the Studio."
    );
    console.log("\n");
  } catch (error) {
    console.error("\n❌ Import process failed with error:");
    // The specific error is already logged in the function that threw it.
    process.exit(1);
  }
}

main();
