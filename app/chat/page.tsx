"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Send, RefreshCw, Plus } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import MobileNav from "@/components/mobile-nav"
import { useToast } from "@/hooks/use-toast"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPlan, setShowPlan] = useState(false)
  const [plan, setPlan] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initial prompt when the chat page loads
  const initialPrompt = async () => {
    setIsLoading(true)
    try {
      // Check if we have the OpenAI API key in the environment
      if (!process.env.OPENAI_API_KEY) {
        console.warn("OpenAI API key is missing. Using fallback message.")
        setMessages([
          {
            role: "assistant",
            content: "What are you on a DETOX from? I'm here to help you on your self healing journey.",
          },
        ])
        setIsLoading(false)
        return
      }

      const { text } = await generateText({
        model: openai("gpt-4o"),
        system:
          "You are a wellness coach helping users identify the root causes of their health issues. Be empathetic, thoughtful, and ask probing questions to help users gain deeper insights.",
        prompt:
          "Ask the user what they're on a DETOX from. Keep your response concise, friendly, and open-ended without providing specific examples.",
      })

      setMessages([{ role: "assistant", content: text }])
    } catch (error) {
      console.error("Error generating initial message:", error)
      setMessages([
        {
          role: "assistant",
          content: "What are you on a DETOX from? I'm here to help you on your self healing journey.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    initialPrompt()
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, showPlan])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    setIsLoading(true)

    try {
      // Check if OpenAI API key is missing
      if (!process.env.OPENAI_API_KEY) {
        // Add user message to chat
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm having trouble connecting to my knowledge base right now. Could you please share more about your experience with this condition?",
          },
        ])
        setIsLoading(false)
        return
      }

      // Check if we should generate a plan (after several exchanges)
      if (messages.length >= 6 && !showPlan) {
        // Generate a personalized plan
        const { text: planText } = await generateText({
          model: openai("gpt-4o"),
          system:
            "You are a wellness coach creating a personalized plan for a user based on their health condition. Format the plan with markdown headings and bullet points. Always start with a disclaimer that this is not medical advice but suggestions based on crowdsourcing the internet.",
          prompt: `Based on this conversation, create a personalized DETOX plan for the user. Include sections for dietary suggestions, lifestyle changes, and any other relevant recommendations. Make it specific to their condition. Here's the conversation: ${JSON.stringify(messages)}`,
        })

        setPlan(planText)

        // Generate a response that introduces the plan
        const { text } = await generateText({
          model: openai("gpt-4o"),
          system:
            "You are a wellness coach helping users identify the root causes of their health issues. Be empathetic, thoughtful, and ask probing questions to help users gain deeper insights into their conditions.",
          prompt: `Based on the conversation so far, tell the user you've prepared a personalized plan for them. Let them know it includes suggestions that might help with their condition, but emphasize that it's not medical advice. Keep it concise and encouraging. Here's the conversation: ${JSON.stringify(messages)}`,
          messages: messages.map((msg) => ({ role: msg.role, content: msg.content })),
        })

        // Add AI response to chat
        setMessages((prev) => [...prev, { role: "assistant", content: text }])

        // Show the plan after the message
        setShowPlan(true)
      } else {
        // Regular conversation response
        const { text } = await generateText({
          model: openai("gpt-4o"),
          system:
            "You are a wellness coach helping users identify the root causes of their health issues. Ask thoughtful, probing questions like a therapist would to help users gain deeper insights into their conditions. Be empathetic and supportive.",
          prompt: `The user is on a detox journey and has shared: "${userMessage}". Ask a thoughtful follow-up question to help them explore the root causes of their issue. If this is their first message, ask them to elaborate on their condition and how it affects their daily life.`,
          messages: messages.map((msg) => ({ role: msg.role, content: msg.content })),
        })

        // Add AI response to chat
        setMessages((prev) => [...prev, { role: "assistant", content: text }])
      }
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Could you please share more about your experience with this condition?",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setMessages([])
    setShowPlan(false)
    setPlan("")
    // Restart the initial prompt
    initialPrompt()
  }

  const addToPlan = () => {
    // In a real app, this would save to a database
    // For now, we'll just show a toast notification
    toast({
      title: "Added to Plan",
      description: "Recommendations have been added to your plan",
    })

    // Navigate to the plans overview page instead of directly to the plan
    router.push("/plans")
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
        <Button variant="ghost" size="icon" onClick={handleReset}>
          <RefreshCw className="h-5 w-5" />
        </Button>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        {messages.map((message, index) => (
          <Card
            key={index}
            className={`max-w-[85%] ${message.role === "user" ? "ml-auto bg-black text-white" : "mr-auto bg-white"}`}
          >
            <CardContent className="p-3">{message.content}</CardContent>
          </Card>
        ))}

        {isLoading && (
          <Card className="max-w-[85%] mr-auto bg-white">
            <CardContent className="p-3 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </CardContent>
          </Card>
        )}

        {showPlan && (
          <Card className="bg-white p-4 mr-auto max-w-[95%]">
            <CardContent className="p-2">
              <div className="prose prose-sm max-w-none">
                {plan.split("\n").map((line, index) => {
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

              <Button onClick={addToPlan} className="mt-4 w-full bg-black hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" /> Add to My Plans
              </Button>
            </CardContent>
          </Card>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-black hover:bg-gray-800"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}

