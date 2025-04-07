'use client'
import React, { useState, useEffect, JSX } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ServicesBlockProps {
  block: {
    heading?: string
    practiceAreas: {
      id: number
      title: string
      description: string
      icon?: string
    }[]
  }
}

export default function ServicesCarouselSection({ block }: ServicesBlockProps) {
  const heading = block?.heading || 'Our Services'

  // Example practice areas if none provided
  const practiceAreas = block?.practiceAreas

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(practiceAreas.length / itemsPerPage)

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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    }),
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
  }

  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerPage
    return practiceAreas.slice(startIndex, startIndex + itemsPerPage)
  }

  // Function to get icon component based on name
  const getIconComponent = (iconName: string = 'circle') => {
    const icons: { [key: string]: JSX.Element } = {
      briefcase: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      scale: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 3 4 7l4 4" />
          <path d="M12 21H4a2 2 0 0 1-2-2V7l4-4" />
          <path d="M16 3l4 4-4 4" />
          <path d="M12 21h8a2 2 0 0 0 2-2V7l-4-4" />
        </svg>
      ),
      home: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      lightbulb: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 14c.2-1 .7-1.8 1.5-2.5A5 5 0 0 0 14 6.5a5 5 0 0 0-7 4.9 5 5 0 0 0 1.7 3.8c.9.6 1.3 1.4 1.3 2.3v.5h4v-.5c0-1 .4-1.8 1-2.5Z" />
          <path d="M10 20.4A1.4 1.4 0 0 0 11.4 19h1.2a1.4 1.4 0 0 0 1.4 1.4h0a1.4 1.4 0 0 0 1.4-1.4v-.4h-6v.4a1.4 1.4 0 0 0 1.4 1.4Z" />
        </svg>
      ),
      'file-text': (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      ),
      circle: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    }

    return icons[iconName] || icons.circle
  }

  return (
    <section ref={ref} className="py-24 bg-[#003566] text-white relative overflow-hidden">
      {/* Abstract decorative elements - lighter version for dark bg */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

      {/* Geometric pattern - lighter for dark bg */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-light)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="text-center mb-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white font-medium text-sm">
              Our Services
            </div>
          </motion.div>

          {/* Heading with decorative elements */}
          <motion.div variants={fadeInUp} className="text-center mb-16 relative">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white relative inline-block">
              {heading}
              <div className="absolute -bottom-4 left-0 w-full h-1 bg-white/30" />
            </h2>
          </motion.div>

          {/* Carousel */}
          <motion.div variants={fadeInUp} className="relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {getCurrentItems().map((service) => (
                  <div
                    key={service.id}
                    className="bg-white/5 backdrop-blur-lg rounded-lg p-8 flex flex-col transition-all border border-white/10 hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="rounded-full bg-white/10 w-12 h-12 flex items-center justify-center mb-6 text-white">
                      {getIconComponent(service.icon)}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                    <p className="text-white/80 mb-6 flex-grow">{service.description}</p>
                    <Link
                      href={`/practice-areas/${service.id}`}
                      className="inline-flex items-center text-white font-medium hover:underline mt-auto"
                    >
                      Learn more
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
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="flex justify-center items-center mt-12 space-x-4">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              {/* Pagination dots */}
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1)
                      setCurrentIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentIndex === index ? 'bg-white w-6' : 'bg-white/40'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next slide"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 text-white font-medium hover:bg-white hover:text-[#003566] transition-colors duration-200 rounded"
            >
              View all practice areas
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
        </motion.div>
      </div>
    </section>
  )
}
