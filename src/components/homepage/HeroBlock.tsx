'use client'
import React, { useEffect, useState } from 'react'
import { PhoneCall, ChevronRight, Scale, Shield, BookOpen } from 'lucide-react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

interface HeroBlockProps {
  block: {
    heading: string
    subheading: string
    hero_image: { url: string }
  }
}

export default function HeroBlock({ block }: HeroBlockProps) {
  // Default values if props are not provided
  const heading = block?.heading || 'Expert Legal Representation For Complex Matters'
  const subheading =
    block?.subheading ||
    'With decades of combined experience, our attorneys provide strategic counsel and aggressive advocacy tailored to your unique legal challenges.'
  const heroImage = block?.hero_image?.url || '/bg.jpg'

  // State to hold the background image load status
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [currentHighlight, setCurrentHighlight] = useState(0)

  const highlights = [
    { icon: Shield, text: 'Protecting your rights' },
    { icon: Scale, text: 'Justice with integrity' },
    { icon: BookOpen, text: 'Decades of experience' },
  ]

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

  // Preload the hero image when the component mounts
  useEffect(() => {
    const image = new window.Image()
    image.src = heroImage
    image.onload = () => {
      setIsImageLoaded(true)
    }
  }, [heroImage])

  // Rotate through highlights
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % highlights.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [highlights.length])

  return (
    <section ref={ref} className="relative h-auto md:min-h-screen xl:min-h-[85vh] overflow-hidden">
      {/* Full-span background image with overlay */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-fixed z-0 transition-opacity duration-1000 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url('${heroImage}')` }}
      />

      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/70 z-0" />

      {/* Pattern overlay for texture */}

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-10 right-10 sm:top-20 sm:right-20 w-48 sm:w-64 h-48 sm:h-64 bg-blue-700 rounded-full filter blur-3xl opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-64 sm:w-96 h-64 sm:h-96 bg-blue-700 rounded-full filter blur-3xl opacity-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 2,
        }}
      />

      {/* Main content container */}
      <div className="xl:container relative mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 py-32 md:py-32 z-10">
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
              className="w-16 h-1 bg-blue-600 mb-6"
              variants={{
                hidden: { width: 0, opacity: 0 },
                visible: { width: 64, opacity: 1, transition: { duration: 0.8 } },
              }}
            />

            <motion.h1
              className="hero-header text-4xl md:text-5xl xl:text-5xl font-bold mb-4 md:mb-6 text-white leading-tight"
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
              <p className="text-lg md:text-lg mb-6 text-white/90 max-w-2xl leading-relaxed">
                {subheading}
              </p>
            </motion.div>

            {/* Animated highlight banner */}
            <motion.div
              className="bg-blue-900/30 backdrop-blur-sm border border-blue-500/20 rounded-lg p-3 mb-8 max-w-lg overflow-hidden relative"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHighlight}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center"
                >
                  {React.createElement(highlights[currentHighlight].icon, {
                    className: 'w-5 h-5 text-blue-300 mr-3',
                  })}
                  <span className="text-blue-100 font-medium">
                    {highlights[currentHighlight].text}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }}
              />
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
              }}
            >
              <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>
                <Link
                  href="/contact-us"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base rounded-lg shadow-xl flex items-center justify-center group transition-all duration-300 w-full md:w-auto"
                >
                  Contact us today
                  <motion.div className="ml-2" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <PhoneCall className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>
                <Link
                  href="/practice-areas"
                  className="border-2 border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center"
                >
                  Our practice areas
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-3 mt-12 text-white/70"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { delay: 0.5, staggerChildren: 0.1 } },
              }}
            >
              {['40+ Years Combined Experience', '24/7 Client Support', 'Exceptional Counsel'].map(
                (item) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-2"
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                    <span className="text-sm md:text-base">{item}</span>
                  </motion.div>
                ),
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Right side decorative elements - spans 5 columns on large screens */}
        <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center">
          {/* Floating firm logo with glow */}
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
            <div className="absolute inset-0 bg-blue-600/30 rounded-full filter blur-xl scale-150" />
            <div className="w-64 h-64 rounded-full bg-white/80 backdrop-blur-md border border-blue-900 flex items-center justify-center relative">
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
                <Image src="/logo1.png" width={200} height={200} alt="logo image" />
              </motion.div>
            </div>

            {/* Orbiting elements */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute w-6 h-6 bg-[#003566] backdrop-blur-sm rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  margin: '-12px 0 0 -12px',
                }}
                animate={{
                  x: Math.cos((i / 3) * Math.PI * 2 + Math.PI / 6) * 160,
                  y: Math.sin((i / 3) * Math.PI * 2 + Math.PI / 6) * 160,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  delay: i * 3.33,
                  ease: 'linear',
                }}
              >
                <div className="w-full h-full rounded-full bg-blue-400/30 animate-ping" />
              </motion.div>
            ))}
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
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-700 to-blue-500 z-20">
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
      <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 z-20" />
    </section>
  )
}
