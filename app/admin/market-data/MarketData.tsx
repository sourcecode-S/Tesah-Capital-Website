"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Plus, Edit, Trash2, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

const mockMarketData: MarketDataPoint[] = [
  {
    id: "1",
    symbol: "GSE-CI",
    name: "Ghana Stock Exchange Composite Index",
    price: 3245.67,
    change: 12.45,
    changePercent: 0.38,
    volume: 1250000,
    marketCap: 65000000000,
    lastUpdated: "2024-01-15T16:00:00Z",
    category: "stocks",
  },
  {
    id: "2",
    symbol: "GHS/USD",
    name: "Ghana Cedi to US Dollar",
    price: 0.082,
    change: -0.001,
    changePercent: -1.2,
    volume: 45000000,
    marketCap: 0,
    lastUpdated: "2024-01-15T16:00:00Z",
    category: "currencies",
  },
  {
    id: "3",
    symbol: "GOLD",
    name: "Gold (per ounce)",
    price: 2045.3,
    change: 15.2,
    changePercent: 0.75,
    volume: 125000,
    marketCap: 0,
    lastUpdated: "2024-01-15T16:00:00Z",
    category: "commodities",
  },
]

const mockEconomicIndicators: EconomicIndicator[] = [
  {
    id: "1",
    name: "Inflation Rate",
    value: 23.6,
    unit: "%",
    change: -0.8,
    lastUpdated: "2024-01-01T00:00:00Z",
    category: "inflation",
  },
  {
    id: "2",
    name: "Bank of Ghana Policy Rate",
    value: 30.0,
    unit: "%",
    change: 0.0,
    lastUpdated: "2024-01-15T00:00:00Z",
    category: "interest_rates",
  },
  {
    id: "3",
    name: "GDP Growth Rate",
    value: 3.2,
    unit: "%",
    change: 0.5,
    lastUpdated: "2023-12-31T00:00:00Z",
    category: "gdp",
  },
]

export default function MarketData() {
  const [marketData, setMarketData] = useState<MarketDataPoint[]>(mockMarketData)
  const [economicIndicators, setEconomicIndicators] = useState<EconomicIndicator[]>(mockEconomicIndicators)
  const [isLoading, setIsLoading] = useState(false)
  const [editingItem, setEditingItem] = useState<MarketDataPoint | EconomicIndicator | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const refreshData = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update timestamps
      const updatedMarketData = marketData.map((item) => ({
        ...item,
        lastUpdated: new Date().toISOString(),
      }))

      const updatedIndicators = economicIndicators.map((item) => ({
        ...item,
        lastUpdated: new Date().toISOString(),
      }))

      setMarketData(updatedMarketData)
      setEconomicIndicators(updatedIndicators)

      toast({
        title: "Data Refreshed",
        description: "Market data has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh market data.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item: MarketDataPoint | EconomicIndicator) => {
    setEditingItem(item)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string, type: "market" | "indicator") => {
    try {
      if (type === "market") {
        setMarketData((prev) => prev.filter((item) => item.id !== id))
      } else {
        setEconomicIndicators((prev) => prev.filter((item) => item.id !== id))
      }

      toast({
        title: "Item Deleted",
        description: "The item has been removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item.",
        variant: "destructive",
      })
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Market Data Management</h1>
          <p className="text-gray-600">Monitor and manage financial market data and economic indicators</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Data Point
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Market Data Point</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input id="symbol" placeholder="e.g., AAPL" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="e.g., Apple Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="bonds">Bonds</SelectItem>
                      <SelectItem value="commodities">Commodities</SelectItem>
                      <SelectItem value="currencies">Currencies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Add Data Point</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="market-data" className="space-y-4">
        <TabsList>
          <TabsTrigger value="market-data">Market Data</TabsTrigger>
          <TabsTrigger value="economic-indicators">Economic Indicators</TabsTrigger>
        </TabsList>

        <TabsContent value="market-data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Data Points</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.symbol}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{formatCurrency(item.price)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {item.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={item.change >= 0 ? "text-green-500" : "text-red-500"}>
                            {item.change >= 0 ? "+" : ""}
                            {item.change} ({item.changePercent}%)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{formatNumber(item.volume)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(item.lastUpdated)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(item.id, "market")}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="economic-indicators" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Economic Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Indicator</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {economicIndicators.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        {item.value}
                        {item.unit}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {item.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={item.change >= 0 ? "text-green-500" : "text-red-500"}>
                            {item.change >= 0 ? "+" : ""}
                            {item.change}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(item.lastUpdated)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(item.id, "indicator")}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
