import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, PieChart, Shield, TrendingUp, Target, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Investment Solutions - Tesah Capital Limited",
  description:
    "Discover our comprehensive range of investment products designed to meet diverse financial goals and risk profiles.",
}

export default function InvestmentProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="absolute inset-0 bg-[url('/images/tesah-office-building.jpeg')] bg-cover bg-center opacity-10"></div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Investment Solutions
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Professional Investment
                <span className="text-primary"> Solutions</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                Choose from our carefully crafted investment products designed to meet your unique financial objectives
                and risk tolerance.
              </p>
              <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-slate-700 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2</div>
                  <div className="text-slate-400">Core Funds</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">18.7%</div>
                  <div className="text-slate-400">Avg. Annual Return</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">GH₵1K</div>
                  <div className="text-slate-400">Min. Investment</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fund Overview Cards */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Tesah Treasury Trust */}
              <Card
                className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
                id="ttt"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src="/images/tesah-treasury-trust-banner.jpeg"
                    alt="Tesah Treasury Trust"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Conservative
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        Money Market Fund
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Tesah Treasury Trust (TTT)</h2>
                    <p className="text-slate-200 text-lg">
                      Capital preservation with steady income through high-quality money market instruments
                    </p>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">12.8%</div>
                        <div className="text-sm text-slate-600">YTD Return</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">GH₵1,000</div>
                        <div className="text-sm text-slate-600">Min. Investment</div>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span className="text-slate-700">Low risk, capital preservation focused</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-green-600" />
                        <span className="text-slate-700">Daily liquidity and valuation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-green-600" />
                        <span className="text-slate-700">Ideal for 3+ month investment horizon</span>
                      </div>
                    </div>

                    <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-lg py-6">
                      <Link href="/investment-products#ttt-details">
                        Explore TTT Fund <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tesah Future Fund */}
              <Card
                className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
                id="tff"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src="/images/tesah-future-fund-banner.jpeg"
                    alt="Tesah Future Fund"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Growth-Oriented
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">Equity Fund</div>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Tesah Future Fund (TFF)</h2>
                    <p className="text-slate-200 text-lg">
                      Long-term capital growth through strategic African equity investments
                    </p>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">21.7%</div>
                        <div className="text-sm text-slate-600">YTD Return</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">GH₵5,000</div>
                        <div className="text-sm text-slate-600">Min. Investment</div>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                        <span className="text-slate-700">High growth potential across Africa</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <PieChart className="h-5 w-5 text-orange-600" />
                        <span className="text-slate-700">Diversified sector exposure</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-orange-600" />
                        <span className="text-slate-700">Best for 5+ year investment goals</span>
                      </div>
                    </div>

                    <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-lg py-6">
                      <Link href="/investment-products#tff-details">
                        Explore TFF Fund <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Fund Information */}
        <section className="py-20 bg-white" id="ttt-details">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Fund Details & Performance</h2>
                <p className="text-xl text-slate-600">Comprehensive information about our investment products</p>
              </div>

              <Tabs defaultValue="ttt" className="space-y-8">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12">
                  <TabsTrigger value="ttt" className="text-sm font-medium">
                    Treasury Trust (TTT)
                  </TabsTrigger>
                  <TabsTrigger value="tff" className="text-sm font-medium">
                    Future Fund (TFF)
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="ttt" className="space-y-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Fund Details */}
                    <Card className="lg:col-span-1">
                      <CardHeader>
                        <CardTitle>Fund Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Fund Type</span>
                          <span>Money Market</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Risk Level</span>
                          <span className="text-green-600 font-semibold">Conservative</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Management Fee</span>
                          <span>1.5% p.a.</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Benchmark</span>
                          <span>91-Day Treasury Bill</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Inception Date</span>
                          <span>January 2012</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance Chart */}
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Historical Performance</CardTitle>
                        <CardDescription>Performance comparison vs benchmark</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <div className="text-lg font-bold text-slate-900">12.8%</div>
                            <div className="text-sm text-slate-600">1 Year Return</div>
                          </div>
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <div className="text-lg font-bold text-slate-900">38.5%</div>
                            <div className="text-sm text-slate-600">3 Year Return</div>
                          </div>
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <div className="text-lg font-bold text-slate-900">67.2%</div>
                            <div className="text-sm text-slate-600">5 Year Return</div>
                          </div>
                        </div>

                        {/* Asset Allocation */}
                        <div>
                          <h4 className="font-semibold mb-4">Asset Allocation</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                <span className="text-sm">Treasury Bills</span>
                              </div>
                              <span className="text-sm font-medium">45%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <span className="text-sm">Bank Deposits</span>
                              </div>
                              <span className="text-sm font-medium">30%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                                <span className="text-sm">Commercial Paper</span>
                              </div>
                              <span className="text-sm font-medium">15%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                <span className="text-sm">Corporate Bonds</span>
                              </div>
                              <span className="text-sm font-medium">10%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="tff" className="space-y-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Fund Details */}
                    <Card className="lg:col-span-1">
                      <CardHeader>
                        <CardTitle>Fund Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Fund Type</span>
                          <span>Equity Fund</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Risk Level</span>
                          <span className="text-orange-600 font-semibold">Growth</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Management Fee</span>
                          <span>2.5% p.a.</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium">Benchmark</span>
                          <span>GSE Composite Index</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Inception Date</span>
                          <span>March 2015</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance Chart */}
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Historical Performance</CardTitle>
                        <CardDescription>Long-term growth performance</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <div className="text-lg font-bold text-slate-900">19.4%</div>
                            <div className="text-sm text-slate-600">1 Year Return</div>
                          </div>
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <div className="text-lg font-bold text-slate-900">62.8%</div>
                            <div className="text-sm text-slate-600">3 Year Return</div>
                          </div>
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <div className="text-lg font-bold text-slate-900">103.5%</div>
                            <div className="text-sm text-slate-600">5 Year Return</div>
                          </div>
                        </div>

                        {/* Sector Allocation */}
                        <div>
                          <h4 className="font-semibold mb-4">Sector Allocation</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                                <span className="text-sm">Financial Services</span>
                              </div>
                              <span className="text-sm font-medium">35%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-600"></div>
                                <span className="text-sm">Telecommunications</span>
                              </div>
                              <span className="text-sm font-medium">25%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                                <span className="text-sm">Consumer Goods</span>
                              </div>
                              <span className="text-sm font-medium">15%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-orange-600"></div>
                                <span className="text-sm">Energy & Utilities</span>
                              </div>
                              <span className="text-sm font-medium">10%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-gray-600"></div>
                                <span className="text-sm">Others</span>
                              </div>
                              <span className="text-sm font-medium">15%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* How to Invest */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">How to Start Investing</h2>
              <p className="text-xl text-slate-600">
                Three simple steps to begin your investment journey with Tesah Capital
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Open Your Account</h3>
                  <p className="text-slate-600 mb-6">
                    Complete our simple online application or visit our office to get started with your investment
                    account.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/client-portal">Start Application</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Choose Your Fund</h3>
                  <p className="text-slate-600 mb-6">
                    Select from our investment products based on your goals, risk tolerance, and investment timeline.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Get Advice</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Start Investing</h3>
                  <p className="text-slate-600 mb-6">
                    Fund your account and begin building wealth with professional investment management.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/calculators">Calculate Returns</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl font-bold">Ready to Start Investing?</h2>
              <p className="text-xl text-slate-300">
                Join thousands of investors who trust Tesah Capital to grow their wealth across Africa's dynamic
                markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg">
                  <Link href="/client-portal">
                    Open an Account <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                >
                  <Link href="/contact">Speak to an Advisor</Link>
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
