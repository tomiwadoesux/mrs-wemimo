import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image");
    const year = formData.get("year");
    const description = formData.get("description");

    if (!imageFile) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    // Convert ArrayBuffer to Buffer
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    // 1. Upload the image asset
    const imageAsset = await client.assets.upload("image", imageBuffer, {
      filename: imageFile.name,
    });

    // 2. Create the gallery document
    const doc = {
      _type: "gallery",
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      },
    };

    if (description) {
      doc.description = description;
    }

    if (year) {
      doc.year = parseInt(year, 10);
    }

    const createdDocument = await client.create(doc);

    return NextResponse.json(createdDocument, { status: 201 });
  } catch (error) {
    console.error("Error uploading to Sanity:", error);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}
