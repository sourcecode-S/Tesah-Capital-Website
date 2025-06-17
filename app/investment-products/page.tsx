import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  Clock,
  DollarSign,
  LineChart,
  PieChart,
  Shield,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Investment Products - Tesah Capital Limited",
  description:
    "Explore our range of investment products designed to meet different investment objectives and risk profiles.",
}

export default function InvestmentProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Investment Products</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Explore our range of investment products designed to meet different investment objectives and risk
                profiles.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:gap-16">
              {/* Tesah Treasury Trust (TTT) */}
              <div className="grid gap-8 lg:grid-cols-2 items-start" id="ttt">
                <div className="space-y-6">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-primary text-sm">
                    Money Market Fund
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter">Tesah Treasury Trust (TTT)</h2>

                  {/* TTT Banner Image */}
                  <div className="w-full overflow-hidden rounded-lg">
                    <Image
                      src="/images/tesah-treasury-trust-banner.jpeg"
                      alt="Tesah Treasury Trust - Looking for a risk-free collective investment scheme?"
                      width={1140}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>

                  <p className="text-muted-foreground md:text-lg">
                    The Tesah Treasury Trust is a money market fund designed to provide investors with income, capital
                    preservation, and liquidity through investments in high-quality, short-term money market
                    instruments.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Low Risk Profile</h3>
                        <p className="text-sm text-muted-foreground">
                          Designed for conservative investors seeking capital preservation and steady income.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Short-Term Investment</h3>
                        <p className="text-sm text-muted-foreground">
                          Ideal for investors with a short time horizon of 3+ months.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Low Minimum Investment</h3>
                        <p className="text-sm text-muted-foreground">
                          Start with as little as GH₵1,000 and add contributions as desired.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <LineChart className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Competitive Returns</h3>
                        <p className="text-sm text-muted-foreground">
                          Consistently outperforms traditional savings accounts and fixed deposits.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-primary mt-1" />
                        <span>Professional management by experienced fund managers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-primary mt-1" />
                        <span>Daily valuation and liquidity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-primary mt-1" />
                        <span>Diversified portfolio of high-quality money market instruments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-primary mt-1" />
                        <span>Transparent fee structure with no hidden charges</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-primary mt-1" />
                        <span>Regular income distributions or reinvestment options</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                      <Link href="/client-portal">
                        Invest Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/contact">Speak to an Advisor</Link>
                    </Button>
                  </div>
                </div>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fund Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Fund Type</span>
                        <span>Money Market Fund</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Risk Level</span>
                        <span className="text-green-600">Low</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Minimum Investment</span>
                        <span>GH₵1,000</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Management Fee</span>
                        <span>1.5% p.a.</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Recommended Holding Period</span>
                        <span>3+ months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Inception Date</span>
                        <span>January 2012</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Historical Performance</CardTitle>
                      <CardDescription>Past performance is not a guarantee of future results</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>1 Year</span>
                          <span className="font-medium text-green-600">+12.8%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: "62%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>3 Years</span>
                          <span className="font-medium text-green-600">+38.5%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>5 Years</span>
                          <span className="font-medium text-green-600">+67.2%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div className="pt-4">
                        <Tabs defaultValue="allocation">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
                            <TabsTrigger value="holdings">Top Holdings</TabsTrigger>
                          </TabsList>
                          <TabsContent value="allocation" className="space-y-4 pt-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-primary"></div>
                                <span>Treasury Bills</span>
                              </div>
                              <span>45%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-secondary"></div>
                                <span>Bank Deposits</span>
                              </div>
                              <span>30%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <span>Commercial Paper</span>
                              </div>
                              <span>15%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                <span>Corporate Bonds</span>
                              </div>
                              <span>10%</span>
                            </div>
                          </TabsContent>
                          <TabsContent value="holdings" className="space-y-4 pt-4">
                            <div className="flex items-center justify-between">
                              <span>Ghana 91-Day T-Bill</span>
                              <span>20%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Ghana 182-Day T-Bill</span>
                              <span>15%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Bank of Ghana Notes</span>
                              <span>12%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Fixed Deposits (Various Banks)</span>
                              <span>10%</span>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="border-t border-border pt-12"></div>

              {/* Tesah Future Fund (TFF) */}
              <div className="grid gap-8 lg:grid-cols-2 items-start" id="tff">
                <div className="space-y-6">
                  <div className="inline-block rounded-lg bg-secondary/10 px-3 py-1 text-secondary text-sm">
                    Equity Fund
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter">Tesah Future Fund (TFF)</h2>

                  {/* TFF Banner Image */}
                  <div className="w-full overflow-hidden rounded-lg">
                    <Image
                      src="/images/tesah-future-fund-banner.jpeg"
                      alt="Tesah Future Fund - Let Tesah help you invest in a brighter future today"
                      width={1140}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>

                  <p className="text-muted-foreground md:text-lg">
                    The Tesah Future Fund is an equity-focused fund that aims to achieve long-term capital growth
                    through investments in stocks and other equity securities across African markets, with a focus on
                    high-growth sectors.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-5 w-5 text-secondary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Growth-Oriented</h3>
                        <p className="text-sm text-muted-foreground">
                          Focused on capital appreciation and long-term wealth creation.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-secondary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Long-Term Investment</h3>
                        <p className="text-sm text-muted-foreground">
                          Designed for investors with a time horizon of 5+ years.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <PieChart className="h-5 w-5 text-secondary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Diversified Portfolio</h3>
                        <p className="text-sm text-muted-foreground">
                          Exposure to various sectors and markets across Africa.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <BarChart3 className="h-5 w-5 text-secondary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Higher Return Potential</h3>
                        <p className="text-sm text-muted-foreground">
                          Opportunity for significant returns over the long term.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-secondary mt-1" />
                        <span>Active management by experienced equity specialists</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-secondary mt-1" />
                        <span>Focus on companies with strong fundamentals and growth potential</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-secondary mt-1" />
                        <span>Exposure to emerging sectors like fintech, renewable energy, and healthcare</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-secondary mt-1" />
                        <span>Regular portfolio rebalancing to optimize performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-secondary mt-1" />
                        <span>Opportunity to participate in Africa's economic growth story</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90" asChild>
                      <Link href="/client-portal">
                        Invest Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/contact">Speak to an Advisor</Link>
                    </Button>
                  </div>
                </div>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fund Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Fund Type</span>
                        <span>Equity Fund</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Risk Level</span>
                        <span className="text-amber-600">Medium-High</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Minimum Investment</span>
                        <span>GH₵5,000</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Management Fee</span>
                        <span>2.5% p.a.</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Recommended Holding Period</span>
                        <span>5+ years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Inception Date</span>
                        <span>March 2015</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Historical Performance</CardTitle>
                      <CardDescription>Past performance is not a guarantee of future results</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>1 Year</span>
                          <span className="font-medium text-green-600">+19.4%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-secondary h-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>3 Years</span>
                          <span className="font-medium text-green-600">+62.8%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-secondary h-full" style={{ width: "82%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>5 Years</span>
                          <span className="font-medium text-green-600">+103.5%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="bg-secondary h-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                      <div className="pt-4">
                        <Tabs defaultValue="allocation">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="allocation">Sector Allocation</TabsTrigger>
                            <TabsTrigger value="holdings">Top Holdings</TabsTrigger>
                          </TabsList>
                          <TabsContent value="allocation" className="space-y-4 pt-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-secondary"></div>
                                <span>Financial Services</span>
                              </div>
                              <span>35%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-primary"></div>
                                <span>Telecommunications</span>
                              </div>
                              <span>25%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <span>Consumer Goods</span>
                              </div>
                              <span>15%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                <span>Energy & Utilities</span>
                              </div>
                              <span>10%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                <span>Others</span>
                              </div>
                              <span>15%</span>
                            </div>
                          </TabsContent>
                          <TabsContent value="holdings" className="space-y-4 pt-4">
                            <div className="flex items-center justify-between">
                              <span>MTN Ghana</span>
                              <span>12%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>GCB Bank</span>
                              <span>10%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Ecobank Ghana</span>
                              <span>8%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Guinness Ghana</span>
                              <span>7%</span>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter">How to Invest</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Getting started with Tesah Capital's investment products is simple and straightforward.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Open an Account</h3>
                <p className="text-muted-foreground">
                  Register for an account through our client portal or visit our office to complete the account opening
                  process.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Choose Your Investment</h3>
                <p className="text-muted-foreground">
                  Select the investment product that aligns with your financial goals, risk tolerance, and time horizon.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Fund Your Account</h3>
                <p className="text-muted-foreground">
                  Make your initial investment through bank transfer, mobile money, or other available payment methods.
                </p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/client-portal">
                  Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Need Investment Advice?</h2>
              <p className="text-secondary-foreground/80 md:text-xl">
                Our team of expert advisors is available to help you choose the right investment products for your
                financial goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/contact">Contact an Advisor</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/calculators">Use Our Calculators</Link>
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
