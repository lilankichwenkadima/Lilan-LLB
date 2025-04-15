import { Hero } from '@/blocks/homepage/hero/schema'
import { LandingAbout } from '@/blocks/homepage/home-about/schema'
import { ServicesBlock } from '@/blocks/homepage/services/schema'
import { WhyChooseUs } from '@/blocks/homepage/why-us/schema'
import { OurTeam } from '@/blocks/homepage/our-team/schema'
import { CTA } from '@/blocks/homepage/cta/schema'
import type { CollectionConfig } from 'payload'
import { About, Goals } from '@/blocks/about/schema'
import { PracticeAreasBlock } from '@/blocks/practiceareas/schema'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      blocks: [
        Hero,
        LandingAbout,
        ServicesBlock,
        WhyChooseUs,
        OurTeam,
        CTA,
        About,
        Goals,
        PracticeAreasBlock,
      ],
    },
  ],
}
