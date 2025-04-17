import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const PracticeAreas: CollectionConfig = {
  slug: 'practice-areas',
  admin: {
    useAsTitle: 'title',
    description: 'Add Practice Area',
    group: 'Practice Areas',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug (Do not touch)',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return slugify(value, { lower: true, strict: true })
            if (data?.title) return slugify(data.title, { lower: true, strict: true })
            return value
          },
        ],
      },
    },
    { name: 'description', type: 'richText', editor: lexicalEditor(), required: true },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      required: true,
      hasMany: false,
    },
  ],
}

export default PracticeAreas
