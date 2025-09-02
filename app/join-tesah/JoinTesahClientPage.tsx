"use client"

import { useState, useEffect } from "react"
import { Footer } from "@/components/footer"
import JobApplicationForm from "./job-application-form"
import { getAvailableJobs } from "./jobs-data"

export default function JoinTesahClientPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [availableJobs, setAvailableJobs] = useState<any[]>([])

  useEffect(() => {
    // Load jobs when component mounts
    setAvailableJobs(getAvailableJobs())
  }, [])

  const handleApplyNow = (jobId: string) => {
    setSelectedJob(jobId)
    setShowApplicationForm(true)
    // Scroll to application form
    setTimeout(() => {
      const formElement = document.getElementById("application-form")
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 pb-16">
        {/* Hero Section */}
        <section className="bg-secondary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl max-w-3xl mx-auto">
              At Tesah Capital, we're looking for talented individuals who are passionate about finance and investment.
              Explore our current openings and become part of our growing team.
            </p>
          </div>
        </section>

        {/* Positions Section - removed the heading */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {availableJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {job.department}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">{job.type}</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleApplyNow(job.id)}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {job.requirements.map((req: string, index: number) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Responsibilities:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {job.responsibilities.map((resp: string, index: number) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form Section */}
        <section id="application-form" className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Apply Now</h2>
          <div className="max-w-3xl mx-auto">
            <JobApplicationForm selectedJobId={selectedJob} availableJobs={availableJobs} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
