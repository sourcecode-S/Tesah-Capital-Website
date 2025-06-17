// Mock user data
export const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@tesahcapital.com",
    role: "admin",
    permissions: ["manage_content", "manage_users", "view_analytics", "manage_settings"],
  },
  {
    id: "2",
    name: "Editor User",
    email: "editor@tesahcapital.com",
    role: "editor",
    permissions: ["manage_content"],
  },
  {
    id: "3",
    name: "Viewer User",
    email: "viewer@tesahcapital.com",
    role: "viewer",
    permissions: ["view_analytics"],
  },
]

// Auth options for NextAuth
export const authOptions = {
  providers: [
    // This is a mock provider since we're not implementing real auth
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Mock authentication logic
        if (credentials?.email && credentials?.password === "password") {
          const user = users.find((user) => user.email === credentials.email)
          if (user) {
            return user
          }
        }
        return null
      },
    },
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.permissions = user.permissions
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.permissions = token.permissions
      }
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/auth-error",
  },
  secret: "your-secret-key",
}

// Permission check function
export function hasPermission(user: any, permission: string): boolean {
  if (!user || !user.permissions) {
    return false
  }

  return user.permissions.includes(permission)
}
