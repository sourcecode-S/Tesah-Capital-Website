import Link from "next/link"
import { CalendarIcon, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "News & Updates - Tesah Capital Limited",
  description: "Stay updated with the latest news, market insights, and company updates from Tesah Capital Limited.",
}

export default function NewsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">News & Updates</h1>
              <p className="mt-4 text-white/80 md:text-xl">
                Stay updated with the latest news, market insights, and company updates.
              </p>
            </div>
          </div>
        </section>

        {/* Featured News */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter mb-8">Featured News</h2>
            <div className="grid gap-8 lg:grid-cols-2 items-start">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=500&width=800"
                  alt="Tesah Capital Launches New Investment Fund"
                  className="w-full h-auto object-cover aspect-[16/9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      Press Release
                    </span>
                    <span className="text-xs text-white/80 flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" /> July 15, 2024
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Tesah Capital Launches New Investment Fund Targeting Tech Startups in Africa
                  </h3>
                  <p className="text-white/80 line-clamp-2 mb-4">
                    Tesah Capital Limited has announced the launch of a new investment fund focused on supporting
                    technology startups across Africa, with an initial capital of $50 million.
                  </p>
                  <Button variant="outline" className="w-fit bg-transparent border-white text-white hover:bg-white/10">
                    Read Full Story
                  </Button>
                </div>
              </div>
              <div className="grid gap-6">
                {[
                  {
                    category: "Market Analysis",
                    date: "July 10, 2024",
                    title: "Q2 2024 Market Review: African Markets Show Resilience Amid Global Uncertainty",
                    excerpt:
                      "Our analysis of Q2 2024 shows African markets demonstrating remarkable resilience despite global economic headwinds.",
                    color: "primary",
                  },
                  {
                    category: "Company News",
                    date: "July 5, 2024",
                    title:
                      "Tesah Capital Wins 'Fund Manager of the Year' at the 2024 Ghana Financial Services Excellence Awards",
                    excerpt:
                      "Tesah Capital has been recognized as the 'Fund Manager of the Year' at the prestigious 2024 Ghana Financial Services Excellence Awards.",
                    color: "secondary",
                  },
                  {
                    category: "Investment Insights",
                    date: "June 28, 2024",
                    title: "The Rise of Sustainable Investing in Africa: Opportunities and Challenges",
                    excerpt:
                      "Sustainable investing is gaining momentum across Africa, presenting both opportunities and challenges for investors.",
                    color: "primary",
                  },
                ].map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs bg-${item.color}/10 text-${item.color} px-2 py-1 rounded-full`}>
                          {item.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" /> {item.date}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-muted-foreground line-clamp-2">{item.excerpt}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="ghost" className="p-0 h-auto" asChild>
                        <Link href="#" className="flex items-center text-sm font-medium">
                          Read More <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News Archive */}
        <section className="w-full py-12 md:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold tracking-tighter">News Archive</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select className="appearance-none bg-background border rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>All Categories</option>
                    <option>Press Releases</option>
                    <option>Market Analysis</option>
                    <option>Company News</option>
                    <option>Investment Insights</option>
                  </select>
                  <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 rotate-90 pointer-events-none text-muted-foreground" />
                </div>
                <div className="relative">
                  <select className="appearance-none bg-background border rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Latest First</option>
                    <option>Oldest First</option>
                    <option>A-Z</option>
                    <option>Z-A</option>
                  </select>
                  <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 rotate-90 pointer-events-none text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  category: "Press Release",
                  date: "June 20, 2024",
                  title: "Tesah Capital Expands Operations to Nigeria",
                  excerpt:
                    "Tesah Capital Limited has announced the expansion of its operations to Nigeria, marking a significant milestone in the company's growth strategy.",
                  image: "/placeholder.svg?height=200&width=400",
                  color: "primary",
                },
                {
                  category: "Market Analysis",
                  date: "June 15, 2024",
                  title: "Ghana Stock Exchange Performance: Mid-Year Review",
                  excerpt:
                    "Our analysis of the Ghana Stock Exchange's performance in the first half of 2024 shows promising trends for investors.",
                  image: "/placeholder.svg?height=200&width=400",
                  color: "secondary",
                },
                {
                  category: "Investment Insights",
                  date: "June 10, 2024",
                  title: "The Impact of Digital Currencies on African Economies",
                  excerpt:
                    "Digital currencies are reshaping African economies. Our experts analyze the implications for investors and businesses.",
                  image: "/placeholder.svg?height=200&width=400",
                  color: "primary",
                },
                {
                  category: "Company News",
                  date: "June 5, 2024",
                  title: "Tesah Capital Hosts Annual Investor Conference",
                  excerpt:
                    "Tesah Capital's Annual Investor Conference brought together industry leaders to discuss the future of investing in Africa.",
                  image: "/placeholder.svg?height=200&width=400",
                  color: "secondary",
                },
                {
                  category: "Press Release",
                  date: "May 28, 2024",
                  title: "Tesah Capital Partners with Leading Fintech to Enhance Digital Investment Platform",
                  excerpt:
                    "Tesah Capital has announced a strategic partnership with a leading fintech company to enhance its digital investment platform.",
                  image: "/placeholder.svg?height=200&width=400",
                  color: "primary",
                },
                {
                  category: "Market Analysis",
                  date: "May 20, 2024",
                  title: "Emerging Sectors in African Markets: Where to Invest in 2024",
                  excerpt:
                    "Our research team identifies the most promising sectors for investment in African markets for the remainder of 2024.",
                  image: "/placeholder.svg?height=200&width=400",
                  color: "secondary",
                },
              ].map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs bg-${item.color === "primary" ? "primary" : "secondary"}/10 text-${
                          item.color === "primary" ? "primary" : "secondary"
                        } px-2 py-1 rounded-full`}
                      >
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" /> {item.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground line-clamp-3">{item.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="ghost" className="p-0 h-auto" asChild>
                      <Link href="#" className="flex items-center text-sm font-medium">
                        Read More <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  4
                </Button>
                <Button variant="outline" size="sm">
                  5
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Stay Updated</h2>
                <p className="text-secondary-foreground/80 md:text-lg">
                  Subscribe to our newsletter to receive the latest news, market insights, and investment opportunities
                  directly in your inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">Subscribe Now</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
