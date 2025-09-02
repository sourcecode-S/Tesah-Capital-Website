"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Minus, Calendar, BarChart3, PieChart, LineChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function MarketDataPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("1D")

  const marketData = {
    indices: [
      {
        name: "GSE Composite Index",
        value: "3,247.85",
        change: "+42.15",
        changePercent: "+1.32%",
        trend: "up",
      },
      {
        name: "GSE Financial Stocks Index",
        value: "2,156.42",
        change: "-8.73",
        changePercent: "-0.40%",
        trend: "down",
      },
      {
        name: "All Share Index",
        value: "185,432.67",
        change: "+1,234.56",
        changePercent: "+0.67%",
        trend: "up",
      },
    ],
    topGainers: [
      { symbol: "MTN", name: "MTN Ghana", price: "1.25", change: "+0.15", changePercent: "+13.64%" },
      { symbol: "GCB", name: "GCB Bank", price: "4.80", change: "+0.35", changePercent: "+7.86%" },
      { symbol: "EGH", name: "Ecobank Ghana", price: "6.20", change: "+0.40", changePercent: "+6.90%" },
      { symbol: "GOIL", name: "Ghana Oil Company", price: "2.15", change: "+0.12", changePercent: "+5.91%" },
    ],
    topLosers: [
      { symbol: "CAL", name: "CAL Bank", price: "0.85", change: "-0.08", changePercent: "-8.60%" },
      { symbol: "FML", name: "Fan Milk Limited", price: "5.40", change: "-0.35", changePercent: "-6.09%" },
      { symbol: "TOTAL", name: "Total Petroleum", price: "3.20", change: "-0.18", changePercent: "-5.33%" },
      { symbol: "SIC", name: "SIC Insurance", price: "0.65", change: "-0.03", changePercent: "-4.41%" },
    ],
    currencies: [
      { pair: "USD/GHS", rate: "12.45", change: "+0.15", changePercent: "+1.22%" },
      { pair: "EUR/GHS", rate: "13.28", change: "-0.08", changePercent: "-0.60%" },
      { pair: "GBP/GHS", rate: "15.67", change: "+0.23", changePercent: "+1.49%" },
    ],
    commodities: [
      { name: "Gold", price: "$1,985.50", change: "+12.30", changePercent: "+0.62%" },
      { name: "Cocoa", price: "$3,245.00", change: "-45.20", changePercent: "-1.37%" },
      { name: "Oil (Brent)", price: "$82.15", change: "+1.85", changePercent: "+2.30%" },
    ],
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getChangeColor = (change: string) => {
    if (change.startsWith("+")) return "text-green-600"
    if (change.startsWith("-")) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Market Data</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Real-time market data, indices, and financial information for informed investment decisions.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tighter">Market Overview</h2>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Last updated: Today, 3:45 PM</span>
              </div>
            </div>

            <Tabs defaultValue="indices" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="indices">Indices</TabsTrigger>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="forex">Forex</TabsTrigger>
                <TabsTrigger value="commodities">Commodities</TabsTrigger>
              </TabsList>

              <TabsContent value="indices" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {marketData.indices.map((index, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{index.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold">{index.value}</div>
                            <div className={`flex items-center gap-1 text-sm ${getChangeColor(index.change)}`}>
                              {getTrendIcon(index.trend)}
                              <span>{index.change}</span>
                              <span>({index.changePercent})</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <BarChart3 className="h-8 w-8 text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="stocks" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        Top Gainers
                      </CardTitle>
                      <CardDescription>Best performing stocks today</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {marketData.topGainers.map((stock, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{stock.symbol}</div>
                              <div className="text-sm text-muted-foreground">{stock.name}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">GH₵{stock.price}</div>
                              <div className="text-sm text-green-600">
                                {stock.change} ({stock.changePercent})
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingDown className="h-5 w-5 text-red-600" />
                        Top Losers
                      </CardTitle>
                      <CardDescription>Worst performing stocks today</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {marketData.topLosers.map((stock, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{stock.symbol}</div>
                              <div className="text-sm text-muted-foreground">{stock.name}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">GH₵{stock.price}</div>
                              <div className="text-sm text-red-600">
                                {stock.change} ({stock.changePercent})
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="forex" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {marketData.currencies.map((currency, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{currency.pair}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold">{currency.rate}</div>
                            <div className={`flex items-center gap-1 text-sm ${getChangeColor(currency.change)}`}>
                              {getTrendIcon(currency.change.startsWith("+") ? "up" : "down")}
                              <span>{currency.change}</span>
                              <span>({currency.changePercent})</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <LineChart className="h-8 w-8 text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="commodities" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {marketData.commodities.map((commodity, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{commodity.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold">{commodity.price}</div>
                            <div className={`flex items-center gap-1 text-sm ${getChangeColor(commodity.change)}`}>
                              {getTrendIcon(commodity.change.startsWith("+") ? "up" : "down")}
                              <span>{commodity.change}</span>
                              <span>({commodity.changePercent})</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <PieChart className="h-8 w-8 text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tighter">Market Analysis</h2>
              <p className="mt-4 text-muted-foreground">
                Professional insights and analysis of current market conditions and trends.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Market Summary</CardTitle>
                  <CardDescription>Today's market performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    The Ghana Stock Exchange showed mixed performance today, with the GSE Composite Index gaining 1.32%
                    driven by strong performance in telecommunications and banking sectors. MTN Ghana led the gainers
                    with a 13.64% increase.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Volume Traded</div>
                      <div className="text-muted-foreground">2.4M shares</div>
                    </div>
                    <div>
                      <div className="font-medium">Value Traded</div>
                      <div className="text-muted-foreground">GH₵15.6M</div>
                    </div>
                    <div>
                      <div className="font-medium">Advancing Issues</div>
                      <div className="text-green-600">18</div>
                    </div>
                    <div>
                      <div className="font-medium">Declining Issues</div>
                      <div className="text-red-600">12</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Economic Indicators</CardTitle>
                  <CardDescription>Key economic metrics and indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Inflation Rate</span>
                      <span className="text-muted-foreground">23.6%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Policy Rate</span>
                      <span className="text-muted-foreground">30.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">91-Day T-Bill Rate</span>
                      <span className="text-muted-foreground">24.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">GDP Growth</span>
                      <span className="text-green-600">3.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter">Need Investment Guidance?</h2>
              <p className="text-muted-foreground">
                Our investment experts can help you interpret market data and make informed investment decisions.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <a href="/contact">Speak to an Advisor</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
