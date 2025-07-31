"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import useUser from "./useUser"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FaCamera, FaUser, FaEnvelope, FaPhone } from "react-icons/fa"
import { useUpdateAvatar } from "./useUpdateAvatar"
import { useUpdateUser } from "./useUpdateUser"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function UpdateUserInfo() {
  const { updatingUser, isUpdatingUser } = useUpdateUser()
  const { updatingAvatar, isUpdatingAvatar } = useUpdateAvatar()
  const { user } = useUser()
  const currentFirstName = user?.user_metadata.firstName
  const currentLastName = user?.user_metadata.lastName
  const currentPhoneNumber = user?.user_metadata.phoneNumber
  const email = user?.email
  const avatar = user?.user_metadata.avatar
  const { t } = useTranslation()
  const [firstName, setFirstName] = useState<string>(currentFirstName || "")
  const [lastName, setLastName] = useState<string>(currentLastName || "")
  const [phoneNumber, setPhoneNumber] = useState<string>(currentPhoneNumber || "")

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!firstName && !lastName && !phoneNumber) return
    updatingUser({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
    })
  }

  return (
    <Card className="bg-card border-green-100/50 shadow-soft">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-foreground font-display">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-2xl">
            <FaUser className="w-5 h-5 text-green-600" />
          </div>
          {t("accountPersonalInfo") || "Personal Information"}
        </CardTitle>
        <p className="text-muted-foreground">Update your personal information and contact details</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Profile Picture Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="relative group">
              <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-green-100 dark:ring-green-900/30 shadow-soft">
                <img
                  src={avatar ? avatar : "/Images/default-user.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {isUpdatingAvatar ? (
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaCamera className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>

              <Label
                htmlFor="avatar"
                className="absolute -bottom-2 -right-2 p-3 bg-green-500 hover:bg-green-600 text-white rounded-full cursor-pointer shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-110"
              >
                <FaCamera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  className="hidden"
                  disabled={isUpdatingAvatar}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      updatingAvatar({ avatar: file })
                    } else {
                      toast.error(t("personalInfoImageAlert") || "Please select a valid image")
                    }
                  }}
                />
              </Label>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Profile Picture</p>
              <p className="text-xs text-muted-foreground">Click the camera icon to update</p>
            </div>
          </motion.div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <FaEnvelope className="w-4 h-4 text-green-600" />
                {t("emailInput") || "Email Address"}
              </Label>
              <Input value={email} disabled id="email" className="bg-muted/50 cursor-not-allowed" />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </motion.div>

            {}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-2"
            >
              <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <FaPhone className="w-4 h-4 text-green-600" />
                {t("phoneNumberInput") || "Phone Number"}
              </Label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                id="phoneNumber"
                placeholder="+250 XXX XXX XXX"
              />
              <p className="text-xs text-muted-foreground">Buyers will use this to contact you directly</p>
            </motion.div>

            {}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2"
            >
              <Label htmlFor="firstName" className="text-sm font-semibold text-foreground">
                {t("firstNameInput") || "First Name"}
              </Label>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="firstName"
                placeholder="Enter your first name"
              />
            </motion.div>

            {}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="space-y-2"
            >
              <Label htmlFor="lastName" className="text-sm font-semibold text-foreground">
                {t("lastNameInput") || "Last Name"}
              </Label>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
                placeholder="Enter your last name"
              />
            </motion.div>
          </div>

          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <FaPhone className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Contact Information</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Your phone number will be visible to buyers so they can contact you directly about your products. Make
                  sure to provide an active number where you can be reached.
                </p>
              </div>
            </div>
          </motion.div>

          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4"
          >
            <Button
              disabled={isUpdatingUser}
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
            >
              {isUpdatingUser ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </div>
              ) : (
                t("saveChanges") || "Save Changes"
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}

export default UpdateUserInfo
