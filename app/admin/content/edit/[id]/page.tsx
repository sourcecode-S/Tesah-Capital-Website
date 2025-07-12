"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"

export default function EditContentPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id: string }

  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState("draft")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch page data by ID
    const mockPageData = {
      "1": { title: "Home Page", slug: "home", content: "Welcome to our homepage!", status: "published" },
      "2": { title: "About Us", slug: "about", content: "Learn more about Tesah Capital.", status: "published" },
      "3": { title: "Contact Us", slug: "contact", content: "Get in touch with us.", status: "draft" },
    } as { [key: string]: { title: string; slug: string; content: string; status: string } }

    if (id && mockPageData[id]) {
      const page = mockPageData[id]
      setTitle(page.title)
      setSlug(page.slug)
      setContent(page.content)
      setStatus(page.status)
      setLoading(false)
    } else {
      toast({
        title: "Page Not Found",
        description: `No page found with ID: ${id}`,
        variant: "destructive",
      })
      router.push("/admin/content")
    }
  }, [id, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd send updated data to your backend API
    console.log({ id, title, slug, content, status })
    toast({
      title: "Page Updated!",
      description: `"${title}" has been updated.`,
    })
    router.push("/admin/content")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <p>Loading page data...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Edit Page: {title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Page Details</CardTitle>
          <CardDescription>Modify the content and settings for this page.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Page Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug (URL Path)</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Page Content</Label>
              <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={10} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
