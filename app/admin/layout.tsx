'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import {
  LogOut,
  Users,
  FileText,
  Briefcase,
  TrendingUp,
  User,
  Menu,
  Home,
  Loader2,
} from 'lucide-react'

interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'subadmin' | 'editor'
  first_name?: string
  last_name?: string
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          router.push('/auth/login')
          return
        }

        // Get user profile with role
        const { data: profile, error } = await supabase
          .from('users_profiles')
          .select('id, email, role, first_name, last_name')
          .eq('id', authUser.id)
          .single()

        if (error || !profile) {
          router.push('/auth/login')
          return
        }

        // Redirect editors to public site
        if (profile.role === 'editor' && !pathname.startsWith('/admin/profile')) {
          router.push('/')
          return
        }

        setUser(profile as AdminUser)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    if (pathname === '/admin/login') {
      setLoading(false)
      return
    }

    checkAuth()
  }, [router, supabase, pathname])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (pathname === '/admin/login') {
    return children
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const navItems = [
    {
      href: '/admin/dashboard',
      icon: Home,
      label: 'Dashboard',
      roles: ['admin', 'subadmin', 'editor'],
    },
    {
      href: '/admin/users',
      icon: Users,
      label: 'Users',
      roles: ['admin'],
    },
    {
      href: '/admin/content',
      icon: FileText,
      label: 'Content',
      roles: ['admin', 'subadmin', 'editor'],
    },
    {
      href: '/admin/jobs',
      icon: Briefcase,
      label: 'Job Postings',
      roles: ['admin', 'subadmin', 'editor'],
    },
    {
      href: '/admin/market-data',
      icon: TrendingUp,
      label: 'Market Data',
      roles: ['admin', 'subadmin', 'editor'],
    },
    {
      href: '/admin/profile',
      icon: User,
      label: 'Profile',
      roles: ['admin', 'subadmin', 'editor'],
    },
  ]

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user.role)
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } hidden md:flex border-r border-border bg-card flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-lg font-bold text-foreground">Tesah Admin</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded p-1 hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-3 py-4 overflow-auto">
          {filteredNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* User info & logout */}
        <div className="border-t border-border px-3 py-4 space-y-2">
          {sidebarOpen && (
            <div className="px-2 py-2 text-xs">
              <p className="text-muted-foreground truncate">{user.email}</p>
              <p className="text-xs uppercase text-primary font-semibold">
                {user.role}
              </p>
            </div>
          )}
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="w-full text-xs"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {sidebarOpen && 'Sign Out'}
          </Button>
        </div>
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden border-b border-border bg-card px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold">Tesah Admin</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="space-y-2 mt-6">
                {filteredNavItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href}>
                      <span
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </span>
                    </Link>
                  )
                })}
                <Separator className="my-4" />
                <div className="px-2 py-2 text-xs">
                  <p className="text-muted-foreground truncate">{user.email}</p>
                  <p className="text-xs uppercase text-primary font-semibold">
                    {user.role}
                  </p>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
