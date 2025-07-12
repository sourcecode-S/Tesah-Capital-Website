"use client"

import type React from "react"

import { useEffect } from "react"

import { useRouter } from "next/navigation"

import { useState } from "react"

import { CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, Eye, AlertTriangle } from "lucide-react"

interface SettingsState {
  general: {
    siteName: string
    siteDescription: string
    contactEmail: string
    phoneNumber: string
    address: string
    logo: string
    favicon: string
  }
  social: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
    youtube: string
  }
  security: {
    enableTwoFactor: boolean
    passwordExpiry: number
    maxLoginAttempts: number
    sessionTimeout: number
  }
}

interface User {
  id: string
  email: string
  name: string
  role: string
}

// Mock API service for settings
const mockSettings = {
  general: {
    siteName: "Tesah Capital",
    siteDescription: "Investment Management Company",
    contactEmail: "info@tesahcapital.com",
    phoneNumber: "+233 302 908 640",
    address: "No. 4 Sir Arku Korsah Road, Airport Residential Area, Accra",
    logo: "/images/tesah-logo.png",
    favicon: "/favicon.ico",
  },
  social: {
    facebook: "https://facebook.com/tesahcapital",
    twitter: "https://twitter.com/tesahcapital",
    instagram: "https://instagram.com/tesahcapital",
    linkedin: "https://linkedin.com/company/tesahcapital",
    youtube: "https://youtube.com/tesahcapital",
  },
  security: {
    enableTwoFactor: false,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
  },
}

const fetchSettings = async (category: keyof SettingsState): Promise<any> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockSettings[category]), 300))
}

const saveSettings = async (category: keyof SettingsState, data: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      Object.assign(mockSettings[category], data) // Update mock data
      resolve({ success: true, data: mockSettings[category] })
    }, 500)
  })
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState<SettingsState>({
    general: {
      siteName: "",
      siteDescription: "",
      contactEmail: "",
      phoneNumber: "",
      address: "",
      logo: "",
      favicon: "",
    },
    social: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
    },
    security: {
      enableTwoFactor: false,
      passwordExpiry: 0,
      maxLoginAttempts: 0,
      sessionTimeout: 0,
    },
  })
  const [originalSettings, setOriginalSettings] = useState<SettingsState | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const [siteTitle, setSiteTitle] = useState("Tesah Capital")
  const [siteDescription, setSiteDescription] = useState("Your trusted partner in wealth management.")
  const [contactEmail, setContactEmail] = useState("info@tesahcapital.com")
  const [phone, setPhone] = useState("+233 30 296 0000")
  const [address, setAddress] = useState("123 Financial Street, Accra, Ghana")
  const [socialFacebook, setSocialFacebook] = useState("https://facebook.com/tesahcapital")
  const [socialTwitter, setSocialTwitter] = useState("https://twitter.com/tesahcapital")
  const [socialLinkedIn, setSocialLinkedIn] = useState("https://linkedin.com/company/tesahcapital")
  const [enableMaintenanceMode, setEnableMaintenanceMode] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const loadAllSettings = async () => {
      try {
        const general = await fetchSettings("general")
        const social = await fetchSettings("social")
        const security = await fetchSettings("security")

        const loadedSettings = {
          general: general || mockSettings.general,
          social: social || mockSettings.social,
          security: security || mockSettings.security,
        }
        setSettings(loadedSettings)
        setOriginalSettings(JSON.parse(JSON.stringify(loadedSettings))) // Deep copy
      } catch (error) {
        console.error("Error loading settings:", error)
        toast({
          title: "Error",
          description: "Failed to load settings.",
          variant: "destructive",
        })
      }
    }

    if (user) {
      loadAllSettings()
    }
  }, [user, toast])

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await saveSettings("general", settings.general)
      await saveSettings("social", settings.social)
      await saveSettings("security", settings.security)

      setOriginalSettings(JSON.parse(JSON.stringify(settings))) // Update original settings after save

      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreviewChanges = () => {
    setIsPreviewing(true)
    // In a real app, you'd send these settings to a preview service
    // For this demo, we'll just log them
    console.log("Previewing changes:", settings)
    toast({
      title: "Preview Mode",
      description: "Changes are being previewed (check console).",
    })
    setTimeout(() => {
      setIsPreviewing(false)
    }, 1000)
  }

  const hasChanges = () => {
    if (!originalSettings) return false
    return JSON.stringify(settings) !== JSON.stringify(originalSettings)
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
          <p className="text-gray-600">Please log in to view settings.</p>
        </div>
      </div>
    )
  }

  const canEditSettings = ["super_admin", "admin"].includes(user.role)

  if (!canEditSettings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
          <p className="text-gray-600">You don't have permission to edit settings.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure system settings and preferences</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePreviewChanges} disabled={!hasChanges() || isPreviewing || isSaving}>
            {isPreviewing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Eye className="mr-2 h-4 w-4" />}
            Preview Changes
          </Button>
          <Button onClick={handleSaveSettings} disabled={!hasChanges() || isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage general website information.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input
                id="site-name"
                value={settings.general.siteName}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    general: { ...prev.general, siteName: e.target.value },
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="site-description">Site Description</Label>
              <Textarea
                id="site-description"
                value={settings.general.siteDescription}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    general: { ...prev.general, siteDescription: e.target.value },
                  }))
                }
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={settings.general.contactEmail}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    general: { ...prev.general, contactEmail: e.target.value },
                  }))
                }
              />
            </div>
            <Button className="w-fit" onClick={() => handleSaveSettings}>
              Save General Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>Update your social media profiles.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                value={settings.social.facebook}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    social: { ...prev.social, facebook: e.target.value },
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                value={settings.social.twitter}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    social: { ...prev.social, twitter: e.target.value },
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                value={settings.social.linkedin}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    social: { ...prev.social, linkedin: e.target.value },
                  }))
                }
              />
            </div>
            <Button className="w-fit" onClick={() => handleSaveSettings}>
              Save Social Links
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Configure security-related options.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
              <Switch
                id="2fa"
                checked={settings.security.enableTwoFactor}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({
                    ...prev,
                    security: { ...prev.security, enableTwoFactor: checked },
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications for Login Attempts</Label>
              <Switch id="email-notifications" />
            </div>
            <Button className="w-fit" onClick={() => handleSaveSettings}>
              Save Security Settings
            </Button>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t border-gray-100 text-sm text-gray-600">
            <p>Security settings affect all users. Changes will take effect immediately after saving.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
