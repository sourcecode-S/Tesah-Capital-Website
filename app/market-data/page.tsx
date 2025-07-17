"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Calendar, Download, Info, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { apiService } from "@/lib/api-service" // Import apiService
import { Skeleton } from "@/components/ui/skeleton" // Ensure Skeleton is imported

interface MarketDataPoint {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  lastUpdated: string
  category: "stocks" | "bonds" | "commodities" | "currencies"
}

interface EconomicIndicator {
  id: string
  name: string
  value: number
  unit: string
  change: number
  lastUpdated: string
  category: "inflation" | "gdp" | "interest_rates" | "employment"
}

interface MarketIndexHistoryPoint {
  id: string
  indexType: "GSE-CI" | "GSE-FSI" // GSE Composite Index or GSE Financial Stock Index
  date: string // YYYY-MM-DD
  value: number
  change: number
  changePercent: number
  lastUpdated: string
}

// Mock data for charts (used if no real data is available or filtered out)
const mockChartData = [
  { date: "Day 1", value: 100 },
  { date: "Day 2", value: 105 },
  { date: "Day 3", value: 102 },
  { date: "Day 4", value: 108 },
  { date: "Day 5", value: 115 },
  { date: "Day 6", value: 110 },
  { date: "Day 7", value: 118 },
  { date: "Day 8", value: 125 },
  { date: "Day 9", value: 120 },
  { date: "Day 10", value: 128 },
  { date: "Day 11", value: 135 },
  { date: "Day 12", value: 130 },
  { date: "Day 13", value: 138 },
  { date: "Day 14", value: 145 },
  { date: "Day 15", value: 140 },
]

export default function MarketDataPage() {
  const [timeframe, setTimeframe] = useState("daily")
  const [indexType, setIndexType] = useState<"gse" | "gseci">("gse") // Changed to match indexType in history
  const [marketDataPoints, setMarketDataPoints] = useState<MarketDataPoint[]>([])
  const [economicIndicators, setEconomicIndicators] = useState<EconomicIndicator[]>([])
  const [marketIndexHistory, setMarketIndexHistory] = useState<MarketIndexHistoryPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const marketRes = await apiService.getMarketDataPoints()
        if (marketRes.success && marketRes.data) {
          setMarketDataPoints(marketRes.data)
        }

        const indicatorRes = await apiService.getEconomicIndicators()
        if (indicatorRes.success && indicatorRes.data) {
          setEconomicIndicators(indicatorRes.data)
        }

        const indexHistoryRes = await apiService.getMarketIndexHistory()
        if (indexHistoryRes.success && indexHistoryRes.data) {
          setMarketIndexHistory(indexHistoryRes.data)
        }
      } catch (error) {
        console.error("Failed to fetch market data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Prepare data for the chart based on indexType and timeframe
  const getChartData = (history: MarketIndexHistoryPoint[], selectedType: "gse" | "gseci", tf: string) => {
    const targetIndexType = selectedType === "gse" ? "GSE-CI" : "GSE-FSI"
    let filteredData = history.filter((item) => item.indexType === targetIndexType)

    // Sort data by date to ensure correct chronological order for the chart
    filteredData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Apply timeframe filtering (simplified for mock data)
    const now = new Date()
    const startDate = new Date()

    switch (tf) {
      case "daily":
        startDate.setDate(now.getDate() - 1) // Last 24 hours
        break
      case "weekly":
        startDate.setDate(now.getDate() - 7) // Last 7 days
        break
      case "monthly":
        startDate.setMonth(now.getMonth() - 1) // Last month
        break
      case "yearly":
        startDate.setFullYear(now.getFullYear() - 1) // Last year
        break
      default:
        break
    }

    filteredData = filteredData.filter((item) => new Date(item.date) >= startDate)

    // If no data for the selected timeframe, return mockChartData
    // Otherwise, slice to get at most 15 recent data points
    if (filteredData.length === 0) {
      return mockChartData.map((d) => ({
        value: d.value.toFixed(2),
        date: d.date,
      }))
    } else {
      // Take the last 15 data points to ensure a consistent number of bars
      return filteredData.slice(Math.max(0, filteredData.length - 15)).map((item) => ({
        value: item.value.toFixed(2),
        date: item.date,
      }))
    }
  }

  const currentChartData = getChartData(marketIndexHistory, indexType, timeframe)

  // Calculate percentage change for the overview cards
  const getOverviewChange = (symbol: string) => {
    const item = marketDataPoints.find((d) => d.symbol === symbol)
    if (item) {
      return {
        value: item.price,
        percentChange: item.changePercent,
        isPositive: item.changePercent >= 0,
      }
    }
    return { value: 0, percentChange: 0, isPositive: true }
  }

  const gseCompositeOverview = getOverviewChange("GSE-CI")
  // For GSE Financial Stock Index, find the latest from marketIndexHistory
  const gseFinancialIndexLatest = marketIndexHistory
    .filter((item) => item.indexType === "GSE-FSI")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]

  const gseFinancialOverview = gseFinancialIndexLatest
    ? {
        value: gseFinancialIndexLatest.value,
        percentChange: gseFinancialIndexLatest.changePercent,
        isPositive: gseFinancialIndexLatest.changePercent >= 0,
      }
    : { value: 0, percentChange: 0, isPositive: true }

  const marketCapOverview = getOverviewChange("GOLD") // Using Gold as a placeholder for Market Capitalization
  const volumeTraded = { value: "5.2M", percentChange: -2.34, isPositive: false } // Hardcoded for now

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
                  <div className="text-2xl font-bold">{gseCompositeOverview.value.toFixed(2)}</div>
                  <p
                    className={`text-xs ${gseCompositeOverview.isPositive ? "text-green-600" : "text-red-600"} flex items-center`}
                  >
                    {gseCompositeOverview.isPositive ? "+" : ""}
                    {gseCompositeOverview.percentChange.toFixed(2)}%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">GSE Financial Stock Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{gseFinancialOverview.value.toFixed(2)}</div>
                  <p
                    className={`text-xs ${gseFinancialOverview.isPositive ? "text-green-600" : "text-red-600"} flex items-center`}
                  >
                    {gseFinancialOverview.isPositive ? "+" : ""}
                    {gseFinancialOverview.percentChange.toFixed(2)}%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Market Capitalization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">GH₵ {marketCapOverview.value.toFixed(2)}B</div>
                  <p
                    className={`text-xs ${marketCapOverview.isPositive ? "text-green-600" : "text-red-600"} flex items-center`}
                  >
                    {marketCapOverview.isPositive ? "+" : ""}
                    {marketCapOverview.percentChange.toFixed(2)}%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Volume Traded</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{volumeTraded.value}</div>
                  <p
                    className={`text-xs ${volumeTraded.isPositive ? "text-green-600" : "text-red-600"} flex items-center`}
                  >
                    {volumeTraded.isPositive ? "+" : ""}
                    {volumeTraded.percentChange.toFixed(2)}%
                  </p>
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
                  <Button variant="outline" size="sm" className="h-8 gap-1 bg-transparent">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Date Range</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1 bg-transparent">
                    <Download className="h-3.5 w-3.5" />
                    <span>Export</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
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
                      {isLoading ? (
                        <Skeleton className="absolute inset-0 w-full h-full" />
                      ) : (
                        <>
                          {/* Chart visualization */}
                          <div className="absolute inset-x-12 inset-y-4 flex items-end gap-x-2">
                            {currentChartData.map((point, i) => (
                              <div key={i} className="flex-1 flex items-end justify-center h-full">
                                <div
                                  className={`w-full ${
                                    Number.parseFloat(point.value) >
                                    Number.parseFloat(currentChartData[Math.max(0, i - 1)]?.value || "0")
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  }`}
                                  style={{
                                    height: `${
                                      (
                                        (Number.parseFloat(point.value) -
                                          Math.min(...currentChartData.map((d) => Number.parseFloat(d.value)))) /
                                          (Math.max(...currentChartData.map((d) => Number.parseFloat(d.value))) -
                                            Math.min(...currentChartData.map((d) => Number.parseFloat(d.value))))
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
                            <span>
                              {Math.max(...currentChartData.map((d) => Number.parseFloat(d.value))).toFixed(2)}
                            </span>
                            <span>
                              {(
                                (Math.max(...currentChartData.map((d) => Number.parseFloat(d.value))) +
                                  Math.min(...currentChartData.map((d) => Number.parseFloat(d.value)))) /
                                2
                              ).toFixed(2)}
                            </span>
                            <span>
                              {Math.min(...currentChartData.map((d) => Number.parseFloat(d.value))).toFixed(2)}
                            </span>
                          </div>

                          {/* X-axis labels */}
                          <div className="absolute bottom-0 inset-x-12 h-4 flex justify-between text-xs text-muted-foreground">
                            {currentChartData
                              .filter(
                                (_, i) =>
                                  i === 0 ||
                                  i === Math.floor(currentChartData.length / 2) ||
                                  i === currentChartData.length - 1,
                              ) // Show start, middle, and end labels
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
                        </>
                      )}
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
                    {isLoading ? (
                      <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-24" />
                          </div>
                        ))}
                      </div>
                    ) : (
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
                            {marketDataPoints
                              .filter((item) => item.category === "stocks")
                              .sort((a, b) => b.changePercent - a.changePercent) // Sort by % Change
                              .map((stock, i) => (
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
                                    className={`p-4 align-middle text-right ${stock.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}
                                  >
                                    {stock.changePercent >= 0 ? "+" : ""}
                                    {stock.changePercent.toFixed(2)}%
                                  </td>
                                  <td className="p-4 align-middle text-right">{stock.volume.toLocaleString()}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    )}
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
                    {isLoading ? (
                      <div className="space-y-4">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="flex flex-col space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-2 w-full" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* This data is still hardcoded as there's no sector data in api-service.ts */}
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
                    )}
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
                  {isLoading ? (
                    <>
                      <Skeleton className="h-[200px] w-full" />
                      <Skeleton className="h-[200px] w-full" />
                    </>
                  ) : (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle>Ghana Stock Exchange Outlook</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            The Ghana Stock Exchange (GSE) has shown resilience in the face of global economic
                            headwinds. The GSE Composite Index (GSE-CI) has recorded a year-to-date return of 12.5%,
                            outperforming many regional markets. This performance is driven by strong showings in the
                            banking, telecommunications, and energy sectors.
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
                            Emerging opportunities can be found in the energy sector, particularly in companies involved
                            in renewable energy projects. The agricultural sector also shows potential for long-term
                            growth, supported by government initiatives to boost food security and export capabilities.
                          </p>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Economic Indicators</h2>
                <div className="space-y-4">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-[200px] w-full" />
                      <Skeleton className="h-[200px] w-full" />
                    </>
                  ) : (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle>Key Economic Data</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {economicIndicators.map((indicator, i) => (
                              <div
                                key={i}
                                className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0"
                              >
                                <div>
                                  <div className="font-medium">{indicator.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {new Date(indicator.lastUpdated).toLocaleDateString()}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold">
                                    {indicator.value}
                                    {indicator.unit}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {indicator.change >= 0 ? "+" : ""}
                                    {indicator.change}
                                  </div>
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
                    </>
                  )}
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
