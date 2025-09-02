"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  description?: string
}

interface NavDropdownProps {
  trigger: string
  items: NavItem[]
  isScrolled?: boolean
}

export function NavDropdown({ trigger, items, isScrolled = false }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button
        className={cn(
          "flex items-center gap-1 px-6 py-4 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors relative",
          "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-200",
          isOpen && "text-slate-900 after:scale-x-100",
        )}
        aria-expanded={isOpen}
      >
        {trigger}
        <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <div
        className={cn(
          "absolute top-full left-0 mt-0 w-96 bg-white shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 origin-top",
          isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible",
        )}
      >
        <div className="py-4">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-6 py-3 hover:bg-slate-50 transition-colors group/item border-l-2 border-transparent hover:border-l-primary"
            >
              <div className="font-medium text-slate-900 group-hover/item:text-primary mb-1">{item.title}</div>
              {item.description && <div className="text-sm text-slate-600 leading-relaxed">{item.description}</div>}
            </Link>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-primary to-secondary"></div>
      </div>
    </div>
  )
}
