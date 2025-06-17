"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-secondary hover:bg-transparent hover:text-secondary focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 sm:max-w-xs">
        <div className="px-7">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <span className="font-bold text-lg text-secondary">Tesah Capital</span>
          </Link>
        </div>
        <div className="flex flex-col gap-4 px-7 mt-8">
          <Link href="/" className="text-base font-medium text-secondary" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="about" className="border-b-0">
              <AccordionTrigger className="py-2 text-base font-medium text-secondary">About Us</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <Link href="/about" className="text-sm text-secondary/80" onClick={() => setOpen(false)}>
                    Company Overview
                  </Link>
                  <Link href="/about#values" className="text-sm text-secondary/80" onClick={() => setOpen(false)}>
                    Our Values
                  </Link>
                  <Link href="/about#team" className="text-sm text-secondary/80" onClick={() => setOpen(false)}>
                    Our Team
                  </Link>
                  <Link href="/achievements" className="text-sm text-secondary/80" onClick={() => setOpen(false)}>
                    Achievements
                  </Link>
                  <Link href="/leadership" className="text-sm text-secondary/80" onClick={() => setOpen(false)}>
                    Leadership
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="services" className="border-b-0">
              <AccordionTrigger className="py-2 text-base font-medium text-secondary">Services</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <Link
                    href="/services/investment-accounts"
                    className="text-sm text-secondary/80"
                    onClick={() => setOpen(false)}
                  >
                    Investment Accounts
                  </Link>
                  <Link
                    href="/services/wealth-management"
                    className="text-sm text-secondary/80"
                    onClick={() => setOpen(false)}
                  >
                    Wealth Management
                  </Link>
                  <Link
                    href="/services/institutional-funds"
                    className="text-sm text-secondary/80"
                    onClick={() => setOpen(false)}
                  >
                    Institutional Funds
                  </Link>
                  <Link href="/services" className="text-sm text-secondary/80" onClick={() => setOpen(false)}>
                    All Services
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="investment-products" className="border-b-0">
              <AccordionTrigger className="py-2 text-base font-medium text-secondary">
                Investment Products
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <Link
                    href="/investment-products#ttt"
                    className="text-sm text-secondary/80"
                    onClick={() => setOpen(false)}
                  >
                    Tesah Treasury Trust (TTT)
                  </Link>
                  <Link
                    href="/investment-products#tff"
                    className="text-sm text-secondary/80"
                    onClick={() => setOpen(false)}
                  >
                    Tesah Future Fund (TFF)
                  </Link>
                  <Link
                    href="/investment-products"
                    className="text-sm text-secondary/80"
                    onClick={() => setOpen(false)}
                  >
                    All Products
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resources" className="border-b-0">
              <AccordionTrigger className="py-2 text-base font-medium text-secondary">Resources</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <Link href="/resources#forms" className="text-sm text-secondary/80" onClick={() => setOpen(false)}>
                    Investment Forms
                  </Link>
                  <Link href="/resources#faq" className="text-sm text-secondary/80" onClick={() => setOpen(false)}>
                    FAQs
                  </Link>
                  <Link href="/market-data" className="text-sm text-secondary/80" onClick={() => setOpen(false)}>
                    Market Data
                  </Link>
                  <Link href="/news" className="text-sm text-secondary/80" onClick={() => setOpen(false)}>
                    News & Updates
                  </Link>
                  <Link href="/calculators" className="text-sm text-secondary/80" onClick={() => setOpen(false)}>
                    Financial Calculators
                  </Link>
                  <Link href="/legal" className="text-sm text-secondary/80" onClick={() => setOpen(false)}>
                    Legal
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link href="/contact" className="text-base font-medium text-secondary" onClick={() => setOpen(false)}>
            Contact
          </Link>

          <Link href="/join-tesah" className="text-base font-medium text-secondary" onClick={() => setOpen(false)}>
            Join Tesah
          </Link>

          <Button className="mt-4 bg-secondary hover:bg-secondary/90 text-white" asChild>
            <Link href="/client-portal" onClick={() => setOpen(false)}>
              Get Started
            </Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </SheetContent>
    </Sheet>
  )
}
