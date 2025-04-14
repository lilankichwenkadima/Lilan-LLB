import { getPayload } from 'payload'
import React from 'react'
import PracticeHeroSection from '@/components/practiceAreas/PracticeHero'

import config from '@/payload.config'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'practice-areas' },
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
    case 'practice-areas-block':
      return <PracticeHeroSection key={index} block={block} />

    default:
      return null
  }
}
