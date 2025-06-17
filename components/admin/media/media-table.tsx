"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash2, Eye, Download, Search, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MediaFile {
  id: string
  name: string
  type: "image" | "video" | "document" | "audio"
  url: string
  size: number
  uploadedAt: string
  uploadedBy: string
  alt?: string
  description?: string
  tags: string[]
}

const mockMediaFiles: MediaFile[] = [
  {
    id: "1",
    name: "tesah-capital-logo.png",
    type: "image",
    url: "/images/tesah-capital-full-logo.png",
    size: 45678,
    uploadedAt: "2024-01-15T10:30:00Z",
    uploadedBy: "admin",
    alt: "Tesah Capital Logo",
    description: "Official company logo",
    tags: ["logo", "branding"],
  },
  {
    id: "2",
    name: "office-building.jpeg",
    type: "image",
    url: "/images/tesah-office-building.jpeg",
    size: 234567,
    uploadedAt: "2024-01-14T14:20:00Z",
    uploadedBy: "admin",
    alt: "Tesah Capital Office Building",
    description: "Main office building exterior",
    tags: ["office", "building", "exterior"],
  },
  {
    id: "3",
    name: "annual-report-2023.pdf",
    type: "document",
    url: "/documents/annual-report-2023.pdf",
    size: 1234567,
    uploadedAt: "2024-01-10T09:15:00Z",
    uploadedBy: "admin",
    description: "2023 Annual Financial Report",
    tags: ["report", "financial", "2023"],
  },
]

export default function MediaTable() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(mockMediaFiles)
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>(mockMediaFiles)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [editingFile, setEditingFile] = useState<MediaFile | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { toast } = useToast()

  // Filter files based on search term and type
  const filterFiles = () => {
    let filtered = mediaFiles

    if (searchTerm) {
      filtered = filtered.filter(
        (file) =>
          file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          file.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((file) => file.type === typeFilter)
    }

    setFilteredFiles(filtered)
  }

  // Update filters when search term or type filter changes
  useState(() => {
    filterFiles()
  }, [searchTerm, typeFilter, mediaFiles])

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"]
    if (bytes === 0) return "0 Bytes"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "bg-green-100 text-green-800"
      case "video":
        return "bg-blue-100 text-blue-800"
      case "document":
        return "bg-orange-100 text-orange-800"
      case "audio":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleEdit = (file: MediaFile) => {
    setEditingFile(file)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    if (!editingFile) return

    setMediaFiles((prev) => prev.map((file) => (file.id === editingFile.id ? editingFile : file)))

    setIsEditDialogOpen(false)
    setEditingFile(null)

    toast({
      title: "File Updated",
      description: "Media file has been updated successfully.",
    })
  }

  const handleDelete = (id: string) => {
    setMediaFiles((prev) => prev.filter((file) => file.id !== id))
    toast({
      title: "File Deleted",
      description: "Media file has been deleted successfully.",
    })
  }

  const handleDownload = (file: MediaFile) => {
    // Create a temporary link to download the file
    const link = document.createElement("a")
    link.href = file.url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download Started",
      description: `Downloading ${file.name}`,
    })
  }

  const handlePreview = (file: MediaFile) => {
    window.open(file.url, "_blank")
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Media Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFiles.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{file.name}</div>
                    {file.description && <div className="text-sm text-gray-500">{file.description}</div>}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getFileTypeColor(file.type)}>{file.type}</Badge>
                </TableCell>
                <TableCell>{formatFileSize(file.size)}</TableCell>
                <TableCell>{formatDate(file.uploadedAt)}</TableCell>
                <TableCell>{file.uploadedBy}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handlePreview(file)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(file)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownload(file)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(file.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Media File</DialogTitle>
          </DialogHeader>
          {editingFile && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fileName">File Name</Label>
                <Input
                  id="fileName"
                  value={editingFile.name}
                  onChange={(e) => setEditingFile({ ...editingFile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input
                  id="alt"
                  value={editingFile.alt || ""}
                  onChange={(e) => setEditingFile({ ...editingFile, alt: e.target.value })}
                  placeholder="Alternative text for accessibility"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingFile.description || ""}
                  onChange={(e) => setEditingFile({ ...editingFile, description: e.target.value })}
                  placeholder="File description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={editingFile.tags.join(", ")}
                  onChange={(e) =>
                    setEditingFile({
                      ...editingFile,
                      tags: e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter((tag) => tag),
                    })
                  }
                  placeholder="tag1, tag2, tag3"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredFiles.length === 0 && (
        <div className="text-center py-8 text-gray-500">No media files found matching your criteria.</div>
      )}
    </div>
  )
}
