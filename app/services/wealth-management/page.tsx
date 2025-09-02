import Link from "next/link"
import { ArrowRight, Check, DollarSign, PieChart, Shield, TrendingUp, Users, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Wealth Management - Tesah Capital Limited",
  description: "Comprehensive wealth management services for high-net-worth individuals and families.",
}

export default function WealthManagementPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Wealth Management
              </h1>
              <p className="mt-4 text-white/80 md:text-xl">
                Comprehensive wealth planning and portfolio management services for high-net-worth individuals and
                families.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl mb-12">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-4">Holistic Wealth Solutions</h2>
              <p className="text-muted-foreground">
                Our wealth management services go beyond traditional investment management to provide comprehensive
                financial planning, risk management, and wealth preservation strategies tailored to your unique
                circumstances and long-term objectives.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Investment Planning */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Investment Planning</CardTitle>
                  </div>
                  <CardDescription>Strategic investment planning aligned with your goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We develop personalized investment strategies that align with your financial goals, risk tolerance,
                    and time horizon, ensuring optimal asset allocation across our range of investment products.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Customized asset allocation strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Regular portfolio rebalancing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Performance monitoring and reporting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Tax-efficient investment strategies</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Management */}
              <Card className="border-secondary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-secondary/10">
                      <Shield className="h-5 w-5 text-secondary" />
                    </div>
                    <CardTitle>Risk Management</CardTitle>
                  </div>
                  <CardDescription>Comprehensive risk assessment and mitigation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Our risk management approach ensures your wealth is protected through diversification, hedging
                    strategies, and continuous monitoring of market conditions and portfolio performance.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Comprehensive risk profiling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Diversification across asset classes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Stress testing and scenario analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Insurance and protection planning</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Planning */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Financial Planning</CardTitle>
                  </div>
                  <CardDescription>Comprehensive financial planning and goal setting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We work with you to develop comprehensive financial plans that address your short-term and long-term
                    goals, including retirement planning, education funding, and wealth transfer strategies.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Retirement planning and analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Education funding strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Estate planning coordination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1" />
                        <span>Cash flow management</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Management */}
              <Card className="border-secondary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-secondary/10">
                      <PieChart className="h-5 w-5 text-secondary" />
                    </div>
                    <CardTitle>Portfolio Management</CardTitle>
                  </div>
                  <CardDescription>Active portfolio management and optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Our experienced portfolio managers actively monitor and optimize your investments, making tactical
                    adjustments to capitalize on market opportunities while maintaining your strategic asset allocation.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Active portfolio monitoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Tactical asset allocation adjustments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Performance attribution analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary mt-1" />
                        <span>Regular portfolio reviews</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Wealth Management Process</h2>
                <p className="text-muted-foreground md:text-lg mb-6">
                  We follow a structured approach to wealth management, ensuring that every aspect of your financial
                  life is carefully considered and optimized.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Discovery & Assessment</h3>
                      <p className="text-muted-foreground">
                        We begin by understanding your financial situation, goals, risk tolerance, and investment
                        preferences through comprehensive discovery sessions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Strategy Development</h3>
                      <p className="text-muted-foreground">
                        Based on our assessment, we develop a customized wealth management strategy that aligns with
                        your objectives and constraints.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Implementation</h3>
                      <p className="text-muted-foreground">
                        We implement your wealth management strategy through careful selection of investment products
                        and ongoing portfolio management.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">Monitoring & Review</h3>
                      <p className="text-muted-foreground">
                        We continuously monitor your portfolio performance and conduct regular reviews to ensure your
                        strategy remains on track.
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="mt-8 bg-primary hover:bg-primary/90" asChild>
                  <Link href="/contact">
                    Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl transform rotate-3"></div>
                <div className="bg-background rounded-xl border shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Wealth Management Benefits</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Personalized Service</h4>
                        <p className="text-muted-foreground">
                          Dedicated relationship manager and customized investment strategies tailored to your needs.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Comprehensive Approach</h4>
                        <p className="text-muted-foreground">
                          Holistic wealth management covering all aspects of your financial life and goals.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Professional Expertise</h4>
                        <p className="text-muted-foreground">
                          Access to experienced investment professionals and market insights.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Transparent Reporting</h4>
                        <p className="text-muted-foreground">
                          Regular, detailed reports on portfolio performance and progress toward your goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Who We Serve</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Our wealth management services are designed for individuals and families with substantial assets who
                require sophisticated financial planning and investment management.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center border-primary/20">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">High-Net-Worth Individuals</h3>
                  <p className="text-muted-foreground">
                    Successful professionals, entrepreneurs, and business owners seeking comprehensive wealth management
                    solutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-secondary/20">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Affluent Families</h3>
                  <p className="text-muted-foreground">
                    Multi-generational families requiring coordinated wealth planning, estate planning, and investment
                    management services.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Pre-Retirees & Retirees</h3>
                  <p className="text-muted-foreground">
                    Individuals approaching or in retirement who need specialized strategies for wealth preservation and
                    income generation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Optimize Your Wealth Strategy?
              </h2>
              <p className="text-secondary-foreground/80 md:text-xl">
                Contact us today to learn how our comprehensive wealth management services can help you achieve your
                financial goals and preserve your wealth for future generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/client-portal">Open Account</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
