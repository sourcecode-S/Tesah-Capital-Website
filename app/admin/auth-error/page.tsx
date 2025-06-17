"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { AlertCircle, ArrowLeft, ShieldAlert, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [errorType, setErrorType] = useState<string>("")

  useEffect(() => {
    const error = searchParams?.get("error")

    // Map error codes to user-friendly messages
    const errorMessages: Record<string, { message: string; type: string }> = {
      Configuration: {
        message: "There is a problem with the server configuration. Please contact support.",
        type: "server",
      },
      AccessDenied: {
        message: "You do not have permission to access this resource.",
        type: "permission",
      },
      Verification: {
        message: "The verification link is invalid or has expired.",
        type: "link",
      },
      session: {
        message: "Your session has expired or is invalid. Please sign in again.",
        type: "session",
      },
      role: {
        message: "Your account role is not properly configured. Please contact support.",
        type: "role",
      },
      Default: {
        message: "An unexpected authentication error occurred. Please try again.",
        type: "unknown",
      },
    }

    const errorInfo = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default
    setErrorMessage(errorInfo.message)
    setErrorType(errorInfo.type)
  }, [searchParams])

  const handleRetry = () => {
    window.location.href = "/admin/login"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <Image
              src="/images/tesah-capital-full-logo.png"
              alt="Tesah Capital Logo"
              width={200}
              height={60}
              className="mx-auto object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Error</h1>
          <p className="text-gray-600">We encountered an issue with your sign-in attempt</p>
        </div>

        {/* Error Card */}
        <Card className="bg-white shadow-2xl border-0 rounded-2xl">
          <CardHeader className="text-center pb-4">
            <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ShieldAlert className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Authentication Failed</CardTitle>
            <CardDescription className="text-gray-600">We couldn't complete your sign-in request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Details</AlertTitle>
              <AlertDescription className="text-red-700">{errorMessage}</AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">What you can try:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Check your email and password</li>
                  <li>Make sure your account is active</li>
                  <li>Clear your browser cookies and cache</li>
                  <li>Try again in a few minutes</li>
                </ul>
              </div>

              <div className="flex flex-col space-y-3">
                <Button onClick={handleRetry} className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>

                <Button variant="outline" asChild className="w-full">
                  <Link href="/admin/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Login
                  </Link>
                </Button>

                <Button variant="ghost" asChild className="w-full">
                  <Link href="/">Go to Homepage</Link>
                </Button>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>Need assistance? Contact IT support at support@tesahcapital.com</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Tesah Capital Limited • All rights reserved
          </p>
        </div>
      </div>
    </div>
  )
}
