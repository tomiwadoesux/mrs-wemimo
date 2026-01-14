import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

const client =
  projectId && dataset && token
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2024-01-01",
        token,
        useCdn: false,
      })
    : null;

export async function POST(request) {
  if (!client) {
    return NextResponse.json(
      { error: "Sanity configuration missing" },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const title = formData.get("title") || "Untitled Memory";
    const description = ""; // Description removed from form

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    // Title check removed as it defaults to Untitled Memory

    // 20MB limit check (already checked on client, but good to double check)
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 20MB limit" },
        { status: 413 }
      );
    }

    // Determine type (image or video)
    const isVideo = file.type.startsWith("video/");
    const assetType = isVideo ? "file" : "image"; // Sanity uses 'file' for videos in asset upload usually, or image

    // Convert file to buffer for Sanity upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload Asset
    const asset = await client.assets.upload(assetType, buffer, {
      filename: file.name,
      contentType: file.type,
    });

    // Create Document
    let doc;
    if (isVideo) {
      doc = {
        _type: "video",
        title: title,
        description: description || "",
        videoFile: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
        date: new Date().toISOString().split("T")[0],
      };
    } else {
      doc = {
        _type: "images",
        // images schema uses 'alt' usually for title/alt text, but we don't have a title field in the schema we created earlier.
        // Let's check schema/images.ts. It has 'description', 'year', 'alt'.
        // and schema/gallery.ts (old) had description, year, alt, caption.
        // The user input 'title' maps best to 'alt' or we should add a title field.
        // For now, let's map title to 'alt' and 'description' to 'description'.
        alt: title,
        description: description || "",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
        year: new Date().getFullYear(),
      };
    }

    const createdDoc = await client.create(doc);

    return NextResponse.json(
      { message: "Upload successful", document: createdDoc },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload media: " + error.message },
      { status: 500 }
    );
  }
}
