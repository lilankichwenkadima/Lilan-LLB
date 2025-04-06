import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { ArrowLeft, Phone } from 'lucide-react'

export async function fetchAllPracticeAreas() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: practiceAreas } = await payload.find({
    collection: 'practice-areas',
    depth: 2,
    limit: 1000,
  })

  return practiceAreas.map((area) => ({
    id: area.id,
  }))
}

export async function fetchRelatedPracticeAreas(currentId: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: practiceAreas } = await payload.find({
    collection: 'practice-areas',
    depth: 1,
    limit: 3,
    where: {
      id: {
        not_equals: currentId,
      },
    },
  })

  return practiceAreas
}

export default async function PracticeDescription({ params }: { params: { id: string } }) {
  const par = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({
    collection: 'practice-areas',
    where: {
      id: {
        equals: par.id,
      },
    },
  })

  const practiceArea = docs[0]
  const relatedAreas = await fetchRelatedPracticeAreas(par.id)

  // Split the description into paragraphs for better formatting
  const descriptionParagraphs = practiceArea?.description?.split('\n\n') || ['']

  return (
    <>
      {/* Hero Section with Gradient Background */}
      <div
        className="relative py-16 md:py-24"
        style={{
          background: 'linear-gradient(to bottom, #003566, #001d3d)',
          overflow: 'hidden',
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/practice-areas"
              className="inline-flex items-center text-blue-300 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Practice Areas
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {practiceArea?.title}
            </h1>
            <div className="h-1 w-24 bg-blue-300 mb-8"></div>
            <p className="text-lg text-blue-100">{descriptionParagraphs[0]}</p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              {descriptionParagraphs.slice(1).map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Process Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">Our Approach</h2>
              <div className="space-y-8">
                {['Consultation', 'Assessment', 'Strategy', 'Implementation'].map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#003566] text-white font-bold">
                        {index + 1}
                      </div>
                      {index < 3 && <div className="w-px h-16 bg-blue-200 mx-auto mt-2"></div>}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-800 mb-2">{step}</h3>
                      <p className="text-gray-600">
                        {index === 0 &&
                          'We begin with a thorough consultation to understand your specific needs and circumstances.'}
                        {index === 1 &&
                          'Our experts assess your situation and identify the most effective approach for your case.'}
                        {index === 2 &&
                          'We develop a custom strategy tailored to your unique goals and requirements.'}
                        {index === 3 &&
                          'We implement our plan with precision and dedication to achieve the best possible outcome.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Get Expert Help</h3>
              <p className="text-gray-600 mb-6">
                Need assistance with {practiceArea?.title.toLowerCase()}? Our expert team is ready
                to help you.
              </p>

              <Link
                href="tel:+254742954153"
                className="w-full flex justify-center items-center bg-[#003566] hover:bg-blue-700 text-white font-medium py-4 px-2 rounded transition-colors"
              >
                <Phone className="h-5 w-5 text-white mr-3" />
                Call us: +2547 429 54153
              </Link>
            </div>

            {/* Related Practice Areas */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Related Practice Areas</h3>
              <div className="space-y-4">
                {relatedAreas.map((area) => (
                  <Link
                    key={area.id}
                    href={`/practice-areas/${area.id}`}
                    className="block p-4 bg-white rounded border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <h4 className="text-gray-800 font-medium">{area.title}</h4>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{area.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Ready to Work With Our {practiceArea?.title} Experts?
            </h2>
            <p className="text-gray-600 mb-8">
              Our dedicated team is prepared to help you navigate the complexities of your case and
              achieve the best possible outcome.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-[#003566] hover:bg-blue-700 text-white font-medium py-3 px-6 rounded shadow-md transition-colors">
                Contact Us Now
              </button>
              <button className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-6 rounded border border-blue-200 shadow-sm transition-colors">
                View All Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const practiceAreas = await fetchAllPracticeAreas()
  return practiceAreas.map((area) => ({
    id: String(area.id),
  }))
}
