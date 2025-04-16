import React from 'react'
import './globals.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'

export const metadata = {
  description:
    'We strive to be trusted advisors, guiding individuals and businesses through complex legal landscapes with precision, integrity, and transparency. By adopting a client-centric approach, we ensure that every client is empowered with the tools, understanding, and strategies needed to navigate legal challenges effectively. At CS Lilan | Kichwen | Kadima | Gamaliel Advocates LLP, your success, security, and informed decision-making are our top priorities.',
  title: 'Lilan | Kichwen | Kadima Advocates LLP',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
