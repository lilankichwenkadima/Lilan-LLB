import React from 'react'
import Image from 'next/image'
import logoDark from 'public/adminlogo.png'
import logo from 'public/logo1.png'

export default function Icon() {
  return (
    <div className="flex justify-center items-center">
      <Image
        src={logo}
        width={800}
        height={800}
        alt="lilalkichwenkadima logo"
        className="dark:hidden"
      />
      <Image
        src={logoDark}
        width={800}
        height={800}
        alt="lilalkichwenkadima logo"
        className="hidden dark:block"
      />
    </div>
  )
}
