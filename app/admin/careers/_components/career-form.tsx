"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

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
}

interface CareerFormProps {
  job?: Job
  onSubmit: (job: Omit<Job, "id" | "postedDate">) => void
  onCancel: () => void
}

export function CareerForm({ job, onSubmit, onCancel }: CareerFormProps) {
  const [formData, setFormData] = useState({
    title: job?.title || "",
    department: job?.department || "",
    location: job?.location || "",
    type: job?.type || "full-time",
    description: job?.description || "",
    requirements: job?.requirements || [""],
    responsibilities: job?.responsibilities || [""],
    status: job?.status || ("active" as const),
    applicationDeadline: job?.applicationDeadline || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      requirements: formData.requirements.filter((req) => req.trim() !== ""),
      responsibilities: formData.responsibilities.filter((resp) => resp.trim() !== ""),
    })
  }

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }))
  }

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }))
  }

  const updateRequirement = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => (i === index ? value : req)),
    }))
  }

  const addResponsibility = () => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ""],
    }))
  }

  const removeResponsibility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }))
  }

  const updateResponsibility = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.map((resp, i) => (i === index ? value : resp)),
    }))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{job ? "Edit Job Posting" : "Create New Job Posting"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Job Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "paused" | "closed") =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicationDeadline">Application Deadline (Optional)</Label>
            <Input
              id="applicationDeadline"
              type="date"
              value={formData.applicationDeadline}
              onChange={(e) => setFormData((prev) => ({ ...prev, applicationDeadline: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Requirements</Label>
              <Button type="button" onClick={addRequirement} size="sm">
                Add Requirement
              </Button>
            </div>
            <div className="space-y-2">
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={requirement}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder="Enter requirement"
                  />
                  {formData.requirements.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeRequirement(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Responsibilities</Label>
              <Button type="button" onClick={addResponsibility} size="sm">
                Add Responsibility
              </Button>
            </div>
            <div className="space-y-2">
              {formData.responsibilities.map((responsibility, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={responsibility}
                    onChange={(e) => updateResponsibility(index, e.target.value)}
                    placeholder="Enter responsibility"
                  />
                  {formData.responsibilities.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeResponsibility(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{job ? "Update Job" : "Create Job"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
