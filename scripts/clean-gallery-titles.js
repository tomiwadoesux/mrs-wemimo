import dotenv from "dotenv";
import { createClient } from "@sanity/client";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing Sanity configuration. Check .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function cleanTitles() {
  console.log("🧹 cleaning filenames from alt texts and descriptions...");

  // Fetch all images
  const images = await client.fetch(
    '*[_type == "images"]{_id, alt, title, description}'
  );

  const filenameRegex = /\.(jpeg|jpg|png|webp)$/i;
  const uploadedRegex = /Uploaded from/i;

  for (const doc of images) {
    let needsUpdate = false;
    let updates = {};

    // Check if alt contains a filename
    if (doc.alt && filenameRegex.test(doc.alt)) {
      console.log(`Found filename in alt: ${doc.alt} (${doc._id}) - Clearing`);
      updates.alt = "";
      needsUpdate = true;
    }

    // Check if title (if exists) contains a filename
    if (doc.title && filenameRegex.test(doc.title)) {
      console.log(
        `Found filename in title: ${doc.title} (${doc._id}) - Clearing`
      );
      updates.title = "";
      needsUpdate = true;
    }

    // Check if description contains "Uploaded from"
    if (doc.description && uploadedRegex.test(doc.description)) {
      console.log(
        `Found 'Uploaded from' in description: ${doc.description} (${doc._id}) - Clearing`
      );
      updates.description = "";
      needsUpdate = true;
    }

    if (needsUpdate) {
      try {
        await client.patch(doc._id).set(updates).commit();
        console.log(`✅ Updated ${doc._id}`);
      } catch (err) {
        console.error(`❌ Failed to update ${doc._id}:`, err.message);
      }
    }
  }

  console.log("✨ Done!");
}

cleanTitles();
