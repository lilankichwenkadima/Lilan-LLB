export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import OurTeam from '@/components/teampage/OurTeam'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Team - Lilan | Kichwen | Kadima Advocates LLP',
  description:
    'Meet the experienced and dedicated legal team at Lilan | Kichwen | Kadima Advocates LLP. Our advocates and advisors are committed to delivering strategic, ethical, and results-driven legal solutions.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Our Team - Lilan | Kichwen | Kadima Advocates LLP',
    description:
      'Discover the skilled and trusted team behind Lilan | Kichwen | Kadima Advocates LLP. Our professionals are dedicated to empowering clients with expert legal counsel and strategic insight.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/our-team`,
    images: [
      {
        url: '/logo1.png', // You could also consider using a professional group photo here if available
        width: 1200,
        height: 630,
        alt: 'Our Team - Lilan | Kichwen | Kadima Advocates LLP',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/our-team`,
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
      slug: { equals: 'our-team' },
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
    case 'our-team':
      return <OurTeam key={index} block={block} />

    default:
      return null
  }
}
