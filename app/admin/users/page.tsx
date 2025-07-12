"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type UserRole = "super_admin" | "admin" | "editor" | "viewer"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  isActive: boolean
  lastLogin?: string
  createdAt?: string
}

// Mock user data
const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", role: "admin", isActive: true },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com", role: "editor", isActive: true },
  { id: "3", name: "Peter Jones", email: "peter.jones@example.com", role: "viewer", isActive: false },
]

// Mock permission check (simplified)
const hasPermission = (userRole: UserRole, requiredRole: UserRole) => {
  const rolesOrder = ["viewer", "editor", "admin", "super_admin"]
  return rolesOrder.indexOf(userRole) >= rolesOrder.indexOf(requiredRole)
}

export default function AdminUsersPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user")
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error)
        localStorage.removeItem("admin_user")
      }
    }
    // Simulate fetching users
    setTimeout(() => {
      setUsers([...mockUsers])
      setIsLoading(false)
    }, 500)
  }, [])

  const userRole = currentUser?.role || "viewer" // Default to viewer if no user

  const canCreate = hasPermission(userRole, "admin")
  const canEdit = hasPermission(userRole, "admin")
  const canDelete = hasPermission(userRole, "super_admin")

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const newUser: User = {
      id: editingUser?.id || Date.now().toString(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as User["role"],
      isActive: true,
      createdAt: new Date().toISOString(),
    }

    if (editingUser) {
      setUsers(users.map((user) => (user.id === newUser.id ? newUser : user)))
      setEditingUser(null)
      toast({
        title: "User Updated",
        description: `${newUser.name}'s details have been updated.`,
      })
    } else {
      setUsers([...users, newUser])
      setIsAddingNew(false)
      toast({
        title: "User Created! 🎉",
        description: `${newUser.name} has been added to the system.`,
      })
    }
    form.reset()
  }

  const handleDeleteUser = (id: string) => {
    if (id === currentUser?.id) {
      toast({
        title: "Cannot Delete",
        description: "You cannot delete your own account.",
        variant: "destructive",
      })
      return
    }
    setUsers(users.filter((user) => user.id !== id))
    toast({
      title: "User Deleted",
      description: `The user has been removed from the system.`,
    })
  }

  const toggleUserStatus = (userToToggle: User) => {
    setUsers(users.map((user) => (user.id === userToToggle.id ? { ...user, isActive: !user.isActive } : user)))
    toast({
      title: `User ${userToToggle.isActive ? "Deactivated" : "Activated"}`,
      description: `${userToToggle.name} has been ${userToToggle.isActive ? "deactivated" : "activated"}.`,
    })
  }

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "super_admin":
        return "bg-red-100 text-red-700 border-red-200"
      case "admin":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "editor":
        return "bg-green-100 text-green-700 border-green-200"
      case "viewer":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Loading...</h3>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
          <p className="text-gray-600">Please log in to view user management.</p>
        </div>
      </div>
    )
  }

  const canViewUsers = hasPermission(userRole, "viewer") // All roles can view users

  if (!canViewUsers) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
          <p className="text-gray-600">You don't have permission to view user information.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        {canCreate && (
          <Button onClick={() => setIsAddingNew(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New User
          </Button>
        )}
      </div>

      {/* Users Table */}
      <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
        <CardHeader>
          <CardTitle>System Users</CardTitle>
          <CardDescription>Manage user accounts and their roles within the admin portal.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role.replace("_", " ").toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {canEdit && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2 bg-transparent"
                            onClick={() => setEditingUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        )}
                        {canDelete && user.id !== currentUser?.id && (
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        )}
                        {canEdit && (
                          <Button variant="outline" size="sm" onClick={() => toggleUserStatus(user)}>
                            {user.isActive ? (
                              <>
                                <div className="h-4 w-4 text-gray-500" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <div className="h-4 w-4 text-gray-500" />
                                Activate
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit User Form */}
      {(isAddingNew || editingUser) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingUser ? "Edit User" : "Add New User"}</CardTitle>
            <CardDescription>Fill in the details for the user account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveUser} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" defaultValue={editingUser?.name || ""} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" defaultValue={editingUser?.email || ""} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role" defaultValue={editingUser?.role || "viewer"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddingNew(false)
                    setEditingUser(null)
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">{editingUser ? "Update User" : "Create User"}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
