'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { X } from 'lucide-react'

interface Department {
  id: number
  title: string
  slug: string
  description?: string // Added for modal content
}

interface PracticeArea {
  id: number
  title: string
  slug: string
  department: {
    title: string
  }
}

interface ServicesBlockProps {
  block: {
    departments: Department[]
    practiceAreas: PracticeArea[]
  }
}

export default function PracticeHeroSection({ block }: ServicesBlockProps) {
  const departments = block?.departments || []
  const practiceAreas = block?.practiceAreas || []

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)

  // For responsive design
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024,
  )

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // For animations
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  // Modal handlers
  const openModal = (department: Department) => {
    setSelectedDepartment(department)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto'
  }

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: 'linear-gradient(135deg, #003566 0%, #001d3d 100%)',
        boxShadow: 'inset 0 0 80px rgba(0,0,0,0.3)',
      }}
      ref={ref}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/20 to-transparent"></div>
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-300/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-6xl mx-auto space-y-16"
        >
          {/* Departments Section */}
          {departments.length > 0 && (
            <motion.div variants={itemVariants}>
              <div className="text-center text-white mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Departments</h2>
                <div className="w-24 h-1 bg-blue-400 mx-auto mt-4 mb-4"></div>
                <p className="text-blue-100 max-w-2xl mx-auto">
                  Click on a department to learn more about our specialized legal expertise
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dep) => (
                  <motion.div
                    key={dep.id}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    <div
                      onClick={() => openModal(dep)}
                      className="cursor-pointer flex justify-center items-center bg-white/8 backdrop-blur-md rounded-xl md:h-[40vh] p-6 border border-white/20 text-white hover:bg-white/15 transition-all shadow-lg overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="text-center">
                        <h3 className="font-bold text-xl mb-2">{dep.title}</h3>
                        <div className="w-12 h-px bg-blue-300/50 mx-auto"></div>
                        <div className="mt-3 text-blue-100 text-sm">Click to view details</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Practice Areas Section */}
          {practiceAreas.length > 0 ? (
            <motion.div variants={itemVariants} className="pt-8">
              <div className="text-center text-white mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Practice Areas</h2>
                <div className="w-24 h-1 bg-blue-400 mx-auto mt-4 mb-4"></div>
                <p className="text-blue-100 max-w-2xl mx-auto">
                  Explore our specialized legal services across various domains
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {practiceAreas.map((area) => (
                  <motion.div key={area.id} whileHover={{ y: -5 }} className="h-full">
                    <Link
                      href={`/practice-areas/${area.slug}`}
                      className="block h-full rounded-xl overflow-hidden border-2 border-blue-400/30 shadow-lg transition-all duration-300 hover:shadow-blue-400/20 hover:border-blue-400/50"
                    >
                      <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white/10 to-white/5">
                        <h3 className="font-bold text-xl text-white text-center mb-4">
                          {area.title}
                        </h3>
                        <div className="w-12 h-1 bg-blue-300/50 mb-4"></div>
                        <span className="px-3 py-1.5 bg-blue-900/50 text-blue-200 rounded-full text-xs font-medium text-center border border-white">
                          {area.department.title}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-white bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
              <p>No practice areas found.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Department Modal */}
      {isModalOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="bg-gradient-to-br from-[#003566] to-tranparent rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-blue-400/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedDepartment?.title}</h2>
                <button onClick={closeModal} className="text-blue-200 hover:text-white p-1">
                  <X size={24} />
                </button>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-blue-100 text-justify text-base md:text-lg">
                  {selectedDepartment?.description}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
