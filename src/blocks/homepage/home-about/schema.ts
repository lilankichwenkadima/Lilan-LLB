import { Block } from 'payload'

export const LandingAbout: Block = {
  slug: 'home-about',
  admin: { group: 'Home Page' },
  fields: [
    { name: 'heading', label: 'Heading', type: 'text', required: true },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
  ],
}
