import { Block } from 'payload'

export const OurTeam: Block = {
  slug: 'our-team', // Unique identifier for the block
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
      name: 'attorney-profiles',
      label: 'Attorney Profiles',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
    },
  ],
}
