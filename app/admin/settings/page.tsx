"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, Eye, AlertTriangle } from "lucide-react"
import { apiService } from "@/lib/api-service"

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

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState<SettingsState>({
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
  })
  const [originalSettings, setOriginalSettings] = useState<SettingsState | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Load settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const generalResponse = await apiService.getSettings("general")
        const socialResponse = await apiService.getSettings("social")
        const securityResponse = await apiService.getSettings("security")

        if (generalResponse.success && generalResponse.data) {
          setSettings((prev) => ({ ...prev, general: { ...prev.general, ...generalResponse.data } }))
        }

        if (socialResponse.success && socialResponse.data) {
          setSettings((prev) => ({ ...prev, social: { ...prev.social, ...socialResponse.data } }))
        }

        if (securityResponse.success && securityResponse.data) {
          setSettings((prev) => ({ ...prev, security: { ...prev.security, ...securityResponse.data } }))
        }

        // Store original settings for comparison
        setOriginalSettings({
          general: { ...settings.general },
          social: { ...settings.social },
          security: { ...settings.security },
        })
      } catch (error) {
        console.error("Error loading settings:", error)
        toast({
          title: "Error",
          description: "Failed to load settings",
          variant: "destructive",
        })
      }
    }

    if (user) {
      loadSettings()
    }
  }, [user, toast])

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // Save each settings category
      await apiService.saveSettings("general", settings.general)
      await apiService.saveSettings("social", settings.social)
      await apiService.saveSettings("security", settings.security)

      // Update original settings
      setOriginalSettings({
        general: { ...settings.general },
        social: { ...settings.social },
        security: { ...settings.security },
      })

      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreviewChanges = () => {
    setIsPreviewing(true)
    // Store current settings in localStorage for preview
    localStorage.setItem("preview_settings", JSON.stringify(settings))

    // Open preview in new tab
    window.open("/admin-preview", "_blank")

    setTimeout(() => {
      setIsPreviewing(false)
    }, 1000)
  }

  const hasChanges = () => {
    if (!originalSettings) return false

    return (
      JSON.stringify(settings.general) !== JSON.stringify(originalSettings.general) ||
      JSON.stringify(settings.social) !== JSON.stringify(originalSettings.social) ||
      JSON.stringify(settings.security) !== JSON.stringify(originalSettings.security)
    )
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic information about your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
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
                <div className="space-y-2">
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
              </div>

              <div className="space-y-2">
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
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input
                    id="phone-number"
                    value={settings.general.phoneNumber}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        general: { ...prev.general, phoneNumber: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={settings.general.logo}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        general: { ...prev.general, logo: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={settings.general.address}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      general: { ...prev.general, address: e.target.value },
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Configure your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={settings.social.instagram}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        social: { ...prev.social, instagram: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  value={settings.social.youtube}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      social: { ...prev.social, youtube: e.target.value },
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options for your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Require two-factor authentication for all admin users</p>
                </div>
                <Switch
                  id="two-factor"
                  checked={settings.security.enableTwoFactor}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      security: { ...prev.security, enableTwoFactor: checked },
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input
                    id="password-expiry"
                    type="number"
                    value={settings.security.passwordExpiry}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        security: { ...prev.security, passwordExpiry: Number.parseInt(e.target.value) || 0 },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Input
                    id="max-login-attempts"
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        security: { ...prev.security, maxLoginAttempts: Number.parseInt(e.target.value) || 0 },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      security: { ...prev.security, sessionTimeout: Number.parseInt(e.target.value) || 0 },
                    }))
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t border-gray-100 text-sm text-gray-600">
              <p>Security settings affect all users. Changes will take effect immediately after saving.</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
