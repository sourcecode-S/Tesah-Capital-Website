export interface JobListing {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  responsibilities: string[]
  requirements: string[]
  postedDate: string
  status?: string
}

// Load jobs from admin-managed data
export function getAvailableJobs(): JobListing[] {
  if (typeof window !== "undefined") {
    const savedJobs = localStorage.getItem("tesah_jobs")
    if (savedJobs) {
      const jobs = JSON.parse(savedJobs)
      // Only return active jobs for public display
      return jobs.filter((job: any) => job.status === "active")
    }
  }

  // Fallback default jobs if none are saved
  return [
    {
      id: "1",
      title: "Investment Analyst",
      department: "Investments",
      location: "Accra, Ghana",
      type: "Full-time",
      description: "We are seeking a detail-oriented Investment Analyst to join our growing team.",
      responsibilities: [
        "Conduct financial analysis and research on potential investments",
        "Prepare investment reports and presentations",
        "Monitor portfolio performance and market trends",
        "Assist in due diligence processes",
      ],
      requirements: [
        "Bachelor's degree in Finance, Economics, or related field",
        "2+ years of experience in investment analysis",
        "Strong analytical and quantitative skills",
        "Proficiency in Excel and financial modeling",
      ],
      postedDate: "2024-01-15",
      status: "active",
    },
  ]
}

// Export jobsData as named export for compatibility
export const jobsData = getAvailableJobs()

// For backward compatibility
export const availableJobs = getAvailableJobs()
