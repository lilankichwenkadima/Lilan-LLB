'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleTeamDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setTeamDropdownOpen(!teamDropdownOpen)
  }

  const navItems = [
    { label: 'Home', link: '/' },
    {
      label: 'Who We Are',
      link: '/who-we-are',
      hasDropdown: true,
      dropdownItems: [{ label: 'Our Team', link: '/our-team' }],
    },
    { label: 'Practice Areas', link: '/practice-areas' },
    { label: 'Publications', link: '/publications' },
    { label: 'Office Details', link: '/office-details' },
    { label: 'Contact Us', link: '/contact-us' },
  ]

  useEffect(() => {
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
        className={`${scrolled ? 'bg-[#ffffff] border-b-4 border-[#003566]' : 'bg-transparent'} transition-all duration-300`}
      >
        <div className="max-w-screen-xl px-4 lg:px-8 mx-auto">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div
                className={`flex items-center gap-2 transition-all duration-300 ${scrolled ? 'bg-[#ffffff] p-2 rounded' : ''}`}
              >
                <div
                  className={`w-12 h-12 rounded-full ${scrolled ? 'bg-[#003566]' : 'bg-[#003566]/20'}  backdrop-blur-md border border-white/20 flex flex-col items-center justify-center relative`}
                >
                  <h1 className="text-white text-lg">CS</h1>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`logo-name font-serif text-sm md:text-xl font-bold ${scrolled ? 'text-[#34373e]' : 'text-[#ffffff]'} tracking-wide`}
                  >
                    LILAN | KICHWEN | KADIMA
                  </span>
                  <span
                    className={`text-xs ${scrolled ? 'text-[#34373e]/80' : 'text-[#ffffff]/80'} tracking-wider uppercase`}
                  >
                    Advocates LLP
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.hasDropdown ? (
                    <div className="flex items-center">
                      <Link
                        href={item.link}
                        className={`${scrolled ? 'text-[#34373e]' : 'text-white'} font-medium text-sm hover:text-[#b5d7f7]`}
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="focus:outline-none ml-1"
                        aria-label="Toggle dropdown"
                      >
                        <ChevronDown
                          size={16}
                          className={`${scrolled ? 'text-[#34373e]' : 'text-white'} group-hover:text-[#b5d7f7]`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute top-6 left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                          <Link
                            key={dropdownIndex}
                            href={dropdownItem.link}
                            className="block px-4 py-2 text-sm text-[#34373e] hover:bg-gray-100 hover:text-[#003566]"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      className={`${scrolled ? 'text-[#34373e]' : 'text-white'} font-medium text-sm hover:text-[#b5d7f7]`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`${scrolled ? 'text-[#34373e]' : 'text-white'}`}
                aria-label="Toggle mobile menu"
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
            {navItems.map((item, index) => (
              <div key={index}>
                {item.hasDropdown ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.link}
                        className="text-[#34373e] hover:text-[#003566] font-medium transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={toggleTeamDropdown}
                        className="text-[#34373e] focus:outline-none p-1"
                        aria-label="Toggle team dropdown"
                      >
                        <ChevronDown
                          size={16}
                          className={`transform ${teamDropdownOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}
                        />
                      </button>
                    </div>

                    {teamDropdownOpen && (
                      <div className="pl-4 mt-2 space-y-2">
                        {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                          <Link
                            key={dropdownIndex}
                            href={dropdownItem.link}
                            className="block text-[#34373e] hover:text-[#003566] font-medium transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.link}
                    className="text-[#34373e] hover:text-[#003566] font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
