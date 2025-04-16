// FormField.tsx - Reusable form field component
import { Mail, Phone, User } from 'lucide-react'

type FormFieldProps = {
  field: {
    id: string
    blockType: string
    label: string
    name: string
    required: boolean
  }
  error?: string
}

export default function FormField({ field, error }: FormFieldProps) {
  const fieldId = `field-${field.id}`

  const getIcon = () => {
    switch (field.name.toLowerCase()) {
      case 'name':
      case 'firstname':
      case 'lastname':
        return <User className="w-5 h-5 text-gray-400" />
      case 'email':
        return <Mail className="w-5 h-5 text-gray-400" />
      case 'phone':
      case 'phonenumber':
        return <Phone className="w-5 h-5 text-gray-400" />
      default:
        return null
    }
  }

  const icon = getIcon()

  switch (field.blockType) {
    case 'text':
      return (
        <div>
          <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <input
              id={fieldId}
              name={field.name}
              type="text"
              required={field.required}
              className={`block w-full ${icon ? 'pl-10' : 'pl-4'} px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003566] focus:border-transparent transition duration-150`}
            />
          </div>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      )
    case 'email':
      return (
        <div>
          <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <input
              id={fieldId}
              name={field.name}
              type="email"
              required={field.required}
              className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003566] focus:border-transparent transition duration-150"
            />
          </div>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      )
    case 'textarea':
      return (
        <div className="md:col-span-2">
          <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <textarea
            id={fieldId}
            name={field.name}
            required={field.required}
            rows={5}
            className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003566] focus:border-transparent transition duration-150"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      )
    case 'number':
      return (
        <div>
          <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <input
              id={fieldId}
              name={field.name}
              type="tel"
              required={field.required}
              className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003566] focus:border-transparent transition duration-150"
            />
          </div>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      )
    default:
      return null
  }
}
