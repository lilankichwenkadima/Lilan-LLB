import React from 'react'
import './globals.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'
import Script from 'next/script'

export const metadata = {
  title: 'Lilan | Kichwen | Kadima Advocates LLP',
  description:
    'At Lilan | Kichwen | Kadima Advocates LLP, we provide strategic, ethical, and results-driven legal services across diverse practice areas. Our client-centered approach empowers individuals and businesses with trusted guidance and clarity.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title:
      'Lilan | Kichwen | Kadima Advocates LLP - Strategic, Ethical, and Client-Focused Legal Solutions',
    description:
      'Discover how Lilan | Kichwen | Kadima Advocates LLP delivers trusted, strategic, and client-centric legal solutions. Championing your rights with precision, integrity, and excellence.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    images: [
      {
        url: '/logo1.png', // Consider using a strong branded homepage image later (like office/team photo)
        width: 1200,
        height: 630,
        alt: 'Lilan | Kichwen | Kadima Advocates LLP',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        {/* Google Analytics (or Google Tag Manager) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PQ3DQ7Z5ZJ"
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-PQ3DQ7Z5ZJ');
            `,
          }}
        />
      </head>
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
