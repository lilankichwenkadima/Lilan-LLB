'use client'
import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Users, Award, BookOpen, Clock } from 'lucide-react'

interface AboutUsBlockProps {
  block: {
    heading: string
    description: string
    teamDescription?: string
    stats?: {
      years: number
      cases: number
      clients: number
      awards: number
    }
  }
}

export default function AboutUsSection({ block }: AboutUsBlockProps) {
  const heading = block?.heading || 'About Our Law Firm'
  const description =
    block?.description ||
    'With decades of combined experience, our attorneys provide strategic counsel and aggressive advocacy tailored to your unique legal challenges.'

  const stats = block?.stats || {
    years: 25,
    cases: 1000,
    clients: 750,
    awards: 15,
  }

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
    <section ref={ref} className="bg-white py-24 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#003566]/5" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#003566]/5" />

      <motion.div
        className="absolute top-1/4 right-10 w-4 h-4 rounded-full bg-[#003566]"
        animate={{
          y: [0, 100, 0],
          opacity: [0.8, 0.3, 0.8],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-16 w-6 h-6 rounded-full bg-[#003566]/30"
        animate={{
          y: [0, -80, 0],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left column - Main content */}
          <div className="lg:col-span-6 lg:pr-12">
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="inline-block px-3 py-1 rounded-full bg-[#003566]/10 text-[#003566] font-medium text-sm mb-4">
                About Us
              </div>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl font-bold mb-6 text-gray-900"
            >
              {heading}
            </motion.h2>

            <motion.div variants={fadeInUp} className="w-16 h-1 bg-[#003566] mb-8" />

            <motion.p variants={fadeInUp} className="text-lg text-gray-700 mb-8 leading-relaxed">
              {description}
            </motion.p>
          </div>

          {/* Right column - Stats and image */}
          <div className="lg:col-span-6">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.3,
                  },
                },
              }}
              className="relative mb-16 rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Replace with your actual image */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <div className="w-full h-full bg-gradient-to-br from-[#003566] to-[#001a33] flex items-center justify-center text-white text-lg">
                  <p className="text-center">Team Image Placeholder</p>
                </div>
              </div>

              {/* Accent border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#003566]">
                <motion.div
                  className="h-full bg-white/50"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-6">
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-lg border-t-2 border-[#003566]"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#003566]/10 flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-[#003566]" />
                  </div>
                  <h3 className="text-gray-700 font-medium">Experience</h3>
                </div>
                <p className="text-3xl font-bold text-[#003566]">{stats.years}+</p>
                <p className="text-gray-600">Years of Practice</p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-lg border-t-2 border-[#003566]"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#003566]/10 flex items-center justify-center mr-3">
                    <BookOpen className="w-5 h-5 text-[#003566]" />
                  </div>
                  <h3 className="text-gray-700 font-medium">Cases</h3>
                </div>
                <p className="text-3xl font-bold text-[#003566]">{stats.cases}+</p>
                <p className="text-gray-600">Successfully Handled</p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-lg border-t-2 border-[#003566]"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#003566]/10 flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-[#003566]" />
                  </div>
                  <h3 className="text-gray-700 font-medium">Clients</h3>
                </div>
                <p className="text-3xl font-bold text-[#003566]">{stats.clients}+</p>
                <p className="text-gray-600">Satisfied Clients</p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-lg border-t-2 border-[#003566]"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#003566]/10 flex items-center justify-center mr-3">
                    <Award className="w-5 h-5 text-[#003566]" />
                  </div>
                  <h3 className="text-gray-700 font-medium">Recognition</h3>
                </div>
                <p className="text-3xl font-bold text-[#003566]">{stats.awards}</p>
                <p className="text-gray-600">Industry Awards</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
