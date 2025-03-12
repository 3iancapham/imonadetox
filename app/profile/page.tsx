"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User } from "lucide-react"
import MobileNav from "@/components/mobile-nav"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const [name, setName] = useState("Alex Johnson")
  const [email, setEmail] = useState("alex@example.com")
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#E6F5EE] pb-20">
      <header className="p-4 border-b bg-white">
        <h1 className="text-xl font-semibold text-black">Profile</h1>
      </header>

      <div className="p-4 space-y-4">
        <div className="flex flex-col items-center justify-center py-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>

          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-500">{email}</p>

          <Button variant="outline" size="sm" className="mt-4">
            <User className="mr-2 h-4 w-4" /> Edit Profile Picture
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <Button onClick={handleSave} className="w-full bg-black hover:bg-gray-800">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Notifications</Label>
                <p className="text-sm text-gray-500">Receive daily reminders and updates</p>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="darkMode">Dark Mode</Label>
                <p className="text-sm text-gray-500">Switch between light and dark themes</p>
              </div>
              <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700">
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </div>

      <MobileNav />
    </div>
  )
}

