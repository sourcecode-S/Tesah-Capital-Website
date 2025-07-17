import {
  getDbConnection,
  type MarketDataPoint as DbMarketDataPoint,
  type EconomicIndicator as DbEconomicIndicator,
  type MarketIndexHistoryPoint as DbMarketIndexHistoryPoint,
} from "@/lib/db"
import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 12)

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export interface MarketDataPoint {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number | null
  lastUpdated: string
  category: "stocks" | "bonds" | "commodities" | "currencies"
}

export interface EconomicIndicator {
  id: string
  name: string
  value: number
  unit: string
  change: number
  lastUpdated: string
  category: "inflation" | "gdp" | "interest_rates" | "employment"
}

export interface MarketIndexHistoryPoint {
  id: string
  indexType: "GSE-CI" | "GSE-FSI" // GSE Composite Index or GSE Financial Stock Index
  date: string // YYYY-MM-DD
  value: number
  change: number
  changePercent: number
  lastUpdated: string
}

// --- Mock data storage (used if DB is not connected) ---
let currentMockMarketData: MarketDataPoint[] = [
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
    marketCap: null,
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
    marketCap: null,
    lastUpdated: "2024-01-15T16:00:00Z",
    category: "commodities",
  },
]

let currentMockEconomicIndicators: EconomicIndicator[] = [
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

let currentMockMarketIndexHistory: MarketIndexHistoryPoint[] = [
  {
    id: "gseci-2024-07-01",
    indexType: "GSE-CI",
    date: "2024-07-01",
    value: 3200.0,
    change: 10.0,
    changePercent: 0.31,
    lastUpdated: "2024-07-01T16:00:00Z",
  },
  {
    id: "gseci-2024-07-02",
    indexType: "GSE-CI",
    date: "2024-07-02",
    value: 3215.5,
    change: 15.5,
    changePercent: 0.48,
    lastUpdated: "2024-07-02T16:00:00Z",
  },
  {
    id: "gseci-2024-07-03",
    indexType: "GSE-CI",
    date: "2024-07-03",
    value: 3205.2,
    change: -10.3,
    changePercent: -0.32,
    lastUpdated: "2024-07-03T16:00:00Z",
  },
  {
    id: "gseci-2024-07-04",
    indexType: "GSE-CI",
    date: "2024-07-04",
    value: 3220.8,
    change: 15.6,
    changePercent: 0.49,
    lastUpdated: "2024-07-04T16:00:00Z",
  },
  {
    id: "gseci-2024-07-05",
    indexType: "GSE-CI",
    date: "2024-07-05",
    value: 3245.67,
    change: 24.87,
    changePercent: 0.77,
    lastUpdated: "2024-07-05T16:00:00Z",
  },
  {
    id: "gsefsi-2024-07-01",
    indexType: "GSE-FSI",
    date: "2024-07-01",
    value: 2100.0,
    change: 5.0,
    changePercent: 0.24,
    lastUpdated: "2024-07-01T16:00:00Z",
  },
  {
    id: "gsefsi-2024-07-02",
    indexType: "GSE-FSI",
    date: "2024-07-02",
    value: 2102.5,
    change: 2.5,
    changePercent: 0.12,
    lastUpdated: "2024-07-02T16:00:00Z",
  },
  {
    id: "gsefsi-2024-07-03",
    indexType: "GSE-FSI",
    date: "2024-07-03",
    value: 2098.0,
    change: -4.5,
    changePercent: -0.21,
    lastUpdated: "2024-07-03T16:00:00Z",
  },
  {
    id: "gsefsi-2024-07-04",
    indexType: "GSE-FSI",
    date: "2024-07-04",
    value: 2105.1,
    change: 7.1,
    changePercent: 0.34,
    lastUpdated: "2024-07-04T16:00:00Z",
  },
  {
    id: "gsefsi-2024-07-05",
    indexType: "GSE-FSI",
    date: "2024-07-05",
    value: 2123.45,
    change: 18.35,
    changePercent: 0.87,
    lastUpdated: "2024-07-05T16:00:00Z",
  },
]
// -------------------------------------------------

class ApiService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || ""

  async getSettings(category: string): Promise<ApiResponse> {
    // Mock implementation
    await this.delay(500)

    const mockSettings = {
      general: {
        siteName: "Tesah Capital",
        siteDescription: "Investment Management Company",
        contactEmail: "info@tesahcapital.com",
        phoneNumber: "+233 302 908 640",
        address: "No. 4 Sir Arku Korsah Road, Airport Residential Area, Accra",
        logo: "/images/tesah-logo.png",
        favicon: "/favicon.ico",
      },
      social: {
        facebook: "https://facebook.com/tesahcapital",
        twitter: "https://twitter.com/tesahcapital",
        instagram: "https://instagram.com/tesahcapital",
        linkedin: "https://linkedin.com/company/tesahcapital",
        youtube: "https://youtube.com/tesahcapital",
      },
      security: {
        enableTwoFactor: false,
        passwordExpiry: 90,
        maxLoginAttempts: 5,
        sessionTimeout: 30,
      },
    }

    return {
      success: true,
      data: mockSettings[category as keyof typeof mockSettings] || {},
    }
  }

  async saveSettings(category: string, settings: any): Promise<ApiResponse> {
    // Mock implementation
    await this.delay(1000)

    // In production, save to database
    console.log(`Saving ${category} settings:`, settings)

    return {
      success: true,
      data: settings,
    }
  }

  async getAllPages(): Promise<ApiResponse> {
    // Mock implementation
    await this.delay(500)

    const mockPages = [
      {
        id: "1",
        title: "Custom Landing Page",
        slug: "custom-landing",
        description: "A custom landing page for special campaigns",
        template: "landing",
        status: "published",
        createdAt: "2024-01-15",
      },
      {
        id: "2",
        title: "Product Showcase",
        slug: "product-showcase",
        description: "Showcase of our investment products",
        template: "standard",
        status: "draft",
        createdAt: "2024-01-10",
      },
    ]

    return {
      success: true,
      data: mockPages,
    }
  }

  async savePage(slug: string, pageData: any): Promise<ApiResponse> {
    // Mock implementation
    await this.delay(1000)

    console.log(`Saving page ${slug}:`, pageData)

    return {
      success: true,
      data: { id: Date.now().toString(), ...pageData },
    }
  }

  async getMedia(): Promise<ApiResponse> {
    // Mock implementation
    await this.delay(500)

    const mockMedia = [
      {
        id: "1",
        name: "hero-image.jpg",
        type: "image",
        size: "2.5 MB",
        dimensions: "1920x1080",
        url: "/images/tesah-office-building.jpeg",
        uploadedAt: "2024-01-15",
        usage: [
          { page: "Home", section: "Hero" },
          { page: "About", section: "Banner" },
        ],
      },
      {
        id: "2",
        name: "company-brochure.pdf",
        type: "document",
        size: "1.2 MB",
        url: "/documents/brochure.pdf",
        uploadedAt: "2024-01-10",
        usage: [{ page: "Resources", section: "Downloads" }],
      },
    ]

    return {
      success: true,
      data: mockMedia,
    }
  }

  async uploadMedia(file: File): Promise<ApiResponse> {
    // Mock implementation
    await this.delay(2000)

    console.log(`Uploading file: ${file.name}`)

    return {
      success: true,
      data: {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : "document",
        size: this.formatFileSize(file.size),
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toLocaleDateString(),
        usage: [],
      },
    }
  }

  async deleteMedia(mediaId: string): Promise<ApiResponse> {
    // Mock implementation
    await this.delay(500)

    console.log(`Deleting media: ${mediaId}`)

    return {
      success: true,
    }
  }

  async getMarketDataPoints(): Promise<ApiResponse<MarketDataPoint[]>> {
    const conn = getDbConnection()
    if (!conn) {
      await this.delay(200)
      return { success: true, data: currentMockMarketData }
    }

    try {
      const [rows] = await conn.execute<DbMarketDataPoint[]>(
        `SELECT id, symbol, name, price, \`change\`, change_percent AS changePercent, volume, market_cap AS marketCap, last_updated AS lastUpdated, category FROM market_data_points ORDER BY last_updated DESC`,
      )
      return { success: true, data: rows as MarketDataPoint[] }
    } catch (error: any) {
      console.error("Error fetching market data:", error)
      return { success: false, error: error.message ?? "Failed to fetch market data" }
    }
  }

  async addMarketDataPoint(data: Omit<MarketDataPoint, "id" | "lastUpdated">): Promise<ApiResponse<MarketDataPoint>> {
    const conn = getDbConnection()
    if (!conn) {
      const newItem: MarketDataPoint = {
        id: nanoid(),
        lastUpdated: new Date().toISOString(),
        ...data,
      }
      currentMockMarketData.push(newItem)
      return { success: true, data: newItem }
    }

    try {
      const newId = nanoid()
      await conn.execute(
        `INSERT INTO market_data_points (id, symbol, name, price, \`change\`, change_percent, volume, market_cap, category, last_updated)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          newId,
          data.symbol,
          data.name,
          data.price,
          data.change,
          data.changePercent,
          data.volume,
          data.marketCap,
          data.category,
        ],
      )
      const [rows] = await conn.execute<DbMarketDataPoint[]>(
        `SELECT id, symbol, name, price, \`change\`, change_percent AS changePercent, volume, market_cap AS marketCap, last_updated AS lastUpdated, category FROM market_data_points WHERE id = ?`,
        [newId],
      )
      const newItem = rows[0]
      return { success: true, data: newItem as MarketDataPoint }
    } catch (error: any) {
      console.error("Error adding market data point:", error)
      return { success: false, error: error.message ?? "Failed to add market data point" }
    }
  }

  async updateMarketDataPoint(
    id: string,
    data: Partial<Omit<MarketDataPoint, "id" | "lastUpdated">>,
  ): Promise<ApiResponse<MarketDataPoint>> {
    const conn = getDbConnection()
    if (!conn) {
      await this.delay(1000)
      const index = currentMockMarketData.findIndex((item) => item.id === id)
      if (index === -1) {
        return { success: false, error: "Market data point not found" }
      }
      const updatedItem = {
        ...currentMockMarketData[index],
        ...data,
        lastUpdated: new Date().toISOString(),
      }
      currentMockMarketData[index] = updatedItem
      return { success: true, data: updatedItem }
    }

    try {
      const updateFields: string[] = []
      const updateValues: any[] = []

      for (const key in data) {
        if (data[key as keyof typeof data] !== undefined) {
          const dbKey = key === "changePercent" ? "change_percent" : key === "marketCap" ? "market_cap" : key
          updateFields.push(`\`${dbKey}\` = ?`)
          updateValues.push(data[key as keyof typeof data])
        }
      }
      updateFields.push("last_updated = NOW()")

      if (updateFields.length === 0) {
        return { success: false, error: "No data to update" }
      }

      await conn.execute(`UPDATE market_data_points SET ${updateFields.join(", ")} WHERE id = ?`, [...updateValues, id])

      const [rows] = await conn.execute<DbMarketDataPoint[]>(
        `SELECT id, symbol, name, price, \`change\`, change_percent AS changePercent, volume, market_cap AS marketCap, last_updated AS lastUpdated, category FROM market_data_points WHERE id = ?`,
        [id],
      )
      const updatedItem = rows[0]
      if (!updatedItem) {
        return { success: false, error: "Market data point not found" }
      }
      return { success: true, data: updatedItem as MarketDataPoint }
    } catch (error: any) {
      console.error("Error updating market data point:", error)
      return { success: false, error: error.message ?? "Failed to update market data point" }
    }
  }

  async deleteMarketDataPoint(id: string): Promise<ApiResponse> {
    const conn = getDbConnection()
    if (!conn) {
      await this.delay(500)
      const initialLength = currentMockMarketData.length
      currentMockMarketData = currentMockMarketData.filter((item) => item.id !== id)
      if (currentMockMarketData.length === initialLength) {
        return { success: false, error: "Market data point not found" }
      }
      return { success: true }
    }

    try {
      const result = await conn.execute(`DELETE FROM market_data_points WHERE id = ?`, [id])
      if (result.rowsAffected === 0) {
        return { success: false, error: "Market data point not found" }
      }
      return { success: true }
    } catch (error: any) {
      console.error("Error deleting market data point:", error)
      return { success: false, error: error.message ?? "Failed to delete market data point" }
    }
  }

  async getEconomicIndicators(): Promise<ApiResponse<EconomicIndicator[]>> {
    const conn = getDbConnection()
    if (!conn) {
      await this.delay(500)
      return { success: true, data: currentMockEconomicIndicators }
    }

    try {
      const [rows] = await conn.execute<DbEconomicIndicator[]>(
        `SELECT id, name, value, unit, \`change\`, last_updated AS lastUpdated, category FROM economic_indicators ORDER BY last_updated DESC`,
      )
      return { success: true, data: rows as EconomicIndicator[] }
    } catch (error: any) {
      console.error("Error fetching economic indicators:", error)
      return { success: false, error: error.message ?? "Failed to fetch economic indicators" }
    }
  }

  async addEconomicIndicator(
    data: Omit<EconomicIndicator, "id" | "lastUpdated">,
  ): Promise<ApiResponse<EconomicIndicator>> {
    const conn = getDbConnection()
    if (!conn) {
      await this.delay(1000)
      const newItem: EconomicIndicator = {
        id: nanoid(),
        lastUpdated: new Date().toISOString(),
        ...data,
      }
      currentMockEconomicIndicators.push(newItem)
      return { success: true, data: newItem }
    }

    try {
      const newId = nanoid()
      await conn.execute(
        `INSERT INTO economic_indicators (id, name, value, unit, \`change\`, category, last_updated)
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [newId, data.name, data.value, data.unit, data.change, data.category],
      )
      const [rows] = await conn.execute<DbEconomicIndicator[]>(
        `SELECT id, name, value, unit, \`change\`, last_updated AS lastUpdated, category FROM economic_indicators WHERE id = ?`,
        [newId],
      )
      const newItem = rows[0]
      return { success: true, data: newItem as EconomicIndicator }
    } catch (error: any) {
      console.error("Error adding economic indicator:", error)
      return { success: false, error: error.message ?? "Failed to add economic indicator" }
    }
  }

  async updateEconomicIndicator(
    id: string,
    data: Partial<Omit<EconomicIndicator, "id" | "lastUpdated">>,
  ): Promise<ApiResponse<EconomicIndicator>> {
    const conn = getDbConnection()
    if (!conn) {
      await this.delay(1000)
      const index = currentMockEconomicIndicators.findIndex((item) => item.id === id)
      if (index === -1) {
        return { success: false, error: "Economic indicator not found" }
      }
      const updatedItem = {
        ...currentMockEconomicIndicators[index],
        ...data,
        lastUpdated: new Date().toISOString(),
      }
      currentMockEconomicIndicators[index] = updatedItem
      return { success: true, data: updatedItem }
    }

    try {
      const updateFields: string[] = []
      const updateValues: any[] = []

      for (const key in data) {
        if (data[key as keyof typeof data] !== undefined) {
          const dbKey = key === "change" ? "`change`" : key // Handle 'change' keyword
          updateFields.push(`${dbKey} = ?`)
          updateValues.push(data[key as keyof typeof data])
        }
      }
      updateFields.push("last_updated = NOW()")

      if (updateFields.length === 0) {
        return { success: false, error: "No data to update" }
      }

      await conn.execute(`UPDATE economic_indicators SET ${updateFields.join(", ")} WHERE id = ?`, [
        ...updateValues,
        id,
      ])

      const [rows] = await conn.execute<DbEconomicIndicator[]>(
        `SELECT id, name, value, unit, \`change\`, last_updated AS lastUpdated, category FROM economic_indicators WHERE id = ?`,
        [id],
      )
      const updatedItem = rows[0]
      if (!updatedItem) {
        return { success: false, error: "Economic indicator not found" }
      }
      return { success: true, data: updatedItem as EconomicIndicator }
    } catch (error: any) {
      console.error("Error updating economic indicator:", error)
      return { success: false, error: error.message ?? "Failed to update economic indicator" }
    }
  }

  async deleteEconomicIndicator(id: string): Promise<ApiResponse> {
    const conn = getDbConnection()
    if (!conn) {
      await this.delay(500)
      const initialLength = currentMockEconomicIndicators.length
      currentMockEconomicIndicators = currentMockEconomicIndicators.filter((item) => item.id !== id)
      if (currentMockEconomicIndicators.length === initialLength) {
        return { success: false, error: "Economic indicator not found" }
      }
      return { success: true }
    }

    try {
      const result = await conn.execute(`DELETE FROM economic_indicators WHERE id = ?`, [id])
      if (result.rowsAffected === 0) {
        return { success: false, error: "Economic indicator not found" }
      }
      return { success: true }
    } catch (error: any) {
      console.error("Error deleting economic indicator:", error)
      return { success: false, error: error.message ?? "Failed to delete economic indicator" }
    }
  }

  async getMarketIndexHistory(): Promise<ApiResponse<MarketIndexHistoryPoint[]>> {
    const conn = getDbConnection()
    if (!conn) {
      await this.delay(500)
      return { success: true, data: currentMockMarketIndexHistory }
    }

    try {
      const [rows] = await conn.execute<DbMarketIndexHistoryPoint[]>(
        `SELECT id, index_type AS indexType, date, value, \`change\`, change_percent AS changePercent, last_updated AS lastUpdated FROM market_index_history ORDER BY date DESC`,
      )
      return { success: true, data: rows as MarketIndexHistoryPoint[] }
    } catch (error: any) {
      console.error("Error fetching market index history:", error)
      return { success: false, error: error.message ?? "Failed to fetch market index history" }
    }
  }

  async addMarketIndexHistoryPoint(
    data: Omit<MarketIndexHistoryPoint, "id" | "lastUpdated">,
  ): Promise<ApiResponse<MarketIndexHistoryPoint>> {
    const conn = getDbConnection()
    if (!conn) {
      await this.delay(1000)
      const newItem: MarketIndexHistoryPoint = {
        id: nanoid(),
        lastUpdated: new Date().toISOString(),
        ...data,
      }
      currentMockMarketIndexHistory.push(newItem)
      return { success: true, data: newItem }
    }

    try {
      const newId = nanoid()
      await conn.execute(
        `INSERT INTO market_index_history (id, index_type, date, value, \`change\`, change_percent, last_updated)
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [newId, data.indexType, data.date, data.value, data.change, data.changePercent],
      )
      const [rows] = await conn.execute<DbMarketIndexHistoryPoint[]>(
        `SELECT id, index_type AS indexType, date, value, \`change\`, change_percent AS changePercent, last_updated AS lastUpdated FROM market_index_history WHERE id = ?`,
        [newId],
      )
      const newItem = rows[0]
      return { success: true, data: newItem as MarketDataPoint }
    } catch (error: any) {
      console.error("Error adding market index history point:", error)
      return { success: false, error: error.message ?? "Failed to add market index history point" }
    }
  }

  async updateMarketIndexHistoryPoint(
    id: string,
    data: Partial<Omit<MarketIndexHistoryPoint, "id" | "lastUpdated">>,
  ): Promise<ApiResponse<MarketIndexHistoryPoint>> {
    const conn = getDbConnection()
    if (!conn) {
      await this.delay(1000)
      const index = currentMockMarketIndexHistory.findIndex((item) => item.id === id)
      if (index === -1) {
        return { success: false, error: "Market index history point not found" }
      }
      const updatedItem = {
        ...currentMockMarketIndexHistory[index],
        ...data,
        lastUpdated: new Date().toISOString(),
      }
      currentMockMarketIndexHistory[index] = updatedItem
      return { success: true, data: updatedItem }
    }

    try {
      const updateFields: string[] = []
      const updateValues: any[] = []

      for (const key in data) {
        if (data[key as keyof typeof data] !== undefined) {
          const dbKey =
            key === "indexType"
              ? "index_type"
              : key === "changePercent"
                ? "change_percent"
                : key === "change"
                  ? "`change`"
                  : key
          updateFields.push(`\`${dbKey}\` = ?`)
          updateValues.push(data[key as keyof typeof data])
        }
      }
      updateFields.push("last_updated = NOW()")

      if (updateFields.length === 0) {
        return { success: false, error: "No data to update" }
      }

      await conn.execute(`UPDATE market_index_history SET ${updateFields.join(", ")} WHERE id = ?`, [
        ...updateValues,
        id,
      ])

      const [rows] = await conn.execute<DbMarketIndexHistoryPoint[]>(
        `SELECT id, index_type AS indexType, date, value, \`change\`, change_percent AS changePercent, last_updated AS lastUpdated FROM market_index_history WHERE id = ?`,
        [id],
      )
      const updatedItem = rows[0]
      if (!updatedItem) {
        return { success: false, error: "Market index history point not found" }
      }
      return { success: true, data: updatedItem as MarketIndexHistoryPoint }
    } catch (error: any) {
      console.error("Error updating market index history point:", error)
      return { success: false, error: error.message ?? "Failed to update market index history point" }
    }
  }

  async deleteMarketIndexHistoryPoint(id: string): Promise<ApiResponse> {
    const conn = getDbConnection()
    if (!conn) {
      await this.delay(500)
      const initialLength = currentMockMarketIndexHistory.length
      currentMockMarketIndexHistory = currentMockMarketIndexHistory.filter((item) => item.id !== id)
      if (currentMockMarketIndexHistory.length === initialLength) {
        return { success: false, error: "Market index history point not found" }
      }
      return { success: true }
    }

    try {
      const result = await conn.execute(`DELETE FROM market_index_history WHERE id = ?`, [id])
      if (result.rowsAffected === 0) {
        return { success: false, error: "Market index history point not found" }
      }
      return { success: true }
    } catch (error: any) {
      console.error("Error deleting market index history point:", error)
      return { success: false, error: error.message ?? "Failed to delete market index history point" }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }
}

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"

// Generic fetch function with error handling
export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const url = `${API_URL}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// Public API endpoints
export const publicAPI = {
  // Get market data
  getMarketData: () =>
    apiService.getMarketDataPoints().then((res) => {
      if (!res.success) throw new Error(res.error || "Failed to fetch market data")
      return res.data
    }),

  // Get news items
  getNews: () => fetchAPI("/news"),

  // Get investment products
  getInvestmentProducts: () => fetchAPI("/investment-products"),

  // Submit contact form
  submitContactForm: (data: any) =>
    fetchAPI("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
}

export const apiService = new ApiService()
