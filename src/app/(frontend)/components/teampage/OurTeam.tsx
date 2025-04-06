'use client'
import React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

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
    }>
  }
}

export default function OurTeam({ block }: OurTeamBlockProps) {
  const mainColor = '#003566'

  // Default attorneys in case none are provided
  const defaultAttorneys = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Managing Partner',
      bio: 'Sarah specializes in corporate law with over 15 years of experience handling complex business transactions and litigation. She has successfully represented clients in high-stakes negotiations and courtroom proceedings.',
      photo: { url: '/api/placeholder/150/150' },
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Senior Associate',
      bio: 'Michael focuses on intellectual property law and has helped numerous startups protect their innovations. With a background in computer science, he brings technical expertise to patent and copyright matters.',
      photo: { url: '/api/placeholder/150/150' },
    },
    {
      id: 3,
      name: 'Anita Patel',
      role: 'Partner',
      bio: 'Anita leads our family law practice with compassion and strategic insight. She is known for her ability to achieve favorable outcomes in complex divorce and custody cases while minimizing conflict.',
      photo: { url: '/api/placeholder/150/150' },
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Associate',
      bio: 'James specializes in estate planning and probate law. He helps clients navigate complex inheritance issues and develop comprehensive plans to protect their assets and provide for future generations.',
      photo: { url: '/api/placeholder/150/150' },
    },
  ]

  // Use provided attorneys or defaults
  const attorneys = block.attorney_profiles?.length > 0 ? block.attorney_profiles : defaultAttorneys

  return (
    <section
      className="pt-28 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${mainColor} 0%, #001F3F 100%)`,
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div
          className="absolute top-10 left-10 w-64 h-64 rounded-full"
          style={{ background: '#ffffff' }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full"
          style={{ background: '#ffffff' }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Meet Our Team</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Our experienced attorneys are dedicated to providing exceptional legal representation
          </p>
          <div className="w-20 h-1 mx-auto mt-4 bg-white/30"></div>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {attorneys.map((attorney) => (
              <CarouselItem key={attorney.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                  <div className="relative h-64 w-full">
                    <Image
                      fill
                      src={attorney.photo?.url}
                      alt={attorney.name}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <div className="w-2/3 h-1 mb-2" style={{ backgroundColor: mainColor }}></div>
                      <h3 className="text-xl font-bold text-white">{attorney.name}</h3>
                      <p className="text-white/80">{attorney.role}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-700 line-clamp-3 mb-4">{attorney.bio}</p>
                    <Button className="mt-auto" style={{ backgroundColor: mainColor }}>
                      Read More <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="mr-2 bg-white/20 text-white hover:bg-white hover:text-gray-800 border-none absolute md:relative top-1/2 -left-4 z-20 transform -translate-y-1/2" />
            <CarouselNext className="ml-2 bg-white/20 text-white hover:bg-white hover:text-gray-800 border-none absolute md:relative top-1/2 -right-4 z-20 transform -translate-y-1/2" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
