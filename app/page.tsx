"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Slideshow } from "@/components/slideshow"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white text-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-8">
              {/* Full logo centered at the top of the hero section */}
              <div className="w-full max-w-3xl mx-auto">
                <Image
                  src="/images/tesah-capital-full-logo.png"
                  alt="Tesah Capital"
                  width={1140}
                  height={308}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Text content centered below the logo */}
              <div className="text-center max-w-3xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-secondary">
                  Your Investment Gateway to Africa
                </h1>
                <p className="text-secondary/80 md:text-xl">
                  Tesah Capital Limited provides expert fund management services to pension trustees, financial
                  institutions, corporates, and individuals since 2010.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white" asChild>
                    <Link href="/client-portal">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-secondary text-secondary hover:bg-secondary/10"
                    asChild
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slideshow Section */}
        <section className="w-full py-0 bg-background">
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-lg shadow-lg border">
              <Slideshow />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                <span className="text-3xl md:text-4xl font-bold text-secondary">$1B+</span>
                <span className="text-sm text-center text-muted-foreground">Assets Under Management</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                <span className="text-3xl md:text-4xl font-bold text-primary">14+</span>
                <span className="text-sm text-center text-muted-foreground">Years of Experience</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                <span className="text-3xl md:text-4xl font-bold text-secondary">5,200+</span>
                <span className="text-sm text-center text-muted-foreground">Satisfied Clients</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                <span className="text-3xl md:text-4xl font-bold text-primary">18.7%</span>
                <span className="text-sm text-center text-muted-foreground">Average Annual Return</span>
              </div>
            </div>
          </div>
        </section>

        {/* Market Update Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter mb-6">Latest Market Updates</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">Ghana</span>
                    <span className="text-sm text-muted-foreground">June 15, 2024</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Ghana Stock Exchange Sees 12% Growth in Q2</h3>
                  <p className="text-muted-foreground">
                    The Ghana Stock Exchange (GSE) has recorded a 12% growth in the second quarter of 2024,
                    outperforming many regional markets.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-secondary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm bg-secondary/10 text-secondary px-2 py-1 rounded-full">Nigeria</span>
                    <span className="text-sm text-muted-foreground">June 10, 2024</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Nigerian Banking Sector Shows Resilience</h3>
                  <p className="text-muted-foreground">
                    Despite economic challenges, the Nigerian banking sector has shown remarkable resilience with a 7.5%
                    increase in profitability.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">Kenya</span>
                    <span className="text-sm text-muted-foreground">June 5, 2024</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Kenya's Tech Sector Attracts $230M Investment</h3>
                  <p className="text-muted-foreground">
                    Kenya's growing technology sector has attracted $230 million in foreign investment in the first half
                    of 2024, creating new opportunities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Who We Are</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tesah Capital Limited was incorporated in 2010 under the laws of Ghana to provide fund management
                  services.
                </p>
                <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary/10" asChild>
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Section */}
        <section className="w-full py-12 md:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tighter">Fund Performance</h2>
              <p className="text-muted-foreground">Our funds have consistently outperformed market benchmarks</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-background p-6 rounded-lg shadow-sm border-l-4 border-l-secondary">
                <h3 className="text-lg font-bold mb-2 text-secondary">Tesah Treasury Trust (TTT)</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">YTD Return</span>
                  <span className="text-green-600 font-bold">+14.2%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-secondary h-full" style={{ width: "62%" }}></div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Outperforming treasury benchmark by 3.5%</p>
                <div className="mt-6 flex justify-between text-sm">
                  <div>
                    <p className="font-medium">1-Year Return</p>
                    <p className="text-secondary font-bold">12.8%</p>
                  </div>
                  <div>
                    <p className="font-medium">3-Year Return</p>
                    <p className="text-secondary font-bold">38.5%</p>
                  </div>
                  <div>
                    <p className="font-medium">5-Year Return</p>
                    <p className="text-secondary font-bold">67.2%</p>
                  </div>
                </div>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border-l-4 border-l-primary">
                <h3 className="text-lg font-bold mb-2 text-primary">Tesah Future Fund (TFF)</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">YTD Return</span>
                  <span className="text-green-600 font-bold">+21.7%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: "78%" }}></div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Outperforming growth index by 7.3%</p>
                <div className="mt-6 flex justify-between text-sm">
                  <div>
                    <p className="font-medium">1-Year Return</p>
                    <p className="text-primary font-bold">19.4%</p>
                  </div>
                  <div>
                    <p className="font-medium">3-Year Return</p>
                    <p className="text-primary font-bold">62.8%</p>
                  </div>
                  <div>
                    <p className="font-medium">5-Year Return</p>
                    <p className="text-primary font-bold">103.5%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button className="bg-primary hover:bg-primary/90">
                <Link href="/investment-products">View All Investment Products</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-white/20 px-3 py-1 text-sm">Our Services</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What We Offer</h2>
                <p className="max-w-[900px] text-secondary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We have grown our capabilities to meet the needs of our clients over time and offer alternative ways
                  to achieve investment growth and capital preservation.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/services">View All Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tighter">What Our Clients Say</h2>
              <p className="text-muted-foreground">Hear from some of our satisfied clients</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      JD
                    </div>
                    <div>
                      <h4 className="font-bold">John Darko</h4>
                      <p className="text-sm text-muted-foreground">CEO, Accra Ventures</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "Tesah Capital has been instrumental in helping our company manage our pension funds. Their
                    expertise and personalized approach have delivered exceptional results for our employees."
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="hsl(30, 100%, 50%)"
                        stroke="hsl(30, 100%, 50%)"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                      MA
                    </div>
                    <div>
                      <h4 className="font-bold">Mary Ansah</h4>
                      <p className="text-sm text-muted-foreground">CFO, Ghana Tech Solutions</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "Working with Tesah Capital has transformed our investment strategy. Their deep understanding of
                    African markets has helped us navigate complex financial landscapes with confidence."
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="hsl(215, 80%, 30%)"
                        stroke="hsl(215, 80%, 30%)"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      RO
                    </div>
                    <div>
                      <h4 className="font-bold">Robert Osei</h4>
                      <p className="text-sm text-muted-foreground">Individual Investor</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "As an individual investor, I've been impressed by Tesah Capital's attention to detail and
                    commitment to my financial goals. My portfolio has consistently outperformed my expectations."
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="hsl(30, 100%, 50%)"
                        stroke="hsl(30, 100%, 50%)"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-white/20 px-3 py-1 text-sm">Achievements</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Milestones</h2>
                <p className="max-w-[900px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our achievements and milestones since formation in 2010 continue to shape our business and we remain
                  steadfast in our commitment to protect and grow our clients' wealth.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/achievements">View Our Journey</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="text-secondary-foreground/80 md:text-xl">
                Contact us today to learn how we can help you achieve your financial goals.
              </p>
              <Button size="lg" className="mt-4 bg-primary hover:bg-primary/90" asChild>
                <Link href="/contact">Contact Us Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
