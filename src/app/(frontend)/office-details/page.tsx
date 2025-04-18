export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import OfficeHero from '@/components/officePage/OfficeHero'
import OfficeDetails from '@/components/officePage/OfficeDetails'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Office Details - Lilan | Kichwen | Kadima Advocates LLP',
  description:
    'Discover the office locations and contact information for Lilan | Kichwen | Kadima Advocates LLP. We are committed to providing strategic, ethical, and client-focused legal services with transparency and integrity.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Office Details - Lilan | Kichwen | Kadima Advocates LLP',
    description:
      'Find the office locations and reach out to Lilan | Kichwen | Kadima Advocates LLP for trusted legal counsel, strategic solutions, and client-centric representation.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/office-details`,
    images: [
      {
        url: '/logo1.png',
        width: 1200,
        height: 630,
        alt: 'Office Details - Lilan | Kichwen | Kadima Advocates LLP',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/office-details`,
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
      slug: { equals: 'office-details' },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  // Render the page layout dynamically
  return (
    <div>
      <div className="page">
        <OfficeHero />
        {page.layout?.map((block, index) => renderBlock(block, index))}
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, index: number) {
  switch (block.blockType) {
    case 'officeDetails':
      return <OfficeDetails key={index} block={block} />

    default:
      return null
  }
}
