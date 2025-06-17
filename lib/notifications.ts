export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  isRead: boolean
  createdAt: Date
}

// Mock notifications - replace with database in production
let notifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    title: "Welcome to Admin Panel",
    message: "You have successfully logged into the admin panel",
    type: "success",
    isRead: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: "2",
    userId: "1",
    title: "System Update",
    message: "The system has been updated to the latest version",
    type: "info",
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
]

export function createNotification(notification: Omit<Notification, "id" | "createdAt">) {
  const newNotification: Notification = {
    ...notification,
    id: Date.now().toString(),
    createdAt: new Date(),
  }

  notifications.unshift(newNotification)

  // Keep only last 100 notifications
  if (notifications.length > 100) {
    notifications = notifications.slice(0, 100)
  }

  return newNotification
}

export function getNotifications(userId: string, limit = 20) {
  return notifications.filter((notification) => notification.userId === userId).slice(0, limit)
}

export function markAsRead(notificationId: string) {
  const notification = notifications.find((n) => n.id === notificationId)
  if (notification) {
    notification.isRead = true
  }
  return notification
}

export function markAllAsRead(userId: string) {
  notifications
    .filter((notification) => notification.userId === userId)
    .forEach((notification) => {
      notification.isRead = true
    })
}

export function deleteNotification(notificationId: string) {
  notifications = notifications.filter((n) => n.id !== notificationId)
}
