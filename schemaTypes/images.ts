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
      name: "description",
      title: "Description",
      type: "string",
      description: "Optional description of the image",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      description: "Optional year when the photo was taken",
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Descriptive text for accessibility",
      initialValue: "Timothy Adebayo Adeku Memorial",
    }),
  ],
  preview: {
    select: {
      media: "image",
    },
  },
});
