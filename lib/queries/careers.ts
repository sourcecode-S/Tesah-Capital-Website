interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
  responsibilities: string[]
  status: "active" | "paused" | "closed"
  postedDate: string
  applicationDeadline?: string
  applicationsCount?: number
}

interface JobApplication {
  id: string
  jobId: string
  applicantName: string
  email: string
  phone: string
  resume: string
  coverLetter?: string
  status: "pending" | "reviewing" | "interviewed" | "hired" | "rejected"
  appliedDate: string
}

// Mock data for careers
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Financial Analyst",
    department: "Finance",
    location: "Accra, Ghana",
    type: "full-time",
    description: "We are seeking a Senior Financial Analyst to join our growing team...",
    requirements: [
      "Bachelor's degree in Finance, Economics, or related field",
      "3+ years of experience in financial analysis",
      "Strong analytical and problem-solving skills",
      "Proficiency in Excel and financial modeling",
    ],
    responsibilities: [
      "Conduct financial analysis and modeling",
      "Prepare financial reports and presentations",
      "Support investment decision-making processes",
      "Monitor market trends and economic indicators",
    ],
    status: "active",
    postedDate: "2024-01-15",
    applicationDeadline: "2024-02-15",
    applicationsCount: 12,
  },
  {
    id: "2",
    title: "Investment Associate",
    department: "Investments",
    location: "Accra, Ghana",
    type: "full-time",
    description: "Join our investment team as an Investment Associate...",
    requirements: [
      "Master's degree in Finance, MBA preferred",
      "2+ years of investment experience",
      "CFA certification preferred",
      "Strong quantitative skills",
    ],
    responsibilities: [
      "Evaluate investment opportunities",
      "Conduct due diligence on potential investments",
      "Prepare investment memos and presentations",
      "Monitor portfolio performance",
    ],
    status: "active",
    postedDate: "2024-01-10",
    applicationsCount: 8,
  },
]

const mockApplications: JobApplication[] = [
  {
    id: "1",
    jobId: "1",
    applicantName: "John Doe",
    email: "john.doe@email.com",
    phone: "+233 24 123 4567",
    resume: "/resumes/john-doe-resume.pdf",
    coverLetter: "I am excited to apply for the Senior Financial Analyst position...",
    status: "reviewing",
    appliedDate: "2024-01-20",
  },
  {
    id: "2",
    jobId: "1",
    applicantName: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+233 20 987 6543",
    resume: "/resumes/jane-smith-resume.pdf",
    status: "pending",
    appliedDate: "2024-01-22",
  },
]

export async function getAllCareers(): Promise<Job[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockJobs
}

export async function getCareerById(id: string): Promise<Job | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockJobs.find((job) => job.id === id) || null
}

export async function getActiveJobs(): Promise<Job[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockJobs.filter((job) => job.status === "active")
}

export async function getJobApplications(jobId?: string): Promise<JobApplication[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  if (jobId) {
    return mockApplications.filter((app) => app.jobId === jobId)
  }
  return mockApplications
}

export async function getApplicationById(id: string): Promise<JobApplication | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockApplications.find((app) => app.id === id) || null
}

export async function createJob(job: Omit<Job, "id" | "postedDate" | "applicationsCount">): Promise<Job> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const newJob: Job = {
    ...job,
    id: Date.now().toString(),
    postedDate: new Date().toISOString().split("T")[0],
    applicationsCount: 0,
  }
  mockJobs.push(newJob)
  return newJob
}

export async function updateJob(id: string, updates: Partial<Job>): Promise<Job | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const jobIndex = mockJobs.findIndex((job) => job.id === id)
  if (jobIndex === -1) return null

  mockJobs[jobIndex] = { ...mockJobs[jobIndex], ...updates }
  return mockJobs[jobIndex]
}

export async function deleteJob(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const jobIndex = mockJobs.findIndex((job) => job.id === id)
  if (jobIndex === -1) return false

  mockJobs.splice(jobIndex, 1)
  return true
}

export async function updateApplicationStatus(
  applicationId: string,
  status: JobApplication["status"],
): Promise<JobApplication | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const appIndex = mockApplications.findIndex((app) => app.id === applicationId)
  if (appIndex === -1) return null

  mockApplications[appIndex].status = status
  return mockApplications[appIndex]
}
