"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminLoginPreview from "../admin/login-preview"
import DashboardPreview from "../admin/dashboard-preview"
import ContentPreview from "../admin/content-preview"
import SlideshowPreview from "../admin/slideshow-preview"
import MediaPreview from "../admin/media-preview"
import TeamPreview from "../admin/team-preview"
import SettingsPreview from "../admin/settings-preview"

export default function AdminPreviewPage() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Tesah Capital Admin Interface Preview</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="slideshow">Slideshow</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="mt-6">
          <AdminLoginPreview />
        </TabsContent>

        <TabsContent value="dashboard" className="mt-6">
          <DashboardPreview />
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <ContentPreview />
        </TabsContent>

        <TabsContent value="slideshow" className="mt-6">
          <SlideshowPreview />
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <MediaPreview />
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <TeamPreview />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <SettingsPreview />
        </TabsContent>
      </Tabs>
    </div>
  )
}
