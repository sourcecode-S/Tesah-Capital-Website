import { getDbConnection, type Job as DbJob, type JobApplication as DbJobApplication } from "@/lib/db"
import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 12)

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
  phone: string | null
  resume: string
  coverLetter?: string | null
  status: "pending" | "reviewing" | "interviewed" | "hired" | "rejected"
  appliedDate: string
}

// Mock data for careers (used if DB is not connected)
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

export async function getCareers(): Promise<Job[]> {
  const conn = getDbConnection()
  if (!conn) {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
    return [
      {
        id: "1",
        title: "Investment Analyst",
        location: "Accra, Ghana",
        type: "Full-time",
        description:
          "We are seeking a highly motivated Investment Analyst to join our team. The ideal candidate will have a strong understanding of financial markets, excellent analytical skills, and a passion for investment research.",
        responsibilities: [
          "Conduct in-depth financial analysis and due diligence on potential investments.",
          "Develop financial models and valuation analyses.",
          "Prepare investment memos and presentations for the investment committee.",
          "Monitor portfolio performance and provide regular updates.",
          "Stay abreast of market trends and economic developments.",
        ],
        requirements: [
          "Bachelor's degree in Finance, Economics, or a related field.",
          "1-3 years of experience in investment analysis or a similar role.",
          "Strong quantitative and analytical skills.",
          "Proficiency in financial modeling and valuation techniques.",
          "Excellent written and verbal communication skills.",
          "CFA designation or progress towards it is a plus.",
        ],
        postedDate: "2024-01-10",
      },
      {
        id: "2",
        title: "Wealth Management Advisor",
        location: "Accra, Ghana",
        type: "Full-time",
        description:
          "We are looking for an experienced Wealth Management Advisor to provide comprehensive financial planning and investment advice to our clients. The successful candidate will have a proven track record of building and maintaining client relationships.",
        responsibilities: [
          "Develop and implement personalized financial plans for clients.",
          "Provide expert advice on investment strategies, retirement planning, and estate planning.",
          "Build and maintain strong, long-term client relationships.",
          "Identify and pursue new business opportunities.",
          "Ensure compliance with all regulatory requirements.",
        ],
        requirements: [
          "Bachelor's degree in Finance, Business, or a related field.",
          "3-5 years of experience in wealth management or financial advisory.",
          "Relevant certifications (e.g., CFP, ChFC) are highly preferred.",
          "Strong knowledge of investment products and financial markets.",
          "Excellent interpersonal and communication skills.",
          "Ability to work independently and as part of a team.",
        ],
        postedDate: "2024-01-15",
      },
      {
        id: "3",
        title: "Marketing Specialist",
        location: "Accra, Ghana",
        type: "Full-time",
        description:
          "We are seeking a creative and results-driven Marketing Specialist to develop and execute marketing strategies that enhance our brand presence and drive client acquisition.",
        responsibilities: [
          "Develop and implement marketing campaigns across various channels (digital, print, events).",
          "Manage social media presence and content creation.",
          "Analyze marketing performance and identify areas for improvement.",
          "Collaborate with sales and product teams to align marketing efforts.",
          "Organize and attend industry events and seminars.",
        ],
        requirements: [
          "Bachelor's degree in Marketing, Communications, or a related field.",
          "2-4 years of experience in marketing, preferably in the financial services industry.",
          "Proven track record of successful marketing campaign execution.",
          "Strong understanding of digital marketing tools and analytics.",
          "Excellent written and verbal communication skills.",
          "Ability to work in a fast-paced, dynamic environment.",
        ],
        postedDate: "2024-01-20",
      },
    ]
  }
  try {
    const [rows] = await conn.execute<DbJob[]>(
      `SELECT id, title, department, location, type, description, JSON_UNQUOTE(JSON_EXTRACT(requirements, '$')) AS requirements, JSON_UNQUOTE(JSON_EXTRACT(responsibilities, '$')) AS responsibilities, status, posted_date AS postedDate, application_deadline AS applicationDeadline, applications_count AS applicationsCount FROM jobs ORDER BY posted_date DESC`,
    )
    return rows.map((row) => ({
      ...row,
      requirements: JSON.parse(row.requirements as unknown as string),
      responsibilities: JSON.parse(row.responsibilities as unknown as string),
    })) as Job[]
  } catch (error) {
    console.error("Error fetching all careers:", error)
    throw new Error("Failed to fetch all careers")
  }
}

export async function getCareerById(id: string): Promise<Job | null> {
  const careers = await getCareers()
  return careers.find((career) => career.id === id)
}

export async function getActiveJobs(): Promise<Job[]> {
  const conn = getDbConnection()
  if (!conn) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return mockJobs.filter((job) => job.status === "active")
  }
  try {
    const [rows] = await conn.execute<DbJob[]>(
      `SELECT id, title, department, location, type, description, JSON_UNQUOTE(JSON_EXTRACT(requirements, '$')) AS requirements, JSON_UNQUOTE(JSON_EXTRACT(responsibilities, '$')) AS responsibilities, status, posted_date AS postedDate, application_deadline AS applicationDeadline, applications_count AS applicationsCount FROM jobs WHERE status = 'active' ORDER BY posted_date DESC`,
    )
    return rows.map((row) => ({
      ...row,
      requirements: JSON.parse(row.requirements as unknown as string),
      responsibilities: JSON.parse(row.responsibilities as unknown as string),
    })) as Job[]
  } catch (error) {
    console.error("Error fetching active jobs:", error)
    throw new Error("Failed to fetch active jobs")
  }
}

export async function getJobApplications(jobId?: string): Promise<JobApplication[]> {
  const conn = getDbConnection()
  if (!conn) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    if (jobId) {
      return mockApplications.filter((app) => app.jobId === jobId)
    }
    return mockApplications
  }
  try {
    let query = `SELECT id, job_id AS jobId, applicant_name AS applicantName, email, phone, resume, cover_letter AS coverLetter, status, applied_date AS appliedDate FROM job_applications`
    const params: string[] = []
    if (jobId) {
      query += ` WHERE job_id = ?`
      params.push(jobId)
    }
    const [rows] = await conn.execute<DbJobApplication[]>(query, params)
    return rows as JobApplication[]
  } catch (error) {
    console.error("Error fetching job applications:", error)
    throw new Error("Failed to fetch job applications")
  }
}

export async function getApplicationById(id: string): Promise<JobApplication | null> {
  const conn = getDbConnection()
  if (!conn) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return mockApplications.find((app) => app.id === id) || null
  }
  try {
    const [rows] = await conn.execute<DbJobApplication[]>(
      `SELECT id, job_id AS jobId, applicant_name AS applicantName, email, phone, resume, cover_letter AS coverLetter, status, applied_date AS appliedDate FROM job_applications WHERE id = ?`,
      [id],
    )
    return (rows[0] as JobApplication) || null
  } catch (error) {
    console.error("Error fetching application by ID:", error)
    throw new Error("Failed to fetch application by ID")
  }
}

export async function createJob(job: Omit<Job, "id" | "postedDate" | "applicationsCount">): Promise<Job> {
  const conn = getDbConnection()
  if (!conn) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const newJob: Job = {
      ...job,
      id: nanoid(),
      postedDate: new Date().toISOString().split("T")[0],
      applicationsCount: 0,
    }
    mockJobs.push(newJob)
    return newJob
  }
  try {
    const newId = nanoid()
    await conn.execute(
      `INSERT INTO jobs (id, title, department, location, type, description, requirements, responsibilities, status, posted_date, application_deadline, applications_count)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, 0)`,
      [
        newId,
        job.title,
        job.department,
        job.location,
        job.type,
        job.description,
        JSON.stringify(job.requirements),
        JSON.stringify(job.responsibilities),
        job.status,
        job.applicationDeadline || null,
      ],
    )
    const [rows] = await conn.execute<DbJob[]>(
      `SELECT id, title, department, location, type, description, JSON_UNQUOTE(JSON_EXTRACT(requirements, '$')) AS requirements, JSON_UNQUOTE(JSON_EXTRACT(responsibilities, '$')) AS responsibilities, status, posted_date AS postedDate, application_deadline AS applicationDeadline, applications_count AS applicationsCount FROM jobs WHERE id = ?`,
      [newId],
    )
    const newJob = rows[0]
    return {
      ...newJob,
      requirements: JSON.parse(newJob.requirements as unknown as string),
      responsibilities: JSON.parse(newJob.responsibilities as unknown as string),
    } as Job
  } catch (error) {
    console.error("Error creating job:", error)
    throw new Error("Failed to create job")
  }
}

export async function updateJob(id: string, updates: Partial<Job>): Promise<Job | null> {
  const conn = getDbConnection()
  if (!conn) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const jobIndex = mockJobs.findIndex((job) => job.id === id)
    if (jobIndex === -1) return null
    mockJobs[jobIndex] = { ...mockJobs[jobIndex], ...updates }
    return mockJobs[jobIndex]
  }
  try {
    const updateFields: string[] = []
    const updateValues: any[] = []

    for (const key in updates) {
      if (updates[key as keyof typeof updates] !== undefined) {
        const dbKey =
          key === "postedDate"
            ? "posted_date"
            : key === "applicationDeadline"
              ? "application_deadline"
              : key === "applicationsCount"
                ? "applications_count"
                : key
        if (key === "requirements" || key === "responsibilities") {
          updateFields.push(`\`${dbKey}\` = JSON_ARRAY_APPEND(JSON_ARRAY(), '$', ?)`) // MySQL JSON update
          updateValues.push(JSON.stringify(updates[key as keyof typeof updates]))
        } else {
          updateFields.push(`\`${dbKey}\` = ?`)
          updateValues.push(updates[key as keyof typeof updates])
        }
      }
    }

    if (updateFields.length === 0) {
      return null // No fields to update
    }

    await conn.execute(`UPDATE jobs SET ${updateFields.join(", ")} WHERE id = ?`, [...updateValues, id])

    const [rows] = await conn.execute<DbJob[]>(
      `SELECT id, title, department, location, type, description, JSON_UNQUOTE(JSON_EXTRACT(requirements, '$')) AS requirements, JSON_UNQUOTE(JSON_EXTRACT(responsibilities, '$')) AS responsibilities, status, posted_date AS postedDate, application_deadline AS applicationDeadline, applications_count AS applicationsCount FROM jobs WHERE id = ?`,
      [id],
    )
    const updatedJob = rows[0]
    if (!updatedJob) return null
    return {
      ...updatedJob,
      requirements: JSON.parse(updatedJob.requirements as unknown as string),
      responsibilities: JSON.parse(updatedJob.responsibilities as unknown as string),
    } as Job
  } catch (error) {
    console.error("Error updating job:", error)
    throw new Error("Failed to update job")
  }
}

export async function deleteJob(id: string): Promise<boolean> {
  const conn = getDbConnection()
  if (!conn) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const jobIndex = mockJobs.findIndex((job) => job.id === id)
    if (jobIndex === -1) return false
    mockJobs.splice(jobIndex, 1)
    return true
  }
  try {
    const result = await conn.execute(`DELETE FROM jobs WHERE id = ?`, [id])
    return result.rowsAffected > 0
  } catch (error) {
    console.error("Error deleting job:", error)
    throw new Error("Failed to delete job")
  }
}

export async function updateApplicationStatus(
  applicationId: string,
  status: JobApplication["status"],
): Promise<JobApplication | null> {
  const conn = getDbConnection()
  if (!conn) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const appIndex = mockApplications.findIndex((app) => app.id === applicationId)
    if (appIndex === -1) return null
    mockApplications[appIndex].status = status
    return mockApplications[appIndex]
  }
  try {
    await conn.execute(`UPDATE job_applications SET status = ? WHERE id = ?`, [status, applicationId])
    const [rows] = await conn.execute<DbJobApplication[]>(
      `SELECT id, job_id AS jobId, applicant_name AS applicantName, email, phone, resume, cover_letter AS coverLetter, status, applied_date AS appliedDate FROM job_applications WHERE id = ?`,
      [applicationId],
    )
    const updatedApp = rows[0]
    return (updatedApp as JobApplication) || null
  } catch (error) {
    console.error("Error updating application status:", error)
    throw new Error("Failed to update application status")
  }
}
