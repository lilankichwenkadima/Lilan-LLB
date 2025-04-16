'use client'
import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

interface AboutUsBlockProps {
  block: {
    heading: string
    description: string
    teamDescription?: string
  }
}

export default function AboutUsSection({ block }: AboutUsBlockProps) {
  const heading = block?.heading || 'About Our Law Firm'
  const description =
    block?.description ||
    'With decades of combined experience, our attorneys provide strategic counsel and aggressive advocacy tailored to your unique legal challenges.'

  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section
      ref={ref}
      className="py-12 overflow-hidden relative bg-gradient-to-b from-white to-gray-50"
    >
      {/* Abstract decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#003566]/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#003566]/3 blur-3xl" />

      {/* Geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#003566" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="xl:container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          {/* Top decorative element */}
          <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
            <div className="h-12 w-1 bg-[#003566]" />
          </motion.div>

          {/* Badge */}
          <motion.div variants={fadeInUp} className="text-center mb-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#003566]/10 text-[#003566] font-medium text-sm">
              About Us
            </div>
          </motion.div>

          {/* Heading with decorative elements */}
          <motion.div variants={fadeInUp} className="text-center mb-12 relative">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 relative inline-block">
              {heading}
              <div className="absolute -bottom-4 left-0 w-full h-1 bg-[#003566]" />
            </h2>
          </motion.div>

          {/* Description with drop cap */}
          <motion.div variants={fadeInUp} className="prose prose-lg lg:prose-xl max-w-none mx-auto">
            <p className="leading-relaxed mb-8 text-justify about-p">{description}</p>
          </motion.div>

          {/* Stats section */}
          <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-8 my-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#003566] mb-2">40+</div>
              <div className="text-gray-600">Combined Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#003566] mb-2">5000+</div>
              <div className="text-gray-600">Cases Won</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#003566] mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <Link
              href="/who-we-are"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#003566] text-[#003566] font-medium hover:bg-[#003566] hover:text-white transition-colors duration-200 rounded"
            >
              Learn more about our expertise
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>

          {/* Bottom decorative element */}
          <motion.div variants={fadeInUp} className="mt-20 flex justify-center" custom={6}>
            <div className="flex space-x-2">
              <div className="h-1 w-1 rounded-full bg-[#003566]" />
              <div className="h-1 w-3 rounded-full bg-[#003566]" />
              <div className="h-1 w-6 rounded-full bg-[#003566]" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
