import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import OfficeHero from '@/components/officePage/OfficeHero'
import OfficeDetails from '@/components/officePage/OfficeDetails'

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
