"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2 } from "lucide-react"
import MobileNav from "@/components/mobile-nav"

// Example plan items - in a real app, these would come from a database
const examplePlan = {
  physical: {
    diet: [
      { id: 1, text: "Eliminate dairy products completely for 3 weeks" },
      { id: 2, text: "Increase omega-3 rich foods (fatty fish, flaxseeds, walnuts)" },
      { id: 3, text: "Add anti-inflammatory foods (turmeric, ginger, leafy greens)" },
      { id: 4, text: "Stay hydrated with at least 8 glasses of water daily" },
    ],
    skincare: [
      { id: 8, text: "Use fragrance-free, hypoallergenic products" },
      { id: 9, text: "Apply moisturizer while skin is still damp" },
      { id: 10, text: "Consider natural moisturizers like coconut oil or shea butter" },
      { id: 11, text: "Avoid hot showers; use lukewarm water instead" },
    ],
    exercise: [
      { id: 15, text: "Gentle yoga for 15 minutes daily" },
      { id: 16, text: "Walking outdoors for 20-30 minutes, 3 times a week" },
      { id: 17, text: "Avoid high-intensity workouts during flare-ups" },
    ],
  },
  emotional: {
    stress: [
      { id: 5, text: "Practice 10-minute daily meditation" },
      { id: 6, text: "Try progressive muscle relaxation before bed" },
      { id: 7, text: "Journal triggers and symptoms to identify patterns" },
    ],
    environment: [
      { id: 12, text: "Use dust mite covers for pillows and mattress" },
      { id: 13, text: "Switch to hypoallergenic laundry detergent" },
      { id: 14, text: "Consider a humidifier in dry environments" },
    ],
    friends: [
      { id: 18, text: "Share your health journey with close friends" },
      { id: 19, text: "Ask for support during difficult flare-ups" },
      { id: 20, text: "Plan low-stress social activities" },
    ],
    family: [
      { id: 21, text: "Educate family members about your condition" },
      { id: 22, text: "Create a calm home environment" },
      { id: 23, text: "Establish boundaries around triggering situations" },
    ],
  },
}

type PlanItem = {
  id: number
  text: string
}

export default function PlanPage() {
  const [planItems, setPlanItems] = useState(examplePlan)

  const deleteItem = (category: "physical" | "emotional", subCategory: string, id: number) => {
    setPlanItems((prev) => {
      const updatedSubCategory = prev[category][subCategory].filter((item) => item.id !== id)

      return {
        ...prev,
        [category]: {
          ...prev[category],
          [subCategory]: updatedSubCategory,
        },
      }
    })
  }

  const renderPlanItems = (items: PlanItem[], category: "physical" | "emotional", subCategory: string) => {
    return items.map((item) => (
      <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
        <div className="flex items-start gap-2">
          <p className="text-sm text-gray-700">{item.text}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteItem(category, subCategory, item.id)}
          className="h-8 w-8 text-gray-400"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ))
  }

  const renderSubSection = (
    title: string,
    items: PlanItem[],
    category: "physical" | "emotional",
    subCategory: string,
  ) => {
    return (
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-md">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {renderPlanItems(items, category, subCategory)}
          <Button variant="outline" className="w-full mt-3 border-dashed">
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#E6F5EE] pb-20">
      <header className="p-4 border-b bg-white">
        <h1 className="text-xl font-semibold text-black">I'm on a DETOX from eczema</h1>
      </header>

      <div className="p-4 space-y-4">
        <Tabs defaultValue="physical">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="physical">Physical</TabsTrigger>
            <TabsTrigger value="emotional">Emotional</TabsTrigger>
          </TabsList>

          <TabsContent value="physical" className="space-y-4">
            <div className="text-lg font-medium mb-2">Physical Wellness</div>
            {renderSubSection("Diet", planItems.physical.diet, "physical", "diet")}
            {renderSubSection("Skincare", planItems.physical.skincare, "physical", "skincare")}
            {renderSubSection("Exercise", planItems.physical.exercise, "physical", "exercise")}
          </TabsContent>

          <TabsContent value="emotional" className="space-y-4">
            <div className="text-lg font-medium mb-2">Emotional Wellness</div>
            {renderSubSection("Stress Management", planItems.emotional.stress, "emotional", "stress")}
            {renderSubSection("Environment", planItems.emotional.environment, "emotional", "environment")}
            {renderSubSection("Friends", planItems.emotional.friends, "emotional", "friends")}
            {renderSubSection("Family", planItems.emotional.family, "emotional", "family")}
          </TabsContent>
        </Tabs>

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

