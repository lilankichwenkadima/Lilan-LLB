import { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    description: 'Add Team Member',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'photo',
      label: 'Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'role',
      label: 'Job Role',
      type: 'text',
      required: true,
    },
    { name: 'bio', label: 'Member Bio', type: 'textarea', required: true },
  ],
}

export default Team
