import config from '@/payload.config'
import { getPayload } from 'payload'

export async function fetchPaginatedPosts(page = 1, limit = 9) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const res = await payload.find({
    collection: 'publications',
    depth: 2,
    limit,
    page,
  })

  return {
    posts: res.docs.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      author: post.author,
      publishedDate: post.createdAt,
      excerpt: post.content,
      coverImage: post.coverImage,
    })),
    pagination: {
      hasNextPage: res.hasNextPage,
      hasPrevPage: res.hasPrevPage,
      totalPages: res.totalPages,
      page: res.page,
    },
  }
}

export async function fetchRelatedPosts(currentSlug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: allBlogs } = await payload.find({
    collection: 'publications',
    depth: 1,
    limit: 4,
    where: {
      slug: {
        not_equals: currentSlug,
      },
    },
  })

  return allBlogs
}
