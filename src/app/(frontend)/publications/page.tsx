import { fetchPaginatedPosts } from '@/lib/postsUtil'
import PublicationHero from '@/components/publicationsPage/PublicationHero'
import PublicationCard from '@/components/publicationsPage/PublicationsCard'
import PaginationComponent from '@/components/navigation/PaginationComponent'

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
