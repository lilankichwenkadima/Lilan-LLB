import { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import slugify from 'slugify'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    description: 'Add Team Member',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
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
            if (data?.name) return slugify(data.name, { lower: true, strict: true })
            return value
          },
        ],
      },
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
    { name: 'bio', type: 'richText', required: true, editor: lexicalEditor() },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'text', required: true },
    {
      name: 'education',
      label: 'Education',
      type: 'array',
      hidden: true,
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'description',
          label: 'Fill your details here',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sociallinks',
      label: 'Social Profiles',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
      ],
    },

    {
      name: 'languages',
      label: 'Languages',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          label: 'Language Title',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default Team
