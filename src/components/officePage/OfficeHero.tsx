import React from 'react'

export default function OfficeHero() {
  return (
    <section className="bg-[#003566] relative overflow-hidden pt-20 md:pt-24 flex justify-center items-center">
      {/* Abstract decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-tr-full"></div>
      <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white opacity-5 rounded-full"></div>
      <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-white opacity-5 rounded-full"></div>

      <div className="container mx-auto px-6 py-4 md:py-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">Office Details</h1>
        </div>
      </div>
    </section>
  )
}
