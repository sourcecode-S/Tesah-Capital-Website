import { z } from "zod"

export const jobApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  position: z.string().min(1, "Please select a position"),
  experience: z.string().min(1, "Please select your experience level"),
  coverLetter: z.string().min(50, "Cover letter should be at least 50 characters"),
  // Don't validate the file in the schema since it's handled separately
  resumeFile: z.any().optional(),
  additionalInfo: z.string().optional(),
})

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>
