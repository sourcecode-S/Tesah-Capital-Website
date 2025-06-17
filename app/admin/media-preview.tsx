"use client"

import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Upload, Copy, Trash2, FileText } from "lucide-react"

export default function MediaPreview() {
  const mediaItems = [
    { id: 1, name: "banner-1.jpg", type: "image" },
    { id: 2, name: "team-photo.jpg", type: "image" },
    { id: 3, name: "product-brochure.pdf", type: "document" },
    { id: 4, name: "leadership.jpg", type: "image" },
  ]

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search media..." className="pl-8" />
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Media</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mediaItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative aspect-square cursor-pointer bg-muted">
                  {item.type === "image" ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Image Preview</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <FileText className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardFooter className="p-2 flex-col items-start">
                  <div className="w-full truncate text-sm font-medium">{item.name}</div>
                  <div className="w-full flex justify-between items-center mt-1">
                    <span className="text-xs text-muted-foreground">1.2 MB</span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-700">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
