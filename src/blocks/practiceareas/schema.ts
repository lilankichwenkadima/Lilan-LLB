import { Block } from 'payload'

export const PracticeAreasBlock: Block = {
  slug: 'practice-areas-block',
  admin: { group: 'Practice Area Page' },

  labels: {
    singular: 'Practice Area Block',
    plural: 'Practice Area Blocks',
  },
  fields: [
    {
      name: 'practiceAreas',
      label: 'Practice Areas',
      type: 'relationship',
      relationTo: 'practice-areas',
      hasMany: true,
    },
  ],
}
