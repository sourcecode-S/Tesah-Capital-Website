"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, TrendingUp, Users, Shield, Globe, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section - GAM inspired */}
        <section className="relative min-h-[80vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/tesah-office-building.jpeg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70"></div>

          <div className="relative container mx-auto px-4 h-full flex items-center min-h-[80vh]">
            <div className="max-w-3xl space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                  <Globe className="w-4 h-4 mr-2" />
                  Your Investment Gateway to Africa
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Invest in
                  <span className="text-primary"> Africa's</span>
                  <br />
                  Future
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                  Professional fund management services delivering exceptional returns across African markets since
                  2010.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                  <Link href="/investment-products" className="flex items-center">
                    Explore Our Funds <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg bg-transparent"
                >
                  <Link href="/contact" className="flex items-center">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Our Story
                  </Link>
                </Button>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-700">
                <div>
                  <div className="text-3xl font-bold text-primary">$1B+</div>
                  <div className="text-slate-400">Assets Under Management</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">14+</div>
                  <div className="text-slate-400">Years of Excellence</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">5,200+</div>
                  <div className="text-slate-400">Satisfied Clients</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Solutions Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                Investment Solutions
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Tailored Investment Strategies</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our comprehensive range of investment products and services are designed to meet the diverse needs of
                individuals and institutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Tesah Treasury Trust */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="/images/tesah-treasury-trust-banner.jpeg"
                      alt="Tesah Treasury Trust"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-8 text-white">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                        Low Risk
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Tesah Treasury Trust (TTT)</h3>
                      <p className="text-slate-200 mb-4">
                        Money market fund focused on capital preservation and steady income
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-600">YTD Return</span>
                      <span className="text-green-600 font-bold text-lg">+12.8%</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-slate-600">Minimum Investment</span>
                      <span className="font-semibold">GH₵1,000</span>
                    </div>
                    <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
                      <Link href="/investment-products#ttt">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tesah Future Fund */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src="/images/tesah-future-fund-banner.jpeg"
                      alt="Tesah Future Fund"
                      fill
                      className="object-left object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-8 text-white">
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                        Medium-High Risk
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Tesah Future Fund (TFF)</h3>
                      <p className="text-slate-200 mb-4">
                        Equity fund targeting long-term capital growth across Africa
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-600">YTD Return</span>
                      <span className="text-green-600 font-bold text-lg">+21.7%</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-slate-600">Minimum Investment</span>
                      <span className="font-semibold">GH₵5,000</span>
                    </div>
                    <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
                      <Link href="/investment-products#tff">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-slate-300 text-slate-700 hover:bg-slate-100 bg-transparent"
              >
                <Link href="/investment-products">
                  View All Investment Products <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Tesah */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
                    Why Choose Tesah Capital
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                    Africa's Premier Investment Partner
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Since 2010, we have been at the forefront of Africa's financial markets, delivering exceptional
                    returns and building lasting partnerships with our clients.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Superior Performance</h3>
                      <p className="text-slate-600">
                        Consistently outperforming benchmarks with an average annual return of 18.7% across our fund
                        portfolio.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-3 rounded-lg shrink-0">
                      <Shield className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Regulatory Excellence</h3>
                      <p className="text-slate-600">
                        Licensed by SEC as Investment Advisor and Fund Manager, registered with NPRA as Pension Fund
                        Manager.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Client-Focused Approach</h3>
                      <p className="text-slate-600">
                        Personalized investment strategies tailored to meet your unique financial goals and risk
                        profile.
                      </p>
                    </div>
                  </div>
                </div>

                <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90">
                  <Link href="/about">
                    Learn About Our Story <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/tesah-office-building.jpeg"
                    alt="Tesah Capital Office"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border max-w-xs">
                  <div className="text-3xl font-bold text-slate-900 mb-2">Award Winner</div>
                  <div className="text-slate-600">
                    Fund Manager of the Year 2024 - Ghana Financial Services Excellence Awards
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Insights */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                Market Insights
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Informed, Stay Ahead</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Get the latest market insights, economic analysis, and investment opportunities across African markets.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary px-2 py-1 rounded text-xs font-medium">Market Update</span>
                    <span className="text-slate-400 text-sm">2 hours ago</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Ghana Stock Exchange Reaches New Heights</h3>
                  <p className="text-slate-300 mb-4">
                    The GSE Composite Index gained 12% in Q3, driven by strong performance in the financial and
                    telecommunications sectors.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-secondary px-2 py-1 rounded text-xs font-medium">Analysis</span>
                    <span className="text-slate-400 text-sm">1 day ago</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">African Tech Sector Investment Opportunities</h3>
                  <p className="text-slate-300 mb-4">
                    Emerging fintech and digital infrastructure companies present compelling investment cases across the
                    continent.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-green-600 px-2 py-1 rounded text-xs font-medium">Fund Update</span>
                    <span className="text-slate-400 text-sm">3 days ago</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">TTT Fund Performance Review</h3>
                  <p className="text-slate-300 mb-4">
                    Our Treasury Trust fund continues to deliver steady returns, outperforming the 91-day treasury bill
                    by 3.5%.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/news">
                  View All Insights <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">Ready to Start Your Investment Journey?</h2>
              <p className="text-xl text-primary-foreground/90">
                Join thousands of investors who trust Tesah Capital to grow their wealth. Our expert team is ready to
                help you achieve your financial goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 px-8 py-4 text-lg">
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
