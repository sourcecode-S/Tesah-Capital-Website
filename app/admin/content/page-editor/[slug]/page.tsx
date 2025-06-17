"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageBuilder } from "@/components/page-builder"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ArrowLeft, Save, ImageIcon, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiService } from "@/lib/api-service"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function PageEditorPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const decodedSlug = decodeURIComponent(slug)
  const router = useRouter()
  const { toast } = useToast()

  const [pageTitle, setPageTitle] = useState("")
  const [pageDescription, setPageDescription] = useState("")
  const [pageBlocks, setPageBlocks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("visual")
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false)
  const [mediaItems, setMediaItems] = useState<any[]>([])
  const [isLoadingMedia, setIsLoadingMedia] = useState(false)

  useEffect(() => {
    const loadPage = async () => {
      setIsLoading(true)
      try {
        const response = await apiService.getPage(decodedSlug)
        if (response.success && response.data) {
          setPageTitle(response.data.title || `Page: ${decodedSlug}`)
          setPageDescription(response.data.description || "")
          setPageBlocks(response.data.blocks || [])
        } else {
          setPageTitle(`New Page: ${decodedSlug}`)
        }
      } catch (error) {
        console.error("Error loading page:", error)
        toast({
          title: "Error",
          description: "Failed to load page data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPage()
  }, [decodedSlug, toast])

  const handleSavePage = async () => {
    try {
      const pageData = {
        title: pageTitle,
        description: pageDescription,
        blocks: pageBlocks,
        updatedAt: new Date().toISOString(),
      }

      const response = await apiService.savePage(decodedSlug, pageData)

      if (response.success) {
        toast({
          title: "Page saved",
          description: "Your changes have been saved successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      console.error("Error saving page:", error)
      toast({
        title: "Error",
        description: "Failed to save page",
        variant: "destructive",
      })
    }
  }

  const loadMediaLibrary = async () => {
    setIsLoadingMedia(true)
    try {
      const response = await apiService.getMedia()
      if (response.success && response.data) {
        setMediaItems(response.data)
      }
    } catch (error) {
      console.error("Error loading media:", error)
    } finally {
      setIsLoadingMedia(false)
    }
  }

  const handleOpenMediaDialog = () => {
    loadMediaLibrary()
    setIsMediaDialogOpen(true)
  }

  const handleSelectMedia = (mediaItem: any) => {
    // This would insert the media into the current editor
    // For now, we'll just close the dialog
    setIsMediaDialogOpen(false)

    toast({
      title: "Media selected",
      description: `${mediaItem.name} has been selected`,
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading page content...</p>
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
          <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleOpenMediaDialog}>
            <ImageIcon className="mr-2 h-4 w-4" />
            Media Library
          </Button>
          <Button onClick={handleSavePage}>
            <Save className="mr-2 h-4 w-4" />
            Save Page
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Page Details</CardTitle>
          <CardDescription>Basic information about this page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="page-title">Page Title</Label>
              <Input
                id="page-title"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                placeholder="Enter page title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="page-description">Meta Description</Label>
              <Input
                id="page-description"
                value={pageDescription}
                onChange={(e) => setPageDescription(e.target.value)}
                placeholder="Enter page description for SEO"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="visual">Visual Editor</TabsTrigger>
          <TabsTrigger value="code">Code Editor</TabsTrigger>
        </TabsList>
        <TabsContent value="visual" className="space-y-4">
          <PageBuilder initialBlocks={pageBlocks} onSave={setPageBlocks} />
        </TabsContent>
        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>HTML Editor</CardTitle>
              <CardDescription>Edit the page HTML directly</CardDescription>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                initialValue={`<div class="container mx-auto py-8">
  <h1 class="text-3xl font-bold mb-4">Page Content</h1>
  <p>Edit this content or switch to the Visual Editor to use the page builder.</p>
</div>`}
                onChange={() => {}}
                height="min-h-[500px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Media Library Dialog */}
      <Dialog open={isMediaDialogOpen} onOpenChange={setIsMediaDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Media Library</DialogTitle>
            <DialogDescription>Select media to insert into your page</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
            {isLoadingMedia ? (
              <div className="col-span-full flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : mediaItems.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
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
                        <FileText className="h-12 w-12 text-muted-foreground" />
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
