"use server"

import { logActivity } from "@/lib/activity-logger"

export interface Page {
  id: string
  title: string
  slug: string
  content: string
  status: "published" | "draft" | "archived"
  createdAt: string
  updatedAt: string
  author: string
  metaTitle?: string
  metaDescription?: string
  featuredImage?: string
}

// Mock data for pages
const mockPages: Page[] = [
  {
    id: "1",
    title: "Home Page",
    slug: "home",
    content: "<h1>Welcome to Tesah Capital</h1><p>Your trusted investment partner...</p>",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    author: "admin",
    metaTitle: "Tesah Capital - Investment Management",
    metaDescription: "Leading investment management company in Ghana",
    featuredImage: "/images/tesah-capital-full-logo.png",
  },
  {
    id: "2",
    title: "About Us",
    slug: "about",
    content: "<h1>About Tesah Capital</h1><p>Founded with a vision to...</p>",
    status: "published",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-10T14:20:00Z",
    author: "admin",
    metaTitle: "About Tesah Capital",
    metaDescription: "Learn about our history, mission, and values",
  },
  {
    id: "3",
    title: "Investment Products",
    slug: "investment-products",
    content: "<h1>Our Investment Products</h1><p>Discover our range of investment solutions...</p>",
    status: "published",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-12T09:15:00Z",
    author: "admin",
  },
]

export async function getAllPages(): Promise<Page[]> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    return mockPages
  } catch (error) {
    console.error("Error fetching pages:", error)
    throw new Error("Failed to fetch pages")
  }
}

export async function getPageById(id: string): Promise<Page | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return mockPages.find((page) => page.id === id) || null
  } catch (error) {
    console.error("Error fetching page:", error)
    throw new Error("Failed to fetch page")
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return mockPages.find((page) => page.slug === slug) || null
  } catch (error) {
    console.error("Error fetching page by slug:", error)
    throw new Error("Failed to fetch page")
  }
}

export async function createPage(pageData: Omit<Page, "id" | "createdAt" | "updatedAt">): Promise<Page> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const newPage: Page = {
      ...pageData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockPages.push(newPage)

    // Log activity
    await logActivity({
      action: "create_page",
      details: `Created page: ${newPage.title}`,
      userId: pageData.author,
    })

    return newPage
  } catch (error) {
    console.error("Error creating page:", error)
    throw new Error("Failed to create page")
  }
}

export async function updatePage(id: string, updates: Partial<Omit<Page, "id" | "createdAt">>): Promise<Page | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const pageIndex = mockPages.findIndex((page) => page.id === id)
    if (pageIndex === -1) {
      return null
    }

    const updatedPage: Page = {
      ...mockPages[pageIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    mockPages[pageIndex] = updatedPage

    // Log activity
    await logActivity({
      action: "update_page",
      details: `Updated page: ${updatedPage.title}`,
      userId: updates.author || "system",
    })

    return updatedPage
  } catch (error) {
    console.error("Error updating page:", error)
    throw new Error("Failed to update page")
  }
}

export async function deletePage(id: string, userId = "system"): Promise<boolean> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const pageIndex = mockPages.findIndex((page) => page.id === id)
    if (pageIndex === -1) {
      return false
    }

    const deletedPage = mockPages[pageIndex]
    mockPages.splice(pageIndex, 1)

    // Log activity
    await logActivity({
      action: "delete_page",
      details: `Deleted page: ${deletedPage.title}`,
      userId,
    })

    return true
  } catch (error) {
    console.error("Error deleting page:", error)
    throw new Error("Failed to delete page")
  }
}

export async function publishPage(id: string, userId = "system"): Promise<Page | null> {
  try {
    const updatedPage = await updatePage(id, {
      status: "published",
      author: userId,
    })

    if (updatedPage) {
      await logActivity({
        action: "publish_page",
        details: `Published page: ${updatedPage.title}`,
        userId,
      })
    }

    return updatedPage
  } catch (error) {
    console.error("Error publishing page:", error)
    throw new Error("Failed to publish page")
  }
}

export async function unpublishPage(id: string, userId = "system"): Promise<Page | null> {
  try {
    const updatedPage = await updatePage(id, {
      status: "draft",
      author: userId,
    })

    if (updatedPage) {
      await logActivity({
        action: "unpublish_page",
        details: `Unpublished page: ${updatedPage.title}`,
        userId,
      })
    }

    return updatedPage
  } catch (error) {
    console.error("Error unpublishing page:", error)
    throw new Error("Failed to unpublish page")
  }
}

export async function getPublishedPages(): Promise<Page[]> {
  try {
    const allPages = await getAllPages()
    return allPages.filter((page) => page.status === "published")
  } catch (error) {
    console.error("Error fetching published pages:", error)
    throw new Error("Failed to fetch published pages")
  }
}
