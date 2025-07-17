"use client"

import { useEffect, useState } from "react"
import { CardDescription } from "@/components/ui/card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
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
  DollarSign,
  CreditCard,
  Newspaper,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { useDashboardData } from "@/hooks/use-dashboard-data"

interface User {
  id: string
  email: string
  name: string
  role: string
}

function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)

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
  }, [])

  const { stats, recentActivities, recentNotifications, isLoading, error, refetch } = useDashboardData(user?.id || null)

  const quickActions = [
    {
      title: "Add New User",
      description: "Create a new user account",
      href: "/admin/users",
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
      value: 92, // This is hardcoded, could be fetched
      color: "bg-purple-500",
      icon: <Zap className="h-4 w-4" />,
      status: "good",
    },
  ]

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-red-500">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-medium">Error Loading Dashboard</h3>
          <p className="text-gray-600">{error}</p>
          <Button onClick={refetch} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(" ")[0] || "Admin"} 👋</h1>
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
            <div className="text-3xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-24 bg-blue-400" /> : stats.totalUsers}
            </div>
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
            <div className="text-3xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-20 bg-green-400" /> : stats.activeUsers}
            </div>
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
            <div className="text-3xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-28 bg-purple-400" /> : stats.totalSessions}
            </div>
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
            <div className="text-3xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-16 bg-orange-400" /> : stats.recentActivitiesCount}
            </div>
            <p className="text-xs opacity-90 mt-1">
              <Clock className="inline mr-1 h-3 w-3" />
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        {/* New Metrics */}
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-32 bg-green-400" /> : `$${stats.totalRevenue.toFixed(2)}`}
            </div>
            <p className="text-xs opacity-90 mt-1">
              <TrendingUp className="inline mr-1 h-3 w-3" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Subscriptions</CardTitle>
            <Users className="h-4 w-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-24 bg-blue-400" /> : `+${stats.subscriptions}`}
            </div>
            <p className="text-xs opacity-90 mt-1">
              <TrendingUp className="inline mr-1 h-3 w-3" />
              +180.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Sales</CardTitle>
            <CreditCard className="h-4 w-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-28 bg-purple-400" /> : `+${stats.sales}`}
            </div>
            <p className="text-xs opacity-90 mt-1">
              <TrendingUp className="inline mr-1 h-3 w-3" />
              +19% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Active Now</CardTitle>
            <Activity className="h-4 w-4 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-20 bg-orange-400" /> : `+${stats.activeNow}`}
            </div>
            <p className="text-xs opacity-90 mt-1">
              <TrendingUp className="inline mr-1 h-3 w-3" />
              +201 since last hour
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
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl bg-gray-100" />
                ))
              ) : recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
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
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent activity to display.</p>
              )}
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
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-xl bg-gray-100" />
                  ))
                : quickActions.map((action, index) => (
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
                {isLoading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-3/4 bg-gray-100" />
                        <Skeleton className="h-2 w-full bg-gray-100" />
                      </div>
                    ))
                  : systemMetrics.map((metric, index) => (
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

          {/* New Dashboard Widgets for other sections */}
          <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Newspaper className="mr-3 h-5 w-5 text-indigo-500" />
                Content Overview
              </CardTitle>
              <CardDescription>Manage website pages and content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <Skeleton className="h-24 w-full bg-gray-100" />
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Total Pages:</p>
                    <Badge variant="outline">15</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Published Pages:</p>
                    <Badge variant="outline">10</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Draft Pages:</p>
                    <Badge variant="outline">5</Badge>
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                    <Link href="/admin/content">Manage Content</Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Briefcase className="mr-3 h-5 w-5 text-teal-500" />
                Careers & Applications
              </CardTitle>
              <CardDescription>Overview of job postings and applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <Skeleton className="h-24 w-full bg-gray-100" />
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Active Job Openings:</p>
                    <Badge variant="outline">3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">New Applications (last 7 days):</p>
                    <Badge variant="outline">7</Badge>
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                    <Link href="/admin/careers">Manage Careers</Link>
                  </Button>
                </>
              )}
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
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-xl bg-gray-100" />
                  ))
                : recentNotifications.map((notification) => (
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
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                        {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
                      </div>
                    </div>
                  ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Placeholder for More Content */}
      <div className="flex-1 rounded-lg border border-dashed shadow-sm p-4 flex items-center justify-center text-gray-500">
        <p>More dashboard content coming soon!</p>
      </div>
    </div>
  )
}

export default DashboardPage
