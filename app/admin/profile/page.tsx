'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface Profile {
  id: string
  email: string
  first_name: string
  last_name: string
  role: string
}

export default function ProfilePage() {
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    current_password: '',
    new_password: '',
    confirm_password: '',
  })

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        const { data: profileData, error } = await supabase
          .from('users_profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error

        setProfile(profileData)
        setFormData((prev) => ({
          ...prev,
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || '',
          email: profileData.email || '',
        }))
      } catch (error) {
        console.error('Failed to load profile:', error)
        toast.error('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [supabase])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error('Not authenticated')

      // Update user metadata with name changes
      if (
        formData.first_name !== profile?.first_name ||
        formData.last_name !== profile?.last_name
      ) {
        const { error } = await supabase.auth.updateUser({
          data: {
            first_name: formData.first_name,
            last_name: formData.last_name,
          },
        })

        if (error) throw error
      }

      // Update profile in database
      const { error: updateError } = await supabase
        .from('users_profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      toast.success('Profile updated successfully')

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              first_name: formData.first_name,
              last_name: formData.last_name,
            }
          : null
      )
    } catch (error: any) {
      console.error('Failed to update profile:', error)
      toast.error(error.message || 'Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.new_password) {
      toast.error('New password is required')
      return
    }

    if (formData.new_password !== formData.confirm_password) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.new_password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setUpdating(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.new_password,
      })

      if (error) throw error

      toast.success('Password updated successfully')
      setFormData((prev) => ({
        ...prev,
        current_password: '',
        new_password: '',
        confirm_password: '',
      }))
    } catch (error: any) {
      console.error('Failed to update password:', error)
      toast.error(error.message || 'Failed to update password')
    } finally {
      setUpdating(false)
    }
  }

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.email === profile?.email) {
      toast.error('Please enter a different email address')
      return
    }

    setUpdating(true)

    try {
      const { error } = await supabase.auth.updateUser({
        email: formData.email,
      })

      if (error) throw error

      toast.success(
        'Confirmation email sent to your new address. Please verify it.'
      )
    } catch (error: any) {
      console.error('Failed to update email:', error)
      toast.error(error.message || 'Failed to update email')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-4" />
          <p className="text-muted-foreground">Failed to load profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account information and security settings
        </p>
      </div>

      {/* Basic Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      first_name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      last_name: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Role</Label>
              <Input
                value={profile.role}
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Contact an Admin to change your role
              </p>
            </div>

            <Button type="submit" disabled={updating}>
              {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Email Management */}
      <Card>
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <div>
              <Label>Current Email</Label>
              <Input value={profile.email} disabled className="bg-muted" />
            </div>

            <div>
              <Label>New Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                placeholder="your-new-email@example.com"
              />
              <p className="text-xs text-muted-foreground mt-1">
                You'll need to verify your new email address
              </p>
            </div>

            <Button type="submit" disabled={updating}>
              {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Email
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Password Management */}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                value={formData.new_password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    new_password: e.target.value,
                  })
                }
                placeholder="Enter new password"
              />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={formData.confirm_password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirm_password: e.target.value,
                  })
                }
                placeholder="Confirm new password"
              />
            </div>

            <div className="bg-muted p-3 rounded text-sm text-muted-foreground">
              <p>Password must be at least 6 characters long</p>
            </div>

            <Button type="submit" disabled={updating}>
              {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-sm">Account Information</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            <span className="font-semibold">User ID:</span> {profile.id}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {profile.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span>{' '}
            {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
