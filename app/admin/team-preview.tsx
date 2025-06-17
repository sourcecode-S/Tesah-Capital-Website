"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react"

export default function TeamPreview() {
  const teamMembers = [
    {
      id: 1,
      name: "Eugene Mensah",
      title: "Managing Director",
      bio: "Eugene Mensah brings extensive experience in investment management...",
    },
    {
      id: 2,
      name: "Kwame Boamah",
      title: "Chief Operating Officer",
      bio: "Kwame Boamah oversees the day-to-day operations of Tesah Capital...",
    },
    {
      id: 3,
      name: "Eric Nana Otoo",
      title: "Chief Investment Officer",
      bio: "Eric Nana Otoo leads Tesah Capital's investment strategy...",
    },
  ]

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leadership Team</CardTitle>
          <CardDescription>Manage your company's leadership team members and their profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg"
              >
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Photo</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.title}</p>
                  <p className="text-sm text-muted-foreground truncate mt-1">{member.bio}</p>
                </div>
                <div className="flex flex-row sm:flex-col gap-2 self-end sm:self-center">
                  <Button variant="outline" size="icon" disabled={index === 0}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" disabled={index === teamMembers.length - 1}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
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
        </CardContent>
      </Card>
    </div>
  )
}
