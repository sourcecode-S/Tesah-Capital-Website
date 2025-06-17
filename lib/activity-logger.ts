interface ActivityLog {
  id: string
  timestamp: string
  userId: string
  action: string
  details: string
}

// Mock storage for activity logs
const activityLogs: ActivityLog[] = []

interface LogActivityParams {
  userId: string
  action: string
  details: string
}

export async function logActivity({ userId, action, details }: LogActivityParams): Promise<ActivityLog> {
  const log: ActivityLog = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    userId,
    action,
    details,
  }

  // In a real application, this would be stored in a database
  activityLogs.push(log)

  return log
}

export async function getActivityLogs(limit = 100): Promise<ActivityLog[]> {
  // In a real application, this would fetch from a database with pagination
  return [...activityLogs]
    .sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })
    .slice(0, limit)
}

export async function getUserActivityLogs(userId: string, limit = 100): Promise<ActivityLog[]> {
  // In a real application, this would fetch from a database with filtering and pagination
  return [...activityLogs]
    .filter((log) => log.userId === userId)
    .sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })
    .slice(0, limit)
}

export async function clearActivityLogs(): Promise<void> {
  // In a real application, this would clear logs from a database
  activityLogs.length = 0
}
