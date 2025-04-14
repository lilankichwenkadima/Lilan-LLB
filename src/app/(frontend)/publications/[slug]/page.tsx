import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { fetchPaginatedPosts } from '@/lib/postsUtil'
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

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Hero Banner with Image and Title */}
      <div className="relative w-full h-96 bg-[#003566]">
        {post.coverImage && (
          <div className="absolute inset-0 opacity-40">
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
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#003566] to-transparent"></div>

        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="max-w-4xl">
              <Link
                href="/publications"
                className="inline-flex items-center mb-6 text-white hover:text-blue-200 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Publications
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Author and Publication Date */}
            <div className="flex items-center mb-8 space-x-4">
              <div>
                <div className="font-medium text-[#003566]">{post.author || 'Unknown Author'}</div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span>{publishedDateFormatted}</span>
                  <span className="mx-2">•</span>
                  <span>{timeAgo}</span>
                </div>
              </div>
            </div>

            {/* Main Content */}

            <RichText data={post.content} className="" />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="sticky top-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                  Share This Publication
                </h4>
                <div className="flex space-x-4 text-gray-600">
                  <button className="hover:text-[#003566] transition" aria-label="Share on Twitter">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </button>
                  <button
                    className="hover:text-[#003566] transition"
                    aria-label="Share on LinkedIn"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </button>
                  <button className="hover:text-[#003566] transition" aria-label="Share by Email">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
