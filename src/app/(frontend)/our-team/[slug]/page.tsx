import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Link from 'next/link'
import {
  ArrowLeft,
  Phone,
  Mail,
  GraduationCap,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from 'lucide-react'
import { fetchAllMembers, fetchRelatedMembers } from '@/lib/ourTeamUtils'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { RichText } from '@/components/RichText'

export default async function TeamDescription({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'team',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const team_member = docs[0]
  if (!team_member) {
    notFound()
  }

  const relatedMembers = await fetchRelatedMembers(slug)

  return (
    <section className="relative overflow-hidden pt-16 flex justify-center items-center bg-gradient-to-b from-[#003566] via-white to-white">
      {' '}
      <div className="min-h-screen">
        {/* Back Navigation */}
        <div className="container mx-auto py-8 px-4">
          <Link
            href="/our-team"
            className="inline-flex items-center text-[#ffffff] hover:underline mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Our Team
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Photo & Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Photo */}
                <div className="relative h-80 w-full bg-gray-100">
                  {team_member.photo ? (
                    <Image
                      src={
                        typeof team_member.photo === 'object' &&
                        'url' in team_member.photo &&
                        team_member.photo.url
                          ? team_member.photo.url
                          : '/default-image.jpg'
                      }
                      alt={team_member.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#003566]/10">
                      <span className="text-[#003566]">No image available</span>
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-[#003566] mb-2">{team_member.name}</h1>
                  <p className="text-gray-600 mb-4">{team_member.role}</p>

                  <div className="space-y-4">
                    {team_member.email && (
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-5 h-5 mr-3">
                          <Mail className="w-full h-full text-[#003566]" />
                        </div>
                        <Link
                          href={`mailto:${team_member.email}`}
                          className="text-gray-700 text-xs hover:text-[#003566] truncate"
                        >
                          {team_member.email}
                        </Link>
                      </div>
                    )}

                    {team_member.phone && (
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-[#003566] mr-3" />
                        <Link
                          href={`tel:${team_member.phone}`}
                          className="text-gray-700 hover:text-[#003566]"
                        >
                          {team_member.phone}
                        </Link>
                      </div>
                    )}

                    {/* Languages */}
                    {team_member.languages && team_member.languages.length > 0 && (
                      <div className="flex items-start">
                        <Globe className="w-5 h-5 text-[#003566] mr-3 mt-1" />
                        <div>
                          <p className="text-gray-700 font-medium">Languages</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {team_member.languages.map((language) => (
                              <span
                                key={language.id}
                                className="bg-[#003566]/10 text-[#003566] px-2 py-1 text-sm rounded-md"
                              >
                                {language.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Social Links */}
                    {team_member.sociallinks && (
                      <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                        {team_member.sociallinks.linkedin && (
                          <Link
                            href={team_member.sociallinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#003566] hover:text-[#003566]/80"
                          >
                            <Linkedin className="w-5 h-5" />
                          </Link>
                        )}
                        {team_member.sociallinks.twitter && (
                          <Link
                            href={team_member.sociallinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#003566] hover:text-[#003566]/80"
                          >
                            <Twitter className="w-5 h-5" />
                          </Link>
                        )}
                        {team_member.sociallinks.facebook && (
                          <Link
                            href={team_member.sociallinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#003566] hover:text-[#003566]/80"
                          >
                            <Facebook className="w-5 h-5" />
                          </Link>
                        )}
                        {team_member.sociallinks.instagram && (
                          <Link
                            href={team_member.sociallinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#003566] hover:text-[#003566]/80"
                          >
                            <Instagram className="w-5 h-5" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Education */}
              {team_member.education && team_member.education.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6 p-6">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-5 h-5 text-[#003566] mr-2" />
                    <h2 className="text-lg font-semibold text-[#003566]">Education</h2>
                  </div>
                  <ul className="space-y-3">
                    {team_member.education.map((edu) => (
                      <li key={edu.id} className="flex items-start">
                        <div className="w-1 h-1 rounded-full bg-[#003566] mt-2 mr-2"></div>
                        <p className="text-gray-700">{edu.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column - Bio & Related Team */}
            <div className="lg:col-span-2">
              {/* Bio */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-6">
                {team_member.bio ? (
                  <div className="prose max-w-none">
                    <RichText data={team_member.bio} className="richtext" />
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No biography available.</p>
                )}
              </div>

              {/* Related Team Members */}
              {relatedMembers && relatedMembers.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
                  <h2 className="text-xl font-bold text-[#003566] mb-6">Meet Other Team Members</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedMembers.slice(0, 4).map((member) => (
                      <Link href={`/our-team/${member.slug}`} key={member.id} className="group">
                        <div className="flex items-center p-3 rounded-lg hover:bg-[#003566]/5 transition-colors">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                            {member.photo ? (
                              <Image
                                src={
                                  typeof member.photo === 'object' &&
                                  'url' in member.photo &&
                                  member.photo.url
                                    ? member.photo.url
                                    : '/default-image.jpg'
                                }
                                alt={member.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[#003566]/10">
                                <span className="text-xs text-[#003566]">No image</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium text-[#003566] group-hover:underline">
                              {member.name}
                            </h3>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {relatedMembers.length > 4 && (
                    <div className="mt-4 text-center">
                      <Link href="/our-team" className="text-[#003566] hover:underline font-medium">
                        View all team members
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const teamMembers = await fetchAllMembers()
    return teamMembers.map((member) => ({
      slug: String(member.slug),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
