import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'nav',
      label: 'Nav',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
        },
      ],
      minRows: 1,
      maxRows: 5,
    },
    {
      name: 'copyrightNotice',
      label: 'Copyright Notice',
      type: 'text',
      required: true,
    },
  ],
}
