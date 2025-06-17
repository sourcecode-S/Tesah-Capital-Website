"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Upload, X, File, ImageIcon, Video, FileText, Music } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UploadFile {
  file: File
  id: string
  progress: number
  status: "pending" | "uploading" | "completed" | "error"
  url?: string
  alt?: string
  description?: string
  tags: string[]
}

interface MediaUploadDialogProps {
  onUploadComplete?: (files: UploadFile[]) => void
}

export default function MediaUploadDialog({ onUploadComplete }: MediaUploadDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-blue-500" />
    if (type.startsWith("video/")) return <Video className="h-8 w-8 text-purple-500" />
    if (type.startsWith("audio/")) return <Music className="h-8 w-8 text-green-500" />
    if (type.includes("pdf") || type.includes("document")) return <FileText className="h-8 w-8 text-red-500" />
    return <File className="h-8 w-8 text-gray-500" />
  }

  const getFileType = (mimeType: string): "image" | "video" | "document" | "audio" => {
    if (mimeType.startsWith("image/")) return "image"
    if (mimeType.startsWith("video/")) return "video"
    if (mimeType.startsWith("audio/")) return "audio"
    return "document"
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"]
    if (bytes === 0) return "0 Bytes"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newFiles: UploadFile[] = Array.from(files).map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: "pending",
      tags: [],
    }))

    setUploadFiles((prev) => [...prev, ...newFiles])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const removeFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const updateFileMetadata = (id: string, updates: Partial<UploadFile>) => {
    setUploadFiles((prev) => prev.map((file) => (file.id === id ? { ...file, ...updates } : file)))
  }

  const simulateUpload = async (uploadFile: UploadFile) => {
    // Update status to uploading
    updateFileMetadata(uploadFile.id, { status: "uploading" })

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      updateFileMetadata(uploadFile.id, { progress })
    }

    // Simulate successful upload
    const mockUrl = URL.createObjectURL(uploadFile.file)
    updateFileMetadata(uploadFile.id, {
      status: "completed",
      url: mockUrl,
      progress: 100,
    })
  }

  const handleUpload = async () => {
    const pendingFiles = uploadFiles.filter((file) => file.status === "pending")

    if (pendingFiles.length === 0) {
      toast({
        title: "No files to upload",
        description: "Please select files to upload.",
      })
      return
    }

    // Start uploading all pending files
    const uploadPromises = pendingFiles.map((file) => simulateUpload(file))

    try {
      await Promise.all(uploadPromises)

      toast({
        title: "Upload Complete",
        description: `Successfully uploaded ${pendingFiles.length} file(s).`,
      })

      // Call the callback if provided
      if (onUploadComplete) {
        onUploadComplete(uploadFiles.filter((file) => file.status === "completed"))
      }

      // Reset after a short delay
      setTimeout(() => {
        setUploadFiles([])
        setIsOpen(false)
      }, 1000)
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Some files failed to upload. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Media Files</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to browse</p>
            <p className="text-sm text-gray-500 mb-4">Support for images, videos, documents, and audio files</p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              Select Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
            />
          </div>

          {/* File List */}
          {uploadFiles.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Selected Files</h3>
              <div className="space-y-3">
                {uploadFiles.map((uploadFile) => (
                  <div key={uploadFile.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">{getFileIcon(uploadFile.file.type)}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium truncate">{uploadFile.file.name}</p>
                            <p className="text-sm text-gray-500">
                              {formatFileSize(uploadFile.file.size)} • {getFileType(uploadFile.file.type)}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFile(uploadFile.id)}
                            disabled={uploadFile.status === "uploading"}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Progress Bar */}
                        {uploadFile.status === "uploading" && (
                          <div className="mb-3">
                            <Progress value={uploadFile.progress} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">Uploading... {uploadFile.progress}%</p>
                          </div>
                        )}

                        {/* Status */}
                        {uploadFile.status === "completed" && (
                          <p className="text-sm text-green-600 mb-3">✓ Upload completed</p>
                        )}

                        {uploadFile.status === "error" && <p className="text-sm text-red-600 mb-3">✗ Upload failed</p>}

                        {/* Metadata Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {getFileType(uploadFile.file.type) === "image" && (
                            <div className="space-y-1">
                              <Label htmlFor={`alt-${uploadFile.id}`} className="text-xs">
                                Alt Text
                              </Label>
                              <Input
                                id={`alt-${uploadFile.id}`}
                                size="sm"
                                placeholder="Alternative text"
                                value={uploadFile.alt || ""}
                                onChange={(e) => updateFileMetadata(uploadFile.id, { alt: e.target.value })}
                              />
                            </div>
                          )}

                          <div className="space-y-1">
                            <Label htmlFor={`tags-${uploadFile.id}`} className="text-xs">
                              Tags
                            </Label>
                            <Input
                              id={`tags-${uploadFile.id}`}
                              size="sm"
                              placeholder="tag1, tag2, tag3"
                              value={uploadFile.tags.join(", ")}
                              onChange={(e) =>
                                updateFileMetadata(uploadFile.id, {
                                  tags: e.target.value
                                    .split(",")
                                    .map((tag) => tag.trim())
                                    .filter((tag) => tag),
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="mt-3">
                          <Label htmlFor={`desc-${uploadFile.id}`} className="text-xs">
                            Description
                          </Label>
                          <Textarea
                            id={`desc-${uploadFile.id}`}
                            placeholder="File description"
                            rows={2}
                            value={uploadFile.description || ""}
                            onChange={(e) => updateFileMetadata(uploadFile.id, { description: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Button */}
          {uploadFiles.length > 0 && (
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setUploadFiles([])}
                disabled={uploadFiles.some((file) => file.status === "uploading")}
              >
                Clear All
              </Button>
              <Button
                onClick={handleUpload}
                disabled={
                  uploadFiles.some((file) => file.status === "uploading") ||
                  uploadFiles.filter((file) => file.status === "pending").length === 0
                }
              >
                {uploadFiles.some((file) => file.status === "uploading") ? "Uploading..." : "Upload Files"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
