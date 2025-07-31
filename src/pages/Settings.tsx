"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Switch, Separator } from "../components/ui"
import { SettingsIcon, Mail, Lock, Bell, Trash, EyeOff } from "lucide-react"
import useUser from "../features/Authentication/useUser"
import { useUpdateUser } from "../features/Authentication/useUpdateUser"
import { useDeleteUser } from "../features/Authentication/useDeleteUser"
import toast from "react-hot-toast"

export default function Settings() {
  const { user } = useUser()
  const { updatingUser: updateUser, isUpdatingUser: isUpdating } = useUpdateUser()
  const { deleteUser, isDeleting } = useDeleteUser()

  const [phoneNumber, setPhoneNumber] = useState(user?.user_metadata?.phoneNumber || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    orderUpdates: true,
    reviewNotifications: true,
    marketingEmails: false,
  })

  const handleUpdateContact = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser({
      phoneNumber: phoneNumber,
    })
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match")
      return
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }
    updateUser({
      password: newPassword,
    })
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleDeactivateAccount = () => {
    if (window.confirm("Are you sure you want to deactivate your account? This action can be reversed.")) {
      toast.success("Account deactivation request submitted")
    }
  }

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      if (window.confirm("This will permanently delete all your data. Are you absolutely sure?")) {
        deleteUser()
      }
    }
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl">
          <SettingsIcon className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and security</p>
        </div>
      </div>

      {}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Mail className="w-5 h-5 text-green-600" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateContact} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address
                </Label>
                <Input id="email" value={user?.email || ""} disabled className="bg-muted/50 cursor-not-allowed" />
                <p className="text-xs text-muted-foreground">Email cannot be changed for security reasons</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+250 XXX XXX XXX"
                />
                <p className="text-xs text-muted-foreground">Used for order notifications and buyer contact</p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl"
            >
              {isUpdating ? "Updating..." : "Update Contact Info"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Lock className="w-5 h-5 text-blue-600" />
            Password & Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-semibold">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-semibold">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isUpdating || !currentPassword || !newPassword || !confirmPassword}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl"
            >
              {isUpdating ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Bell className="w-5 h-5 text-yellow-600" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div>
                <h4 className="font-semibold">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                checked={notifications.emailNotifications}
                onCheckedChange={(checked: boolean) =>
                  setNotifications((prev) => ({ ...prev, emailNotifications: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div>
                <h4 className="font-semibold">Order Updates</h4>
                <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
              </div>
              <Switch
                checked={notifications.orderUpdates}
                onCheckedChange={(checked: boolean) => setNotifications((prev) => ({ ...prev, orderUpdates: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div>
                <h4 className="font-semibold">Review Notifications</h4>
                <p className="text-sm text-muted-foreground">Get notified when buyers leave reviews</p>
              </div>
              <Switch
                checked={notifications.reviewNotifications}
                onCheckedChange={(checked: boolean) =>
                  setNotifications((prev) => ({ ...prev, reviewNotifications: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div>
                <h4 className="font-semibold">Marketing Emails</h4>
                <p className="text-sm text-muted-foreground">Receive promotional content and tips</p>
              </div>
              <Switch
                checked={notifications.marketingEmails}
                onCheckedChange={(checked: boolean) =>
                  setNotifications((prev) => ({ ...prev, marketingEmails: checked }))
                }
              />
            </div>
          </div>

          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl">
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>

      {}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl text-red-600">
            <Trash className="w-5 h-5" />
            Account Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Account Deactivation</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
              Temporarily disable your account. You can reactivate it anytime by logging in.
            </p>
            <Button
              onClick={handleDeactivateAccount}
              variant="outline"
              className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 bg-transparent"
            >
              <EyeOff className="w-4 h-4 mr-2" />
              Deactivate Account
            </Button>
          </div>

          <Separator />

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Delete Account</h4>
            <p className="text-sm text-red-700 dark:text-red-300 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button onClick={handleDeleteAccount} disabled={isDeleting} variant="destructive" className="bg-red-500 hover:bg-red-600">
              <Trash className="w-4 h-4 mr-2" />
              Delete Account Permanently
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
