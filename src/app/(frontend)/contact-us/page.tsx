import React from 'react'
import ContactPage from '@/components/contactPage/ContactPage'
import ContactHero from '@/components/contactPage/ContactHero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Lilan | Kichwen | Kadima Advocates LLP',
  description:
    'Connect with Lilan | Kichwen | Kadima Advocates LLP for strategic, ethical, and results-driven legal solutions. We are committed to empowering clients with knowledge, clarity, and trusted legal guidance.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Contact Us - Lilan | Kichwen | Kadima Advocates LLP',
    description:
      'Reach out to Lilan | Kichwen | Kadima Advocates LLP to discuss how we can assist you with strategic legal solutions, trusted advice, and client-centric representation.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact-us`,
    images: [
      {
        url: '/logo1.png', // Update this if you have a different logo or image
        width: 1200,
        height: 630,
        alt: 'Contact Lilan | Kichwen | Kadima Advocates LLP',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact-us`,
  },
}

export default function page() {
  return (
    <>
      <ContactHero />
      <ContactPage />
    </>
  )
}
