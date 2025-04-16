// ContactPage.tsx - Main container component
'use client'
import { useState } from 'react'
import ContactForm from './ContactSection'
import ContactSidebar from './ContactSidebar'

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'form' | 'newsletter'>('form')

  return (
    <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Side */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <ContactForm />
        </div>

        {/* Sidebar with tabs */}
        <div className="bg-gray-50 rounded-xl shadow-sm p-6">
          <ContactSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </section>
  )
}
