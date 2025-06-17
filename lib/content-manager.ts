// Types
export interface SlideContent {
  id: string
  title: string
  description: string
  imageUrl: string
  ctaText?: string
  ctaUrl?: string
  order: number
}

export interface MediaItem {
  id: string
  title: string
  description?: string
  url: string
  type: "image" | "video" | "document"
  fileSize: number
  dimensions?: {
    width: number
    height: number
  }
  uploadedAt: string
  uploadedBy: string
}

// Content types
export type ContentType = "slideshow" | "page" | "team" | "settings" | "navigation"

// Mock data
const slides: SlideContent[] = [
  {
    id: "slide1",
    title: "Welcome to Tesah Capital",
    description: "Your trusted partner for wealth management and investment solutions in Ghana.",
    imageUrl: "/images/tesah-office-building.jpeg",
    ctaText: "Learn More",
    ctaUrl: "/about",
    order: 1,
  },
  {
    id: "slide2",
    title: "Tesah Treasury Trust",
    description: "A low-risk investment product designed to preserve capital while providing steady returns.",
    imageUrl: "/images/tesah-treasury-trust-banner.jpeg",
    ctaText: "Explore TTT",
    ctaUrl: "/investment-products#ttt",
    order: 2,
  },
  {
    id: "slide3",
    title: "Tesah Future Fund",
    description: "A long-term investment solution for growth and future financial security.",
    imageUrl: "/images/tesah-future-fund-banner.jpeg",
    ctaText: "Explore TFF",
    ctaUrl: "/investment-products#tff",
    order: 3,
  },
]

const mediaItems: MediaItem[] = [
  {
    id: "media1",
    title: "Tesah Capital Logo",
    description: "Official logo of Tesah Capital",
    url: "/images/tesah-capital-full-logo.png",
    type: "image",
    fileSize: 24500,
    dimensions: {
      width: 800,
      height: 200,
    },
    uploadedAt: "2023-01-15T10:30:00Z",
    uploadedBy: "admin",
  },
  {
    id: "media2",
    title: "Office Building",
    description: "Tesah Capital office building in Accra",
    url: "/images/tesah-office-building.jpeg",
    type: "image",
    fileSize: 1250000,
    dimensions: {
      width: 1920,
      height: 1080,
    },
    uploadedAt: "2023-02-20T14:45:00Z",
    uploadedBy: "admin",
  },
]

// Get content from storage
export async function getContent(contentType: ContentType, id?: string): Promise<any> {
  return getDefaultContent(contentType, id)
}

// Save content to storage - this is a no-op now
export async function saveContent(contentType: ContentType, id: string, data: any): Promise<boolean> {
  console.log(`Mock saving ${contentType} with id ${id}`, data)
  return true
}

// Get default content for different content types
function getDefaultContent(contentType: ContentType, id?: string): any {
  switch (contentType) {
    case "slideshow":
      return {
        home: {
          slides: [
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
          ],
        },
      }

    case "page":
      // Return default page content based on ID
      if (id === "about") {
        return {
          title: "About Tesah Capital",
          content: "Default about page content",
        }
      }
      return {
        title: "Page Title",
        content: "Default page content",
      }

    case "team":
      return {
        members: [],
      }

    case "settings":
      return {
        siteTitle: "Tesah Capital",
        contactEmail: "info@tesahcapital.com",
        contactPhone: "+233 302 937 437",
        socialLinks: {
          facebook: "https://www.facebook.com/tesahcapital",
          twitter: "https://twitter.com/tesahcapital",
          linkedin: "https://www.linkedin.com/company/tesah-capital",
        },
      }

    case "navigation":
      return {
        items: [],
      }

    default:
      return {}
  }
}

// List all content of a specific type
export async function listContent(contentType: ContentType): Promise<any[]> {
  switch (contentType) {
    case "slideshow":
      return slides
    case "page":
      return [
        { id: "about", title: "About Us" },
        { id: "services", title: "Our Services" },
        { id: "contact", title: "Contact Us" },
      ]
    default:
      return []
  }
}

// Delete content
export async function deleteContent(contentType: ContentType, id: string): Promise<boolean> {
  console.log(`Mock deleting ${contentType} with id ${id}`)
  return true
}

// Slide management functions
export async function getSlides(): Promise<SlideContent[]> {
  return [...slides].sort((a, b) => a.order - b.order)
}

export async function getSlideById(id: string): Promise<SlideContent | null> {
  return slides.find((slide) => slide.id === id) || null
}

export async function createSlide(slideData: Omit<SlideContent, "id">): Promise<SlideContent> {
  const newSlide: SlideContent = {
    ...slideData,
    id: `slide${Date.now()}`,
  }
  slides.push(newSlide)
  return newSlide
}

export async function updateSlide(
  id: string,
  updates: Partial<Omit<SlideContent, "id">>,
): Promise<SlideContent | null> {
  const slideIndex = slides.findIndex((slide) => slide.id === id)
  if (slideIndex === -1) {
    return null
  }

  slides[slideIndex] = {
    ...slides[slideIndex],
    ...updates,
  }

  return slides[slideIndex]
}

export async function deleteSlide(id: string): Promise<boolean> {
  const slideIndex = slides.findIndex((slide) => slide.id === id)
  if (slideIndex === -1) {
    return false
  }

  slides.splice(slideIndex, 1)
  return true
}

export async function reorderSlides(slideIds: string[]): Promise<SlideContent[]> {
  // Update the order of slides based on the provided array of IDs
  slideIds.forEach((id, index) => {
    const slide = slides.find((s) => s.id === id)
    if (slide) {
      slide.order = index + 1
    }
  })

  return getSlides()
}

// Media management functions
export async function getMediaItems(): Promise<MediaItem[]> {
  return [...mediaItems].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
}

export async function getMediaItemById(id: string): Promise<MediaItem | null> {
  return mediaItems.find((item) => item.id === id) || null
}

export async function createMediaItem(itemData: Omit<MediaItem, "id" | "uploadedAt">): Promise<MediaItem> {
  const newItem: MediaItem = {
    ...itemData,
    id: `media${Date.now()}`,
    uploadedAt: new Date().toISOString(),
  }
  mediaItems.push(newItem)
  return newItem
}

export async function updateMediaItem(
  id: string,
  updates: Partial<Omit<MediaItem, "id" | "uploadedAt">>,
): Promise<MediaItem | null> {
  const itemIndex = mediaItems.findIndex((item) => item.id === id)
  if (itemIndex === -1) {
    return null
  }

  mediaItems[itemIndex] = {
    ...mediaItems[itemIndex],
    ...updates,
  }

  return mediaItems[itemIndex]
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  const itemIndex = mediaItems.findIndex((item) => item.id === id)
  if (itemIndex === -1) {
    return false
  }

  mediaItems.splice(itemIndex, 1)
  return true
}

export async function searchMediaItems(query: string): Promise<MediaItem[]> {
  const lowerQuery = query.toLowerCase()
  return mediaItems.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) || item.description?.toLowerCase().includes(lowerQuery) || false,
  )
}
