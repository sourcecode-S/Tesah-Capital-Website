"use client"

import type React from "react"

import { useState, useRef } from "react"
import { submitJobApplication } from "../actions/job-application"
import type { JobListing } from "./jobs-data"
import { useToast } from "@/hooks/use-toast"

interface JobApplicationFormProps {
  selectedJobId?: string | null
  availableJobs: JobListing[]
}

export function JobApplicationForm({ selectedJobId, availableJobs }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      // Create a copy of the form data to avoid modifying the original
      const formDataToSubmit = new FormData()

      // Copy all fields except the file
      for (const [key, value] of formData.entries()) {
        if (key !== "resumeFile") {
          formDataToSubmit.append(key, value)
        }
      }

      // Handle file separately to avoid blob URL issues
      if (selectedFile) {
        // Instead of using the blob URL directly, use the File object
        formDataToSubmit.append("resumeFile", selectedFile)
      }

      const result = await submitJobApplication(formDataToSubmit)

      if (result.success) {
        toast({
          title: "Application Submitted",
          description: result.message,
          variant: "default",
        })
        formRef.current?.reset()
        setSelectedFile(null)
      } else {
        toast({
          title: "Submission Failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      console.error("Application submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    } else {
      setSelectedFile(null)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-primary">Job Application Form</h2>

      <form ref={formRef} action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
              Position Applying For *
            </label>
            <select
              id="position"
              name="position"
              required
              defaultValue={selectedJobId || ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a position</option>
              {availableJobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
              <option value="general">General Application</option>
            </select>
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience *
            </label>
            <select
              id="experience"
              name="experience"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select experience level</option>
              <option value="0-1 years">0-1 years</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5-10 years">5-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>

          <div>
            <label htmlFor="resumeFile" className="block text-sm font-medium text-gray-700 mb-1">
              Resume/CV (PDF, DOC, DOCX) *
            </label>
            <div className="flex flex-col">
              <input
                type="file"
                id="resumeFile"
                name="resumeFile"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {selectedFile && (
                <p className="mt-1 text-sm text-gray-500">
                  Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
            Cover Letter *
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            rows={5}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Tell us why you're interested in this position and what makes you a good fit..."
          ></textarea>
        </div>

        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Information (Optional)
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Any additional information you'd like to share..."
          ></textarea>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            required
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
            I consent to Tesah Capital storing and processing my personal data for recruitment purposes. *
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  )
}

// Default export for backward compatibility
export default JobApplicationForm
