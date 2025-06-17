// Mock API service for demo purposes
// In production, replace with actual API calls

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

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

  private async delay(ms: number): Promise<void> {
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
  getMarketData: () => fetchAPI("/market-data"),

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
