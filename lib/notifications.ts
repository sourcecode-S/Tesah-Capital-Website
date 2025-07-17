// This is a mock notification service. In a real application, you would integrate with a notification system (e.g., email, push notifications).

interface Notification {
  id: string
  timestamp: Date
  type: "success" | "error" | "info" | "warning"
  message: string
  read: boolean
  userId?: string // Optional, for user-specific notifications
}

const notifications: Notification[] = []

export const sendNotification = (type: Notification["type"], message: string, userId?: string): Notification => {
  const newNotification: Notification = {
    id: Date.now().toString(), // Simple ID for mock
    timestamp: new Date(),
    type,
    message,
    read: false,
    userId,
  }
  notifications.push(newNotification)
  console.log("Notification Sent:", newNotification)
  return newNotification
}

export const getNotifications = async (userId?: string, unreadOnly = false): Promise<Notification[]> => {
  // Simulate async fetch
  await new Promise((resolve) => setTimeout(resolve, 200))
  const filteredNotifications = notifications.filter(
    (n) => (userId ? n.userId === userId : true) && (unreadOnly ? !n.read : true),
  )
  return filteredNotifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export const markNotificationAsRead = async (id: string): Promise<boolean> => {
  // Simulate async update
  await new Promise((resolve) => setTimeout(resolve, 100))
  const notification = notifications.find((n) => n.id === id)
  if (notification) {
    notification.read = true
    console.log(`Notification ${id} marked as read.`)
    return true
  }
  return false
}
