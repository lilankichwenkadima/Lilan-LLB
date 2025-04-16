'use client'
import React from 'react'
import { Target, Eye } from 'lucide-react'
import Link from 'next/link'

interface GoalsBlockProps {
  block: {
    mission: string
    vision: string
  }
}

export default function GoalsSection({ block }: GoalsBlockProps) {
  const mainColor = '#003566'
  const lightMainColor = '#e5edf5'

  // Default values in case none are provided
  const mission = block.mission

  const vision = block.vision

  return (
    <section className="py-16" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 transition-transform hover:translate-y-[-5px]"
            style={{ borderColor: mainColor }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: lightMainColor }}>
                  <Target size={28} style={{ color: mainColor }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: mainColor }}>
                  Our Mission
                </h3>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 text-justify">{mission}</p>
            </div>
          </div>

          {/* Vision Card */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 transition-transform hover:translate-y-[-5px]"
            style={{ borderColor: mainColor }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: lightMainColor }}>
                  <Eye size={28} style={{ color: mainColor }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: mainColor }}>
                  Our Vision
                </h3>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 text-justify">{vision}</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="p-8 rounded-lg" style={{ backgroundColor: lightMainColor }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: mainColor }}>
              Want to learn more about our approach?
            </h3>
            <p className="text-gray-600 mb-8">
              Schedule a consultation with one of our experienced attorneys today.
            </p>
            <Link
              href="/contact-us"
              className="px-6 py-4 rounded-lg text-white font-medium transition-all hover:opacity-90 shadow-md"
              style={{ backgroundColor: mainColor }}
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
