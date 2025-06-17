"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle, ArrowLeft, Eye, ImageIcon, Loader2, Plus, Save, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { saveContent, getContent } from "@/lib/content-manager"

interface SlideItem {
  id: string
  title: string
  description: string
  imageUrl: string
  buttonText: string
  buttonUrl: string
  active: boolean
  order: number
}

interface SlideshowGroup {
  id: string
  name: string
  location: string
  slides: SlideItem[]
}

export default function SlideshowPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false)
  const [mediaItems, setMediaItems] = useState<any[]>([])
  const [isLoadingMedia, setIsLoadingMedia] = useState(false)
  const [selectedSlide, setSelectedSlide] = useState<SlideItem | null>(null)
  const [slides, setSlides] = useState<any[]>([])
  const router = useRouter()
  const { toast } = useToast()

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Load existing slideshow data
  useEffect(() => {
    const loadSlideshowData = async () => {
      try {
        const existingData = await getContent("slideshow")
        if (existingData) {
          // Convert the stored data back to the expected format
          const groups = Object.entries(existingData).map(([key, value]: [string, any]) => ({
            id: key,
            name: value.name || `${key} Slideshow`,
            location: value.location || `${key} Page`,
            slides: value.slides || [],
          }))
          setSlides(groups.find((g) => g.id === "home")?.slides || [])
        } else {
          // Initialize with default slides if none exist
          setSlides([
            {
              id: "1",
              title: "Tesah Future Fund",
              description: "Our flagship equity fund designed for long-term growth",
              imageUrl: "/images/tesah-future-fund-banner.jpeg",
              active: true,
              order: 1,
            },
            {
              id: "2",
              title: "Tesah Treasury Trust",
              description: "A fixed income fund focused on capital preservation and steady returns",
              imageUrl: "/images/tesah-treasury-trust-banner.jpeg",
              active: true,
              order: 2,
            },
          ])
        }
      } catch (error) {
        console.error("Error loading slideshow data:", error)
        toast({
          title: "Error",
          description: "Failed to load slideshow data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      loadSlideshowData()
    }
  }, [user, toast])

  const handleSaveSlideshow = async () => {
    setIsSaving(true)

    try {
      // Convert slideshow groups to the format expected by content manager
      const slideshowData = {
        home: {
          slides: slides.sort((a: any, b: any) => a.order - b.order),
        },
      }

      await saveContent("slideshow", slideshowData)

      toast({
        title: "Slideshow saved",
        description: "Your slideshow changes have been applied to the website",
      })
    } catch (error) {
      console.error("Error saving slideshow:", error)
      toast({
        title: "Error",
        description: "Failed to save slideshow changes",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreviewChanges = () => {
    setIsPreviewing(true)
    // Store in localStorage for preview
    const slideshowData = {
      home: {
        slides: slides.sort((a: any, b: any) => a.order - b.order),
      },
    }

    localStorage.setItem("slideshow_preview", JSON.stringify(slideshowData))

    // Open preview in new tab
    window.open("/admin-preview", "_blank")

    setTimeout(() => {
      setIsPreviewing(false)
    }, 1000)
  }

  const handleAddSlide = () => {
    const newSlide: SlideItem = {
      id: `slide-${Date.now()}`,
      title: "New Slide",
      description: "Enter slide description here",
      imageUrl: "/placeholder.svg?height=600&width=1200",
      buttonText: "Learn More",
      buttonUrl: "/",
      active: true,
      order: slides.length + 1,
    }

    setSlides([...slides, newSlide])
    setSelectedSlide(newSlide)
  }

  const handleDeleteSlide = (slideId: string) => {
    setSlides(slides.filter((slide) => slide.id !== slideId))

    if (selectedSlide?.id === slideId) {
      setSelectedSlide(null)
    }
  }

  const handleUpdateSlide = (slideId: string, data: Partial<SlideItem>) => {
    setSlides(slides.map((slide) => (slide.id === slideId ? { ...slide, ...data } : slide)))

    if (selectedSlide?.id === slideId) {
      setSelectedSlide((prev) => (prev ? { ...prev, ...data } : null))
    }
  }

  const loadMediaLibrary = async () => {
    setIsLoadingMedia(true)

    // Simulate API call
    setTimeout(() => {
      setMediaItems([
        {
          id: "media1",
          name: "Tesah Future Fund Banner",
          url: "/images/tesah-future-fund-banner.jpeg",
          type: "image",
        },
        {
          id: "media2",
          name: "Tesah Treasury Trust Banner",
          url: "/images/tesah-treasury-trust-banner.jpeg",
          type: "image",
        },
        {
          id: "media3",
          name: "Tesah Office Building",
          url: "/images/tesah-office-building.jpeg",
          type: "image",
        },
      ])
      setIsLoadingMedia(false)
    }, 500)
  }

  const handleOpenMediaDialog = () => {
    loadMediaLibrary()
    setIsMediaDialogOpen(true)
  }

  const handleSelectMedia = (mediaItem: any) => {
    if (selectedSlide) {
      handleUpdateSlide(selectedSlide.id, { imageUrl: mediaItem.url })
    }
    setIsMediaDialogOpen(false)
  }

  const moveSlide = (id: string, direction: "up" | "down") => {
    const index = slides.findIndex((slide) => slide.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === slides.length - 1)) {
      return
    }

    const newSlides = [...slides]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    const temp = newSlides[targetIndex]
    newSlides[targetIndex] = { ...newSlides[index], order: targetIndex + 1 }
    newSlides[index] = { ...temp, order: index + 1 }
    setSlides(newSlides)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
          <p className="text-gray-600">Please log in to manage slideshows.</p>
        </div>
      </div>
    )
  }

  const canEditContent = ["super_admin", "admin", "editor"].includes(user.role)

  if (!canEditContent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
          <p className="text-gray-600">You don't have permission to edit slideshows.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/content")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Slideshow Manager</h1>
            <p className="text-gray-600 mt-1">Manage slideshows and banners across the website</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePreviewChanges} disabled={isPreviewing || isSaving}>
            {isPreviewing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Eye className="mr-2 h-4 w-4" />}
            Preview Changes
          </Button>
          <Button onClick={handleSaveSlideshow} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save & Apply
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Slideshow Groups</CardTitle>
              <CardDescription>Select a slideshow to edit</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
                <TabsList className="flex flex-col items-stretch h-auto">
                  <TabsTrigger value="home" className="justify-start text-left px-3 py-2 h-auto">
                    <div>
                      <div className="font-medium">Homepage Slideshow</div>
                      <div className="text-xs text-gray-500">Homepage Hero</div>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Homepage Slideshow</CardTitle>
                  <CardDescription>Manage slides for Homepage Hero</CardDescription>
                </div>
                <Button onClick={handleAddSlide}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Slide
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {slides.map((slide) => (
                    <Card
                      key={slide.id}
                      className={`cursor-pointer overflow-hidden ${selectedSlide?.id === slide.id ? "ring-2 ring-blue-500" : ""}`}
                      onClick={() => setSelectedSlide(slide)}
                    >
                      <div className="aspect-[16/9] relative bg-gray-100">
                        <img
                          src={slide.imageUrl || "/placeholder.svg"}
                          alt={slide.title}
                          className="object-cover w-full h-full"
                        />
                        {!slide.active && (
                          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                            <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded">Inactive</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium truncate">{slide.title}</h3>
                        <p className="text-xs text-gray-500 truncate">{slide.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedSlide && (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Slide</CardTitle>
                  <CardDescription>Modify the selected slide details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="slide-title">Title</Label>
                      <Input
                        id="slide-title"
                        value={selectedSlide.title}
                        onChange={(e) => handleUpdateSlide(selectedSlide.id, { title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slide-order">Display Order</Label>
                      <Input
                        id="slide-order"
                        type="number"
                        value={selectedSlide.order}
                        onChange={(e) =>
                          handleUpdateSlide(selectedSlide.id, {
                            order: Number.parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slide-description">Description</Label>
                    <Textarea
                      id="slide-description"
                      value={selectedSlide.description}
                      onChange={(e) => handleUpdateSlide(selectedSlide.id, { description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="slide-image">Image</Label>
                      <Button variant="outline" size="sm" onClick={handleOpenMediaDialog}>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Select Image
                      </Button>
                    </div>
                    <div className="aspect-[16/9] relative bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={selectedSlide.imageUrl || "/placeholder.svg"}
                        alt={selectedSlide.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="button-text">Button Text</Label>
                      <Input
                        id="button-text"
                        value={selectedSlide.buttonText}
                        onChange={(e) => handleUpdateSlide(selectedSlide.id, { buttonText: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="button-url">Button URL</Label>
                      <Input
                        id="button-url"
                        value={selectedSlide.buttonUrl}
                        onChange={(e) => handleUpdateSlide(selectedSlide.id, { buttonUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="slide-active"
                      checked={selectedSlide.active}
                      onCheckedChange={(checked) => handleUpdateSlide(selectedSlide.id, { active: checked })}
                    />
                    <Label htmlFor="slide-active">Active</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-gray-50">
                  <Button variant="destructive" onClick={() => handleDeleteSlide(selectedSlide.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Slide
                  </Button>
                  <Button onClick={() => setSelectedSlide(null)} variant="outline">
                    Done
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Media Library Dialog */}
      <Dialog open={isMediaDialogOpen} onOpenChange={setIsMediaDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Media Library</DialogTitle>
            <DialogDescription>Select an image for your slide</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
            {isLoadingMedia ? (
              <div className="col-span-full flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : mediaItems.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No media items found</p>
              </div>
            ) : (
              mediaItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleSelectMedia(item)}
                >
                  <div className="aspect-square relative">
                    {item.type === "image" ? (
                      <img
                        src={item.url || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-muted">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-2 truncate text-sm">{item.name}</div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
