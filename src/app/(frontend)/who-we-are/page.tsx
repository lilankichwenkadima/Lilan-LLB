import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import AboutHero from '../components/aboutpage/AboutHero'
import GoalsSection from '../components/aboutpage/Goals'
import TeamSection from '../components/homepage/TeamBlock'
import ValuesSection from '../components/aboutpage/Values'

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
    case 'core-values':
      return <ValuesSection key={index} block={block} />
    default:
      return null
  }
}
