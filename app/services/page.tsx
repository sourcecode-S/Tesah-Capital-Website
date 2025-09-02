import Link from "next/link"
import { ArrowRight, Building, DollarSign, PieChart, Shield, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Services - Tesah Capital Limited",
  description: "Comprehensive investment and wealth management services tailored to meet your financial goals.",
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Comprehensive investment and wealth management services tailored to meet your unique financial goals and
                objectives.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Investment Accounts */}
              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Investment Accounts</CardTitle>
                  </div>
                  <CardDescription>Personalized investment solutions for individuals and families</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Open a personalized investment account and gain access to our professional fund management services
                    with competitive returns and transparent reporting.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Individual and joint accounts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Minimum investment from GH₵1,000</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Online account management</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/services/investment-accounts">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Wealth Management */}
              <Card className="border-secondary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-secondary/10">
                      <TrendingUp className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">Wealth Management</CardTitle>
                  </div>
                  <CardDescription>Comprehensive wealth planning and portfolio management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Our wealth management services provide holistic financial planning, investment advisory, and
                    portfolio optimization for high-net-worth individuals and families.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>Personalized investment strategies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>Risk assessment and management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>Regular portfolio reviews</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-secondary hover:bg-secondary/90" asChild>
                    <Link href="/services/wealth-management">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Institutional Funds */}
              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Institutional Funds</CardTitle>
                  </div>
                  <CardDescription>Tailored fund management for institutions and corporates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Specialized fund management services for institutions, corporates, churches, clubs, and associations
                    with customized investment policies and governance structures.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Provident fund management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Endowment funds</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Pension fund management</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/services/institutional-funds">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Investment Advisory */}
              <Card className="border-secondary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-secondary/10">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">Investment Advisory</CardTitle>
                  </div>
                  <CardDescription>Professional investment guidance and consultation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Expert investment advice and consultation services to help you make informed financial decisions and
                    optimize your investment portfolio performance.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>Investment strategy development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>Market analysis and insights</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>Portfolio optimization</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-secondary hover:bg-secondary/90" asChild>
                    <Link href="/contact">
                      Get Consultation <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Portfolio Management */}
              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <PieChart className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Portfolio Management</CardTitle>
                  </div>
                  <CardDescription>Active portfolio management and optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Professional portfolio management services with active monitoring, rebalancing, and optimization to
                    ensure your investments align with your financial goals.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Active portfolio monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Regular rebalancing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Performance reporting</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/contact">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Risk Management */}
              <Card className="border-secondary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-secondary/10">
                      <Shield className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">Risk Management</CardTitle>
                  </div>
                  <CardDescription>Comprehensive risk assessment and mitigation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Advanced risk management services to protect your investments and ensure optimal risk-adjusted
                    returns through diversification and strategic asset allocation.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>Risk profiling and assessment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>Diversification strategies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>Stress testing and scenario analysis</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-secondary hover:bg-secondary/90" asChild>
                    <Link href="/contact">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Why Choose Our Services?</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                We combine expertise, technology, and personalized service to deliver exceptional investment outcomes.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Regulatory Compliance</h3>
                <p className="text-muted-foreground text-sm">
                  Licensed by SEC and registered with NPRA, ensuring the highest standards of regulatory compliance.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Proven Performance</h3>
                <p className="text-muted-foreground text-sm">
                  Track record of delivering superior returns with an average annual return of 18.7% across our funds.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Expert Team</h3>
                <p className="text-muted-foreground text-sm">
                  Experienced investment professionals with deep knowledge of African markets and global best practices.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PieChart className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Diversified Approach</h3>
                <p className="text-muted-foreground text-sm">
                  Comprehensive range of investment products and services to meet diverse client needs and objectives.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Get Started?</h2>
              <p className="text-primary-foreground/80 md:text-xl">
                Contact us today to learn how our services can help you achieve your financial goals and build lasting
                wealth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90" asChild>
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
