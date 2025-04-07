import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Link from 'next/link'
import {
  ArrowLeft,
  Phone,
  Mail,
  Briefcase,
  Clock,
  Users,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  MapPin,
} from 'lucide-react'
import { fetchAllMembers, fetchRelatedMembers } from '@/lib/ourTeamUtils'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function TeamDescription({ params }: { params: { id: string } }) {
  const { id } = params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'team',
    where: {
      id: {
        equals: id,
      },
    },
  })

  const team_member = docs[0]
  if (!team_member) {
    notFound()
  }

  const relatedMembers = await fetchRelatedMembers(id)
  const descriptionParagraphs = team_member.bio.split('\n')

  return (
    <>
      {/* Hero Section with Profile Image - Updated gradient and pattern */}
      <div
        className="relative py-20 md:py-28"
        style={{ background: 'linear-gradient(135deg, #0353a4, #001845)' }}
      >
        <div className="absolute inset-0 opacity-15">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <Link
            href="/our-team"
            className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Team
          </Link>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mt-8">
            {/* Profile Image - Enhanced with larger size and better border */}
            <div className="w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white/80 shadow-2xl">
              <Image
                src={
                  typeof team_member.photo === 'object' &&
                  'url' in team_member.photo &&
                  team_member.photo.url
                    ? team_member.photo.url
                    : '/placeholder-image.jpg'
                }
                alt={team_member.name}
                className="w-full h-full object-cover"
                width={288}
                height={288}
              />
            </div>
            {/* Profile Intro - Enhanced typography and spacing */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center px-4 py-1.5 bg-blue-400 bg-opacity-25 rounded-full text-blue-50 text-sm font-medium mb-4">
                {team_member.role}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-5">{team_member.name}</h1>
              <div className="flex flex-wrap gap-5 items-center justify-center md:justify-start mb-7">
                <div className="flex items-center text-blue-50">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-300" />
                  <span>{team_member.experience} years</span>
                </div>
                <div className="flex items-center text-blue-50">
                  <Mail className="h-5 w-5 mr-2 text-blue-300" />
                  <span>{team_member.email}</span>
                </div>
                <div className="flex items-center text-blue-50">
                  <Phone className="h-5 w-5 mr-2 text-blue-300" />
                  <span>{team_member.phone}</span>
                </div>
              </div>
              <p className="text-lg text-blue-50 max-w-2xl leading-relaxed">
                {descriptionParagraphs[0]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar - Enhanced with better icons and layout */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-between py-6 gap-6">
            <div className="flex items-center px-6 py-3">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mr-4 shadow-sm">
                <Users className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Languages</p>
                <p className="font-medium text-gray-800">
                  {(team_member.languages ?? []).map((lang) => lang.title).join(', ')}
                </p>
              </div>
            </div>
            <div className="flex items-center px-6 py-3">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mr-4 shadow-sm">
                <Clock className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Experience</p>
                <p className="font-medium text-gray-800">{team_member.experience} years</p>
              </div>
            </div>
            <div className="flex items-center px-6 py-3">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mr-4 shadow-sm">
                <MapPin className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="font-medium text-gray-800">Headquarters</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Improved layout and spacing */}
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Contact Information Card */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-4" />
                  <Link
                    href={`tel:${team_member.phone}`}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {team_member.phone}
                  </Link>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-4" />
                  <Link
                    href={`mailto:${team_member.email}`}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {team_member.email}
                  </Link>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-4">Connect</h4>
                <div className="flex space-x-4">
                  {team_member.linkedin && (
                    <Link
                      href={team_member.linkedin}
                      className="h-12 w-12 rounded-full bg-gray-100 hover:bg-blue-50 flex items-center justify-center transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="h-5 w-5 text-gray-600" />
                    </Link>
                  )}
                  {team_member.twitter && (
                    <Link
                      href={team_member.twitter}
                      className="h-12 w-12 rounded-full bg-gray-100 hover:bg-blue-50 flex items-center justify-center transition-colors"
                      aria-label="Twitter Profile"
                    >
                      <Twitter className="h-5 w-5 text-gray-600" />
                    </Link>
                  )}
                  {team_member.facebook && (
                    <Link
                      href={team_member.facebook}
                      className="h-12 w-12 rounded-full bg-gray-100 hover:bg-blue-50 flex items-center justify-center transition-colors"
                      aria-label="Facebook Profile"
                    >
                      <Facebook className="h-5 w-5 text-gray-600" />
                    </Link>
                  )}
                  {team_member.instagram && (
                    <Link
                      href={team_member.instagram}
                      className="h-12 w-12 rounded-full bg-gray-100 hover:bg-blue-50 flex items-center justify-center transition-colors"
                      aria-label="Instagram Profile"
                    >
                      <Instagram className="h-5 w-5 text-gray-600" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Enhanced styling */}
          <div className="lg:col-span-1">
            {/* Related Team Members */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 sticky top-10">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Related Team Members</h3>
              <div className="space-y-5">
                {relatedMembers.map((member) => (
                  <Link
                    key={member.id}
                    href={`/our-team/${member.id}`}
                    className="flex items-center p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-gray-100 group-hover:border-blue-200 transition-colors">
                      <Image
                        src={
                          typeof team_member.photo === 'object' &&
                          'url' in team_member.photo &&
                          team_member.photo.url
                            ? team_member.photo.url
                            : '/placeholder-image.jpg'
                        }
                        alt={member.name}
                        className="w-full h-full object-cover"
                        width={56}
                        height={56}
                      />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-gray-500 text-sm mt-1">{member.role}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const teamMembers = await fetchAllMembers()
    return teamMembers.map((member) => ({
      id: String(member.id),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
