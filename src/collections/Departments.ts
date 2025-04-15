import { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Departments: CollectionConfig = {
  slug: 'departments',
  admin: {
    useAsTitle: 'title',
    description: 'Add Department',
    group: 'Practice Areas',
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
    { name: 'description', label: 'Department Description', type: 'textarea', required: true },
  ],
}

export default Departments
