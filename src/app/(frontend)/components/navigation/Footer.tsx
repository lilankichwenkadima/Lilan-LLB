'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  ArrowRight,
  MapPin,
  Phone,
  ChevronRight,
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const footerElement = document.getElementById('site-footer')
      if (!footerElement) return

      const rect = footerElement.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight - 200
      if (isVisible) {
        setAnimateIn(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Trigger once to check initial visibility
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer id="site-footer" className="bg-[#00274d] relative overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 bg-[#003566] w-full"></div>

      {/* Animated decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#003566] rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#003566] rounded-full filter blur-3xl opacity-10"></div>

      {/* Footer main content */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          animate={animateIn ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Column 1: Logo and Info */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#003566]/20 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center relative">
                <h1 className="text-white text-xs">CS</h1>
                <p className="text-[0.2rem] text-white">Advocates LLP</p>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold text-white tracking-wide">
                  LILAN<span className="text-[#74b1dd]">KICHWEN</span>KADIMA
                </span>
                <span className="text-[0.4rem] text-white/80 tracking-wider uppercase">
                  Attorneys & Counselors at Law
                </span>
              </div>
            </div>

            <p className="mb-6 text-white/80 leading-relaxed">
              With decades of combined experience, our attorneys provide strategic counsel and
              aggressive advocacy tailored to your unique legal challenges.
            </p>

            <div className="flex items-center space-x-1">
              <motion.a
                href="#"
                className="w-9 h-9 rounded-full bg-[#003566] hover:bg-[#74b1dd] flex items-center justify-center transition-colors duration-300"
                whileHover={{ y: -3, transition: { duration: 0.3 } }}
              >
                <Facebook size={16} className="text-white" />
              </motion.a>
              <motion.a
                href="#"
                className="w-9 h-9 rounded-full bg-[#003566] hover:bg-[#74b1dd] flex items-center justify-center transition-colors duration-300"
                whileHover={{ y: -3, transition: { duration: 0.3 } }}
              >
                <Twitter size={16} className="text-white" />
              </motion.a>
              <motion.a
                href="#"
                className="w-9 h-9 rounded-full bg-[#003566] hover:bg-[#74b1dd] flex items-center justify-center transition-colors duration-300"
                whileHover={{ y: -3, transition: { duration: 0.3 } }}
              >
                <Instagram size={16} className="text-white" />
              </motion.a>
              <motion.a
                href="#"
                className="w-9 h-9 rounded-full bg-[#003566] hover:bg-[#74b1dd] flex items-center justify-center transition-colors duration-300"
                whileHover={{ y: -3, transition: { duration: 0.3 } }}
              >
                <Linkedin size={16} className="text-white" />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-lg font-bold mb-6 text-white flex items-center">
              <span className="w-8 h-1 bg-[#003566] mr-3"></span>
              Quick Links
            </h3>

            <ul className="space-y-3">
              {['Home', 'About', 'Practice Areas', 'Attorneys', 'Contact', 'Blog'].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '-')}`}
                      className="text-white/80 hover:text-white flex items-center group transition-colors duration-200"
                    >
                      <ChevronRight
                        size={16}
                        className="mr-2 text-[#74b1dd] transform group-hover:translate-x-1 transition-transform"
                      />
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          {/* Column 3: Practice Areas */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-lg font-bold mb-6 text-white flex items-center">
              <span className="w-8 h-1 bg-[#003566] mr-3"></span>
              Practice Areas
            </h3>

            <ul className="space-y-3">
              {[
                'Corporate Law',
                'Real Estate',
                'Litigation',
                'Family Law',
                'Criminal Defense',
                'Intellectual Property',
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/practice-areas/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-white/80 hover:text-white flex items-center group transition-colors duration-200"
                  >
                    <ChevronRight
                      size={16}
                      className="mr-2 text-[#74b1dd] transform group-hover:translate-x-1 transition-transform"
                    />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Us */}
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-lg font-bold mb-6 text-white flex items-center">
              <span className="w-8 h-1 bg-[#003566] mr-3"></span>
              Get In Touch
            </h3>

            <div className="space-y-5">
              <div className="flex items-start">
                <MapPin size={18} className="text-[#74b1dd] mt-1 mr-3 flex-shrink-0" />
                <p className="text-white/80">
                  123 Legal Avenue, Suite 500
                  <br />
                  Nairobi, Kenya
                </p>
              </div>

              <div className="flex items-center">
                <Mail size={18} className="text-[#74b1dd] mr-3 flex-shrink-0" />
                <a
                  href="mailto:info@lkkadvocates.com"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  info@lkkadvocates.com
                </a>
              </div>

              <div className="flex items-center">
                <Phone size={18} className="text-[#74b1dd] mr-3 flex-shrink-0" />
                <a
                  href="tel:+254715337850"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  +254 715 337850
                </a>
              </div>

              <div className="pt-3">
                <div className="flex items-center">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-3 rounded-l-md focus:outline-none bg-white/10 text-white placeholder:text-white/50 w-full border-l border-y border-[#003566]"
                  />
                  <button className="bg-[#003566] hover:bg-[#74b1dd] px-4 py-3 rounded-r-md border-r border-y border-[#003566] transition-colors duration-300">
                    <ArrowRight size={18} className="text-white" />
                  </button>
                </div>
                <p className="mt-2 text-xs text-white/60">Subscribe to our newsletter</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar with copyright info */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} LilanKichwenKadima Advocates LLP. All rights
              reserved.
            </p>

            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-white/70 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="text-white/70 hover:text-white transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent bar with animation */}
      <div className="h-2 bg-gradient-to-r from-[#003566] to-[#003566]/50 relative overflow-hidden">
        <motion.div
          className="h-full w-1/3 bg-white/50"
          animate={{
            x: ['-100%', '400%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      </div>
    </footer>
  )
}
