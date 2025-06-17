import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CareerForm } from "./_components/career-form"
import { getAllCareers } from "@/lib/queries/careers"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

const CareersPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/admin/login")
  }

  const careers = await getAllCareers()

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Careers</h1>
        <CareerForm type="create" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of your careers.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {careers.map((career) => (
              <TableRow key={career.id}>
                <TableCell className="font-medium">{career.title}</TableCell>
                <TableCell>{career.description}</TableCell>
                <TableCell>{career.location}</TableCell>
                <TableCell className="text-right">
                  <CareerForm type="update" career={career} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CareersPage
