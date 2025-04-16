'use client'
import React, { useState } from 'react'
import { MapPin, Phone, Mail, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface OfficeProps {
  block: {
    offices: {
      location: string
      physicalAddress: string
      poBox: string
      telephone: {
        phone: string
      }[]
      image: { url: string }
    }[]
  }
}

export default function OfficeDetails({ block }: OfficeProps) {
  const [selectedOffice, setSelectedOffice] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  if (!block.offices || block.offices.length === 0) {
    return <div className="text-center p-8">No office information available</div>
  }

  return (
    <div className="bg-gray-50 w-full max-w-6xl mx-auto my-12 rounded-xl shadow-md overflow-hidden p-4">
      <div className="px-6 rounded-t-lg py-4 bg-[#003566] text-white">
        <h1 className="text-2xl font-bold">Our Offices</h1>
        <p className="text-blue-100">Find us at a location near you</p>
      </div>

      {/* Office Selector for Mobile */}
      <div className="md:hidden relative mb-4 px-4 mt-4">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full p-3 bg-white border-2 border-[#003566] text-[#003566] rounded-lg flex justify-between items-center font-medium"
        >
          <span>{block.offices[selectedOffice].location}</span>
          {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 z-10 bg-white shadow-lg rounded-lg mt-1 mx-4 border border-gray-200">
            {block.offices.map((office, index) => (
              <button
                key={index}
                className={`w-full p-3 text-left ${
                  selectedOffice === index
                    ? 'bg-blue-50 text-[#003566] font-medium'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
                onClick={() => {
                  setSelectedOffice(index)
                  setIsDropdownOpen(false)
                }}
              >
                {office.location}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Office Tabs for Desktop */}
      <div className="hidden md:flex px-6 pt-4 space-x-2">
        {block.offices.map((office, index) => (
          <button
            key={index}
            className={`px-5 py-3 rounded-t-lg font-medium transition-all duration-200 ${
              selectedOffice === index
                ? 'bg-white text-[#003566] shadow-md border-t-2 border-[#003566]'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedOffice(index)}
          >
            {office.location}
          </button>
        ))}
      </div>

      {/* Office Details */}
      <div className="bg-white p-6 md:rounded-tr-lg shadow-inner">
        {block.offices.map((office, index) => (
          <div
            key={index}
            className={`${selectedOffice === index ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-7 gap-6`}
          >
            {/* Office Image - Fixed aspect ratio container with standardized cropping */}
            <div className="md:col-span-3 rounded-lg overflow-hidden shadow-md">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={office.image.url}
                  alt={`${office.location} Office`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute bottom-0 left-0 w-full py-2 px-4 bg-gradient-to-t from-[#003566] to-transparent">
                  <h2 className="text-white font-bold text-xl">{office.location}</h2>
                </div>
              </div>
            </div>

            {/* Office Details */}
            <div className="md:col-span-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Physical Address */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-3">
                    <div className="bg-[#003566] p-2 rounded-full">
                      <MapPin className="text-white" size={18} />
                    </div>
                    <h3 className="font-bold text-gray-800 ml-3">Visit Us</h3>
                  </div>
                  <p className="text-gray-600 pl-2 border-l-2 border-blue-200">
                    {office.physicalAddress}
                  </p>
                </div>

                {/* P.O. Box */}
                {office.poBox && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-3">
                      <div className="bg-[#003566] p-2 rounded-full">
                        <Mail className="text-white" size={18} />
                      </div>
                      <h3 className="font-bold text-gray-800 ml-3">Mail Us</h3>
                    </div>
                    <p className="text-gray-600 pl-2 border-l-2 border-blue-200">{office.poBox}</p>
                  </div>
                )}

                {/* Phone Numbers */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-3">
                    <div className="bg-[#003566] p-2 rounded-full">
                      <Phone className="text-white" size={18} />
                    </div>
                    <h3 className="font-bold text-gray-800 ml-3">Call Us</h3>
                  </div>
                  <ul className="text-gray-600 pl-2 border-l-2 border-blue-200 space-y-1">
                    {office.telephone?.map((item, index) => <li key={index}>{item.phone}</li>)}
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-center">
                  <Link
                    href="/contact-us"
                    className="group flex items-center justify-center px-6 py-3 bg-[#003566] text-white rounded-lg hover:bg-blue-900 transition-colors duration-300 w-full shadow-md hover:shadow-lg"
                  >
                    <span>Contact Us</span>
                    <ArrowRight
                      className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      size={18}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
