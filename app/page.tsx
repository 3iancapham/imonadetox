"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function SplashScreen() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleGetStarted = () => {
    router.push("/preview")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E6F5EE] p-4">
      <div className="w-full max-w-md flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative w-[320px] h-[180px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Text%20%26%20White%20Logo-y3ZBwXFrVK4fHBRHpsg7NUA0rrJHKi.png"
              alt="DETOX Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <p className="text-center text-gray-700 mt-2 mb-16 font-light tracking-widest uppercase text-sm">
            Your self healing journey
            <br />
            starts here
          </p>
        </div>

        {loading ? (
          <Button disabled className="w-full py-6 bg-black hover:bg-gray-800">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </Button>
        ) : (
          <Button onClick={handleGetStarted} className="w-full py-6 bg-black hover:bg-gray-800">
            Get Started
          </Button>
        )}
      </div>
    </div>
  )
}

