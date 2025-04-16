/* eslint-disable @typescript-eslint/no-explicit-any */
// ContactForm.tsx - The form component
'use client'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import FormField from './FormField'

export default function ContactForm() {
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
      .filter((el: any) => el.name && el.required)
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
        .filter((el: any) => el.name)
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

  if (!formData) {
    return <LoadingState />
  }

  if (success) {
    return <SuccessState />
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-[#003566] mb-6">Send Us a Message</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formData.fields.map((field: any) => (
          <FormField key={field.id} field={field} error={errors[field.name]} />
        ))}

        {errors.form && (
          <div className="md:col-span-2">
            <p className="text-sm text-red-600">{errors.form}</p>
          </div>
        )}

        <div className="md:col-span-2 mt-6">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-[#003566] hover:bg-[#00264d] text-white font-medium rounded-md shadow-sm transition duration-150 flex items-center justify-center w-full"
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
              'Submit'
            )}
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Your information is kept confidential and secure
          </p>
        </div>
      </form>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="bg-[#003566] border border-green-200 rounded-2xl p-6 text-center flex flex-col items-center space-y-4 shadow-md">
      <LoaderCircle className="w-10 h-10 text-white animate-spin" />
      <h3 className="text-xl font-semibold text-white">Please Wait!</h3>
      <p className="text-gray-50">We{"'"}re loading the contact form for you.</p>
    </div>
  )
}

function SuccessState() {
  return (
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
  )
}
