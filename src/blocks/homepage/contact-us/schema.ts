import { Block } from 'payload'

export const Contact: Block = {
  slug: 'contact', // Unique identifier for the block
  admin: { group: 'Home Page' },

  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'telephone',
      label: 'Phone Number',
      type: 'number',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
    },
  ],
}
