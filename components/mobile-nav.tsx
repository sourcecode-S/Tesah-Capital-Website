"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    {
      title: "Investment solutions",
      items: [
        { title: "Investment Products Overview", href: "/investment-products" },
        { title: "Tesah Treasury Trust (TTT)", href: "/investment-products#ttt" },
        { title: "Tesah Future Fund (TFF)", href: "/investment-products#tff" },
        { title: "Investment Accounts", href: "/services/investment-accounts" },
      ],
    },
    {
      title: "Services",
      items: [
        { title: "Wealth Management", href: "/services/wealth-management" },
        { title: "Institutional Services", href: "/services/institutional-funds" },
        { title: "Investment Advisory", href: "/services" },
      ],
    },
    {
      title: "Insights",
      items: [
        { title: "Market Insights", href: "/news" },
        { title: "Fund Performance", href: "/investment-products" },
        { title: "Market Data", href: "/market-data" },
        { title: "Investment Tools", href: "/calculators" },
        { title: "Resources", href: "/resources" },
      ],
    },
    {
      title: "About Tesah",
      items: [
        { title: "Our Story", href: "/about" },
        { title: "Leadership Team", href: "/leadership" },
        { title: "Awards & Recognition", href: "/achievements" },
        { title: "Careers", href: "/join-tesah" },
        { title: "Legal Information", href: "/legal" },
      ],
    },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden p-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-semibold text-lg">Menu</span>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              {navigationItems.map((section, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left font-medium hover:bg-slate-50 rounded-lg">
                    {section.title}
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className="block p-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t space-y-3">
            <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
              <Link href="/client-portal" onClick={() => setIsOpen(false)}>
                Client Portal
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Get in touch
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
