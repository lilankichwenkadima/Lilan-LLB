import React from 'react'

export default function PublicationHero() {
  return (
    <section className="w-full bg-[#003566] relative overflow-hidden pt-20 flex justify-center items-center border-b-2 border-white min-h-60 md:min-h-60">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold text-white">Publications</h2>
        <div className="bg-[rgb(8,73,133)] h-1 w-16 mt-4"></div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10 animate-[ping_3s_ease-in-out_infinite]"></div>
        <div className="absolute top-20 right-60 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10 animate-[bounce_3s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/4 translate-y-1/4 opacity-10"></div>
        <div className="absolute top-0 mx-auto w-64 h-64 bg-white/65 rounded-full translate-x-1/4 translate-y-1/4 opacity-30"></div>
      </div>
    </section>
  )
}
