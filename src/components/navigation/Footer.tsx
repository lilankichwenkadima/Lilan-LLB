'use client'
import Link from 'next/link'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
} from 'lucide-react'

export default function Footer() {
  const navItems = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/who-we-are' },
    { label: 'Insights', link: '/publications' },
    { label: 'Contact', link: '/contact-us' },
  ]

  return (
    <footer className="bg-[#00274d] py-16 px-8 md:px-12 lg:px-16">
      {/* Top accent line */}
      <div className="h-px bg-[#003566] w-full mb-16"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {/* Column 1: Logo and Info */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#003566]/40 flex items-center justify-center">
              <span className="text-white text-xs font-bold">CS</span>
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-white">
                LILAN<span className="text-[#74b1dd]">KICHWEN</span>KADIMA
              </h2>
              <p className="text-xs text-white/80 uppercase tracking-wider">Attorneys at Law</p>
            </div>
          </div>

          <p className="text-white/80 text-sm leading-relaxed">
            With decades of combined experience, our attorneys provide strategic counsel and
            aggressive advocacy tailored to your unique legal challenges.
          </p>

          <div className="flex gap-4">
            <a href="#" className="text-white/80 hover:text-[#74b1dd] transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-white/80 hover:text-[#74b1dd] transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-white/80 hover:text-[#74b1dd] transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-white/80 hover:text-[#74b1dd] transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-8">
          <h3 className="font-serif text-white text-lg">Quick Links</h3>

          <ul className="space-y-4">
            {navItems.map((nav, index) => (
              <li key={index}>
                <Link
                  href={nav.link}
                  className="text-white/70 hover:text-[#74b1dd] transition-colors text-sm flex items-center group"
                >
                  <ChevronRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="space-y-8">
          <h3 className="font-serif text-white text-lg">Contact</h3>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#74b1dd] flex-shrink-0 mt-1" />
              <p className="text-white/70 text-sm">
                Madonna House, 3rd Floor, A312
                <br />
                Nairobi, Kenya
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#74b1dd] flex-shrink-0" />
              <a
                href="mailto:info@lkkadvocates.com"
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                info@lilankichwenkadima.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#74b1dd] flex-shrink-0" />
              <a
                href="tel: +254 790 039 031
"
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                +254 790 039 031
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with copyright and links */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} LilanKichwenKadima Advocates LLP. All rights reserved.
          </p>

          <div className="flex gap-8">
            <p className="text-white/50 text-xs">
              Strategic, ethical, and results-driven legal solutions
            </p>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-px bg-[#003566] w-full mt-16"></div>
    </footer>
  )
}
