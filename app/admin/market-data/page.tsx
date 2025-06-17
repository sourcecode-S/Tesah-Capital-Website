import { logActivity } from "@/lib/activity-logger"
import type { Metadata } from "next"
import MarketData from "./MarketData"

export const metadata: Metadata = {
  title: "Market Data | Admin",
}

async function getData() {
  // Simulate fetching market data (replace with actual data fetching)
  const marketData = {
    BTC: { price: 60000, volume: 1000 },
    ETH: { price: 3000, volume: 500 },
    LTC: { price: 150, volume: 2000 },
  }

  // Simulate fetching user activity (replace with actual data fetching)
  const userActivity = [
    { userId: "user1", action: "buy", asset: "BTC", quantity: 0.1 },
    { userId: "user2", action: "sell", asset: "ETH", quantity: 0.5 },
  ]

  return { marketData, userActivity }
}

export default async function MarketDataPage() {
  const { marketData, userActivity } = await getData()

  logActivity({
    userId: "admin",
    action: "view",
    details: "Accessed market data page",
  })

  return (
    <div>
      <h1>Market Data</h1>
      <MarketData marketData={marketData} userActivity={userActivity} />
    </div>
  )
}
