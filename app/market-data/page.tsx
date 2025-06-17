"use client"

import Link from "next/link"

import { useState } from "react"
import { Calendar, Download, Info, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

// This would typically be fetched from an API
const mockMarketData = {
  gse: {
    daily: generateMockData(30, 2500, 2800),
    weekly: generateMockData(12, 2400, 2900),
    monthly: generateMockData(6, 2300, 3000),
    yearly: generateMockData(5, 2000, 3200),
  },
  gseci: {
    daily: generateMockData(30, 3200, 3500),
    weekly: generateMockData(12, 3100, 3600),
    monthly: generateMockData(6, 3000, 3700),
    yearly: generateMockData(5, 2800, 3800),
  },
}

// Helper function to generate mock data
function generateMockData(points: number, min: number, max: number) {
  const data = []
  let currentValue = min + (max - min) * 0.7 // Start at 70% of the range

  for (let i = 0; i < points; i++) {
    // Random walk with a slight upward bias
    const change = (Math.random() - 0.45) * (max - min) * 0.02
    currentValue = Math.max(min, Math.min(max, currentValue + change))

    // Format date properly
    const date = new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000)
    const formattedDate = date.toISOString().split("T")[0]

    data.push({
      value: currentValue.toFixed(2),
      date: formattedDate,
    })
  }

  return data
}

export default function MarketDataPage() {
  const [timeframe, setTimeframe] = useState("daily")
  const [indexType, setIndexType] = useState("gse")

  // Calculate percentage change
  const currentData =
    mockMarketData[indexType as keyof typeof mockMarketData][timeframe as keyof typeof mockMarketData.gse]
  const latestValue = Number.parseFloat(currentData[currentData.length - 1].value)
  const previousValue = Number.parseFloat(currentData[0].value)
  const percentChange = ((latestValue - previousValue) / previousValue) * 100
  const isPositive = percentChange >= 0

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Market Data</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Track the performance of the Ghana Stock Exchange and other key market indicators.
              </p>
            </div>
          </div>
        </section>

        {/* Market Overview */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">GSE Composite Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,456.78</div>
                  <p className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"} flex items-center`}>
                    {isPositive ? "+" : ""}
                    {percentChange.toFixed(2)}%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">GSE Financial Stock Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,123.45</div>
                  <p className="text-xs text-green-600 flex items-center">+1.23%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Market Capitalization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">GH₵ 64.5B</div>
                  <p className="text-xs text-green-600 flex items-center">+0.87%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Volume Traded</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5.2M</div>
                  <p className="text-xs text-red-600 flex items-center">-2.34%</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Market Charts */}
        <section className="w-full py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="index" className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="index">Index Performance</TabsTrigger>
                  <TabsTrigger value="stocks">Top Stocks</TabsTrigger>
                  <TabsTrigger value="sectors">Sector Performance</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Date Range</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Download className="h-3.5 w-3.5" />
                    <span>Export</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span className="sr-only">Refresh</span>
                  </Button>
                </div>
              </div>

              <TabsContent value="index" className="mt-0">
                <Card className="border overflow-hidden">
                  <CardHeader className="bg-background">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                        <CardTitle>Ghana Stock Exchange Performance</CardTitle>
                        <CardDescription>
                          Track the performance of GSE Composite Index and GSE Financial Stock Index
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant={indexType === "gse" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setIndexType("gse")}
                            className={indexType === "gse" ? "bg-primary hover:bg-primary/90" : ""}
                          >
                            GSE Composite
                          </Button>
                          <Button
                            variant={indexType === "gseci" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setIndexType("gseci")}
                            className={indexType === "gseci" ? "bg-secondary hover:bg-secondary/90" : ""}
                          >
                            GSE Financial
                          </Button>
                        </div>
                        <div className="hidden md:block h-6 w-px bg-border" />
                        <div className="flex items-center gap-2">
                          <Button
                            variant={timeframe === "daily" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimeframe("daily")}
                            className={timeframe === "daily" ? "bg-primary hover:bg-primary/90" : ""}
                          >
                            1D
                          </Button>
                          <Button
                            variant={timeframe === "weekly" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimeframe("weekly")}
                            className={timeframe === "weekly" ? "bg-primary hover:bg-primary/90" : ""}
                          >
                            1W
                          </Button>
                          <Button
                            variant={timeframe === "monthly" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimeframe("monthly")}
                            className={timeframe === "monthly" ? "bg-primary hover:bg-primary/90" : ""}
                          >
                            1M
                          </Button>
                          <Button
                            variant={timeframe === "yearly" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimeframe("yearly")}
                            className={timeframe === "yearly" ? "bg-primary hover:bg-primary/90" : ""}
                          >
                            1Y
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 pt-4">
                    <div className="w-full h-[400px] relative border-t border-border p-4">
                      {/* Chart visualization */}
                      <div className="absolute inset-x-12 inset-y-4 flex items-end">
                        {currentData.map((point, i) => (
                          <div key={i} className="flex-1 flex items-end justify-center h-full px-0.5">
                            <div
                              className={`w-full ${
                                Number.parseFloat(point.value) >
                                Number.parseFloat(currentData[Math.max(0, i - 1)].value)
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                height: `${
                                  (
                                    (Number.parseFloat(point.value) -
                                      Math.min(...currentData.map((d) => Number.parseFloat(d.value)))) /
                                      (Math.max(...currentData.map((d) => Number.parseFloat(d.value))) -
                                        Math.min(...currentData.map((d) => Number.parseFloat(d.value))))
                                  ) *
                                    80 +
                                  10
                                }%`,
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>

                      {/* Y-axis labels */}
                      <div className="absolute left-0 inset-y-4 w-10 flex flex-col justify-between text-xs text-muted-foreground">
                        <span>{Math.max(...currentData.map((d) => Number.parseFloat(d.value))).toFixed(2)}</span>
                        <span>
                          {(
                            (Math.max(...currentData.map((d) => Number.parseFloat(d.value))) +
                              Math.min(...currentData.map((d) => Number.parseFloat(d.value)))) /
                            2
                          ).toFixed(2)}
                        </span>
                        <span>{Math.min(...currentData.map((d) => Number.parseFloat(d.value))).toFixed(2)}</span>
                      </div>

                      {/* X-axis labels */}
                      <div className="absolute bottom-0 inset-x-12 h-4 flex justify-between text-xs text-muted-foreground">
                        {currentData
                          .filter((_, i) => i % Math.ceil(currentData.length / 6) === 0 || i === currentData.length - 1)
                          .map((point, i) => (
                            <span key={i} className="transform -translate-x-1/2">
                              {point.date}
                            </span>
                          ))}
                      </div>

                      {/* Horizontal grid lines */}
                      <div className="absolute inset-x-12 inset-y-4 flex flex-col justify-between pointer-events-none">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="w-full h-px bg-border/50"></div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stocks" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Stocks</CardTitle>
                    <CardDescription>The best performing stocks on the Ghana Stock Exchange</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="h-12 px-4 text-left align-middle font-medium">Symbol</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Company</th>
                            <th className="h-12 px-4 text-right align-middle font-medium">Price</th>
                            <th className="h-12 px-4 text-right align-middle font-medium">Change</th>
                            <th className="h-12 px-4 text-right align-middle font-medium">% Change</th>
                            <th className="h-12 px-4 text-right align-middle font-medium">Volume</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              symbol: "GCB",
                              name: "GCB Bank Ltd",
                              price: 5.25,
                              change: 0.15,
                              percentChange: 2.94,
                              volume: "125,780",
                            },
                            {
                              symbol: "MTNGH",
                              name: "MTN Ghana",
                              price: 1.12,
                              change: 0.03,
                              percentChange: 2.75,
                              volume: "532,450",
                            },
                            {
                              symbol: "EGH",
                              name: "Ecobank Ghana",
                              price: 7.8,
                              change: 0.2,
                              percentChange: 2.63,
                              volume: "87,320",
                            },
                            {
                              symbol: "SOGEGH",
                              name: "Societe Generale Ghana",
                              price: 1.05,
                              change: 0.02,
                              percentChange: 1.94,
                              volume: "45,670",
                            },
                            {
                              symbol: "TOTAL",
                              name: "Total Petroleum Ghana",
                              price: 4.5,
                              change: 0.08,
                              percentChange: 1.81,
                              volume: "32,150",
                            },
                            {
                              symbol: "BOPP",
                              name: "Benso Oil Palm Plantation",
                              price: 3.7,
                              change: 0.05,
                              percentChange: 1.37,
                              volume: "18,900",
                            },
                            {
                              symbol: "GGBL",
                              name: "Guinness Ghana Breweries",
                              price: 2.1,
                              change: 0.02,
                              percentChange: 0.96,
                              volume: "27,840",
                            },
                            {
                              symbol: "SCB",
                              name: "Standard Chartered Bank",
                              price: 21.5,
                              change: 0.15,
                              percentChange: 0.7,
                              volume: "12,350",
                            },
                          ].map((stock, i) => (
                            <tr key={i} className="border-b">
                              <td className="p-4 align-middle font-medium">{stock.symbol}</td>
                              <td className="p-4 align-middle">{stock.name}</td>
                              <td className="p-4 align-middle text-right">GH₵ {stock.price.toFixed(2)}</td>
                              <td
                                className={`p-4 align-middle text-right ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {stock.change >= 0 ? "+" : ""}
                                {stock.change.toFixed(2)}
                              </td>
                              <td
                                className={`p-4 align-middle text-right ${stock.percentChange >= 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {stock.percentChange >= 0 ? "+" : ""}
                                {stock.percentChange.toFixed(2)}%
                              </td>
                              <td className="p-4 align-middle text-right">{stock.volume}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sectors" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Sector Performance</CardTitle>
                    <CardDescription>Performance of different sectors in the Ghana Stock Exchange</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        { name: "Banking & Finance", change: 2.45, value: 75 },
                        { name: "Telecommunications", change: 1.87, value: 65 },
                        { name: "Oil & Gas", change: 0.92, value: 55 },
                        { name: "Manufacturing", change: 0.45, value: 45 },
                        { name: "Insurance", change: -0.32, value: 35 },
                        { name: "Agriculture", change: -1.24, value: 25 },
                      ].map((sector, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{sector.name}</div>
                            <div className={`text-sm ${sector.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                              {sector.change >= 0 ? "+" : ""}
                              {sector.change}%
                            </div>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${sector.change >= 0 ? "bg-green-500" : "bg-red-500"}`}
                              style={{ width: `${sector.value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Market Insights */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 items-start">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Market Insights</h2>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ghana Stock Exchange Outlook</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        The Ghana Stock Exchange (GSE) has shown resilience in the face of global economic headwinds.
                        The GSE Composite Index (GSE-CI) has recorded a year-to-date return of 12.5%, outperforming many
                        regional markets. This performance is driven by strong showings in the banking,
                        telecommunications, and energy sectors.
                      </p>
                      <p className="text-muted-foreground mt-4">
                        Analysts predict continued growth in the second half of the year, supported by improving
                        macroeconomic indicators and strong corporate earnings. However, investors should remain
                        cautious of potential risks including currency volatility and inflationary pressures.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Investment Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        The financial sector continues to present attractive investment opportunities, with banks
                        showing strong balance sheets and improved asset quality. The telecommunications sector also
                        remains promising, driven by increasing digital adoption and mobile money penetration.
                      </p>
                      <p className="text-muted-foreground mt-4">
                        Emerging opportunities can be found in the energy sector, particularly in companies involved in
                        renewable energy projects. The agricultural sector also shows potential for long-term growth,
                        supported by government initiatives to boost food security and export capabilities.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Economic Indicators</h2>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Economic Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: "GDP Growth Rate", value: "4.8%", change: "+0.3%", period: "Q2 2024" },
                          { name: "Inflation Rate", value: "12.5%", change: "-0.7%", period: "June 2024" },
                          { name: "Policy Rate", value: "19.0%", change: "Unchanged", period: "July 2024" },
                          { name: "Exchange Rate (USD/GHS)", value: "12.45", change: "-0.2%", period: "July 15, 2024" },
                          { name: "Foreign Reserves", value: "$5.8B", change: "+$0.3B", period: "June 2024" },
                        ].map((indicator, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0"
                          >
                            <div>
                              <div className="font-medium">{indicator.name}</div>
                              <div className="text-xs text-muted-foreground">{indicator.period}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{indicator.value}</div>
                              <div className="text-xs text-muted-foreground">{indicator.change}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        Market Calendar
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { date: "July 25, 2024", event: "Q2 GDP Data Release" },
                          { date: "July 28, 2024", event: "Monetary Policy Committee Meeting" },
                          { date: "August 5, 2024", event: "Treasury Bill Auction" },
                          { date: "August 15, 2024", event: "Corporate Earnings Deadline" },
                          { date: "August 20, 2024", event: "Inflation Data Release" },
                        ].map((event, i) => (
                          <div key={i} className="flex justify-between items-center">
                            <div className="font-medium">{event.date}</div>
                            <div className="text-muted-foreground">{event.event}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Make Informed Investment Decisions?
              </h2>
              <p className="text-primary-foreground/80 md:text-xl">
                Contact our team of expert advisors to discuss how you can leverage market opportunities.
              </p>
              <Button size="lg" className="mt-4 bg-secondary hover:bg-secondary/90" asChild>
                <Link href="/contact">Speak to an Advisor</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
