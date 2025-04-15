import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { fetchPaginatedPosts, fetchRelatedPosts } from '@/lib/postsUtil'
import { RichText } from '@/components/RichText'

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'publications',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  const post = docs[0]
  if (!post) {
    notFound()
  }

  // Format the published date
  const publishedDate = new Date(post.createdAt)
  const publishedDateFormatted = publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Get how long ago the post was published
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true })

  // Fetch related posts
  const data = await fetchRelatedPosts(slug)
  const relatedPosts = data.slice(0, 3)

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Cover Image with Parallax Effect */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        {post.coverImage ? (
          <div className="absolute inset-0 transform scale-105">
            <Image
              src={
                typeof post.coverImage === 'object' && post.coverImage.url
                  ? post.coverImage.url
                  : '/bg.jpg'
              }
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#003566] to-[#0077b6]">
            <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')]"></div>
          </div>
        )}
      </div>

      {/* Article Container */}
      <div className="container mx-auto px-6 relative">
        {/* Article Card */}
        <div className="bg-white rounded-2xl shadow-xl -mt-32 lg:-mt-40 overflow-hidden relative z-10">
          {/* Title Area */}
          <div className="p-6 md:p-10 lg:p-12 pb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>

            {/* Author and Date */}
            <div className="flex items-center mt-6 pb-6 border-b">
              <div className="h-12 w-12 rounded-full bg-[#003566]/10 flex items-center justify-center text-[#003566] font-bold text-xl">
                {post.author ? post.author.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900">{post.author || 'Unknown Author'}</div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span>{publishedDateFormatted}</span>
                  <span className="mx-2 text-xs">•</span>
                  <span>{timeAgo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-10 lg:p-12 pt-0 lg:pt-0">
            <article className="prose prose-lg max-w-none">
              <RichText data={post.content} className="richtext" />
            </article>
          </div>

          {/* Author Footer */}
          <div className="bg-gray-50 p-6 md:p-10">
            <div className="flex items-center">
              <div className="h-14 w-14 rounded-full bg-[#003566]/10 flex items-center justify-center text-[#003566] font-bold text-xl">
                {post.author ? post.author.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900">{post.author || 'Unknown Author'}</div>
                <div className="text-sm text-gray-500">Author</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-12 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Publications</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  href={`/publications/${relatedPost.slug}`}
                  key={relatedPost.id}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full transition transform hover:translate-y-1 hover:shadow-lg">
                    <div className="relative h-48 w-full">
                      {relatedPost.coverImage ? (
                        <Image
                          src={
                            typeof relatedPost.coverImage === 'object' && relatedPost.coverImage.url
                              ? relatedPost.coverImage.url
                              : '/bg.jpg'
                          }
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-r from-[#003566] to-[#0077b6]"></div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">
                        {new Date(relatedPost.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#003566] transition">
                        {relatedPost.title}
                      </h3>

                      {relatedPost.content && (
                        <RichText data={post.content} className="line-clamp-3" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/publications"
                className="inline-flex items-center px-6 py-3 bg-[#003566] text-white rounded-lg hover:bg-[#00284d] transition shadow-md"
              >
                <span>Browse All Publications</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const allPosts = await fetchPaginatedPosts(1, 100)
    return allPosts.posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
