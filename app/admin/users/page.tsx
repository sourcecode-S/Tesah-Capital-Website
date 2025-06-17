"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Users, UserPlus, Search, MoreHorizontal, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { hasPermission, users, type UserRole, type User } from "@/lib/auth"
import { logActivity } from "@/lib/activity-logger"

export default function UsersPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "viewer" as UserRole,
    password: "",
  })
  const { toast } = useToast()

  // Get current user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("admin_user")
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData))
      } catch (error) {
        console.error("Error parsing user data:", error)
        // Clear invalid data
        localStorage.removeItem("admin_user")
      }
    }
  }, [])

  // Safe permission checks with fallbacks
  const userRole = currentUser?.role
  const canCreate = userRole ? hasPermission(userRole, "users.create") : false
  const canEdit = userRole ? hasPermission(userRole, "users.edit") : false
  const canDelete = userRole ? hasPermission(userRole, "users.delete") : false

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive !== false) ||
      (statusFilter === "inactive" && user.isActive === false)

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleCreateUser = () => {
    // In a real app, this would make an API call
    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      isActive: true,
      createdAt: new Date(),
    }

    // Log the activity
    if (currentUser) {
      logActivity({
        userId: currentUser.id,
        userName: currentUser.name,
        action: "create",
        resource: "user",
        details: `Created user: ${user.email}`,
        severity: "high",
      })
    }

    toast({
      title: "User Created! 🎉",
      description: `${user.name} has been added to the system`,
    })

    setIsCreateDialogOpen(false)
    setNewUser({ name: "", email: "", role: "viewer", password: "" })
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleDeleteUser = (user: User) => {
    if (user.id === currentUser?.id) {
      toast({
        title: "Cannot Delete",
        description: "You cannot delete your own account",
        variant: "destructive",
      })
      return
    }

    // Log the activity
    if (currentUser) {
      logActivity({
        userId: currentUser.id,
        userName: currentUser.name,
        action: "delete",
        resource: "user",
        details: `Deleted user: ${user.email}`,
        severity: "high",
      })
    }

    toast({
      title: "User Deleted",
      description: `${user.name} has been removed from the system`,
    })
  }

  const toggleUserStatus = (user: User) => {
    const action = user.isActive !== false ? "suspend" : "activate"

    if (currentUser) {
      logActivity({
        userId: currentUser.id,
        userName: currentUser.name,
        action,
        resource: "user",
        details: `${action}d user: ${user.email}`,
        severity: "medium",
      })
    }

    toast({
      title: `User ${action}d`,
      description: `${user.name} has been ${action}d`,
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

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users className="mr-3 h-8 w-8 text-blue-500" />
            User Management
          </h1>
          <p className="text-gray-600 mt-1">Manage user accounts, roles, and permissions</p>
        </div>
        {canCreate && (
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Users ({filteredUsers.length})</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-200">
              {filteredUsers.filter((u) => u.isActive !== false).length} Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-2">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role.replace("_", " ").toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${user.isActive !== false ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <span className={user.isActive !== false ? "text-green-700" : "text-red-700"}>
                          {user.isActive !== false ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {canEdit && (
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {canEdit && (
                            <DropdownMenuItem onClick={() => toggleUserStatus(user)}>
                              {user.isActive !== false ? (
                                <>
                                  <EyeOff className="mr-2 h-4 w-4" />
                                  Suspend
                                </>
                              ) : (
                                <>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                          )}
                          {canDelete && user.id !== currentUser?.id && (
                            <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5 text-blue-500" />
              Create New User
            </DialogTitle>
            <DialogDescription>Add a new user to the system with appropriate role and permissions.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="john@tesahcapital.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={newUser.role} onValueChange={(value: UserRole) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer - Read only access</SelectItem>
                  <SelectItem value="editor">Editor - Can edit content</SelectItem>
                  <SelectItem value="admin">Admin - Full management access</SelectItem>
                  {userRole === "super_admin" && (
                    <SelectItem value="super_admin">Super Admin - Complete control</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Temporary Password</Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Temporary password"
              />
              <p className="text-xs text-gray-500">User will be required to change this on first login</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateUser}
              disabled={!newUser.name || !newUser.email || !newUser.password}
              className="bg-gradient-to-r from-blue-500 to-purple-600"
            >
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
