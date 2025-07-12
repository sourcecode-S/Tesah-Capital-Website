import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function AdminContentPage() {
  const mockPages = [
    { id: "1", title: "Home Page", slug: "home", status: "Published" },
    { id: "2", title: "About Us", slug: "about", status: "Published" },
    { id: "3", title: "Contact Us", slug: "contact", status: "Draft" },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <Button asChild>
          <Link href="/admin/content/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Page
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Website Pages</CardTitle>
          <CardDescription>Manage the content of your website pages.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell>{page.slug}</TableCell>
                  <TableCell>{page.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2 bg-transparent" asChild>
                      <Link href={`/admin/content/edit/${page.id}`}>Edit</Link>
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {mockPages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No pages found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
