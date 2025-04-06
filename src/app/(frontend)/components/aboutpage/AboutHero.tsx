import React from 'react'
interface AboutHeroBlockProps {
  block: {
    clause: string
    photo: { url: string }
  }
}
export default function AboutHero({ block }: AboutHeroBlockProps) {
  return <div>{block.clause}</div>
}
