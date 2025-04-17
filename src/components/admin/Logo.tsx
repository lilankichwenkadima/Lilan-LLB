import React from 'react'
import Image from 'next/image'
import logoDark from 'public/adminlogo.png'
import logo from 'public/logo1.png'

export default function Logo() {
  return (
    <div>
      <Image src={logo} alt="lilalkichwenkadima logo" className="h-20 object-contain dark:hidden" />
      <Image
        src={logoDark}
        alt="lilalkichwenkadima logo"
        className="h-20 object-contain hidden dark:block"
      />
    </div>
  )
}
