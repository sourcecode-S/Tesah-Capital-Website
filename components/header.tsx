"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { NavDropdown } from "@/components/nav-dropdown"
import { cn } from "@/lib/utils"
import { Globe, Search, User } from "lucide-react"

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
        "sticky top-0 z-50 w-full bg-white border-b border-slate-200 transition-all duration-300",
        isScrolled ? "shadow-sm" : "",
      )}
    >
      {/* Top utility bar */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 text-slate-600">
                <Globe className="h-3 w-3" />
                <span>Ghana</span>
              </div>
              <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
                Contact us
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-slate-600 hover:text-slate-900 transition-colors">
                <Search className="h-4 w-4" />
              </button>
              <Link
                href="/client-portal"
                className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <User className="h-3 w-3" />
                <span>Client Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative h-8 w-36">
              <Image
                src="/images/tesah-capital-full-logo.png"
                alt="Tesah Capital"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Main Navigation - GAM Style */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center">
              <NavDropdown
                trigger="Investment solutions"
                items={[
                  {
                    title: "Investment Products Overview",
                    href: "/investment-products",
                    description: "Explore our comprehensive range of investment solutions",
                  },
                  {
                    title: "Tesah Treasury Trust (TTT)",
                    href: "/investment-products#ttt",
                    description: "Money market fund for capital preservation",
                  },
                  {
                    title: "Tesah Future Fund (TFF)",
                    href: "/investment-products#tff",
                    description: "Equity fund for long-term growth",
                  },
                  {
                    title: "Investment Accounts",
                    href: "/services/investment-accounts",
                    description: "Personalized investment account services",
                  },
                ]}
                isScrolled={isScrolled}
              />

              <NavDropdown
                trigger="Services"
                items={[
                  {
                    title: "Wealth Management",
                    href: "/services/wealth-management",
                    description: "Comprehensive wealth management solutions",
                  },
                  {
                    title: "Institutional Services",
                    href: "/services/institutional-funds",
                    description: "Tailored solutions for institutions",
                  },
                  {
                    title: "Investment Advisory",
                    href: "/services",
                    description: "Professional investment guidance",
                  },
                ]}
                isScrolled={isScrolled}
              />

              <NavDropdown
                trigger="Insights"
                items={[
                  {
                    title: "Market Insights",
                    href: "/news",
                    description: "Latest market analysis and commentary",
                  },
                  {
                    title: "Fund Performance",
                    href: "/investment-products",
                    description: "Track our fund performance and returns",
                  },
                  {
                    title: "Market Data",
                    href: "/market-data",
                    description: "Real-time market data and analytics",
                  },
                  {
                    title: "Investment Tools",
                    href: "/calculators",
                    description: "Financial calculators and planning tools",
                  },
                  {
                    title: "Resources",
                    href: "/resources",
                    description: "Investment forms, FAQs, and guides",
                  },
                ]}
                isScrolled={isScrolled}
              />

              <NavDropdown
                trigger="About Tesah"
                items={[
                  {
                    title: "Our Story",
                    href: "/about",
                    description: "Learn about Tesah Capital's journey since 2010",
                  },
                  {
                    title: "Leadership Team",
                    href: "/leadership",
                    description: "Meet our experienced leadership team",
                  },
                  {
                    title: "Awards & Recognition",
                    href: "/achievements",
                    description: "Our achievements and industry recognition",
                  },
                  {
                    title: "Careers",
                    href: "/join-tesah",
                    description: "Join our growing team",
                  },
                  {
                    title: "Legal Information",
                    href: "/legal",
                    description: "Terms, privacy policy, and disclaimers",
                  },
                ]}
                isScrolled={isScrolled}
              />
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden md:inline-flex border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
            >
              <Link href="/contact">Get in touch</Link>
            </Button>

            <Button asChild size="sm" className="hidden md:inline-flex bg-slate-900 hover:bg-slate-800 text-white">
              <Link href="/client-portal">Get started</Link>
            </Button>

            {/* Mobile Menu */}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
