"use client"

import { usePathname, useRouter } from "next/navigation"
import { MessageSquare, ClipboardList, CheckCircle2, User } from "lucide-react"

export default function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    {
      name: "Chats",
      href: "/chat",
      icon: MessageSquare,
      active: pathname === "/chat",
    },
    {
      name: "Plan",
      href: "/plans",
      icon: ClipboardList,
      active: pathname === "/plans" || pathname === "/plan",
    },
    {
      name: "Tracker",
      href: "/tracker",
      icon: CheckCircle2,
      active: pathname === "/tracker",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      active: pathname === "/profile",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Shadow overlay */}
      <div className="h-1 bg-gradient-to-t from-gray-200 to-transparent"></div>

      {/* Navigation bar */}
      <div className="bg-white border-t border-gray-200 px-2 py-1">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className="flex flex-col items-center justify-center py-2 px-3 relative transition-colors duration-200"
            >
              <item.icon className={`h-5 w-5 ${item.active ? "text-blue-600" : "text-gray-500"}`} />
              <span className={`text-xs mt-1 ${item.active ? "font-medium text-blue-600" : "text-gray-500"}`}>
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

