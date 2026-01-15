import { defineField, defineType } from "sanity";

export default defineType({
  name: "images",
  title: "Images",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional title for the image",
    }),

    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Descriptive text for accessibility (optional)",
      initialValue: "",
    }),
  ],

  preview: {
    select: {
      media: "image",
    },
  },
});
