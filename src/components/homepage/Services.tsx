'use client'
import React, { useState, useEffect } from 'react'
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
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                    <Link
                      href={`/practice-areas/${service.id}`}
                      className="inline-flex text-sm items-center text-white font-medium hover:underline mt-auto"
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
