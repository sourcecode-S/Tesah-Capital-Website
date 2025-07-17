"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { apiService } from "@/lib/api-service"

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

export default function MarketData() {
  const [marketData, setMarketData] = useState<MarketDataPoint[]>([])
  const [economicIndicators, setEconomicIndicators] = useState<EconomicIndicator[]>([])
  const [marketIndexHistory, setMarketIndexHistory] = useState<MarketIndexHistoryPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<MarketDataPoint | EconomicIndicator | MarketIndexHistoryPoint | null>(
    null,
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"market" | "indicator" | "indexHistory" | null>(null)
  const { toast } = useToast()

  // Form state for dialog
  const [symbol, setSymbol] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState<number | string>("")
  const [change, setChange] = useState<number | string>("")
  const [changePercent, setChangePercent] = useState<number | string>("")
  const [volume, setVolume] = useState<number | string>("")
  const [marketCap, setMarketCap] = useState<number | string>("")
  const [category, setCategory] = useState<string>("")
  const [unit, setUnit] = useState<string>("")
  const [value, setValue] = useState<number | string>("")
  const [indexTypeForm, setIndexTypeForm] = useState<"GSE-CI" | "GSE-FSI" | "">("")
  const [date, setDate] = useState("")

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const marketRes = await apiService.getMarketDataPoints()
      if (marketRes.success && marketRes.data) {
        setMarketData(marketRes.data)
      } else {
        throw new Error(marketRes.error || "Failed to fetch market data")
      }

      const indicatorRes = await apiService.getEconomicIndicators()
      if (indicatorRes.success && indicatorRes.data) {
        setEconomicIndicators(indicatorRes.data)
      } else {
        throw new Error(indicatorRes.error || "Failed to fetch economic indicators")
      }

      const indexHistoryRes = await apiService.getMarketIndexHistory()
      if (indexHistoryRes.success && indexHistoryRes.data) {
        setMarketIndexHistory(indexHistoryRes.data)
      } else {
        throw new Error(indexHistoryRes.error || "Failed to fetch index history")
      }

      toast({
        title: "Data Loaded",
        description: "Market data, economic indicators, and index history fetched successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to fetch data: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refreshData = async () => {
    await fetchData()
  }

  const resetForm = () => {
    setSymbol("")
    setName("")
    setPrice("")
    setChange("")
    setChangePercent("")
    setVolume("")
    setMarketCap("")
    setCategory("")
    setUnit("")
    setValue("")
    setIndexTypeForm("")
    setDate("")
    setEditingItem(null)
    setDialogType(null)
  }

  const handleAddClick = (type: "market" | "indicator" | "indexHistory") => {
    resetForm()
    setDialogType(type)
    setIsDialogOpen(true)
  }

  const handleEdit = (item: MarketDataPoint | EconomicIndicator | MarketIndexHistoryPoint) => {
    setEditingItem(item)
    if ("symbol" in item) {
      setDialogType("market")
      setSymbol(item.symbol)
      setName(item.name)
      setPrice(item.price)
      setChange(item.change)
      setChangePercent(item.changePercent)
      setVolume(item.volume)
      setMarketCap(item.marketCap)
      setCategory(item.category)
    } else if ("indexType" in item) {
      setDialogType("indexHistory")
      setIndexTypeForm(item.indexType)
      setDate(item.date)
      setValue(item.value)
      setChange(item.change)
      setChangePercent(item.changePercent)
    } else {
      setDialogType("indicator")
      setName(item.name)
      setValue(item.value)
      setUnit(item.unit)
      setChange(item.change)
      setCategory(item.category)
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (dialogType === "market") {
        const data = {
          symbol,
          name,
          price: Number.parseFloat(price as string),
          change: Number.parseFloat(change as string),
          changePercent: Number.parseFloat(changePercent as string),
          volume: Number.parseInt(volume as string),
          marketCap: Number.parseInt(marketCap as string),
          category: category as "stocks" | "bonds" | "commodities" | "currencies",
        }
        if (editingItem && "symbol" in editingItem) {
          const res = await apiService.updateMarketDataPoint(editingItem.id, data)
          if (!res.success) throw new Error(res.error || "Failed to update market data point")
          setMarketData((prev) => prev.map((item) => (item.id === editingItem.id ? res.data! : item)))
          toast({ title: "Market Data Updated", description: `${name} updated successfully.` })
        } else {
          const res = await apiService.addMarketDataPoint(data)
          if (!res.success) throw new Error(res.error || "Failed to add market data point")
          setMarketData((prev) => [...prev, res.data!])
          toast({ title: "Market Data Added", description: `${name} added successfully.` })
        }
      } else if (dialogType === "indicator") {
        const data = {
          name,
          value: Number.parseFloat(value as string),
          unit,
          change: Number.parseFloat(change as string),
          category: category as "inflation" | "gdp" | "interest_rates" | "employment",
        }
        if (editingItem && "unit" in editingItem) {
          const res = await apiService.updateEconomicIndicator(editingItem.id, data)
          if (!res.success) throw new Error(res.error || "Failed to update economic indicator")
          setEconomicIndicators((prev) => prev.map((item) => (item.id === editingItem.id ? res.data! : item)))
          toast({ title: "Economic Indicator Updated", description: `${name} updated successfully.` })
        } else {
          const res = await apiService.addEconomicIndicator(data)
          if (!res.success) throw new Error(res.error || "Failed to add economic indicator")
          setEconomicIndicators((prev) => [...prev, res.data!])
          toast({ title: "Economic Indicator Added", description: `${name} added successfully.` })
        }
      } else if (dialogType === "indexHistory") {
        const data = {
          indexType: indexTypeForm as "GSE-CI" | "GSE-FSI",
          date,
          value: Number.parseFloat(value as string),
          change: Number.parseFloat(change as string),
          changePercent: Number.parseFloat(changePercent as string),
        }
        if (editingItem && "indexType" in editingItem) {
          const res = await apiService.updateMarketIndexHistoryPoint(editingItem.id, data)
          if (!res.success) throw new Error(res.error || "Failed to update index history point")
          setMarketIndexHistory((prev) => prev.map((item) => (item.id === editingItem.id ? res.data! : item)))
          toast({ title: "Index History Updated", description: `${indexTypeForm} on ${date} updated successfully.` })
        } else {
          const res = await apiService.addMarketIndexHistoryPoint(data)
          if (!res.success) throw new Error(res.error || "Failed to add index history point")
          setMarketIndexHistory((prev) => [...prev, res.data!])
          toast({ title: "Index History Added", description: `${indexTypeForm} on ${date} added successfully.` })
        }
      }
      setIsDialogOpen(false)
      resetForm()
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Operation failed: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string, type: "market" | "indicator" | "indexHistory") => {
    setIsLoading(true)
    try {
      if (type === "market") {
        const res = await apiService.deleteMarketDataPoint(id)
        if (!res.success) throw new Error(res.error || "Failed to delete market data point")
        setMarketData((prev) => prev.filter((item) => item.id !== id))
        toast({ title: "Item Deleted", description: "Market data point removed successfully." })
      } else if (type === "indicator") {
        const res = await apiService.deleteEconomicIndicator(id)
        if (!res.success) throw new Error(res.error || "Failed to delete economic indicator")
        setEconomicIndicators((prev) => prev.filter((item) => item.id !== id))
        toast({ title: "Item Deleted", description: "Economic indicator removed successfully." })
      } else if (type === "indexHistory") {
        const res = await apiService.deleteMarketIndexHistoryPoint(id)
        if (!res.success) throw new Error(res.error || "Failed to delete index history point")
        setMarketIndexHistory((prev) => prev.filter((item) => item.id !== id))
        toast({ title: "Item Deleted", description: "Index history point removed successfully." })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete item: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={() => handleAddClick("market")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Market Data
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Edit" : "Add"}{" "}
                  {dialogType === "market"
                    ? "Market Data Point"
                    : dialogType === "indicator"
                      ? "Economic Indicator"
                      : "Index History Point"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {dialogType === "market" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="symbol">Symbol</Label>
                      <Input
                        id="symbol"
                        placeholder="e.g., AAPL"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Apple Inc."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="change">Change</Label>
                      <Input
                        id="change"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={change}
                        onChange={(e) => setChange(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="changePercent">Change %</Label>
                      <Input
                        id="changePercent"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={changePercent}
                        onChange={(e) => setChangePercent(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volume">Volume</Label>
                      <Input
                        id="volume"
                        type="number"
                        step="1"
                        placeholder="0"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marketCap">Market Cap</Label>
                      <Input
                        id="marketCap"
                        type="number"
                        step="1"
                        placeholder="0"
                        value={marketCap}
                        onChange={(e) => setMarketCap(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory} required>
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
                  </>
                ) : dialogType === "indicator" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Inflation Rate"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Input
                        id="unit"
                        placeholder="e.g., %"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="change">Change</Label>
                      <Input
                        id="change"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={change}
                        onChange={(e) => setChange(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inflation">Inflation</SelectItem>
                          <SelectItem value="gdp">GDP</SelectItem>
                          <SelectItem value="interest_rates">Interest Rates</SelectItem>
                          <SelectItem value="employment">Employment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="indexType">Index Type</Label>
                      <Select value={indexTypeForm} onValueChange={setIndexTypeForm} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Index Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GSE-CI">GSE Composite Index</SelectItem>
                          <SelectItem value="GSE-FSI">GSE Financial Stock Index</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="change">Change</Label>
                      <Input
                        id="change"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={change}
                        onChange={(e) => setChange(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="changePercent">Change %</Label>
                      <Input
                        id="changePercent"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={changePercent}
                        onChange={(e) => setChangePercent(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Saving..." : editingItem ? "Save Changes" : "Add Data Point"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={() => handleAddClick("indicator")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Indicator
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Edit" : "Add"}{" "}
                  {dialogType === "market"
                    ? "Market Data Point"
                    : dialogType === "indicator"
                      ? "Economic Indicator"
                      : "Index History Point"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {dialogType === "market" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="symbol">Symbol</Label>
                      <Input
                        id="symbol"
                        placeholder="e.g., AAPL"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Apple Inc."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="change">Change</Label>
                      <Input
                        id="change"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={change}
                        onChange={(e) => setChange(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="changePercent">Change %</Label>
                      <Input
                        id="changePercent"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={changePercent}
                        onChange={(e) => setChangePercent(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volume">Volume</Label>
                      <Input
                        id="volume"
                        type="number"
                        step="1"
                        placeholder="0"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marketCap">Market Cap</Label>
                      <Input
                        id="marketCap"
                        type="number"
                        step="1"
                        placeholder="0"
                        value={marketCap}
                        onChange={(e) => setMarketCap(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory} required>
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
                  </>
                ) : dialogType === "indicator" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Inflation Rate"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Input
                        id="unit"
                        placeholder="e.g., %"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="change">Change</Label>
                      <Input
                        id="change"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={change}
                        onChange={(e) => setChange(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inflation">Inflation</SelectItem>
                          <SelectItem value="gdp">GDP</SelectItem>
                          <SelectItem value="interest_rates">Interest Rates</SelectItem>
                          <SelectItem value="employment">Employment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="indexType">Index Type</Label>
                      <Select value={indexTypeForm} onValueChange={setIndexTypeForm} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Index Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GSE-CI">GSE Composite Index</SelectItem>
                          <SelectItem value="GSE-FSI">GSE Financial Stock Index</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="change">Change</Label>
                      <Input
                        id="change"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={change}
                        onChange={(e) => setChange(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="changePercent">Change %</Label>
                      <Input
                        id="changePercent"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={changePercent}
                        onChange={(e) => setChangePercent(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Saving..." : editingItem ? "Save Changes" : "Add Data Point"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={() => handleAddClick("indexHistory")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Index History
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Edit" : "Add"}{" "}
                  {dialogType === "market"
                    ? "Market Data Point"
                    : dialogType === "indicator"
                      ? "Economic Indicator"
                      : "Index History Point"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {dialogType === "market" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="symbol">Symbol</Label>
                      <Input
                        id="symbol"
                        placeholder="e.g., AAPL"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Apple Inc."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="change">Change</Label>
                      <Input
                        id="change"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={change}
                        onChange={(e) => setChange(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="changePercent">Change %</Label>
                      <Input
                        id="changePercent"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={changePercent}
                        onChange={(e) => setChangePercent(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volume">Volume</Label>
                      <Input
                        id="volume"
                        type="number"
                        step="1"
                        placeholder="0"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marketCap">Market Cap</Label>
                      <Input
                        id="marketCap"
                        type="number"
                        step="1"
                        placeholder="0"
                        value={marketCap}
                        onChange={(e) => setMarketCap(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory} required>
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
                  </>
                ) : dialogType === "indicator" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Inflation Rate"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Input
                        id="unit"
                        placeholder="e.g., %"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="change">Change</Label>
                      <Input
                        id="change"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={change}
                        onChange={(e) => setChange(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inflation">Inflation</SelectItem>
                          <SelectItem value="gdp">GDP</SelectItem>
                          <SelectItem value="interest_rates">Interest Rates</SelectItem>
                          <SelectItem value="employment">Employment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="indexType">Index Type</Label>
                      <Select value={indexTypeForm} onValueChange={setIndexTypeForm} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Index Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GSE-CI">GSE Composite Index</SelectItem>
                          <SelectItem value="GSE-FSI">GSE Financial Stock Index</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="change">Change</Label>
                      <Input
                        id="change"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={change}
                        onChange={(e) => setChange(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="changePercent">Change %</Label>
                      <Input
                        id="changePercent"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={changePercent}
                        onChange={(e) => setChangePercent(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Saving..." : editingItem ? "Save Changes" : "Add Data Point"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="market-data" className="space-y-4">
        <TabsList>
          <TabsTrigger value="market-data">Market Data</TabsTrigger>
          <TabsTrigger value="economic-indicators">Economic Indicators</TabsTrigger>
          <TabsTrigger value="index-history">Index History</TabsTrigger>
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

        <TabsContent value="index-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Index History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Index Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Change %</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketIndexHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.indexType}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.value.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {item.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={item.change >= 0 ? "text-green-500" : "text-red-500"}>
                            {item.change >= 0 ? "+" : ""}
                            {item.change.toFixed(2)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={item.changePercent >= 0 ? "text-green-500" : "text-red-500"}>
                          {item.changePercent >= 0 ? "+" : ""}
                          {item.changePercent.toFixed(2)}%
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(item.lastUpdated)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(item.id, "indexHistory")}>
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
