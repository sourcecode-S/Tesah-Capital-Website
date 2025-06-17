"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Search, Download, Calendar, User, AlertTriangle, CheckCircle, Info, Loader2 } from "lucide-react"
import { getActivityLogs, type ActivityLog } from "@/lib/activity-logger"

export default function ActivityPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [userFilter, setUserFilter] = useState<string>("all")
  const [logs, setLogs] = useState<ActivityLog[]>([])

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Load activity logs
  useEffect(() => {
    if (user) {
      setLogs(getActivityLogs(100))
    }
  }, [user])

  // Filter logs based on search and filters
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesAction = actionFilter === "all" || log.action === actionFilter
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter
    const matchesUser = userFilter === "all" || log.userId === userFilter

    return matchesSearch && matchesAction && matchesSeverity && matchesUser
  })

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <Info className="h-4 w-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const exportLogs = () => {
    const csvContent = [
      ["Timestamp", "User", "Action", "Resource", "Details", "Severity"],
      ...filteredLogs.map((log) => [
        new Date(log.timestamp).toISOString(),
        log.userName,
        log.action,
        log.resource,
        log.details || "",
        log.severity,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `activity-logs-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
          <p className="text-gray-600">Please log in to view activity logs.</p>
        </div>
      </div>
    )
  }

  const canViewLogs = ["super_admin", "admin"].includes(user.role)

  if (!canViewLogs) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
          <p className="text-gray-600">You don't have permission to view activity logs.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Activity className="mr-3 h-8 w-8 text-blue-500" />
            Activity Logs
          </h1>
          <p className="text-gray-600 mt-1">Monitor system activities and user actions</p>
        </div>
        <Button onClick={exportLogs} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="logout">Logout</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {Array.from(new Set(logs.map((log) => log.userId))).map((userId) => {
                  const userName = logs.find((log) => log.userId === userId)?.userName
                  return (
                    <SelectItem key={userId} value={userId}>
                      {userName}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity Logs Table */}
      <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Activity Log ({filteredLogs.length})</CardTitle>
              <CardDescription>Detailed system activity and audit trail</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-red-600 border-red-200">
                {filteredLogs.filter((l) => l.severity === "high").length} High
              </Badge>
              <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                {filteredLogs.filter((l) => l.severity === "medium").length} Medium
              </Badge>
              <Badge variant="outline" className="text-green-600 border-green-200">
                {filteredLogs.filter((l) => l.severity === "low").length} Low
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium">{new Date(log.timestamp).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{log.userName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600 capitalize">{log.resource}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{log.details || "-"}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getSeverityIcon(log.severity)}
                        <Badge className={getSeverityBadgeColor(log.severity)}>{log.severity.toUpperCase()}</Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
