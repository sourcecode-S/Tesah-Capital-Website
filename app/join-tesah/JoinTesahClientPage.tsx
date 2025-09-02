"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { jobsData } from "./jobs-data"
import { JobApplicationForm } from "./job-application-form"

export default function JoinTesahClientPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  const handleApplyClick = (jobId: string) => {
    setSelectedJob(jobId)
    setShowApplicationForm(true)
  }

  const handleBackToJobs = () => {
    setShowApplicationForm(false)
    setSelectedJob(null)
  }

  if (showApplicationForm && selectedJob) {
    const job = jobsData.find((j) => j.id === selectedJob)
    return <JobApplicationForm job={job!} onBack={handleBackToJobs} />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Join Tesah Capital
              </h1>
              <p className="mt-4 text-white/80 md:text-xl">
                Build your career with Ghana's leading investment management firm. Explore opportunities to grow with
                us.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Current Opportunities</h2>
                <p className="text-muted-foreground md:text-lg">
                  Join our team of dedicated professionals and help shape the future of investment management in Ghana.
                </p>
              </div>

              <div className="grid gap-6">
                {jobsData.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="text-base mt-1">
                            {job.department} • {job.location} • {job.type}
                          </CardDescription>
                        </div>
                        <Button onClick={() => handleApplyClick(job.id)} className="bg-primary hover:bg-primary/90">
                          Apply Now
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{job.summary}</p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium mb-2">Key Responsibilities</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {job.responsibilities.slice(0, 3).map((responsibility, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{responsibility}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Requirements</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {job.requirements.slice(0, 3).map((requirement, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{requirement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {jobsData.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No Current Openings</h3>
                  <p className="text-muted-foreground mb-6">
                    We don't have any open positions at the moment, but we're always looking for talented individuals.
                  </p>
                  <Button variant="outline">Submit General Application</Button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Why Work at Tesah Capital?</h2>
                <p className="text-muted-foreground md:text-lg">
                  Join a team that values excellence, innovation, and professional growth.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Professional Development</h3>
                  <p className="text-muted-foreground">
                    Continuous learning opportunities, professional certifications, and career advancement programs.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Collaborative Culture</h3>
                  <p className="text-muted-foreground">
                    Work in a supportive environment that encourages teamwork, innovation, and open communication.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Competitive Benefits</h3>
                  <p className="text-muted-foreground">
                    Comprehensive benefits package including health insurance, retirement plans, and performance
                    bonuses.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Work-Life Balance</h3>
                  <p className="text-muted-foreground">
                    Flexible working arrangements and policies that support your personal and professional well-being.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Industry Leadership</h3>
                  <p className="text-muted-foreground">
                    Be part of Ghana's leading investment management firm and contribute to shaping the industry.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Impactful Work</h3>
                  <p className="text-muted-foreground">
                    Make a meaningful difference by helping clients achieve their financial goals and secure their
                    futures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Join Our Team?</h2>
              <p className="text-secondary-foreground/80 md:text-xl">
                Take the next step in your career and become part of our growing team of investment professionals.
              </p>
              <Button size="lg" className="mt-4 bg-primary hover:bg-primary/90">
                View Open Positions
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
