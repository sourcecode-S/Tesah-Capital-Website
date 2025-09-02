"use client"

import { useState, useEffect } from "react"
import { jobsData, type JobListing } from "./jobs-data"
import { JobApplicationForm } from "./job-application-form"

export default function JoinTesahClientPage() {
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)

  useEffect(() => {
    // Load jobs on client side to avoid SSR issues
    setJobs(jobsData || [])
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team at Tesah Capital</h1>
            <p className="text-xl mb-8 opacity-90">
              Build your career with Ghana's leading investment management firm. We're looking for talented individuals
              who share our passion for excellence and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Available Positions */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-primary">Current Openings</h2>

            {jobs.length > 0 ? (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <span className="font-medium">Department:</span> {job.department}
                          </span>
                          <span className="flex items-center">
                            <span className="font-medium">Location:</span> {job.location}
                          </span>
                          <span className="flex items-center">
                            <span className="font-medium">Type:</span> {job.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Key Responsibilities:</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {job.responsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {job.requirements.map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => setSelectedJobId(job.id)}
                      className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
                    >
                      Apply for this Position
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">No Current Openings</h3>
                <p className="text-gray-600 mb-6">
                  We don't have any specific positions open right now, but we're always interested in hearing from
                  talented individuals.
                </p>
                <button
                  onClick={() => setSelectedJobId("general")}
                  className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Submit General Application
                </button>
              </div>
            )}
          </div>

          {/* Application Form */}
          <div>
            <JobApplicationForm selectedJobId={selectedJobId} availableJobs={jobs} />
          </div>
        </div>

        {/* Why Join Us Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Why Join Tesah Capital?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Growth Opportunities</h3>
              <p className="text-gray-600">
                Advance your career with comprehensive training programs and mentorship from industry leaders.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Competitive Benefits</h3>
              <p className="text-gray-600">
                Enjoy competitive salaries, health insurance, retirement plans, and performance bonuses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Innovation Culture</h3>
              <p className="text-gray-600">
                Work in an environment that encourages innovation, creativity, and continuous learning.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
