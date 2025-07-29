"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import type { AuthUsers } from "@/interfaces"

interface FarmerContactProps {
  farmer: AuthUsers | null
  location?: string
}

export default function FarmerContact({ farmer, location }: FarmerContactProps) {
  if (!farmer) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Farmer information not available</p>
        </CardContent>
      </Card>
    )
  }

  const handleCall = () => {
    if (farmer.phoneNumber) {
      window.open(`tel:${farmer.phoneNumber}`)
    }
  }

  const handleSMS = () => {
    if (farmer.phoneNumber) {
      window.open(`sms:${farmer.phoneNumber}`)
    }
  }

  const handleEmail = () => {
    if (farmer.email) {
      window.open(`mailto:${farmer.email}`)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-16 h-16 border-2 border-green-200">
            <AvatarImage src={farmer.avatar || ""} alt={`${farmer.firstName} ${farmer.lastName}`} />
            <AvatarFallback className="bg-green-100 text-green-700 text-lg font-semibold">
              {farmer.firstName?.[0]}
              {farmer.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {farmer.firstName} {farmer.lastName}
            </h3>
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">Farmer</p>
          </div>
        </div>

        <div className="space-y-4">
          {farmer.phoneNumber && (
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-xl border">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium flex-1">{farmer.phoneNumber}</span>
            </div>
          )}

          {farmer.email && (
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-xl border">
              <Mail className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium flex-1">{farmer.email}</span>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-xl border">
              <MapPin className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium flex-1">{location}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 mt-6">
          {farmer.phoneNumber && (
            <>
              <Button onClick={handleCall} className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
              <Button onClick={handleSMS} variant="outline" className="gap-2 bg-transparent">
                <MessageCircle className="w-4 h-4" />
                Send SMS
              </Button>
            </>
          )}
          {farmer.email && (
            <Button onClick={handleEmail} variant="outline" className="gap-2 bg-transparent">
              <Mail className="w-4 h-4" />
              Send Email
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
