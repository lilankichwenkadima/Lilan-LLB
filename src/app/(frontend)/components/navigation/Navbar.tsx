'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Scale } from 'lucide-react'

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
          { label: 'About', link: '/about' },
          { label: 'Practice Areas', link: '/practice-areas' },
          { label: 'Attorneys', link: '/attorneys' },
          { label: 'Contact', link: '/contact' },
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
        className={`${scrolled ? 'bg-[#ffffff] border-b-4 border-[#f49200]' : 'bg-transparent'} transition-all duration-300`}
      >
        <div className="max-w-screen-xl px-4 lg:px-8 mx-auto">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div
                className={`flex items-center transition-all duration-300 ${scrolled ? 'bg-[#ffffff] p-2 rounded' : ''}`}
              >
                <Scale size={28} className="text-[#f49200] mr-2" />
                <div className="flex flex-col">
                  <span
                    className={`font-serif text-xl font-bold ${scrolled ? 'text-[#34373e]' : 'text-[#ffffff]'} tracking-wide`}
                  >
                    LILAN<span className="text-[#f49200]">KICHWEN</span>KADIMA
                  </span>
                  <span
                    className={`text-xs ${scrolled ? 'text-[#34373e]/80' : 'text-[#ffffff]/80'} tracking-wider uppercase`}
                  >
                    Attorneys & Counselors at Law
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((nav, index) => (
                <Link
                  key={index}
                  href={nav.link}
                  className={`${scrolled ? 'text-[#34373e]' : 'text-[#ffffff]'} hover:text-[#f49200] font-medium transition-colors duration-200`}
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
                className="text-[#34373e] hover:text-[#f49200] font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {nav.label}
              </Link>
            ))}
            <Button className="bg-[#f49200] hover:bg-[#e08600] text-white w-full">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
