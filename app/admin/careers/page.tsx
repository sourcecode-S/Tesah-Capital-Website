import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function AdminCareersPage() {
  const mockJobs = [
    { id: "1", title: "Financial Analyst", department: "Investments", status: "Open" },
    { id: "2", title: "Wealth Manager", department: "Client Services", status: "Open" },
    { id: "3", title: "Marketing Specialist", department: "Marketing", status: "Closed" },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Careers Management</h1>
        <Button asChild>
          <Link href="/admin/careers/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Job
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Listings</CardTitle>
          <CardDescription>Manage available job positions on your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>{job.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2 bg-transparent">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {mockJobs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No job listings found.
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
