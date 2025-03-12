"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle2, Clock } from "lucide-react"
import MobileNav from "@/components/mobile-nav"
import { useToast } from "@/hooks/use-toast"

type TrackerItem = {
  id: number
  title: string
  time: string
  completed: boolean
  category: string
}

export default function TrackerPage() {
  const { toast } = useToast()
  const [trackerItems, setTrackerItems] = useState<TrackerItem[]>([
    {
      id: 1,
      title: "Morning meditation",
      time: "8:00 AM",
      completed: false,
      category: "Stress Management",
    },
    {
      id: 2,
      title: "Take omega-3 supplement",
      time: "9:00 AM",
      completed: true,
      category: "Dietary",
    },
    {
      id: 3,
      title: "Apply moisturizer",
      time: "10:00 AM",
      completed: false,
      category: "Skincare",
    },
    {
      id: 4,
      title: "Drink 8oz of water",
      time: "11:00 AM",
      completed: false,
      category: "Dietary",
    },
    {
      id: 5,
      title: "Afternoon walk (15 min)",
      time: "2:00 PM",
      completed: false,
      category: "Exercise",
    },
    {
      id: 6,
      title: "Evening journaling",
      time: "8:00 PM",
      completed: false,
      category: "Stress Management",
    },
    {
      id: 7,
      title: "Avoid dairy at dinner",
      time: "7:00 PM",
      completed: false,
      category: "Dietary",
    },
  ])

  const toggleItem = (id: number) => {
    setTrackerItems((prev) => prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))

    const item = trackerItems.find((item) => item.id === id)

    if (item) {
      toast({
        title: item.completed ? "Task incomplete" : "Task completed",
        description: item.completed
          ? `You've marked "${item.title}" as incomplete`
          : `Great job! You've completed "${item.title}"`,
      })
    }
  }

  // Calculate completion stats
  const totalItems = trackerItems.length
  const completedItems = trackerItems.filter((item) => item.completed).length
  const progressPercentage = Math.round((completedItems / totalItems) * 100)

  // Get current time to determine upcoming tasks
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinutes = now.getMinutes()

  // Group items by time period
  const upcomingItems = trackerItems
    .filter((item) => {
      const [hourStr, minuteStr] = item.time.split(":")
      const hour = Number.parseInt(hourStr)
      const isPM = item.time.includes("PM") && hour !== 12
      const is24Hour = isPM ? hour + 12 : hour === 12 && item.time.includes("AM") ? 0 : hour

      return (
        !item.completed &&
        (is24Hour > currentHour || (is24Hour === currentHour && Number.parseInt(minuteStr) > currentMinutes))
      )
    })
    .slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen bg-[#E6F5EE] pb-20">
      <header className="p-4 border-b bg-white">
        <h1 className="text-xl font-semibold text-black">Daily Tracker</h1>
      </header>

      <div className="p-4 space-y-4">
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="font-medium">Today's Progress</h2>
                <p className="text-sm text-gray-500">
                  {completedItems} of {totalItems} tasks completed
                </p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white">
                {progressPercentage}%
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-black h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </CardContent>
        </Card>

        {upcomingItems.length > 0 && (
          <Card className="mb-4 border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Bell className="mr-2 h-5 w-5 text-blue-500" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Daily Routine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {trackerItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <Checkbox
                      id={`tracker-${item.id}`}
                      checked={item.completed}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`tracker-${item.id}`}
                        className={`text-sm font-medium block ${item.completed ? "line-through text-gray-400" : "text-gray-700"}`}
                      >
                        {item.title}
                      </label>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{item.time}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {item.completed && <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />}
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Button variant="outline" className="text-sm">
                View Previous Days
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <MobileNav />
    </div>
  )
}

