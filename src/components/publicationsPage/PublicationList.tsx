import { fetchPaginatedPosts } from '@/lib/postsUtil'
import PublicationCard from './PublicationsCard'
import PaginationComponent from '../navigation/PaginationComponent'

type Props = {
  searchParams?: {
    page?: string
  }
}

export default async function PublicationsPage({ searchParams }: Props) {
  const currentPage = Number(searchParams?.page) || 1
  const { posts, pagination } = await fetchPaginatedPosts(currentPage)

  return (
    <section className="py-12 container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PublicationCard key={post.id} post={post} />
        ))}
      </div>

      <PaginationComponent totalPages={pagination.totalPages} />
    </section>
  )
}
