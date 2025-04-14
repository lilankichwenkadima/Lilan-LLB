'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter, User, Briefcase, X } from 'lucide-react'

interface OurTeamBlockProps {
  block: {
    attorney_profiles: Array<{
      id: number
      name: string
      role: string
      bio: string
      photo: {
        url: string
      }
      practice_areas?: string[]
      experience_years?: number
    }>
  }
}

export default function OurTeam({ block }: OurTeamBlockProps) {
  const mainColor = '#003566'
  const accentColor = '#0066b2'
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState<string>('')

  // Use provided attorneys or defaults
  const attorneys = block.attorney_profiles

  // Extract all unique roles for filtering
  const allRoles = Array.from(new Set(attorneys.map((attorney) => attorney.role)))

  // Filter attorneys based on search term and filters
  const filteredAttorneys = attorneys.filter((attorney) => {
    // Search term filter
    const matchesSearch =
      attorney.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attorney.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attorney.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (attorney.practice_areas &&
        attorney.practice_areas.some((area) =>
          area.toLowerCase().includes(searchTerm.toLowerCase()),
        ))

    // Role filter
    const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(attorney.role)

    // Experience filter
    let matchesExperience = true
    if (selectedExperience) {
      if (
        selectedExperience === 'less-than-5' &&
        attorney.experience_years &&
        attorney.experience_years >= 5
      ) {
        matchesExperience = false
      } else if (
        selectedExperience === '5-10' &&
        attorney.experience_years &&
        (attorney.experience_years < 5 || attorney.experience_years > 10)
      ) {
        matchesExperience = false
      } else if (
        selectedExperience === 'more-than-10' &&
        attorney.experience_years &&
        attorney.experience_years <= 10
      ) {
        matchesExperience = false
      }
    }

    return matchesSearch && matchesRole && matchesExperience
  })

  // Toggle mobile filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  // Handle role selection
  const handleRoleToggle = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    } else {
      setSelectedRoles([...selectedRoles, role])
    }
  }

  // Handle experience selection
  const handleExperienceChange = (value: string) => {
    setSelectedExperience(value === selectedExperience ? '' : value)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedRoles([])
    setSelectedExperience('')
    setSearchTerm('')
  }

  return (
    <section
      className="py-32 md:py-32 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${mainColor} 0%, #001F3F 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Our Legal Team</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Experienced attorneys dedicated to excellence in legal representation and client service
          </p>
          <div className="w-24 h-1 mx-auto mt-4 bg-white/30"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-6 h-fit sticky top-4">
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters
              </h3>
              <div className="w-full relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-white/60" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white/50 text-sm"
                  placeholder="Search attorneys..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-white/90 text-sm font-medium mb-3 flex items-center gap-2">
                <User className="h-4 w-4" /> Roles
              </h4>
              <div className="space-y-2">
                {allRoles.map((role) => (
                  <div key={role} className="flex items-center">
                    <input
                      id={`role-${role}`}
                      type="checkbox"
                      checked={selectedRoles.includes(role)}
                      onChange={() => handleRoleToggle(role)}
                      className="h-4 w-4 rounded border-white/30 bg-white/10 text-blue-600 focus:ring-offset-transparent focus:ring-1 focus:ring-white/50"
                    />
                    <label htmlFor={`role-${role}`} className="ml-2 text-sm text-white/90">
                      {role}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {(selectedRoles.length > 0 || selectedExperience || searchTerm) && (
              <button
                onClick={clearFilters}
                className="text-white/80 text-sm flex items-center gap-1 hover:text-white transition-colors"
              >
                <X className="h-3 w-3" /> Clear all filters
              </button>
            )}
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6 flex justify-between items-center">
            <button
              onClick={toggleFilters}
              className="bg-white/10 hover:bg-white/20 transition-colors text-white py-2 px-4 rounded-lg flex items-center gap-2 text-sm"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            <div className="relative w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-white/60" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white/50 text-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Mobile Filters - Collapsible */}
          {showFilters && (
            <div className="lg:hidden bg-white/10 backdrop-blur-sm rounded-lg p-5 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white/90 text-sm font-medium mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" /> Roles
                  </h4>
                  <div className="space-y-2">
                    {allRoles.map((role) => (
                      <div key={role} className="flex items-center">
                        <input
                          id={`mobile-role-${role}`}
                          type="checkbox"
                          checked={selectedRoles.includes(role)}
                          onChange={() => handleRoleToggle(role)}
                          className="h-4 w-4 rounded border-white/30 bg-white/10"
                        />
                        <label
                          htmlFor={`mobile-role-${role}`}
                          className="ml-2 text-sm text-white/90"
                        >
                          {role}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {(selectedRoles.length > 0 || selectedExperience || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-white/80 text-sm flex items-center gap-1 hover:text-white transition-colors"
                >
                  <X className="h-3 w-3" /> Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Attorney Cards Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAttorneys.map((attorney) => (
                <div
                  key={attorney.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image
                      fill
                      src={attorney.photo?.url}
                      alt={attorney.name}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-5">
                      <div className="w-12 h-1 mb-2" style={{ backgroundColor: accentColor }}></div>
                      <h3 className="text-lg font-bold text-white">{attorney.name}</h3>
                      <p className="text-white/80 text-sm">{attorney.role}</p>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    {attorney.practice_areas && (
                      <div className="mb-3 flex flex-wrap gap-1">
                        {attorney.practice_areas.map((area, index) => (
                          <span
                            key={index}
                            className="text-xs py-1 px-2 rounded-full text-white"
                            style={{ backgroundColor: mainColor }}
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-gray-700 text-sm line-clamp-3 flex-grow">{attorney.bio}</p>

                    <div className="mt-5 flex justify-between items-center">
                      {attorney.experience_years && (
                        <span className="text-xs text-gray-500">
                          {attorney.experience_years} years of experience
                        </span>
                      )}

                      <Link
                        href={`/our-team/${attorney.id}`}
                        className="py-2 px-4 text-sm font-medium text-white rounded-md inline-flex items-center gap-1 hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: mainColor }}
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAttorneys.length === 0 && (
              <div className="text-center text-white py-12 bg-white/10 rounded-lg backdrop-blur-sm">
                <p>No attorneys found matching your search criteria.</p>
                <button
                  onClick={clearFilters}
                  className="mt-3 text-white/80 text-sm underline hover:text-white transition-colors"
                >
                  Clear filters and try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
