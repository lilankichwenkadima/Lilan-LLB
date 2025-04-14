'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

interface NavItems {
  label: string
  link: string
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navItems, setNavItems] = useState<NavItems[]>([])
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const res = await fetch('/api/header')
        const data = await res.json()
        setNavItems(data.nav)
      } catch (error) {
        console.error('Failed to fetch navigation data', error)
        // Fallback navigation items
        setNavItems([
          { label: 'Home', link: '/' },
          { label: 'About', link: '/who-we-are' },
          { label: 'Practice Areas', link: '/practice-areas' },
          { label: 'Attorneys', link: '/our-team' },
          { label: 'Publications', link: '/publications' },
          { label: 'Contact', link: '/contact-use' },
        ])
      }
    }

    fetchNavItems()

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div
        className={`${scrolled ? 'bg-[#ffffff] border-b-4 border-[#003566]' : 'bg-white/80'} transition-all duration-300`}
      >
        <div className="max-w-screen-xl px-4 lg:px-8 mx-auto">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className={`flex items-center gap-2 transition-all duration-300`}>
                <Image src="/logo1.png" width={100} height={100} alt="logo image" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((nav, index) => (
                <Link
                  key={index}
                  href={nav.link}
                  className={`${scrolled ? 'text-[#34373e]' : 'text-[#003566]'} font-medium text-sm`}
                >
                  {nav.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`${scrolled ? 'text-[#34373e]' : 'text-[#ffffff]'}`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#ffffff] py-4 px-6 shadow-lg">
          <div className="flex flex-col space-y-4">
            {navItems.map((nav, index) => (
              <Link
                key={index}
                href={nav.link}
                className="text-[#34373e] hover:text-[#003566] font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {nav.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
