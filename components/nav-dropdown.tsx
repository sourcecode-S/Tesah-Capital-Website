"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavDropdownProps {
  trigger: string
  items: {
    title: string
    href: string
  }[]
  isScrolled?: boolean
}

export function NavDropdown({ trigger, items, isScrolled }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    // Set a timeout to close the dropdown after 500ms (half a second)
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 500)
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-medium text-secondary/80 hover:text-secondary transition-colors",
          isOpen && "text-secondary",
        )}
        aria-expanded={isOpen}
      >
        {trigger}
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden">
          <div className="py-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-2 text-sm text-secondary/80 hover:bg-secondary/10 hover:text-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
