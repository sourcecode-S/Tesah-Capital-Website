"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Search, FileText, RefreshCw, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiService } from "@/lib/api-service"

interface MediaItem {
  id: string
  name: string
  url: string
  type: string
  size: string
  dimensions?: string
  uploadedAt: string
  usage?: {
    page: string
    section: string
  }[]
}

interface PageSection {
  id: string
  name: string
  description: string
  currentMedia?: MediaItem
  allowedTypes: string[] // e.g., ["image", "video", "document"]
}

interface PageMediaManagerProps {
  pageName: string
  sections: PageSection[]
  onMediaUpdate: (sectionId: string, mediaItem: MediaItem | null) => void
}

export function PageMediaManager({ pageName, sections, onMediaUpdate }: PageMediaManagerProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSection, setSelectedSection] = useState<PageSection | null>(null)
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadPreview, setUploadPreview] = useState<string | null>(null)
  const { toast } = useToast()

  // Load media items
  const loadMediaItems = async () => {
    setIsLoading(true)
    try {
      const response = await apiService.getMedia()
      if (response.success && response.data) {
        setMediaItems(response.data)
      }
    } catch (error) {
      console.error("Error loading media:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Filter media items based on search query and allowed types
  const getFilteredMedia = () => {
    if (!selectedSection) return []

    return mediaItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedSection.allowedTypes.includes(item.type) ||
          (item.type.startsWith("image/") && selectedSection.allowedTypes.includes("image"))),
    )
  }

  // Handle opening the media selector for a specific section
  const handleOpenMediaSelector = (section: PageSection) => {
    setSelectedSection(section)
    loadMediaItems()
    setIsMediaSelectorOpen(true)
  }

  // Handle selecting a media item for a section
  const handleSelectMedia = (mediaItem: MediaItem) => {
    if (!selectedSection) return

    onMediaUpdate(selectedSection.id, mediaItem)

    toast({
      title: "Media updated",
      description: `${mediaItem.name} has been set for ${selectedSection.name}`,
    })

    setIsMediaSelectorOpen(false)
  }

  // Handle removing media from a section
  const handleRemoveMedia = (section: PageSection) => {
    onMediaUpdate(section.id, null)

    toast({
      title: "Media removed",
      description: `Media has been removed from ${section.name}`,
    })
  }

  // Handle file selection for upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setUploadFile(file)

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setUploadPreview(event.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setUploadPreview(null)
      }
    }
  }

  // Handle uploading a new file
  const handleUpload = async () => {
    if (!uploadFile || !selectedSection) return

    try {
      const response = await apiService.uploadMedia(uploadFile)

      if (response.success && response.data) {
        // Add the new media item to the list
        setMediaItems([response.data, ...mediaItems])

        // Set it as the selected media for the section
        onMediaUpdate(selectedSection.id, response.data)

        setUploadFile(null)
        setUploadPreview(null)
        setIsUploadOpen(false)
        setIsMediaSelectorOpen(false)

        toast({
          title: "File uploaded",
          description: `${uploadFile.name} has been uploaded and set for ${selectedSection.name}`,
        })
      } else {
        throw new Error(response.error || "Upload failed")
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{pageName} Media</h2>
        <Button variant="outline" onClick={loadMediaItems}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{section.name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
              {section.currentMedia ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                  {section.currentMedia.type === "image" || section.currentMedia.type.startsWith("image/") ? (
                    <Image
                      src={section.currentMedia.url || "/placeholder.svg"}
                      alt={section.currentMedia.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted">
                      <FileText className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center aspect-video w-full rounded-md border border-dashed">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">No media selected</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex w-full justify-between">
                <p className="text-xs text-muted-foreground">
                  {section.currentMedia ? section.currentMedia.name : "No file selected"}
                </p>
                <div className="flex gap-2">
                  {section.currentMedia && (
                    <Button variant="outline" size="sm" onClick={() => handleRemoveMedia(section)}>
                      Remove
                    </Button>
                  )}
                  <Button size="sm" onClick={() => handleOpenMediaSelector(section)}>
                    {section.currentMedia ? "Change" : "Select Media"}
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Media Selector Dialog */}
      <Dialog open={isMediaSelectorOpen} onOpenChange={setIsMediaSelectorOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedSection ? `Select Media for ${selectedSection.name}` : "Select Media"}</DialogTitle>
          </DialogHeader>

          <div className="flex items-center justify-between py-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button onClick={() => setIsUploadOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload New
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Media</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading ? (
                  <div className="col-span-full flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : getFilteredMedia().length === 0 ? (
                  <div className="col-span-full text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No media items found</p>
                  </div>
                ) : (
                  getFilteredMedia().map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleSelectMedia(item)}
                    >
                      <div className="aspect-square relative">
                        {item.type === "image" || item.type.startsWith("image/") ? (
                          <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-muted">
                            <FileText className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <p className="truncate text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.size}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="images" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading ? (
                  <div className="col-span-full flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  getFilteredMedia()
                    .filter((item) => item.type === "image" || item.type.startsWith("image/"))
                    .map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                        onClick={() => handleSelectMedia(item)}
                      >
                        <div className="aspect-square relative">
                          <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="p-2">
                          <p className="truncate text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.size}</p>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="documents" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading ? (
                  <div className="col-span-full flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  getFilteredMedia()
                    .filter((item) => item.type !== "image" && !item.type.startsWith("image/"))
                    .map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                        onClick={() => handleSelectMedia(item)}
                      >
                        <div className="aspect-square relative">
                          <div className="flex items-center justify-center h-full bg-muted">
                            <FileText className="h-12 w-12 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="p-2">
                          <p className="truncate text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.size}</p>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file-upload">Select File</Label>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                accept={selectedSection?.allowedTypes.includes("image") ? "image/*" : "*"}
              />
            </div>
            {uploadPreview && (
              <div className="relative w-full h-64 overflow-hidden rounded-md border">
                <Image src={uploadPreview || "/placeholder.svg"} alt="Upload preview" fill className="object-contain" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!uploadFile}>
              Upload & Select
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
