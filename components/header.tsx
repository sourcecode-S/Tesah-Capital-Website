"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { NavDropdown } from "@/components/nav-dropdown"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white text-secondary transition-all duration-300",
        isScrolled ? "h-14" : "h-16",
      )}
    >
      <div
        className={cn(
          "container flex items-center justify-between h-full transition-all duration-300",
          isScrolled ? "px-4" : "px-4 md:px-6",
        )}
      >
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 font-bold text-secondary transition-all duration-300",
              isScrolled ? "text-lg" : "text-xl",
            )}
          >
            <div className={cn("relative h-8", isScrolled ? "w-24" : "w-28")}>
              <Image
                src="/images/tesah-capital-full-logo.png"
                alt="Tesah Capital Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-sm font-medium text-secondary/80 hover:text-secondary">
            Home
          </Link>

          <NavDropdown
            trigger="About Us"
            items={[
              { title: "Company Overview", href: "/about" },
              { title: "Our Values", href: "/about#values" },
              { title: "Our Team", href: "/about#team" },
              { title: "Achievements", href: "/achievements" },
              {
                title: "Leadership",
                href: "/leadership",
                description: "Meet our experienced leadership team",
              },
            ]}
            isScrolled={isScrolled}
          />

          <NavDropdown
            trigger="Services"
            items={[
              { title: "Investment Accounts", href: "/services/investment-accounts" },
              { title: "Wealth Management", href: "/services/wealth-management" },
              { title: "Institutional Funds", href: "/services/institutional-funds" },
              { title: "All Services", href: "/services" },
            ]}
            isScrolled={isScrolled}
          />

          <NavDropdown
            trigger="Investment Products"
            items={[
              { title: "Tesah Treasury Trust (TTT)", href: "/investment-products#ttt" },
              { title: "Tesah Future Fund (TFF)", href: "/investment-products#tff" },
              { title: "All Products", href: "/investment-products" },
            ]}
            isScrolled={isScrolled}
          />

          <NavDropdown
            trigger="Resources"
            items={[
              { title: "Investment Forms", href: "/resources#forms" },
              { title: "FAQs", href: "/resources#faq" },
              { title: "Market Data", href: "/market-data" },
              { title: "News & Updates", href: "/news" },
              { title: "Financial Calculators", href: "/calculators" },
              { title: "Legal", href: "/legal" },
            ]}
            isScrolled={isScrolled}
          />

          <Link href="/contact" className="text-sm font-medium text-secondary/80 hover:text-secondary">
            Contact
          </Link>
          <Link href="/join-tesah" className="text-sm font-medium text-secondary/80 hover:text-secondary">
            Join Tesah
          </Link>
        </nav>
        <Button
          className={cn(
            "bg-secondary hover:bg-secondary/90 text-white transition-all duration-300",
            isScrolled ? "h-8 text-sm" : "",
          )}
          asChild
        >
          <Link href="/client-portal">Get Started</Link>
        </Button>
      </div>
    </header>
  )
}
