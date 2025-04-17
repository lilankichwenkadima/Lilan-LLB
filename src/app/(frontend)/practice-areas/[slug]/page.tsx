import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { ArrowLeft, Phone, FileText, Users, ChevronRight } from 'lucide-react'
import { fetchAllPracticeAreas, fetchRelatedPracticeAreas } from '@/lib/practiceAreaUtils'
import { RichText } from '@/components/RichText'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'practice-areas',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const practiceArea = docs[0]

  if (!practiceArea) {
    return {
      title: 'Practice Area Not Found - Lilan | Kichwen | Kadima Advocates LLP',
      description:
        'The practice area you are looking for could not be found. Discover more about our expertise across various legal sectors.',
    }
  }

  const practiceAreaTitle =
    practiceArea.title || 'Practice Area - Lilan | Kichwen | Kadima Advocates LLP'
  const practiceAreaDescription = `Explore our expertise in ${practiceArea.title}. Lilan | Kichwen | Kadima Advocates LLP provides strategic legal solutions.`

  return {
    title: `${practiceAreaTitle} - Lilan | Kichwen | Kadima Advocates LLP`,
    description: practiceAreaDescription,
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
    openGraph: {
      title: `${practiceAreaTitle} - Lilan | Kichwen | Kadima Advocates LLP`,
      description: practiceAreaDescription,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/practice-areas/${slug}`,
      images: [
        {
          url: '/bg.jpg', // fallback image (unless you later add a specific coverImage field for practice areas)
          width: 1200,
          height: 630,
          alt: practiceArea.title,
        },
      ],
      type: 'article',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/practice-areas/${slug}`,
    },
  }
}

export default async function PracticeDescription({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({
    collection: 'practice-areas',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const practiceArea = docs[0]
  const data = await fetchRelatedPracticeAreas(slug)
  const relatedAreas = data.slice(0, 5).reverse()

  return (
    <>
      {/* Hero Section with Enhanced Gradient Background */}
      <div
        className="relative py-28 md:py-24"
        style={{
          background: 'linear-gradient(135deg, #003566 0%, #001d3d 100%)',
          overflow: 'hidden',
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/practice-areas"
              className="inline-flex items-center text-blue-300 hover:text-white mb-8 transition-colors bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Practice Areas
            </Link>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 shadow-lg">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {practiceArea?.title}
              </h1>

              <div className="h-1 w-24 bg-blue-300 mb-6"></div>

              <div className="flex items-center space-x-2 text-blue-100">
                <span className="text-sm uppercase tracking-wider">Department</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-lg font-medium text-white">
                  {typeof practiceArea.department === 'object' && practiceArea.department.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section with Enhanced UI */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-1 bg-[#003566]"></div>
              <div className="p-8 md:p-10">
                <div className="prose prose-lg max-w-none prose-headings:text-blue-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                  {practiceArea.description && (
                    <RichText data={practiceArea.description} className="richtext" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md overflow-hidden">
              <div className="p-1 bg-[#003566]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#003566] flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Get Expert Help</h3>
                </div>

                <p className="text-blue-800 mb-6">
                  Need assistance with {practiceArea?.title.toLowerCase()}? Our expert team is ready
                  to help you navigate your legal challenges.
                </p>

                <Link
                  href="tel:+254790039031"
                  className="w-full flex justify-center items-center bg-[#003566] hover:bg-[#003566cb] text-white font-medium py-4 px-2 rounded-lg transition-colors shadow-md"
                >
                  <Phone className="h-5 w-5 text-white mr-3" />
                  Call us: +254 790 039 031
                </Link>
              </div>
            </div>

            {/* Related Practice Areas */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-1 bg-[#003566]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#003566] flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Other Practice Areas</h3>
                </div>

                <div className="space-y-3">
                  {relatedAreas.map((area) => (
                    <Link
                      key={area.id}
                      href={`/practice-areas/${area.slug}`}
                      className="flex items-center justify-between p-4 bg-[#003566b6] hover:bg-blue-100 rounded-lg border border-blue-100 hover:border-blue-300 transition-all group"
                    >
                      <h4 className="text-white font-medium">{area.title}</h4>
                      <ChevronRight className="h-5 w-5 text-blue-400 group-hover:text-blue-600 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 border-t border-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12 border border-blue-100">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
                Ready to Work With Our {practiceArea?.title} Experts?
              </h2>

              <div className="h-1 w-24 bg-[#03437e] mx-auto mb-6"></div>

              <p className="text-blue-800 mb-8 text-lg">
                Our dedicated team is prepared to help you navigate the complexities of your case
                and achieve the best possible outcome.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const practiceAreas = await fetchAllPracticeAreas()
  return practiceAreas.map((area) => ({
    slug: area.slug,
  }))
}
