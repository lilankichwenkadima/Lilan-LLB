import { Block } from 'payload'

export const CTA: Block = {
  slug: 'cta-section', // Unique identifier for the block
  admin: { group: 'Home Page' },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
  ],
}
