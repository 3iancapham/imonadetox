"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import MobileNav from "@/components/mobile-nav"
import Image from "next/image"

const exampleChat = [
  { role: "assistant", content: "What are you on a DETOX from? I'm here to help you on your wellness journey." },
  {
    role: "user",
    content: "I'm on a DETOX from eczema. I've had it for years and it's really affecting my confidence.",
  },
  {
    role: "assistant",
    content:
      "Thank you for sharing that. Eczema can definitely impact both physical comfort and emotional wellbeing. Could you tell me a bit more about your symptoms? For example, which areas of your body are affected, and have you noticed any triggers that seem to make it worse?",
  },
  {
    role: "user",
    content: "It's mostly on my arms and neck. It gets worse when I'm stressed or when I eat dairy products.",
  },
  {
    role: "assistant",
    content:
      "That's really helpful information. The stress and dairy connection is something we should explore further. Have you made any changes to your diet or lifestyle to manage your eczema so far? And how effective have those changes been?",
  },
  {
    role: "user",
    content: "I've tried to cut back on dairy and I use steroid creams from my doctor, but they only help temporarily.",
  },
  {
    role: "assistant",
    content:
      "I understand how frustrating it can be when treatments only provide temporary relief. Let's dig a bit deeper. Besides stress and dairy, have you noticed any connection between your eczema flare-ups and other factors like sleep quality, certain fabrics, soaps, or environmental factors?",
  },
]

const detoxPlan = `
# Your Personalized I'm on a DETOX from eczema Plan

**IMPORTANT: This is not medical advice but suggestions based on crowdsourcing the internet. Always consult with healthcare professionals before making significant changes.**

## Dietary Adjustments
- Gradually eliminate dairy products completely for 3 weeks to observe changes
- Increase omega-3 rich foods (fatty fish, flaxseeds, walnuts)
- Add anti-inflammatory foods (turmeric, ginger, leafy greens)
- Stay hydrated with at least 8 glasses of water daily

## Stress Management
- Practice 10-minute daily meditation using the guided sessions in our app
- Try progressive muscle relaxation before bed
- Consider journaling triggers and symptoms to identify patterns

## Skincare Routine
- Use fragrance-free, hypoallergenic products
- Apply moisturizer while skin is still damp
- Consider natural moisturizers like coconut oil or shea butter
- Avoid hot showers; use lukewarm water instead

## Environment
- Use dust mite covers for pillows and mattress
- Switch to hypoallergenic laundry detergent
- Consider a humidifier in dry environments

## Follow-up
- Track your symptoms daily in the app
- We'll check in weekly to adjust your plan based on progress
`

export default function PreviewPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [showPlan, setShowPlan] = useState(false)
  const [firstClickDone, setFirstClickDone] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Scroll to the latest message when currentStep changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [currentStep])

  // Scroll to the plan when it's shown
  useEffect(() => {
    if (showPlan && contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [showPlan])

  const handleNext = () => {
    // Set firstClickDone to true on first click
    if (!firstClickDone) {
      setFirstClickDone(true)
    }

    if (currentStep < exampleChat.length - 1) {
      setCurrentStep(currentStep + 1)
    } else if (!showPlan) {
      setShowPlan(true)
    } else {
      router.push("/chat")
    }
  }

  const handleSkip = () => {
    router.push("/chat")
  }

  // Determine button text based on state
  const getButtonText = () => {
    if (!firstClickDone) {
      return "See how it works"
    } else if (showPlan) {
      return "Start Your DETOX"
    } else {
      return "Next"
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#E6F5EE]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-white">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="relative w-[120px] h-[40px]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Text%20%26%20White%20Logo-y3ZBwXFrVK4fHBRHpsg7NUA0rrJHKi.png"
            alt="DETOX Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="w-10"></div> {/* Empty div for spacing */}
      </header>

      {/* Preview Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto p-4 pb-40">
        {!showPlan ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <AnimatePresence>
                {exampleChat.slice(0, currentStep + 1).map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className={`max-w-[85%] ${
                        message.role === "user" ? "ml-auto bg-black text-white" : "mr-auto bg-white"
                      }`}
                    >
                      <CardContent className="p-3">{message.content}</CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              {/* Invisible element at the end for scrolling */}
              <div ref={messagesEndRef} className="h-8" />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-lg font-medium">Your Personalized Plan</h2>
              <p className="text-sm text-gray-600">After our conversation, you'll receive a plan like this</p>
            </div>

            <Card className="bg-white p-4">
              <CardContent className="p-2">
                <div className="prose prose-sm max-w-none">
                  {detoxPlan.split("\n").map((line, index) => {
                    if (line.startsWith("# ")) {
                      return (
                        <h1 key={index} className="text-xl font-bold mt-4 mb-2">
                          {line.substring(2)}
                        </h1>
                      )
                    } else if (line.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-lg font-semibold mt-4 mb-2">
                          {line.substring(3)}
                        </h2>
                      )
                    } else if (line.startsWith("- ")) {
                      return (
                        <li key={index} className="ml-4">
                          {line.substring(2)}
                        </li>
                      )
                    } else if (line.startsWith("**")) {
                      return (
                        <p key={index} className="font-bold text-red-600 my-2">
                          {line.replace(/\*\*/g, "")}
                        </p>
                      )
                    } else if (line.trim() === "") {
                      return <div key={index} className="h-2"></div>
                    } else {
                      return (
                        <p key={index} className="my-2">
                          {line}
                        </p>
                      )
                    }
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Footer with two buttons */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4">
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={handleSkip} variant="outline" className="py-6">
            Skip
          </Button>
          <Button onClick={handleNext} className="py-6 bg-black hover:bg-gray-800">
            {getButtonText()}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}

