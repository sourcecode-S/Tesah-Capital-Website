"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Home, Building, FileText, BarChart, Users, ImageIcon } from "lucide-react"
import Link from "next/link"

export default function ContentPreview() {
  const contentSections = [
    {
      title: "Home Page",
      description: "Manage hero section, slideshow, and featured content",
      icon: Home,
    },
    {
      title: "About Us",
      description: "Edit company information, mission, and values",
      icon: Building,
    },
    {
      title: "Services",
      description: "Update service offerings and descriptions",
      icon: FileText,
    },
    {
      title: "Investment Products",
      description: "Manage investment product details and performance data",
      icon: BarChart,
    },
    {
      title: "Team",
      description: "Edit team member profiles and leadership information",
      icon: Users,
    },
    {
      title: "Slideshow",
      description: "Manage homepage and page banners",
      icon: ImageIcon,
    },
  ]

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contentSections.map((section, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <section.icon className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="min-h-[40px]">{section.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full justify-between">
                <Link href="#">
                  Manage
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
