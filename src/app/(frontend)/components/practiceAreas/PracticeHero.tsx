'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

interface ServicesBlockProps {
  block: {
    practiceAreas: {
      id: number
      title: string
      description: string
      icon?: string
    }[]
  }
}

export default function PracticeHeroSection({ block }: ServicesBlockProps) {
  const heading = 'Practice Areas'
  const practiceAreas = block?.practiceAreas || []

  const [activeAreaIndex, setActiveAreaIndex] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      className="relative overflow-hidden py-20 md:py-24"
      style={{
        background: 'linear-gradient(135deg, #003566 0%, #001d3d 100%)',
      }}
      ref={ref}
    >
      {/* Enhanced geometric background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.6" />
            </pattern>
            <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          <rect width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-white mb-4 text-center tracking-tight"
          >
            {heading}
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="h-1 w-24 bg-gradient-to-r from-blue-400 to-cyan-300 mx-auto mb-12 md:mb-16 rounded-full"
          />

          {practiceAreas.length > 0 ? (
            <>
              {/* Desktop View - Split Layout */}
              <div className="hidden md:flex flex-col lg:flex-row gap-10">
                {/* Left Side - Detailed Description */}
                <div className="lg:w-3/5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeAreaIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="bg-gradient-to-br from-white/10 to-transparent backdrop-filter backdrop-blur-md rounded-2xl p-8 border border-white/10 h-full shadow-xl shadow-blue-900/10"
                    >
                      {practiceAreas[activeAreaIndex].icon && (
                        <div className="text-cyan-300 mb-6 text-4xl">
                          <i className={practiceAreas[activeAreaIndex].icon}></i>
                        </div>
                      )}
                      <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">
                        {practiceAreas[activeAreaIndex].title}
                      </h3>
                      <p className="text-blue-50 mb-8 leading-relaxed text-lg line-clamp-4">
                        {practiceAreas[activeAreaIndex].description}
                      </p>
                      <Link
                        href={`/practice-areas/${practiceAreas[activeAreaIndex].id}`}
                        className="inline-flex items-center text-cyan-300 hover:text-white transition-colors group text-lg"
                      >
                        Learn more
                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Side - Stacked Boxes */}
                <div className="lg:w-2/5 flex flex-col gap-3">
                  {practiceAreas.map((area, index) => (
                    <motion.div
                      key={area.id}
                      variants={itemVariants}
                      className={`${
                        index === activeAreaIndex
                          ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border-cyan-400/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      } backdrop-filter backdrop-blur-md rounded-xl p-5 border cursor-pointer transition-all duration-300`}
                      onClick={() => setActiveAreaIndex(index)}
                    >
                      <div className="flex items-center">
                        {area.icon && (
                          <div
                            className={`${index === activeAreaIndex ? 'text-white' : 'text-cyan-300'} mr-4 text-2xl`}
                          >
                            <i className={area.icon}></i>
                          </div>
                        )}
                        <h3
                          className={`${index === activeAreaIndex ? 'text-white' : 'text-blue-50'} font-medium text-lg tracking-tight`}
                        >
                          {area.title}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile View - Accordion Style */}
              <div className="md:hidden space-y-4">
                {practiceAreas.map((area, index) => (
                  <motion.div key={area.id} variants={itemVariants} className="overflow-hidden">
                    <div
                      className={`${
                        index === activeAreaIndex
                          ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border-cyan-400/50'
                          : 'bg-white/5 border-white/10'
                      } backdrop-filter backdrop-blur-md rounded-xl p-4 border cursor-pointer transition-all duration-300`}
                      onClick={() => setActiveAreaIndex(index === activeAreaIndex ? index : index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {area.icon && (
                            <div
                              className={`${index === activeAreaIndex ? 'text-white' : 'text-cyan-300'} mr-3 text-xl`}
                            >
                              <i className={area.icon}></i>
                            </div>
                          )}
                          <h3
                            className={`${index === activeAreaIndex ? 'text-white' : 'text-blue-50'} font-medium`}
                          >
                            {area.title}
                          </h3>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-cyan-300 transition-transform duration-300 ${
                            index === activeAreaIndex ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {index === activeAreaIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-gradient-to-b from-blue-600/10 to-transparent backdrop-filter backdrop-blur-sm rounded-b-xl px-4 py-5 border-x border-b border-white/10"
                        >
                          <p className="text-blue-50 mb-5 text-sm leading-relaxed">
                            {area.description}
                          </p>
                          <Link
                            href={`/practice-areas/${area.id}`}
                            className="inline-flex items-center text-cyan-300 text-sm hover:text-white transition-colors group"
                          >
                            Learn more
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-white bg-white/5 backdrop-filter backdrop-blur-md rounded-xl p-8 border border-white/10">
              <p>No practice areas found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
