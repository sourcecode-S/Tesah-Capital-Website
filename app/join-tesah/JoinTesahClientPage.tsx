"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
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
      <Navigation />
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
              <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden"></div>
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
