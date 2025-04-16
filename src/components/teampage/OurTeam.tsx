'use client'
import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter, User, X, Mail, Phone } from 'lucide-react'

interface OurTeamBlockProps {
  block: {
    attorney_profiles: Array<{
      id: number
      name: string
      slug: string
      role: string
      photo: {
        url: string
      }
      email?: string
      phone?: string
      practice_areas?: string[]
      experience_years?: number
      bio: string
    }>
  }
}

export default function OurTeam({ block }: OurTeamBlockProps) {
  const mainColor = '#003566'
  const accentColor = '#0066b2'
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  // Use provided attorneys from the block
  const attorneys = block.attorney_profiles

  // Extract unique roles for filtering
  const allRoles = useMemo(
    () => Array.from(new Set(attorneys.map((attorney) => attorney.role))),
    [attorneys],
  )

  // Filter attorneys based on search and role filters
  const filteredAttorneys = useMemo(
    () =>
      attorneys.filter((attorney) => {
        // Search filter
        const searchMatches =
          !searchTerm ||
          attorney.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          attorney.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          attorney.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (attorney.practice_areas &&
            attorney.practice_areas.some((area) =>
              area.toLowerCase().includes(searchTerm.toLowerCase()),
            ))

        // Role filter
        const roleMatches = selectedRoles.length === 0 || selectedRoles.includes(attorney.role)

        return searchMatches && roleMatches
      }),
    [attorneys, searchTerm, selectedRoles],
  )

  // Toggle role selection
  const handleRoleToggle = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedRoles([])
    setSearchTerm('')
  }

  return (
    <section
      className="py-32 md:py-24 lg:py-32 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${mainColor} 0%, #001F3F 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Our Legal Team</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Experienced attorneys dedicated to excellence in legal representation and client service
          </p>
          <div className="w-16 h-1 mx-auto mt-6 bg-white/30"></div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-auto relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-white/60" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white/50"
              placeholder="Search attorneys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-auto flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/10 hover:bg-white/20 transition-colors text-white py-2 px-4 rounded-lg flex items-center gap-2 text-sm border border-white/20"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Filter by Role'}
            </button>

            {(selectedRoles.length > 0 || searchTerm) && (
              <button
                onClick={clearFilters}
                className="text-white/80 text-sm flex items-center gap-1 hover:text-white transition-colors py-2 px-3"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Filters - Expandable */}
        {showFilters && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 mb-8 border border-white/20 animate-fadeIn">
            <h4 className="text-white/90 text-sm font-medium mb-4 flex items-center gap-2">
              <User className="h-4 w-4" /> Filter by Role
            </h4>
            <div className="flex flex-wrap gap-3">
              {allRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleToggle(role)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedRoles.includes(role)
                      ? 'bg-white text-blue-900'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="mb-6 text-white/80 text-sm">
          Showing {filteredAttorneys.length}{' '}
          {filteredAttorneys.length === 1 ? 'attorney' : 'attorneys'}
          {(selectedRoles.length > 0 || searchTerm) && ' with applied filters'}
        </div>

        {/* Attorney Cards Grid */}
        {filteredAttorneys.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttorneys.map((attorney) => (
              <div
                key={attorney.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    fill
                    src={attorney.photo?.url}
                    alt={attorney.name}
                    className="group-hover:scale-105 transition-transform duration-500 object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>

                <div className="relative p-6 flex flex-col flex-grow">
                  {/* Name and title */}
                  <div className="mb-3">
                    <div className="w-12 h-1 mb-2" style={{ backgroundColor: accentColor }}></div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
                      {attorney.name}
                    </h3>
                    <p className="text-gray-600">{attorney.role}</p>
                  </div>

                  {/* Contact buttons */}
                  <div className="flex gap-3 mt-3 mb-4">
                    {attorney.email && (
                      <a
                        href={`mailto:${attorney.email}`}
                        className="flex items-center justify-center p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                        aria-label={`Email ${attorney.name}`}
                        title={`Email ${attorney.name}`}
                      >
                        <Mail className="h-5 w-5 text-blue-900" />
                      </a>
                    )}
                    {attorney.phone && (
                      <a
                        href={`tel:${attorney.phone}`}
                        className="flex items-center justify-center p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                        aria-label={`Call ${attorney.name}`}
                        title={`Call ${attorney.name}`}
                      >
                        <Phone className="h-5 w-5 text-blue-900" />
                      </a>
                    )}
                  </div>

                  {/* Action button */}
                  <div className="mt-auto pt-2">
                    <Link
                      href={`/our-team/${attorney.slug}`}
                      className="inline-block py-2 px-4 w-full text-center text-sm font-medium text-white rounded-md hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: mainColor }}
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white py-16 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
            <p className="text-lg mb-3">No attorneys found matching your criteria</p>
            <p className="text-white/70 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="py-2 px-6 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
