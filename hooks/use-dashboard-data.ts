"use client"

import { useState, useEffect, useCallback } from "react"
import {
  apiService,
  type MarketDataPoint,
  type EconomicIndicator,
  type MarketIndexHistoryPoint,
} from "@/lib/api-service"
import { getActivityLogs, type ActivityLog } from "@/lib/activity-logger"
import { getNotifications, type Notification } from "@/lib/notifications"

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalSessions: number
  systemHealth: number
  securityScore: number
  recentActivitiesCount: number
  totalRevenue: number
  subscriptions: number
  sales: number
  activeNow: number
}

interface DashboardData {
  stats: DashboardStats
  recentActivities: ActivityLog[]
  recentNotifications: Notification[]
  marketData: MarketDataPoint[]
  economicIndicators: EconomicIndicator[]
  marketIndexHistory: MarketIndexHistoryPoint[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useDashboardData(userId: string | null): DashboardData {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalSessions: 0,
    systemHealth: 0,
    securityScore: 0,
    recentActivitiesCount: 0,
    totalRevenue: 0,
    subscriptions: 0,
    sales: 0,
    activeNow: 0,
  })
  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([])
  const [recentNotifications, setRecentNotifications] = useState<Notification[]>([])
  const [marketData, setMarketData] = useState<MarketDataPoint[]>([])
  const [economicIndicators, setEconomicIndicators] = useState<EconomicIndicator[]>([])
  const [marketIndexHistory, setMarketIndexHistory] = useState<MarketIndexHistoryPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulate fetching general stats (these are still mocked in api-service for now)
      const mockStats = {
        totalUsers: 156,
        activeUsers: 23,
        totalSessions: 1247,
        systemHealth: 98,
        securityScore: 95,
        recentActivitiesCount: 42,
        totalRevenue: 45231.89,
        subscriptions: 2350,
        sales: 12234,
        activeNow: 573,
      }
      setStats(mockStats)

      // Fetch activity logs from the updated service
      const activities = await getActivityLogs(5)
      setRecentActivities(activities)

      // Fetch notifications from the updated service
      if (userId) {
        const notifications = await getNotifications(userId, 3)
        setRecentNotifications(notifications)
      }

      // Fetch market data from apiService
      const marketRes = await apiService.getMarketDataPoints()
      if (marketRes.success && marketRes.data) {
        setMarketData(marketRes.data)
      } else {
        throw new Error(marketRes.error || "Failed to fetch market data")
      }

      // Fetch economic indicators from apiService
      const indicatorRes = await apiService.getEconomicIndicators()
      if (indicatorRes.success && indicatorRes.data) {
        setEconomicIndicators(indicatorRes.data)
      } else {
        throw new Error(indicatorRes.error || "Failed to fetch economic indicators")
      }

      // Fetch market index history from apiService
      const indexHistoryRes = await apiService.getMarketIndexHistory()
      if (indexHistoryRes.success && indexHistoryRes.data) {
        setMarketIndexHistory(indexHistoryRes.data)
      } else {
        throw new Error(indexHistoryRes.error || "Failed to fetch index history")
      }
    } catch (err: any) {
      console.error("Failed to fetch dashboard data:", err)
      setError(err.message || "Failed to load dashboard data.")
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    stats,
    recentActivities,
    recentNotifications,
    marketData,
    economicIndicators,
    marketIndexHistory,
    isLoading,
    error,
    refetch: fetchData,
  }
}
