import { type NextRequest, NextResponse } from "next/server"
import { jobApplicationSchema } from "@/lib/schemas/job-application"

// SECURITY: Set maximum request size (1 MB)
export const runtime = "nodejs"

// SECURITY: Simple in-memory rate limiting (use Redis in production)
const requestTracker = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = requestTracker.get(ip)

  if (!record || now > record.resetTime) {
    requestTracker.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return true
  }

  if (record.count >= 5) {
    // Max 5 requests per minute
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // SECURITY: Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"

    // SECURITY: Apply rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        { status: 429 },
      )
    }

    // SECURITY: Check content type
    const contentType = request.headers.get("content-type")
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          message: "Content-Type must be application/json",
        },
        { status: 400 },
      )
    }

    // SECURITY: Limit request body size
    const contentLength = request.headers.get("content-length")
    if (contentLength && parseInt(contentLength) > 1048576) {
      // 1 MB limit
      return NextResponse.json(
        {
          success: false,
          message: "Request body too large",
        },
        { status: 413 },
      )
    }

    const body = await request.json()

    // Validate the request body
    const validatedData = jobApplicationSchema.parse(body)

    // In a real application, you would:
    // 1. Store the application in a database
    // 2. Send notification emails
    // 3. Process the resume file

    // For now, we'll just return a success response
    return NextResponse.json({
      success: true,
      message: "Application received successfully",
    })
  } catch (error) {
    // SECURITY: Don't expose internal error details to clients
    console.error("Error processing job application:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process application",
      },
      { status: 400 },
    )
  }
}
