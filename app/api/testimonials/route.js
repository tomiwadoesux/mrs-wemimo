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
    const { name, relationship, message, date } = await request.json();

    if (!name || !relationship || !message) {
      return NextResponse.json(
        { error: "Name, relationship, and message are required" },
        { status: 400 }
      );
    }

    const doc = {
      _type: "guestbook",
      name,
      relationship,
      message,
      date: date || new Date().toISOString().split("T")[0],
    };

    const createdDocument = await client.create(doc);

    return NextResponse.json(createdDocument, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to submit testimonial" },
      { status: 500 }
    );
  }
}
