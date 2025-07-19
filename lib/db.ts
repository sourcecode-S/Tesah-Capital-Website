import type { Column } from "kysely"

// Define your database schema here
interface MarketDataPointsTable {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  change_percent: number
  volume: number
  market_cap: number | null
  last_updated: Column.Timestamp
  category: "stocks" | "bonds" | "commodities" | "currencies"
}

interface EconomicIndicatorsTable {
  id: string
  name: string
  value: number
  unit: string
  change: number
  last_updated: Column.Timestamp
  category: "inflation" | "gdp" | "interest_rates" | "employment"
}

interface MarketIndexHistoryTable {
  id: string
  index_type: "GSE-CI" | "GSE-FSI"
  date: string // YYYY-MM-DD
  value: number
  change: number
  change_percent: number
  last_updated: Column.Timestamp
}

export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  role: "admin" | "editor" | "viewer"
  is_active: boolean
  last_login: Column.Timestamp | null
  created_at: Column.Timestamp
  updated_at: Column.Timestamp
}

export type NewUser = Omit<User, "id" | "created_at" | "updated_at" | "last_login"> & {
  password_hash: string // Ensure password_hash is required for new user creation
}

export type UserUpdate = Partial<Omit<User, "id" | "created_at" | "updated_at">> & {
  password_hash?: string // Allow updating password hash
}

export interface Setting {
  id: string
  key: string
  value: string | null
  category: string
  last_updated: Column.Timestamp
}

interface DatabaseSchema {
  market_data_points: MarketDataPointsTable
  economic_indicators: EconomicIndicatorsTable
  market_index_history: MarketIndexHistoryTable
  users: User
  settings: Setting
}

// No database connection, always return null for mock data usage
export function getDbConnection() {
  console.warn("DATABASE_URL is not set. Using mock data for database operations.")
  return null
}

// No direct SQL connection
export const sql = null
