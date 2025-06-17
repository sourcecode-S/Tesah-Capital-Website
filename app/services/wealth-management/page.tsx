import Link from "next/link"
import { ArrowRight, Check, ChevronRight, Crown, Diamond, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Wealth Management - Tesah Capital Limited",
  description: "Grow and protect your wealth with our personalized wealth management services.",
}

export default function WealthManagementPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Wealth Management</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Grow and protect your wealth with our personalized wealth management services.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Our Wealth Management Tiers</h2>
              <p className="mt-4 text-muted-foreground">
                We help you grow and protect your wealth over time through a well-defined investment strategy that suits
                specific individual financial objectives.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Prestige Tier */}
              <Card className="border-secondary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-secondary/10">
                      <Shield className="h-5 w-5 text-secondary" />
                    </div>
                    <CardTitle>Prestige Tier</CardTitle>
                  </div>
                  <CardDescription>Personalized investment guidance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Get personalized investment guidance that is tailored to meet your financial needs. Our Prestige
                    Tier is designed for individuals who are beginning their wealth building journey.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Personalized investment strategy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Regular portfolio reviews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Access to investment advisors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Quarterly performance reports</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-secondary hover:bg-secondary/90" asChild>
                    <Link href="/contact">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Gold Tier */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Crown className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Gold Tier</CardTitle>
                  </div>
                  <CardDescription>Unique investment strategies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We define and implement unique investment strategies based on your preferences and risk appetite.
                    Our Gold Tier is perfect for established investors looking to optimize their portfolio.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Advanced portfolio diversification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Dedicated wealth manager</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Monthly performance reviews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Access to exclusive investment opportunities</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/contact">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Platinum Tier */}
              <Card className="border-secondary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-secondary/10">
                      <Diamond className="h-5 w-5 text-secondary" />
                    </div>
                    <CardTitle>Platinum Tier</CardTitle>
                  </div>
                  <CardDescription>In-depth lifestyle goal support</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We offer you in-depth support to help you manage your money and meet your lifestyle goal. Our
                    Platinum Tier provides comprehensive wealth management for high-net-worth individuals.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Holistic wealth planning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Priority access to senior advisors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Customized investment solutions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Estate and succession planning</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-secondary hover:bg-secondary/90" asChild>
                    <Link href="/contact">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Wealth Management Approach</h2>
                <p className="text-muted-foreground md:text-lg mb-6">
                  At Tesah Capital, we take a comprehensive approach to wealth management, focusing on your unique
                  financial goals and circumstances.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Discovery</h3>
                      <p className="text-muted-foreground">
                        We begin by understanding your financial situation, goals, and risk tolerance through in-depth
                        consultations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Strategy Development</h3>
                      <p className="text-muted-foreground">
                        Our team creates a personalized wealth management strategy tailored to your specific needs and
                        objectives.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Implementation</h3>
                      <p className="text-muted-foreground">
                        We execute your strategy with precision, allocating assets according to your investment plan.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">Monitoring & Adjustment</h3>
                      <p className="text-muted-foreground">
                        We continuously monitor your portfolio and make adjustments as needed to ensure alignment with
                        your goals.
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="mt-8 bg-secondary hover:bg-secondary/90" asChild>
                  <Link href="/contact">
                    Schedule a Consultation <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-3xl transform -rotate-3"></div>
                <div className="bg-background rounded-xl border shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Why Choose Our Wealth Management Services</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-secondary/10 p-1 mt-1">
                        <Check className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Experienced Team</h4>
                        <p className="text-muted-foreground">
                          Our wealth managers have extensive experience in investment management and financial planning.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-secondary/10 p-1 mt-1">
                        <Check className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Personalized Approach</h4>
                        <p className="text-muted-foreground">
                          We create customized strategies based on your unique financial situation and goals.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-secondary/10 p-1 mt-1">
                        <Check className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Comprehensive Services</h4>
                        <p className="text-muted-foreground">
                          From investment management to retirement planning, we offer a full range of wealth management
                          services.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-secondary/10 p-1 mt-1">
                        <Check className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Transparent Communication</h4>
                        <p className="text-muted-foreground">
                          We provide regular updates and clear explanations of your portfolio performance and strategy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Grow Your Wealth?</h2>
              <p className="text-secondary-foreground/80 md:text-xl">
                Contact us today to learn how our wealth management services can help you achieve your financial goals.
              </p>
              <Button size="lg" className="mt-4 bg-primary hover:bg-primary/90" asChild>
                <Link href="/contact">Contact Us Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
