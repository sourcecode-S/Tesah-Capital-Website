"use client"

import { useState } from "react"
import Link from "next/link"
import { Building, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ClientPortalPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleRegisterPasswordVisibility = () => {
    setShowRegisterPassword(!showRegisterPassword)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Client Portal</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Access your investment accounts or register for a new account.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-md">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <Card>
                    <CardHeader>
                      <CardTitle>Login to Your Account</CardTitle>
                      <CardDescription>Enter your credentials to access your investment dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="email" placeholder="name@example.com" type="email" className="pl-10" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link href="#" className="text-sm font-medium text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-primary hover:bg-primary/90">Login</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="register">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create an Account</CardTitle>
                      <CardDescription>Register to access our investment services and opportunities.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input id="firstName" placeholder="John" className="pl-10" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="surname">Surname</Label>
                          <Input id="surname" placeholder="Doe" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="otherNames">Other Names</Label>
                        <Input id="otherNames" placeholder="Middle name (optional)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="registerEmail">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="registerEmail"
                            placeholder="name@example.com"
                            type="email"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="phoneNumber" placeholder="+233 XX XXX XXXX" className="pl-10" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="registerPassword">New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="registerPassword"
                            type={showRegisterPassword ? "text" : "password"}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={toggleRegisterPasswordVisibility}
                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          >
                            {showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showRegisterPassword ? "Hide password" : "Show password"}</span>
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Password must be at least 8 characters long and include a mix of letters, numbers, and
                          symbols.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-secondary hover:bg-secondary/90">Register</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-primary-foreground text-sm">
                  Client Benefits
                </div>
                <h2 className="text-3xl font-bold tracking-tighter">Why Create an Account?</h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Building className="h-5 w-5 text-primary mt-0.5" />
                    <span>Access your investment portfolio 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Building className="h-5 w-5 text-primary mt-0.5" />
                    <span>Track performance of your investments in real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Building className="h-5 w-5 text-primary mt-0.5" />
                    <span>Receive personalized investment recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Building className="h-5 w-5 text-primary mt-0.5" />
                    <span>Easily make additional investments or withdrawals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Building className="h-5 w-5 text-primary mt-0.5" />
                    <span>Access exclusive investment opportunities</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -right-4 h-72 w-72 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-4 -left-4 h-72 w-72 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="relative bg-background p-6 rounded-lg shadow-lg border">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Tesah Client Portal</h3>
                      <p className="text-sm text-muted-foreground">Secure access to your investments</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "75%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Portfolio Value</span>
                      <span className="font-medium">GH₵ 125,000</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-secondary h-full" style={{ width: "62%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">YTD Return</span>
                      <span className="font-medium text-green-600">+18.7%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "89%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Goal Progress</span>
                      <span className="font-medium">89%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Need Help Getting Started?</h2>
              <p className="text-secondary-foreground/80 md:text-xl">
                Our team is available to assist you with account creation and answer any questions.
              </p>
              <Button size="lg" className="mt-4 bg-primary hover:bg-primary/90" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
