"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  PanelLeft,
  Home,
  FileText,
  Users,
  Settings,
  BarChart3,
  ImageIcon,
  Briefcase,
  LogOut,
  Loader2,
  LineChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

interface User {
  id: string
  email: string
  name: string
  role: string
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error)
        localStorage.removeItem("admin_user") // Clear invalid data
        router.push("/admin/login")
      }
    }
    setIsLoading(false)
  }, [router])

  useEffect(() => {
    if (!isLoading && !user && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [isLoading, user, pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("admin_user")
    setUser(null)
    router.push("/admin/login")
  }

  if (isLoading || (!user && pathname !== "/admin/login")) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!user && pathname === "/admin/login") {
    return <>{children}</> // Render login page directly without layout
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home, roles: ["super_admin", "admin", "editor", "viewer"] },
    { name: "Content", href: "/admin/content", icon: FileText, roles: ["super_admin", "admin", "editor"] },
    { name: "Users", href: "/admin/users", icon: Users, roles: ["super_admin", "admin"] },
    { name: "Media", href: "/admin/media", icon: ImageIcon, roles: ["super_admin", "admin", "editor"] },
    { name: "Careers", href: "/admin/careers", icon: Briefcase, roles: ["super_admin", "admin", "editor"] },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3, roles: ["super_admin", "admin"] },
    {
      name: "Market Data",
      href: "/admin/market-data",
      icon: LineChart,
      roles: ["super_admin", "admin", "editor", "viewer"],
    }, // New item
    { name: "Settings", href: "/admin/settings", icon: Settings, roles: ["super_admin", "admin"] },
  ]

  const userHasPermission = (itemRoles: string[]) => {
    return user ? itemRoles.includes(user.role) : false
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-gray-100/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <Image src="/images/tesah-logo.png" alt="Tesah Capital Logo" width={30} height={30} />
              <span className="text-lg">Admin Portal</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium lg:px-6">
              {navItems.map(
                (item) =>
                  userHasPermission(item.roles) && (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-blue-600 ${
                        pathname === item.href ? "bg-gray-200 text-blue-600" : "text-gray-600"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ),
              )}
              <Separator className="my-4" />
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-blue-600">
                <LogOut className="h-4 w-4" />
                <button onClick={handleLogout} className="w-full text-left">
                  Logout
                </button>
              </div>
            </nav>
          </div>
          <div className="mt-auto p-4 text-xs text-gray-500 border-t">
            Logged in as: {user?.name} ({user?.role})
          </div>
        </div>
      </div>

      {/* Mobile Header & Sidebar */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="/admin" className="flex items-center gap-2 text-lg font-semibold">
                  <Image src="/images/tesah-logo.png" alt="Tesah Capital Logo" width={30} height={30} />
                  <span>Admin Portal</span>
                </Link>
                <Separator className="my-4" />
                {navItems.map(
                  (item) =>
                    userHasPermission(item.roles) && (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                          pathname === item.href ? "bg-gray-100 text-blue-600" : "text-gray-600"
                        } hover:text-blue-600`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    ),
                )}
                <Separator className="my-4" />
                <div className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-gray-600 hover:text-blue-600">
                  <LogOut className="h-5 w-5" />
                  <button onClick={handleLogout} className="w-full text-left">
                    Logout
                  </button>
                </div>
              </nav>
              <div className="mt-auto p-4 text-xs text-gray-500 border-t">
                Logged in as: {user?.name} ({user?.role})
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1 text-center text-lg font-semibold">Admin Portal</div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gray-50">
          <TooltipProvider>{children}</TooltipProvider>
        </main>
      </div>
    </div>
  )
}
