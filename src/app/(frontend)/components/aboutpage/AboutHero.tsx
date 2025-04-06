'use client'
import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface AboutHeroBlockProps {
  block: {
    clause: string
    photo: { url: string }
  }
}

export default function AboutHero({ block }: AboutHeroBlockProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.2 },
    },
  }

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: '6rem',
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 },
    },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  // Split the clause into words for staggered animation
  const words = block.clause.split(' ')

  return (
    <section
      ref={ref}
      className="relative w-full py-20 md:py-32 bg-[#003566] text-white overflow-hidden"
    >
      {/* Background design elements */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-white opacity-5"
        initial={{ x: 100, y: -100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 rounded-full bg-white opacity-5"
        initial={{ x: -50, y: 50 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <motion.div
            className="w-full md:w-1/2 order-2 md:order-1"
            initial="hidden"
            animate={controls}
            variants={fadeIn}
          >
            <motion.div variants={staggerChildren} className="mb-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {words.map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-2 mb-2"
                    variants={wordVariants}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            <motion.div className="h-1 bg-white rounded mb-8" variants={lineVariants} />

            <motion.p
              className="text-lg md:text-xl opacity-90 max-w-lg"
              variants={fadeIn}
              transition={{ delay: 0.6 }}
            >
              Discover our story, mission, and the values that drive everything we do.
            </motion.p>

            <motion.div className="mt-8" variants={fadeIn} transition={{ delay: 0.8 }}>
              <a
                href="#more"
                className="inline-flex items-center px-6 py-3 bg-white text-[#003566] font-medium rounded-lg hover:bg-opacity-90 transition-all duration-300"
              >
                Learn More
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 order-1 md:order-2"
            initial="hidden"
            animate={controls}
            variants={imageVariants}
          >
            <div className="relative">
              {/* Decorative frame */}
              <motion.div
                className="absolute -top-4 -left-4 w-full h-full border-2 border-white opacity-30 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1, duration: 0.8 }}
              />

              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <motion.img
                  src={block.photo.url}
                  alt="About us"
                  className="w-full h-auto object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-[#003566]/60 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2 }}
                />
              </div>

              {/* Floating accent elements */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-full opacity-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
              <motion.div
                className="absolute top-1/2 left-0 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full opacity-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave shape */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50L48 45.7C96 41.3 192 32.7 288 27.5C384 22.3 480 20.7 576 25C672 29.3 768 39.7 864 45.8C960 52 1056 54 1152 52.5C1248 51 1344 46 1392 43.5L1440 41V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
