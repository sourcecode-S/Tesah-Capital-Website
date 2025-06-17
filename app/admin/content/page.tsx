"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { createPage, deletePage, getAllPages, updatePage } from "@/lib/actions/page.actions"
import type { Page } from "@/lib/models"
import { Skeleton } from "@/components/ui/skeleton"
import { logActivity } from "@/lib/activity-logger"

const AdminContentPage = () => {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    setLoading(true)
    try {
      const fetchedPages = await getAllPages()
      setPages(fetchedPages)
    } catch (error) {
      console.error("Error fetching pages:", error)
      toast({
        title: "Error fetching pages",
        description: "Failed to retrieve pages from the server.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePage = async () => {
    if (!title || !slug || !content) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    try {
      await createPage({ title, slug, content })
      toast({
        title: "Success",
        description: "Page created successfully.",
      })
      logActivity({
        event: "create_page",
        details: `Page "${title}" created.`,
      })
      setTitle("")
      setSlug("")
      setContent("")
      fetchPages()
    } catch (error: any) {
      console.error("Error creating page:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create page.",
        variant: "destructive",
      })
    }
  }

  const handleUpdatePage = async () => {
    if (!selectedPageId) {
      toast({
        title: "Error",
        description: "No page selected for update.",
        variant: "destructive",
      })
      return
    }

    if (!title || !slug || !content) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    try {
      await updatePage({
        id: selectedPageId,
        title,
        slug,
        content,
      })
      toast({
        title: "Success",
        description: "Page updated successfully.",
      })
      logActivity({
        event: "update_page",
        details: `Page "${title}" updated.`,
      })
      setTitle("")
      setSlug("")
      setContent("")
      setSelectedPageId(null)
      fetchPages()
    } catch (error: any) {
      console.error("Error updating page:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update page.",
        variant: "destructive",
      })
    }
  }

  const handleDeletePage = async (id: string) => {
    try {
      await deletePage(id)
      toast({
        title: "Success",
        description: "Page deleted successfully.",
      })
      logActivity({
        event: "delete_page",
        details: `Page with ID "${id}" deleted.`,
      })
      fetchPages()
    } catch (error: any) {
      console.error("Error deleting page:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to delete page.",
        variant: "destructive",
      })
    }
  }

  const handleSelectPage = (page: Page) => {
    setSelectedPageId(page.id)
    setTitle(page.title)
    setSlug(page.slug)
    setContent(page.content)
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Content Pages</CardTitle>
          <CardDescription>Manage your website's content pages.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Input id="content" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={handleCreatePage}>
                Create Page
              </Button>
              <Button type="button" onClick={handleUpdatePage} disabled={!selectedPageId}>
                Update Page
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Existing Pages</CardTitle>
          <CardDescription>View and manage existing content pages.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {loading ? (
            <Table>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableCaption>A list of your content pages.</TableCaption>
              <TableHead>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>{page.title}</TableCell>
                    <TableCell>{page.slug}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleSelectPage(page)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeletePage(page.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminContentPage
