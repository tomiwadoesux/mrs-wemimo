import dotenv from "dotenv";
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { readdir } from "fs/promises";

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

async function uploadImages() {
  const imagesDir = path.join(process.cwd(), "public", "images");

  try {
    const files = await readdir(imagesDir);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to upload...`);

    for (const file of imageFiles) {
      console.log(`Uploading ${file}...`);
      const filePath = path.join(imagesDir, file);
      const fileStream = fs.createReadStream(filePath);

      try {
        // Upload asset
        const asset = await client.assets.upload("image", fileStream, {
          filename: file,
        });

        // Create document
        const doc = {
          _type: "images",
          alt: file, // Use filename as alt text initially
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset._id,
            },
          },
          year: 2024, // Default year
          description: "Uploaded from public/images",
        };

        const createdDoc = await client.create(doc);
        console.log(`✅ Created document for ${file}`);
      } catch (err) {
        console.error(`❌ Failed to upload ${file}:`, err.message);
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

uploadImages();
