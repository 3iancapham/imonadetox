"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Plus } from "lucide-react"
import MobileNav from "@/components/mobile-nav"

// Example plans - in a real app, these would come from a database
const examplePlans = [
  {
    id: 1,
    condition: "eczema",
    date: "March 10, 2025",
    description: "Focusing on dietary triggers and skincare routine",
    categories: ["Diet", "Skincare", "Stress", "Environment"],
  },
  {
    id: 2,
    condition: "anxiety",
    date: "March 5, 2025",
    description: "Mindfulness techniques and lifestyle adjustments",
    categories: ["Mindfulness", "Exercise", "Sleep", "Nutrition"],
  },
  {
    id: 3,
    condition: "digestive issues",
    date: "February 28, 2025",
    description: "Elimination diet and gut health improvements",
    categories: ["Diet", "Supplements", "Hydration", "Lifestyle"],
  },
]

export default function PlansPage() {
  const router = useRouter()
  const [plans] = useState(examplePlans)

  const handlePlanClick = (planId: number) => {
    // In a real app, you would navigate to the specific plan
    // For now, we'll just go to the eczema plan we've already built
    router.push("/plan")
  }

  const handleNewChat = () => {
    router.push("/chat")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#E6F5EE] pb-20">
      <header className="p-4 border-b bg-white flex justify-center">
        <h1 className="text-xl font-semibold text-black">My DETOX Plans</h1>
      </header>

      <div className="p-4 space-y-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Select a plan to view detailed recommendations based on your conversations.
          </p>
        </div>

        {plans.map((plan) => (
          <Card
            key={plan.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handlePlanClick(plan.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>I'm on a DETOX from {plan.condition}</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardTitle>
              <p className="text-xs text-gray-500">{plan.date}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">{plan.description}</p>
              <div className="flex flex-wrap gap-2">
                {plan.categories.map((category, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {category}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <Button onClick={handleNewChat} className="w-full mt-6 bg-black hover:bg-gray-800">
          <Plus className="mr-2 h-4 w-4" /> Start New DETOX Plan
        </Button>

        <div className="mt-6 mb-4">
          <p className="text-xs text-gray-500 text-center italic">
            DISCLAIMER: The information provided is for general informational purposes only and is not intended as
            medical advice. Always consult with a healthcare professional before making changes to your health regimen.
          </p>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}

