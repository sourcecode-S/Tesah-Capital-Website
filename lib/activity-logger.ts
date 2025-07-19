import { getDbConnection, type ActivityLog as DbActivityLog } from "@/lib/db"
import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 12)

interface ActivityLog {
  id: string
  timestamp: Date
  userId: string
  userName: string
  action: string
  resource?: string
  severity?: string
  details?: Record<string, any>
}

const activityLogs: ActivityLog[] = []

export const logActivity = (
  userId: string,
  userName: string,
  action: string,
  resource?: string,
  severity?: string,
  details?: Record<string, any>,
) => {
  const newLog: ActivityLog = {
    id: Date.now().toString(), // Simple ID for mock
    timestamp: new Date(),
    userId,
    userName,
    action,
    resource,
    severity,
    details,
  }
  activityLogs.push(newLog)
  console.log("Activity Logged:", newLog)
}

export const getRecentActivities = async (limit = 10): Promise<ActivityLog[]> => {
  // Simulate async fetch
  await new Promise((resolve) => setTimeout(resolve, 300))
  return activityLogs.slice(-limit).reverse() // Return most recent logs
}

// Mock activity logs (used if DB is not connected)
let mockActivityLogs: ActivityLog[] = []

export async function logActivityToDb(log: Omit<ActivityLog, "id" | "timestamp">): Promise<ActivityLog> {
  const newLog: ActivityLog = {
    id: nanoid(),
    timestamp: new Date(),
    ...log,
  }

  const conn = getDbConnection()
  if (!conn) {
    mockActivityLogs.unshift(newLog)
    // Keep only last 100 logs in mock
    if (mockActivityLogs.length > 100) {
      mockActivityLogs = mockActivityLogs.slice(0, 100)
    }
    return newLog
  }

  try {
    await conn.execute(
      `INSERT INTO activity_logs (id, action, resource, user_name, user_id, timestamp, severity, details)
       VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)`,
      [
        newLog.id,
        newLog.action,
        newLog.resource,
        newLog.userName,
        newLog.userId,
        newLog.severity,
        JSON.stringify(newLog.details) || null,
      ],
    )
    const [rows] = await conn.execute<DbActivityLog[]>(
      `SELECT id, action, resource, user_name AS userName, user_id AS userId, timestamp, severity, details FROM activity_logs WHERE id = ?`,
      [newLog.id],
    )
    const insertedLog = rows[0]
    return insertedLog as ActivityLog
  } catch (error) {
    console.error("Error logging activity to DB:", error)
    // Fallback to mock if DB logging fails
    mockActivityLogs.unshift(newLog)
    if (mockActivityLogs.length > 100) {
      mockActivityLogs = mockActivityLogs.slice(0, 100)
    }
    return newLog
  }
}

export async function getActivityLogsFromDb(limit = 50): Promise<ActivityLog[]> {
  const conn = getDbConnection()
  if (!conn) {
    return [...mockActivityLogs].slice(0, limit)
  }

  try {
    const [rows] = await conn.execute<DbActivityLog[]>(
      `
      SELECT id, action, resource, user_name AS userName, user_id AS userId, timestamp, severity, details
      FROM activity_logs
      ORDER BY timestamp DESC
      LIMIT ?
    `,
      [limit],
    )
    return rows.map((row) => ({
      ...row,
      timestamp: new Date(row.timestamp),
      details: row.details ? JSON.parse(row.details) : null,
    })) as ActivityLog[]
  } catch (error) {
    console.error("Error fetching activity logs from DB:", error)
    return [...mockActivityLogs].slice(0, limit) // Fallback to mock
  }
}

// Alias for legacy import paths — keeps older code working
export const getActivityLogs = getActivityLogsFromDb
