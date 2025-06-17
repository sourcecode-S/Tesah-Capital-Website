"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Activity,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  UserPlus,
  BarChart3,
  Globe,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalSessions: number
  systemHealth: number
  securityScore: number
  recentActivities: number
}

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface ActivityLog {
  id: string
  action: string
  resource: string
  userName: string
  timestamp: string
  severity: "low" | "medium" | "high"
}

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  createdAt: string
  isRead: boolean
}

// Mock data functions
function getMockActivityLogs(count: number): ActivityLog[] {
  const activities: ActivityLog[] = [
    {
      id: "1",
      action: "User Login",
      resource: "Authentication",
      userName: "admin@tesah.com",
      timestamp: new Date().toISOString(),
      severity: "low",
    },
    {
      id: "2",
      action: "Content Updated",
      resource: "About Page",
      userName: "editor@tesah.com",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      severity: "medium",
    },
    {
      id: "3",
      action: "User Created",
      resource: "User Management",
      userName: "admin@tesah.com",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      severity: "low",
    },
    {
      id: "4",
      action: "Failed Login Attempt",
      resource: "Authentication",
      userName: "unknown",
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      severity: "high",
    },
    {
      id: "5",
      action: "Settings Changed",
      resource: "System Settings",
      userName: "admin@tesah.com",
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      severity: "medium",
    },
  ]

  return activities.slice(0, count)
}

function getMockNotifications(userId?: string): Notification[] {
  return [
    {
      id: "1",
      title: "System Update",
      message: "The system will be updated tonight at 2 AM. Expect brief downtime.",
      type: "info",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      isRead: false,
    },
    {
      id: "2",
      title: "Security Alert",
      message: "Multiple failed login attempts detected. Please review security logs.",
      type: "warning",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      isRead: true,
    },
    {
      id: "3",
      title: "Content Published",
      message: "New content has been published to the website.",
      type: "success",
      createdAt: new Date(Date.now() - 10800000).toISOString(),
      isRead: false,
    },
  ]
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalSessions: 0,
    systemHealth: 0,
    securityScore: 0,
    recentActivities: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([])
  const [recentNotifications, setRecentNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Get user from localStorage
    try {
      const storedUser = localStorage.getItem("admin_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error getting user:", error)
    }

    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 156,
        activeUsers: 23,
        totalSessions: 1247,
        systemHealth: 98,
        securityScore: 95,
        recentActivities: 42,
      })
      setRecentActivities(getMockActivityLogs(5))
      setRecentNotifications(getMockNotifications())
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const quickActions = [
    {
      title: "Add New User",
      description: "Create a new user account",
      href: "/admin/users?action=create",
      icon: <UserPlus className="h-6 w-6" />,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      title: "View Activity Logs",
      description: "Monitor system activity",
      href: "/admin/activity",
      icon: <Activity className="h-6 w-6" />,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      title: "System Settings",
      description: "Configure system settings",
      href: "/admin/settings",
      icon: <Shield className="h-6 w-6" />,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      title: "View Website",
      description: "Check the public website",
      href: "/",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-gradient-to-br from-orange-500 to-red-500",
      external: true,
    },
  ]

  const systemMetrics = [
    {
      name: "System Health",
      value: stats.systemHealth,
      color: "bg-green-500",
      icon: <CheckCircle className="h-4 w-4" />,
      status: stats.systemHealth >= 95 ? "excellent" : stats.systemHealth >= 80 ? "good" : "warning",
    },
    {
      name: "Security Score",
      value: stats.securityScore,
      color: "bg-blue-500",
      icon: <Shield className="h-4 w-4" />,
      status: stats.securityScore >= 90 ? "excellent" : stats.securityScore >= 75 ? "good" : "warning",
    },
    {
      name: "Performance",
      value: 92,
      color: "bg-purple-500",
      icon: <Zap className="h-4 w-4" />,
      status: "good",
    },
  ]

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(" ")[0] || "Admin"}! 👋</h1>
            <p className="text-blue-100">Here's what's happening with your Tesah Capital admin portal today.</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Badge className="bg-white/20 text-white border-white/30">
              <CheckCircle className="mr-1 h-3 w-3" />
              All Systems Operational
            </Badge>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Users</CardTitle>
            <Users className="h-4 w-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isLoading ? "..." : stats.totalUsers}</div>
            <p className="text-xs opacity-90 mt-1">
              <TrendingUp className="inline mr-1 h-3 w-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Active Users</CardTitle>
            <Eye className="h-4 w-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isLoading ? "..." : stats.activeUsers}</div>
            <p className="text-xs opacity-90 mt-1">
              <TrendingUp className="inline mr-1 h-3 w-3" />
              Currently online
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Sessions</CardTitle>
            <BarChart3 className="h-4 w-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isLoading ? "..." : stats.totalSessions}</div>
            <p className="text-xs opacity-90 mt-1">
              <TrendingUp className="inline mr-1 h-3 w-3" />
              +8% this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Recent Activities</CardTitle>
            <Activity className="h-4 w-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.recentActivities}</div>
            <p className="text-xs opacity-90 mt-1">
              <Clock className="inline mr-1 h-3 w-3" />
              Last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-white shadow-sm border border-gray-100 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center text-xl">
                  <Activity className="mr-3 h-5 w-5 text-blue-500" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest system activities and changes</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/activity">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.severity === "high"
                          ? "bg-red-500"
                          : activity.severity === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">
                        {activity.resource} • by {activity.userName}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleTimeString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & System Health */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Zap className="mr-3 h-5 w-5 text-yellow-500" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  asChild
                  variant="ghost"
                  className="w-full justify-start h-auto p-4 hover:bg-gray-50 rounded-xl"
                >
                  <Link href={action.href} target={action.external ? "_blank" : undefined}>
                    <div className="flex items-center space-x-3">
                      <div className={`${action.color} rounded-lg p-2 text-white`}>{action.icon}</div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{action.title}</p>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Shield className="mr-3 h-5 w-5 text-green-500" />
                System Health
              </CardTitle>
              <CardDescription>Current system status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`${metric.color} rounded-full p-1 text-white`}>{metric.icon}</div>
                        <span className="font-medium text-gray-900">{metric.name}</span>
                      </div>
                      <Badge
                        variant={
                          metric.status === "excellent"
                            ? "default"
                            : metric.status === "good"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {metric.value}%
                      </Badge>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Notifications */}
      {recentNotifications.length > 0 && (
        <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center text-xl">
                  <AlertTriangle className="mr-3 h-5 w-5 text-yellow-500" />
                  Recent Notifications
                </CardTitle>
                <CardDescription>Important updates and alerts</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/notifications">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border ${
                    notification.type === "error"
                      ? "bg-red-50 border-red-200"
                      : notification.type === "warning"
                        ? "bg-yellow-50 border-yellow-200"
                        : notification.type === "success"
                          ? "bg-green-50 border-green-200"
                          : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{new Date(notification.createdAt).toLocaleString()}</p>
                    </div>
                    {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
