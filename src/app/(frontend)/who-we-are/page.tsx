export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import AboutHero from '@/components/aboutpage/AboutHero'
import GoalsSection from '@/components/aboutpage/Goals'
import TeamSection from '@/components/homepage/TeamBlock'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Who We Are - Lilan | Kichwen | Kadima Advocates LLP',
  description:
    'Learn about the vision, mission, and values that drive Lilan | Kichwen | Kadima Advocates LLP. We are committed to delivering strategic, ethical, and client-centered legal solutions built on trust and excellence.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Who We Are - Lilan | Kichwen | Kadima Advocates LLP',
    description:
      'Discover the story, principles, and commitment behind Lilan | Kichwen | Kadima Advocates LLP. We champion our clients’ rights with integrity, strategic insight, and a relentless pursuit of legal excellence.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/who-we-are`,
    images: [
      {
        url: '/logo1.png', // Or you could use a branding image if you have one for this page
        width: 1200,
        height: 630,
        alt: 'Who We Are - Lilan | Kichwen | Kadima Advocates LLP',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/who-we-are`,
  },
}

export default async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'who-we-are' },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  // Render the page layout dynamically
  return (
    <div>
      <div className="page">{page.layout?.map((block, index) => renderBlock(block, index))}</div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, index: number) {
  switch (block.blockType) {
    case 'about':
      return <AboutHero key={index} block={block} />
    case 'goals':
      return <GoalsSection key={index} block={block} />
    case 'our-team':
      return <TeamSection key={index} block={block} />

    default:
      return null
  }
}
