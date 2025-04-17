// ContactSidebar.tsx - The sidebar with tab switching
'use client'
import { useState } from 'react'
import { Mail, MessageSquare, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { IoLogoWhatsapp } from 'react-icons/io'

type ContactSidebarProps = {
  activeTab: 'form' | 'newsletter'
  setActiveTab: (tab: 'form' | 'newsletter') => void
}

export default function ContactSidebar({ activeTab, setActiveTab }: ContactSidebarProps) {
  return (
    <div>
      <div className="mb-6 flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex items-center px-4 py-3 font-medium text-sm transition ${
            activeTab === 'form'
              ? 'text-[#003566] border-b-2 border-[#003566]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Contact Form
        </button>
        <button
          onClick={() => setActiveTab('newsletter')}
          className={`flex items-center px-4 py-3 font-medium text-sm transition ${
            activeTab === 'newsletter'
              ? 'text-[#003566] border-b-2 border-[#003566]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Mail className="w-4 h-4 mr-2" />
          Keep in touch
        </button>
      </div>

      {activeTab === 'form' ? <ContactInfo /> : <NewsletterSignup />}
    </div>
  )
}

function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-[#003566] mb-4">Get in Touch</h3>
        <p className="text-gray-600 mb-6">
          Have questions or need assistance? Our team is ready to help you with any inquiries.
        </p>
      </div>

      <div className="flex flex-col space-y-8">
        <Link href="mailto:info@lilankichwenkadima.com">
          <div className="flex items-start cursor-pointer">
            <div className="flex-shrink-0 bg-[#003566] rounded-full p-2 mr-4">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Email Us</h4>
              <p className="text-gray-600">info@lilankichwenkadima.com</p>
            </div>
          </div>
        </Link>

        <Link href="tel:+254790039031">
          <div className="flex items-start cursor-pointer">
            <div className="flex-shrink-0 bg-[#003566] rounded-full p-2 mr-4">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Call Us</h4>
              <p className="text-gray-600">+254 790 039031</p>
            </div>
          </div>
        </Link>

        <Link href="https://wa.me/254790039031" target="_blank" rel="noopener noreferrer">
          <div className="flex items-start cursor-pointer">
            <div className="flex-shrink-0 bg-[#003566] rounded-full p-2 mr-4">
              <IoLogoWhatsapp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">WhatsApp</h4>
              <p className="text-gray-600">+254 790 039031</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            We typically respond to all inquiries within 24 business hours.
          </p>
        </div>
      </div>
    </div>
  )
}

function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Reset notification states
    setSubscribed(false)
    setAlreadySubscribed(false)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.status === 409) {
        // Show already subscribed notification instead of alert
        setAlreadySubscribed(true)
        setTimeout(() => setAlreadySubscribed(false), 5000)
      } else if (res.ok) {
        setSubscribed(true)
        setEmail('')
        setTimeout(() => setSubscribed(false), 5000)
      } else {
        alert(data.error || 'Something went wrong. Please try again later.')
      }
    } catch (error) {
      alert('Failed to subscribe. Please try again later.')
      console.error(error)
    }
  }

  if (subscribed) {
    return (
      <div className="bg-green-50 border border-[#deeaaa] rounded-lg p-6 text-center">
        <svg
          className="w-12 h-12 text-[#b4d23d] mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <h3 className="text-xl font-semibold text-[#13589e] mb-2">Successfully Subscribed!</h3>
        <p className="text-gray-600">
          Thank you for subscribing to our newsletter. You{"'"}ll now receive our latest updates.
        </p>
      </div>
    )
  }

  if (alreadySubscribed) {
    return (
      <div className="mt-4 px-4 py-3 bg-amber-500 bg-opacity-20 rounded-md border-l-4 border-amber-500 animate-fade-in flex items-start">
        <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-white text-sm font-medium">Already Subscribed</p>
          <p className="text-white/80 text-sm">
            This email is already in our subscriber list. Thank you for your continued interest!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-[#003566] mb-4">Stay Connected</h3>
        <p className="text-gray-600">
          Subscribe to our newsletter for legal insights, updates on recent cases, and helpful
          resources.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003566] focus:border-transparent transition duration-150"
            />
          </div>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="focus:ring-[#003566] h-4 w-4 text-[#003566] border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-600">
              I agree to receive newsletters and legal updates
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-3 bg-[#003566] hover:bg-[#00264d] text-white font-medium rounded-md shadow-sm transition duration-150 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          We respect your privacy. You can unsubscribe at any time.
        </p>
      </form>

      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-2">What to expect:</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <svg
              className="w-4 h-4 text-[#003566] mr-2 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            Monthly legal updates and insights
          </li>
          <li className="flex items-start">
            <svg
              className="w-4 h-4 text-[#003566] mr-2 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            Resources to help with common legal questions
          </li>
          <li className="flex items-start">
            <svg
              className="w-4 h-4 text-[#003566] mr-2 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            Invitations to webinars and events
          </li>
        </ul>
      </div>
    </div>
  )
}

// Missing import - Add this to the top of the file
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Phone(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  )
}
