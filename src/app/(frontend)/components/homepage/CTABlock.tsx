'use client'
import React, { useEffect } from 'react'
import { PhoneCall } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

interface HeroBlockProps {
  block: {
    title: string
    description: string
  }
}

export default function CTABlock({ block }: HeroBlockProps) {
  // Default values if props are not provided
  const heading = block?.title || 'Let Us Help You'
  const subheading =
    block?.description || 'Let us help you navigate the complexities of the legal system.'

  // Setup intersection observer for scroll animations
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <section ref={ref} className="relative h-auto md:min-h-screen xl:min-h-[85vh] overflow-hidden">
      {/* Full-span background image with overlay */}

      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-black/40 z-0" />

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-10 right-10 sm:top-20 sm:right-20 w-48 sm:w-64 h-48 sm:h-64 bg-[#003566] rounded-full filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.25, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.div
        className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-64 sm:w-96 h-64 sm:h-96 bg-[#003566] rounded-full filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 2,
        }}
      />

      {/* Main content container */}
      <div className="container relative mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 py-32 md:py-32 z-10">
        {/* Content area - spans 7 columns on large screens */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {/* Accent line above heading */}
            <motion.div
              className="w-16 h-1 bg-[#003566] mb-6"
              variants={{
                hidden: { width: 0, opacity: 0 },
                visible: { width: 64, opacity: 1, transition: { duration: 0.8 } },
              }}
            />

            <motion.h1
              className="font-serif text-4xl sm:text-5xl xl:text-6xl font-bold mb-3 md:mb-6 text-white leading-tight"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              {heading}
            </motion.h1>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl leading-relaxed">
                {subheading}
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-8 md:items-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>
                <Link
                  href="/contact"
                  className="bg-[#003566] hover:bg-[#00274d] text-white px-6 sm:px-8 py-3 sm:py-4 text-lg rounded-lg shadow-xl flex items-center group transition-all duration-300 w-1/2 md:w-auto"
                >
                  Contact Us
                  <motion.div className="ml-2" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <PhoneCall className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>
                <Link
                  href="/practice-areas"
                  className="border-2 border-[#003566]/80 text-white hover:bg-[#003566]/20 px-6 sm:px-8 py-3 sm:py-4 text-lg rounded-lg transition-all duration-300 shadow-lg"
                >
                  Our Practice Areas
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side decorative elements - spans 5 columns on large screens */}
        <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center">
          {/* Floating scale of justice icon with glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.5, duration: 0.8 },
              },
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#003566]/30 rounded-full filter blur-xl scale-150" />
            <div className="w-50 h-50 rounded-full bg-[#003566]/20 backdrop-blur-md border border-white/20 flex items-center justify-center relative">
              <motion.div
                animate={{
                  rotateZ: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <h1 className="text-white text-8xl">CS</h1>
                <p className="text-base text-white">Advocates LLP</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Animated grid lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {[...Array(6)].map((_, i) => (
              <motion.line
                key={`horizontal-${i}`}
                x1="0"
                y1={20 + i * 12}
                x2="100"
                y2={20 + i * 12}
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 + i * 0.1 }}
              />
            ))}

            {[...Array(6)].map((_, i) => (
              <motion.line
                key={`vertical-${i}`}
                x1={20 + i * 12}
                y1="0"
                x2={20 + i * 12}
                y2="100"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 + i * 0.1 }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#003566] to-[#003566]/50 z-20">
        <motion.div
          className="h-full bg-white/50"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Top accent element */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#003566] z-20" />
    </section>
  )
}
