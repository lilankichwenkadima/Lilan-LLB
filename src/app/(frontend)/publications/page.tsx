import { fetchPaginatedPosts } from '@/lib/postsUtil'
import PublicationHero from '@/components/publicationsPage/PublicationHero'
import PublicationCard from '@/components/publicationsPage/PublicationsCard'
import PaginationComponent from '@/components/navigation/PaginationComponent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Publications - Lilan | Kichwen | Kadima Advocates LLP',
  description:
    'Explore legal publications, insights, and thought leadership from Lilan | Kichwen | Kadima Advocates LLP. Stay informed with strategic analysis and updates across diverse areas of law.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Publications - Lilan | Kichwen | Kadima Advocates LLP',
    description:
      'Access articles, legal updates, and thought leadership from the team at Lilan | Kichwen | Kadima Advocates LLP. Empowering clients with knowledge and strategic legal insight.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/publications`,
    images: [
      {
        url: '/logo1.png', // You might eventually use an image showing a publication or article visuals
        width: 1200,
        height: 630,
        alt: 'Publications - Lilan | Kichwen | Kadima Advocates LLP',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/publications`,
  },
}

type Props = {
  searchParams?: Promise<{
    page?: string
  }>
}

export default async function PublicationsPage({ searchParams }: Props) {
  const resolvedParams = await searchParams

  const currentPage = Number(resolvedParams?.page) || 1
  const { posts, pagination } = await fetchPaginatedPosts(currentPage)

  return (
    <>
      <PublicationHero />
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PublicationCard key={post.id} post={post} />
          ))}
        </div>

        <PaginationComponent totalPages={pagination.totalPages} />
      </section>
    </>
  )
}
