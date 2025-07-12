"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export default function NewContentPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState("draft")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd send this data to your backend API
    console.log({ title, slug, content, status })
    toast({
      title: "Page Created!",
      description: `"${title}" has been created as a ${status}.`,
    })
    router.push("/admin/content")
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Create New Page</h1>
      <Card>
        <CardHeader>
          <CardTitle>Page Details</CardTitle>
          <CardDescription>Fill in the details for your new website page.</CardDescription>
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
              Create Page
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
