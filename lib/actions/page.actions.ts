"use server"

import { logActivity } from "@/lib/activity-logger"
import { getDbConnection, type Page as DbPage } from "@/lib/db"
import { customAlphabet } from "nanoid"
import { apiService } from "@/lib/api-service"
import { revalidatePath } from "next/cache"

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 12)

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

// Mock data for pages (used if DB is not connected)
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
  const conn = getDbConnection()
  if (!conn) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return mockPages
  }
  try {
    const [rows] = await conn.execute<DbPage[]>(
      `SELECT id, title, slug, content, status, created_at AS createdAt, updated_at AS updatedAt, author, meta_title AS metaTitle, meta_description AS metaDescription, featured_image AS featuredImage FROM pages ORDER BY created_at DESC`,
    )
    return rows as Page[]
  } catch (error) {
    console.error("Error fetching pages:", error)
    throw new Error("Failed to fetch pages")
  }
}

export async function getPageById(id: string): Promise<Page | null> {
  const conn = getDbConnection()
  if (!conn) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return mockPages.find((page) => page.id === id) || null
  }
  try {
    const [rows] = await conn.execute<DbPage[]>(
      `SELECT id, title, slug, content, status, created_at AS createdAt, updated_at AS updatedAt, author, meta_title AS metaTitle, meta_description AS metaDescription, featured_image AS featuredImage FROM pages WHERE id = ?`,
      [id],
    )
    return (rows[0] as Page) || null
  } catch (error) {
    console.error("Error fetching page:", error)
    throw new Error("Failed to fetch page")
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const conn = getDbConnection()
  if (!conn) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return mockPages.find((page) => page.slug === slug) || null
  }
  try {
    const [rows] = await conn.execute<DbPage[]>(
      `SELECT id, title, slug, content, status, created_at AS createdAt, updated_at AS updatedAt, author, meta_title AS metaTitle, meta_description AS metaDescription, featured_image AS featuredImage FROM pages WHERE slug = ?`,
      [slug],
    )
    return (rows[0] as Page) || null
  } catch (error) {
    console.error("Error fetching page by slug:", error)
    throw new Error("Failed to fetch page")
  }
}

export async function createPage(pageData: Omit<Page, "id" | "createdAt" | "updatedAt">): Promise<Page> {
  const conn = getDbConnection()
  if (!conn) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const newPage: Page = {
      ...pageData,
      id: nanoid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockPages.push(newPage)
    await logActivity({
      action: "create_page",
      resource: "page",
      details: `Created page: ${newPage.title}`,
      userId: pageData.author,
      userName: pageData.author, // Assuming author is username for mock
    })
    return newPage
  }
  try {
    const newId = nanoid()
    await conn.execute(
      `INSERT INTO pages (id, title, slug, content, status, author, meta_title, meta_description, featured_image, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        newId,
        pageData.title,
        pageData.slug,
        pageData.content,
        pageData.status,
        pageData.author,
        pageData.metaTitle || null,
        pageData.metaDescription || null,
        pageData.featuredImage || null,
      ],
    )
    const [rows] = await conn.execute<DbPage[]>(
      `SELECT id, title, slug, content, status, created_at AS createdAt, updated_at AS updatedAt, author, meta_title AS metaTitle, meta_description AS metaDescription, featured_image AS featuredImage FROM pages WHERE id = ?`,
      [newId],
    )
    const newPage = rows[0]

    await logActivity({
      action: "create_page",
      resource: "page",
      details: `Created page: ${newPage.title}`,
      userId: pageData.author,
      userName: pageData.author, // Assuming author is username for logging
    })
    return newPage as Page
  } catch (error) {
    console.error("Error creating page:", error)
    throw new Error("Failed to create page")
  }
}

export async function updatePage(id: string, updates: Partial<Omit<Page, "id" | "createdAt">>): Promise<Page | null> {
  const conn = getDbConnection()
  if (!conn) {
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
    await logActivity({
      action: "update_page",
      resource: "page",
      details: `Updated page: ${updatedPage.title}`,
      userId: updates.author || "system",
      userName: updates.author || "system",
    })
    return updatedPage
  }
  try {
    const updateFields: string[] = []
    const updateValues: any[] = []

    for (const key in updates) {
      if (updates[key as keyof typeof updates] !== undefined) {
        const dbKey =
          key === "metaTitle"
            ? "meta_title"
            : key === "metaDescription"
              ? "meta_description"
              : key === "featuredImage"
                ? "featured_image"
                : key
        updateFields.push(`\`${dbKey}\` = ?`)
        updateValues.push(updates[key as keyof typeof updates])
      }
    }
    updateFields.push("updated_at = NOW()")

    if (updateFields.length === 0) {
      return null // No fields to update
    }

    await conn.execute(`UPDATE pages SET ${updateFields.join(", ")} WHERE id = ?`, [...updateValues, id])

    const [rows] = await conn.execute<DbPage[]>(
      `SELECT id, title, slug, content, status, created_at AS createdAt, updated_at AS updatedAt, author, meta_title AS metaTitle, meta_description AS metaDescription, featured_image AS featuredImage FROM pages WHERE id = ?`,
      [id],
    )
    const updatedPage = rows[0]

    if (!updatedPage) {
      return null
    }
    await logActivity({
      action: "update_page",
      resource: "page",
      details: `Updated page: ${updatedPage.title}`,
      userId: updates.author || "system",
      userName: updates.author || "system",
    })
    return updatedPage as Page
  } catch (error) {
    console.error("Error updating page:", error)
    throw new Error("Failed to update page")
  }
}

export async function deletePage(id: string, userId = "system"): Promise<boolean> {
  const conn = getDbConnection()
  if (!conn) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const pageIndex = mockPages.findIndex((page) => page.id === id)
    if (pageIndex === -1) {
      return false
    }
    const deletedPage = mockPages[pageIndex]
    mockPages.splice(pageIndex, 1)
    await logActivity({
      action: "delete_page",
      resource: "page",
      details: `Deleted page: ${deletedPage.title}`,
      userId,
      userName: userId,
    })
    return true
  }
  try {
    const [pageRows] = await conn.execute<DbPage[]>(`SELECT title FROM pages WHERE id = ?`, [id])
    const deletedPageTitle = pageRows[0]?.title

    const result = await conn.execute(`DELETE FROM pages WHERE id = ?`, [id])
    if (result.rowsAffected === 0) {
      return false
    }
    if (deletedPageTitle) {
      await logActivity({
        action: "delete_page",
        resource: "page",
        details: `Deleted page: ${deletedPageTitle}`,
        userId,
        userName: userId,
      })
    }
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
        resource: "page",
        details: `Published page: ${updatedPage.title}`,
        userId,
        userName: userId,
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
        resource: "page",
        details: `Unpublished page: ${updatedPage.title}`,
        userId,
        userName: userId,
      })
    }

    return updatedPage
  } catch (error) {
    console.error("Error unpublishing page:", error)
    throw new Error("Failed to unpublish page")
  }
}

export async function getPublishedPages(): Promise<Page[]> {
  const conn = getDbConnection()
  if (!conn) {
    const allPages = await getAllPages()
    return allPages.filter((page) => page.status === "published")
  }
  try {
    const [rows] = await conn.execute<DbPage[]>(
      `SELECT id, title, slug, content, status, created_at AS createdAt, updated_at AS updatedAt, author, meta_title AS metaTitle, meta_description AS metaDescription, featured_image AS featuredImage FROM pages WHERE status = 'published' ORDER BY created_at DESC`,
    )
    return rows as Page[]
  } catch (error) {
    console.error("Error fetching published pages:", error)
    throw new Error("Failed to fetch published pages")
  }
}

export async function savePageAction(formData: FormData) {
  const slug = formData.get("slug") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const template = formData.get("template") as string
  const status = formData.get("status") as string

  const pageData = {
    title,
    description,
    template,
    status,
  }

  const result = await apiService.savePage(slug, pageData)

  if (result.success) {
    revalidatePath(`/admin/content/page-editor/${slug}`)
    revalidatePath(`/${slug}`) // Revalidate the public page as well
    return { success: true, message: "Page saved successfully!" }
  } else {
    return { success: false, error: result.error || "Failed to save page." }
  }
}

export async function deletePageAction(id: string) {
  // This action is not yet implemented in apiService, so it will currently do nothing.
  // You would add a deletePage method to apiService and call it here.
  console.log(`Attempting to delete page with ID: ${id}`)
  return { success: true, message: "Page deletion initiated (mock)." }
}
