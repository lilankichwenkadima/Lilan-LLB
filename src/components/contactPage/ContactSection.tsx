'use client'
import { LoaderCircle, Mail, Phone, User } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ContactForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/get-form')
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() => console.error('Could not load form data'))
  }, [])

  const validateForm = (elements: HTMLFormControlsCollection) => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    Array.from(elements)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((el: any) => el.name && el.required)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .forEach((el: any) => {
        if (!el.value.trim()) {
          newErrors[el.name] = `${el.name} is required`
          isValid = false
        } else if (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(el.value)) {
          newErrors[el.name] = 'Please enter a valid email address'
          isValid = false
        }
      })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formEl = e.currentTarget

    if (!validateForm(formEl.elements)) return

    const payload = {
      form: formData.id,
      submissionData: Array.from(formEl.elements)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((el: any) => el.name)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((el: any) => ({ field: el.name, value: el.value })),
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setSuccess(true)
        formEl.reset()
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ form: 'There was a problem submitting your form. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (!formData)
    return (
      <section className="max-w-6xl mx-auto py-12 px-12 md:px-4 flex flex-col items-center">
        <div className="bg-[#003566] border border-green-200 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center space-y-4 shadow-md max-w-md mx-auto">
          <LoaderCircle className="w-10 h-10 text-white animate-spin" />
          <h3 className="text-lg sm:text-xl font-semibold text-white">Please Wait!</h3>
          <p className="text-gray-50 text-sm sm:text-base">
            We{"'"}re loading the contact form for you.
          </p>
        </div>
      </section>
    )

  if (success)
    return (
      <section className="max-w-6xl mx-auto py-12 px-12 md:px-4 flex flex-col items-center">
        <div className="bg-green-50 border border-[#deeaaa] rounded-lg p-8 text-center">
          <svg
            className="w-16 h-16 text-[#b4d23d] mx-auto mb-4"
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
          <h3 className="text-xl font-semibold text-[#13589e] mb-2">Thank You!</h3>
          <p className="text-gray-600">
            Your message has been received. We{"'"}ll be in touch shortly.
          </p>
        </div>
      </section>
    )

  return (
    <section className="max-w-6xl mx-auto py-12 px-12 md:px-4 flex flex-col items-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#003566] text-center">Contact Us</h2>
        <p className="text-gray-600 mt-2">We{"'"}re here to help with your legal needs</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {formData.fields.map(
          (field: {
            id: string
            blockType: string
            label: string
            name: string
            required: boolean
          }) => {
            const fieldId = `field-${field.id}`

            switch (field.blockType) {
              case 'text':
                return (
                  <div key={field.id} className="relative">
                    <label
                      htmlFor={fieldId}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input
                        id={fieldId}
                        name={field.name}
                        type="text"
                        required={field.required}
                        className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003566] focus:border-transparent transition duration-150"
                      />
                    </div>
                    {errors[field.name] && (
                      <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                    )}
                  </div>
                )
              case 'email':
                return (
                  <div key={field.id} className="relative">
                    <label
                      htmlFor={fieldId}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-400" />
                      </div>
                      <input
                        id={fieldId}
                        name={field.name}
                        type="email"
                        required={field.required}
                        className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003566] focus:border-transparent transition duration-150"
                      />
                    </div>
                    {errors[field.name] && (
                      <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                    )}
                  </div>
                )
              case 'textarea':
                return (
                  <div key={field.id} className="relative lg:col-span-3 md:col-span-2">
                    <label
                      htmlFor={fieldId}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <textarea
                      id={fieldId}
                      name={field.name}
                      required={field.required}
                      rows={5}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003566] focus:border-transparent transition duration-150"
                    />
                    {errors[field.name] && (
                      <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                    )}
                  </div>
                )
              case 'number':
                return (
                  <div key={field.id} className="relative">
                    <label
                      htmlFor={fieldId}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone size={18} className="text-gray-400" />
                      </div>
                      <input
                        id={fieldId}
                        name={field.name}
                        type="tel"
                        required={field.required}
                        className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003566] focus:border-transparent transition duration-150"
                      />
                    </div>
                    {errors[field.name] && (
                      <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                    )}
                  </div>
                )
              default:
                return null
            }
          },
        )}

        <div className="lg:col-span-3 md:col-span-2 mt-6">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-[#003566] hover:bg-[#00264d] text-white font-medium rounded-md shadow-sm transition duration-150 flex items-center justify-center"
          >
            {submitting ? (
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
                Processing...
              </>
            ) : (
              'Submit Inquiry'
            )}
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Your information is kept confidential and secure
          </p>
        </div>
      </form>
    </section>
  )
}
