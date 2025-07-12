import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import Image from "next/image"

export default function AdminMediaPage() {
  const mockMedia = [
    { id: "1", name: "tesah-office-building.jpeg", url: "/images/tesah-office-building.jpeg", type: "image/jpeg" },
    { id: "2", name: "tesah-awards-event.jpeg", url: "/images/tesah-awards-event.jpeg", type: "image/jpeg" },
    { id: "3", name: "tesah-logo-new.png", url: "/images/tesah-logo-new.png", type: "image/png" },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Media Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Upload Media
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Media</CardTitle>
          <CardDescription>Manage images, videos, and other files used on your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mockMedia.map((media) => (
              <div key={media.id} className="relative group aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={media.url || "/placeholder.svg"}
                  alt={media.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="sm" className="mr-2">
                    View
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-xs truncate">
                  {media.name}
                </div>
              </div>
            ))}
            {mockMedia.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">No media uploaded yet.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
