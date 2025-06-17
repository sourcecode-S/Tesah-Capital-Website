"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const users = [
  {
    id: "1",
    email: "admin@tesahcapital.com",
    password: "admin123",
    name: "Super Admin",
    role: "super_admin",
  },
  {
    id: "2",
    email: "editor@tesahcapital.com",
    password: "editor123",
    name: "Content Editor",
    role: "editor",
  },
  {
    id: "3",
    email: "viewer@tesahcapital.com",
    password: "viewer123",
    name: "Content Viewer",
    role: "viewer",
  },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simple validation
      if (!email || !password) {
        throw new Error("Please enter both email and password")
      }

      // Find user
      const user = users.find((u) => u.email === email && u.password === password)

      if (user) {
        // Store user in localStorage
        localStorage.setItem(
          "admin_user",
          JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }),
        )

        // Redirect to dashboard
        router.push("/admin/dashboard")
      } else {
        throw new Error("Invalid email or password")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 relative [&_header]:hidden [&_nav]:hidden">
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-2">
            <Link href="/">
              <Image
                src="/images/tesah-logo.png"
                alt="Tesah Capital Logo"
                width={150}
                height={60}
                className="mx-auto"
                priority
              />
            </Link>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-sm text-gray-500">Enter your credentials to access the admin dashboard</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@tesahcapital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500">
            <p className="font-medium mb-2">Demo Accounts:</p>
            <div className="space-y-1">
              <p>
                <strong>Super Admin:</strong> admin@tesahcapital.com / admin123
              </p>
              <p>
                <strong>Editor:</strong> editor@tesahcapital.com / editor123
              </p>
              <p>
                <strong>Viewer:</strong> viewer@tesahcapital.com / viewer123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
