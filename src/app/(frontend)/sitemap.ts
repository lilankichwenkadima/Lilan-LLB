import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [teamRes, postsRes, areaRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/team`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/publications`, {
      next: { revalidate: 3600 },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/practice-areas`),
  ])

  if (!teamRes.ok || !postsRes.ok || !areaRes.ok) {
    throw new Error(
      `Failed to fetch data: ${!teamRes.ok ? teamRes.statusText : postsRes.statusText}`,
    )
  }

  const teamData = await teamRes.json()
  const postsData = await postsRes.json()
  const practiceData = await areaRes.json()

  const teams: { slug: string }[] = teamData.docs
  const posts: { slug: string }[] = postsData.docs
  const practiceArea: { slug: string }[] = practiceData.docs

  const teamEntries: MetadataRoute.Sitemap = teams.map((team: { slug: string }) => ({
    type: 'teams',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/our-team/${team.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const postEntries: MetadataRoute.Sitemap = posts.map((post: { slug: string }) => ({
    type: 'posts',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/publications/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const practiceEntries: MetadataRoute.Sitemap = practiceArea.map((post: { slug: string }) => ({
    type: 'practice-areas',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/practice-area/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: '${process.env.NEXT_PUBLIC_SITE_URL}',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: '${process.env.NEXT_PUBLIC_SITE_URL}/who-we-are',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: '${process.env.NEXT_PUBLIC_SITE_URL}/publications',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: '${process.env.NEXT_PUBLIC_SITE_URL}/our-team',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: '${process.env.NEXT_PUBLIC_SITE_URL}/practice-areas',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: '${process.env.NEXT_PUBLIC_SITE_URL}/office-details',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: '${process.env.NEXT_PUBLIC_SITE_URL}/contact-us',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...teamEntries,
    ...postEntries,
    ...practiceEntries,
  ]
}
