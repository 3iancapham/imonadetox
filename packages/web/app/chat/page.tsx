"use client"

import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Send, RefreshCw, Plus } from "lucide-react"
import MobileNav from "@/components/mobile-nav"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, reload, stop } = useChat()
  const { toast } = useToast()
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-[#ECFCE5]">
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center">
          <Image
            src="/detox-logo.png"
            alt="Detox Logo"
            width={120}
            height={40}
            className="object-contain"
            priority
          />
        </div>
        <Button variant="ghost" size="icon" onClick={() => router.push('/chat')}>
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className={`p-3 ${message.role === 'assistant' ? 'bg-white' : 'bg-[#F7FDF5]'}`}>
              <p className="font-semibold mb-1">{message.role === 'assistant' ? 'Detox AI' : 'You'}</p>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          disabled={isLoading}
          className="bg-[#F7FDF5]"
        />
        <Button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-[#86EFAC] hover:bg-[#4ADE80] text-black"
        >
          {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
      
      <MobileNav />
    </div>
  )
}

