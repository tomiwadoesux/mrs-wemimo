import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relationship',
      title: 'Relationship to Pastor Bayo',
      type: 'string',
      description: 'e.g., Family, Friend, Colleague, etc.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Memory or Message',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date Submitted',
      type: 'string',
      description: 'Format: mm/dd/yy',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'relationship',
    },
  },
})
