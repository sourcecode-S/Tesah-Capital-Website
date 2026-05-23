'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, Briefcase, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const supabase = createClient()
  const [stats, setStats] = useState({
    users: 0,
    content: 0,
    jobs: 0,
    marketData: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersData, contentData, jobsData, marketData] = await Promise.all(
          [
            supabase.from('users_profiles').select('id', { count: 'exact' }),
            supabase.from('content').select('id', { count: 'exact' }),
            supabase.from('job_postings').select('id', { count: 'exact' }),
            supabase.from('market_data').select('id', { count: 'exact' }),
          ]
        )

        setStats({
          users: usersData.count || 0,
          content: contentData.count || 0,
          jobs: jobsData.count || 0,
          marketData: marketData.count || 0,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the Tesah Capital Admin Panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? 'Loading...' : 'Admin, Subadmin, and Editor accounts'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.content}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? 'Loading...' : 'Published and draft content'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Postings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.jobs}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? 'Loading...' : 'Active and archived jobs'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Data</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.marketData}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? 'Loading...' : 'Market updates and news'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Panel Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold">Admin Capabilities</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Manage all users and assign roles</li>
                <li>✓ Create, edit, and delete all content</li>
                <li>✓ Manage job postings and applications</li>
                <li>✓ Control market data and updates</li>
                <li>✓ Reset user credentials</li>
                <li>✓ View audit logs</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Role-Based Access</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>Admin:</strong> Full system access</li>
                <li><strong>Subadmin:</strong> Edit content, manage jobs</li>
                <li><strong>Editor:</strong> Create and edit drafts</li>
                <li>All roles can update their own profile</li>
                <li>Password reset handled securely</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
