import type {
  MarketDataPoint,
  EconomicIndicator,
  MarketIndexHistoryPoint,
  SlideshowItem,
  JobApplication,
  CareerPosition,
  PageContent,
  TeamMember,
  MediaItem,
} from "./types"

// Mock data for demonstration purposes
const mockMarketDataPoints: MarketDataPoint[] = [
  {
    id: "1",
    symbol: "GSE-CI",
    name: "GSE Composite Index",
    price: 2800.5,
    change: 15.2,
    changePercent: 0.55,
    volume: 1200000,
    marketCap: 65000000000,
    lastUpdated: new Date().toISOString(),
    category: "stocks",
  },
  {
    id: "2",
    symbol: "GSE-FSI",
    name: "GSE Financial Stock Index",
    price: 2200.1,
    change: 8.5,
    changePercent: 0.39,
    volume: 800000,
    marketCap: 40000000000,
    lastUpdated: new Date().toISOString(),
    category: "stocks",
  },
  {
    id: "3",
    symbol: "MTNGH",
    name: "MTN Ghana",
    price: 1.25,
    change: 0.02,
    changePercent: 1.63,
    volume: 500000,
    marketCap: 15000000000,
    lastUpdated: new Date().toISOString(),
    category: "stocks",
  },
  {
    id: "4",
    symbol: "EGH",
    name: "Ecobank Ghana",
    price: 7.8,
    change: -0.1,
    changePercent: -1.27,
    volume: 150000,
    marketCap: 8000000000,
    lastUpdated: new Date().toISOString(),
    category: "stocks",
  },
  {
    id: "5",
    symbol: "GOIL",
    name: "GOIL Company Ltd",
    price: 2.5,
    change: 0.05,
    changePercent: 2.04,
    volume: 80000,
    marketCap: 2500000000,
    lastUpdated: new Date().toISOString(),
    category: "stocks",
  },
  {
    id: "6",
    symbol: "GCB",
    name: "GCB Bank PLC",
    price: 4.1,
    change: 0.01,
    changePercent: 0.24,
    volume: 100000,
    marketCap: 4500000000,
    lastUpdated: new Date().toISOString(),
    category: "stocks",
  },
  {
    id: "7",
    symbol: "GHS/USD",
    name: "Ghana Cedi to US Dollar",
    price: 14.5,
    change: 0.05,
    changePercent: 0.35,
    volume: 0,
    marketCap: null,
    lastUpdated: new Date().toISOString(),
    category: "currencies",
  },
  {
    id: "8",
    symbol: "GOLD",
    name: "Gold Futures",
    price: 2350.0,
    change: -5.0,
    changePercent: -0.21,
    volume: 25000,
    marketCap: null,
    lastUpdated: new Date().toISOString(),
    category: "commodities",
  },
]

const mockEconomicIndicators: EconomicIndicator[] = [
  {
    id: "1",
    name: "Inflation Rate (YoY)",
    value: 23.1,
    unit: "%",
    change: -1.5,
    lastUpdated: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    category: "inflation",
  },
  {
    id: "2",
    name: "GDP Growth Rate (QoQ)",
    value: 3.2,
    unit: "%",
    change: 0.1,
    lastUpdated: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    category: "gdp",
  },
  {
    id: "3",
    name: "Policy Rate",
    value: 29.0,
    unit: "%",
    change: 0.0,
    lastUpdated: new Date(Date.now() - 86400000 * 15).toISOString(), // 15 days ago
    category: "interest_rates",
  },
  {
    id: "4",
    name: "Unemployment Rate",
    value: 13.9,
    unit: "%",
    change: -0.2,
    lastUpdated: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    category: "employment",
  },
]

// Generate more realistic and varied mock data for market index history
const generateMockMarketIndexHistory = (): MarketIndexHistoryPoint[] => {
  const history: MarketIndexHistoryPoint[] = []
  const today = new Date()

  // Generate data for the last 365 days
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const dateString = date.toISOString().split("T")[0]

    // GSE-CI: Start around 2500 and fluctuate
    const gseCiValue = 2500 + Math.sin(i / 10) * 200 + Math.random() * 50 - 25
    const gseCiPrevValue =
      history.find(
        (item) =>
          item.date === new Date(date.setDate(date.getDate() - 1)).toISOString().split("T")[0] &&
          item.indexType === "GSE-CI",
      )?.value || 2500
    const gseCiChange = gseCiValue - gseCiPrevValue
    const gseCiChangePercent = (gseCiChange / gseCiPrevValue) * 100

    history.push({
      id: `gse-ci-${i}`,
      indexType: "GSE-CI",
      date: dateString,
      value: Number.parseFloat(gseCiValue.toFixed(2)),
      change: Number.parseFloat(gseCiChange.toFixed(2)),
      changePercent: Number.parseFloat(gseCiChangePercent.toFixed(2)),
      lastUpdated: date.toISOString(),
    })

    // GSE-FSI: Start around 2000 and fluctuate differently
    const gseFsiValue = 2000 + Math.cos(i / 15) * 150 + Math.random() * 40 - 20
    const gseFsiPrevValue =
      history.find(
        (item) =>
          item.date === new Date(date.setDate(date.getDate() - 1)).toISOString().split("T")[0] &&
          item.indexType === "GSE-FSI",
      )?.value || 2000
    const gseFsiChange = gseFsiValue - gseFsiPrevValue
    const gseFsiChangePercent = (gseFsiChange / gseFsiPrevValue) * 100

    history.push({
      id: `gse-fsi-${i}`,
      indexType: "GSE-FSI",
      date: dateString,
      value: Number.parseFloat(gseFsiValue.toFixed(2)),
      change: Number.parseFloat(gseFsiChange.toFixed(2)),
      changePercent: Number.parseFloat(gseFsiChangePercent.toFixed(2)),
      lastUpdated: date.toISOString(),
    })
  }
  return history
}

const mockMarketIndexHistory: MarketIndexHistoryPoint[] = generateMockMarketIndexHistory()

const mockSlideshowItems: SlideshowItem[] = [
  {
    id: "1",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Slide 1",
    title: "Welcome to Tesah Capital",
    description: "Your trusted partner in wealth management.",
    link: "/about",
    isActive: true,
    order: 1,
  },
  {
    id: "2",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Slide 2",
    title: "Explore Our Investment Products",
    description: "Diversify your portfolio with our tailored solutions.",
    link: "/investment-products",
    isActive: true,
    order: 2,
  },
  {
    id: "3",
    imageUrl: "/placeholder.svg?height=400&width=800&text=Slide 3",
    title: "Join Our Team",
    description: "Discover exciting career opportunities at Tesah Capital.",
    link: "/join-tesah",
    isActive: false,
    order: 3,
  },
]

const mockJobApplications: JobApplication[] = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    position: "Financial Analyst",
    resumeUrl: "/placeholder.svg?height=100&width=100&text=resume1.pdf",
    coverLetterUrl: "/placeholder.svg?height=100&width=100&text=coverletter1.pdf",
    submittedAt: new Date().toISOString(),
    status: "Pending",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    position: "Investment Advisor",
    resumeUrl: "/placeholder.svg?height=100&width=100&text=resume2.pdf",
    coverLetterUrl: "/placeholder.svg?height=100&width=100&text=coverletter2.pdf",
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    status: "Reviewed",
  },
]

const mockCareerPositions: CareerPosition[] = [
  {
    id: "1",
    title: "Financial Analyst",
    location: "Accra, Ghana",
    department: "Investments",
    description: "Analyze financial data and provide insights.",
    requirements: ["Bachelor's degree in Finance", "2+ years experience"],
    responsibilities: ["Conduct market research", "Prepare financial reports"],
    postedDate: new Date(Date.now() - 86400000 * 30).toISOString(), // 30 days ago
    status: "Open",
  },
  {
    id: "2",
    title: "Investment Advisor",
    location: "Kumasi, Ghana",
    department: "Wealth Management",
    description: "Advise clients on investment strategies.",
    requirements: ["CFA certification", "5+ years experience"],
    responsibilities: ["Client portfolio management", "Financial planning"],
    postedDate: new Date(Date.now() - 86400000 * 60).toISOString(), // 60 days ago
    status: "Open",
  },
  {
    id: "3",
    title: "Marketing Specialist",
    location: "Accra, Ghana",
    department: "Marketing",
    description: "Develop and implement marketing campaigns.",
    requirements: ["Bachelor's degree in Marketing", "3+ years experience"],
    responsibilities: ["Social media management", "Content creation"],
    postedDate: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    status: "Closed",
  },
]

const mockPageContent: PageContent[] = [
  {
    id: "home",
    slug: "home",
    title: "Home Page",
    content: "<p>Welcome to Tesah Capital. Your partner in financial growth.</p>",
    lastModified: new Date().toISOString(),
  },
  {
    id: "about",
    slug: "about",
    title: "About Us",
    content: "<p>Learn more about Tesah Capital and our mission.</p>",
    lastModified: new Date().toISOString(),
  },
  {
    id: "contact",
    slug: "contact",
    title: "Contact Us",
    content: "<p>Get in touch with our team.</p>",
    lastModified: new Date().toISOString(),
  },
]

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Kenneth Tesah",
    title: "Chief Executive Officer",
    bio: "Kenneth Tesah is the visionary leader behind Tesah Capital, driving its strategic direction and growth. With over 20 years of experience in the financial sector, he has a deep understanding of market dynamics and a proven track record of success. His leadership is instrumental in fostering a culture of excellence and client-centricity within the firm.",
    imageUrl: "/images/team/kenneth-tesah.png",
    socialLinks: {
      linkedin: "https://linkedin.com/in/kennethtesah",
      twitter: "https://twitter.com/kennethtesah",
    },
  },
  {
    id: "2",
    name: "Joshua Tesah",
    title: "Chief Investment Officer",
    bio: "Joshua Tesah oversees all investment strategies and portfolio management at Tesah Capital. His expertise in quantitative analysis and risk management ensures optimal returns for clients. He is passionate about identifying emerging market opportunities and leveraging innovative approaches to investment.",
    imageUrl: "/images/team/joshua-tesah.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/joshuatesah",
    },
  },
  {
    id: "3",
    name: "Eleanor Mensah",
    title: "Head of Wealth Management",
    bio: "Eleanor Mensah leads the wealth management division, providing personalized financial planning and advisory services to high-net-worth individuals and families. She is dedicated to building long-term relationships based on trust and understanding client's unique financial goals.",
    imageUrl: "/images/team/eleanor.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/eleanormensah",
    },
  },
  {
    id: "4",
    name: "Okofo Dartey",
    title: "Head of Research",
    bio: "Okofo Dartey is responsible for all market research and economic analysis, providing critical insights that inform Tesah Capital's investment decisions. His rigorous approach to data analysis and forecasting helps the team navigate complex market conditions.",
    imageUrl: "/images/team/okofo.jpeg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/okofodartey",
    },
  },
]

const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    url: "/placeholder.svg?height=200&width=300&text=Image 1",
    altText: "Placeholder Image 1",
    type: "image",
    uploadedAt: new Date().toISOString(),
  },
  {
    id: "2",
    url: "/placeholder.svg?height=200&width=300&text=Image 2",
    altText: "Placeholder Image 2",
    type: "image",
    uploadedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "3",
    url: "/placeholder.svg?height=200&width=300&text=Document 1",
    altText: "Placeholder Document 1",
    type: "document",
    uploadedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
]

export const apiService = {
  // Market Data
  getMarketDataPoints: async (): Promise<{ success: boolean; data?: MarketDataPoint[] }> => {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
    return { success: true, data: mockMarketDataPoints }
  },
  getEconomicIndicators: async (): Promise<{ success: boolean; data?: EconomicIndicator[] }> => {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
    return { success: true, data: mockEconomicIndicators }
  },
  getMarketIndexHistory: async (): Promise<{ success: boolean; data?: MarketIndexHistoryPoint[] }> => {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
    return { success: true, data: mockMarketIndexHistory }
  },
  addMarketDataPoint: async (
    data: Omit<MarketDataPoint, "id" | "lastUpdated">,
  ): Promise<{ success: boolean; data?: MarketDataPoint; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newPoint: MarketDataPoint = {
      id: (mockMarketDataPoints.length + 1).toString(),
      lastUpdated: new Date().toISOString(),
      ...data,
    }
    mockMarketDataPoints.push(newPoint)
    return { success: true, data: newPoint }
  },
  updateMarketDataPoint: async (
    id: string,
    data: Partial<Omit<MarketDataPoint, "id" | "lastUpdated">>,
  ): Promise<{ success: boolean; data?: MarketDataPoint; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockMarketDataPoints.findIndex((p) => p.id === id)
    if (index !== -1) {
      mockMarketDataPoints[index] = {
        ...mockMarketDataPoints[index],
        ...data,
        lastUpdated: new Date().toISOString(),
      }
      return { success: true, data: mockMarketDataPoints[index] }
    }
    return { success: false, error: "Market data point not found" }
  },
  deleteMarketDataPoint: async (id: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const initialLength = mockMarketDataPoints.length
    const newLength = mockMarketDataPoints.filter((p) => p.id !== id).length
    if (newLength < initialLength) {
      return { success: true }
    }
    return { success: false, error: "Market data point not found" }
  },

  // Slideshow
  getSlideshowItems: async (): Promise<{ success: boolean; data?: SlideshowItem[] }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true, data: mockSlideshowItems.sort((a, b) => a.order - b.order) }
  },
  addSlideshowItem: async (
    item: Omit<SlideshowItem, "id">,
  ): Promise<{ success: boolean; data?: SlideshowItem; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newItem: SlideshowItem = {
      id: (mockSlideshowItems.length + 1).toString(),
      ...item,
    }
    mockSlideshowItems.push(newItem)
    return { success: true, data: newItem }
  },
  updateSlideshowItem: async (
    id: string,
    updates: Partial<SlideshowItem>,
  ): Promise<{ success: boolean; data?: SlideshowItem; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockSlideshowItems.findIndex((item) => item.id === id)
    if (index !== -1) {
      mockSlideshowItems[index] = { ...mockSlideshowItems[index], ...updates }
      return { success: true, data: mockSlideshowItems[index] }
    }
    return { success: false, error: "Slideshow item not found" }
  },
  deleteSlideshowItem: async (id: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const initialLength = mockSlideshowItems.length
    const newLength = mockSlideshowItems.filter((item) => item.id !== id).length
    if (newLength < initialLength) {
      return { success: true }
    }
    return { success: false, error: "Slideshow item not found" }
  },

  // Job Applications
  getJobApplications: async (): Promise<{ success: boolean; data?: JobApplication[] }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true, data: mockJobApplications }
  },
  addJobApplication: async (
    application: Omit<JobApplication, "id" | "submittedAt" | "status">,
  ): Promise<{ success: boolean; data?: JobApplication; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newApplication: JobApplication = {
      id: (mockJobApplications.length + 1).toString(),
      submittedAt: new Date().toISOString(),
      status: "Pending",
      ...application,
    }
    mockJobApplications.push(newApplication)
    return { success: true, data: newApplication }
  },
  updateJobApplicationStatus: async (
    id: string,
    status: "Pending" | "Reviewed" | "Interviewed" | "Rejected" | "Hired",
  ): Promise<{ success: boolean; data?: JobApplication; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockJobApplications.findIndex((app) => app.id === id)
    if (index !== -1) {
      mockJobApplications[index].status = status
      return { success: true, data: mockJobApplications[index] }
    }
    return { success: false, error: "Job application not found" }
  },
  deleteJobApplication: async (id: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const initialLength = mockJobApplications.length
    const newLength = mockJobApplications.filter((app) => app.id !== id).length
    if (newLength < initialLength) {
      return { success: true }
    }
    return { success: false, error: "Job application not found" }
  },

  // Career Positions
  getCareerPositions: async (): Promise<{ success: boolean; data?: CareerPosition[] }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true, data: mockCareerPositions }
  },
  addCareerPosition: async (
    position: Omit<CareerPosition, "id" | "postedDate">,
  ): Promise<{ success: boolean; data?: CareerPosition; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newPosition: CareerPosition = {
      id: (mockCareerPositions.length + 1).toString(),
      postedDate: new Date().toISOString(),
      ...position,
    }
    mockCareerPositions.push(newPosition)
    return { success: true, data: newPosition }
  },
  updateCareerPosition: async (
    id: string,
    updates: Partial<Omit<CareerPosition, "id" | "postedDate">>,
  ): Promise<{ success: boolean; data?: CareerPosition; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockCareerPositions.findIndex((pos) => pos.id === id)
    if (index !== -1) {
      mockCareerPositions[index] = { ...mockCareerPositions[index], ...updates }
      return { success: true, data: mockCareerPositions[index] }
    }
    return { success: false, error: "Career position not found" }
  },
  deleteCareerPosition: async (id: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const initialLength = mockCareerPositions.length
    const newLength = mockCareerPositions.filter((pos) => pos.id !== id).length
    if (newLength < initialLength) {
      return { success: true }
    }
    return { success: false, error: "Career position not found" }
  },

  // Page Content
  getPageContent: async (slug: string): Promise<{ success: boolean; data?: PageContent; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const content = mockPageContent.find((p) => p.slug === slug)
    if (content) {
      return { success: true, data: content }
    }
    return { success: false, error: "Page content not found" }
  },
  updatePageContent: async (
    slug: string,
    content: string,
  ): Promise<{ success: boolean; data?: PageContent; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockPageContent.findIndex((p) => p.slug === slug)
    if (index !== -1) {
      mockPageContent[index].content = content
      mockPageContent[index].lastModified = new Date().toISOString()
      return { success: true, data: mockPageContent[index] }
    }
    return { success: false, error: "Page content not found" }
  },

  // Team Members
  getTeamMembers: async (): Promise<{ success: boolean; data?: TeamMember[] }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true, data: mockTeamMembers }
  },
  updateTeamMember: async (
    id: string,
    updates: Partial<Omit<TeamMember, "id">>,
  ): Promise<{ success: boolean; data?: TeamMember; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockTeamMembers.findIndex((member) => member.id === id)
    if (index !== -1) {
      mockTeamMembers[index] = { ...mockTeamMembers[index], ...updates }
      return { success: true, data: mockTeamMembers[index] }
    }
    return { success: false, error: "Team member not found" }
  },

  // Media Items
  getMediaItems: async (): Promise<{ success: boolean; data?: MediaItem[] }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true, data: mockMediaItems }
  },
  addMediaItem: async (
    item: Omit<MediaItem, "id" | "uploadedAt">,
  ): Promise<{ success: boolean; data?: MediaItem; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newItem: MediaItem = {
      id: (mockMediaItems.length + 1).toString(),
      uploadedAt: new Date().toISOString(),
      ...item,
    }
    mockMediaItems.push(newItem)
    return { success: true, data: newItem }
  },
  deleteMediaItem: async (id: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const initialLength = mockMediaItems.length
    const newLength = mockMediaItems.filter((item) => item.id !== id).length
    if (newLength < initialLength) {
      return { success: true }
    }
    return { success: false, error: "Media item not found" }
  },
}
