"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GripVertical, Pencil, Trash2, Plus, Save } from "lucide-react"

export default function SlideshowPreview() {
  const [slides] = useState([
    {
      id: "slide-1",
      title: "Tesah Treasury Trust (TTT)",
      description: "Looking for a risk-free collective investment scheme?",
    },
    {
      id: "slide-2",
      title: "Tesah Future Fund (TFF)",
      description: "Let Tesah help you invest in a brighter future today",
    },
    {
      id: "slide-3",
      title: "Investment Products",
      description: "Our team presenting our flagship investment products",
    },
  ])

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Slideshow Editor</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Slideshow</CardTitle>
          <CardDescription>Drag and drop to reorder slides. Click on a slide to edit its content.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {slides.map((slide, index) => (
              <div key={slide.id} className="flex items-center gap-4 p-4 border rounded-lg bg-background">
                <div className="cursor-grab">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="relative h-16 w-28 overflow-hidden rounded-md bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Slide Image</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{slide.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{slide.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="mt-4 w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Slide
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
