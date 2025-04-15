'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

interface ServicesBlockProps {
  block: {
    practiceAreas: {
      id: number
      title: string
      slug: string
      department: {
        title: string
      }
    }[]
  }
}

export default function PracticeHeroSection({ block }: ServicesBlockProps) {
  const heading = 'Practice Areas'
  const practiceAreas = block?.practiceAreas || []
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024,
  )

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate grid columns based on screen width
  const getGridColumns = () => {
    if (windowWidth < 640) return 1
    if (windowWidth < 1024) return 2
    return 3
  }

  const columnCount = getGridColumns()

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
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: 'linear-gradient(135deg, #003566 0%, #001d3d 100%)',
      }}
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-xl md:text-3xl font-bold text-white mb-4 text-center tracking-tight"
          >
            {heading}
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="h-1 w-24 bg-white mx-auto mb-8 md:mb-12 rounded-full"
          />

          {practiceAreas.length > 0 ? (
            <motion.div variants={itemVariants}>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg">
                <table className="table-auto w-full">
                  <tbody className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
                    {practiceAreas.map((area) => (
                      <tr key={area.id} className="block">
                        <td className="block bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border-4 border-[#003566] shadow-md overflow-hidden">
                          <Link
                            href={`/practice-areas/${area.slug}`}
                            className="flex flex-col items-center justify-center h-[30vh] p-6 text-white hover:text-blue-200 transition-colors"
                          >
                            <span className="font-semibold text-xl mb-2 text-center">
                              {area.title}
                            </span>
                            <div className="w-12 h-px bg-white/40 my-2"></div>
                            <span className="text-xs text-blue-100 font-medium uppercase tracking-wider text-center">
                              {area.department.title}
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-white bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
              <p>No practice areas found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
