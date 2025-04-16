import { Block } from 'payload'

export const OfficeDetails: Block = {
  slug: 'officeDetails',
  labels: {
    singular: 'Office Detail',
    plural: 'Office Details',
  },
  admin: { group: 'Office Details Page' },
  fields: [
    {
      name: 'offices',
      label: 'Offices',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'location',
          label: 'Location',
          type: 'text',
          required: true,
        },
        {
          name: 'physicalAddress',
          label: 'Physical Address',
          type: 'text',
          required: true,
        },
        {
          name: 'poBox',
          label: 'P.O. Box',
          type: 'text',
        },
        {
          name: 'telephone',
          label: 'Telephone',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'phone',
              label: 'Phone',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'image',
          label: 'Office Image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
